import { NextRequest, NextResponse } from "next/server";
import { DatabaseService } from "@/lib/database";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    const dbService = new DatabaseService();
    const courses = await dbService.getAllCourses();
    return NextResponse.json({ courses });
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 });
  }
}
