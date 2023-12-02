interface OrderItem {
  id: string;
  thumbnail: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  user: string;
  address: string;
  phone: string;
  email: string;
  orderDate: string;
  orderStatus: string;
  orderTotal: number;
  orderItems: OrderItem[];
}
