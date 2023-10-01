import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: {
    name: "Credentials",
    credentials: {},
  },
};
