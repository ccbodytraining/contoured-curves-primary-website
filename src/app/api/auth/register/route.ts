import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext, DatabaseService } from "@/lib/database";
import bcrypt from "bcryptjs"; // Need to install bcryptjs

export const runtime = "edge"; // Required for Cloudflare Workers

export async function POST(request: NextRequest) {
  const context = getCloudflareContext();

  if (!context) {
    console.error("Cloudflare context not available");
    return NextResponse.json({ error: "Database context not available" }, { status: 500 });
  }

  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const dbService = new DatabaseService(context);

    // Check if user already exists
    const existingUser = await dbService.getUserByEmail(email);
    if (existingUser) {
      return NextResponse.json({ error: "Email already in use" }, { status: 409 });
    }

    // Hash the password
    // Note: bcryptjs might be slow in edge runtime, consider alternatives if performance is critical
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create user
    const userId = await dbService.createUser(name, email, passwordHash);

    if (!userId) {
      throw new Error("Failed to create user");
    }

    // Return success (consider returning a JWT token here in a real app)
    return NextResponse.json({ success: true, userId });

  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Failed to register user" }, { status: 500 });
  }
}
