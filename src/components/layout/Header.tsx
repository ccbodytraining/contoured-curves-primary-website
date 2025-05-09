'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Bars3Icon, XMarkIcon, ShoppingCartIcon, UserIcon } from '@heroicons/react/24/outline';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Image
                src="/images/logo.jpeg"
                alt="Contoured Curves Body Sculpting Academy"
                width={50}
                height={50}
                className="h-12 w-auto"
              />
              <span className="ml-3 text-xl font-medium text-brand-purple hidden md:block">
                Contoured Curves
              </span>
            </Link>
          </div>
          
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link href="/courses" className="text-gray-700 hover:text-brand-purple px-3 py-2 text-sm font-medium">
              Courses
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-brand-purple px-3 py-2 text-sm font-medium">
              About Us
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-brand-purple px-3 py-2 text-sm font-medium">
              Contact
            </Link>
            <Link href="/login" className="text-gray-700 hover:text-brand-purple px-3 py-2 text-sm font-medium">
              <UserIcon className="h-6 w-6" />
            </Link>
            <Link href="/cart" className="text-gray-700 hover:text-brand-purple px-3 py-2 text-sm font-medium">
              <ShoppingCartIcon className="h-6 w-6" />
            </Link>
          </div>
          
          <div className="flex items-center md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-brand-purple hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-purple"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              href="/courses" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brand-purple hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Courses
            </Link>
            <Link 
              href="/about" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brand-purple hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <Link 
              href="/contact" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brand-purple hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Link 
              href="/login" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brand-purple hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Login / Register
            </Link>
            <Link 
              href="/cart" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brand-purple hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Cart
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
