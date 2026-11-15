
import {
  ShoppingBag,
  TrendingUp,
  Users,
  Package,
} from 'lucide-react';

import type { DashboardStat } from '../../../../models/Admin';

interface Props {
  stats: DashboardStat[];
}

const icons = [
  ShoppingBag,
  TrendingUp,
  Users,
  Package,
];

const formatValue = (stat: DashboardStat) => {
  if (stat.title === 'TOTAL REVENUE') {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      maximumFractionDigits: 2,
    }).format(stat.value);
  }

  return new Intl.NumberFormat('en-PH').format(stat.value);
};

export default function DashboardStats({ stats }: Props) {
  return (
    <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat, index) => {
        const Icon = icons[index];

        return (
          <div
            key={stat.title}
            className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div className="rounded-lg bg-blue-50 p-3 text-[#123A8C]">
                <Icon size={22} />
              </div>
            </div>

            <p className="mt-4 text-sm text-gray-500">
              {stat.title}
            </p>

            <h3 className="mt-1 text-2xl font-bold text-gray-800">
              {formatValue(stat)}
            </h3>

            <p className="mt-2 text-xs text-gray-400">
              All-time statistics
            </p>
          </div>
        );
      })}
    </div>
  );
}
