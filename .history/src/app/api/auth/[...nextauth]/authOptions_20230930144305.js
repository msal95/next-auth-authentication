import { connectToDB } from "@/lib/db/conn";
import bcrypt from "bcrypt";
import User from "@/lib/models/user.model";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          await connectToDB();

          const existingUser = await User.findOne({ email });

          if (!existingUser) {
            return NextResponse.json(
              { message: "User Does not exists" },
              { status: 400 }
            );
          }

          const isPassword = await bcrypt.compare(
            password,
            existingUser.password
          );

          if (!isPassword) {
            return res.status(404).json({ message: "Password is incorrect" });
          }

          return existingUser;
        } catch (error) {
          console.log("🚀 ~ file: route.js:43 ~ authorize ~ error:", error);
        }
      },
    }),
  ],
  session: {
    startegy: "jwt",
  },
  secret: process.env.SECRET_KEY,
  pages: {
    signIn: "/sign-in",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
