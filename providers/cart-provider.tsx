"use client";

/**
 * Cart context — add/remove items, persist to localStorage, expose useCart hook.
 * Wrapped by: app/providers.tsx
 */

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Book } from "@prisma/client";
import { cartItemsSchema, type ValidatedCartItem } from "@/lib/validations/cart.schema";

/** Item stored in cart (subset of Book + cart quantity) */
export type CartItem = ValidatedCartItem;

type CartContextType = {
  items: CartItem[];
  itemCount: number;
  total: number;
  addToCart: (book: Book) => void;
  removeFromCart: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
};

const CartContext = createContext<CartContextType | null>(null);
const STORAGE_KEY = "book-cart";

/** Provides cart state to the store — persists to localStorage */
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  /** Load cart from localStorage on mount */
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) {
        setHydrated(true);
        return;
      }

      const parsed = cartItemsSchema.safeParse(JSON.parse(saved));
      if (parsed.success) {
        setItems(parsed.data);
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
    setHydrated(true);
  }, []);

  /** Save cart whenever items change */
  useEffect(() => {
    if (hydrated) localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  /** Add book to cart or increment qty if already present */
  const addToCart = (book: Book) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === book.id);
      if (existing) {
        if (existing.quantity >= book.quantity) return prev;
        return prev.map((item) =>
          item.id === book.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          id: book.id,
          title: book.title,
          author: book.author,
          price: book.price,
          quantity: 1,
          imageUrl: book.imageUrl,
          maxQuantity: book.quantity,
        },
      ];
    });
  };

  /** Remove a book completely from cart */
  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  /** Increase qty up to max stock available */
  const increaseQuantity = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity < item.maxQuantity
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  /** Decrease qty — removes item when qty hits 0 */
  const decreaseQuantity = (id: string) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        total,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

/** Hook to read/update cart — must be used inside CartProvider */
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
