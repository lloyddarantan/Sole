// src/controllers/productControllers.ts
import type { Product } from '../models/Product'

const products: Product[] = [
  {
    id: 1,
    name: 'INDOOR SNEAKERS UNISEX',
    price: 5795,
    image: '/src/assets/images/sneakers.png',
    category: 'Sneakers',
    isNew: true,
    styleCode: '401360_03',
    color: 'PUMA WHITE-DARK CRIMSON-GUM',
    description:
      "FROM OUR MID '80S ARCHIVE, THE PUMA INDOOR WAS CREATED AS A UNIVERSAL INDOOR TRAINING SHOE. WITH ITS SOLID, CURVED MIDSOLE AND STURDY UPPER THE SHOE WAS AS APPEALING TO ATHLETS...",
    stockCount: 1,
    galleryImages: [
      '/src/assets/images/sneakers.png',
      '/src/assets/images/sneakers.png',
      '/src/assets/images/sneakers.png',
      '/src/assets/images/sneakers.png'
    ]
  },
  {
    id: 2,
    name: 'PUMA White-Dark Crimson-Gum',
    price: 5795,
    image: '/src/assets/images/sneakers.png',
    category: 'Sneakers',
    isNew: true,
    styleCode: '401360_03',
    color: 'PUMA WHITE-DARK CRIMSON-GUM',
    description: "Classic court sneaker with durable gum sole.",
    stockCount: 5,
    galleryImages: ['/src/assets/images/sneakers.png']
  }
]

export function getNewArrivals(): Product[] {
  return products.filter((product) => product.isNew)
}

export function getProductById(id: number): Product | undefined {
  return products.find((product) => product.id === id)
}