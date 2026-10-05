import { configureStore } from "@reduxjs/toolkit";
import itemSlice from "./features/items/itemSlice";
import cartSlice, { persistCart } from "./features/cart/cartSlice";

const store = configureStore({
  reducer: {
    items: itemSlice,
    cart: cartSlice,
  },
});

persistCart(store);

export default store;
