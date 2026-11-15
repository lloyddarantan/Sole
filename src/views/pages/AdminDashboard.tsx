
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowUpRight,
  LogOut,
  Loader2,
   ShoppingBag,
    TrendingUp,
    Users,
    Package,
    MoreHorizontal
} from 'lucide-react';

import AdminSidebar, {
  type AdminTab,
} from '../components/Admin/AdminSidebar';

import ProductManagement from '../components/Admin/ProductManagement';

import DashboardStats from '../components/Admin/Dashboard/DashboardStats';
import RevenueChart from '../components/Admin/Dashboard/RevenueChart';
import SalesStatus from '../components/Admin/Dashboard/SalesStatus';
import TopProducts from '../components/Admin/Dashboard/TopProducts';
import RecentOrders from '../components/Admin/Dashboard/RecentOrders';
import OrderManagement from '../components/Admin/OrderManagement';

import { useAdminController } from '../../controllers/adminController';
import { useAdminDashboardController } from '../../controllers/adminDashboardController';
import { handleLogout } from '../../controllers/authController';
import { useAdminOrderController } from '../../controllers/adminOrderController';
import type { EditableOrderStatus } from '../../models/AdminOrders';


export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<AdminTab>('Dashboard')

  const navigate = useNavigate();

const [isLoggingOut, setIsLoggingOut] = useState(false);

const onLogout = async () => {
  if (isLoggingOut) return;

  setIsLoggingOut(true);

  try {
    const response = await handleLogout();

    if (!response.success) {
      alert(response.message || 'Unable to log out. Please try again.');
      return;
    }

    navigate('/login', { replace: true });

  } catch (error) {
    console.error('Logout error:', error);

    alert('Something went wrong while logging out.');

  } finally {
    setIsLoggingOut(false);
  }
};

  const {
    stats,
    revenueData,
    salesStatus,
    products,
    orders,
    months,
    setMonths,
    isLoading: isLoadingDashboard,
    error: dashboardError,
    loadDashboard,
  } = useAdminDashboardController();

  const {
    productList,
    brands,
    categories,
    isLoadingProducts,
    isSavingProduct,
    productError,
    productMessage,

    createProduct,
    updateProduct,
    addProductVariant,
    updateProductVariant,
    deleteProduct,
    createBrand,
    createCategory,
  } = useAdminController()

  const statIcons = [
    ShoppingBag,
    TrendingUp,
    Users,
    Package,
  ]

  const statusColors = [
    'bg-[#123A8C]',
    'bg-[#F59E0B]',
    'bg-[#D7192D]',
    'bg-gray-300',
  ]

  const {
    orders: adminOrders,
    isLoading: ordersLoading,
    updatingOrderId,
    error: ordersError,
    loadOrders,
    updateOrderStatus,
  } = useAdminOrderController();

  const handleUpdateOrderStatus = async (
  orderId: string,
  status: EditableOrderStatus
) => {
  const success = await updateOrderStatus(orderId, status);

  if (success) {
    await loadDashboard();
  }

  return success;
};

  return (
    <div className="min-h-screen bg-[#F5F6F8]">

      {/* Sidebar */}
      <AdminSidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Main Content */}
      <main className="min-h-screen pl-56">

        {/* Header */}
        <header className="flex h-20 items-center justify-between border-b border-gray-200 bg-white px-8">
          <div>
            <p className="text-sm text-gray-400">
              Admin Console / {activeTab}
            </p>

            <h2 className="text-xl font-bold text-[#123A8C]">
              {activeTab}
              <span className="text-[#D7192D]">.</span>
            </h2>
          </div>

          
<div className="flex items-center gap-4">

  {/* Admin Information */}
  <div className="text-right">
    <p className="text-sm font-semibold text-gray-800">
      Admin
    </p>

    <p className="text-xs text-gray-400">
      Administrator
    </p>
  </div>

  {/* Admin Avatar */}
  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#123A8C] font-bold text-white">
    A
  </div>

  {/* Logout Button */}
  <button
    type="button"
    onClick={onLogout}
    disabled={isLoggingOut}
    className="flex items-center gap-2 rounded-lg bg-red-50 px-4 py-2.5 text-sm font-semibold text-[#D7192D] transition hover:bg-[#D7192D] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
  >
    {isLoggingOut ? (
      <>
        <Loader2 size={17} className="animate-spin" />
        Logging out...
      </>
    ) : (
      <>
        <LogOut size={17} />
        Logout
      </>
    )}
  </button>

</div>

        </header>

        <div className="p-8">

          {activeTab === 'Dashboard' ? (

            <>
              {/* Dashboard Heading */}
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-[#123A8C]">
                  Dashboard{' '}
                  <span className="text-[#D7192D]">
                    Overview
                  </span>
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                  Welcome back! Here's what's happening with your store.
                </p>
              </div>

              {/* Dashboard Error */}
              {dashboardError && (
                <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                  {dashboardError}
                </div>
              )}

              {/* Statistics */}
              {isLoadingDashboard ? (
                <div className="mb-8 rounded-xl border border-gray-100 bg-white p-8 text-center text-sm text-gray-400">
                  Loading dashboard statistics...
                </div>
              ) : (
                <DashboardStats stats={stats} />
              )}

              {/* Charts */}
              <div className="mb-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
                <RevenueChart
                  data={revenueData}
                  months={months}
                  onMonthsChange={setMonths}
                  loading={isLoadingDashboard}
                />

                <SalesStatus data={salesStatus} />
              </div>

              {/* Products and Recent Orders */}
              <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="font-bold text-gray-800">
                      Top Products
                    </h3>

                    <button
                      onClick={() => setActiveTab('Products')}
                      className="flex items-center gap-1 text-sm font-medium text-[#123A8C] transition hover:text-[#D7192D]"
                    >
                      View all
                      <ArrowUpRight size={16} />
                    </button>
                  </div>

                  <TopProducts products={products} />
                </div>

                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="font-bold text-gray-800">
                      Recent Orders
                    </h3>

                    <button
                      onClick={() => setActiveTab('Orders')}
                      className="flex items-center gap-1 text-sm font-medium text-[#123A8C] transition hover:text-[#D7192D]"
                    >
                      View all
                      <ArrowUpRight size={16} />
                    </button>
                  </div>

                  <RecentOrders orders={orders} />
                </div>
              </div>
            </>
          
         ) : activeTab === 'Products' ? (
          <ProductManagement
            products={productList}
            brands={brands}
            categories={categories}
            loading={isLoadingProducts}
            saving={isSavingProduct}
            error={productError}
            message={productMessage}
            onCreate={createProduct}
            onUpdate={updateProduct}
            onAddVariant={addProductVariant}
            onUpdateVariant={updateProductVariant}
            onDelete={deleteProduct}
            onCreateBrand={createBrand}
            onCreateCategory={createCategory}
          />
           ) : activeTab === 'Orders' ? (
          <OrderManagement
            orders={adminOrders}
            isLoading={ordersLoading}
            updatingOrderId={updatingOrderId}
            error={ordersError}
            onRefresh={loadOrders}
            onUpdateStatus={handleUpdateOrderStatus}
          />
        ) : (
          /* Other Tabs */
          <div className="rounded-xl border border-gray-100 bg-white p-8 shadow-sm">
            <h1 className="text-2xl font-bold text-[#123A8C]">
              {activeTab}
              <span className="text-[#D7192D]">.</span>
            </h1>

            <p className="mt-2 text-gray-500">
              Manage your store's {activeTab.toLowerCase()} here.
            </p>

            <div className="mt-8 rounded-lg bg-[#F5F6F8] p-6 text-center">
              <p className="font-semibold text-[#123A8C]">
                {activeTab} Section
              </p>

              <p className="mt-1 text-sm text-gray-500">
                This section is ready for its content and functionality.
              </p>
            </div>
          </div>
        )}

        </div>

      </main>
    </div>
  )
}
