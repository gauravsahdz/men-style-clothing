"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { data: session } = useSession();

  const handleSignIn = () => {
    router.push("/admin/dashboard");
  };

  const handleGoogleSignIn = () => {
    signIn("google");
  };

  const handleAdminClick = () => {
    setIsAdmin(true);
  };

  const handleBackClick = () => {
    setIsAdmin(false);
  };

  useEffect(() => {
    if (session?.user) {
      router.push("/");
    }
  }, [session]);

  return (
    <div className="h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {isAdmin ? (
          <>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Admin Sign In
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{" "}
              <button
                onClick={handleGoogleSignIn}
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Sign in with Google
              </button>
            </p>{" "}
          </>
        ) : (
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign In
          </h2>
        )}
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {isAdmin ? (
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
                  onClick={handleBackClick}
                  className="inline-block align-baseline font-bold text-sm text-indigo-500 hover:text-indigo-800"
                >
                  Back
                </button>
                <button
                  onClick={handleSignIn}
                  className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Sign In
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="mb-6">
                <button
                  onClick={handleAdminClick}
                  className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                >
                  Are you admin?
                </button>
              </div>
              <div className="mb-6">
                <button
                  onClick={handleGoogleSignIn}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                >
                  Sign in with Google
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
