import { connectToDB } from "@/lib/db/conn";
import User from "@/lib/models/user.model";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import cryptoRandomString from "crypto-random-string";
import Cryptr from "cryptr";

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

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    //   Generate a random String
    const randomString = cryptoRandomString({
      length: 64,
      type: "alphanumeric",
    });

    existingUser.verifyToken = randomString;

    //   Encrypt User Email
    const crypter = new Cryptr(process.env.SECRET_KEY);
    const encryptedEmail = crypter.encrypt(existingUser.email);

    const url = `${process.env.APP_URL}/auth/verify-user/${encryptedEmail}?signature=${randomString}`;

    console.log("🚀 ~ file: route.js:44 ~ POST ~ url:", url);

    const html = render(
      ForgotPasswordEmail({
        params: {
          name: existingUser?.fullName,
          url: url,
        },
      })
    );

    // Send Email to User
    const emailSend = await sendEmail(
      payload.email,
      "Verification Email",
      html
    );
    console.log("🚀 ~ file: route.js:52 ~ POST ~ emailSend:", emailSend);

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
