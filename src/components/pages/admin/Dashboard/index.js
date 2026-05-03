import {
  useGetAllOrdersQuery,
  useGetAllUsersQuery,
  useGetDashboardStatsQuery
} from "../../../../redux/api/admin";
import { useGetAllProductsQuery } from "../../../../redux/api/products";

const AdminDashboard = () => {
  // RTK Query - NEW APPROACH
  const {
    data: dashboardStats,
    isLoading: isStatsLoading,
    error: statsError
  } = useGetDashboardStatsQuery();
  const { data: usersData, isLoading: isUsersLoading } = useGetAllUsersQuery();
  const { data: ordersData, isLoading: isOrdersLoading } =
    useGetAllOrdersQuery();
  const { data: productsData, isLoading: isProductsLoading } =
    useGetAllProductsQuery();

  // DEPRECATED: Hard-coded stats (kept for reference)
  // const stats = {
  //   totalProducts: 1234,
  //   totalOrders: 5678,
  //   totalUsers: 2345,
  //   totalRevenue: 98765
  // };

  const stats = dashboardStats || {
    totalProducts: isProductsLoading ? "Loading..." : productsData?.length || 0,
    totalOrders: isOrdersLoading ? "Loading..." : ordersData?.length || 0,
    totalUsers: isUsersLoading ? "Loading..." : usersData?.length || 0,
    totalRevenue: "Loading..."
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      {statsError && (
        <p style={{ color: "red" }}>Error loading dashboard stats</p>
      )}

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Products</h3>
          <p className="stat-value">
            {isProductsLoading ? "Loading..." : stats.totalProducts}
          </p>
        </div>
        <div className="stat-card">
          <h3>Total Orders</h3>
          <p className="stat-value">
            {isOrdersLoading ? "Loading..." : stats.totalOrders}
          </p>
        </div>
        <div className="stat-card">
          <h3>Total Users</h3>
          <p className="stat-value">
            {isUsersLoading ? "Loading..." : stats.totalUsers}
          </p>
        </div>
        <div className="stat-card">
          <h3>Total Revenue</h3>
          <p className="stat-value">
            {isStatsLoading ? "Loading..." : `$${stats.totalRevenue}`}
          </p>
        </div>
      </div>
      <div className="dashboard-section">
        <h2>Recent Activity</h2>
        <p>Dashboard content coming soon...</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
