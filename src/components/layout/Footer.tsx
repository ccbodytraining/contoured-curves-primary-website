import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 mt-16">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center space-x-6 md:order-2">
            {/* Add social media links here if needed */}
          </div>
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-center text-base text-gray-500">
              &copy; {currentYear} Contoured Curves Body Sculpting Academy. All rights reserved.
            </p>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-gray-500">
          <Link href="/privacy-policy" className="hover:text-brand-purple mr-4">Privacy Policy</Link>
          <Link href="/terms-of-service" className="hover:text-brand-purple">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
