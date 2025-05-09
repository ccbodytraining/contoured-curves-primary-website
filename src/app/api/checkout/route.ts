import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext, DatabaseService } from "@/lib/database";

export const runtime = "edge"; // Required for Cloudflare Workers

export async function POST(request: NextRequest) {
  const context = getCloudflareContext();

  if (!context) {
    console.error("Cloudflare context not available");
    // For local development without wrangler
    return NextResponse.json({
      success: true,
      orderId: Math.floor(Math.random() * 1000) + 1,
      message: "Order created successfully (mock)"
    });
  }

  try {
    const { userId, items, total, discountCode } = await request.json();

    if (!userId || !items || !total || items.length === 0) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const dbService = new DatabaseService(context);

    // Create order
    const orderId = await dbService.createOrder(userId, total);

    if (!orderId) {
      throw new Error("Failed to create order");
    }

    // Add order items
    for (const item of items) {
      await dbService.addOrderItem(orderId, item.id, item.price);
    }

    // Complete order (in a real app, this would happen after payment confirmation)
    await dbService.completeOrder(orderId);

    // Enroll user in courses
    for (const item of items) {
      await dbService.enrollUserInCourse(userId, item.id);
    }

    return NextResponse.json({
      success: true,
      orderId,
      message: "Order created successfully"
    });

  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json({ error: "Failed to process checkout" }, { status: 500 });
  }
}
