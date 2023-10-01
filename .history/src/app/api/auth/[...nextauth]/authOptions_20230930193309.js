import { connectToDB } from "@/lib/db/conn";
import User from "@/lib/models/user.model";
import { generateUsername } from "@/utils/utils";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import User from ("next-auth").

export const authOptions = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      try {
        await connectToDB();

        const findUser = await User.findOne({ email: user.email });

        if (findUser) {
          return true;
        }

        const userName = generateUsername(user.name);

        const newUser = await User.create({
          fullName: user.name,
          userName: userName,
          email: user.email,
        });
        console.log(
          "🚀 ~ file: authOptions.js:30 ~ signIn ~ newUser:",
          newUser
        );

        return true;
      } catch (error) {
        console.log("🚀 ~ file: authOptions.js:16 ~ signIn ~ error:", error);
        return false;
      }
    },

    async jwt({ token, user }) {
      if (user) {
        user.role = user?.role === null ? "User" : user?.role;

        user.token = user;
      }
      return token;
    },

    async session({ session, user, token }) {
      session.user = token.user as User;
      return session;
    },
  },

  secret: process.env.SECRET_KEY,

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        await connectToDB();

        const user = await User.findOne({ email: credentials.email });

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),

    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
};
