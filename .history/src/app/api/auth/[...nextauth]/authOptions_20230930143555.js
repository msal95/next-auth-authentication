import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: {
    name: "Credentials",
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
  },
};
