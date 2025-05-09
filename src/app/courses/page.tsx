'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Mock course data - would be replaced with real data from API/database
const COURSES = [
  {
    id: 1,
    title: 'Body Contouring Specialist',
    description: 'In-depth body contouring specialist course covers the lymphatic system, skin anatomy, fat types, treatment order, and more.',
    price: 175.00,
    image: '/images/placeholder-course.jpg'
  },
  {
    id: 2,
    title: 'Virtual Mesotherapy',
    description: 'Learn to administer body contouring serums virtually with this comprehensive course.',
    price: 125.00,
    image: '/images/placeholder-course.jpg'
  },
  {
    id: 3,
    title: 'Wood Therapy',
    description: 'Master the art and science of wood therapy for body sculpting and lymphatic drainage.',
    price: 125.00,
    image: '/images/placeholder-course.jpg'
  },
  {
    id: 4,
    title: 'Body Ice Sculpting',
    description: 'Learn the art of holistic body contouring through our signature ice sculpting method.',
    price: 99.00,
    image: '/images/placeholder-course.jpg'
  },
  {
    id: 5,
    title: 'Yesotherapy',
    description: 'Advanced techniques for body wrapping and sculpting using yesotherapy methods.',
    price: 99.00,
    image: '/images/placeholder-course.jpg'
  },
  {
    id: 6,
    title: 'Bootcamp Training Course',
    description: 'The most comprehensive online training in non-invasive body sculpting — all in one powerful course.',
    price: 500.00,
    image: '/images/placeholder-course.jpg'
  }
];

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');

  // Filter courses based on search term and price filter
  const filteredCourses = COURSES.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesPrice = true;
    if (priceFilter === 'under100') {
      matchesPrice = course.price < 100;
    } else if (priceFilter === '100to200') {
      matchesPrice = course.price >= 100 && course.price <= 200;
    } else if (priceFilter === 'over200') {
      matchesPrice = course.price > 200;
    }
    
    return matchesSearch && matchesPrice;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Body Sculpting Courses</h1>
      
      {/* Filters */}
      <div className="mb-8 bg-white p-4 rounded-lg shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="w-full md:w-1/2">
            <label htmlFor="search" className="sr-only">Search courses</label>
            <input
              type="text"
              id="search"
              placeholder="Search courses..."
              className="input-field w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="price-filter" className="mr-2 text-sm font-medium text-gray-700">Price:</label>
            <select
              id="price-filter"
              className="input-field"
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
            >
              <option value="all">All Prices</option>
              <option value="under100">Under $100</option>
              <option value="100to200">$100 - $200</option>
              <option value="over200">Over $200</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Course Grid */}
      <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 gap-x-8">
        {filteredCourses.map((course) => (
          <div key={course.id} className="card">
            <div className="relative h-48 w-full bg-gray-200">
              {/* Placeholder for course image */}
              <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                Course Image
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h3>
              <p className="text-gray-600 mb-4 line-clamp-3">{course.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-brand-purple">${course.price.toFixed(2)}</span>
                <Link href={`/courses/${course.id}`} className="btn-secondary text-sm">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Empty state */}
      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No courses found matching your criteria.</p>
          <button 
            className="mt-4 btn-secondary"
            onClick={() => {
              setSearchTerm('');
              setPriceFilter('all');
            }}
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
