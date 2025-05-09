'use client';

import { useState, useEffect } from 'react';
import { createContext, useContext } from 'react';

// Types
export interface CartItem {
  id: number;
  title: string;
  price: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => boolean;
  subtotal: number;
  discount: number;
  total: number;
}

// Create context with default values
const CartContext = createContext<CartContextType>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  clearCart: () => {},
  applyCoupon: () => false,
  subtotal: 0,
  discount: 0,
  total: 0,
});

// Sample discount codes - would be replaced with API calls
const DISCOUNT_CODES = {
  'DISCOUNT10': 0.1, // 10% discount
  'DISCOUNT20': 0.2, // 20% discount
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  // Initialize cart from localStorage if available
  const [items, setItems] = useState<CartItem[]>([]);
  const [discount, setDiscount] = useState(0);
  
  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart from localStorage', e);
      }
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);
  
  // Calculate subtotal
  const subtotal = items.reduce((total, item) => total + item.price, 0);
  
  // Calculate total after discount
  const total = subtotal - discount;
  
  // Add item to cart
  const addItem = (item: CartItem) => {
    // Check if item already exists in cart
    const exists = items.some(i => i.id === item.id);
    if (!exists) {
      setItems([...items, item]);
    }
  };
  
  // Remove item from cart
  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };
  
  // Clear cart
  const clearCart = () => {
    setItems([]);
    setDiscount(0);
  };
  
  // Apply coupon code
  const applyCoupon = (code: string): boolean => {
    const upperCode = code.toUpperCase();
    if (DISCOUNT_CODES[upperCode]) {
      setDiscount(subtotal * DISCOUNT_CODES[upperCode]);
      return true;
    }
    return false;
  };
  
  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      clearCart,
      applyCoupon,
      subtotal,
      discount,
      total
    }}>
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to use the cart context
export function useCart() {
  return useContext(CartContext);
}
