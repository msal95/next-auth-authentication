import User from "@/lib/models/user.model";
import { NextResponse } from "next/server";
import cryptoRandomString from "crypto-random-string";
import Cryptr from "cryptr";
import { render } from "@react-email/render";
import ForgotPasswordEmail from "@/emails/ForgotPasswordEmail";
import { sendEmail } from "@/config/mail";
import { connectToDB } from "@/lib/db/conn";

export async function POST(req) {
  const payload = await req.json();

  await connectToDB();

  const findUser = await User.findOne({ email: payload.email });

  if (!findUser) {
    return NextResponse.json({
      status: 400,
      errors: {
        email: "No user found with this Email.",
      },
    });
  }

  //   Generate a random String
  const randomString = cryptoRandomString({ length: 64, type: "alphanumeric" });

  findUser.password_reset_token = randomString;

  await findUser.save();

  //   Encrypt User Email
  const crypter = new Cryptr(process.env.SECRET_KEY);
  const encryptedEmail = crypter.encrypt(findUser.email);

  const url = `${process.env.APP_URL}/reset-password/${encryptedEmail}?signature=${randomString}`;

  try {
    const html = render(
      ForgotPasswordEmail({
        params: {
          name: findUser?.name,
          url: url,
        },
      })
    );

    // Send Email to User
    await sendEmail(payload.email, "Reset Password", html);

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
