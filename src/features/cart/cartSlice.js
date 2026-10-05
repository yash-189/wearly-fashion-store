import { createSlice } from "@reduxjs/toolkit";

const STORAGE_KEY = "eflyer-cart";

const load = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
  } catch {
    return [];
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState: { lines: load(), open: false },
  reducers: {
    addToCart: (state, { payload: item }) => {
      const line = state.lines.find((l) => l.id === item.id);
      if (line) line.qty += 1;
      else
        state.lines.push({
          id: item.id,
          title: item.title,
          price: item.price,
          image: item.image,
          qty: 1,
        });
      state.open = true;
    },
    setQty: (state, { payload: { id, qty } }) => {
      if (qty <= 0) state.lines = state.lines.filter((l) => l.id !== id);
      else state.lines.find((l) => l.id === id).qty = qty;
    },
    removeFromCart: (state, { payload: id }) => {
      state.lines = state.lines.filter((l) => l.id !== id);
    },
    setCartOpen: (state, { payload }) => {
      state.open = payload;
    },
  },
});

export const { addToCart, setQty, removeFromCart, setCartOpen } = cartSlice.actions;
export default cartSlice.reducer;

export const selectCartLines = (state) => state.cart.lines;
export const selectCartOpen = (state) => state.cart.open;
export const selectCartCount = (state) => state.cart.lines.reduce((n, l) => n + l.qty, 0);
export const selectCartTotal = (state) =>
  state.cart.lines.reduce((sum, l) => sum + l.price * l.qty, 0);

export const persistCart = (store) => {
  let prev;
  store.subscribe(() => {
    const lines = store.getState().cart.lines;
    if (lines === prev) return;
    prev = lines;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {}
  });
};
