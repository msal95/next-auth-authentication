import Signout from "@/components/signout";
import React from "react";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="bg-purple-400 text-3xl font-bold p-4 rounded-md">
        Home Screen
      </h1>
      <Signout />
    </div>
  );
}
