import User from "@/lib/models/user.model";
import { NextResponse } from "next/server";
import cryptoRandomString from "crypto-random-string";

export async function POST(req) {
  const payload = await req.json();

  const findUser = await User.findOne({ email: payload.email });

  if (!findUser) {
    return NextResponse.json({
      status: 400,
      errors: {
        email: "No user found with this Email.",
      },
    });
  }
}
