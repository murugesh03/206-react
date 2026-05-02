import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    total: 0
  },
  reducers: {
    loadCart: (state, action) => {
      return {
        ...state,
        items: action.payload
      };
    },
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
      state.total += item.price;
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
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
