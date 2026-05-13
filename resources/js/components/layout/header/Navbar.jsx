import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import ListeCategories from "../../../pages/categorie/ListeCategories";
import useStorefrontContent from "../../../hooks/useStorefrontContent";

const linkClass = ({ isActive }) => `nav-link${isActive ? " is-active" : ""}`;

export default function Navbar({ cartCount = 0, forceDocumentNavigation = false }) {
  const [hover, setHover] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { settings, auth } = useStorefrontContent();
  const navbar = settings?.navbar || {};

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!hover && !mobileOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setHover(false);
        setMobileOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [hover, mobileOpen]);

  useEffect(() => {
    setHover(false);
    setMobileOpen(false);
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
                SHOP
              </a>
            ) : (
              <NavLink to="/shop" className={linkClass}>
                SHOP
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
                <span>{navbar.categoryLabel || "CATEGORY"}</span>
                <ChevronIcon />
              </button>

              {hover && (
                <div className="dropdown-menu">
                  <div className="navbar-category-panel-head">
                    <div>
                      <strong>Shop categories</strong>
                      <span>Browse popular departments</span>
                    </div>
                    <a href="/shop">View all</a>
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
            <Link to="/" className="navbar-center" aria-label="MATJARI home">
              <span className="navbar-logo-text">MATJARI</span>
            </Link>
          )}

          <div className="navbar-right">
            <button className="navbar-meta-trigger" type="button">
              <span>English</span>
              <ChevronIcon />
            </button>

            <button className="navbar-meta-trigger" type="button">
              <span>USD</span>
              <ChevronIcon />
            </button>

            <IconButton label="Search" onClick={goToSearch}>
              <SearchIcon />
            </IconButton>

            <IconButton label="Account" onClick={goToAccount}>
              <UserIcon />
            </IconButton>

            <IconButton label="Wishlist" onClick={() => goTo("/favorite")}>
              <HeartIcon />
            </IconButton>

            <IconButton label="Cart" onClick={() => goTo("/cart")}>
              <div className="cart-wrapper">
                <CartIcon />
                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
              </div>
            </IconButton>
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
