
import type { SalesStatus as SalesStatusType } from '../../../../models/Admin';

interface Props {
  data: SalesStatusType[];
}

const statusColors: Record<string, string> = {
  pending: 'bg-amber-400',
  confirmed: 'bg-blue-400',
  processing: 'bg-purple-500',
  shipped: 'bg-indigo-500',
  delivered: 'bg-green-500',
  cancelled: 'bg-red-500',
  refunded: 'bg-gray-400',
};

export default function SalesStatus({ data }: Props) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
      <h3 className="font-bold text-gray-800">
        Sales Status
      </h3>

      <p className="mb-6 text-sm text-gray-400">
        Orders by status
      </p>

      {data.length === 0 ? (
        <p className="text-sm text-gray-400">
          No order data available.
        </p>
      ) : (
        <div className="max-h-64 space-y-5 overflow-y-auto pr-1">
          {data.map((item) => (
            <div key={item.label}>
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-gray-600">
                  {item.label}
                </span>

                <span className="font-semibold text-gray-800">
                  {item.value}%
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                <div
                  className={`h-full rounded-full ${
                    statusColors[item.label.toLowerCase()] ??
                    'bg-gray-400'
                  }`}
                  style={{
                    width: `${Math.min(item.value, 100)}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
