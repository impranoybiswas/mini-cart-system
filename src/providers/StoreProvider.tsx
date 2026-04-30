"use client";

import { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { store } from "@/store";
import { hydrateCart } from "@/store/cartSlice";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const stored = localStorage.getItem("mini-cart-data");
      if (stored) {
        try {
          store.dispatch(hydrateCart(JSON.parse(stored)));
        } catch (e: unknown) {
          console.error(e);
          store.dispatch(hydrateCart([]));
        }
      } else {
        store.dispatch(hydrateCart([]));
      }

      store.subscribe(() => {
        localStorage.setItem(
          "mini-cart-data",
          JSON.stringify(store.getState().cart.items),
        );
      });
    }
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
