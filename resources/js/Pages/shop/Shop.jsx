import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { fetchProducts } from "../../redux/ProductSlice";
import { addToCart, getCartTotals } from "../../redux/CartSlice";
import useImages11, { imageFromImages11 } from "../../hooks/useImages11";
import {
  fetchApiCategories,
  fetchApiProducts,
  normalizeApiProduct,
  normalizeLocalProduct,
} from "../../services/fakeStoreApi";

const API_PER_PAGE = 20;

export default function Shop() {
  const dispatch = useDispatch();
  const { products: localProducts = [], status: localStatus = "idle", error: localError = null } =
    useSelector((state) => state.products || {});
  const { products: cartProducts = [], totalQuantity = 0, totalAmount = 0 } = useSelector(
    (state) => state.cart || {}
  );
  const { displayImages } = useImages11();

  const [apiProducts, setApiProducts] = useState([]);
  const [apiCategories, setApiCategories] = useState([]);
  const [apiPage, setApiPage] = useState(1);
  const [apiTotalPages, setApiTotalPages] = useState(1);
  const [apiLoading, setApiLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [hasMoreApiProducts, setHasMoreApiProducts] = useState(true);

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [sort, setSort] = useState("featured");

  useEffect(() => {
    if (localStatus === "idle") dispatch(fetchProducts());
  }, [dispatch, localStatus]);

  useEffect(() => {
    loadApiProducts(1, true);

    fetchApiCategories()
      .then((categories) => setApiCategories(categories))
      .catch(() => setApiCategories([]));
  }, []);

  useEffect(() => {
    dispatch(getCartTotals());
  }, [dispatch, cartProducts]);

  const normalizedLocalProducts = useMemo(() => {
    return (localProducts || []).map((product, index) => {
      const manifestImage = imageFromImages11(displayImages, index);
      return normalizeLocalProduct({
        ...product,
        image: manifestImage?.url || product.image || "",
        category: product.categoryName || product.category || "Makeup",
      });
    });
  }, [localProducts, displayImages]);

  const normalizedApiProducts = useMemo(
    () => (apiProducts || []).map(normalizeApiProduct),
    [apiProducts]
  );

  const mixedProducts = useMemo(
    () => [...normalizedLocalProducts, ...normalizedApiProducts],
    [normalizedLocalProducts, normalizedApiProducts]
  );

  const categories = useMemo(() => {
    const values = new Set();

    mixedProducts.forEach((product) => {
      if (product.category) values.add(String(product.category));
    });

    apiCategories.forEach((item) => {
      const label = item?.name || item?.title || item;
      if (label) values.add(String(label));
    });

    return ["all", ...Array.from(values).sort((a, b) => a.localeCompare(b))];
  }, [mixedProducts, apiCategories]);

  const filteredProducts = useMemo(() => {
    const search = query.trim().toLowerCase();

    let list = mixedProducts;

    if (sourceFilter !== "all") {
      list = list.filter((product) => product.source === sourceFilter);
    }

    if (category !== "all") {
      list = list.filter((product) => String(product.category) === String(category));
    }

    if (search) {
      list = list.filter((product) => {
        const title = String(product.title || "").toLowerCase();
        const productCategory = String(product.category || "").toLowerCase();
        return title.includes(search) || productCategory.includes(search);
      });
    }

    const sorted = [...list];
    switch (sort) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        sorted.sort((a, b) => String(a.title).localeCompare(String(b.title)));
        break;
      case "name-desc":
        sorted.sort((a, b) => String(b.title).localeCompare(String(a.title)));
        break;
      default:
        break;
    }

    return sorted;
  }, [mixedProducts, sourceFilter, category, query, sort]);

  async function loadApiProducts(page = 1, replace = false) {
    setApiLoading(true);
    setApiError("");

    try {
      const payload = await fetchApiProducts(page, API_PER_PAGE);
      const nextProducts = payload.products || [];

      setApiProducts((current) => (replace ? nextProducts : [...current, ...nextProducts]));
      setApiPage(payload.currentPage || page);
      setApiTotalPages(payload.totalPages || 1);
      setHasMoreApiProducts((payload.currentPage || page) < (payload.totalPages || 1));
    } catch (error) {
      setApiError(error?.message || "Could not load API products.");
    } finally {
      setApiLoading(false);
    }
  }

  const clearFilters = () => {
    setQuery("");
    setCategory("all");
    setSourceFilter("all");
    setSort("featured");
  };

  const addProductToCart = (product) => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.title,
        price: product.price,
        image: product.image,
        source: product.source,
        category: product.category,
      })
    );
    dispatch(getCartTotals());
  };

  const isInitialLoading =
    (localStatus === "loading" && normalizedLocalProducts.length === 0) ||
    (apiLoading && normalizedApiProducts.length === 0);

  return (
    <div className="min-h-screen bg-neutral-50 px-4 py-8 text-neutral-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-orange-600">
              Matjari Shop
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Products
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-600">
              Your makeup products stay local. General products are loaded live from the
              external API and never saved to the database.
            </p>
          </div>

          <aside className="rounded-lg border border-neutral-200 bg-white p-4 shadow-sm lg:min-w-72">
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm font-semibold text-neutral-500">Cart summary</span>
              <span className="rounded-full bg-neutral-950 px-3 py-1 text-xs font-bold text-white">
                {totalQuantity} items
              </span>
            </div>
            <div className="mt-3 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-neutral-400">Total</p>
                <strong className="text-2xl">${Number(totalAmount || 0).toFixed(2)}</strong>
              </div>
              <Link
                to="/cart"
                className="inline-flex h-10 items-center justify-center rounded-md border border-neutral-950 px-4 text-sm font-bold transition hover:bg-neutral-950 hover:text-white"
              >
                View cart
              </Link>
            </div>
          </aside>
        </div>

        <section className="mt-6 rounded-lg border border-neutral-200 bg-white p-4 shadow-sm">
          <div className="grid gap-3 lg:grid-cols-[1fr_220px_220px_180px_auto]">
            <input
              className="h-11 rounded-md border border-neutral-300 bg-white px-4 text-sm outline-none transition focus:border-orange-500"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search products by name..."
            />

            <select
              className="h-11 rounded-md border border-neutral-300 bg-white px-3 text-sm outline-none transition focus:border-orange-500"
              value={sourceFilter}
              onChange={(event) => setSourceFilter(event.target.value)}
            >
              <option value="all">All products</option>
              <option value="local">My products / Makeup</option>
              <option value="api">API products / General</option>
            </select>

            <select
              className="h-11 rounded-md border border-neutral-300 bg-white px-3 text-sm outline-none transition focus:border-orange-500"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item === "all" ? "All categories" : item}
                </option>
              ))}
            </select>

            <select
              className="h-11 rounded-md border border-neutral-300 bg-white px-3 text-sm outline-none transition focus:border-orange-500"
              value={sort}
              onChange={(event) => setSort(event.target.value)}
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>

            <button
              className="h-11 rounded-md border border-neutral-300 px-4 text-sm font-bold transition hover:border-neutral-950 hover:bg-neutral-950 hover:text-white"
              type="button"
              onClick={clearFilters}
            >
              Clear
            </button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-[0.12em]">
            <button
              className={`rounded-full px-3 py-2 transition ${
                sourceFilter === "all" ? "bg-neutral-950 text-white" : "bg-neutral-100 text-neutral-600"
              }`}
              type="button"
              onClick={() => setSourceFilter("all")}
            >
              All products
            </button>
            <button
              className={`rounded-full px-3 py-2 transition ${
                sourceFilter === "local" ? "bg-neutral-950 text-white" : "bg-neutral-100 text-neutral-600"
              }`}
              type="button"
              onClick={() => setSourceFilter("local")}
            >
              My makeup products
            </button>
            <button
              className={`rounded-full px-3 py-2 transition ${
                sourceFilter === "api" ? "bg-orange-600 text-white" : "bg-orange-100 text-orange-700"
              }`}
              type="button"
              onClick={() => setSourceFilter("api")}
            >
              General API products
            </button>
            <span className="rounded-full bg-neutral-100 px-3 py-2 text-neutral-600">
              {normalizedLocalProducts.length} local
            </span>
            <span className="rounded-full bg-orange-100 px-3 py-2 text-orange-700">
              {normalizedApiProducts.length} API loaded / page {apiPage} of {apiTotalPages}
            </span>
            <span className="rounded-full bg-neutral-950 px-3 py-2 text-white">
              {filteredProducts.length} showing
            </span>
          </div>
        </section>

        {localStatus === "failed" ? (
          <ErrorBanner
            title="Local products could not load"
            message={localError || "Your API /api/storefront/products returned an error."}
            onRetry={() => dispatch(fetchProducts())}
          />
        ) : null}

        {apiError ? (
          <ErrorBanner
            title="API products could not load"
            message={apiError}
            onRetry={() => loadApiProducts(apiPage || 1, apiProducts.length === 0)}
          />
        ) : null}

        <section className="mt-6">
          {isInitialLoading ? (
            <ProductSkeletonGrid />
          ) : filteredProducts.length === 0 ? (
            <div className="rounded-lg border border-dashed border-neutral-300 bg-white px-6 py-16 text-center">
              <h2 className="text-2xl font-bold">No products found</h2>
              <p className="mt-2 text-sm text-neutral-500">
                Try another search term, category, or product source.
              </p>
              <button
                className="mt-5 h-11 rounded-md bg-neutral-950 px-5 text-sm font-bold text-white"
                type="button"
                onClick={clearFilters}
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={() => addProductToCart(product)}
                />
              ))}
            </div>
          )}
        </section>

        <div className="mt-8 flex justify-center">
          <button
            className="inline-flex h-12 items-center justify-center rounded-md border border-neutral-950 bg-neutral-950 px-6 text-sm font-bold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
            type="button"
            disabled={apiLoading || !hasMoreApiProducts}
            onClick={() => loadApiProducts(apiPage + 1)}
          >
            {apiLoading
              ? "Loading API products..."
              : hasMoreApiProducts
                ? "Load More API Products"
                : "No More API Products"}
          </button>
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product, onAddToCart }) {
  const description =
    product.description && product.description.length > 96
      ? `${product.description.slice(0, 96)}...`
      : product.description;

  return (
    <article className="group flex min-h-full flex-col overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-orange-300 hover:shadow-lg">
      <div className="relative aspect-square bg-neutral-100">
        {product.image ? (
          <img
            className="h-full w-full object-contain p-5 transition group-hover:scale-105"
            src={product.image}
            alt={product.title || "Product"}
            loading="lazy"
          />
        ) : (
          <div className="grid h-full place-items-center text-sm font-semibold text-neutral-400">
            No image
          </div>
        )}
        <span
          className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] ${
            product.source === "api"
              ? "bg-orange-100 text-orange-700"
              : "bg-neutral-950 text-white"
          }`}
        >
          {product.source === "api" ? "API" : "Makeup"}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-neutral-400">
          {product.category || "General"}
        </p>
        <h3 className="mt-2 line-clamp-2 text-base font-bold leading-6 text-neutral-950">
          {product.title || "Untitled product"}
        </h3>
        {description ? (
          <p className="mt-2 line-clamp-3 text-sm leading-6 text-neutral-500">
            {description}
          </p>
        ) : (
          <p className="mt-2 text-sm leading-6 text-neutral-400">No description available.</p>
        )}

        <div className="mt-auto pt-4">
          <div className="mb-3 text-xl font-black">${Number(product.price || 0).toFixed(2)}</div>
          <button
            className="inline-flex h-11 w-full items-center justify-center rounded-md bg-neutral-950 px-4 text-sm font-bold text-white transition hover:bg-orange-600"
            type="button"
            onClick={onAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}

function ProductSkeletonGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
      {Array.from({ length: 10 }).map((_, index) => (
        <div key={index} className="animate-pulse rounded-lg border border-neutral-200 bg-white p-4">
          <div className="aspect-square rounded-md bg-neutral-200" />
          <div className="mt-4 h-3 w-24 rounded bg-neutral-200" />
          <div className="mt-3 h-4 w-4/5 rounded bg-neutral-200" />
          <div className="mt-2 h-4 w-3/5 rounded bg-neutral-200" />
          <div className="mt-6 h-10 rounded bg-neutral-200" />
        </div>
      ))}
    </div>
  );
}

function ErrorBanner({ title, message, onRetry }) {
  return (
    <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-900">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-sm font-bold">{title}</h2>
          <p className="mt-1 text-sm">{String(message)}</p>
        </div>
        <button
          className="h-10 rounded-md border border-red-300 bg-white px-4 text-sm font-bold transition hover:bg-red-100"
          type="button"
          onClick={onRetry}
        >
          Retry
        </button>
      </div>
    </div>
  );
}
