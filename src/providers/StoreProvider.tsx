"use client";

import { useEffect, useRef, useState } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "@/store";
import { hydrateCart } from "@/store/cartSlice";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [store] = useState<AppStore>(() => makeStore());
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const stored = localStorage.getItem("mini-cart-data");
      if (stored) {
        try {
          store.dispatch(hydrateCart(stored ? JSON.parse(stored) : []));
        } catch {
          store.dispatch(hydrateCart([]));
        }
      } else {
        store.dispatch(hydrateCart([]));
      }

      const unsubscribe = store.subscribe(() => {
        localStorage.setItem(
          "mini-cart-data",
          JSON.stringify(store.getState().cart.items),
        );
      });
      return () => unsubscribe();
    }
  }, [store]);

  return <Provider store={store}>{children}</Provider>;
}
