"use client";
import React, { useState } from "react";
import orderList from "@/app/api/orders.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faSort,
  faSortDown,
  faSortUp,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal";
import "@/styles/components/_productTable.css";

type columnsProps = {
  field: string;
  label: string;
  sortField: string;
  sortOrder: string;
  handleSort: (field: string) => void;
};

const TableHeader = ({
  field,
  label,
  sortField,
  sortOrder,
  handleSort,
}: columnsProps) => (
  <th
    scope="col"
    className="table_header px-6 py-3 text-left text-xs font-large text-gray-500 uppercase tracking-wider cursor-pointer"
    onClick={() => handleSort(field)}
  >
    {label}
    {sortField === field && sortOrder === "asc" && (
      <FontAwesomeIcon icon={faSortUp} className="ml-1" />
    )}
    {sortField === field && sortOrder === "desc" && (
      <FontAwesomeIcon icon={faSortDown} className="ml-1" />
    )}
    {sortField !== field && <FontAwesomeIcon icon={faSort} className="ml-1" />}
  </th>
);

const OrdersTable = () => {
  const router = useRouter();
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState("");
  const [action, setAction] = useState("");

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const sortedOrders = orderList.sort((a, b) => {
    if (sortField === "name") {
      return sortOrder === "asc"
        ? a.user.name.localeCompare(b.user.name)
        : b.user.name.localeCompare(a.user.name);
    } else {
      return 0;
    }
  });

  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const pageCount = Math.ceil(sortedOrders.length / pageSize);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentOrders = sortedOrders.slice(startIndex, endIndex);

  return (
    <div className="flex flex-col mb-4 mt-8 w-full p-4">
      <Modal
        show={openModal}
        message={message}
        action={action}
        setOpenModal={setOpenModal}
      />
      <div className="flex items-center justify-between mb-4 mx-3 lg:mx-8 md:mx-6">
        <h1 className="text-2xl font-bold">Orders</h1>
      </div>

      <div className="-my-2 overflow-x-auto">
        <div className="py-2 align-middle inline-block min-w-full">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <div style={{ overflowX: "auto" }}>
              <table className="min-w-full divide-y divide-gray-200 lg:table sm:table">
                <thead className="bg-gray-50">
                  <tr>
                    <TableHeader
                      field="thumbnail"
                      label="Order Id"
                      sortField={sortField}
                      sortOrder={sortOrder}
                      handleSort={handleSort}
                    />
                    <TableHeader
                      field="name"
                      label="Name"
                      sortField={sortField}
                      sortOrder={sortOrder}
                      handleSort={handleSort}
                    />
                    <TableHeader
                      field="stock"
                      label="Address"
                      sortField={sortField}
                      sortOrder={sortOrder}
                      handleSort={handleSort}
                    />
                    <TableHeader
                      field="discount"
                      label="Date"
                      sortField={sortField}
                      sortOrder={sortOrder}
                      handleSort={handleSort}
                    />
                    <th
                      scope="col"
                      className="table_header px-6 py-3 text-left text-xs font-large text-gray-500 uppercase tracking-wider"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className=" table_header px-6 py-3 text-left text-xs font-large text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className=" table_header px-6 py-3 text-left text-xs font-large text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentOrders.map((order) => (
                    <tr key={order.id}>
                      <td className="px-6 py-4 whitespace-nowrap lg:table-cell sm:table-cell">
                        {order.id}
                      </td>
                      <td className="flex flex-row items-center px-6 py-4 whitespace-nowrap">
                        <Image
                          src={order.user.profilePic}
                          alt={order.user.name}
                          className="h-8 w-8 rounded-full object-cover"
                          width={100}
                          height={100}
                        />
                        <span className="ml-2 text-sm font-medium text-gray-900">
                          {order.user.name}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap lg:table-cell sm:table-cell">
                        {order.address}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap lg:table-cell sm:table-cell">
                        {order.orderDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap lg:table-cell sm:table-cell">
                        ${order.orderTotal}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap lg:table-cell sm:table-cell">
                        {order.orderStatus === "processing" && (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            {order.orderStatus}
                          </span>
                        )}
                        {order.orderStatus === "delivered" && (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {order.orderStatus}
                          </span>
                        )}
                        {order.orderStatus === "cancelled" && (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                            {order.orderStatus}
                          </span>
                        )}
                        {order.orderStatus === "dispatch" && (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            {order.orderStatus}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium justify-center space-x-4">
                        <button className="text-indigo-600 hover:text-indigo-900">
                          <FontAwesomeIcon icon={faCircleInfo} size="xl" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <nav
          className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
          aria-label="Pagination"
        >
          {Array.from({ length: pageCount }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 ${
                currentPage === i + 1 ? "z-10 bg-gray-200" : ""
              }`}
            >
              {i + 1}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default OrdersTable;
