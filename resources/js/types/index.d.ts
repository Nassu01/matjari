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
    email_verified_at?: string;
    phone_verified_at?: string | null;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
};
