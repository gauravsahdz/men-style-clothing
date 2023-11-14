import React from "react";
import ProductCard from "./ProductCard";
import Image from "next/image";
import hero from "../public/images/hero.jpg";
import productlist from "../app/api/products.json";

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Carousel Section */}
      <div className="relative">
        <Image
          src={hero}
          alt="carousel image"
          layout="responsive" // Use 'responsive' layout mode
          width={300}
          height={400}
        />
      </div>

      {/* Products Section */}
      <div className="flex-grow">
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Our Products</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {productlist.map((product: any, index: number) => (
              <ProductCard key={index} {...product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
