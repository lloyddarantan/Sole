
import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

import type { AdminDashboardData } from '../models/Admin';

const emptyDashboard: AdminDashboardData = {
  stats: [
    { title: 'TOTAL REVENUE', value: 0 },
    { title: 'TOTAL ORDERS', value: 0 },
    { title: 'ACTIVE CUSTOMERS', value: 0 },
    { title: 'UNITS SOLD', value: 0 },
  ],
  revenueData: [],
  salesStatus: [],
  products: [],
  orders: [],
};

export function useAdminDashboardController() {
  const [dashboard, setDashboard] =
    useState<AdminDashboardData>(emptyDashboard);

  const [months, setMonths] = useState<number>(6);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const loadDashboard = useCallback(async () => {
    setIsLoading(true);
    setError('');

    try {
      const { data, error: dashboardError } = await supabase.rpc(
        'get_admin_dashboard_data',
        { p_months: months }
      );

      if (dashboardError) throw dashboardError;

      if (!data) {
        throw new Error('No dashboard data was returned.');
      }

      setDashboard(data as AdminDashboardData);
    } catch (err) {
      console.error('Dashboard loading error:', err);

      setError(
        err instanceof Error
          ? err.message
          : 'Unable to load dashboard data.'
      );
    } finally {
      setIsLoading(false);
    }
  }, [months]);

  useEffect(() => {
    void loadDashboard();
  }, [loadDashboard]);

  return {
    ...dashboard,
    months,
    setMonths,
    isLoading,
    error,
    refreshDashboard: loadDashboard,
    loadDashboard
  };
}
