'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CheckoutPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This would be replaced with actual payment processing logic
    console.log('Processing payment', formData);
    alert('This is a demo. In a real application, you would be redirected to a payment processor.');
  };

  // Mock order summary data - would be replaced with real data from cart state
  const orderSummary = {
    items: [
      { id: 1, title: 'Body Contouring Specialist', price: 175.00 },
      { id: 4, title: 'Body Ice Sculpting', price: 99.00 }
    ],
    subtotal: 274.00,
    discount: 27.40, // 10% discount
    total: 246.60
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
      
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
        <div className="lg:col-span-7">
          <div className="bg-white shadow-sm rounded-lg p-6 mb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Billing Information</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="input-field w-full mt-1"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="input-field w-full mt-1"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="input-field w-full mt-1"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  className="input-field w-full mt-1"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-3 sm:gap-x-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    className="input-field w-full mt-1"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                    State / Province
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    className="input-field w-full mt-1"
                    value={formData.state}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
                    ZIP / Postal Code
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    className="input-field w-full mt-1"
                    value={formData.zipCode}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                  Country
                </label>
                <select
                  id="country"
                  name="country"
                  className="input-field w-full mt-1"
                  value={formData.country}
                  onChange={handleChange}
                  required
                >
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="MX">Mexico</option>
                  <option value="UK">United Kingdom</option>
                  {/* Add more countries as needed */}
                </select>
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Information</h3>
                
                <div>
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                    Card Number
                  </label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    placeholder="•••• •••• •••• ••••"
                    className="input-field w-full mt-1"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-3 sm:gap-x-4 mt-4">
                  <div className="sm:col-span-2">
                    <label htmlFor="cardName" className="block text-sm font-medium text-gray-700">
                      Name on Card
                    </label>
                    <input
                      type="text"
                      id="cardName"
                      name="cardName"
                      className="input-field w-full mt-1"
                      value={formData.cardName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      id="expiryDate"
                      name="expiryDate"
                      placeholder="MM/YY"
                      className="input-field w-full mt-1"
                      value={formData.expiryDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="mt-4">
                  <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                    CVV
                  </label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    placeholder="•••"
                    className="input-field w-1/4 mt-1"
                    value={formData.cvv}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div className="mt-6">
                <button type="submit" className="btn-primary w-full py-3">
                  Complete Purchase
                </button>
              </div>
            </form>
          </div>
        </div>
        
        <div className="lg:col-span-5">
          <div className="bg-white shadow-sm rounded-lg p-6 sticky top-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
            
            <ul className="divide-y divide-gray-200 mb-6">
              {orderSummary.items.map((item) => (
                <li key={item.id} className="py-4 flex justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.title}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">${item.price.toFixed(2)}</p>
                </li>
              ))}
            </ul>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <p className="text-sm text-gray-600">Subtotal</p>
                <p className="text-sm font-medium text-gray-900">${orderSummary.subtotal.toFixed(2)}</p>
              </div>
              
              <div className="flex justify-between">
                <p className="text-sm text-gray-600">Discount (10%)</p>
                <p className="text-sm font-medium text-green-600">-${orderSummary.discount.toFixed(2)}</p>
              </div>
              
              <div className="border-t border-gray-200 pt-2 flex justify-between">
                <p className="text-base font-medium text-gray-900">Total</p>
                <p className="text-base font-bold text-brand-purple">${orderSummary.total.toFixed(2)}</p>
              </div>
            </div>
            
            <div className="mt-6 text-xs text-gray-500">
              <p>By completing your purchase, you agree to our <Link href="/terms-of-service" className="text-brand-purple hover:underline">Terms of Service</Link> and <Link href="/privacy-policy" className="text-brand-purple hover:underline">Privacy Policy</Link>.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
