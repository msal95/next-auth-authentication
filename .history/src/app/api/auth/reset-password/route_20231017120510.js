import User from "@/lib/models/user.model";
import { NextResponse } from "next/server";
import cryptoRandomString from "crypto-random-string";
import Cryptr from "cryptr";
import { render } from "@react-email/render";
import ForgotPasswordEmail from "@/emails/ForgotPasswordEmail";
import { sendEmail } from "@/config/mail";
import { connectToDB } from "@/lib/db/conn";
import bcrypt from "bcrypt";

export async function POST(req) {
  const { email, signature, password, confirmPassword } = await req.json();

  if (password !== confirmPassword) {
    return NextResponse.json(
      { message: "Password does not match" },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const crypter = new Cryptr(process.env.SECRET_KEY);
  const decryptedEmail = crypter.decrypt(email);

  await connectToDB();

  const findUser = await User.findOne({
    email: decryptedEmail,
    password_reset_token: signature,
  });
  console.log("🚀 ~ file: route.js:32 ~ POST ~ findUser:", findUser);
  try {
    if (!findUser) {
      return NextResponse.json({
        status: 400,
        errors: {
          email: "No user found with this Email.",
        },
      });
    }

    return NextResponse.json({
      status: 200,
      message: "Email send Successfully, Pleae check your email.",
    });
  } catch (error) {
    console.log("🚀 ~ file: route.js:57 ~ POST ~ error:", error);
    return NextResponse.json({
      status: 400,
      error: "Email not Send, Due to some Error",
    });
  }
}
