import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./CartSlice";
import OrderReducer from "./OrderSlice";
import FavoriteReducer from "./FavoriteSlice";
import ProductReducer from "./ProductSlice";

const Store = configureStore({
  reducer: {
    products: ProductReducer,
    cart: CartReducer,
    order: OrderReducer,
    favorite: FavoriteReducer,
  },
});

export default Store;
