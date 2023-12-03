import React from "react";
import orderList from "@/app/api/orders.json";
import Image from "next/image";

const OrderDetail = ({
  open,
  setOpenOrderDetail,
  orderDetailPass,
}: {
  open: boolean;
  setOpenOrderDetail: (open: boolean) => void;
  orderDetailPass: string;
}) => {
  if (!open) return null;
  const orderListItems = orderList.filter(
    (item) => item.id === orderDetailPass
  );

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      onClick={() => setOpenOrderDetail(false)}
    >
      <div className="bg-white rounded-lg p-8 m-4 max-w-2xl w-full">
        <h2 className="text-xl font-bold mb-4 text-center">Order Details</h2>
        <div className="flex flex-col space-y-4">
          <ul className="space-y-4 divide-y divide-gray-200">
            {/* Replace this with your actual data */}
            {orderListItems.map((item) =>
              item.orderItems.map((item) => (
                <li key={item.id} className="flex items-center space-x-4">
                  <Image
                    src={item.thumbnail}
                    alt={item.name}
                    className="w-16 h-16 rounded-full"
                    width={100}
                    height={100}
                  />
                  <div>
                    <h3 className="font-bold">{item.name}</h3>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: ${item.price}</p>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
