'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Mock course content - would be replaced with real data
const COURSE_CONTENT = {
  id: 1,
  title: 'Body Contouring Specialist',
  modules: [
    {
      id: 1,
      title: 'Module 1: Introduction to Body Contouring',
      lessons: [
        { id: 1, title: 'Understanding the Lymphatic System', completed: true },
        { id: 2, title: 'Skin Anatomy and Physiology', completed: true },
        { id: 3, title: 'Fat Types and Distribution', completed: false }
      ]
    },
    {
      id: 2,
      title: 'Module 2: Treatment Techniques',
      lessons: [
        { id: 4, title: 'Low Level Light Therapy', completed: false },
        { id: 5, title: 'Cavitation Techniques', completed: false },
        { id: 6, title: 'Radiofrequency Applications', completed: false },
        { id: 7, title: 'Vacuum Therapy Methods', completed: false }
      ]
    },
    {
      id: 3,
      title: 'Module 3: Professional Practice',
      lessons: [
        { id: 8, title: 'Treatment Contraindications', completed: false },
        { id: 9, title: 'Machine Operations', completed: false },
        { id: 10, title: 'Sanitation Protocols', completed: false },
        { id: 11, title: 'Client Consultations', completed: false }
      ]
    },
    {
      id: 4,
      title: 'Module 4: Business Operations',
      lessons: [
        { id: 12, title: 'Client Forms and Documentation', completed: false },
        { id: 13, title: 'Marketing Your Services', completed: false },
        { id: 14, title: 'Final Assessment', completed: false }
      ]
    }
  ],
  currentLesson: {
    id: 3,
    title: 'Fat Types and Distribution',
    content: `
      <div class="prevent-screenshot">
        <h1>Fat Types and Distribution</h1>
        
        <p>In this lesson, we'll explore the different types of fat in the human body and how they are distributed. Understanding fat types is crucial for effective body contouring treatments.</p>
        
        <h2>Types of Fat</h2>
        
        <h3>1. Subcutaneous Fat</h3>
        <p>This is the fat that lies directly under the skin. It's the fat that you can pinch and is the primary target for most body contouring treatments. Subcutaneous fat is less metabolically active than visceral fat.</p>
        
        <h3>2. Visceral Fat</h3>
        <p>This fat surrounds the internal organs in the abdominal cavity. It's more metabolically active and can be more harmful to health when present in excess. Body contouring treatments generally don't target visceral fat directly.</p>
        
        <h3>3. Brown Fat</h3>
        <p>Unlike white fat (subcutaneous and visceral), brown fat is metabolically active and burns calories to generate heat. It's more prevalent in infants but adults retain some brown fat, primarily around the neck and shoulders.</p>
        
        <h2>Fat Distribution Patterns</h2>
        
        <p>Fat distribution varies based on several factors including genetics, hormones, age, and sex:</p>
        
        <ul>
          <li><strong>Android (Apple) Pattern:</strong> Fat concentrated around the abdomen and upper body. More common in men.</li>
          <li><strong>Gynoid (Pear) Pattern:</strong> Fat concentrated around the hips, thighs, and buttocks. More common in women.</li>
        </ul>
        
        <p>Understanding these patterns helps in developing targeted treatment plans for clients.</p>
        
        <h2>Stubborn Fat Areas</h2>
        
        <p>Certain areas tend to accumulate fat that is resistant to diet and exercise:</p>
        
        <ul>
          <li>Lower abdomen</li>
          <li>Love handles (flanks)</li>
          <li>Inner thighs</li>
          <li>Upper arms</li>
          <li>Bra line</li>
          <li>Double chin</li>
        </ul>
        
        <p>These areas are often the primary focus of body contouring treatments.</p>
        
        <h2>Hormonal Influences on Fat Distribution</h2>
        
        <p>Hormones play a significant role in where and how fat is stored:</p>
        
        <ul>
          <li><strong>Estrogen:</strong> Promotes fat storage in the hips, thighs, and buttocks</li>
          <li><strong>Testosterone:</strong> Promotes fat storage in the abdomen</li>
          <li><strong>Cortisol:</strong> Stress hormone that promotes abdominal fat storage</li>
          <li><strong>Insulin:</strong> Regulates fat storage; insulin resistance can lead to increased abdominal fat</li>
        </ul>
        
        <p>Understanding these hormonal influences helps practitioners address underlying factors that may affect treatment outcomes.</p>
      </div>
    `
  }
};

export default function CourseLearnPage({ params }: { params: { courseId: string, lessonId?: string } }) {
  const [activeModule, setActiveModule] = useState<number | null>(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  
  // Calculate progress
  useEffect(() => {
    const totalLessons = COURSE_CONTENT.modules.reduce((total, module) => total + module.lessons.length, 0);
    const completedLessons = COURSE_CONTENT.modules.reduce((total, module) => 
      total + module.lessons.filter(lesson => lesson.completed).length, 0);
    
    setProgress(Math.round((completedLessons / totalLessons) * 100));
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Top navigation */}
      <header className="bg-white shadow-sm z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link href="/dashboard" className="flex-shrink-0 flex items-center">
                <span className="text-brand-purple font-medium">← Back to Dashboard</span>
              </Link>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-500">{progress}% Complete</span>
              <div className="w-32 bg-gray-200 rounded-full h-2.5 ml-2">
                <div className="bg-brand-purple h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar for course navigation */}
        <div className={`bg-white w-64 flex-shrink-0 border-r border-gray-200 pt-5 pb-4 overflow-y-auto ${sidebarOpen ? 'block' : 'hidden'} md:block`}>
          <div className="flex items-center flex-shrink-0 px-4">
            <h2 className="text-lg font-medium text-gray-900">{COURSE_CONTENT.title}</h2>
          </div>
          <nav className="mt-5 px-2 space-y-1">
            {COURSE_CONTENT.modules.map((module) => (
              <div key={module.id} className="mb-4">
                <button
                  className="w-full flex items-center justify-between p-2 text-left text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50"
                  onClick={() => setActiveModule(activeModule === module.id ? null : module.id)}
                >
                  <span>{module.title}</span>
                  <span>{activeModule === module.id ? '−' : '+'}</span>
                </button>
                
                {activeModule === module.id && (
                  <ul className="mt-1 pl-4 space-y-1">
                    {module.lessons.map((lesson) => (
                      <li key={lesson.id}>
                        <Link
                          href={`/courses/${COURSE_CONTENT.id}/learn/${lesson.id}`}
                          className={`block p-2 text-sm rounded-md ${
                            COURSE_CONTENT.currentLesson.id === lesson.id
                              ? 'bg-brand-purple text-white'
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <div className="flex items-center">
                            {lesson.completed && (
                              <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            )}
                            {lesson.title}
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </nav>
        </div>
        
        {/* Mobile sidebar toggle */}
        <div className="md:hidden fixed bottom-4 left-4 z-20">
          <button
            className="bg-brand-purple text-white p-3 rounded-full shadow-lg"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? 'Close' : 'Menu'}
          </button>
        </div>
        
        {/* Main content area */}
        <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div dangerouslySetInnerHTML={{ __html: COURSE_CONTENT.currentLesson.content }} />
                
                <div className="mt-8 flex justify-between">
                  <button className="btn-secondary">Previous Lesson</button>
                  <button className="btn-primary">Next Lesson</button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
