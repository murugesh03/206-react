const AdminUsers = () => {
  return (
    <div className="admin-users">
      <h1>Users Management</h1>

      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Join Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>#USR001</td>
              <td>John Doe</td>
              <td>john@example.com</td>
              <td>
                <span className="role-badge role-user">User</span>
              </td>
              <td>2024-01-15</td>
              <td>
                <button className="btn btn-small btn-view">View</button>
                <button className="btn btn-small btn-delete">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
