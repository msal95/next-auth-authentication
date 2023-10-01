import { connectToDB } from "@/lib/db/conn";
import User from "@/lib/models/user.model";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { email, password } = await req.json();

  try {
    await connectToDB();

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return NextResponse.json(
        { message: "User Does not exists" },
        { status: 400 }
      );
    }

    const isPassword = await bcrypt.compare(password, existingUser.password);

    if (!isPassword) {
      return res.status(404).json({ message: "Password is incorrect" });
    }

    return NextResponse.json({
      data: existingUser,
      status: 200,
      message: "User Logged in",
    });
  } catch (errro) {
    console.log("🚀 ~ file: route.js:12 ~ POST ~ errro:", errro);
  }
}
