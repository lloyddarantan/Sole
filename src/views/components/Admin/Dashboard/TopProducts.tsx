
import type { DashboardProduct } from '../../../../models/Admin';

interface Props {
  products: DashboardProduct[];
}

const formatPeso = (value: number) =>
  new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    maximumFractionDigits: 2,
  }).format(value);

export default function TopProducts({ products }: Props) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">

      {products.length === 0 ? (
        <p className="text-sm text-gray-400">
          No product sales available yet.
        </p>
      ) : (
        <div className="space-y-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between gap-4 border-b border-gray-100 pb-4 last:border-0"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-gray-800">
                  {product.name}
                </p>

                <p className="text-xs text-gray-400">
                  {formatPeso(product.revenue)} revenue
                </p>
              </div>

              <p className="shrink-0 text-sm font-semibold text-[#D7192D]">
                {product.sales} sold
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
