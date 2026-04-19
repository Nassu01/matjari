import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],       // [{id, name, price, image, quantity, totalPrice}]
  totalQuantity: 0,   // total items count
  totalAmount: 0,     // total price
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
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
          quantity: 1,
          totalPrice: price,
        });
      }
    },

    increaseQuantity: (state, action) => {
      const id = action.payload;
      const existing = state.products.find((p) => p.id === id);
      if (!existing) return;

      const price = Number(existing.price || 0);
      existing.quantity += 1;
      existing.totalPrice += price;
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
    },

    removeFromCart: (state, action) => {
      const id = action.payload;
      state.products = state.products.filter((p) => p.id !== id);
    },

    clearCart: (state) => {
      state.products = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
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
