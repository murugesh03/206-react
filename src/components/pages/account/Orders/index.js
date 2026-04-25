import "../styles.css";

const Orders = () => {
  const orders = [
    {
      id: "ORD-001",
      date: "April 20, 2026",
      total: "$349.99",
      status: "Delivered",
      items: 3
    },
    {
      id: "ORD-002",
      date: "April 15, 2026",
      total: "$199.99",
      status: "In Transit",
      items: 1
    },
    {
      id: "ORD-003",
      date: "April 10, 2026",
      total: "$799.99",
      status: "Delivered",
      items: 2
    }
  ];

  const getStatusClass = (status) => {
    return status === "Delivered"
      ? "status-delivered"
      : status === "In Transit"
        ? "status-transit"
        : "status-pending";
  };

  return (
    <div className="page-content">
      <h1>My Orders</h1>

      {orders.length > 0 ? (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div className="order-id">
                  <strong>Order ID:</strong> {order.id}
                </div>
                <div className={`order-status ${getStatusClass(order.status)}`}>
                  {order.status}
                </div>
              </div>
              <div className="order-details">
                <div className="detail-item">
                  <strong>Date:</strong> {order.date}
                </div>
                <div className="detail-item">
                  <strong>Items:</strong> {order.items}
                </div>
                <div className="detail-item">
                  <strong>Total:</strong> {order.total}
                </div>
              </div>
              <button className="btn-view-order">View Order Details</button>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-orders">
          <p>You haven't placed any orders yet.</p>
          <a href="/products" className="btn-shop">
            Start Shopping
          </a>
        </div>
      )}
    </div>
  );
};

export default Orders;
