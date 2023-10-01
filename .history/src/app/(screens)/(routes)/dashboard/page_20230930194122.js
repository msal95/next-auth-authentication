import React from "react";

export default async function Dashboard() {
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
