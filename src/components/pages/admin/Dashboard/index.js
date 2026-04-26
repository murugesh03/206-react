const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Products</h3>
          <p className="stat-value">1,234</p>
        </div>
        <div className="stat-card">
          <h3>Total Orders</h3>
          <p className="stat-value">5,678</p>
        </div>
        <div className="stat-card">
          <h3>Total Users</h3>
          <p className="stat-value">2,345</p>
        </div>
        <div className="stat-card">
          <h3>Total Revenue</h3>
          <p className="stat-value">$98,765</p>
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
