import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

import type {
  AdminOrder,
  EditableOrderStatus,
} from '../models/AdminOrders';

export const useAdminOrderController = () => {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Load all orders
  const loadOrders = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase
        .from('orders')
        .select(`
          id,
          order_number,
          user_id,
          total_amount,
          status,
          created_at
        `)
        .order('created_at', { ascending: false });

      if (fetchError) {
        throw fetchError;
      }

      setOrders((data ?? []) as AdminOrder[]);
    } catch (err) {
      console.error('Error loading orders:', err);
      setError(
        err instanceof Error ? err.message : 'Failed to load orders.'
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Update an order's status
  const updateOrderStatus = async (
    orderId: string,
    newStatus: EditableOrderStatus
  ): Promise<boolean> => {
    setUpdatingOrderId(orderId);
    setError(null);

    try {
      const { data, error: updateError } = await supabase
        .from('orders')
        .update({
          status: newStatus,
          updated_at: new Date().toISOString(),
        })
        .eq('id', orderId)
        .select('id, status')
        .single();

      if (updateError) {
        throw updateError;
      }

      if (!data) {
        throw new Error('The order status was not updated.');
      }

      // Update the local list without reloading every order
      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order.id === orderId
            ? { ...order, status: data.status as AdminOrder['status'] }
            : order
        )
      );

      return true;
    } catch (err) {
      console.error('Error updating order status:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to update order status.'
      );

      return false;
    } finally {
      setUpdatingOrderId(null);
    }
  };

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  return {
    orders,
    isLoading,
    updatingOrderId,
    error,
    loadOrders,
    updateOrderStatus,
  };
};