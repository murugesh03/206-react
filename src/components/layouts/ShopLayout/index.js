import { NavLink, Outlet } from "react-router";
import "./style.css";

const ShopLayout = () => {
  const categories = [
    { name: "Electronics", path: "/shop/category/electronics" },
    { name: "Accessories", path: "/shop/category/accessories" },
    { name: "Computers", path: "/shop/category/computers" },
    { name: "Audio", path: "/shop/category/audio" },
    { name: "Wearables", path: "/shop/category/wearables" }
  ];

  //   // Redirect to login if not authenticated
  //   if (!isAuthenticated) {
  //     return <Navigate to="/login" replace />;
  //   }

  return (
    <div className="shop-layout">
      <div className="shop-container">
        <aside className="shop-sidebar">
          <h2>Categories</h2>
          <nav className="shop-nav">
            <NavLink
              to="/shop"
              end
              className={({ isActive }) =>
                isActive ? "category-link active" : "category-link"
              }
            >
              All Products
            </NavLink>
            {categories.map((cat) => (
              <NavLink
                key={cat.name}
                to={cat.path}
                className={({ isActive }) =>
                  isActive ? "category-link active" : "category-link"
                }
              >
                {cat.name}
              </NavLink>
            ))}
          </nav>

          <div className="filters-section">
            <h3>Filters</h3>
            <div className="filter-group">
              <label>
                <input type="checkbox" /> In Stock
              </label>
              <label>
                <input type="checkbox" /> On Sale
              </label>
            </div>
          </div>
        </aside>

        <main className="shop-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ShopLayout;
