import { Head, Link } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <>
            <Head title="Dashboard" />
            <main className="auth-page">
                <div className="auth-card">
                    <h1>Dashboard</h1>
                    <p>Your account is active and your email is verified.</p>
                    <div className="auth-links">
                        <Link href={route('profile.edit')}>Edit profile</Link>
                        <Link href="/" className="">
                            Back to store
                        </Link>
                        <Link href={route('logout')} method="post" as="button">
                            Logout
                        </Link>
                    </div>
                </div>
            </main>
        </>
    );
}
