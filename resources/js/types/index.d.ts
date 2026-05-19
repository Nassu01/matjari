import { Config } from 'ziggy-js';

export interface User {
    id: number;
    name: string;
    display_name?: string | null;
    bio?: string | null;
    profile_picture_url?: string | null;
    google_avatar?: string | null;
    email: string;
    phone?: string | null;
    role?: 'client' | 'commercant' | 'livreur' | 'admin' | string | null;
    status?: 'active' | 'pending' | 'rejected' | string | null;
    email_verified_at?: string;
    phone_verified_at?: string | null;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    flash?: {
        success?: string | null;
        error?: string | null;
        status?: string | null;
    };
    ziggy: Config & { location: string };
};
