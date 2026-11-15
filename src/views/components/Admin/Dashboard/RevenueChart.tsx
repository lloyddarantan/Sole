
import type { RevenueData } from '../../../../models/Admin';

interface Props {
  data: RevenueData[];
  months: number;
  onMonthsChange: (months: number) => void;
  loading: boolean;
}

const formatPeso = (value: number) =>
  new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    maximumFractionDigits: 0,
  }).format(value);

export default function RevenueChart({
  data,
  months,
  onMonthsChange,
  loading,
}: Props) {
  const maxValue = Math.max(
    ...data.map((item) => item.value),
    1
  );

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm xl:col-span-2">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="font-bold text-gray-800">
            Revenue Overview
          </h3>

          <p className="text-sm text-gray-400">
            Monthly revenue performance
          </p>
        </div>

        <select
          value={months}
          onChange={(event) =>
            onMonthsChange(Number(event.target.value))
          }
          className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 outline-none focus:border-[#123A8C]"
        >
          <option value={3}>Last 3 months</option>
          <option value={6}>Last 6 months</option>
          <option value={12}>Last 12 months</option>
          <option value={0}>All time</option>
        </select>
      </div>

      {loading ? (
        <div className="flex h-64 items-center justify-center text-sm text-gray-400">
          Loading revenue...
        </div>
      ) : data.length === 0 ? (
        <div className="flex h-64 items-center justify-center text-sm text-gray-400">
          No revenue data available.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <div className="flex h-64 min-w-full items-end justify-around gap-3 border-b border-gray-200 px-2">
            {data.map((item) => {
              const height = Math.max(
                (item.value / maxValue) * 100,
                item.value > 0 ? 3 : 0
              );

              return (
                <div
                  key={item.month}
                  className="flex h-full min-w-10 flex-1 flex-col items-center justify-end gap-2"
                  title={`${item.month}: ${formatPeso(item.value)}`}
                >
                  <span className="whitespace-nowrap text-[10px] text-gray-500">
                    {item.value > 0 ? formatPeso(item.value) : ''}
                  </span>

                  <div
                    className="w-full max-w-10 rounded-t-md bg-[#123A8C] transition hover:bg-[#D7192D]"
                    style={{ height: `${height}%` }}
                  />

                  <span className="mb-2 whitespace-nowrap text-xs text-gray-500">
                    {item.month}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
