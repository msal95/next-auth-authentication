import Signout from "@/components/signout";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="bg-purple-400 text-3xl font-bold p-4 rounded-md mb-3">
        Home Screen
      </h1>
      <Signout />
    </div>
  );
}
