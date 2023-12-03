import React, { useEffect, useState } from "react";
import OrdersTable from "./OrderTable";
import Image from "next/image";
import OrderDetail from "@/components/OrderDetail";

const OrderPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [openOrderDetail, setOpenOrderDetail] = useState(false);
  const [orderDetailPass, setOrderDetailPass] = useState("");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };
  

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex items-center justify-between mb-4 mx-4 mt-2">
        <h1 className="text-2xl font-bold">Orders</h1>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mx-4 mb-2">
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => handleTabChange("all")}
        >
          All Orders
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "dispatch" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => handleTabChange("dispatch")}
        >
          Dispatch
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "pending" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => handleTabChange("pending")}
        >
          Pending
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "completed" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => handleTabChange("completed")}
        >
          Completed
        </button>
      </div>

      {/* filter by date range */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4 mx-4 mt-2">
        <div className="relative">
          <input
            type="text"
            placeholder="  Search"
            className="border border-gray-300 rounded-3xl p-2 pr-8 sm:w-64 w-full focus:outline-none mb-2 sm:mb-0"
          />
          <Image
            src="/images/search.svg"
            width={22}
            height={22}
            alt="search_icon"
            className="absolute top-1/2 transform -translate-y-1/2 right-2"
          />
        </div>
        <div className="flex items-center space-x-2 w-full lg:w-1/3">
          <input
            type="date"
            className="border border-gray-200 rounded px-4 py-2"
          />
          <input
            type="date"
            className="border border-gray-200 rounded px-4 py-2"
          />
          <button className="px-4 py-2 rounded bg-blue-500 text-white">
            Filter
          </button>
        </div>
      </div>

      <OrdersTable
        tab={activeTab}
        openOrderDetail={openOrderDetail}
        setOpenOrderDetail={setOpenOrderDetail}
        setOrderDetailPass={setOrderDetailPass}
      />
      <OrderDetail
        open={openOrderDetail}
        setOpenOrderDetail={setOpenOrderDetail}
        orderDetailPass={orderDetailPass}
      />
    </div>
  );
};

export default OrderPage;
