"use client";
import React, { useState } from "react";
import LoadingBar from "react-top-loading-bar";
import { ReactNode } from "react";

type LoaderProviderProps = {
  children?: ReactNode;
};

const LoaderProvider = ({ children }: LoaderProviderProps) => {
  const [progress, setProgress] = useState(0);
  return (
    <>
      <LoadingBar
        color="#6875F5"
        height={3}
        shadow={true}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      {children}
    </>
  );
};

export default LoaderProvider;
