import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/types";

interface CartState {
  items: Product[];
  isHydrated: boolean;
}

const initialState: CartState = {
  items: [],
  isHydrated: false,
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
      if (typeof window !== "undefined") {
        localStorage.setItem("mini-cart-data", JSON.stringify(state.items));
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      if (typeof window !== "undefined") {
        localStorage.setItem("mini-cart-data", JSON.stringify(state.items));
      }
    },
  },
});

export const { hydrateCart, addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
