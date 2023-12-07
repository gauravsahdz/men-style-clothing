"use client";
import InfoTable from "@/components/Table";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import products from "@/app/api/products.json";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Modal from "@/components/Modal";
import Image from "next/image";

const Page = () => {
  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState("");
  const [action, setAction] = useState("");
  const [productList, setProductList] = useState(products);

  const router = useRouter();
  const addRoute = () => {
    router.push(`/admin/products/add`);
  };

  const deleteModal = (id: string) => {
    setOpenModal(true);
    setAction(`Delete`);
    setMessage("Are you sure you want to delete this product?");
  };

  const columns = [
    { field: "thumbnail", label: "Thumbnail" },
    { field: "title", label: "Name" },
    { field: "description", label: "Description" },
    { field: "price", label: "Price" },
    { field: "stock", label: "Stock" },
    { field: "discount", label: "Discount" },
    { field: "sizes", label: "Sizes" },
    { field: "brand", label: "Brand" },
    { field: "category", label: "Category" },
  ];

  const actions = [
    {
      icon: faEdit,
      color: "text-indigo-500",
      size: "lg",
      tooltip: "Edit",
      func: (id: string) => {
        router.push(`/admin/products/${id}`);
      },
    },
    {
      icon: faTrash,
      color: "text-red-500",
      size: "lg",
      tooltip: "Delete",
      func: (id: string) => {
        deleteModal(id);
      },
    },
  ];

  const searchProduct = (value: string) => {
    const filteredProduct = products.filter((product) => {
      return (
        product.title.toLowerCase().includes(value.toLowerCase()) ||
        product.brand.toLowerCase().includes(value.toLowerCase()) ||
        product.category.toLowerCase().includes(value.toLowerCase())
      );
    });
    setProductList(filteredProduct);
  };

  return (
    <div className="p-4">
      <Modal
        show={openModal}
        message={message}
        action={action}
        setOpenModal={setOpenModal}
      />
      <div className="flex items-center justify-between mb-4 mx-3 lg:mx-8 md:mx-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="  Search"
            className="border border-gray-300 rounded-3xl p-2 pr-8 sm:w-64 w-full focus:outline-none mb-2 sm:mb-0"
            onChange={(e) => searchProduct(e.target.value)}
          />
          <Image
            src="/images/search.svg"
            width={22}
            height={22}
            alt="search_icon"
            className="absolute top-1/2 transform -translate-y-1/2 right-2"
          />
        </div>
        <button
          className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-4"
          onClick={addRoute}
        >
          Add Product
        </button>
      </div>
      <InfoTable columns={columns} dataList={productList} actions={actions} />
    </div>
  );
};

export default Page;
