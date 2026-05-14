import type { ReactNode } from 'react';

import AccountSidebar from '@/components/AccountSidebar';
import AuthStorefrontLayout from '@/layouts/AuthStorefrontLayout';

type AccountPageLayoutProps = {
    children: ReactNode;
    title: string;
    subtitle: string;
    eyebrow?: string;
    action?: ReactNode;
};

export default function AccountPageLayout({
    children,
    title,
    subtitle,
    eyebrow = 'Compte client',
    action,
}: AccountPageLayoutProps) {
    return (
        <AuthStorefrontLayout>
            <main className="account-dashboard-page">
                <div className="account-dashboard-shell">
                    <AccountSidebar />

                    <section className="account-dashboard-content" aria-label={title}>
                        <header className="account-page-heading">
                            <div>
                                <span>{eyebrow}</span>
                                <h1>{title}</h1>
                                <p>{subtitle}</p>
                            </div>
                            {action ? <div className="account-page-heading__action">{action}</div> : null}
                        </header>

                        {children}
                    </section>
                </div>
            </main>
        </AuthStorefrontLayout>
    );
}
