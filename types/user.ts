export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  phone: string;
  address: string;
  isDeleted: boolean;
  createdDate: Date;
  updatedDate: Date;
  cart: [];
  orders: [];
}
