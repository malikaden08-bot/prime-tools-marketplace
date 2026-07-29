"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  id: string;
  title: string;
  category: string;
  price: number;
  imageUrl: string;
  format: string;
}

interface CartContextType {
  cartItems: CartItem[];
  isCartOpen: boolean;
  promoCode: string;
  discountPercentage: number;
  subtotal: number;
  promoDiscount: number;
  grandTotal: number;
  addToCart: (item: Omit<CartItem, "format"> & { format?: string }) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  applyPromoCode: (code: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [promoCode, setPromoCode] = useState<string>("");
  const [discountPercentage, setDiscountPercentage] = useState<number>(0);

  useEffect(() => {
    const savedCart = localStorage.getItem("prime_tools_cart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {}
    }
  }, []);

  const saveCart = (items: CartItem[]) => {
    setCartItems(items);
    localStorage.setItem("prime_tools_cart", JSON.stringify(items));
  };

  const addToCart = (item: Omit<CartItem, "format"> & { format?: string }) => {
    const exists = cartItems.some((i) => i.id === item.id);
    if (!exists) {
      const newItem: CartItem = { ...item, format: item.format || "Figma & Source ZIP" };
      saveCart([...cartItems, newItem]);
    }
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    saveCart(cartItems.filter((i) => i.id !== id));
  };

  const clearCart = () => {
    saveCart([]);
    setPromoCode("");
    setDiscountPercentage(0);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const applyPromoCode = (code: string): boolean => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === "PRIME20") {
      setPromoCode("PRIME20");
      setDiscountPercentage(20);
      return true;
    }
    if (cleanCode === "PROMO50") {
      setPromoCode("PROMO50");
      setDiscountPercentage(50);
      return true;
    }
    return false;
  };

  const subtotal = cartItems.reduce((acc, i) => acc + i.price, 0);
  const promoDiscount = (subtotal * discountPercentage) / 100;
  const grandTotal = Math.max(0, subtotal - promoDiscount);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        promoCode,
        discountPercentage,
        subtotal,
        promoDiscount,
        grandTotal,
        addToCart,
        removeFromCart,
        clearCart,
        openCart,
        closeCart,
        applyPromoCode,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
