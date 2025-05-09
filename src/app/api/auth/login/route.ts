import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext, DatabaseService } from "@/lib/database";
import bcrypt from "bcryptjs"; // Need to install bcryptjs

export const runtime = "edge"; // Required for Cloudflare Workers

export async function POST(request: NextRequest) {
  const context = getCloudflareContext();

  if (!context) {
    console.error("Cloudflare context not available");
    // For local development without wrangler
    const { email, password } = await request.json();
    
    // Mock login for development
    if (email === "test@example.com" && password === "password123") {
      return NextResponse.json({
        success: true,
        user: {
          id: 1,
          name: "Test User",
          email: "test@example.com"
        }
      });
    } else {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }
  }

  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const dbService = new DatabaseService(context);

    // Get user by email
    const user = await dbService.getUserByEmail(email);
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Return user data (excluding password)
    const { password_hash, ...userWithoutPassword } = user;
    
    // In a real app, you would generate and return a JWT token here
    return NextResponse.json({
      success: true,
      user: userWithoutPassword
    });

  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Failed to authenticate" }, { status: 500 });
  }
}
