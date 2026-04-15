import { Link, usePage } from '@inertiajs/react';

function SocialIcon({ children, href = '#', label = 'social' }) {
    return (
        <a
            href={href}
            aria-label={label}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-700 text-stone-200 transition hover:border-stone-200 hover:text-white"
        >
            {children}
        </a>
    );
}

export default function Footer() {
    const { siteSettings = {} } = usePage().props;
    const siteName = siteSettings.site_name || 'Matjari';
    const quickLinks = Array.isArray(siteSettings.footer_quick_links) ? siteSettings.footer_quick_links : [];
    const socialLinks = Array.isArray(siteSettings.footer_social_links) ? siteSettings.footer_social_links : [];

    return (
        <footer className="mt-20 border-t border-stone-200 bg-stone-950 text-stone-200">
            <div className="mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1.1fr_0.8fr_1fr] lg:px-8">
                <div>
                    <h3 className="text-2xl font-semibold text-white">{siteName}</h3>
                    <p className="mt-4 max-w-md text-sm leading-7 text-stone-400">
                        {siteSettings.footer_description}
                    </p>
                    <div className="mt-6 h-px w-24 bg-stone-700" />
                </div>

                <div>
                    <h4 className="text-sm font-semibold uppercase tracking-[0.24em] text-stone-400">
                        Quick Links
                    </h4>
                    <div className="mt-5 flex flex-col gap-3 text-sm">
                        {quickLinks.map((item) => (
                            <Link key={`${item.label}-${item.url}`} href={item.url || '/'}>
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>

                <div>
                    <h4 className="text-sm font-semibold uppercase tracking-[0.24em] text-stone-400">
                        Follow us
                    </h4>
                    <div className="mt-5 flex gap-3">
                        {socialLinks.map((item) => (
                            <SocialIcon
                                key={`${item.label}-${item.url}`}
                                href={item.url || '#'}
                                label={item.label || 'social'}
                            >
                                {item.icon || item.label?.slice(0, 2)}
                            </SocialIcon>
                        ))}
                    </div>

                    <h4 className="mt-8 text-sm font-semibold uppercase tracking-[0.24em] text-stone-400">
                        {siteSettings.newsletter_title}
                    </h4>
                    <p className="mt-3 text-sm text-stone-400">
                        {siteSettings.newsletter_text}
                    </p>

                    <form className="mt-4 flex flex-col gap-3 sm:flex-row">
                        <input
                            type="email"
                            placeholder={siteSettings.newsletter_placeholder}
                            className="h-12 flex-1 rounded-full border border-stone-700 bg-stone-900 px-4 text-sm text-white outline-none placeholder:text-stone-500 focus:border-amber-400"
                        />
                        <button
                            type="button"
                            className="h-12 rounded-full bg-amber-400 px-6 text-sm font-semibold text-stone-950 transition hover:bg-amber-300"
                        >
                            {siteSettings.newsletter_button_label}
                        </button>
                    </form>

                    <p className="mt-3 text-xs text-stone-500">
                        By subscribing you agree to receive emails from us.
                    </p>
                </div>
            </div>

            <div className="border-t border-stone-800">
                <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-sm text-stone-500 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
                    <p>© {new Date().getFullYear()} {siteName}. {siteSettings.footer_copyright}</p>
                    <div className="flex gap-5">
                        <span>{siteSettings.footer_policy_label}</span>
                        <span>{siteSettings.footer_terms_label}</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
