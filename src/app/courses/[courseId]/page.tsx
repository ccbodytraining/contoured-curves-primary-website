'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Mock course data - would be replaced with real data from API/database
const COURSE = {
  id: 1,
  title: 'Body Contouring Specialist',
  description: 'In depth body contouring specialist course covers the lymphatic system, skin anatomy, fat types, treatment order, low level light therapy, cavitation, radiofrequency, vacuum therapy, treatment contraindications, machine operations and sanitation. Course includes client demo, body contouring bible, vendor links, client forms and certificate of completion. Lifetime course access.',
  price: 175.00,
  image: '/images/placeholder-course.jpg',
  curriculum: [
    {
      title: 'Module 1: Introduction to Body Contouring',
      lessons: [
        'Understanding the Lymphatic System',
        'Skin Anatomy and Physiology',
        'Fat Types and Distribution'
      ]
    },
    {
      title: 'Module 2: Treatment Techniques',
      lessons: [
        'Low Level Light Therapy',
        'Cavitation Techniques',
        'Radiofrequency Applications',
        'Vacuum Therapy Methods'
      ]
    },
    {
      title: 'Module 3: Professional Practice',
      lessons: [
        'Treatment Contraindications',
        'Machine Operations',
        'Sanitation Protocols',
        'Client Consultations'
      ]
    },
    {
      title: 'Module 4: Business Operations',
      lessons: [
        'Client Forms and Documentation',
        'Marketing Your Services',
        'Final Assessment'
      ]
    }
  ]
};

export default function CourseDetailPage({ params }: { params: { courseId: string } }) {
  const [activeTab, setActiveTab] = useState('description');
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          {/* Course Image */}
          <div className="md:w-1/3 relative h-64 md:h-auto bg-gray-200">
            {/* Placeholder for course image */}
            <div className="absolute inset-0 flex items-center justify-center text-gray-500">
              Course Image
            </div>
          </div>
          
          {/* Course Info */}
          <div className="md:w-2/3 p-6 md:p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{COURSE.title}</h1>
            
            <div className="flex items-center mb-6">
              <span className="text-2xl font-bold text-brand-purple">${COURSE.price.toFixed(2)}</span>
              <span className="ml-2 text-sm text-gray-500">Lifetime Access</span>
            </div>
            
            <div className="space-y-4 mb-8">
              <button className="btn-primary w-full py-3">Add to Cart</button>
              <button className="btn-secondary w-full py-3">Buy Now</button>
            </div>
            
            <div className="text-sm text-gray-600">
              <p>✓ Certificate of Completion</p>
              <p>✓ Lifetime Access</p>
              <p>✓ Comprehensive Course Materials</p>
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="border-t border-gray-200">
          <div className="flex">
            <button 
              className={`px-6 py-3 text-sm font-medium ${activeTab === 'description' ? 'text-brand-purple border-b-2 border-brand-purple' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('description')}
            >
              Description
            </button>
            <button 
              className={`px-6 py-3 text-sm font-medium ${activeTab === 'curriculum' ? 'text-brand-purple border-b-2 border-brand-purple' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('curriculum')}
            >
              Curriculum
            </button>
          </div>
          
          <div className="p-6">
            {activeTab === 'description' ? (
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">{COURSE.description}</p>
              </div>
            ) : (
              <div className="space-y-6">
                {COURSE.curriculum.map((module, index) => (
                  <div key={index} className="border border-gray-200 rounded-md overflow-hidden">
                    <div className="bg-gray-50 px-4 py-3 font-medium">
                      {module.title}
                    </div>
                    <ul className="divide-y divide-gray-200">
                      {module.lessons.map((lesson, lessonIndex) => (
                        <li key={lessonIndex} className="px-4 py-3 text-sm">
                          {lesson}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
