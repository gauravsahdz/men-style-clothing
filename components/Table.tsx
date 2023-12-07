"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faSort,
  faSortDown,
  faSortUp,
  faCircleInfo,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal";
import "@/styles/components/_productTable.css";
import { SizeProp } from "@fortawesome/fontawesome-svg-core";

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

type InfoTableProps = {
  columns: any[];
  dataList: any[];
  actions: any[];
};

const InfoTable = ({ columns, dataList, actions }: InfoTableProps) => {
  const router = useRouter();
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const actionIcons = (id: string) => (
    <div className="flex justify-center space-x-4">
      {actions.map((action, index) => (
        <button
          key={index}
          className={action.color}
          onClick={() => action.func(id)}
        >
          <FontAwesomeIcon
            icon={action.icon}
            size={action.size}
            title={action.tooltip}
          />
        </button>
      ))}
    </div>
  );

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const sortedDatas = dataList?.sort((a, b) => {
    if (sortField === "title") {
      return sortOrder === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    } else if (sortField === "stock") {
      return sortOrder === "asc" ? a.stock - b.stock : b.stock - a.stock;
    } else if (sortField === "discount") {
      return sortOrder === "asc"
        ? (a.discount ?? 0) - (b.discount ?? 0)
        : (b.discount ?? 0) - (a.discount ?? 0);
    } else {
      return 0;
    }
  });

  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const pageCount = Math.ceil(sortedDatas?.length / pageSize);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentDatas = sortedDatas?.slice(startIndex, endIndex);

  const editRoute = (id: string) => {
    router.push(`/admin/products/${id}`);
  };

  return (
    <div className="flex flex-col mb-4 w-full p-4">
      <div className="-my-2 overflow-x-auto">
        <div className="py-2 align-middle inline-block min-w-full">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <div style={{ overflowX: "auto" }}>
              <table className="min-w-full divide-y divide-gray-200 lg:table sm:table">
                <thead className="bg-gray-50">
                  <tr>
                    {columns &&
                      columns.map((column, index) => (
                        <TableHeader
                          key={index}
                          field={column.field}
                          label={column.label}
                          sortField={sortField}
                          sortOrder={sortOrder}
                          handleSort={handleSort}
                        />
                      ))}
                    <th className="table_header px-6 py-3 text-center text-xs font-large text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentDatas?.map((product) => (
                    <tr key={product.id}>
                      {columns.map((column, columnIndex) => (
                        <td
                          key={columnIndex}
                          className="px-6 py-4 whitespace-nowrap lg:table-cell sm:table-cell"
                        >
                          {column.field === "thumbnail" ? (
                            <Image
                              src={product[column.field]}
                              alt={product.title}
                              className="h-8 w-8 rounded-full"
                              width={100}
                              height={100}
                            />
                          ) : column.field === "description" ? (
                            product[column.field as keyof typeof product]
                              .slice(0, 20)
                              .concat("...")
                          ) : (
                            product[column.field as keyof typeof product]
                          )}
                        </td>
                      ))}
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium justify-center space-x-4">
                        {actionIcons(product.id)}
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

export default InfoTable;
