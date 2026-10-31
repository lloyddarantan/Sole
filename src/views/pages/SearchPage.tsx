// src/views/pages/SearchPage.tsx
import React, { useState } from 'react'
import { Search as SearchIcon } from 'lucide-react'
import { searchProducts } from '../../controllers/productControllers'
import ProductCard from '../components/Home/ProductCard'
import type { Product } from '../../models/Product'

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [favorites, setFavorites] = useState<number[]>([])
  const [cart, setCart] = useState<Product[]>([])

  const categories = ['Casual', 'Athletic', 'Running']

  // Filter products through the Controller
  const filteredProducts = searchProducts(query, selectedCategory || undefined)

  function toggleCategory(cat: string) {
    if (selectedCategory === cat) {
      setSelectedCategory(null)
    } else {
      setSelectedCategory(cat)
    }
  }

  function toggleFavorite(id: number) {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  function addToCart(product: Product) {
    setCart((prev) => [...prev, product])
    alert(`${product.name} added to cart!`)
  }

  return (
    <main className="mx-auto min-h-[70vh] max-w-4xl px-4 py-12 flex flex-col items-center">
      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#2B41A7] mb-8 text-center">
        Search Sneakers
      </h1>

      {/* Pill Search Input */}
      <div className="relative w-full max-w-2xl mb-6">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-white">
          <SearchIcon size={22} />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search By Name, Brand Or Category"
          className="w-full py-3.5 pl-12 pr-6 bg-[#7C8DF6] text-white placeholder-white/80 font-medium text-sm md:text-base rounded-full outline-none shadow-md focus:ring-2 focus:ring-[#2B41A7] transition-all"
        />
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => toggleCategory(cat)}
            className={`px-6 py-1.5 rounded-lg text-xs md:text-sm font-semibold transition-all shadow-sm ${
              selectedCategory === cat
                ? 'bg-[#2B41A7] text-white'
                : 'bg-[#5B82F6] hover:bg-[#476EE6] text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Empty State / Instructional Text */}
      {!query && !selectedCategory && (
        <p className="text-slate-500 font-serif italic text-sm md:text-base mt-2">
          Start Typing To Find Your Next Pair
        </p>
      )}

      {/* Results Display */}
      {(query || selectedCategory) && (
        <div className="w-full mt-8">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 text-left">
            Found {filteredProducts.length} result(s)
          </p>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isFavorite={favorites.includes(product.id)}
                  onToggleFavorite={toggleFavorite}
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-slate-400">
              No sneakers found matching your search.
            </div>
          )}
        </div>
      )}
    </main>
  )
}