import { FormEventHandler } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

type ProfileProps = {
    mustVerifyEmail: boolean;
    status?: string;
};

export default function Edit({ mustVerifyEmail, status }: ProfileProps) {
    const user = usePage().props.auth.user as { name: string; email: string; email_verified_at?: string | null };

    const profileForm = useForm({
        name: user.name ?? '',
        email: user.email ?? '',
    });

    const deleteForm = useForm({
        password: '',
    });

    const submitProfile: FormEventHandler = (e) => {
        e.preventDefault();
        profileForm.patch(route('profile.update'));
    };

    const submitDelete: FormEventHandler = (e) => {
        e.preventDefault();
        deleteForm.delete(route('profile.destroy'));
    };

    return (
        <>
            <Head title="Profile" />
            <main className="auth-page">
                <div className="auth-card">
                    <h1>My profile</h1>
                    <p>Manage your account information.</p>

                    {status ? <div className="auth-status">{status}</div> : null}

                    <form onSubmit={submitProfile} className="auth-form">
                        <label className="auth-field">
                            <span>Name</span>
                            <input
                                type="text"
                                value={profileForm.data.name}
                                onChange={(e) => profileForm.setData('name', e.target.value)}
                            />
                            {profileForm.errors.name ? <small>{profileForm.errors.name}</small> : null}
                        </label>

                        <label className="auth-field">
                            <span>Email</span>
                            <input
                                type="email"
                                value={profileForm.data.email}
                                onChange={(e) => profileForm.setData('email', e.target.value)}
                            />
                            {profileForm.errors.email ? <small>{profileForm.errors.email}</small> : null}
                        </label>

                        {mustVerifyEmail && !user.email_verified_at ? (
                            <div className="auth-status">Your email is not verified yet.</div>
                        ) : null}

                        <button className="auth-button" type="submit" disabled={profileForm.processing}>
                            {profileForm.processing ? 'Saving...' : 'Save profile'}
                        </button>
                    </form>

                    <form onSubmit={submitDelete} className="auth-form">
                        <label className="auth-field">
                            <span>Current password to delete account</span>
                            <input
                                type="password"
                                value={deleteForm.data.password}
                                onChange={(e) => deleteForm.setData('password', e.target.value)}
                            />
                            {deleteForm.errors.password ? <small>{deleteForm.errors.password}</small> : null}
                        </label>

                        <button className="auth-button auth-button--danger" type="submit" disabled={deleteForm.processing}>
                            {deleteForm.processing ? 'Deleting...' : 'Delete account'}
                        </button>
                    </form>

                    <div className="auth-links">
                        <Link href={route('dashboard')}>Dashboard</Link>
                        <Link href="/">Back to store</Link>
                    </div>
                </div>
            </main>
        </>
    );
}
