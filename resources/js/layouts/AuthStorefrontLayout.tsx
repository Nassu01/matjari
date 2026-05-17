import type { ReactNode } from 'react';

import { JournalFooter, JournalHeader, JournalStyle } from '@/components/layout/home/Home';

type AuthStorefrontLayoutProps = {
    children: ReactNode;
};

export default function AuthStorefrontLayout({ children }: AuthStorefrontLayoutProps) {
    return (
        <div className="journal-page min-h-screen bg-white text-black">
            <JournalHeader forceDocumentNavigation={false} />
            {children}
            <JournalFooter />
            <JournalStyle />
        </div>
    );
}
