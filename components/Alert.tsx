import React, { useEffect, useState } from "react";

type AlertProps = {
  type: "success" | "error";
  message: string;
  show: boolean;
  key: number; // added prop
};

const Alert = ({ type, message, show, key }: AlertProps) => {
  useEffect(() => {
    setTimeout(() => {
      const alert = document.querySelector(
        '[data-dismissible="alert"]'
      ) as HTMLElement;
      alert.style.opacity = "0";
    }, 3000);
  }, []);

  return (
    <div
      className={
        show
          ? `font-regular absolute bottom-5 right-2 rounded-lg p-4 text-base leading-5 text-white ${
              type === "success" ? "bg-green-500" : "bg-red-500"
            } opacity-100`
          : `font-regular absolute bottom-5 right-2 rounded-lg p-4 text-base leading-5 text-white ${
              type === "success" ? "bg-green-500" : "bg-red-500"
            } opacity-0`
      }
      data-dismissible="alert"
      style={{ position: "fixed" }} // added style
      key={key} // added key
    >
      <div className="mr-12">{message}</div>
      <div
        className="absolute top-2.5 right-3 w-max rounded-lg transition-all hover:bg-white hover:bg-opacity-20"
        data-dismissible-target="alert"
      >
        <button
          role="button"
          className="w-max rounded-lg p-1"
          onClick={() => {
            const alert = document.querySelector(
              '[data-dismissible="alert"]'
            ) as HTMLElement;
            alert.style.opacity = "0";
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2" // changed attribute name to camelCase
          >
            <path
              strokeLinecap="round" // changed attribute name to camelCase
              strokeLinejoin="round" // changed attribute name to camelCase
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Alert;
