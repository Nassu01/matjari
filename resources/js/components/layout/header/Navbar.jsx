import { NavLink, Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import ListeCategories from "../../../pages/categorie/ListeCategories";
import useStorefrontContent from "../../../hooks/useStorefrontContent";

const linkClass = ({ isActive }) => `nav-link${isActive ? " is-active" : ""}`;

export default function Navbar({ cartCount = 0 }) {
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();
  const { settings, auth } = useStorefrontContent();
  const navbar = settings?.navbar || {};

  const goToAccount = () => {
    if (auth?.isAuthenticated && auth?.isVerified) {
      window.location.assign("/dashboard");
      return;
    }

    if (auth?.isAuthenticated && !auth?.isVerified) {
      window.location.assign("/verify-email");
      return;
    }

    window.location.assign("/login");
  };

  const goToSearch = () => {
    navigate("/shop");
  };

  return (
    <header className="navbar">
      <div className="navbar-wrap">
        <div className="navbar-pill">
          <div className="navbar-left">
            <NavLink to="/" className={linkClass} end>
              {navbar.homeLabel || "HOME"}
            </NavLink>

            <div
              className="dropdown"
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              <button className="dropdown-btn" type="button">
                {navbar.categoryLabel || "CATEGORY"}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6 9l6 6 6-6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {hover && (
                <div className="dropdown-menu">
                  <ListeCategories items={navbar.links || []} />
                </div>
              )}
            </div>
          </div>

          <Link to="/" className="navbar-center">
            <img
              src={navbar.logoPath || "/images/Logo.png"}
              alt={settings?.siteName || "Logo"}
              className="navbar-logo"
            />
          </Link>

          <div className="navbar-right">
            <IconButton label="Search" onClick={goToSearch}>
              <SearchIcon />
            </IconButton>

            <IconButton label="Shop" onClick={() => navigate("/shop")}>
              <StoreIcon />
            </IconButton>

            <IconButton label="Account" onClick={goToAccount}>
              <UserIcon />
            </IconButton>

            <IconButton label="Wishlist" onClick={() => navigate("/favorite")}>
              <HeartIcon />
            </IconButton>

            <IconButton label="Cart" onClick={() => navigate("/cart")}>
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
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M21 21l-4.35-4.35"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function StoreIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 10l2-6h14l2 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M5 10v10h14V10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M10 20v-5h4v5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M20 21a8 8 0 0 0-16 0"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M12 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 21s-7-4.6-9.2-9A5.5 5.5 0 0 1 12 5.6 5.5 5.5 0 0 1 21.2 12c-2.2 4.4-9.2 9-9.2 9Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M6 6h15l-1.5 9h-12L6 6Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M6 6 5 3H2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M9 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM18 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
        fill="currentColor"
      />
    </svg>
  );
}
