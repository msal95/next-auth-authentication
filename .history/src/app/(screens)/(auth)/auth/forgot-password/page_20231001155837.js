import React from "react";

export default function page() {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="w-[500px] p-5 rounded-lg shadow-lg">
        <h1>Forgot Password?</h1>
        <p>Just enter your email below, to recieve reset PASSWORD EMAIL.</p>

        <form>
          <div className="mt-5">
            <label className="block">Email</label>
            <input
              type="email"
              placeholder="email@email.com"
              className="w-full h-10 p-2 border rounded-md outline-red-400"
              required
            />
          </div>
          <div className="mt-5">
            <button className="w-full bg-black p-2 rounded-lg text-white">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
