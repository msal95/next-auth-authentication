"use client";

import { signOut } from "next-auth/react";
import React from "react";

export default function Signout() {
  return (
    <div>
      <button
        onClick={() => signOut()}
        className="bg-orange-300 rounded-xl p-3"
      >
        Logout
      </button>
    </div>
  );
}
