import { NextResponse } from "next/server";

export async function POST(req) {
  try {
  } catch (error) {
    console.log("🚀 ~ file: route.js:7 ~ POST ~ error:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
