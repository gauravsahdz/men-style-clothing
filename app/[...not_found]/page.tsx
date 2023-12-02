"use client";
import { useRouter } from "next/navigation";
import React from "react";

const PageNotFound = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800">404</h1>
      <p className="text-lg text-gray-800">Page not found</p>
      <button
        className="px-4 py-2 mt-8 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        onClick={() => router.push("/")}
      >
        Go back home
      </button>
    </div>
  );
};

export default PageNotFound;
