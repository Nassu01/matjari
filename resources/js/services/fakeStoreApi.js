const API_BASE_URL = "https://fakestoreapiserver.reactbd.org";

function extractList(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.products)) return payload.products;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.result)) return payload.result;
  return [];
}

export async function fetchApiProducts(page = 1, perPage = 20) {
  const response = await fetch(
    `${API_BASE_URL}/api/products?page=${page}&perPage=${perPage}`,
    {
      headers: {
        Accept: "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Could not load API products (${response.status})`);
  }

  const payload = await response.json();
  return {
    products: extractList(payload),
    totalProducts: Number(payload?.totalProducts || 0),
    totalPages: Number(payload?.totalPages || 1),
    currentPage: Number(payload?.currentPage || page),
    perPage: Number(payload?.perPage || perPage),
  };
}

export async function fetchApiCategories() {
  const response = await fetch(`${API_BASE_URL}/api/categories`, {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Could not load API categories (${response.status})`);
  }

  const payload = await response.json();
  return extractList(payload);
}

export function normalizeApiProduct(product) {
  const rawId = product.id ?? product._id;
  const rawCategory = product.category?.name || product.category || "General";
  const categoryLabel = String(rawCategory)
    .replace(/-/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
  const typeLabel = product.type
    ? String(product.type).replace(/-/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase())
    : "";

  return {
    id: `api-${rawId}`,
    source: "api",
    title: product.title || product.name,
    price: Number(product.price || 0),
    image: product.image || product.thumbnail || product.images?.[0] || "",
    category: categoryLabel || "General",
    type: typeLabel,
    description: product.description || product.shortDescription || "",
  };
}

export function normalizeLocalProduct(product) {
  return {
    id: product.id,
    source: "local",
    title: product.name || product.title,
    price: Number(product.price || 0),
    image: product.image || "",
    category: product.categoryName || product.category || "Makeup",
    description: product.description || product.shortDescription || "",
  };
}
