import { usePage } from '@inertiajs/react';
import type { ReactNode } from 'react';

import { JournalFooter, JournalHeader, JournalStyle } from '@/components/layout/home/Home';
import type { PageProps } from '@/types';

type AuthStorefrontLayoutProps = {
    children: ReactNode;
};

export default function AuthStorefrontLayout({ children }: AuthStorefrontLayoutProps) {
    const { flash } = usePage<PageProps>().props;
    const flashMessage = flash?.success || flash?.status || flash?.error;
    const flashTone = flash?.error ? 'border-red-200 bg-red-50 text-red-700' : 'border-emerald-200 bg-emerald-50 text-emerald-800';

    return (
        <div className="journal-page min-h-screen bg-white text-black">
            <JournalHeader forceDocumentNavigation={false} />
            {flashMessage && (
                <div className="mx-auto mt-4 w-[min(1120px,calc(100%-2rem))]">
                    <div className={`rounded-md border px-4 py-3 text-sm font-medium ${flashTone}`}>{flashMessage}</div>
                </div>
            )}
            {children}
            <JournalFooter />
            <JournalStyle />
        </div>
    );
}
