import { FormEventHandler } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import type { User } from '@/types';

type ProfileProps = {
    status?: string;
};

type ProfileFormData = {
    name: string;
    display_name: string;
    bio: string;
    profile_picture_url: string;
    email: string;
};

export default function Edit({ status }: ProfileProps) {
    const user = usePage().props.auth.user as User;
    const profileName = user.display_name || user.name;
    const initials = getInitials(profileName);

    const profileForm = useForm<ProfileFormData>({
        name: user.name ?? '',
        display_name: user.display_name ?? '',
        bio: user.bio ?? '',
        profile_picture_url: user.profile_picture_url ?? user.google_avatar ?? '',
        email: user.email ?? '',
    });

    const deleteForm = useForm({
        password: '',
    });

    const submitProfile: FormEventHandler = (e) => {
        e.preventDefault();
        profileForm.patch(route('profile.update'), {
            preserveScroll: true,
        });
    };

    const submitDelete: FormEventHandler = (e) => {
        e.preventDefault();
        deleteForm.delete(route('profile.destroy'));
    };

    return (
        <>
            <Head title="Profile" />
            <main className="auth-page">
                <div className="auth-card profile-card">
                    <div className="profile-header">
                        <div className="profile-avatar" aria-hidden="true">
                            {profileForm.data.profile_picture_url ? (
                                <img src={profileForm.data.profile_picture_url} alt="" />
                            ) : (
                                <span>{initials}</span>
                            )}
                        </div>

                        <div>
                            <h1>My profile</h1>
                            <p>Manage your account information and public profile details.</p>
                        </div>
                    </div>

                    <section className="profile-summary" aria-label="Profile summary">
                        <div>
                            <span>Display name</span>
                            <strong>{profileForm.data.display_name || profileForm.data.name || 'Not set'}</strong>
                        </div>
                        <div>
                            <span>Email</span>
                            <strong>{profileForm.data.email}</strong>
                        </div>
                        <div className="profile-summary__bio">
                            <span>Bio</span>
                            <strong>{profileForm.data.bio || 'Add a short bio so people recognize your account.'}</strong>
                        </div>
                    </section>

                    {status ? <div className="auth-status">{status}</div> : null}

                    <form onSubmit={submitProfile} className="auth-form">
                        <label className="auth-field">
                            <span>Legal name</span>
                            <input
                                type="text"
                                value={profileForm.data.name}
                                onChange={(e) => profileForm.setData('name', e.target.value)}
                                autoComplete="name"
                            />
                            {profileForm.errors.name ? <small>{profileForm.errors.name}</small> : null}
                        </label>

                        <label className="auth-field">
                            <span>Display name</span>
                            <input
                                type="text"
                                value={profileForm.data.display_name}
                                onChange={(e) => profileForm.setData('display_name', e.target.value)}
                                placeholder="The name shown in your profile"
                                autoComplete="nickname"
                            />
                            {profileForm.errors.display_name ? <small>{profileForm.errors.display_name}</small> : null}
                        </label>

                        <label className="auth-field">
                            <span>Profile picture URL</span>
                            <input
                                type="url"
                                value={profileForm.data.profile_picture_url}
                                onChange={(e) => profileForm.setData('profile_picture_url', e.target.value)}
                                placeholder="https://example.com/avatar.jpg"
                                autoComplete="url"
                            />
                            {profileForm.errors.profile_picture_url ? <small>{profileForm.errors.profile_picture_url}</small> : null}
                        </label>

                        <label className="auth-field">
                            <span>Bio</span>
                            <textarea
                                value={profileForm.data.bio}
                                onChange={(e) => profileForm.setData('bio', e.target.value)}
                                placeholder="Write a short introduction."
                                rows={4}
                            />
                            {profileForm.errors.bio ? <small>{profileForm.errors.bio}</small> : null}
                        </label>

                        <label className="auth-field">
                            <span>Email</span>
                            <input
                                type="email"
                                value={profileForm.data.email}
                                onChange={(e) => profileForm.setData('email', e.target.value)}
                                autoComplete="email"
                            />
                            {profileForm.errors.email ? <small>{profileForm.errors.email}</small> : null}
                        </label>

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
                                autoComplete="current-password"
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

function getInitials(name: string): string {
    return name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join('') || 'U';
}
