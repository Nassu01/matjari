import { useEffect, useMemo, useRef, useState } from "react";
import { Link as InertiaLink } from "@inertiajs/react";
import {
  FaFacebookF,
  FaInstagram,
  FaRegHeart,
  FaRegUser,
  FaSearch,
  FaShoppingCart,
  FaStar,
  FaTiktok,
  FaTruck,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { FiAtSign, FiChevronLeft, FiChevronRight, FiHeadphones, FiMail, FiMapPin, FiMenu, FiPhone, FiRefreshCw, FiSend } from "react-icons/fi";
import { MdOutlineKeyboardArrowRight, MdOutlineShield } from "react-icons/md";
import { TbPackageImport } from "react-icons/tb";

import useImages11, { getDisplayImages11, imageUrlFromImages11, images11ManifestUrl } from "../../../hooks/useImages11";
import useStorefrontContent from "../../../hooks/useStorefrontContent";
import { languageOptions, useStorefrontLanguage } from "../../../i18n/storefrontLanguage";

const categoryTemplates = [
  { name: "Skin Care", count: 18, links: ["Moisturizers", "Hand Lotion", "Face Primers", "Body Lotion"] },
  { name: "Beauty", count: 47, links: ["Makeup", "Face", "Eyes", "Lips"] },
  { name: "Fragrance", count: 26, links: ["Women Fragrance", "Men Fragrance", "Unisex Fragrance"] },
  { name: "Hair Care", count: 14, links: ["Shampoo", "Conditioner", "Hair Styling"] },
  { name: "Oral Care", count: 4, links: ["Mouthwash", "Tooth Paste", "Tooth Brushes"] },
];

const productTemplates = [
  { brand: "Kent Madisson", name: "Body Lotion 01", price: "$821.22" },
  { brand: "Breally", name: "Cleanser No 1", price: "$332.70", old: "$639.80", sale: true, top: true },
  { brand: "Breally", name: "Cleanser No 2", price: "$78.24", old: "$200.59", sale: true, top: true },
  { brand: "Breally", name: "Cleanser No 3", price: "$178.36", top: true },
  { brand: "Jane Austin", name: "Premium Line Lotion", price: "$324.65" },
  { brand: "FYT", name: "Lotion No 1", price: "$139.58", old: "$232.62", sale: true },
  { brand: "Rose", name: "Makeup Product 02", price: "$0.00" },
  { brand: "Walk", name: "Makeup Product 03", price: "$717.06" },
];

const blogTemplates = [
  {
    day: "09",
    month: "Sep",
    category: "Guide d'achat",
    title: "Comment mieux choisir vos essentiels du quotidien",
    excerpt: "Un guide simple pour selectionner des articles utiles, elegants et adaptes a votre style de vie.",
    comments: 12,
    views: 1840,
  },
  {
    day: "02",
    month: "Aout",
    category: "Tendances",
    title: "Les tendances mode et accessoires a suivre",
    excerpt: "Explorez les pieces, details et nouveautes qui apportent une touche moderne a vos achats.",
    comments: 9,
    views: 2310,
  },
  {
    day: "30",
    month: "Sep",
    category: "Lifestyle",
    title: "Les essentiels lifestyle a ajouter a votre panier",
    excerpt: "Une selection pratique pour simplifier vos achats et rendre votre quotidien plus agreable.",
    comments: 7,
    views: 1568,
  },
  {
    day: "15",
    month: "Sep",
    category: "Conseils",
    title: "Idees cadeaux pour toutes les occasions",
    excerpt: "Trouvez l'inspiration pour offrir des produits utiles, raffines et adaptes a chaque moment important.",
    comments: 15,
    views: 2896,
  },
  {
    day: "12",
    month: "Dec",
    category: "Maison & bureau",
    title: "Creer un espace pratique chez soi ou au bureau",
    excerpt: "Decouvrez des indispensables maison, rangement, decoration et bureau pour mieux vous organiser.",
    comments: 6,
    views: 1324,
  },
];

const testimonials = [
  {
    quote:
      "Commande facile, livraison rapide et produits conformes aux photos. J'ai beaucoup aime l'experience d'achat sur MATJARI.",
    author: "SARA M.",
    detail: "Cliente verifiee",
  },
  {
    quote:
      "Le site est clair, les produits sont bien presentes et le panier est simple a utiliser. Je recommande.",
    author: "YASSINE B.",
    detail: "Client verifie",
  },
  {
    quote:
      "J'ai trouve rapidement ce que je cherchais. Les favoris et le checkout rendent l'achat tres pratique.",
    author: "AMINA R.",
    detail: "Cliente verifiee",
  },
  {
    quote:
      "Tres belle interface, produits varies et navigation fluide. MATJARI donne une vraie impression premium.",
    author: "MEHDI K.",
    detail: "Client verifie",
  },
];

const menuGroups = {
  shop: ["New Arrivals", "Bestsellers", "SALE", "Skin Care", "Beauty"],
  catalog: categoryTemplates.map((category) => category.name),
  demos: ["Beauty Demo", "Skincare Demo", "Fragrance Demo", "Minimal Demo"],
  more: ["About Us", "Gallery", "Blog", "Contact"],
  language: ["English", "Français", "العربية", "Español"],
  currency: ["USD", "EUR", "MAD", "GBP"],
};

function imageFrom(images, index) {
  return imageUrlFromImages11(images, index);
}

function imageByPath(images, keywords, fallbackIndex = 0) {
  const terms = keywords.map((keyword) => keyword.toLowerCase());
  const match = images.find((image) => {
    const path = image.path?.toLowerCase() || "";
    return terms.some((keyword) => path.includes(keyword));
  });

  return match?.url || imageFrom(images, fallbackIndex);
}

function buildHomeContent(images) {
  const sources = getDisplayImages11(images);

  return {
    imageCount: images.length,
    assets: {
      about: imageFrom(sources, 2),
      promo: imageByPath(sources, ["fashion-accessories/fashion-bags/totes", "home-furniture/home-decor", "fashion/men/casual-wear"], 7),
      feature: imageFrom(sources, 12),
    },
    categories: categoryTemplates.map((category, index) => ({
      ...category,
      image: imageFrom(sources, index + 3),
    })),
    products: productTemplates.map((product, index) => ({
      ...product,
      image: imageFrom(sources, index + 10),
    })),
    heroSlides: [
      { label: "Local Collection", title: "Images From Folder 11", image: imageFrom(sources, 0) },
      { label: "Full Gallery", title: "Every File, One Storefront", image: imageFrom(sources, 1) },
      { label: "Fresh Source", title: "Browse the Complete Set", image: imageFrom(sources, 2) },
    ],
    blogPosts: blogTemplates.map((post, index) => ({
      ...post,
      image: imageByPath(
        sources,
        [
          "fashion-accessories/fashion-bags/totes",
          "fashion/men/casual-wear",
          "home-furniture/home-decor",
          "fashion-accessories/jewelry",
          "home-furniture/home-lighting",
          "electronics/computing",
        ],
        index + 18
      ),
    })),
    galleryImages: images,
  };
}

function useScrollReveal() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      const elements = Array.from(document.querySelectorAll("[data-animate]"));
      elements.forEach((element) => element.classList.add("is-visible"));
      return undefined;
    }

    const watched = new Set();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -70px 0px" }
    );

    const observeNewElements = () => {
      document.querySelectorAll("[data-animate]").forEach((element) => {
        if (!watched.has(element)) {
          watched.add(element);
          observer.observe(element);
        }
      });
    };

    observeNewElements();
    const mutationObserver = new MutationObserver(observeNewElements);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);
}

function Logo() {
  return <span className="journal-logo">MATJARI</span>;
}

function TextChevron() {
  return <span className="journal-text-chevron" aria-hidden="true" />;
}

function SectionTitle({ script, title, subtitle, dark = false }) {
  return (
    <div className={`journal-section-title ${dark ? "is-dark" : ""}`}>
      <span>{script}</span>
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
}

export function JournalHeader({ categories = categoryTemplates, auth = undefined, forceDocumentNavigation = true }) {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const searchRef = useRef(null);
  const searchButtonRef = useRef(null);
  const languageRef = useRef(null);
  const { auth: storefrontAuth } = useStorefrontContent();
  const { currentLanguage, languageLabel, setCurrentLanguage, t } = useStorefrontLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    if (!languageOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") setLanguageOpen(false);
    };

    const onPointerDown = (event) => {
      if (!languageRef.current?.contains(event.target)) {
        setLanguageOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointerdown", onPointerDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [languageOpen]);

  useEffect(() => {
    if (!searchOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") setSearchOpen(false);
    };

    const onPointerDown = (event) => {
      const clickedSearch = searchRef.current?.contains(event.target);
      const clickedTrigger = searchButtonRef.current?.contains(event.target);

      if (!clickedSearch && !clickedTrigger) {
        setSearchOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointerdown", onPointerDown);

    const input = searchRef.current?.querySelector("input");
    window.setTimeout(() => input?.focus(), 0);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [searchOpen]);

  const activeAuth = auth ?? storefrontAuth;
  const accountHref = activeAuth?.isAuthenticated ? "/dashboard" : "/login";
  const favoritesHref = "/account/favorites";
  const selectLanguage = (language) => {
    setCurrentLanguage(language);
    setLanguageOpen(false);
  };

  const submitSearch = (event) => {
    event.preventDefault();
    const query = searchQuery.trim();

    if (!query) return;

    setSearchOpen(false);
    window.location.assign(`/search?query=${encodeURIComponent(query)}`);
  };

  const StoreLink = ({ to, className, ariaLabel, children }) => (
    forceDocumentNavigation ? (
      <a href={to} className={className} aria-label={ariaLabel}>
        {children}
      </a>
    ) : (
      <InertiaLink href={to} className={className} aria-label={ariaLabel}>
        {children}
      </InertiaLink>
    )
  );

  return (
    <header className={`journal-header ${scrolled ? "is-scrolled" : ""} ${open ? "is-open" : ""}`}>
      <div className="journal-header-inner">
        <nav className="journal-nav-left" aria-label="Main navigation">
          <button type="button" onClick={() => setOpen((value) => !value)} aria-label="Open menu" aria-expanded={open}>
            <FiMenu />
          </button>
          <StoreLink to="/shop">{t.shop}</StoreLink>
          <a href="#catalog">{t.catalog} <TextChevron /></a>
        </nav>

        <StoreLink to="/" className="journal-logo-link" ariaLabel="Journal home">
          <Logo />
        </StoreLink>

        <nav className="journal-nav-right" aria-label="Tools">
          <div className="journal-language-menu" ref={languageRef}>
            <button
              className="journal-language-trigger"
              type="button"
              aria-label={t.language}
              aria-expanded={languageOpen}
              onClick={() => setLanguageOpen((value) => !value)}
            >
              {languageLabel} <TextChevron />
            </button>
            {languageOpen && (
              <div className="journal-language-dropdown" role="menu">
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
          <a href="#currency">USD <TextChevron /></a>
          <button
            type="button"
            ref={searchButtonRef}
            aria-label={t.search}
            aria-expanded={searchOpen}
            onClick={() => setSearchOpen((value) => !value)}
          >
            <FaSearch />
          </button>
          <a className="journal-icon-link" href={accountHref} aria-label={t.account}><FaRegUser /></a>
          <a className="journal-icon-link" href={favoritesHref} aria-label={t.favorites}><FaRegHeart /></a>
          <StoreLink to="/cart" ariaLabel={t.cart}><FaShoppingCart size={19} /></StoreLink>
        </nav>
      </div>

      {searchOpen && (
        <div className="journal-search-popover" ref={searchRef}>
          <form onSubmit={submitSearch}>
            <FaSearch aria-hidden="true" />
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder={t.searchPlaceholder}
              aria-label={t.searchPlaceholder}
            />
            <button type="submit">{t.search}</button>
          </form>
        </div>
      )}

      {open && (
        <div className="journal-mobile-panel">
          {categories.map((category) => (
            <a key={category.name} href={`#${category.name.replace(/\s+/g, "-").toLowerCase()}`}>
              {category.name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

function Hero({ heroSlides }) {
  const [active, setActive] = useState(0);

  const nextSlide = () => setActive((current) => (current + 1) % heroSlides.length);
  const prevSlide = () => setActive((current) => (current - 1 + heroSlides.length) % heroSlides.length);

  useEffect(() => {
    const timer = window.setInterval(nextSlide, 6200);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="journal-hero" id="home" data-animate>
      {heroSlides.map((slide, index) => (
        <article className={`journal-hero-main ${active === index ? "is-active" : ""}`} key={slide.title}>
          {slide.image && <img src={slide.image} alt={slide.title} />}
          <div className="journal-hero-copy">
            <span>{slide.label}</span>
            <h1>{slide.title}</h1>
            <div>
              <a className="journal-btn journal-btn-dark" href="/shop">Shop Collection</a>
              <a className="journal-text-link" href="#about">Learn more <span aria-hidden="true">→</span></a>
            </div>
          </div>
        </article>
      ))}
      <div className="journal-hero-nav" aria-label="Slider controls">
        <button className="journal-hero-arrow" type="button" aria-label="Previous slide" onClick={prevSlide}>‹</button>
        <button className="journal-hero-arrow" type="button" aria-label="Next slide" onClick={nextSlide}>›</button>
      </div>
      <div className="journal-hero-dots">
        {heroSlides.map((slide, index) => (
          <button
            key={slide.title}
            type="button"
            className={active === index ? "is-active" : ""}
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => setActive(index)}
          />
        ))}
      </div>
    </section>
  );
}

function CategoryStrip({ categories }) {
  const rowRef = useRef(null);

  const scrollCategories = () => {
    rowRef.current?.scrollBy({
      left: Math.min(rowRef.current.clientWidth * 0.78, 520),
      behavior: "smooth",
    });
  };

  return (
    <section className="journal-section journal-categories" id="catalog" data-animate>
      <SectionTitle script="Categories" title="Shop by Category" subtitle="Create custom title modules with accent icons and decorative text." />
      <div className="journal-category-carousel">
        <div className="journal-category-row" ref={rowRef}>
          {categories.map((category) => (
            <article className="journal-category-card" key={category.name} data-animate>
              <div className="journal-category-image">
                <img src={category.image} alt={category.name} />
              </div>
              <div className="journal-category-copy">
                <h3>{category.name}</h3>
                <p>{category.count} Product(s)</p>
                <a href="/shop">Shop now <span aria-hidden="true">→</span></a>
              </div>
            </article>
          ))}
        </div>
        <button className="journal-category-next" type="button" aria-label="Next categories" onClick={scrollCategories}>
          →
        </button>
      </div>
      <div className="journal-ticker" aria-label="Promotions">
        <div className="journal-ticker-track">
          {Array.from({ length: 6 }).map((_, index) => (
            <span className="journal-ticker-group" key={index}>
              <b>FREE SHIPPING</b>
              <span>On orders over $200</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product, compact = false }) {
  const { auth } = useStorefrontContent();
  const [showFavoritePrompt, setShowFavoritePrompt] = useState(false);

  const handleFavorite = () => {
    if (!auth?.isAuthenticated) {
      setShowFavoritePrompt(true);
      return;
    }

    window.location.assign("/account/favorites");
  };

  return (
    <article className={`journal-product-card ${compact ? "is-compact" : ""}`} data-animate>
      {product.sale && <span className="journal-sale-flag">%</span>}
      {product.top && <span className="journal-top-badge"><FaStar /> Top Brand</span>}
      <div className="journal-product-image">
        <img src={product.image} alt={product.name} />
      </div>
      <a className="journal-product-brand" href="#brand">{product.brand}</a>
      <h3><a href="/shop">{product.name}</a></h3>
      <p className="journal-price"><strong>{product.price}</strong>{product.old && <del>{product.old}</del>}</p>
      <div className="journal-card-actions">
        <button type="button"><FaShoppingCart /> Add to Cart</button>
        <button type="button" aria-label="Wishlist" onClick={handleFavorite}><FaRegHeart /></button>
        <button type="button" aria-label="Compare"><FiRefreshCw /></button>
      </div>
      {showFavoritePrompt && (
        <FavoriteLoginPrompt onClose={() => setShowFavoritePrompt(false)} />
      )}
    </article>
  );
}

function FavoriteLoginPrompt({ onClose }) {
  return (
    <div className="journal-favorite-prompt" role="dialog" aria-modal="true" aria-label="Connexion requise">
      <div>
        <button type="button" onClick={onClose} aria-label="Fermer">×</button>
        <strong>Connexion requise</strong>
        <p>Vous devez vous connecter ou créer un compte pour ajouter ce produit aux favoris.</p>
        <div>
          <a href="/login">Se connecter</a>
          <a href="/register">Créer un compte</a>
        </div>
      </div>
    </div>
  );
}

function Products({ products }) {
  const [tab, setTab] = useState("New Arrivals");
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const rowRef = useRef(null);
  const visible = useMemo(() => {
    if (tab === "SALE") return products.filter((product) => product.sale);
    if (tab === "Bestsellers") return [...products].sort((first, second) => Number(Boolean(second.top)) - Number(Boolean(first.top)));
    return products;
  }, [products, tab]);

  const updateProductNav = () => {
    const row = rowRef.current;
    if (!row) return;

    setCanScrollPrev(row.scrollLeft > 8);
    setCanScrollNext(row.scrollLeft + row.clientWidth < row.scrollWidth - 8);
  };

  useEffect(() => {
    rowRef.current?.scrollTo({ left: 0, behavior: "smooth" });
    window.setTimeout(updateProductNav, 120);
  }, [tab]);

  useEffect(() => {
    updateProductNav();
    window.addEventListener("resize", updateProductNav);
    return () => window.removeEventListener("resize", updateProductNav);
  }, [visible]);

  const scrollProducts = (direction) => {
    const row = rowRef.current;
    if (!row) return;

    row.scrollBy({
      left: direction * Math.max(row.clientWidth - 90, 260),
      behavior: "smooth",
    });
  };

  return (
    <section className="journal-section journal-products" id="products" data-animate>
      <SectionTitle script="Products" title="Featured Products" subtitle="Create custom title modules with accent icons and decorative text." />
      <div className="journal-tabs">
        {["New Arrivals", "Bestsellers", "SALE"].map((item) => (
          <button key={item} type="button" className={tab === item ? "is-active" : ""} onClick={() => setTab(item)}>
            {item}
          </button>
        ))}
      </div>
      <div className="journal-products-carousel">
        {canScrollPrev && (
          <button className="journal-product-nav is-prev" type="button" aria-label="Previous products" onClick={() => scrollProducts(-1)}>
          ‹
          </button>
        )}
        <div className="journal-products-row" ref={rowRef} tabIndex={0} aria-label={`${tab} product carousel`} onScroll={updateProductNav}>
          <div className="journal-products-track">
            {visible.map((product) => <ProductCard key={`${tab}-${product.name}`} product={product} />)}
          </div>
        </div>
        {canScrollNext && (
          <button className="journal-product-nav is-next" type="button" aria-label="Next products" onClick={() => scrollProducts(1)}>
          ›
          </button>
        )}
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="journal-services" data-animate>
      {[
        [FaTruck, "Fast Shipping"],
        [MdOutlineShield, "Secure Shopping"],
        [TbPackageImport, "Easy Return"],
        [FiHeadphones, "24h Service"],
      ].map(([Icon, label]) => (
        <article key={label} data-animate>
          <Icon />
          <h3>{label}</h3>
          <p>Optional secondary info block text</p>
        </article>
      ))}
    </section>
  );
}

function FeaturedCategoriesOld({ products, featureImage }) {
  const rowRefs = useRef({});
  const rows = [
    {
      title: "Beauty",
      links: ["Makeup", "Face", "Eyes", "Lips"],
      image: featureImage || products[6]?.image,
      products: [...products.slice(4, 8), ...products.slice(0, 4)],
    },
    {
      title: "Skin Care",
      links: ["Moisturizers", "Hand Lotion", "Face Primer", "Body Lotion"],
      image: products[1]?.image || featureImage,
      products: [...products.slice(0, 4), ...products.slice(4, 8)],
    },
  ];

  const scrollFeaturedRow = (rowTitle, direction) => {
    const row = rowRefs.current[rowTitle];
    if (!row) return;

    row.scrollBy({
      left: direction * Math.max(row.clientWidth - 72, 240),
      behavior: "smooth",
    });
  };

  return (
    <section className="journal-section journal-featured" id="featured" data-animate>
      <SectionTitle script="Featured" title="Featured Categories" subtitle="Create custom title modules with accent icons and decorative text." />
      <div className="journal-feature-showcase">
        {rows.map((row) => (
          <div className="journal-feature-row" key={row.title}>
            <article className="journal-feature-tile" data-animate>
              <div className="journal-feature-copy">
                <h3>{row.title}</h3>
                <div>
                  {row.links.map((link) => (
                    <a key={link} href="/shop">{link}</a>
                  ))}
                </div>
                <a className="journal-feature-more" href="/shop">View More <MdOutlineKeyboardArrowRight /></a>
              </div>
              {row.image && (
                <img src={row.image} alt={`${row.title} category`} />
              )}
            </article>
            <div className="journal-feature-carousel">
              <button className="journal-product-nav is-prev" type="button" aria-label={`Previous ${row.title} products`} onClick={() => scrollFeaturedRow(row.title, -1)}>
                â€¹
              </button>
              <div className="journal-feature-products" ref={(element) => { rowRefs.current[row.title] = element; }} tabIndex={0} aria-label={`${row.title} product carousel`}>
                <div className="journal-feature-track">
                  {row.products.map((product, index) => (
                    <ProductCard key={`${row.title}-${product.name}-${index}`} product={product} />
                  ))}
                </div>
              </div>
              <button className="journal-product-nav is-next" type="button" aria-label={`Next ${row.title} products`} onClick={() => scrollFeaturedRow(row.title, 1)}>
                â€º
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FeaturedCategories({ products, featureImage }) {
  const rowRefs = useRef({});
  const [rowNav, setRowNav] = useState({});
  const rows = useMemo(
    () => [
      {
        title: "Beauty",
        links: ["Makeup", "Face", "Eyes", "Lips"],
        image: featureImage || products[6]?.image,
        products: [...products.slice(4, 8), ...products.slice(0, 4)],
      },
      {
        title: "Skin Care",
        links: ["Moisturizers", "Hand Lotion", "Face Primers", "Body Lotion"],
        image: products[1]?.image || featureImage,
        products: [...products.slice(0, 4), ...products.slice(4, 8)],
      },
    ],
    [featureImage, products]
  );

  const updateFeaturedNav = (rowTitle) => {
    const row = rowRefs.current[rowTitle];
    if (!row) return;

    setRowNav((current) => ({
      ...current,
      [rowTitle]: {
        canScrollPrev: row.scrollLeft > 8,
        canScrollNext: row.scrollLeft + row.clientWidth < row.scrollWidth - 8,
      },
    }));
  };

  useEffect(() => {
    const updateAllRows = () => rows.forEach((row) => updateFeaturedNav(row.title));
    updateAllRows();
    const timer = window.setTimeout(updateAllRows, 120);
    window.addEventListener("resize", updateAllRows);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("resize", updateAllRows);
    };
  }, [rows]);

  const scrollFeaturedRow = (rowTitle, direction) => {
    const row = rowRefs.current[rowTitle];
    if (!row) return;

    row.scrollBy({
      left: direction * Math.max(row.clientWidth - 90, 260),
      behavior: "smooth",
    });
  };

  return (
    <section className="journal-section journal-featured" id="featured" data-animate>
      <SectionTitle script="Featured" title="Featured Categories" subtitle="Create custom title modules with accent icons and decorative text." />
      <div className="journal-feature-showcase">
        {rows.map((row) => {
          const nav = rowNav[row.title] || {};

          return (
            <div className="journal-feature-carousel" key={row.title}>
              {nav.canScrollPrev && (
                <button className="journal-product-nav is-prev" type="button" aria-label={`Previous ${row.title} products`} onClick={() => scrollFeaturedRow(row.title, -1)}>
                  <FiChevronLeft aria-hidden="true" />
                </button>
              )}
              <div
                className="journal-feature-products"
                ref={(element) => { rowRefs.current[row.title] = element; }}
                tabIndex={0}
                aria-label={`${row.title} featured products carousel`}
                onScroll={() => updateFeaturedNav(row.title)}
              >
                <div className="journal-feature-track">
                  <article className="journal-feature-tile" data-animate>
                    <div className="journal-feature-copy">
                      <h3>{row.title}</h3>
                      <div>
                        {row.links.map((link) => (
                          <a key={link} href="/shop">{link}</a>
                        ))}
                      </div>
                      <a className="journal-feature-more" href="/shop">View More <MdOutlineKeyboardArrowRight /></a>
                    </div>
                    {row.image && (
                      <img src={row.image} alt={`${row.title} category`} />
                    )}
                  </article>
                  {row.products.map((product, index) => (
                    <ProductCard key={`${row.title}-${product.name}-${index}`} product={product} />
                  ))}
                </div>
              </div>
              {nav.canScrollNext && (
                <button className="journal-product-nav is-next" type="button" aria-label={`Next ${row.title} products`} onClick={() => scrollFeaturedRow(row.title, 1)}>
                  <FiChevronRight aria-hidden="true" />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function PromoBanner({ image }) {
  return (
    <section className="journal-promo" data-animate style={{ backgroundImage: `linear-gradient(90deg, rgba(231,216,200,.96), rgba(231,216,200,.78) 42%, rgba(231,216,200,.24) 78%), url(${image})` }}>
      <div>
        <span>Discover</span>
        <h2>Everything You Love, All in One Place</h2>
        <p>Explore fashion, beauty, accessories, home essentials, and more in one elegant shopping experience.</p>
        <a className="journal-btn journal-btn-light" href="/shop">Shop Collection</a>
        <a className="journal-text-link journal-light-link" href="#catalog">Learn more</a>
      </div>
    </section>
  );
}

function Testimonials() {
  const [active, setActive] = useState(0);
  const current = testimonials[active];
  const next = () => setActive((value) => (value + 1) % testimonials.length);
  const prev = () => setActive((value) => (value - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="journal-testimonials" data-animate>
      <SectionTitle script="Avis clients" title="Ce que disent nos clients" subtitle="MATJARI est apprecie par ses clients pour son experience d'achat simple, ses produits varies et son service fiable." />
      <div className="journal-testimonial-stage">
        <button className="journal-round-nav" type="button" aria-label="Previous testimonial" onClick={prev}>
          <FiChevronLeft aria-hidden="true" />
        </button>
        <div className="journal-testimonial-copy" key={current.author}>
          <div className="journal-rating" aria-label="4.9 sur 5 base sur les avis clients">
            <span aria-hidden="true">{Array.from({ length: 5 }).map((_, index) => <FaStar key={index} />)}</span>
            <strong>4.9/5</strong>
            <em>base sur les avis clients</em>
          </div>
          <div className="journal-quotes" aria-hidden="true">"</div>
          <blockquote>{current.quote}</blockquote>
          <strong>- {current.author}</strong>
          <small>{current.detail}</small>
          <div className="journal-dots">
            {testimonials.map((item, index) => (
              <button
                key={item.author}
                type="button"
                className={index === active ? "is-active" : ""}
                aria-label={`Show testimonial ${index + 1}`}
                onClick={() => setActive(index)}
              />
            ))}
          </div>
        </div>
        <button className="journal-round-nav" type="button" aria-label="Next testimonial" onClick={next}>
          <FiChevronRight aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}

function About({ image }) {
  return (
    <section className="journal-about" id="about" data-animate>
      <img src={image} alt="About Journal skincare" />
      <div>
        <span>Journal</span>
        <h2>About us</h2>
        <p>
          Since 2013, Journal has been the best selling and most loved OpenCart theme on the market. Now at version 3, it brings many new and revolutionary features with modern modules and flexible layouts.
        </p>
        <a className="journal-btn journal-btn-outline" href="#more">Read more →</a>
      </div>
    </section>
  );
}

function Gallery({ images, status }) {
  return (
    <section className="journal-gallery" data-animate>
      <SectionTitle script="Inspiration" title="Folder 11 Gallery" subtitle={`${images.length} local image file${images.length === 1 ? "" : "s"} loaded from public/images/11.`} dark />
      <div className="journal-gallery-row">
        {status === "loading" && (
          <p className="journal-gallery-status">Loading local images...</p>
        )}
        {images.map((image, index) => (
          <figure className="journal-gallery-item" key={image.path || image.url} data-animate>
            <img src={image.url} alt={image.filename || `Gallery item ${index + 1}`} loading="lazy" />
            <figcaption title={image.path}>{image.filename}</figcaption>
          </figure>
        ))}
        {status === "failed" && (
          <p className="journal-gallery-status">Could not load {images11ManifestUrl}.</p>
        )}
      </div>
    </section>
  );
}

function Blog({ blogPosts }) {
  const rowRef = useRef(null);

  const scrollBlog = (direction) => {
    const row = rowRef.current;
    if (!row) return;

    row.scrollBy({
      left: direction * Math.max(row.clientWidth - 96, 280),
      behavior: "smooth",
    });
  };

  return (
    <section className="journal-section journal-blog" id="blog" data-animate>
      <SectionTitle script="Blog" title="Latest News" subtitle="Decouvrez nos conseils, inspirations et nouveautes pour mieux choisir vos produits." />
      <div className="journal-blog-carousel">
        <button className="journal-product-nav is-prev" type="button" aria-label="Previous blog posts" onClick={() => scrollBlog(-1)}>
          <FiChevronLeft aria-hidden="true" />
        </button>
        <div className="journal-blog-row" ref={rowRef} tabIndex={0} aria-label="Latest news carousel">
          <div className="journal-blog-track">
            {blogPosts.map((post) => (
              <article className="journal-blog-card" key={post.title} data-animate>
                <div className="journal-blog-image">
                  <img src={post.image} alt={post.title} />
                  <div><strong>{post.day}</strong><span>{post.month}</span></div>
                </div>
                <p>{post.category} / admin / {post.comments} commentaires / {post.views} vues</p>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <a href="#read">Lire l'article <MdOutlineKeyboardArrowRight /></a>
              </article>
            ))}
          </div>
        </div>
        <button className="journal-product-nav is-next" type="button" aria-label="Next blog posts" onClick={() => scrollBlog(1)}>
          <FiChevronRight aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}

function Newsletter() {
  return (
    <section className="journal-newsletter" data-animate>
      <FiMail />
      <h2>Sign up now & get 15% Off</h2>
      <p>Stay up to date with news and promotions by signing up for our newsletter</p>
      <form onSubmit={(event) => event.preventDefault()}>
        <FiAtSign />
        <input type="email" placeholder="Enter email" aria-label="Email address" />
        <button type="submit"><FiSend /> Sign Up</button>
      </form>
    </section>
  );
}

export function JournalFooter() {
  const columns = [
    ["About Us", ["About Us", "Blog", "FAQ", "Privacy Policy", "Terms & Conditions"]],
    ["My Account", ["Login", "Order History", "Affiliates", "Newsletter", "Gift Certificate", "Returns"]],
    ["Customer Service", ["Contact Us", "Store Locations", "Our Brands", "Site Map", "Delivery Information", "Unlimited Links"]],
  ];

  return (
    <footer className="journal-footer">
      <div className="journal-footer-main">
        <div className="journal-footer-brand">
          <Logo />
          <p><FiMapPin /> 123 Main Str, London, UK</p>
          <p><FiPhone /> 1.800.555.8899</p>
          <p><FiMail /> Contact Us</p>
          <div className="journal-socials">
            {[FaFacebookF, FaInstagram, FaTwitter, FaTiktok, FaYoutube].map((Icon, index) => <span key={index}><Icon /></span>)}
          </div>
        </div>
        {columns.map(([title, items]) => (
          <div className="journal-footer-col" key={title}>
            <h3>{title}</h3>
            {items.map((item) => <a key={item} href={`#${item}`}>{item}</a>)}
          </div>
        ))}
      </div>
      <div className="journal-copyright">
        <p>Copyright © 2024, Your Store, All Rights Reserved</p>
        <div><span>VISA</span><span>MC</span><span>AMEX</span><span>DISC</span><span>PayPal</span><span>stripe</span></div>
      </div>
    </footer>
  );
}

export function JournalStyle() {
  return <style>{css}</style>;
}

export default function Home() {
  useScrollReveal();
  const { images, status } = useImages11();
  const { auth } = useStorefrontContent();
  const content = useMemo(() => buildHomeContent(images), [images]);

  return (
    <main className="journal-page">
      <JournalHeader categories={content.categories} auth={auth} />
      <Hero heroSlides={content.heroSlides} />
      <CategoryStrip categories={content.categories} />
      <Products products={content.products} />
      <Services />
      <FeaturedCategories products={content.products} featureImage={content.assets.feature} />
      <PromoBanner image={content.assets.promo} />
      <Testimonials />
      <About image={content.assets.about} />
      <Blog blogPosts={content.blogPosts} />
      <Newsletter />
      <JournalFooter />
      <JournalStyle />
    </main>
  );
}

const css = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Ephesis&family=Great+Vibes&family=Inter:wght@400;500;600;700;800&family=Libre+Baskerville:wght@400;700&family=Playfair+Display:wght@500;600;700;800&display=swap');

.journal-page { --cream: #eee4dc; --soft: #f4f4f3; --ink: #202526; --muted: #687074; --line: #dedbd8; --accent: #b91f2c; min-height: 100vh; background: #fff; color: var(--ink); font-family: Inter, system-ui, sans-serif; }
.journal-page * { box-sizing: border-box; }
.journal-page a { color: inherit; text-decoration: none; }
.journal-page img { display: block; max-width: 100%; }
.journal-header { position: relative; top: 0; z-index: 60; width: 100%; padding: 0 !important; background: #fff; border-top: 0; box-shadow: none; }
.journal-header-inner { height: 81px; display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 24px; padding: 0 38px; }
.journal-nav-left, .journal-nav-right { display: flex; align-items: center; }
.journal-nav-left { gap: 28px; font-family: Inter, 'Helvetica Neue', Arial, sans-serif; font-size: 13.5px; font-weight: 400; letter-spacing: .09em; text-transform: uppercase; line-height: 20px; color: #2f3335; }
.journal-nav-right { justify-content: flex-end; gap: 13px; color: #555b5e; font-family: Inter, 'Helvetica Neue', Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 20px; }
.journal-nav-left a, .journal-nav-right a { display: inline-flex; align-items: center; gap: 5px; border: 0; background: transparent; box-shadow: none; white-space: nowrap; }
.journal-language-menu { position: relative; display: inline-flex; align-items: center; }
.journal-nav-right .journal-language-trigger { width: auto; height: auto; display: inline-flex; align-items: center; gap: 5px; font-size: 14px; line-height: 20px; white-space: nowrap; }
.journal-language-dropdown { position: absolute; top: calc(100% + 14px); right: 0; z-index: 100; min-width: 150px; display: grid; gap: 2px; border: 1px solid rgba(32,37,38,.12); border-radius: 8px; background: rgba(255,255,255,.97); box-shadow: 0 20px 48px rgba(32,37,38,.14); padding: 8px; backdrop-filter: blur(12px); }
.journal-language-dropdown button { width: 100%; height: auto; min-height: 36px; display: flex; align-items: center; justify-content: flex-start; border: 0; border-radius: 6px; background: transparent; color: #303438; padding: 0 10px; font-size: 13px; line-height: 1; text-align: left; }
.journal-language-dropdown button:hover,
.journal-language-dropdown button.is-active { background: rgba(238,228,220,.72); color: #111827; }
[dir="rtl"] .journal-language-dropdown { right: auto; left: 0; }
[dir="rtl"] .journal-language-dropdown button { text-align: right; justify-content: flex-end; }
.journal-text-chevron { flex: 0 0 auto; display: inline-block; width: 0; height: 0; margin-top: 1px; border-left: 4px solid transparent; border-right: 4px solid transparent; border-top: 5px solid currentColor; opacity: .62; }
.journal-nav-left button, .journal-nav-right button { appearance: none; -webkit-appearance: none; display: inline-grid; place-items: center; width: 32px; height: 32px; border: 0; background: transparent; color: inherit; cursor: pointer; font-size: 20px; padding: 0; }
.journal-nav-left button { width: 23px; height: 17px; }
.journal-nav-left button svg { width: 23px; height: 17px; }
.journal-nav-right button, .journal-nav-right > a[aria-label="Cart"], .journal-icon-link { width: 32px; height: 32px; display: inline-grid; place-items: center; }
.journal-nav-right button svg, .journal-nav-right > a[aria-label="Cart"] svg, .journal-icon-link svg { width: 19px; height: 19px; stroke-width: 1.65; }
.journal-logo-link { width: 158px; height: 32px; display: grid; place-items: center; }
.journal-logo { display: inline-block; color: #121212; font-family: 'Bodoni 72', Didot, 'Cormorant Garamond', Georgia, serif; font-size: 32px; font-weight: 500; letter-spacing: .065em; transform: none; line-height: 1; }
.journal-search-popover { position: absolute; right: 38px; top: calc(100% + 10px); z-index: 90; width: min(520px, calc(100vw - 32px)); border: 1px solid rgba(32,37,38,.12); border-radius: 8px; background: #fff; box-shadow: 0 24px 70px rgba(32,37,38,.16); padding: 12px; }
.journal-search-popover form { display: grid; grid-template-columns: 24px minmax(0, 1fr) auto; align-items: center; gap: 12px; }
.journal-search-popover svg { color: var(--muted); font-size: 18px; }
.journal-search-popover input { width: 100%; height: 46px; border: 1px solid var(--line); border-radius: 6px; background: var(--soft); color: var(--ink); padding: 0 14px; font: 500 15px Inter, system-ui, sans-serif; outline: 0; }
.journal-search-popover input:focus { border-color: var(--accent); background: #fff; }
.journal-search-popover button { min-height: 46px; border: 0; border-radius: 6px; background: #000; color: #fff; padding: 0 18px; cursor: pointer; font: 700 14px Inter, system-ui, sans-serif; transition: background-color 180ms ease, transform 180ms ease; }
.journal-search-popover button:hover { background: #262626; transform: translateY(-1px); }
.journal-mobile-panel { display: none; border-top: 1px solid var(--line); padding: 12px 24px; background: white; }
.journal-mobile-panel a { display: block; padding: 12px 0; }

.journal-hero { position: relative; height: 617px; overflow: hidden; background: #1d130f; }
.journal-hero-main { position: absolute; inset: 0; overflow: hidden; background: #1d130f; }
.journal-hero-main::after { content: ""; position: absolute; inset: 0; background: linear-gradient(90deg, rgba(8,7,7,.58) 0%, rgba(8,7,7,.34) 34%, rgba(8,7,7,.08) 68%, rgba(8,7,7,.16) 100%); z-index: 1; }
.journal-hero-main video { width: 100%; height: 100%; object-fit: cover; object-position: center center; filter: saturate(.92) contrast(.92); transform: none; }
.journal-hero-copy { position: absolute; left: 48px; top: 128px; z-index: 2; width: min(740px, calc(100% - 520px)); color: #fff; padding: 34px 36px 36px; border-left: 1px solid rgba(255,255,255,.26); background: linear-gradient(90deg, rgba(12,10,9,.34), rgba(12,10,9,.12)); backdrop-filter: blur(1px); }
.journal-hero-copy span { font-family: Inter, system-ui, sans-serif; font-size: 13px; font-weight: 500; line-height: 1; letter-spacing: .18em; text-transform: uppercase; color: rgba(255,255,255,.78); }
.journal-promo span, .journal-about span { font-family: 'Ephesis', cursive; font-size: 39px; line-height: 1; color: rgba(255,255,255,.92); }
.journal-hero-copy h1 { margin: 34px 0 42px; font-family: 'Playfair Display', Georgia, serif; font-size: clamp(58px, 6.4vw, 82px); font-weight: 650; line-height: 1.08; letter-spacing: 0; word-spacing: 0; color: #fff; max-width: 12ch; }
.journal-hero-copy div { display: flex; align-items: center; gap: 28px; }
.journal-btn { display: inline-flex; align-items: center; justify-content: center; width: 205px; min-height: 58px; border-radius: 999px; padding: 0 32px; font-size: 16px; font-weight: 500; border: 0; }
.journal-btn-dark { background: #fff; color: #202526 !important; }
.journal-btn-light { background: white; color: #252b2c; }
.journal-btn-outline { border-color: #656a6c; background: transparent; color: #343a3c; }
.journal-text-link { display: inline-flex; align-items: center; gap: 8px; color: rgba(255,255,255,.82); font-size: 15px; font-weight: 500; letter-spacing: .02em; line-height: 1; border-bottom: 0; }
.journal-text-link span { font-family: inherit; font-size: 14px; letter-spacing: 0; text-transform: none; color: currentColor; transition: transform 180ms ease; }
.journal-text-link:hover span { transform: translateX(3px); }
.journal-light-link { color: #fff; margin-left: 28px; }
.journal-round-nav { width: 42px; height: 42px; display: inline-grid; place-items: center; border-radius: 50%; border: 1px solid rgba(32,37,38,.16); background: rgba(255,255,255,.94); color: #202526; box-shadow: 0 12px 28px rgba(32,37,38,.08); cursor: pointer; font-size: 18px; transition: transform 180ms ease, background-color 180ms ease, border-color 180ms ease, box-shadow 180ms ease; }
.journal-round-nav:hover { background: #fff; border-color: rgba(32,37,38,.3); box-shadow: 0 16px 34px rgba(32,37,38,.12); }
.journal-round-nav:first-child:hover { transform: translateX(-2px); }
.journal-round-nav:last-child:hover { transform: translateX(2px); }
.journal-hero-nav { position: absolute; right: 38px; top: 50%; z-index: 4; display: grid; gap: 12px; transform: translateY(-50%); }
.journal-hero-arrow { width: 40px; height: 40px; display: grid; place-items: center; border: 1px solid rgba(255,255,255,.34); border-radius: 50%; background: rgba(10,10,10,.18); color: rgba(255,255,255,.86); cursor: pointer; font-family: Georgia, serif; font-size: 24px; font-weight: 300; line-height: 1; transition: background-color 180ms ease, border-color 180ms ease, color 180ms ease, transform 180ms ease; }
.journal-hero-arrow:hover { background: rgba(255,255,255,.12); border-color: rgba(255,255,255,.56); color: #fff; transform: translateY(-1px); }
.journal-hero-dots { position: absolute; left: 84px; bottom: 46px; z-index: 3; display: flex; align-items: center; gap: 12px; color: #fff; }
.journal-hero-dots span, .journal-dots span { width: 7px; height: 7px; border-radius: 50%; background: currentColor; opacity: .8; }
.journal-hero-dots .is-active { width: 20px; height: 20px; border: 3px solid #fff; background: transparent; opacity: 1; }

.journal-section { padding: 86px 40px; overflow: hidden; }
.journal-section-title { max-width: 920px; margin: 0 auto 62px; text-align: center; }
.journal-section-title span { display: block; margin-bottom: -5px; font-family: 'Great Vibes', cursive; font-size: 54px; font-weight: 400; line-height: 1; color: #cfd0d1; }
.journal-section-title h2 { margin: 0 0 24px; font-family: 'Playfair Display', Georgia, serif; font-size: 39px; font-weight: 700; line-height: 1; color: #050505; }
.journal-section-title p { margin: 0; color: var(--muted); font-size: 18px; }
.journal-section-title.is-dark h2, .journal-section-title.is-dark p { color: #f3f3f3; }
.journal-section-title.is-dark span { color: rgba(255,255,255,.22); }

.journal-categories { padding-top: 92px; padding-bottom: 0; }
.journal-category-carousel { position: relative; overflow: hidden; }
.journal-category-row { display: grid; grid-auto-flow: column; grid-auto-columns: minmax(300px, 1fr); gap: 14px; overflow-x: auto; overflow-y: hidden; padding: 2px 58px 6px 0; scroll-behavior: smooth; scrollbar-width: none; -ms-overflow-style: none; }
.journal-category-row::-webkit-scrollbar { display: none; width: 0; height: 0; }
.journal-category-card { min-height: 138px; display: grid; grid-template-columns: 104px minmax(0, 1fr); align-items: center; gap: 20px; padding: 22px 24px; background: var(--soft); border-radius: 7px; }
.journal-category-image { width: 104px; height: 94px; display: grid; place-items: center; overflow: hidden; }
.journal-category-card img { width: 86px; height: 86px; object-fit: contain; mix-blend-mode: multiply; }
.journal-category-copy { min-width: 0; }
.journal-category-card h3, .journal-feature-tile h3 { margin: 0 0 8px; font-family: 'Playfair Display', Georgia, serif; font-size: 25px; font-weight: 500; }
.journal-category-card p { margin: 0 0 12px; color: var(--muted); font-size: 14px; }
.journal-category-card a, .journal-feature-tile a, .journal-blog-card a { display: inline-flex; align-items: center; gap: 6px; color: #252b2c; font-size: 13px; font-weight: 600; letter-spacing: .04em; text-transform: uppercase; }
.journal-category-card a span { font-size: 13px; transition: transform 180ms ease; }
.journal-category-card a:hover span { transform: translateX(3px); }
.journal-category-next { position: absolute; right: 0; top: 50%; z-index: 3; width: 42px; height: 42px; display: grid; place-items: center; border: 1px solid rgba(32,37,38,.16); border-radius: 50%; background: rgba(255,255,255,.9); color: #202526; box-shadow: 0 12px 28px rgba(32,37,38,.08); cursor: pointer; font-family: Georgia, serif; font-size: 20px; line-height: 1; transform: translateY(-50%); transition: transform 180ms ease, background-color 180ms ease, border-color 180ms ease; }
.journal-category-next:hover { background: #fff; border-color: rgba(32,37,38,.28); transform: translateY(-50%) translateX(2px); }
.journal-ticker { margin: 58px -40px 0; height: 42px; display: flex; align-items: center; overflow: hidden; background: var(--cream); color: #202526; white-space: nowrap; }
.journal-ticker-track { min-width: max-content; display: flex; align-items: center; animation: journalMarquee 32s linear infinite; }
.journal-ticker-group { display: inline-flex; align-items: center; gap: 22px; padding-right: 22px; font: 15px Inter, system-ui, sans-serif; letter-spacing: .04em; }
.journal-ticker-group::after { content: "•"; color: rgba(32,37,38,.62); }
.journal-ticker b { font-weight: 800; letter-spacing: .12em; text-transform: uppercase; }
@keyframes journalMarquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

.journal-tabs { display: flex; justify-content: center; gap: 46px; margin: -32px 0 42px; }
.journal-tabs button { border: 0; border-bottom: 2px solid transparent; background: transparent; padding: 8px 0; color: #777c7f; cursor: pointer; font: 24px Georgia, serif; }
.journal-tabs button.is-active { color: #171b1c; border-color: #171b1c; }
.journal-tabs button:last-child { color: var(--accent); }
.journal-blog-carousel { position: relative; width: min(100%, 1500px); margin: 0 auto; }
.journal-blog-row { overflow-x: auto; overflow-y: hidden; scroll-behavior: smooth; scroll-snap-type: x mandatory; scrollbar-width: none; -ms-overflow-style: none; padding: 2px 52px 14px; }
.journal-blog-row::-webkit-scrollbar { display: none; width: 0; height: 0; }
.journal-blog-track { display: flex; gap: 22px; align-items: stretch; }
.journal-blog-track > .journal-blog-card { flex: 0 0 clamp(400px, 29vw, 460px); scroll-snap-align: start; }
.journal-products-carousel { position: relative; width: min(100%, 1320px); margin: 0 auto; }
.journal-products-row { overflow-x: auto; overflow-y: hidden; scroll-behavior: smooth; scroll-snap-type: x mandatory; scrollbar-width: none; -ms-overflow-style: none; padding: 2px 3px 10px; }
.journal-products-row::-webkit-scrollbar { display: none; width: 0; height: 0; }
.journal-products-track, .journal-feature-track { display: flex; gap: 22px; align-items: stretch; }
.journal-products-track > .journal-product-card,
.journal-feature-track > .journal-product-card { flex: 0 0 calc((100% - 66px) / 4); scroll-snap-align: start; }
.journal-product-card { position: relative; height: 455px; min-width: 0; display: flex; flex-direction: column; padding: 16px 16px 0; overflow: hidden; background: var(--soft); border: 1px solid rgba(32,37,38,.08); border-radius: 6px; box-shadow: 0 12px 30px rgba(32,37,38,.04); }
.journal-product-card.is-compact { height: 430px; min-height: 430px; padding: 16px 16px 0; }
.journal-product-image { flex: 0 0 248px; height: 248px; display: grid; place-items: center; overflow: hidden; }
.journal-product-image img { width: min(82%, 205px); height: min(82%, 205px); object-fit: contain; mix-blend-mode: multiply; filter: drop-shadow(0 14px 16px rgba(0,0,0,.15)); }
.journal-sale-flag { position: absolute; left: 22px; top: 20px; z-index: 2; padding: 9px 7px; background: var(--accent); color: white; font-weight: 800; }
.journal-top-badge { position: absolute; right: 16px; top: 16px; z-index: 2; display: inline-flex; align-items: center; gap: 5px; border: 1px solid #555; border-radius: 3px; padding: 6px 9px; background: #fafafa; font-size: 12px; }
.journal-top-badge svg { color: #f5bf22; }
.journal-product-brand { color: #697175; font-size: 13px; text-decoration: underline; }
.journal-product-card h3 { min-height: 46px; margin: 8px 0 7px; font: 19px Georgia, serif; font-weight: 400; line-height: 1.22; }
.journal-price { margin: 0 0 16px; font: 18px Georgia, serif; }
.journal-price del { margin-left: 10px; color: #e25348; font-size: 15px; }
.journal-card-actions { margin: auto -16px 0; min-height: 58px; display: grid; grid-template-columns: 1fr auto auto; align-items: center; gap: 12px; border-top: 1px solid #dbd9d6; padding: 0 16px; }
.journal-card-actions button { display: inline-flex; align-items: center; gap: 8px; border: 0; background: transparent; color: #5a6164; cursor: pointer; font-size: 14px; }
.journal-card-actions button:first-child { min-width: 0; justify-content: flex-start; color: #252b2c; font-weight: 600; }
.journal-product-nav { position: absolute; top: 50%; z-index: 4; width: 42px; height: 42px; display: grid; place-items: center; border: 1px solid rgba(32,37,38,.16); border-radius: 50%; background: rgba(255,255,255,.94); color: #202526; box-shadow: 0 12px 28px rgba(32,37,38,.08); cursor: pointer; font-family: Georgia, serif; font-size: 30px; font-weight: 300; line-height: 1; transform: translateY(-50%); transition: transform 180ms ease, background-color 180ms ease, border-color 180ms ease, box-shadow 180ms ease; }
.journal-product-nav:hover { background: #fff; border-color: rgba(32,37,38,.3); box-shadow: 0 16px 34px rgba(32,37,38,.12); }
.journal-product-nav.is-prev { left: -18px; }
.journal-product-nav.is-next { right: -18px; }
.journal-product-nav.is-prev:hover { transform: translateY(-50%) translateX(-2px); }
.journal-product-nav.is-next:hover { transform: translateY(-50%) translateX(2px); }
.journal-blog-carousel .journal-product-nav { top: 50%; }
.journal-blog-carousel .journal-product-nav svg { width: 18px; height: 18px; stroke-width: 2; }
.journal-product-card.is-compact .journal-product-image { flex-basis: 220px; height: 220px; }
.journal-product-card.is-compact .journal-product-image img { width: 86%; height: 86%; object-fit: contain; }
.journal-product-card.is-compact h3 { min-height: 45px; margin: 8px 0 7px; font-size: 18px; line-height: 1.25; }
.journal-product-card.is-compact .journal-product-brand { font-size: 12px; }
.journal-product-card.is-compact .journal-price { margin-bottom: 14px; font-size: 17px; }
.journal-product-card.is-compact .journal-card-actions { margin-left: -16px; margin-right: -16px; min-height: 56px; gap: 10px; padding: 0 14px; }
.journal-product-card.is-compact .journal-card-actions button { font-size: 13px; }
.journal-products { padding-top: 74px; padding-bottom: 66px; }
.journal-products .journal-section-title { margin-bottom: 42px; }
.journal-products .journal-section-title h2 { margin-bottom: 16px; }
.journal-products .journal-tabs { gap: 34px; margin: -18px 0 30px; }
.journal-products .journal-tabs button { font-size: 20px; padding: 7px 0; }
.journal-products-carousel { width: min(100%, 1500px); }
.journal-products .journal-products-row { padding: 2px 48px 12px 3px; }
.journal-products .journal-products-track { gap: 20px; }
.journal-products .journal-products-track > .journal-product-card { flex: 0 0 clamp(300px, 21vw, 330px); }
.journal-products .journal-product-card { height: 418px; padding: 14px 14px 0; }
.journal-products .journal-product-image { flex-basis: 218px; height: 218px; }
.journal-products .journal-product-image img { width: min(80%, 176px); height: min(80%, 176px); object-fit: contain; }
.journal-products .journal-product-brand { font-size: 12px; }
.journal-products .journal-product-card h3 { min-height: 42px; margin: 7px 0 6px; font-size: 18px; line-height: 1.2; }
.journal-products .journal-price { margin-bottom: 12px; font-size: 17px; }
.journal-products .journal-price del { font-size: 14px; }
.journal-products .journal-card-actions { margin-left: -14px; margin-right: -14px; min-height: 54px; gap: 10px; padding: 0 14px; }
.journal-products .journal-card-actions button { font-size: 13px; }
.journal-products .journal-top-badge { right: 14px; top: 14px; padding: 5px 8px; font-size: 11px; }
.journal-products .journal-sale-flag { left: 16px; top: 14px; padding: 8px 6px; }
.journal-favorite-prompt { position: fixed; inset: 0; z-index: 120; display: grid; place-items: center; padding: 20px; background: rgba(20,20,20,.42); backdrop-filter: blur(4px); }
.journal-favorite-prompt > div { position: relative; width: min(430px, 100%); border-radius: 8px; border: 1px solid rgba(0,0,0,.1); background: #fff; padding: 30px; box-shadow: 0 24px 70px rgba(0,0,0,.18); }
.journal-favorite-prompt button { position: absolute; right: 14px; top: 12px; border: 0; background: transparent; color: #202526; font-size: 24px; cursor: pointer; }
.journal-favorite-prompt strong { display: block; color: #202526; font: 28px 'Playfair Display', Georgia, serif; }
.journal-favorite-prompt p { margin: 12px 0 22px; color: #687074; font-size: 15px; line-height: 1.65; }
.journal-favorite-prompt div div { display: flex; flex-wrap: wrap; gap: 10px; }
.journal-favorite-prompt a { min-height: 44px; display: inline-flex; align-items: center; justify-content: center; border-radius: 8px; border: 1px solid #000; background: #000; color: #fff; padding: 0 18px; font-weight: 700; }
.journal-favorite-prompt a + a { background: #fff; color: #202526; border-color: rgba(0,0,0,.16); }

.journal-services { display: grid; grid-template-columns: repeat(4, 1fr); gap: 30px; padding: 66px 40px; text-align: center; background: var(--cream); }
.journal-services svg { margin: 0 auto; font-size: 38px; color: #555b5e; }
.journal-services h3 { margin: 18px 0 10px; font: 26px 'Playfair Display', Georgia, serif; }
.journal-services p { margin: 0; color: #554f4a; }
.journal-feature-showcase { width: min(100%, 1320px); margin: 0 auto; display: grid; gap: 24px; }
.journal-feature-row { display: grid; grid-template-columns: minmax(230px, 260px) minmax(0, 1fr); gap: 22px; align-items: stretch; }
.journal-feature-carousel { position: relative; min-width: 0; }
.journal-feature-products { overflow-x: auto; overflow-y: hidden; scroll-behavior: smooth; scroll-snap-type: x mandatory; scrollbar-width: none; -ms-overflow-style: none; padding: 2px 48px 12px 3px; }
.journal-feature-products::-webkit-scrollbar { display: none; width: 0; height: 0; }
.journal-feature-tile { position: relative; height: 455px; min-height: 455px; display: flex; overflow: hidden; padding: 28px 24px; background: linear-gradient(135deg, #f1e4d8, #f8f5f1); border: 1px solid rgba(32,37,38,.08); border-radius: 6px; box-shadow: 0 12px 30px rgba(32,37,38,.04); }
.journal-feature-tile::after { content: ""; position: absolute; inset: 0; background: linear-gradient(180deg, rgba(255,255,255,.16), rgba(255,255,255,0)); pointer-events: none; }
.journal-feature-copy { position: relative; z-index: 2; width: 58%; display: flex; flex-direction: column; align-items: flex-start; }
.journal-feature-tile h3 { margin-bottom: 18px; font-size: 25px; }
.journal-feature-copy div { display: grid; gap: 8px; }
.journal-feature-tile .journal-feature-copy div a { display: block; color: #4f5659; font-size: 14px; font-weight: 400; letter-spacing: 0; line-height: 1.35; text-transform: none; }
.journal-feature-more { margin-top: auto; padding-top: 18px; }
.journal-feature-tile img { position: absolute; right: -18px; bottom: 0; z-index: 1; width: 70%; height: 78%; object-fit: contain; object-position: right bottom; mix-blend-mode: multiply; filter: drop-shadow(0 18px 18px rgba(70,55,45,.13)); }
.journal-featured .journal-feature-showcase { width: min(100%, 1500px); }
.journal-featured .journal-feature-track { gap: 20px; }
.journal-featured .journal-feature-track > .journal-product-card,
.journal-featured .journal-feature-tile { flex: 0 0 calc((100% - 60px) / 4); scroll-snap-align: start; }
.journal-featured .journal-feature-tile { height: 418px; min-height: 418px; padding: 24px 22px; }
.journal-featured .journal-feature-tile h3 { margin-bottom: 16px; font-size: 24px; }
.journal-featured .journal-feature-tile img { right: -20px; width: 68%; height: 72%; }
.journal-featured .journal-product-card { height: 418px; padding: 14px 14px 0; }
.journal-featured .journal-product-image { flex-basis: 218px; height: 218px; }
.journal-featured .journal-product-image img { width: min(80%, 176px); height: min(80%, 176px); object-fit: contain; }
.journal-featured .journal-product-brand { font-size: 12px; }
.journal-featured .journal-product-card h3 { min-height: 42px; margin: 7px 0 6px; font-size: 18px; line-height: 1.2; }
.journal-featured .journal-price { margin-bottom: 12px; font-size: 17px; }
.journal-featured .journal-price del { font-size: 14px; }
.journal-featured .journal-card-actions { margin-left: -14px; margin-right: -14px; min-height: 54px; gap: 10px; padding: 0 14px; }
.journal-featured .journal-card-actions button { font-size: 13px; }
.journal-featured .journal-top-badge { right: 14px; top: 14px; padding: 5px 8px; font-size: 11px; }
.journal-featured .journal-sale-flag { left: 16px; top: 14px; padding: 8px 6px; }
.journal-featured .journal-product-nav svg { width: 18px; height: 18px; stroke-width: 2; }
.journal-promo { min-height: 570px; display: flex; align-items: center; padding: 86px 40px; background-size: cover; background-position: center right; color: var(--ink); }
.journal-promo > div { width: min(850px, 58vw); }
.journal-promo span { color: rgba(88,77,67,.54); }
.journal-promo h2 { margin: 20px 0 22px; font: clamp(50px, 5vw, 74px) 'Playfair Display', Georgia, serif; line-height: 1.04; color: #141819; max-width: 12.8ch; }
.journal-promo p { max-width: 620px; margin: 0 0 44px; color: #55534f; font-size: 18px; line-height: 1.7; }
.journal-promo .journal-light-link { color: rgba(32,37,38,.78); }

.journal-testimonials { padding: 72px 40px 68px; text-align: center; overflow: hidden; background: linear-gradient(180deg, #fff, #faf8f5); }
.journal-testimonials .journal-section-title { margin-bottom: 36px; }
.journal-testimonials .journal-section-title h2 { margin-bottom: 16px; }
.journal-testimonials .journal-section-title p { max-width: 760px; margin: 0 auto; }
.journal-testimonial-stage { width: min(100%, 980px); display: grid; grid-template-columns: 44px minmax(0, 1fr) 44px; align-items: center; gap: 18px; margin: 0 auto; }
.journal-testimonial-copy { position: relative; min-height: 278px; display: flex; flex-direction: column; align-items: center; justify-content: center; overflow: hidden; border: 1px solid rgba(32,37,38,.1); border-radius: 8px; background: rgba(255,255,255,.92); padding: 34px 44px 26px; box-shadow: 0 18px 42px rgba(32,37,38,.08); }
.journal-rating { display: inline-flex; align-items: center; justify-content: center; gap: 10px; margin-bottom: 18px; color: #202526; font-size: 13px; }
.journal-rating span { display: inline-flex; align-items: center; gap: 3px; color: #d6a348; }
.journal-rating svg { width: 14px; height: 14px; }
.journal-rating strong { color: #202526; font-family: Georgia, serif; font-size: 17px; letter-spacing: 0; }
.journal-rating em { color: #687074; font-style: normal; }
.journal-quotes { width: 34px; height: 34px; display: grid; place-items: center; margin: 0 auto 12px; border-radius: 50%; background: #eadbcb; color: #4f5659; font: 30px Georgia, serif; line-height: 1; }
.journal-testimonials blockquote { max-width: 760px; margin: 0 auto 18px; color: #3f4649; font-size: 20px; line-height: 1.55; font-style: italic; }
.journal-testimonials strong { color: #202526; font-family: Georgia, serif; letter-spacing: 1px; }
.journal-testimonials small { display: block; margin-top: 6px; color: #687074; font-size: 12px; letter-spacing: .08em; text-transform: uppercase; }
.journal-testimonials .journal-dots { margin-top: 20px; display: flex; justify-content: center; gap: 12px; }
.journal-dots .is-active { opacity: 1; }

.journal-about { display: grid; grid-template-columns: 1fr 1fr; gap: 90px; align-items: center; padding: 130px 40px 80px; background: linear-gradient(90deg, #f1e0cf, #fff 45%, #fff8ef); }
.journal-about img { width: 100%; height: 620px; object-fit: cover; }
.journal-about > div { max-width: 820px; }
.journal-about span { color: #c3c6c8; }
.journal-about h2 { margin: -12px 0 24px; font: 42px 'Playfair Display', Georgia, serif; }
.journal-about p { margin: 0 0 38px; color: #697075; font-size: 20px; line-height: 1.55; }
.journal-gallery { padding: 70px 40px 40px; overflow: hidden; background: #222829; }
.journal-gallery-row { display: grid; grid-template-columns: repeat(auto-fill, minmax(170px, 1fr)); gap: 18px; align-items: stretch; max-height: 760px; overflow-y: auto; padding-right: 8px; scrollbar-width: thin; }
.journal-gallery-item { min-width: 0; margin: 0; overflow: hidden; border-radius: 6px; background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.08); }
.journal-gallery-row img { width: 100%; height: 190px; object-fit: cover; opacity: .9; }
.journal-gallery-item figcaption { overflow: hidden; white-space: nowrap; text-overflow: ellipsis; padding: 9px 10px; color: rgba(255,255,255,.72); font-size: 12px; }
.journal-gallery-status { grid-column: 1 / -1; color: rgba(255,255,255,.72); text-align: center; }

.journal-blog-card { height: 364px; display: flex; flex-direction: column; overflow: hidden; border: 1px solid rgba(32,37,38,.08); border-radius: 6px; background: #fff; box-shadow: 0 12px 30px rgba(32,37,38,.04); }
.journal-blog-image { position: relative; flex: 0 0 164px; height: 164px; overflow: hidden; border-radius: 6px 6px 0 0; background: var(--soft); }
.journal-blog-image img { width: 100%; height: 100%; object-fit: cover; }
.journal-blog-image div { position: absolute; left: 10px; top: 10px; width: 54px; height: 56px; display: grid; place-items: center; align-content: center; border-radius: 7px; background: #eadbcb; font-family: Georgia, serif; line-height: 1; box-shadow: 0 10px 22px rgba(32,37,38,.1); }
.journal-blog-image strong { font-size: 21px; }
.journal-blog-image span { font-size: 12px; }
.journal-blog-card > p:first-of-type { margin: 0; padding: 9px 16px; background: rgba(237,232,226,.86); color: #687074; font-size: 11px; line-height: 1.35; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.journal-blog-card h3 { display: -webkit-box; min-height: 0; margin: 12px 16px 7px; overflow: hidden; -webkit-box-orient: vertical; -webkit-line-clamp: 2; font: 20px Georgia, serif; font-weight: 400; line-height: 1.2; }
.journal-blog-card > p:not(:first-of-type) { display: -webkit-box; margin: 0 16px 8px; overflow: hidden; -webkit-box-orient: vertical; -webkit-line-clamp: 2; color: #666d70; font-size: 13px; line-height: 1.45; }
.journal-blog-card > a { margin: auto 12px 12px; padding: 12px 14px; border-radius: 999px; transition: gap 180ms ease, background-color 180ms ease, color 180ms ease; }
.journal-blog-card > a svg { flex: 0 0 auto; transition: transform 180ms ease; }
.journal-blog-card > a:hover { gap: 10px; background: rgba(237,232,226,.78); color: #15191a; }
.journal-blog-card > a:hover svg { transform: translateX(3px); }

.journal-newsletter { padding: 96px 20px 82px; text-align: center; background: var(--cream); }
.journal-newsletter > svg { margin: 0 auto 22px; font-size: 46px; color: #202526; }
.journal-newsletter h2 { margin: 0 0 20px; font: clamp(38px, 3vw, 50px) 'Playfair Display', Georgia, serif; }
.journal-newsletter p { margin: 0 0 46px; color: #333; font-size: 19px; }
.journal-newsletter form { display: flex; align-items: center; justify-content: center; gap: 10px; }
.journal-newsletter form > svg { color: #a8a8a8; font-size: 34px; }
.journal-newsletter input { width: min(500px, 56vw); height: 56px; border: 1px solid #d5d5d5; border-radius: 999px; background: #f7f7f7; padding: 0 160px 0 28px; outline: 0; }
.journal-newsletter button { height: 46px; margin-left: -150px; display: inline-flex; align-items: center; gap: 8px; border: 0; border-radius: 999px; background: #202526; color: white; padding: 0 24px; cursor: pointer; }

.journal-footer { background: var(--soft); }
.journal-footer-main { display: grid; grid-template-columns: 1.2fr repeat(3, 1fr); gap: 74px; padding: 112px 42px 120px; }
.journal-footer-brand { background: white; margin: -112px 0 -120px -42px; padding: 112px 42px 120px; }
.journal-footer-brand .journal-logo { margin-bottom: 36px; font-size: 30px; }
.journal-footer-brand p { display: flex; align-items: center; gap: 12px; color: #526067; font-size: 18px; }
.journal-socials { display: flex; gap: 14px; margin-top: 38px; }
.journal-socials span { width: 54px; height: 54px; display: grid; place-items: center; border: 1px solid #e1e1e1; border-radius: 50%; background: white; color: #4e5b62; font-size: 20px; }
.journal-footer-col h3 { margin: 0 0 28px; font: 24px Georgia, serif; color: #070707; }
.journal-footer-col a { display: block; margin: 17px 0; color: #42515a; }
.journal-copyright { min-height: 86px; display: flex; justify-content: space-between; align-items: center; gap: 24px; padding: 0 42px; background: var(--cream); color: #514b47; }
.journal-copyright div { display: flex; gap: 9px; flex-wrap: wrap; justify-content: flex-end; }
.journal-copyright span { border-radius: 3px; background: #5c5c5c; color: white; padding: 6px 8px; font-weight: 800; font-size: 13px; }

.journal-header {
  position: sticky;
  transition: box-shadow 240ms ease, background-color 240ms ease, transform 240ms ease;
}
.journal-header.is-scrolled {
  background: rgba(255,255,255,.94);
  box-shadow: 0 14px 34px rgba(32,37,38,.1);
  backdrop-filter: blur(14px);
}
.journal-header.is-scrolled .journal-header-inner {
  height: 66px;
}
.journal-header-inner,
.journal-logo,
.journal-nav-left a,
.journal-nav-right a,
.journal-nav-left button,
.journal-nav-right button,
.journal-btn,
.journal-text-link,
.journal-round-nav,
.journal-card-actions button,
.journal-socials span {
  transition: transform 220ms ease, color 220ms ease, background-color 220ms ease, border-color 220ms ease, opacity 220ms ease, box-shadow 220ms ease;
}
.journal-nav-left a:hover,
.journal-nav-right a:hover,
.journal-nav-left button:hover,
.journal-nav-right button:hover {
  color: var(--accent);
  transform: translateY(-2px);
}
.journal-logo-link:hover .journal-logo {
  transform: translateY(-2px);
}
.journal-btn:hover,
.journal-card-actions button:hover,
.journal-socials span:hover {
  transform: translateY(-3px);
}
.journal-hero-main {
  opacity: 0;
  visibility: hidden;
  transform: scale(1.035);
  transition: opacity 720ms ease, visibility 720ms ease, transform 720ms ease;
}
.journal-hero-main.is-active {
  opacity: 1;
  visibility: visible;
  transform: scale(1);
}
.journal-hero-main video,
.journal-hero-main img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 68% center;
}
.journal-hero-copy > * {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 620ms ease, transform 620ms cubic-bezier(.22,1,.36,1);
}
.journal-hero-main.is-active .journal-hero-copy > * {
  opacity: 1;
  transform: translateY(0);
}
.journal-hero-main.is-active .journal-hero-copy > *:nth-child(2) {
  transition-delay: 90ms;
}
.journal-hero-main.is-active .journal-hero-copy > *:nth-child(3) {
  transition-delay: 180ms;
}
.journal-hero-dots button,
.journal-dots button {
  width: 5px;
  height: 5px;
  padding: 0;
  border: 0;
  border-radius: 999px;
  background: currentColor;
  color: inherit;
  opacity: .42;
  cursor: pointer;
  transition: width 220ms ease, height 220ms ease, opacity 220ms ease, background-color 220ms ease, border-color 220ms ease;
}
.journal-hero-dots button.is-active {
  width: 22px;
  height: 5px;
  border: 0;
  background: currentColor;
  opacity: 1;
}
.journal-dots button.is-active {
  width: 24px;
  opacity: 1;
}
.journal-category-card,
.journal-product-card,
.journal-feature-tile,
.journal-blog-card,
.journal-services article,
.journal-gallery-row img {
  transition: transform 260ms ease, box-shadow 260ms ease, filter 260ms ease;
}
.journal-category-card:hover,
.journal-product-card:hover,
.journal-feature-tile:hover,
.journal-blog-card:hover,
.journal-services article:hover {
  transform: translateY(-8px);
  box-shadow: 0 22px 45px rgba(32,37,38,.12);
}
.journal-product-card:hover .journal-product-image img,
.journal-blog-card:hover .journal-blog-image img,
.journal-gallery-row img:hover {
  transform: scale(1.045);
}
.journal-product-image img,
.journal-blog-image img,
.journal-gallery-row img {
  transition: transform 420ms cubic-bezier(.22,1,.36,1), opacity 220ms ease;
}
.journal-testimonial-copy {
  animation: journalFadeUp 420ms ease both;
}
[data-animate] {
  opacity: 0;
  transform: translateY(34px);
  transition: opacity 720ms ease, transform 720ms cubic-bezier(.22,1,.36,1);
}
[data-animate].is-visible {
  opacity: 1;
  transform: translateY(0);
}
@keyframes journalFadeUp {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@media (prefers-reduced-motion: reduce) {
  .journal-page *,
  .journal-page *::before,
  .journal-page *::after {
    animation: none !important;
    scroll-behavior: auto !important;
    transition-duration: .01ms !important;
  }
  [data-animate],
  .journal-hero-main,
  .journal-hero-copy > * {
    opacity: 1 !important;
    visibility: visible !important;
    transform: none !important;
  }
  .journal-hero-main:not(.is-active) {
    display: none;
  }
}

@media (max-width: 1180px) {
  .journal-header-inner { padding: 0 20px; }
  .journal-nav-left, .journal-nav-right { gap: 14px; }
  .journal-blog-track > .journal-blog-card { flex-basis: clamp(380px, 31vw, 440px); }
  .journal-feature-row { grid-template-columns: minmax(220px, 260px) minmax(0, 1fr); gap: 18px; }
  .journal-feature-products { gap: 18px; }
  .journal-gallery-row { grid-template-columns: repeat(3, 1fr); }
  .journal-footer-main { grid-template-columns: 1fr 1fr; }
  .journal-footer-brand { margin: 0; }
}

@media (max-width: 820px) {
  .journal-header { position: relative; }
  .journal-header-inner { height: 76px; grid-template-columns: auto 1fr auto; }
  .journal-nav-left a, .journal-nav-right a:not(.journal-icon-link):not(:last-child) { display: none; }
  .journal-nav-right button:nth-of-type(n+3) { display: none; }
  .journal-search-popover { left: 16px; right: 16px; top: calc(100% + 8px); width: auto; }
  .journal-search-popover form { grid-template-columns: 22px minmax(0, 1fr); }
  .journal-search-popover button { grid-column: 1 / -1; width: 100%; }
  .journal-logo-link { justify-self: center; }
  .journal-mobile-panel { display: block; }
  .journal-hero { display: block; padding: 0; }
  .journal-hero-peek { display: none; }
  .journal-hero-main { height: 560px; }
  .journal-hero-copy { padding: 30px 32px; background: linear-gradient(90deg, rgba(12,10,9,.38), rgba(12,10,9,.16)); }
  .journal-hero-copy h1 { font-size: clamp(48px, 7vw, 68px); }
  .journal-hero-copy div { flex-wrap: wrap; gap: 20px; }
  .journal-section { padding: 64px 20px; }
  .journal-category-row { grid-auto-columns: minmax(300px, 86vw); }
  .journal-services, .journal-about { grid-template-columns: 1fr; }
  .journal-blog-row { padding-left: 34px; padding-right: 34px; }
  .journal-blog-track > .journal-blog-card { flex-basis: calc((100% - 22px) / 2); }
  .journal-products-track > .journal-product-card,
  .journal-feature-track > .journal-product-card { flex-basis: calc((100% - 22px) / 2); }
  .journal-products .journal-products-track > .journal-product-card { flex-basis: calc((100% - 20px) / 2); }
  .journal-featured .journal-feature-track > .journal-product-card,
  .journal-featured .journal-feature-tile { flex-basis: calc((100% - 20px) / 2); }
  .journal-products .journal-products-row { padding-right: 34px; }
  .journal-featured .journal-feature-products { padding-right: 34px; }
  .journal-product-nav.is-prev { left: -4px; }
  .journal-product-nav.is-next { right: -4px; }
  .journal-feature-row { grid-template-columns: 1fr; }
  .journal-feature-tile { height: 360px; min-height: 360px; }
  .journal-services { gap: 42px; }
  .journal-promo > div { width: 100%; }
  .journal-testimonial-stage { grid-template-columns: 42px minmax(0, 1fr) 42px; gap: 10px; }
  .journal-testimonial-copy { min-height: 260px; padding: 30px 28px 24px; }
  .journal-about { gap: 38px; padding: 70px 20px; }
  .journal-about img { height: 420px; }
  .journal-gallery-row { grid-template-columns: 1fr; }
  .journal-gallery-row img, .journal-gallery-row img:nth-child(2), .journal-gallery-row img:nth-child(4), .journal-gallery-row img:nth-child(5) { height: 390px; transform: none; }
  .journal-newsletter form { flex-wrap: wrap; }
  .journal-newsletter input { width: 100%; padding-right: 28px; }
  .journal-newsletter button { width: 180px; margin-left: 0; justify-content: center; }
  .journal-footer-main, .journal-copyright { display: grid; grid-template-columns: 1fr; }
  .journal-footer-main { padding: 70px 24px; gap: 30px; }
  .journal-footer-brand { padding: 0; background: transparent; }
  .journal-copyright { padding: 24px; justify-content: start; }
}

@media (max-width: 1024px) {
  .journal-page {
    overflow-x: hidden;
  }

  .journal-header-inner {
    min-width: 0;
  }

  .journal-nav-left,
  .journal-nav-right {
    min-width: 0;
  }

  .journal-hero-copy {
    width: min(660px, calc(100% - 48px));
    left: 24px;
    top: auto;
    bottom: 84px;
  }

  .journal-hero-copy h1 {
    margin: 26px 0 32px;
    font-size: clamp(42px, 7vw, 64px);
  }

  .journal-category-card {
    grid-template-columns: 96px minmax(0, 1fr);
    min-width: 0;
    padding: 20px;
  }

  .journal-feature-row {
    grid-template-columns: 1fr;
  }

  .journal-product-card {
    min-height: 455px;
  }

  .journal-product-card.is-compact {
    min-height: 430px;
  }

  .journal-feature-tile {
    min-height: 360px;
  }
}

@media (max-width: 700px) {
  .journal-header-inner {
    height: auto;
    min-height: 76px;
    grid-template-columns: auto 1fr auto;
    padding: 14px 16px;
  }

  .journal-logo-link {
    width: auto;
    max-width: 150px;
  }

  .journal-logo {
    font-size: 40px;
  }

  .journal-mobile-panel {
    padding: 8px 18px 16px;
  }

  .journal-hero {
    height: 540px;
  }

  .journal-hero-main {
    height: 100%;
  }

  .journal-hero-copy {
    left: 18px;
    bottom: 76px;
    width: calc(100% - 36px);
    padding: 24px;
  }

  .journal-hero-copy span {
    font-size: 11px;
  }

  .journal-hero-copy h1 {
    margin: 20px 0 24px;
    font-size: clamp(38px, 12vw, 54px);
    line-height: 1.05;
  }

  .journal-hero-copy div,
  .journal-promo > div {
    width: 100%;
  }

  .journal-hero-copy div {
    align-items: stretch;
    gap: 12px;
  }

  .journal-btn {
    width: 100%;
    min-height: 52px;
    padding: 0 18px;
    font-size: 15px;
  }

  .journal-text-link {
    width: fit-content;
    font-size: 15px;
  }

  .journal-hero-nav {
    right: 16px;
    top: auto;
    bottom: 18px;
    grid-template-columns: repeat(2, 36px);
    gap: 8px;
    transform: none;
  }

  .journal-hero-arrow {
    width: 36px;
    height: 36px;
    font-size: 22px;
  }

  .journal-hero-dots {
    left: 18px;
    bottom: 34px;
    transform: none;
    gap: 9px;
  }

  .journal-section,
  .journal-categories,
  .journal-products,
  .journal-featured,
  .journal-blog,
  .journal-testimonials,
  .journal-gallery,
  .journal-newsletter {
    padding-left: 16px;
    padding-right: 16px;
  }

  .journal-section-title {
    margin-bottom: 34px;
  }

  .journal-section-title span {
    font-size: 42px;
  }

  .journal-section-title h2,
  .journal-about h2 {
    font-size: 31px;
  }

  .journal-section-title p,
  .journal-about p,
  .journal-newsletter p {
    font-size: 15px;
    line-height: 1.7;
  }

  .journal-category-row {
    grid-auto-flow: row;
    grid-auto-columns: auto;
    grid-template-columns: 1fr;
    overflow-x: visible;
    padding-right: 0;
  }

  .journal-category-next {
    display: none;
  }

  .journal-category-card {
    grid-template-columns: 86px minmax(0, 1fr);
    gap: 16px;
    padding: 18px;
  }

  .journal-category-image {
    width: 82px;
    height: 82px;
  }

  .journal-category-card img {
    width: 74px;
    height: 74px;
  }

  .journal-ticker {
    margin-left: -16px;
    margin-right: -16px;
    height: 38px;
  }

  .journal-tabs {
    gap: 18px;
    overflow-x: auto;
    justify-content: flex-start;
    padding-bottom: 4px;
  }

  .journal-tabs button {
    flex: 0 0 auto;
    font-size: 19px;
  }

  .journal-products {
    padding-top: 54px;
    padding-bottom: 52px;
  }

  .journal-products .journal-section-title {
    margin-bottom: 30px;
  }

  .journal-products .journal-tabs {
    margin: -14px 0 24px;
    gap: 18px;
  }

  .journal-products .journal-tabs button {
    font-size: 18px;
  }

  .journal-services,
  .journal-about {
    grid-template-columns: 1fr;
  }

  .journal-blog-track {
    gap: 16px;
  }

  .journal-blog-track > .journal-blog-card {
    flex-basis: calc((100% - 16px) / 2);
  }

  .journal-blog-card {
    height: 356px;
  }

  .journal-blog-image {
    flex-basis: 158px;
    height: 158px;
  }

  .journal-feature-tile {
    height: 340px;
    min-height: 340px;
    padding: 26px 24px;
  }

  .journal-feature-tile img {
    width: 62%;
    height: 72%;
  }

  .journal-product-image {
    flex-basis: 238px;
    height: 238px;
  }

  .journal-products-track,
  .journal-feature-track {
    gap: 16px;
  }

  .journal-products-track > .journal-product-card,
  .journal-feature-track > .journal-product-card {
    flex-basis: min(100%, 340px);
  }

  .journal-products .journal-products-track > .journal-product-card {
    flex-basis: min(100%, 320px);
  }

  .journal-featured .journal-feature-track > .journal-product-card,
  .journal-featured .journal-feature-tile {
    flex-basis: min(100%, 320px);
  }

  .journal-products .journal-products-row {
    padding-right: 24px;
  }

  .journal-featured .journal-feature-products {
    padding-right: 24px;
  }

  .journal-product-card {
    height: 440px;
    min-height: 440px;
  }

  .journal-products .journal-product-card {
    height: 405px;
    min-height: 405px;
  }

  .journal-products .journal-product-image {
    flex-basis: 205px;
    height: 205px;
  }

  .journal-featured .journal-product-card,
  .journal-featured .journal-feature-tile {
    height: 405px;
    min-height: 405px;
  }

  .journal-featured .journal-product-image {
    flex-basis: 205px;
    height: 205px;
  }

  .journal-product-card.is-compact {
    height: 430px;
    min-height: 430px;
  }

  .journal-product-card h3 {
    min-height: 44px;
    font-size: 18px;
  }

  .journal-card-actions {
    grid-template-columns: 1fr 44px 44px;
    gap: 8px;
    min-height: 58px;
  }

  .journal-card-actions button {
    min-height: 44px;
    justify-content: center;
    font-size: 14px;
  }

  .journal-product-card.is-compact .journal-card-actions {
    grid-template-columns: 1fr 38px 38px;
  }

  .journal-product-card.is-compact .journal-card-actions button {
    min-height: 40px;
    font-size: 12px;
  }

  .journal-services {
    padding-left: 16px;
    padding-right: 16px;
  }

  .journal-promo {
    min-height: 430px;
    padding: 58px 18px;
    background-position: center;
  }

  .journal-promo h2 {
    margin-bottom: 18px;
    font-size: clamp(38px, 12vw, 54px);
  }

  .journal-promo p {
    margin-bottom: 28px;
    font-size: 15px;
  }

  .journal-light-link {
    display: inline-flex;
    margin: 18px 0 0;
  }

  .journal-testimonial-stage {
    grid-template-columns: 1fr;
    gap: 12px;
    margin-top: 0;
  }

  .journal-testimonial-stage .journal-round-nav {
    grid-row: 2;
    display: inline-grid;
  }

  .journal-testimonial-stage .journal-round-nav:first-child {
    justify-self: end;
    margin-right: 28px;
  }

  .journal-testimonial-stage .journal-round-nav:last-child {
    justify-self: start;
    margin-left: 28px;
  }

  .journal-testimonial-copy {
    min-height: 252px;
    padding: 28px 20px 22px;
  }

  .journal-rating {
    flex-wrap: wrap;
    gap: 8px;
  }

  .journal-testimonials blockquote {
    margin: 0 auto 16px;
    font-size: 17px;
  }

  .journal-about {
    padding: 58px 16px;
  }

  .journal-about img {
    height: 320px;
  }

  .journal-gallery-row {
    grid-template-columns: repeat(auto-fill, minmax(138px, 1fr));
    gap: 12px;
    max-height: 620px;
  }

  .journal-gallery-row img {
    height: 148px;
  }

  .journal-newsletter form {
    display: grid;
    grid-template-columns: 1fr;
    width: 100%;
    gap: 12px;
  }

  .journal-newsletter form > svg {
    display: none;
  }

  .journal-newsletter input,
  .journal-newsletter button {
    width: 100%;
    margin-left: 0;
  }

  .journal-newsletter input {
    padding: 0 18px;
  }

  .journal-footer-main,
  .journal-copyright {
    grid-template-columns: 1fr;
    padding-left: 20px;
    padding-right: 20px;
  }

  .journal-copyright div {
    justify-content: flex-start;
  }
}

@media (max-width: 390px) {
  .journal-hero-copy h1 {
    font-size: 36px;
  }

  .journal-category-card {
    grid-template-columns: 1fr;
  }

  .journal-category-image {
    width: 100%;
    height: 120px;
  }

  .journal-category-card img {
    width: 96px;
    height: 96px;
  }

  .journal-card-actions {
    grid-template-columns: 1fr;
  }

  .journal-products-track > .journal-product-card,
  .journal-feature-track > .journal-product-card {
    flex-basis: 100%;
  }

  .journal-products .journal-products-track > .journal-product-card {
    flex-basis: 100%;
  }

  .journal-featured .journal-feature-track > .journal-product-card,
  .journal-featured .journal-feature-tile {
    flex-basis: 100%;
  }

  .journal-blog-track > .journal-blog-card {
    flex-basis: 100%;
  }
}
`;
