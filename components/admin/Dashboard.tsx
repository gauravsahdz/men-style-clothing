"use client";
import Image from "next/image";
import React from "react";
import { Line, Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import LineGraph from "./LineGraph";
import PieChart from "./PieChart";
Chart.register(...registerables);
import "@/styles/components/_dashboard.css";

const Dashboard = () => {
  const cardData = [
    {
      title: "Total Sales",
      icon: "/images/sales.svg",
      value: "$1000",
    },
    {
      title: "Total Orders",
      icon: "/images/orders.svg",
      value: "50",
    },
    {
      title: "Total Customers",
      icon: "/images/customers.svg",
      value: "20",
    },
    {
      title: "Product Returns",
      icon: "/images/return.svg",
      value: "5",
    },
  ];

  const tableData = [
    {
      name: "Product 1",
      quantity: "10",
      sales: "$100",
    },
    {
      name: "Product 2",
      quantity: "8",
      sales: "$80",
    },
    {
      name: "Product 3",
      quantity: "6",
      sales: "$60",
    },
    {
      name: "Product 4",
      quantity: "10",
      sales: "$100",
    },
    {
      name: "Product 5",
      quantity: "8",
      sales: "$80",
    },
    {
      name: "Product 6",
      quantity: "6",
      sales: "$60",
    },
  ];

  const tableData2 = [
    {
      name: "Product 1",
      rating: "4.5",
      review: "Great product!",
    },
    {
      name: "Product 2",
      rating: "3.5",
      review: "Not bad.",
    },
    {
      name: "Product 3",
      rating: "5",
      review: "Amazing!",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center w-full p-4">
      {/* Welcome user section  */}
      <div className="w-full bg-white shadow-lg rounded-md">
        <div className="flex justify-between items-center p-4">
          <h1 className="text-lg font-bold sm:text-2xl">Welcome, User</h1>
          <div className="flex items-center justify-center">
            <div className="relative">
              <input
                type="text"
                placeholder="  Search"
                className="border border-gray-300 rounded-3xl p-2 pr-8 sm:w-64 w-48 focus:outline-none"
              />
              <Image
                src="/images/search.svg"
                width={22}
                height={22}
                alt="search_icon"
                className="absolute top-1/2 transform -translate-y-1/2 right-2"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-center w-full p-4">
          {cardData.map((data, index) => (
            <div key={index} className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 p-2">
              <div className="flex items-center justify-center bg-gray-100 rounded-md p-4">
                <Image
                  src={data.icon}
                  alt={data.title}
                  width={50}
                  height={50}
                />
                <div className="ml-4">
                  <div className="text-sm">{data.title}</div>
                  <div className="text-lg font-bold">{data.value}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap justify-between w-full pt-4">
        {/* sales graph section  */}
        <div className=" w-full sm:w-1/2 md:w-1/2 lg:w-2/3 p-4 shadow-lg bg-white mb-4">
          <h1 className="text-lg font-bold mb-2">Sales Overview</h1>
          <LineGraph />
        </div>

        {/* Pie chart section */}
        <div className=" w-full sm:w-1/2 md:w-1/2 lg:w-1/3 p-4 bg-white shadow-lg mb-4">
          <h1 className="text-lg font-bold mb-2">Order Status</h1>
          <PieChart />
        </div>
      </div>

      <div className="flex flex-wrap w-full pt-2 justify-between">
        {/* Top selling products section */}
        <div className=" w-full sm:w-1/2 md:w-1/2 lg:w-1/2 p-2 shadow-lg bg-white rounded-md mb-4">
          <h1 className="text-lg font-bold">Top Selling Products</h1>
          <div className="h-full overflow-auto">
            <table className="w-full table-auto">
              <thead className="border-b border-gray-300">
                <tr className="text-gray-500 text-sm font-bold">
                  <th className="text-left py-2">Name</th>
                  <th className="text-left py-2">Quantity</th>
                  <th className="text-left py-2">Sales</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {tableData.map((data, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-300 hover:bg-gray-100"
                  >
                    <td className="py-2">{data.name}</td>
                    <td className="py-2">{data.quantity}</td>
                    <td className="py-2">{data.sales}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* customer review section  */}
        <div className=" w-full sm:w-1/2 md:w-1/2 lg:w-1/2 p-2 shadow-lg bg-white rounded-md mb-4">
          <h1 className="text-lg font-bold mb-4">Customer Reviews</h1>
          <div title="Customer Reviews" className="h-full">
            {tableData2.map((data, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-4 border-b border-gray-300"
              >
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-gray-300 mr-4"></div>
                  <div>
                    <div className="font-bold text-lg">{data.name}</div>
                    <div className="text-sm text-gray-500">
                      {data.rating} stars
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-500">{data.review}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
