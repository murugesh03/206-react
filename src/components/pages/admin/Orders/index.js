const AdminOrders = () => {
  return (
    <div className="admin-orders">
      <h1>Orders Management</h1>

      <div className="orders-table-container">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>#ORD001</td>
              <td>John Doe</td>
              <td>2024-04-20</td>
              <td>$199.99</td>
              <td>
                <span className="status-badge status-delivered">Delivered</span>
              </td>
              <td>
                <button className="btn btn-small btn-view">View</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;
