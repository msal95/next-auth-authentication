import { connectToDB } from "@/lib/db/conn";
import User from "@/lib/models/user.model";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    const hashedPassword = await bcrypt.hash(password, 12);

    await connectToDB();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const response = await User.create({
      fullName: name,
      userName,
      email,
      password: hashedPassword,
    });

    return NextResponse.json(
      { data: response, message: "User Created successfully", status: 201 },
      { status: 201 }
    );
  } catch (error) {
    console.log("🚀 ~ file: route.js:7 ~ POST ~ error:", error);
    return NextResponse.json({ errors: error.message }, { status: 500 });
  }
}
