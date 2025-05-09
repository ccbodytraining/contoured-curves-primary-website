import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext, DatabaseService, Course } from "@/lib/database";

export const runtime = "edge"; // Required for Cloudflare Workers

export async function GET(request: NextRequest) {
  const context = getCloudflareContext();

  if (!context) {
    console.error("Cloudflare context not available");
    // Return mock data in non-worker environment for local dev without wrangler
    const mockCourses: Course[] = [
      {
        id: 1,
        title: "Body Contouring Specialist (Mock)",
        description: "In-depth body contouring specialist course covers the lymphatic system, skin anatomy, fat types, treatment order, and more.",
        price: 175.00,
        image_path: "/images/placeholder-course.jpg",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: 2,
        title: "Virtual Mesotherapy (Mock)",
        description: "Learn to administer body contouring serums virtually with this comprehensive course.",
        price: 125.00,
        image_path: "/images/placeholder-course.jpg",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      // Add more mock courses if needed
    ];
    return NextResponse.json({ courses: mockCourses });
    // Or throw an error:
    // return NextResponse.json({ error: "Database context not available" }, { status: 500 });
  }

  try {
    const dbService = new DatabaseService(context);
    const courses = await dbService.getAllCourses();
    return NextResponse.json({ courses });
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 });
  }
}
