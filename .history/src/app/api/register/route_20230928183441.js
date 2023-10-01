import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    return NextResponse.json(
      { data: body, message: "User Created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.log("🚀 ~ file: route.js:7 ~ POST ~ error:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
