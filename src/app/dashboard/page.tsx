
import Link from "next/link";

// Mock user data - would be replaced with real data from auth context
const USER = {
  name: "Jane Doe",
  email: "jane.doe@example.com",
};

// Mock purchased courses - would be replaced with real data
const PURCHASED_COURSES = [
  { id: 1, title: "Body Contouring Specialist", progress: 75 },
  { id: 4, title: "Body Ice Sculpting", progress: 100, certificateUrl: "/certificates/ice-sculpting.pdf" },
];

// Mock order history - would be replaced with real data
const ORDER_HISTORY = [
  { id: "ORD123", date: "2025-04-20", total: 246.60, items: 2 },
  { id: "ORD101", date: "2025-03-15", total: 125.00, items: 1 },
];

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* My Courses */}
        <div className="md:col-span-2 bg-white shadow-sm rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">My Courses</h2>
          {PURCHASED_COURSES.length > 0 ? (
            <ul className="space-y-4">
              {PURCHASED_COURSES.map((course) => (
                <li key={course.id} className="border border-gray-200 rounded-md p-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{course.title}</h3>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                      <div className="bg-brand-purple h-2.5 rounded-full" style={{ width: `${course.progress}%` }}></div>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{course.progress}% Complete</p>
                  </div>
                  <div>
                    {course.progress === 100 && course.certificateUrl ? (
                      <Link href={course.certificateUrl} target="_blank" className="btn-secondary text-sm whitespace-nowrap ml-4">
                        View Certificate
                      </Link>
                    ) : (
                      <Link href={`/courses/${course.id}/learn`} className="btn-primary text-sm whitespace-nowrap ml-4">
                        {course.progress > 0 ? "Continue Learning" : "Start Course"}
                      </Link>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">You haven't enrolled in any courses yet.</p>
          )}
        </div>
        
        {/* Profile & Order History */}
        <div className="space-y-8">
          <div className="bg-white shadow-sm rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">My Profile</h2>
            <p className="text-gray-700"><strong>Name:</strong> {USER.name}</p>
            <p className="text-gray-700"><strong>Email:</strong> {USER.email}</p>
            <button className="mt-4 btn-secondary text-sm">Edit Profile</button>
          </div>
          
          <div className="bg-white shadow-sm rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Order History</h2>
            {ORDER_HISTORY.length > 0 ? (
              <ul className="space-y-3">
                {ORDER_HISTORY.map((order) => (
                  <li key={order.id} className="text-sm flex justify-between">
                    <span>Order #{order.id} ({order.date})</span>
                    <span className="font-medium">${order.total.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No past orders found.</p>
            )}
            <button className="mt-4 btn-secondary text-sm">View All Orders</button>
          </div>
        </div>
      </div>
    </div>
  );
}
