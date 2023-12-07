// pages/admin/[page].tsx
"use client";
import { useParams } from "next/navigation"; 
import AdminPage from "../../page";
import PageNotFound from "@/app/[...not_found]/page";
import EditProduct from "@/app/(pages)/product/editProduct";
import AddProduct from "@/app/(pages)/product/addProduct";

const AdminDynamicPage = () => {
  const { id } = useParams<{ id: string }>();

  const renderPage = () => {
    switch (id) {
      case `${id}`:
        return <EditProduct id={id} />;
      case `add`:
        return <AddProduct />;
      default:
        return <PageNotFound />;
    }
  };

  return (
    <AdminPage>
      <div className="flex flex-col w-full h-full">{renderPage()}</div>
    </AdminPage>
  );
};

export default AdminDynamicPage;
