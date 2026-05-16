import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
  useUpdateProductMutation
} from "../../../../redux/api/products";
import "./style.css";

const AdminProducts = () => {
  const {
    data: allProductsData,
    isLoading,
    isFetching,
    error,
    refetch
  } = useGetAllProductsQuery();
  const [updateProductMutation, updateResponse] = useUpdateProductMutation();
  const [deleteProductMutation, deleteResponse] = useDeleteProductMutation();

  // Edit Modal State
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: "",
    description: "",
    price: "",
    discountPercentage: "0",
    category: "Electronics",
    brand: "",
    stock: "",
    thumbnail: "",
    rating: "5",
    warrantyInformation: "",
    shippingInformation: "",
    returnPolicy: "",
    availabilityStatus: "In Stock"
  });

  // Delete Confirmation State
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const categories = [
    "Electronics",
    "Accessories",
    "Computers",
    "Audio",
    "Wearables",
    "Fashion",
    "Home",
    "Sports",
    "Books",
    "Other"
  ];

  const availabilityOptions = [
    "In Stock",
    "Out of Stock",
    "Limited Stock",
    "Pre-order"
  ];

  // Handle Edit Button Click
  const handleEditClick = (product) => {
    setEditingProduct(product);
    setEditFormData({
      title: product.title,
      description: product.description || "",
      price: product.price,
      discountPercentage: product.discountPercentage || 0,
      category: product.category,
      brand: product.brand || "",
      stock: product.stock,
      thumbnail: product.thumbnail || "",
      rating: product.rating || 5,
      warrantyInformation: product.warrantyInformation || "",
      shippingInformation: product.shippingInformation || "",
      returnPolicy: product.returnPolicy || "",
      availabilityStatus: product.availabilityStatus || "In Stock"
    });
    setShowEditModal(true);
  };

  // Handle Edit Form Change
  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle Save Edit
  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editingProduct) return;

    try {
      const updatedData = {
        title: editFormData.title,
        description: editFormData.description,
        price: parseFloat(editFormData.price),
        discountPercentage: parseFloat(editFormData.discountPercentage || 0),
        category: editFormData.category,
        brand: editFormData.brand || "Unknown",
        stock: parseInt(editFormData.stock),
        thumbnail: editFormData.thumbnail,
        rating: parseFloat(editFormData.rating || 5),
        warrantyInformation: editFormData.warrantyInformation || "No warranty",
        shippingInformation:
          editFormData.shippingInformation || "Free shipping",
        returnPolicy: editFormData.returnPolicy || "30 days return policy",
        availabilityStatus: editFormData.availabilityStatus
      };

      await updateProductMutation({
        productId: editingProduct.id,
        productData: updatedData
      }).unwrap();

      setShowEditModal(false);
      setEditingProduct(null);
    } catch (err) {
      console.error("Error updating product:", err);
      alert("Failed to update product");
    }
  };

  // Handle Delete Button Click
  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setShowDeleteConfirm(true);
  };

  // Handle Confirm Delete
  const handleConfirmDelete = async () => {
    if (!productToDelete) return;

    try {
      await deleteProductMutation(productToDelete.id).unwrap();
      setShowDeleteConfirm(false);
      setProductToDelete(null);
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("Failed to delete product");
    }
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  // Pagination Calculations
  const products = allProductsData?.products || [];
  const totalProducts = products.length;
  const totalPages = Math.ceil(totalProducts / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = products.slice(startIndex, endIndex);

  // const staticStartIndex = lastIndex + 1;
  // const staticLastIndex = staticStartIndex + itemsPerPage - 1;
  // Handle Page Change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Generate Page Numbers
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= maxPagesToShow; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - maxPagesToShow + 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="admin-products">
      <div className="admin-header">
        <h1>Products Management</h1>
        <NavLink to="/admin/add-product" className="btn btn-primary">
          + Add New Product
        </NavLink>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="loading-container">
          <p>⏳ Loading products...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="alert alert-error">
          <p>❌ Failed to load products. Please try again.</p>
        </div>
      )}

      {/* Products Table */}
      {!isLoading &&
      allProductsData?.products &&
      allProductsData.products.length > 0 ? (
        <div className="products-table-container">
          {isFetching && (
            <div className="refetching-indicator">🔄 Updating products...</div>
          )}

          <table className="products-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Thumbnail</th>
                <th>Title</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Rating</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProducts.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>
                    {product.thumbnail ? (
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="product-thumbnail"
                        style={{
                          width: "40px",
                          height: "40px",
                          objectFit: "cover",
                          borderRadius: "4px"
                        }}
                      />
                    ) : (
                      <span>—</span>
                    )}
                  </td>
                  <td className="product-title">{product.title}</td>
                  <td>{product.category}</td>
                  <td className="product-price">
                    ${product.price?.toFixed(2)}
                  </td>
                  <td>
                    <span
                      className={`stock-badge ${product.stock > 0 ? "in-stock" : "out-stock"}`}
                    >
                      {product.stock}
                    </span>
                  </td>
                  <td>⭐ {product.rating?.toFixed(1)}</td>
                  <td className="action-buttons">
                    <button
                      className="btn btn-small btn-edit"
                      onClick={() => handleEditClick(product)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-small btn-delete"
                      onClick={() => handleDeleteClick(product)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="pagination-container">
              <div className="pagination-info">
                Showing {startIndex + 1} to {Math.min(endIndex, totalProducts)}{" "}
                of {totalProducts} products
              </div>

              <div className="pagination-controls">
                <button
                  className="btn btn-pagination"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  ← Previous
                </button>

                <div className="page-numbers">
                  {getPageNumbers().map((page, index) => (
                    <button
                      key={index}
                      className={`page-btn ${page === currentPage ? "active" : ""} ${page === "..." ? "dots" : ""}`}
                      onClick={() =>
                        typeof page === "number" && handlePageChange(page)
                      }
                      disabled={page === "..."}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  className="btn btn-pagination"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next →
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        !isLoading && (
          <div className="no-products">
            <p>📦 No products available. Add your first product!</p>
          </div>
        )
      )}

      {/* Edit Modal */}
      {showEditModal && editingProduct && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Edit Product</h2>
              <button
                className="modal-close"
                onClick={() => setShowEditModal(false)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="edit-product-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={editFormData.title}
                    onChange={handleEditFormChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Brand</label>
                  <input
                    type="text"
                    name="brand"
                    value={editFormData.brand}
                    onChange={handleEditFormChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={editFormData.description}
                  onChange={handleEditFormChange}
                  rows="3"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Price *</label>
                  <input
                    type="number"
                    name="price"
                    value={editFormData.price}
                    onChange={handleEditFormChange}
                    step="0.01"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Discount (%)</label>
                  <input
                    type="number"
                    name="discountPercentage"
                    value={editFormData.discountPercentage}
                    onChange={handleEditFormChange}
                    step="0.01"
                    min="0"
                    max="100"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Stock *</label>
                  <input
                    type="number"
                    name="stock"
                    value={editFormData.stock}
                    onChange={handleEditFormChange}
                    min="0"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Category *</label>
                  <select
                    name="category"
                    value={editFormData.category}
                    onChange={handleEditFormChange}
                    required
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Rating (0-5)</label>
                  <input
                    type="number"
                    name="rating"
                    value={editFormData.rating}
                    onChange={handleEditFormChange}
                    step="0.1"
                    min="0"
                    max="5"
                  />
                </div>
                <div className="form-group">
                  <label>Availability</label>
                  <select
                    name="availabilityStatus"
                    value={editFormData.availabilityStatus}
                    onChange={handleEditFormChange}
                  >
                    {availabilityOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Thumbnail URL</label>
                <input
                  type="url"
                  name="thumbnail"
                  value={editFormData.thumbnail}
                  onChange={handleEditFormChange}
                />
              </div>

              <div className="form-group">
                <label>Warranty Information</label>
                <textarea
                  name="warrantyInformation"
                  value={editFormData.warrantyInformation}
                  onChange={handleEditFormChange}
                  rows="2"
                />
              </div>

              <div className="form-group">
                <label>Shipping Information</label>
                <textarea
                  name="shippingInformation"
                  value={editFormData.shippingInformation}
                  onChange={handleEditFormChange}
                  rows="2"
                />
              </div>

              <div className="form-group">
                <label>Return Policy</label>
                <textarea
                  name="returnPolicy"
                  value={editFormData.returnPolicy}
                  onChange={handleEditFormChange}
                  rows="2"
                />
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={updateResponse.isLoading}
                >
                  {updateResponse.isLoading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && productToDelete && (
        <div
          className="modal-overlay"
          onClick={() => setShowDeleteConfirm(false)}
        >
          <div className="modal-confirm" onClick={(e) => e.stopPropagation()}>
            <h2>⚠️ Confirm Delete</h2>
            <p>
              Are you sure you want to delete{" "}
              <strong>{productToDelete.title}</strong>?
            </p>
            <p style={{ color: "#999", fontSize: "0.9rem" }}>
              This action cannot be undone.
            </p>
            <div className="confirm-actions">
              <button
                className="btn btn-secondary"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-delete"
                onClick={handleConfirmDelete}
                disabled={deleteResponse.isLoading}
              >
                {deleteResponse.isLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
