// pages/admin/[page].tsx
"use client";
import { useParams } from "next/navigation"; // Import useRouter from next/router instead of next/navigation
import Dashboard from "@/components/admin/Dashboard";
import AdminPage from "../page";
import ProductTable from "@/pages/ProductTable";
import EditProduct from "@/pages/Product/editProduct";
import AddProduct from "@/pages/Product/addProduct";
import PageNotFound from "@/app/[...not_found]/page";
import OrdersTable from "@/pages/Orders";

const AdminDynamicPage = () => {
  const params = useParams();
  const { id } = useParams<{ id: string }>();

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
      case `orders`:
        return <OrdersTable />;
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
