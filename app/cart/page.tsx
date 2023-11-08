"use client";
import Image from "next/image";
import React, { useState, useEffect, useReducer } from "react";
import { useCartStore } from "@/reducers/useCartStore";
import { Product } from "@/types/product";

type CartItemProps = {
  item: Product;
  onIncrement: () => void;
  onDecrement: () => void;
};

const CartItem: React.FC<CartItemProps> = ({
  item,
  onIncrement,
  onDecrement,
}) => {
  const { title, thumbnail, price, sizes, quantity } = item;
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  return (
    <div className="flex items-center space-x-4 mb-4">
      <Image src={thumbnail} alt="product image" width={100} height={100} />
      <div className="flex-grow">
        <p className="text-lg font-semibold">{title}</p>
        <p className="text-gray-600">Size: {sizes}</p>
        <p className="text-gray-600">${price} each</p>
      </div>
      <button onClick={() => removeFromCart(item)} className="text-gray-500">
        Remove
      </button>
      <div className="flex items-center space-x-2 rounded-md border border-gray-300 px-4 py-2">
        <button onClick={onDecrement} className="text-gray-500">
          -
        </button>
        <span>{quantity}</span>
        <button onClick={onIncrement} className="text-gray-500">
          +
        </button>
      </div>
    </div>
  );
};

const Page = () => {
  const cart = useCartStore((state) => state.cart);
  const incrementQuantity = useCartStore((state) => state.incrementQuantity);

  const decrementQuantity = useCartStore((state) => state.decrementQuantity);

  const getTotalPrice = () => {
    return cart.reduce(
      (acc, product) => acc + product.price * (product.quantity as number),
      0
    );
  };

  const handleIncrement = (product: Product) => {
    incrementQuantity(product);
  };

  const handleDecrement = (product: Product) => {
    decrementQuantity(product);
  };

  return (
    <div className="container mx-auto p-10">
      {cart.length === 0 ? (
        <h1>Your Cart is Empty!</h1>
      ) : (
        <div>
          <h1 className="text-2xl font-bold mb-4">Cart</h1>
          {cart.map((product) => (
            <CartItem
              key={product.id}
              item={product}
              onIncrement={() => handleIncrement(product)} // Pass a function here
              onDecrement={() => handleDecrement(product)} // Pass a function here
            />
          ))}
          <div className="flex justify-between items-center">
            <div className="flex-grow">
              <p className="text-lg font-semibold">Total Price:</p>
            </div>
            <div className="text-xl font-semibold">${getTotalPrice()}</div>
            <button className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-4">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
