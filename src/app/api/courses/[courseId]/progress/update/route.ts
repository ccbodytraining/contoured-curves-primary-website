import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext, DatabaseService } from "@/lib/database";

export const runtime = "edge"; // Required for Cloudflare Workers

export async function POST(
  request: NextRequest,
  { params }: { params: { courseId: string } }
) {
  const courseId = parseInt(params.courseId);
  const { userId, lessonId, completed } = await request.json();
  
  if (!userId || !lessonId) {
    return NextResponse.json({ error: "User ID and Lesson ID are required" }, { status: 400 });
  }

  const context = getCloudflareContext();

  if (!context) {
    console.error("Cloudflare context not available");
    // For local development without wrangler
    return NextResponse.json({
      success: true,
      message: "Progress updated successfully (mock)"
    });
  }

  try {
    const dbService = new DatabaseService(context);
    
    // Update lesson progress
    await dbService.updateLessonProgress(userId, lessonId, completed);
    
    // Check if all lessons in the course are completed
    const progress = await dbService.getUserProgress(userId, courseId);
    const allLessons = await dbService.getAllCourseLessons(courseId);
    
    const allCompleted = allLessons.length > 0 && 
      progress.filter(p => p.completed).length === allLessons.length;
    
    // If all lessons are completed, issue a certificate
    if (allCompleted) {
      const certificateNumber = await dbService.issueCertificate(userId, courseId);
      return NextResponse.json({
        success: true,
        allCompleted: true,
        certificateNumber
      });
    }
    
    return NextResponse.json({
      success: true,
      allCompleted: false
    });
    
  } catch (error) {
    console.error(`Error updating progress for lesson in course ${courseId}:`, error);
    return NextResponse.json({ error: "Failed to update progress" }, { status: 500 });
  }
}
