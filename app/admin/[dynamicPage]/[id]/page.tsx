// pages/admin/[page].tsx
"use client";
import { useParams } from "next/navigation"; // Import useRouter from next/router instead of next/navigation
import EditProduct from "@/pages/Product/editProduct";
import AddProduct from "@/pages/Product/addProduct";
import AdminPage from "../../page";
import PageNotFound from "@/app/[...not_found]/page";

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
