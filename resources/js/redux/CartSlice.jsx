import { createSlice } from "@reduxjs/toolkit";

const CART_STORAGE_KEY = "matjari_cart";

function loadCart() {
  if (typeof window === "undefined") return null;

  try {
    const stored = window.localStorage.getItem(CART_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

function saveCart(state) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify({
        products: state.products,
        totalQuantity: state.totalQuantity,
        totalAmount: state.totalAmount,
      })
    );
  } catch {
    // localStorage can fail in private mode; the in-memory cart still works.
  }
}

const initialState = {
  products: [],       // [{id, name, price, image, quantity, totalPrice}]
  totalQuantity: 0,   // total items count
  totalAmount: 0,     // total price
};

const persistedState = loadCart();

const cartSlice = createSlice({
  name: "cart",
  initialState: persistedState || initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const id = item.id;
      const price = Number(item.price || 0);

      const existing = state.products.find((p) => p.id === id);

      if (existing) {
        existing.quantity += 1;
        existing.totalPrice += price;
      } else {
        state.products.push({
          id,
          name: item.name ?? item.titre ?? "Product",
          price,
          image: item.image ?? item.img ?? "",
          source: item.source ?? "local",
          category: item.category ?? "",
          quantity: 1,
          totalPrice: price,
        });
      }
      saveCart(state);
    },

    increaseQuantity: (state, action) => {
      const id = action.payload;
      const existing = state.products.find((p) => p.id === id);
      if (!existing) return;

      const price = Number(existing.price || 0);
      existing.quantity += 1;
      existing.totalPrice += price;
      saveCart(state);
    },

    decreaseQuantity: (state, action) => {
      const id = action.payload;
      const existing = state.products.find((p) => p.id === id);
      if (!existing) return;

      const price = Number(existing.price || 0);

      if (existing.quantity > 1) {
        existing.quantity -= 1;
        existing.totalPrice -= price;
      } else {
        state.products = state.products.filter((p) => p.id !== id);
      }
      saveCart(state);
    },

    removeFromCart: (state, action) => {
      const id = action.payload;
      state.products = state.products.filter((p) => p.id !== id);
      saveCart(state);
    },

    clearCart: (state) => {
      state.products = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      saveCart(state);
    },

    getCartTotals: (state) => {
      const totals = state.products.reduce(
        (acc, item) => {
          const qty = Number(item.quantity || 0);
          const line = Number(item.totalPrice ?? 0);

          acc.totalQuantity += qty;
          acc.totalAmount += Number.isFinite(line) ? line : 0;
          return acc;
        },
        { totalQuantity: 0, totalAmount: 0 }
      );

      state.totalQuantity = totals.totalQuantity;
      state.totalAmount = Number(totals.totalAmount.toFixed(2));
      saveCart(state);
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
  getCartTotals,
} = cartSlice.actions;

export default cartSlice.reducer;
