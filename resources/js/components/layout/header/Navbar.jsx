import { Link as InertiaLink } from "@inertiajs/react";
import { NavLink, Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import ListeCategories from "../../../pages/categorie/ListeCategories";
import useStorefrontContent from "../../../hooks/useStorefrontContent";
import { languageOptions, useStorefrontLanguage } from "../../../i18n/storefrontLanguage";

const linkClass = ({ isActive }) => `nav-link${isActive ? " is-active" : ""}`;

export default function Navbar({ cartCount = 0, forceDocumentNavigation = false }) {
  const [hover, setHover] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const languageRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { settings, auth } = useStorefrontContent();
  const navbar = settings?.navbar || {};
  const { currentLanguage, languageLabel, setCurrentLanguage, t } = useStorefrontLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!hover && !mobileOpen && !languageOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setHover(false);
        setMobileOpen(false);
        setLanguageOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [hover, mobileOpen, languageOpen]);

  useEffect(() => {
    if (!languageOpen) return undefined;

    const onPointerDown = (event) => {
      if (!languageRef.current?.contains(event.target)) {
        setLanguageOpen(false);
      }
    };

    window.addEventListener("pointerdown", onPointerDown);
    return () => window.removeEventListener("pointerdown", onPointerDown);
  }, [languageOpen]);

  useEffect(() => {
    setHover(false);
    setMobileOpen(false);
    setLanguageOpen(false);
  }, [location.pathname]);

  const goTo = (url) => {
    setMobileOpen(false);

    if (forceDocumentNavigation) {
      window.location.assign(url);
      return;
    }

    navigate(url);
  };

  const goToAccount = () => {
    if (auth?.isAuthenticated) {
      window.location.assign("/dashboard");
      return;
    }

    window.location.assign("/login");
  };

  const goToSearch = () => {
    goTo("/shop");
  };

  const goToFavorites = () => {
    window.location.assign("/account/favorites");
  };

  const selectLanguage = (language) => {
    setCurrentLanguage(language);
    setLanguageOpen(false);
  };

  return (
    <header className={`navbar ${scrolled ? "is-scrolled" : ""} ${mobileOpen ? "is-mobile-open" : ""}`}>
      <div className="navbar-wrap">
        <div className="navbar-pill">
          <button
            className="navbar-mobile-toggle"
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((current) => !current)}
          >
            <MenuIcon />
          </button>

          <div className="navbar-left">
            {forceDocumentNavigation ? (
              <a href="/shop" className="nav-link">
                {t.shop}
              </a>
            ) : (
              <NavLink to="/shop" className={linkClass}>
                {t.shop}
              </NavLink>
            )}

            <div
              className={`dropdown navbar-category ${hover ? "is-open" : ""}`}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              <button
                className="dropdown-btn navbar-category-trigger"
                type="button"
                aria-expanded={hover}
                onClick={() => setHover((current) => !current)}
              >
                <span>{navbar.categoryLabel || t.categories}</span>
                <ChevronIcon />
              </button>

              {hover && (
                <div className="dropdown-menu">
                  <div className="navbar-category-panel-head">
                    <div>
                      <strong>{t.categories}</strong>
                      <span>{t.catalog}</span>
                    </div>
                    <a href="/shop">{t.shop}</a>
                  </div>

                  <ListeCategories
                    items={navbar.links || []}
                    forceDocumentNavigation={forceDocumentNavigation}
                  />
                </div>
              )}
            </div>
          </div>

          {forceDocumentNavigation ? (
            <a href="/" className="navbar-center" aria-label="MATJARI home">
              <span className="navbar-logo-text">MATJARI</span>
            </a>
          ) : (
            <RouterLink to="/" className="navbar-center" aria-label="MATJARI home">
              <span className="navbar-logo-text">MATJARI</span>
            </RouterLink>
          )}

          <div className="navbar-right">
            <div className="navbar-language-menu" ref={languageRef}>
              <button
                className="navbar-meta-trigger"
                type="button"
                aria-label={t.language}
                aria-expanded={languageOpen}
                onClick={() => setLanguageOpen((value) => !value)}
              >
                <span>{languageLabel}</span>
                <ChevronIcon />
              </button>
              {languageOpen && (
                <div className="navbar-language-dropdown" role="menu">
                  {languageOptions.map((language) => (
                    <button
                      key={language.value}
                      type="button"
                      role="menuitemradio"
                      aria-checked={currentLanguage === language.value}
                      className={currentLanguage === language.value ? "is-active" : ""}
                      onClick={() => selectLanguage(language.value)}
                    >
                      {language.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button className="navbar-meta-trigger" type="button">
              <span>USD</span>
              <ChevronIcon />
            </button>

            <IconButton label={t.search} onClick={goToSearch}>
              <SearchIcon />
            </IconButton>

            <IconButton label={t.account} onClick={goToAccount}>
              <UserIcon />
            </IconButton>

            <IconButton label={t.favorites} onClick={goToFavorites}>
              <HeartIcon />
            </IconButton>

            {forceDocumentNavigation ? (
              <a className="icon-btn" href="/cart" aria-label={t.cart} title={t.cart}>
                <CartBadge count={cartCount} />
              </a>
            ) : (
              <InertiaLink
                className="icon-btn"
                href="/cart"
                aria-label={t.cart}
                title={t.cart}
                onClick={() => setMobileOpen(false)}
              >
                <CartBadge count={cartCount} />
              </InertiaLink>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

function IconButton({ children, label, onClick }) {
  return (
    <button
      className="icon-btn"
      aria-label={label}
      title={label}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function CartBadge({ count = 0 }) {
  const safeCount = Number.isFinite(Number(count)) ? Number(count) : 0;

  return (
    <span className="cart-wrapper">
      <CartIcon />
      {safeCount > 0 && (
        <span className="cart-badge" aria-label={`${safeCount} items in cart`}>
          {safeCount > 99 ? "99+" : safeCount}
        </span>
      )}
    </span>
  );
}

function SearchIcon() {
  return (
    <svg className="navbar-tool-icon" viewBox="0 0 24 24" fill="none">
      <path
        d="M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z"
        stroke="currentColor"
      />
      <path
        d="M21 21l-4.35-4.35"
        stroke="currentColor"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChevronIcon() {
  return <span className="navbar-category-chevron" aria-hidden="true" />;
}

function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg className="navbar-tool-icon" viewBox="0 0 24 24" fill="none">
      <path
        d="M20 21a8 8 0 0 0-16 0"
        stroke="currentColor"
        strokeLinecap="round"
      />
      <path
        d="M12 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
        stroke="currentColor"
      />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg className="navbar-tool-icon" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 21s-7-4.6-9.2-9A5.5 5.5 0 0 1 12 5.6 5.5 5.5 0 0 1 21.2 12c-2.2 4.4-9.2 9-9.2 9Z"
        stroke="currentColor"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg className="navbar-tool-icon" viewBox="0 0 24 24" fill="none">
      <path
        d="M6.3 7h14.2l-1.25 8.1H8L6.3 7Z"
        stroke="currentColor"
        strokeLinejoin="round"
      />
      <path
        d="M6.3 7 5.3 4H3"
        stroke="currentColor"
        strokeLinecap="round"
      />
      <path
        d="M9.5 20.25a.9.9 0 1 0 0-1.8.9.9 0 0 0 0 1.8ZM17.5 20.25a.9.9 0 1 0 0-1.8.9.9 0 0 0 0 1.8Z"
        stroke="currentColor"
      />
    </svg>
  );
}
