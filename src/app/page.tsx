import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-100 via-white to-purple-50 py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block xl:inline">Master the Art of</span>{' '}
            <span className="block text-brand-purple xl:inline">Body Sculpting</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-600 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Unlock your potential with comprehensive online training from Contoured Curves Body Sculpting Academy. Learn in-demand techniques and launch your career.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <Link href="/courses" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand-purple hover:bg-opacity-90 md:py-4 md:text-lg md:px-10">
                Browse Courses
              </Link>
            </div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <Link href="/about" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-brand-purple bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Section (Placeholder) */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Featured Courses
          </h2>
          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 gap-x-8">
            {/* Placeholder Course Cards - To be replaced with dynamic data */}
            {[1, 2, 3].map((i) => (
              <div key={i} className="card">
                <div className="aspect-w-16 aspect-h-9 bg-gray-200">{/* Placeholder Image */}</div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Course Title {i}</h3>
                  <p className="text-gray-600 mb-4">Brief description of the course content goes here...</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-brand-purple">$XXX.XX</span>
                    <Link href={`/courses/placeholder-${i}`} className="btn-secondary text-sm">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/courses" className="btn-primary">
              View All Courses
            </Link>
          </div>
        </div>
      </section>

      {/* About Us Snippet (Placeholder) */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">About Contoured Curves</h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-600 mb-8">
            We are dedicated to providing top-tier education in the rapidly growing field of body sculpting. Our expert-led courses empower students with the skills and confidence to succeed.
          </p>
          <Link href="/about" className="btn-secondary">
            Read Our Story
          </Link>
        </div>
      </section>
    </>
  );
}
