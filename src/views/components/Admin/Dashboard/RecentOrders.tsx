
import type { DashboardOrder } from '../../../../models/Admin';

interface Props {
  orders: DashboardOrder[];
}

const formatPeso = (value: number) =>
  new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    maximumFractionDigits: 2,
  }).format(value);

const statusColors: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-700',
  confirmed: 'bg-blue-100 text-blue-700',
  processing: 'bg-purple-100 text-purple-700',
  shipped: 'bg-indigo-100 text-indigo-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
  refunded: 'bg-gray-100 text-gray-700',
};

export default function RecentOrders({ orders }: Props) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">

      {orders.length === 0 ? (
        <p className="text-sm text-gray-400">
          No orders have been placed yet.
        </p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between gap-4 border-b border-gray-100 pb-4 last:border-0"
            >
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-800">
                  {order.order_number}
                </p>

                <p className="truncate text-xs text-gray-400">
                  {order.customer}
                </p>

                {order.product && (
                  <p className="mt-1 truncate text-xs text-gray-400">
                    {order.product}
                  </p>
                )}
              </div>

              <div className="shrink-0 text-right">
                <p className="text-sm font-semibold text-gray-800">
                  {formatPeso(order.total)}
                </p>

                <span
                  className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${
                    statusColors[order.status] ??
                    'bg-gray-100 text-gray-700'
                  }`}
                >
                  {order.status.charAt(0).toUpperCase() +
                    order.status.slice(1)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
