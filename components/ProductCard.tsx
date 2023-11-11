"use client";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import { Product } from "@/types/product";

const ProductCard = ({
  id,
  thumbnail,
  title,
  price,
  discountPercentage,
  sizes,
}: Product) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/productDetail/${id}`);
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md hover:cursor-pointer hover:shadow-lg transition duration-300 ease-in-out"
      onClick={handleClick}
    >
      <div className="p-4">
        <Image
          src={thumbnail}
          alt={title}
          width={300}
          height={400}
          layout="responsive"
          // className="hover:transform hover:scale-110 transition duration-300 ease-in-out"
        />
      </div>
      <div className="p-4">
        <h3 className="uppercase tracking-wide text-lg font-semibold text-gray-800">
          {title}
        </h3>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-sm font-medium text-gray-900">${price}</span>
          {discountPercentage && (
            <span className="text-sm font-medium text-gray-500">
              {discountPercentage}% off
            </span>
          )}
        </div>
        <div className="mt-2 flex items-center text-sm font-medium text-gray-500">
          <span className="mr-2">Sizes:</span>
          {sizes.map((size) => (
            <span key={size} className="mr-1">
              {size}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
