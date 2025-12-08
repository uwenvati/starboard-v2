import { NextResponse } from "next/server";
import { sanityTest } from "@/lib/sanity";

export async function GET() {
  try {
    const docs = await sanityTest();
    return NextResponse.json({ success: true, docs });
  } catch (error) {
    console.error("Sanity test error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to connect to Sanity" },
      { status: 500 }
    );
  }
}
