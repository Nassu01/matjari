<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Support\OrderPayment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use JsonException;
use Stripe\Exception\SignatureVerificationException;
use Stripe\Webhook;
use Symfony\Component\HttpFoundation\Response;
use UnexpectedValueException;

class StripeWebhookController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $payload = $request->getContent();
        $secret = config('cashier.webhook.secret');

        try {
            $event = $secret
                ? Webhook::constructEvent($payload, $request->header('Stripe-Signature'), $secret)
                : json_decode($payload, false, 512, JSON_THROW_ON_ERROR);
        } catch (UnexpectedValueException|SignatureVerificationException|JsonException $exception) {
            return response('Invalid Stripe webhook payload.', 400);
        }

        match ($event->type ?? null) {
            'checkout.session.completed',
            'checkout.session.async_payment_succeeded' => $this->handleCheckoutSessionPaid($event->data->object),
            'checkout.session.async_payment_failed' => $this->handleCheckoutSessionFailed($event->data->object),
            default => null,
        };

        return response('Webhook handled.', 200);
    }

    private function handleCheckoutSessionPaid(object $session): void
    {
        $order = $this->orderFromSession($session);

        if (! $order) {
            Log::warning('Stripe checkout session paid without matching order.', [
                'session_id' => $session->id ?? null,
            ]);

            return;
        }

        $order->forceFill([
            'stripe_checkout_session_id' => $session->id ?? $order->stripe_checkout_session_id,
        ])->save();

        OrderPayment::markStripePaid($order, $session->payment_intent ?? null);
    }

    private function handleCheckoutSessionFailed(object $session): void
    {
        $order = $this->orderFromSession($session);

        if (! $order || $order->payment_status === 'paid') {
            return;
        }

        $order->forceFill([
            'payment_status' => 'failed',
            'stripe_checkout_session_id' => $session->id ?? $order->stripe_checkout_session_id,
            'stripe_payment_intent_id' => is_string($session->payment_intent ?? null) ? $session->payment_intent : $order->stripe_payment_intent_id,
        ])->save();
    }

    private function orderFromSession(object $session): ?Order
    {
        $orderId = $session->metadata->order_id ?? null;

        if ($orderId) {
            return Order::query()->whereKey($orderId)->first();
        }

        if (isset($session->id)) {
            return Order::query()->where('stripe_checkout_session_id', $session->id)->first();
        }

        return null;
    }
}
