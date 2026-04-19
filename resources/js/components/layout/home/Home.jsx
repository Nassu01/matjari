import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchProducts } from "../../../redux/ProductSlice";
import { addToCart, getCartTotals } from "../../../redux/CartSlice";
import useStorefrontContent from "../../../hooks/useStorefrontContent";

const categoryItems = [
  { icon: "electronics", label: "Electronics" },
  { icon: "fashion", label: "Fashion" },
  { icon: "home", label: "Home" },
  { icon: "beauty", label: "Beauty" },
  { icon: "sports", label: "Sports" },
  { icon: "accessories", label: "Accessories" },
];

const trustItems = [
  { icon: "shipping", label: "Free Shipping" },
  { icon: "secure", label: "Secure Payment" },
  { icon: "returns", label: "Easy Returns" },
  { icon: "support", label: "24/7 Support" },
];

const whyChooseUsItems = [
  {
    icon: "delivery",
    title: "Fast Delivery",
    description: "Quick dispatch and smooth delivery tracking from checkout to doorstep.",
  },
  {
    icon: "authentic",
    title: "100% Authentic",
    description: "Carefully selected products sourced with quality and trust in mind.",
  },
  {
    icon: "price",
    title: "Best Prices",
    description: "Strong value across essentials, trends, and limited-time offers.",
  },
  {
    icon: "returns",
    title: "Easy Returns",
    description: "Simple return support when something is not the right fit.",
  },
];

const brandItems = [
  "Samsung",
  "Xiaomi",
  "Nike",
  "Adidas",
  "Oraimo",
  "Lenovo",
  "Nivea",
  "Defacto",
];

const testimonials = [
  {
    name: "Sara M.",
    quote: "The quality was even better than I expected and delivery was really fast.",
    rating: 5,
  },
  {
    name: "Youssef A.",
    quote: "Clean shopping experience, good prices, and the products looked exactly like the photos.",
    rating: 5,
  },
  {
    name: "Nadia K.",
    quote: "I found a gift and a few extras for myself in one order. Super smooth checkout.",
    rating: 4,
  },
];

const fallbackSlides = [
  {
    eyebrow: "Spring edit",
    title: "Refresh your everyday setup",
    description: "New accessories, sharper essentials, and clean looks for the new season.",
    primaryLabel: "Shop now",
    primaryUrl: "/shop",
    secondaryLabel: "View arrivals",
    secondaryUrl: "#new-arrivals",
  },
  {
    eyebrow: "Weekend picks",
    title: "Style and tech made to move",
    description: "Discover trending bags, watches, and audio gear curated for daily life.",
    primaryLabel: "Explore deals",
    primaryUrl: "/shop",
    secondaryLabel: "Browse categories",
    secondaryUrl: "#categories",
  },
  {
    eyebrow: "Limited offer",
    title: "Top products with standout value",
    description: "Shop customer favorites with premium design, easy comfort, and fresh pricing.",
    primaryLabel: "Best sellers",
    primaryUrl: "#new-arrivals",
    secondaryLabel: "Visit shop",
    secondaryUrl: "/shop",
  },
];

function StarRating({ rating }) {
  const fullStars = Math.round(rating);

  return (
    <div className="home-rating" aria-label={`Rated ${rating} out of 5`}>
      {Array.from({ length: 5 }, (_, index) => (
        <span
          key={index}
          className={index < fullStars ? "is-filled" : ""}
          aria-hidden="true"
        >
          ★
        </span>
      ))}
      <strong>{rating.toFixed(1)}</strong>
    </div>
  );
}

function ActionLink({ to, className, children }) {
  if (String(to || "").startsWith("#")) {
    return (
      <a href={to} className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
}

function HeroSlide({ slide }) {
  const backgroundStyle = slide.image
    ? {
        backgroundImage: `linear-gradient(115deg, rgba(7, 15, 27, 0.86), rgba(7, 15, 27, 0.38)), url(${slide.image})`,
      }
    : undefined;

  return (
    <article className="home-hero-slide" style={backgroundStyle}>
      <div className="home-hero-copy">
        <span className="home-hero-eyebrow">{slide.eyebrow}</span>
        <h1>{slide.title}</h1>
        <p>{slide.description}</p>

        <div className="home-hero-actions">
          <ActionLink to={slide.primaryUrl} className="home-btn home-btn--primary">
            {slide.primaryLabel}
          </ActionLink>
          <ActionLink to={slide.secondaryUrl} className="home-btn home-btn--ghost">
            {slide.secondaryLabel}
          </ActionLink>
        </div>
      </div>
    </article>
  );
}

function CountdownUnit({ value, label }) {
  return (
    <div className="home-countdown-unit">
      <strong>{String(value).padStart(2, "0")}</strong>
      <span>{label}</span>
    </div>
  );
}

function UiIcon({ name, className = "" }) {
  const classes = `home-ui-icon ${className}`.trim();

  switch (name) {
    case "electronics":
      return (
        <svg viewBox="0 0 24 24" className={classes} aria-hidden="true">
          <rect x="5" y="4" width="14" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="12" cy="16.5" r="1" fill="currentColor" />
        </svg>
      );
    case "fashion":
      return (
        <svg viewBox="0 0 24 24" className={classes} aria-hidden="true">
          <path d="M9 5c.7 1 1.7 1.5 3 1.5S14.3 6 15 5l3 2-1.5 3V19H7.5v-9L6 7l3-2Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        </svg>
      );
    case "home":
      return (
        <svg viewBox="0 0 24 24" className={classes} aria-hidden="true">
          <path d="M4 11.5 12 5l8 6.5V19H4z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M10 19v-4h4v4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        </svg>
      );
    case "beauty":
      return (
        <svg viewBox="0 0 24 24" className={classes} aria-hidden="true">
          <rect x="9" y="4" width="6" height="5" rx="1.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <path d="M8.5 9h7v10a2 2 0 0 1-2 2h-3a2 2 0 0 1-2-2Z" fill="none" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      );
    case "sports":
      return (
        <svg viewBox="0 0 24 24" className={classes} aria-hidden="true">
          <circle cx="12" cy="12" r="7" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <path d="M7.5 8.5c2.2 1.5 6.8 1.5 9 0M7.5 15.5c2.2-1.5 6.8-1.5 9 0M12 5a11 11 0 0 1 0 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "accessories":
      return (
        <svg viewBox="0 0 24 24" className={classes} aria-hidden="true">
          <circle cx="12" cy="12" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <path d="M12 7.5V5M12 19v-2.5M16.5 12H19M5 12h2.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "shipping":
      return (
        <svg viewBox="0 0 24 24" className={classes} aria-hidden="true">
          <path d="M4 7h10v8H4zM14 10h3l3 3v2h-6z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          <circle cx="8" cy="17" r="1.8" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="17" cy="17" r="1.8" fill="none" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      );
    case "secure":
      return (
        <svg viewBox="0 0 24 24" className={classes} aria-hidden="true">
          <path d="M12 4l6 2.5V11c0 4.1-2.5 7.7-6 9-3.5-1.3-6-4.9-6-9V6.5Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M9.5 12.2 11.2 14l3.5-3.7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "returns":
      return (
        <svg viewBox="0 0 24 24" className={classes} aria-hidden="true">
          <path d="M8 8H5V5M5 8a7 7 0 1 1-1 8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "support":
      return (
        <svg viewBox="0 0 24 24" className={classes} aria-hidden="true">
          <path d="M6 10a6 6 0 0 1 12 0v5a2 2 0 0 1-2 2h-2" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <rect x="4" y="11" width="3" height="5" rx="1.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <rect x="17" y="11" width="3" height="5" rx="1.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      );
    case "delivery":
      return <UiIcon name="shipping" className={className} />;
    case "authentic":
      return (
        <svg viewBox="0 0 24 24" className={classes} aria-hidden="true">
          <circle cx="12" cy="12" r="7" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <path d="M9.5 12.2 11.2 14l3.5-3.7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "price":
      return (
        <svg viewBox="0 0 24 24" className={classes} aria-hidden="true">
          <path d="M12 5v14M15.5 8.5c0-1.4-1.5-2.5-3.5-2.5S8.5 7 8.5 8.4c0 3.1 7 1.3 7 5.3 0 1.5-1.5 2.8-3.5 2.8s-3.5-1.2-3.5-2.8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
}

function ProductCard({ product, index, onAddToCart }) {
  const rating = 4 + ((product.id || index) % 10) / 10;

  return (
    <article className="home-product-card">
      <div className="home-product-media">
        {product.image ? (
          <img src={product.image} alt={product.name} loading="lazy" />
        ) : (
          <div className="home-product-empty">No image</div>
        )}
      </div>

      <div className="home-product-body">
        <div className="home-product-meta">
          <span>{product.categoryName || "Featured"}</span>
          <span>{product.brand || "Matjari"}</span>
        </div>

        <h3 title={product.name}>{product.name}</h3>
        <p className="home-product-price">
          {Number(product.price || 0).toFixed(2)} DH
        </p>
        <StarRating rating={rating} />

        <button
          type="button"
          className="home-btn home-btn--dark home-btn--full"
          onClick={() => onAddToCart(product)}
        >
          Add to cart
        </button>
      </div>
    </article>
  );
}

export default function Home() {
  const dispatch = useDispatch();
  const { settings } = useStorefrontContent();
  const { products = [], status = "idle", error = null } = useSelector(
    (state) => state.products || {}
  );
  const [activeSlide, setActiveSlide] = useState(0);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  const hero = settings?.hero || {};
  const featuredProducts = products.slice(0, 10);
  const recommendedProducts = products.slice(10, 20);
  const countdownTarget = useMemo(() => {
    const target = new Date();
    target.setDate(target.getDate() + 4);
    target.setHours(23, 59, 59, 999);
    return target;
  }, []);

  const heroSlides = [
    {
      eyebrow: hero.badge || fallbackSlides[0].eyebrow,
      title: hero.title || fallbackSlides[0].title,
      description: hero.description || fallbackSlides[0].description,
      primaryLabel: hero.primaryButtonLabel || fallbackSlides[0].primaryLabel,
      primaryUrl: hero.primaryButtonUrl || fallbackSlides[0].primaryUrl,
      secondaryLabel:
        hero.secondaryButtonLabel || fallbackSlides[0].secondaryLabel,
      secondaryUrl: hero.secondaryButtonUrl || fallbackSlides[0].secondaryUrl,
      image: hero.imagePath || featuredProducts[0]?.image || "",
    },
    ...fallbackSlides.slice(1).map((slide, index) => ({
      ...slide,
      image: featuredProducts[index + 1]?.image || featuredProducts[0]?.image || "",
    })),
  ];

  useEffect(() => {
    if (heroSlides.length <= 1) return undefined;

    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [heroSlides.length]);

  useEffect(() => {
    const updateCountdown = () => {
      const diff = countdownTarget.getTime() - Date.now();

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const totalSeconds = Math.floor(diff / 1000);

      setTimeLeft({
        days: Math.floor(totalSeconds / 86400),
        hours: Math.floor((totalSeconds % 86400) / 3600),
        minutes: Math.floor((totalSeconds % 3600) / 60),
        seconds: totalSeconds % 60,
      });
    };

    updateCountdown();

    const timer = window.setInterval(updateCountdown, 1000);

    return () => window.clearInterval(timer);
  }, [countdownTarget]);

  const handleAddToCart = (product) => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: Number(product.price || 0),
        image: product.image || "",
      })
    );
    dispatch(getCartTotals());
  };

  const goToSlide = (index) => {
    setActiveSlide(index);
  };

  const nextSlide = () => {
    setActiveSlide((current) => (current + 1) % heroSlides.length);
  };

  const previousSlide = () => {
    setActiveSlide((current) => (current - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <main className="home-page">
      <div className="home-shell">
        <section className="home-hero" aria-label="Featured promotions">
          <div
            className="home-hero-track"
            style={{ transform: `translateX(-${activeSlide * 100}%)` }}
          >
            {heroSlides.map((slide, index) => (
              <HeroSlide key={`${slide.title}-${index}`} slide={slide} />
            ))}
          </div>

          <button
            type="button"
            className="home-hero-nav home-hero-nav--prev"
            onClick={previousSlide}
            aria-label="Previous slide"
          >
            ‹
          </button>
          <button
            type="button"
            className="home-hero-nav home-hero-nav--next"
            onClick={nextSlide}
            aria-label="Next slide"
          >
            ›
          </button>

          <div className="home-hero-dots">
            {heroSlides.map((slide, index) => (
              <button
                key={`${slide.title}-dot-${index}`}
                type="button"
                className={`home-hero-dot ${activeSlide === index ? "is-active" : ""}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </section>

        <section className="home-section" id="categories">
          <div className="home-section-head">
            <div>
              <h2>Shop by category</h2>
            </div>
            <Link to="/shop" className="home-inline-link">
              See all products
            </Link>
          </div>

          <div className="home-categories-row">
            {categoryItems.map((item) => (
              <Link
                key={item.label}
                to="/shop"
                className="home-category-card"
                aria-label={`Browse ${item.label}`}
              >
                <div className="home-category-icon" aria-hidden="true">
                  <UiIcon name={item.icon} />
                </div>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="home-section home-trust-section" aria-label="Store benefits">
          <div className="home-trust-bar">
            {trustItems.map((item) => (
              <div key={item.label} className="home-trust-item">
                <span className="home-trust-icon" aria-hidden="true">
                  <UiIcon name={item.icon} />
                </span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="home-section" aria-label="Promotions">
          <div className="home-section-head">
            <div>
              <h2>Flash deals and seasonal promotions</h2>
            </div>
          </div>

          <div className="home-promo-grid">
            <article className="home-promo-card home-promo-card--highlight">
              <span className="home-promo-badge">Flash Sale</span>
              <h3>Up to 50% OFF selected essentials</h3>
              <p>
                Save on standout accessories, daily tech, and wardrobe staples before the clock
                runs out.
              </p>

              <div className="home-countdown">
                <CountdownUnit value={timeLeft.days} label="Days" />
                <CountdownUnit value={timeLeft.hours} label="Hours" />
                <CountdownUnit value={timeLeft.minutes} label="Min" />
                <CountdownUnit value={timeLeft.seconds} label="Sec" />
              </div>

              <Link to="/shop" className="home-btn home-btn--primary">
                Shop the sale
              </Link>
            </article>

            <article className="home-promo-card home-promo-card--secondary">
              <span className="home-promo-badge">Weekend offer</span>
              <h3>Buy more, save more on new arrivals</h3>
              <p>
                Add two or more featured items and build a stronger basket with limited-time value.
              </p>
              <Link to="#new-arrivals" className="home-btn home-btn--dark">
                Explore picks
              </Link>
            </article>
          </div>
        </section>

        <section className="home-section" id="new-arrivals">
          <div className="home-section-head">
            <div>
              <h2>New Arrivals</h2>
            </div>
          </div>

          {status === "loading" && (
            <div className="home-feedback-card">Loading products...</div>
          )}

          {status === "failed" && (
            <div className="home-feedback-card">
              We couldn&apos;t load products right now.
              {error ? ` ${error}` : ""}
            </div>
          )}

          {status !== "loading" && featuredProducts.length > 0 && (
            <div className="home-featured-grid">
              {featuredProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          )}

          {status !== "loading" && featuredProducts.length === 0 && status !== "failed" && (
            <div className="home-feedback-card">
              No products are available yet. Add products in the dashboard and they will appear here.
            </div>
          )}
        </section>

        <section className="home-section" aria-label="Recommended products">
          <div className="home-section-head">
            <div>
              <h2>Trending Now</h2>
            </div>
          </div>

          {status !== "loading" && recommendedProducts.length > 0 && (
            <div className="home-featured-grid">
              {recommendedProducts.map((product, index) => (
                <ProductCard
                  key={`trending-${product.id}`}
                  product={product}
                  index={index + 10}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          )}
        </section>

        <section className="home-section" aria-label="Why choose us">
          <div className="home-section-head">
            <div>
              <h2>Built around convenience and confidence</h2>
            </div>
          </div>

          <div className="home-why-grid">
            {whyChooseUsItems.map((item) => (
              <article key={item.title} className="home-why-card">
                <div className="home-why-icon" aria-hidden="true">
                  <UiIcon name={item.icon} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="home-section" aria-label="Customer testimonials">
          <div className="home-section-head">
            <div>
              <h2>What shoppers are saying</h2>
            </div>
          </div>

          <div className="home-testimonials-grid">
            {testimonials.map((item, index) => (
              <article key={`${item.name}-${index}`} className="home-testimonial-card">
                <StarRating rating={item.rating} />
                <p className="home-testimonial-quote">"{item.quote}"</p>
                <div className="home-testimonial-user">
                  <div className="home-testimonial-avatar" aria-hidden="true">
                    {item.name.charAt(0)}
                  </div>
                  <strong>{item.name}</strong>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="home-section" aria-label="Featured brands">
          <div className="home-section-head">
            <div>
              <h2>Brands we feature</h2>
            </div>
          </div>

          <div className="home-brands-row">
            {brandItems.map((brand) => (
              <div key={brand} className="home-brand-pill">
                {brand}
              </div>
            ))}
          </div>
        </section>

        <section className="home-section" aria-label="Newsletter signup">
          <div className="home-newsletter-banner">
            <div className="home-newsletter-copy">
              <h2>Get 15% off your first order</h2>
              <p>
                Join our newsletter for fresh drops, private deals, and product updates delivered
                to your inbox.
              </p>
            </div>

            <form className="home-newsletter-form">
              <input
                type="email"
                placeholder="Enter your email address"
                aria-label="Email address"
              />
              <button type="submit" className="home-btn home-btn--primary">
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
