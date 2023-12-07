"use client";
import React from "react";
import { useParams } from "next/navigation";
import ProductForm from "@/components/ProductForm";

type props = {
  id: string;
};
const EditProduct = ({ id }: props) => {
  return <ProductForm id={id} task="Update" />;
};

export default EditProduct;
