"use client";
import { useCartStore } from "@/reducers/useCartStore";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";
import { Product } from "@/types/product";
import productList from "@/app/api/products.json";
import Alert from "@/components/Alert";
import "@/styles/components/_productDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const [key, setKey] = React.useState(0);
  const [showAlert, setShowAlert] = React.useState(false);

  const addToCart = useCartStore((state) => state.addToCart);

  const product = productList.find((product) => product.id === id);

  if (!product) {
    return null;
  }

  const {
    title,
    thumbnail,
    price,
    sizes,
    description,
    discountPercentage,
    quantity,
    images,
  } = product;

  const handleAddToCart = () => {
    setKey((prevKey) => prevKey + 1);
    addToCart(product as Product);
    setShowAlert(true);
  };

  const handleBuyNow = () => {
    alert("not implemented");
  };

  return (
    <div className="product_detail_container flex flex-col items-center justify-center w-full px-4 lg:px-0">
      <Alert
        type="success"
        message="Product added to cart"
        show={showAlert}
        key={key}
      />
      <div className="flex flex-col lg:flex-row items-center justify-center space-y-4 lg:space-y-0 lg:space-x-4 md:px-8 lg:px-16 lg:py-16 bg-white">
        <Image src={thumbnail} alt={title} width={300} height={300} />
        <div className="flex flex-col justify-center items-start space-y-4 w-full lg:w-1/2 px-4 lg:px-0 lg:py-8 md:py-8 lg:py-0">
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-gray-600 text-justify">{description}</p>
          <p className="text-gray-600 font-semibold uppercase tracking-wide text-sm">
            Available sizes: {sizes.join(", ")}
          </p>
          <p className="text-gray-600">Price: ${price}</p>
          {discountPercentage && (
            <p className="text-gray-600">Discount: {discountPercentage}%</p>
          )}
          <div className="flex space-x-4 justify-center">
            <button
              onClick={handleAddToCart}
              className="bg-black text-white px-4 py-2 rounded-md border border-black hover:bg-white hover:text-black transition duration-500"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="bg-white text-black px-4 py-2 rounded-md border border-black transition duration-500 hover:bg-gray-200"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center md:px-8 lg:px-16 py-8 lg:py-16 bg-white">
        <h1 className="text-2xl font-bold">More Images</h1>
        <div className="flex flex-wrap justify-center items-center space-x-4">
          {images.map((image, index) => (
            <Image
              key={index}
              src={image}
              alt={title}
              width={100}
              height={100}
              className="rounded-md"
            />
          ))}
        </div>
      </div>

      {/* similar products  */}
      <div className="flex flex-col items-center justify-center md:px-8 lg:px-16 lg:py-16 bg-white">
        <h1 className="text-2xl font-bold">Similar Products</h1>
        <div className="flex flex-wrap justify-center items-center space-x-4">
          {productList.map((product, index) => (
            <Image
              key={index}
              src={product.thumbnail}
              alt={product.title}
              width={100}
              height={100}
              className="rounded-md"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
