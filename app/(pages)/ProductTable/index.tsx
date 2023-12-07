"use client";
import React, { useState } from "react";
import productList from "@/app/api/products.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faSort,
  faSortDown,
  faSortUp,
  faTrash,
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

const ProductTable = () => {
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

  const sortedProducts = productList.sort((a, b) => {
    if (sortField === "name") {
      return sortOrder === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    } else if (sortField === "stock") {
      return sortOrder === "asc" ? a.stock - b.stock : b.stock - a.stock;
    } else if (sortField === "discount") {
      return sortOrder === "asc"
        ? (a.discountPercentage ?? 0) - (b.discountPercentage ?? 0)
        : (b.discountPercentage ?? 0) - (a.discountPercentage ?? 0);
    } else {
      return 0;
    }
  });

  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const pageCount = Math.ceil(sortedProducts.length / pageSize);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentProducts = sortedProducts.slice(startIndex, endIndex);

  const addRoute = () => {
    router.push(`/admin/products/add`);
  };

  const editRoute = (id: string) => {
    router.push(`/admin/products/${id}`);
  };

  const deleteModal = (id: string) => {
    setOpenModal(true);
    setAction(`Delete`);
    setMessage("Are you sure you want to delete this product?");
  };

  return (
    <div className="flex flex-col mb-4 mt-8 w-full p-4">
      <Modal
        show={openModal}
        message={message}
        action={action}
        setOpenModal={setOpenModal}
      />
      <div className="flex items-center justify-between mb-4 mx-3 lg:mx-8 md:mx-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <button
          className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-4"
          onClick={addRoute}
        >
          Add Product
        </button>
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
                      label="Thumbnail"
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
                      label="Stock"
                      sortField={sortField}
                      sortOrder={sortOrder}
                      handleSort={handleSort}
                    />
                    <TableHeader
                      field="discount"
                      label="Discount"
                      sortField={sortField}
                      sortOrder={sortOrder}
                      handleSort={handleSort}
                    />
                    <th
                      scope="col"
                      className="table_header px-6 py-3 text-left text-xs font-large text-gray-500 uppercase tracking-wider"
                    >
                      Sizes
                    </th>
                    <th
                      scope="col"
                      className=" table_header px-6 py-3 text-left text-xs font-large text-gray-500 uppercase tracking-wider"
                    >
                      Brand
                    </th>
                    <th
                      scope="col"
                      className=" table_header px-6 py-3 text-left text-xs font-large text-gray-500 uppercase tracking-wider"
                    >
                      Category
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
                  {currentProducts.map((product) => (
                    <tr key={product.id}>
                      <td className="px-6 py-4 whitespace-nowrap lg:table-cell sm:table-cell">
                        <Image
                          src={product.thumbnail}
                          alt={product.title}
                          className="h-8 w-8 rounded-full"
                          width={100}
                          height={100}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap lg:table-cell sm:table-cell">
                        {product.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap lg:table-cell sm:table-cell">
                        {product.description.slice(0, 50)}...
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap lg:table-cell sm:table-cell">
                        {product.discountPercentage}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap lg:table-cell sm:table-cell">
                        {product.sizes.join(", ")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap lg:table-cell sm:table-cell">
                        {product.brand}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap lg:table-cell sm:table-cell">
                        {product.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium justify-center space-x-4">
                        <button
                          className="text-indigo-600 hover:text-indigo-900"
                          onClick={() => editRoute(product.id)}
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>

                        <button
                          className="text-red-600 hover:text-red-900 mt-2 sm:mt-0"
                          onClick={() => deleteModal(product.id)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
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

export default ProductTable;
