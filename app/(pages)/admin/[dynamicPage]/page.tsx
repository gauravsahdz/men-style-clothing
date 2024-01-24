// pages/admin/[page].tsx
"use client";
import { useParams } from "next/navigation";
import Dashboard from "@/components/admin/Dashboard";
import AdminPage from "../page";
import PageNotFound from "@/app/[...not_found]/page";
import EditProduct from "../../product/editProduct";
import AddProduct from "../../product/addProduct";
import OrderPage from "../../orders/page";
import Page from "../../product/page";
import Setting from "../../setting/page";

const AdminDynamicPage = () => {
  const params = useParams();
  const { id } = useParams<{ id: string }>();

  const renderPage = () => {
    switch (params?.dynamicPage) {
      case "dashboard":
        return <Dashboard />;
      case "products":
        return < Page/>;
      case `products/${id}`:
        return <EditProduct id={id} />;
      case `products/add`:
        return <AddProduct />;
      case `orders`:
        return <OrderPage />;
        case `setting`:
        return <Setting />;
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
