export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  stock: number;
  features?: string[];
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

export interface CreateOrderDto {
  productId: string;
  quantity: number;
  customerFirstName: string;
  customerLastName: string;
  customerPhone: string;
  deliveryCity: string;
  deliveryAddress: string;
  notes?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  productId: string;
  product?: Product;
  quantity: number;
  totalAmount: number;
  customerFirstName: string;
  customerLastName: string;
  customerPhone: string;
  deliveryCity: string;
  deliveryAddress: string;
  notes?: string;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}
