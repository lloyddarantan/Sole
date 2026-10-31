// src/models/Product.ts
export interface Product {
  id: number
  name: string
  price: number
  image: string
  category: string
  isNew?: boolean
  // Jett:Nag add me for product catalog details
  styleCode?: string
  color?: string
  description?: string
  stockCount?: number
  galleryImages?: string[]
}