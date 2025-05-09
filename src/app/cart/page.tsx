'use client';

import { useState } from 'react';
import Link from 'next/link';

// Mock cart data - would be replaced with real data from state management
const INITIAL_CART = [
  {
    id: 1,
    title: 'Body Contouring Specialist',
    price: 175.00,
  },
  {
    id: 4,
    title: 'Body Ice Sculpting',
    price: 99.00,
  }
];

export default function CartPage() {
  const [cart, setCart] = useState(INITIAL_CART);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);

  // Calculate totals
  const subtotal = cart.reduce((total, item) => total + item.price, 0);
  const total = subtotal - discount;

  // Remove item from cart
  const removeItem = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
  };

  // Apply coupon code (mock functionality)
  const applyCoupon = () => {
    if (couponCode.toLowerCase() === 'discount10') {
      setDiscount(subtotal * 0.1); // 10% discount
    } else if (couponCode.toLowerCase() === 'discount20') {
      setDiscount(subtotal * 0.2); // 20% discount
    } else {
      alert('Invalid coupon code');
      setDiscount(0);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>
      
      {cart.length > 0 ? (
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
          <div className="lg:col-span-7">
            <div className="bg-white shadow-sm rounded-lg mb-6">
              <ul className="divide-y divide-gray-200">
                {cart.map((item) => (
                  <li key={item.id} className="p-6 flex items-center">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
                      <p className="mt-1 text-brand-purple font-medium">${item.price.toFixed(2)}</p>
                    </div>
                    <button 
                      className="text-sm text-red-600 hover:text-red-800"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="lg:col-span-5">
            <div className="bg-white shadow-sm rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <p className="text-gray-600">Subtotal</p>
                  <p className="text-gray-900 font-medium">${subtotal.toFixed(2)}</p>
                </div>
                
                {discount > 0 && (
                  <div className="flex justify-between">
                    <p className="text-gray-600">Discount</p>
                    <p className="text-green-600 font-medium">-${discount.toFixed(2)}</p>
                  </div>
                )}
                
                <div className="border-t border-gray-200 pt-4 flex justify-between">
                  <p className="text-lg font-medium text-gray-900">Total</p>
                  <p className="text-lg font-bold text-brand-purple">${total.toFixed(2)}</p>
                </div>
                
                <div className="mt-6">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Coupon code"
                      className="input-field flex-1"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <button 
                      className="btn-secondary whitespace-nowrap"
                      onClick={applyCoupon}
                    >
                      Apply
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Try "DISCOUNT10" or "DISCOUNT20" for demo</p>
                </div>
                
                <Link href="/checkout" className="btn-primary w-full py-3 text-center block">
                  Proceed to Checkout
                </Link>
                
                <Link href="/courses" className="text-sm text-brand-purple hover:underline text-center block">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-white shadow-sm rounded-lg">
          <h2 className="text-xl font-medium text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Looks like you haven't added any courses to your cart yet.</p>
          <Link href="/courses" className="btn-primary">
            Browse Courses
          </Link>
        </div>
      )}
    </div>
  );
}
