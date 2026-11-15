export interface AdminBrand {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  logo_url: string | null;
  is_active: boolean;
  created_at: string;
}

export interface AdminCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  is_active: boolean;
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  brand_id: string | null;
  category_id: string | null;
  description: string | null;
  image_url: string | null;
  is_active: boolean;
  is_featured: boolean;

  brand?: {
    id: string;
    name: string;
  };

  category?: {
    id: string;
    name: string;
  };

  variants?: ProductVariant[];
}

export interface ProductVariant {
  id: string;
  product_id: string;
  sku: string;
  size_label: string;
  size_system: string;
  color: string;
  price: number;
  compare_at_price: number | null;
  stock_quantity: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductFormData {
  name: string;
  brand_id: string;
  category_id: string;
  description: string;
  image_url: string;
  is_active: boolean;
  is_featured: boolean;
}

export interface VariantFormData {
  size_label: string;
  size_system: string;
  color: string;
  price: number;
  compare_at_price: number | null;
  stock_quantity: number;
  is_active: boolean;
}


export interface DashboardStat {
  title: string;
  value: number;
}

export interface RevenueData {
  month: string;
  value: number;
}

export interface SalesStatus {
  label: string;
  value: number;
}

export interface DashboardProduct {
  id: string;
  name: string;
  sales: number;
  revenue: number;
}

export interface DashboardOrder {
  id: string;
  order_number: string;
  customer: string;
  product: string | null;
  total: number;
  status:
    | 'pending'
    | 'confirmed'
    | 'processing'
    | 'shipped'
    | 'delivered'
    | 'cancelled'
    | 'refunded';
  created_at: string;
}

export interface AdminDashboardData {
  stats: DashboardStat[];
  revenueData: RevenueData[];
  salesStatus: SalesStatus[];
  products: DashboardProduct[];
  orders: DashboardOrder[];
}


