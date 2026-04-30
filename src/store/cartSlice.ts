import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/types";

interface CartState {
  items: Product[];
  isHydrated: boolean;
  isCartOpen: boolean;
}

const initialState: CartState = {
  items: [],
  isHydrated: false,
  isCartOpen: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    hydrateCart: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
      state.isHydrated = true;
    },
    addToCart: (state, action: PayloadAction<Product>) => {
      if (!state.items.some((item) => item.id === action.payload.id)) {
        state.items.push(action.payload);
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    openCart: (state) => {
      state.isCartOpen = true;
    },
    closeCart: (state) => {
      state.isCartOpen = false;
    },
  },
});

export const { hydrateCart, addToCart, removeFromCart, openCart, closeCart } =
  cartSlice.actions;
export default cartSlice.reducer;
