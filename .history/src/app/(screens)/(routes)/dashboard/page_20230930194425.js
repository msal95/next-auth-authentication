import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import React from "react";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (session === null || session?.user?.role !== "Admin") {
    redirect("/auth/login");
  }
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="bg-purple-400 text-3xl font-bold p-4 rounded-md mb-3">
        Admin Dashboard
      </h1>
      {JSON.stringify(session)}
      <Signout />
    </div>
  );
}
