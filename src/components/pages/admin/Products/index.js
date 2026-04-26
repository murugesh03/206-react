import { NavLink } from "react-router";

const AdminProducts = () => {
  return (
    <div className="admin-products">
      <div className="admin-header">
        <h1>Products Management</h1>
        <NavLink to="/admin/add-product" className="btn btn-primary">
          + Add New Product
        </NavLink>
      </div>

      <div className="products-table-container">
        <table className="products-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Sample Product</td>
              <td>Electronics</td>
              <td>$99.99</td>
              <td>45</td>
              <td>
                <button className="btn btn-small btn-edit">Edit</button>
                <button className="btn btn-small btn-delete">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProducts;
