"use client";
import React from "react";
import { useParams } from "next/navigation";
import ProductForm from "@/components/ProductForm";

const Page = () => {
  const { id } = useParams<{ id: string }>(); // Get the id from the URL

  return <ProductForm id={id} task="Update" />;
};
export default Page;
