// pages/admin/[page].tsx
"use client";
import { useParams } from "next/navigation"; // Import useRouter from next/router instead of next/navigation
import Dashboard from "@/components/admin/Dashboard";
import AdminPage from "../page";
import PageNotFound from "@/components/PageNotFound";
import ProductTable from "@/pages/ProductTable";
import EditProduct from "@/pages/Product/editProduct";
import AddProduct from "@/pages/Product/addProduct";

const AdminDynamicPage = () => {
  const params = useParams();
  console.log(params);
  const { id } = useParams<{ id: string }>();
  console.log("id", id);

  const renderPage = () => {
    switch (params?.dynamicPage) {
      case "dashboard":
        return <Dashboard />;
      case "products":
        return <ProductTable />;
      case `products/${id}`:
        return <EditProduct id={id} />;
      case `products/add`:
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
