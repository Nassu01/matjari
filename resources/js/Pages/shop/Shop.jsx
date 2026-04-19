import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { fetchProducts } from "../../redux/ProductSlice";
import CartProduit from "../../components/Product/CartProduit";

const PER_PAGE = 20;

export default function Shop() {
  const dispatch = useDispatch();
  const { products = [], status = "idle", error = null } = useSelector(
    (state) => state.products || {}
  );

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("featured");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (status === "idle") dispatch(fetchProducts());
  }, [dispatch, status]);

  const normalized = useMemo(() => {
    const infer = (product) => {
      const img = String(product.image || "").toLowerCase();
      if (img.includes("bag")) return "bags";
      if (img.includes("boot") || img.includes("sandle") || img.includes("sandal")) {
        return "shoes";
      }
      if (img.includes("watch") || img.includes("cap")) return "accessories";
      if (img.includes("headphone")) return "electronics";
      if (img.includes("shirt")) return "clothing";
      return "other";
    };

    return (products || []).map((product) => ({
      ...product,
      name: product.name ?? product.title ?? "Untitled",
      price: Number(product.price ?? 0),
      category: product.category ?? infer(product),
      image: product.image ?? "",
    }));
  }, [products]);

  const categories = useMemo(() => {
    const set = new Set(normalized.map((product) => product.category).filter(Boolean));
    return ["all", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, [normalized]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const min = minPrice === "" ? null : Number(minPrice);
    const max = maxPrice === "" ? null : Number(maxPrice);

    let list = normalized;

    if (category !== "all") {
      list = list.filter((product) => String(product.category) === String(category));
    }

    if (q) {
      list = list.filter((product) => {
        const name = String(product.name || "").toLowerCase();
        const cat = String(product.category || "").toLowerCase();
        return name.includes(q) || cat.includes(q);
      });
    }

    if (Number.isFinite(min)) list = list.filter((product) => product.price >= min);
    if (Number.isFinite(max)) list = list.filter((product) => product.price <= max);

    const sorted = [...list];
    switch (sort) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        sorted.sort((a, b) => String(a.name).localeCompare(String(b.name)));
        break;
      case "name-desc":
        sorted.sort((a, b) => String(b.name).localeCompare(String(a.name)));
        break;
      default:
        break;
    }
    return sorted;
  }, [normalized, category, query, minPrice, maxPrice, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const pageSafe = Math.min(page, totalPages);

  const paginated = useMemo(() => {
    const start = (pageSafe - 1) * PER_PAGE;
    return filtered.slice(start, start + PER_PAGE);
  }, [filtered, pageSafe]);

  useEffect(() => {
    setPage(1);
  }, [category, query, minPrice, maxPrice, sort]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pageSafe]);

  const clearFilters = () => {
    setQuery("");
    setCategory("all");
    setSort("featured");
    setMinPrice("");
    setMaxPrice("");
    setPage(1);
  };

  const retry = () => dispatch(fetchProducts());

  if (status === "loading") {
    return (
      <div className="shop-page">
        <div className="shop-container">
          <div className="shop-head">
            <div>
              <h1 className="shop-title">Shop</h1>
              <p className="shop-subtitle">Loading products...</p>
            </div>
          </div>

          <div className="shop-grid">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="shop-card shop-skel">
                <div className="shop-skel-img" />
                <div className="shop-card-body">
                  <div className="shop-skel-line w-75" />
                  <div className="shop-skel-line w-50" />
                  <div className="shop-skel-btn" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="shop-page">
        <div className="shop-container">
          <div className="shop-error">
            <h1 className="shop-error-title">Could not load products</h1>
            <p className="shop-error-text">{String(error || "Unknown error")}</p>

            <div className="shop-error-actions">
              <button className="shop-btn shop-btn--black" onClick={retry} type="button">
                Retry
              </button>
              <Link className="shop-btn shop-btn--white" to="/">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="shop-page">
      <div className="shop-container">
        <div className="shop-head">
          <div>
            <h1 className="shop-title">Shop</h1>
            <p className="shop-subtitle">Browse products, filter, and sort easily.</p>
          </div>

          <div className="shop-results">
            <span className="shop-results-strong">{filtered.length}</span> results
          </div>
        </div>

        <div className="shop-controls">
          <div className="shop-controls-grid">
            <input
              className="shop-input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or category..."
            />

            <select
              className="shop-select"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>

            <div className="shop-price">
              <input
                className="shop-input"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder="Min $"
                inputMode="decimal"
              />
              <input
                className="shop-input"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="Max $"
                inputMode="decimal"
              />
            </div>

            <button className="shop-btn shop-btn--white" type="button" onClick={clearFilters}>
              Clear
            </button>
          </div>

          <div className="shop-chips">
            {categories.map((item) => {
              const active = item === category;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  className={`shop-chip ${active ? "is-active" : ""}`}
                >
                  {item === "all" ? "All" : item}
                </button>
              );
            })}
          </div>
        </div>

        <div className="shop-content">
          {paginated.length === 0 ? (
            <div className="shop-empty">
              <div className="shop-empty-icon">Search</div>
              <h2 className="shop-empty-title">No products found</h2>
              <p className="shop-empty-text">Try changing your search or filters.</p>
              <button className="shop-btn shop-btn--black shop-btn--pill" onClick={clearFilters}>
                Reset filters
              </button>
            </div>
          ) : (
            <>
              <div className="shop-grid">
                {paginated.map((product) => (
                  <CartProduit
                    key={product.id}
                    id={product.id}
                    img={product.image}
                    titre={product.name}
                    price={product.price}
                  />
                ))}
              </div>

              <div className="shop-pagination">
                <button
                  className="shop-btn shop-btn--white"
                  type="button"
                  disabled={pageSafe <= 1}
                  onClick={() => setPage((current) => Math.max(1, current - 1))}
                >
                  Prev
                </button>

                <div className="shop-pagecount">
                  Page <b>{pageSafe}</b> / <b>{totalPages}</b>
                </div>

                <button
                  className="shop-btn shop-btn--white"
                  type="button"
                  disabled={pageSafe >= totalPages}
                  onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
