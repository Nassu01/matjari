import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Order = ({ order }) => {
  const reduxOrder = useSelector((state) => state.order?.lastOrder);

  const restoredOrder = useMemo(() => {
    if (order) return order;
    if (reduxOrder) return reduxOrder;
    try {
      return JSON.parse(localStorage.getItem("lastOrder") || "null");
    } catch {
      return null;
    }
  }, [order, reduxOrder]);

  if (!restoredOrder) {
    return (
      <div className="order-page">
        <div className="order-container order-container--small">
          <div className="order-card order-card--center">
            <div className="order-empty-icon" aria-hidden="true">
              OK
            </div>

            <h2 className="order-empty-title">No order found</h2>
            <p className="order-empty-text">
              This can happen if you refreshed the page. Please go back to checkout
              and place your order again.
            </p>

            <div className="order-empty-actions">
              <Link to="/shop" className="btn btn--primary btn--pill">
                Go to Shop
              </Link>

              <Link to="/cart" className="btn btn--secondary btn--pill">
                Back to Cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const items = restoredOrder.products || [];
  const orderNumber = restoredOrder.orderNumber || "-";
  const shipping = restoredOrder.shippingInformation || {};

  const paymentLabel = useMemo(() => {
    const method = (restoredOrder.paymentMethod || "").toLowerCase();
    if (method === "cod") return "Cash on Delivery";
    if (method === "card") return "Card";
    return restoredOrder.paymentMethod ? restoredOrder.paymentMethod.toUpperCase() : "-";
  }, [restoredOrder.paymentMethod]);

  const totalPrice = useMemo(() => {
    const raw =
      Number(restoredOrder.totalPrice ?? 0) ||
      items.reduce((sum, product) => {
        const price = Number(product.price || 0);
        const qty = Number(product.quantity || 0);
        const line = Number(product.totalPrice ?? price * qty);
        return sum + (Number.isFinite(line) ? line : 0);
      }, 0);

    return Number.isFinite(raw) ? Number(raw) : 0;
  }, [restoredOrder.totalPrice, items]);

  const totalItems = useMemo(() => {
    return items.reduce((acc, product) => acc + Number(product.quantity || 0), 0);
  }, [items]);

  return (
    <div className="order-page">
      <div className="order-container">
        <div className="order-header">
          <h1 className="order-title">Thank you for your order!</h1>
          <p className="order-subtitle">
            Your order has been placed successfully. You will receive an email
            confirmation shortly.
          </p>
        </div>

        <div className="order-grid">
          <div className="order-card">
            <div className="order-card-head">
              <div>
                <h2 className="order-card-title">Order Summary</h2>
                <p className="order-card-meta">
                  Order Number:{" "}
                  <span className="order-card-meta-strong">{orderNumber}</span>
                </p>
              </div>

              <Link to="/shop" className="order-continue">
                Continue shopping
              </Link>
            </div>

            <div className="order-section-label">Products Ordered</div>

            <div className="order-items">
              {items.map((product) => {
                const price = Number(product.price || 0);
                const qty = Number(product.quantity || 0);
                const lineTotal = Number(
                  product.totalPrice != null ? product.totalPrice : price * qty
                );

                return (
                  <div key={product.id} className="order-item">
                    <div className="order-item-img">
                      {product.image ? (
                        <img src={product.image} alt={product.name} />
                      ) : (
                        <div className="order-item-img-empty">No image</div>
                      )}
                    </div>

                    <div className="order-item-info">
                      <p className="order-item-name" title={product.name}>
                        {product.name}
                      </p>
                      <p className="order-item-meta">
                        ${price.toFixed(2)} x {qty}
                      </p>
                    </div>

                    <div className="order-item-total">
                      ${(Number.isFinite(lineTotal) ? lineTotal : 0).toFixed(2)}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="order-total-bar">
              <span className="order-total-label">Total</span>
              <span className="order-total-value">${totalPrice.toFixed(2)}</span>
            </div>
          </div>

          <aside className="order-card order-aside">
            <div className="order-card-aside-head">
              <h3 className="order-card-title">Details</h3>
            </div>

            <div className="order-aside-body">
              <div className="order-box order-box--muted">
                <p className="order-box-title">Shipping info</p>

                <div className="order-rows">
                  <Row label="Address" value={shipping.address || "-"} />
                  <Row label="City" value={shipping.city || "-"} />
                  <Row label="Zip" value={shipping.zip || "-"} />
                </div>
              </div>

              <div className="order-box">
                <div className="order-kv">
                  <span>Items</span>
                  <span className="order-kv-strong">{totalItems}</span>
                </div>

                <div className="order-kv order-kv--spaced">
                  <span>Payment</span>
                  <span className="order-kv-strong">{paymentLabel}</span>
                </div>

                <div className="order-kv order-kv--total">
                  <span className="order-kv-total-label">Total</span>
                  <span className="order-kv-total-value">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              <Link to="/" className="btn btn--primary btn--block">
                Back to Home
              </Link>

              <div className="order-aside-foot">
                <div className="order-foot-row">
                  <span>Secure checkout</span>
                  <span className="order-foot-strong">24/7 Support</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

function Row({ label, value }) {
  return (
    <div className="order-row">
      <span className="order-row-label">{label}:</span>
      <span className="order-row-value">{value}</span>
    </div>
  );
}

export default Order;
