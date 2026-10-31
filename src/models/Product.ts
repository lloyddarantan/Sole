// src/models/Product.ts
export interface Product {
  id: number
  name: string
  price: number
  image: string
  category: string
  isNew?: boolean
  // Extended fields for Product Catalog View
  styleCode?: string
  color?: string
  description?: string
  stockCount?: number
  galleryImages?: string[]
}