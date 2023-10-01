import { connectToDB } from "@/lib/db/conn";
import User from "@/lib/models/user.model";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { name, userName, email, password, confirm_password } =
      await req.json();

    if (password !== confirm_password) {
      return NextResponse.json(
        { message: "Password does not match" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await connectToDB();

    const existingUser = await User.findOne({ email });
    console.log("🚀 ~ file: route.js:23 ~ POST ~ existingUser:", existingUser);

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
    console.log("🚀 ~ file: route.js:38 ~ POST ~ response:", response);

    return NextResponse.json(
      { data: response, message: "User Created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.log("🚀 ~ file: route.js:7 ~ POST ~ error:", error);
    return NextResponse.json({ errors: error.message }, { status: 500 });
  }
}
