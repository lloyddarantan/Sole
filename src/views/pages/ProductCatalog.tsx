// src/views/pages/ProductCatalog.tsx
import { useParams, useNavigate } from 'react-router-dom'
import { Heart, ShoppingBag } from 'lucide-react'
import { getProductById } from '../../controllers/productControllers'

export default function ProductCatalog() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  // Fetch product data through the Controller
  const product = getProductById(Number(id)) || getProductById(1) // Fallback to id 1 for testing

  if (!product) {
    return (
      <main className="mx-auto max-w-6xl px-6 py-16 text-center">
        <h2 className="text-2xl font-bold text-slate-700">Product Not Found</h2>
        <button
          onClick={() => navigate('/')}
          className="mt-4 px-4 py-2 bg-[#1E2E78] text-white rounded-lg"
        >
          Back to Home
        </button>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 md:py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start bg-slate-100 p-6 md:p-10 rounded-2xl">
        
        {/* Left Column: Image Grid */}
        <div className="grid grid-cols-2 gap-3">
          {product.galleryImages && product.galleryImages.length > 0 ? (
            product.galleryImages.map((img, idx) => (
              <div key={idx} className="bg-white p-3 rounded-xl shadow-sm flex items-center justify-center">
                <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-auto object-contain" />
              </div>
            ))
          ) : (
            <div className="col-span-2 bg-white p-6 rounded-xl shadow-sm flex items-center justify-center">
              <img src={product.image} alt={product.name} className="w-full max-w-md object-contain" />
            </div>
          )}
        </div>

        {/* Right Column: Technical Datasheet Info */}
        <div className="flex flex-col justify-between h-full space-y-6 pt-2">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#1E2E78] tracking-tight uppercase leading-tight">
              {product.name}
            </h1>

            <p className="mt-4 text-xs md:text-sm text-slate-600 uppercase leading-relaxed font-medium">
              {product.description}
            </p>

            <ul className="mt-6 space-y-1.5 text-xs md:text-sm font-semibold text-slate-800">
              <li>• STYLE: {product.styleCode || '401360_03'}</li>
              <li>• COLOUR: {product.color || 'PUMA WHITE-DARK CRIMSON-GUM'}</li>
            </ul>

            {product.stockCount && product.stockCount <= 3 && (
              <p className="mt-4 text-xs font-extrabold text-blue-900 uppercase tracking-wide">
                ONLY {product.stockCount} LEFT — MAKE IT YOURS!
              </p>
            )}

            <div className="mt-6">
              <p className="text-sm font-extrabold text-slate-900 uppercase">{product.color || product.name}</p>
              <p className="text-lg font-black text-slate-900">₱{product.price.toLocaleString()}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-4">
            <button
              onClick={() => alert(`Buying ${product.name} now!`)}
              className="flex-1 py-3.5 bg-[#1E2E78] hover:bg-[#16235e] text-white font-extrabold rounded-xl shadow-lg transition-all text-center text-sm tracking-wider uppercase"
            >
              BUY NOW
            </button>

            <button
              onClick={() => alert(`${product.name} added to cart!`)}
              className="p-3.5 bg-[#1E2E78] hover:bg-[#16235e] text-white rounded-xl shadow-lg transition-all"
              title="Add to Cart"
            >
              <ShoppingBag size={20} />
            </button>

            <button
              onClick={() => alert(`${product.name} added to favorites!`)}
              className="p-3.5 bg-[#1E2E78] hover:bg-[#16235e] text-white rounded-xl shadow-lg transition-all"
              title="Add to Favorites"
            >
              <Heart size={20} />
            </button>
          </div>

        </div>
      </div>
    </main>
  )
}