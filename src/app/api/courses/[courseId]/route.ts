import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext, DatabaseService } from "@/lib/database";

export const runtime = "edge"; // Required for Cloudflare Workers

export async function GET(
  request: NextRequest,
  { params }: { params: { courseId: string } }
) {
  const courseId = parseInt(params.courseId);
  const context = getCloudflareContext();

  if (!context) {
    console.error("Cloudflare context not available");
    // Return mock data in non-worker environment for local dev without wrangler
    return NextResponse.json({
      course: {
        id: courseId,
        title: `Course ${courseId} (Mock)`,
        description: "This is a mock course description for local development.",
        price: 175.00,
        image_path: "/images/placeholder-course.jpg",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      modules: [
        {
          id: 1,
          course_id: courseId,
          title: "Module 1: Introduction (Mock)",
          position: 1,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          lessons: [
            {
              id: 1,
              module_id: 1,
              title: "Lesson 1: Getting Started (Mock)",
              content: "<p>This is mock content for local development.</p>",
              position: 1,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
            {
              id: 2,
              module_id: 1,
              title: "Lesson 2: Basic Concepts (Mock)",
              content: "<p>This is mock content for local development.</p>",
              position: 2,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            }
          ]
        }
      ]
    });
  }

  try {
    const dbService = new DatabaseService(context);
    
    // Get course details
    const course = await dbService.getCourseById(courseId);
    
    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }
    
    // Get course modules
    const modules = await dbService.getCourseModules(courseId);
    
    // Get lessons for each module
    const modulesWithLessons = await Promise.all(
      modules.map(async (module) => {
        const lessons = await dbService.getModuleLessons(module.id);
        return { ...module, lessons };
      })
    );
    
    return NextResponse.json({ course, modules: modulesWithLessons });
  } catch (error) {
    console.error(`Error fetching course ${courseId}:`, error);
    return NextResponse.json({ error: "Failed to fetch course details" }, { status: 500 });
  }
}
