"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import UserList from "@/app/api/users.json";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSignIn = () => {
    const user = UserList.find((user) => user.email === email);
    if (!user) {
      return alert("User not found");
    }
    if (user.email !== email) {
      return alert("Email is incorrect");
    }
    if (user.password !== password) {
      return alert("Password is incorrect");
    }
    router.push(user.role === "admin" ? "/admin/dashboard" : "/");
  };

  const handleGoogleSignIn = () => {
    signIn("google");
  };


  return (
    <div className="min-h-screen flex items-center justify-center flex-col bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign In
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                onClick={handleSignIn}
                className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
              >
                Sign In
              </button>
            </div>
          </div>
          <div>
            <div className="mb-6">
              <button
                onClick={handleGoogleSignIn}
                className="flex items-center justify-center w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 hover:bg-gray-50"
              >
                <Image
                  src="/images/google_logo.png"
                  width={20}
                  height={20}
                  alt="google_logo"
                  className="mr-2"
                />
                <span>Sign in with Google</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
