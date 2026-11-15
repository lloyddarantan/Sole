export const ORDER_STATUSES = [
  'pending',
  'confirmed',
  'processing',
  'shipped',
  'delivered',
] as const;

export type EditableOrderStatus = (typeof ORDER_STATUSES)[number];

export type OrderStatus =
  | EditableOrderStatus
  | 'cancelled'
  | 'refunded';

export interface AdminOrder {
  id: string;
  order_number: string;
  user_id: string;
  total_amount: number;
  status: OrderStatus;
  created_at: string;
}

export interface UpdateOrderStatusPayload {
  orderId: string;
  status: EditableOrderStatus;
}