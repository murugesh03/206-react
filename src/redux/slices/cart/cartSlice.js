import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    total: 0
  },
  reducers: {
    loadCart: (state, action) => {
      const items = (action.payload || []).map((item) => ({
        ...item,
        id: item.id || item.productId || item._id
      }));
      const total = items.reduce(
        (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0),
        0
      );
      state.items = items;
      state.total = total;
    },
    addToCart: (state, action) => {
      const item = action.payload;
      const normalizedId = item.id || item.productId || item._id;
      const existingItem = state.items.find((i) => i.id === normalizedId);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...item, id: normalizedId, quantity: 1 });
      }
      state.total += Number(item.price || 0);
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      if (id === "all") {
        state.items = [];
        state.total = 0;
        return;
      }
      const existingItem = state.items.find((i) => i.id === id);
      if (existingItem) {
        state.total -= existingItem.price * existingItem.quantity;
        state.items = state.items.filter((i) => i.id !== id);
      }
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find((i) => i.id === id);
      if (existingItem) {
        const priceDifference =
          existingItem.price * (quantity - existingItem.quantity);
        existingItem.quantity = quantity;
        state.total += priceDifference;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    }
  }
});

export const {
  loadCart,
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart
} = cartSlice.actions;
export default cartSlice.reducer;
