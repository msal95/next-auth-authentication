"use client";

import React, { useState } from "react";

export default function Page() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .post("/api/auth/forgot-password", { email: email })
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

        <form>
          <div className="mt-5">
            <label className="block">Email</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@email.com"
              className="w-full h-10 p-2 border rounded-md outline-red-400"
              required
            />
          </div>

          {!!error?.length && <p>{error}</p>}

          <div className="mt-5">
            <button
              onClick={handleSubmit}
              className="w-full bg-black p-2 rounded-lg text-white"
            >
              {isLoading ? "Processing..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
