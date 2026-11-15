import { useState } from 'react';
import { Loader2, RefreshCw, ShoppingBag } from 'lucide-react';

import {
  ORDER_STATUSES,
  type AdminOrder,
  type EditableOrderStatus,
} from '../../../models/AdminOrders';

interface OrderManagementProps {
  orders: AdminOrder[];
  isLoading: boolean;
  updatingOrderId: string | null;
  error: string | null;
  onRefresh: () => void;
  onUpdateStatus: (
    orderId: string,
    status: EditableOrderStatus
  ) => Promise<boolean>;
}

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
  }).format(amount);

const formatDate = (date: string) =>
  new Date(date).toLocaleString('en-PH', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

const getStatusStyle = (status: string) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'confirmed':
      return 'bg-blue-100 text-blue-800';
    case 'processing':
      return 'bg-purple-100 text-purple-800';
    case 'shipped':
      return 'bg-indigo-100 text-indigo-800';
    case 'delivered':
      return 'bg-green-100 text-green-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    case 'refunded':
      return 'bg-gray-200 text-gray-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

const OrderManagement = ({
  orders,
  isLoading,
  updatingOrderId,
  error,
  onRefresh,
  onUpdateStatus,
}: OrderManagementProps) => {
  const [selectedStatuses, setSelectedStatuses] = useState<
    Record<string, EditableOrderStatus>
  >({});

  const handleStatusChange = (
    orderId: string,
    status: EditableOrderStatus
  ) => {
    setSelectedStatuses((current) => ({
      ...current,
      [orderId]: status,
    }));
  };

  const handleSaveStatus = async (order: AdminOrder) => {
    const newStatus = selectedStatuses[order.id];

    if (!newStatus || newStatus === order.status) {
      return;
    }

    const success = await onUpdateStatus(order.id, newStatus);

    if (success) {
      setSelectedStatuses((current) => {
        const updated = { ...current };
        delete updated[order.id];
        return updated;
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Order Management
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            View customer orders and update their sales status.
          </p>
        </div>

        <button
          type="button"
          onClick={onRefresh}
          disabled={isLoading}
          className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          <RefreshCw
            size={16}
            className={isLoading ? 'animate-spin' : ''}
          />
          Refresh
        </button>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        {isLoading ? (
          <div className="flex items-center justify-center gap-2 py-16 text-gray-500">
            <Loader2 size={20} className="animate-spin" />
            Loading orders...
          </div>
        ) : orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-500">
            <ShoppingBag size={36} className="mb-3 text-gray-300" />
            <p className="font-medium">No orders found</p>
            <p className="mt-1 text-sm">
              Customer orders will appear here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left">
              <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                <tr>
                  <th className="px-5 py-4">Order Number</th>
                  <th className="px-5 py-4">Date</th>
                  <th className="px-5 py-4">Total</th>
                  <th className="px-5 py-4">Current Status</th>
                  <th className="px-5 py-4">Update Status</th>
                  <th className="px-5 py-4">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {orders.map((order) => {
                  const selectedStatus =
                    selectedStatuses[order.id] ??
                    (ORDER_STATUSES.includes(
                      order.status as EditableOrderStatus
                    )
                      ? (order.status as EditableOrderStatus)
                      : 'pending');

                  const isUpdating = updatingOrderId === order.id;
                  const hasChanged = selectedStatus !== order.status;
                  const isEditable = ORDER_STATUSES.includes(
                    order.status as EditableOrderStatus
                  );

                  return (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-5 py-4 font-semibold text-gray-900">
                        {order.order_number}
                      </td>

                      <td className="px-5 py-4 text-sm text-gray-600">
                        {formatDate(order.created_at)}
                      </td>

                      <td className="px-5 py-4 text-sm font-medium text-gray-900">
                        {formatCurrency(Number(order.total_amount))}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${getStatusStyle(order.status)}`}
                        >
                          {order.status}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        {isEditable ? (
                          <select
                            value={selectedStatus}
                            onChange={(event) =>
                              handleStatusChange(
                                order.id,
                                event.target.value as EditableOrderStatus
                              )
                            }
                            disabled={isUpdating}
                            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm capitalize outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:opacity-50"
                          >
                            {ORDER_STATUSES.map((status) => (
                              <option
                                key={status}
                                value={status}
                                className="capitalize"
                              >
                                {status}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <span className="text-sm text-gray-400">
                            Not editable
                          </span>
                        )}
                      </td>

                      <td className="px-5 py-4">
                        {isEditable && (
                          <button
                            type="button"
                            onClick={() => handleSaveStatus(order)}
                            disabled={!hasChanged || isUpdating}
                            className="rounded-lg bg-[#123A8C] px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-gray-300"
                          >
                            {isUpdating ? (
                              <Loader2
                                size={16}
                                className="animate-spin"
                              />
                            ) : (
                              'Save'
                            )}
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <p className="text-xs text-gray-500">
        Cancelled and refunded orders are displayed but cannot be changed
        using this status editor.
      </p>
    </div>
  );
};

export default OrderManagement;