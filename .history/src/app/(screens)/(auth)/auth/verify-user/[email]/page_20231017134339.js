"use client";

import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

export default function ResetPassword({ params }) {
  //   console.log("🚀 ~ file: page.js:7 ~ ResetPassword ~ params:", params?.email);
  const searchParams = useSearchParams();
  console.log(
    "🚀 ~ file: page.js:10 ~ ResetPassword ~ searchParams:",
    searchParams
  );

  const [authState, setAuthState] = useState({
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    axios
      .post("/api/auth/verify-user", {
        email: params.email,
        signature: searchParams.get("signature"),
        isVerified: true,
      })
      .then((res) => {
        const response = res.data;

        if (response.status === 200) {
          console.log("🚀 ~ file: page.js:19 ~ .then ~ response:", response);
          setError(response.message);
          setIsLoading(false);
        } else if (response.status === 400) {
          setError(response.error);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log("🚀 ~ file: page.js:15 ~ axios.post ~ error:", error);
        setError(error.error);
        setIsLoading(false);
        return;
      });
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="w-[500px] p-5 rounded-lg shadow-lg">
        <h1 className="font-bold">Forgot Password?</h1>
        <p>Just enter your email below, to recieve reset password Email.</p>
        {!!error?.length && <p>{error}</p>}
        {/* <form>
          <div className="mt-5">
            <label className="block">Password</label>
            <input
              type="password"
              onChange={(e) =>
                setAuthState({ ...authState, password: e.target.value })
              }
              placeholder="password"
              className="w-full h-10 p-2 border rounded-md outline-red-400"
              required
            />
          </div>
          <div className="mt-5">
            <label className="block">Confirm Password</label>
            <input
              type="password"
              onChange={(e) =>
                setAuthState({ ...authState, confirmPassword: e.target.value })
              }
              placeholder="password"
              className="w-full h-10 p-2 border rounded-md outline-red-400"
              required
            />
          </div>

        

          <div className="mt-5">
            <button
              onClick={handleSubmit}
              className="w-full bg-black p-2 rounded-lg text-white"
            >
              {isLoading ? "Processing..." : "Submit"}
            </button>
          </div>
        </form> */}
      </div>
    </div>
  );
}
