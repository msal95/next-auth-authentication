import { connectToDB } from "@/lib/db/conn";
import bcrypt from "bcrypt";
import User from "@/lib/models/user.model";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextResponse } from "next/server";
import { authOptions } from "./authOptions";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
