import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaGithub, FaLinkedinIn } from "react-icons/fa";

import useStorefrontContent from "../../../hooks/useStorefrontContent";

const socialIcons = {
  facebook: FaFacebookF,
  f: FaFacebookF,
  twitter: FaTwitter,
  x: FaTwitter,
  github: FaGithub,
  g: FaGithub,
  linkedin: FaLinkedinIn,
  in: FaLinkedinIn,
};

const Footer = ({ forceDocumentNavigation = false }) => {
  const { settings } = useStorefrontContent();
  const footer = settings?.footer || {};
  const quickLinks = footer.quickLinks || [];
  const socialLinks = footer.socialLinks || [];
  const StoreLink = ({ to, children }) => {
    const target = normalizeStoreUrl(to);

    return forceDocumentNavigation || target.startsWith("/account/")
      ? <a href={target}>{children}</a>
      : <Link to={target}>{children}</Link>;
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3>{settings?.siteName || "Matjari"}</h3>
            <p>{footer.description}</p>
            <div className="footer-divider" />
          </div>

          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              {quickLinks.map((link) => (
                <li key={`${link.label}-${link.url}`}>
                  <StoreLink to={link.url || "/"}>{link.label}</StoreLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-social-newsletter">
            <h4>Follow us</h4>

            <div className="social-icons">
              {socialLinks.map((link) => {
                const key = String(link.icon || link.label || "").toLowerCase();
                const Icon = socialIcons[key] || FaFacebookF;

                return (
                  <a
                    key={`${link.label}-${link.url}`}
                    href={link.url || "#"}
                    aria-label={link.label || "Social link"}
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>

            <h4 className="newsletter-title">{footer.newsletterTitle}</h4>
            <p>{footer.newsletterText}</p>

            <form className="newsletter-form" onSubmit={(event) => event.preventDefault()}>
              <input type="email" placeholder={footer.newsletterPlaceholder} />
              <button type="submit">{footer.newsletterButtonLabel}</button>
            </form>

            <p className="newsletter-note">
              By subscribing you agree to receive emails from us.
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} {settings?.siteName || "Matjari"}.{" "}
            {footer.copyright}
          </p>

          <div className="footer-bottom-links">
            <StoreLink to="/privacy">{footer.policyLabel}</StoreLink>
            <StoreLink to="/terms">{footer.termsLabel}</StoreLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

function normalizeStoreUrl(url) {
  return url === "/favorite" ? "/account/favorites" : url || "/";
}
