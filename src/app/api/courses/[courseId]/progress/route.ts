import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext, DatabaseService } from "@/lib/database";

export const runtime = "edge"; // Required for Cloudflare Workers

export async function GET(
  request: NextRequest,
  { params }: { params: { courseId: string } }
) {
  const courseId = parseInt(params.courseId);
  const userId = parseInt(request.nextUrl.searchParams.get('userId') || '0');
  
  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  const context = getCloudflareContext();

  if (!context) {
    console.error("Cloudflare context not available");
    // Return mock data for local development
    return NextResponse.json({
      enrolled: true,
      progress: 35,
      lessons: [
        { id: 1, title: "Lesson 1", completed: true },
        { id: 2, title: "Lesson 2", completed: true },
        { id: 3, title: "Lesson 3", completed: false },
        { id: 4, title: "Lesson 4", completed: false }
      ]
    });
  }

  try {
    const dbService = new DatabaseService(context);
    
    // Check if user is enrolled in the course
    const enrollments = await dbService.getUserEnrollments(userId);
    const isEnrolled = enrollments.some(enrollment => enrollment.course_id === courseId);
    
    if (!isEnrolled) {
      return NextResponse.json({ enrolled: false }, { status: 200 });
    }
    
    // Get user progress for this course
    const progress = await dbService.getUserProgress(userId, courseId);
    
    // Calculate overall progress percentage
    // This would need to be calculated based on total lessons in the course
    // For now, we'll use a mock calculation
    const progressPercentage = progress.length > 0 
      ? Math.round((progress.filter(p => p.completed).length / progress.length) * 100) 
      : 0;
    
    return NextResponse.json({
      enrolled: true,
      progress: progressPercentage,
      lessons: progress
    });
    
  } catch (error) {
    console.error(`Error fetching user progress for course ${courseId}:`, error);
    return NextResponse.json({ error: "Failed to fetch progress" }, { status: 500 });
  }
}
