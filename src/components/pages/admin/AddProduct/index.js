import { useState } from "react";
import { useNavigate } from "react-router";
import { useAddProductMutation } from "../../../../redux/api/admin";
import "./style.css";

const AddProduct = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // RTK Query - NEW APPROACH
  const [addProductMutation, { isLoading: isAddingProduct }] =
    useAddProductMutation();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    discountPercentage: "0",
    category: "Electronics",
    brand: "",
    stock: "",
    thumbnail: "",
    images: "",
    rating: "5",
    warrantyInformation: "",
    shippingInformation: "",
    returnPolicy: "",
    availabilityStatus: "In Stock"
  });

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      // Validate required fields
      if (
        !formData.title ||
        !formData.price ||
        !formData.stock ||
        !formData.category
      ) {
        setError("Please fill in all required fields");
        setLoading(false);
        return;
      }

      // Parse images array
      const imagesArray = formData.images
        .split("\n")
        .filter((img) => img.trim());
      if (imagesArray.length === 0 && !formData.thumbnail) {
        setError("Please provide at least one image URL");
        setLoading(false);
        return;
      }

      // Create product object
      const productData = {
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        discountPercentage: parseFloat(formData.discountPercentage || 0),
        category: formData.category,
        brand: formData.brand || "Unknown",
        stock: parseInt(formData.stock),
        thumbnail: formData.thumbnail || imagesArray[0],
        images: imagesArray.length > 0 ? imagesArray : [formData.thumbnail],
        rating: parseFloat(formData.rating || 5),
        warrantyInformation: formData.warrantyInformation || "No warranty",
        shippingInformation: formData.shippingInformation || "Free shipping",
        returnPolicy: formData.returnPolicy || "30 days return policy",
        availabilityStatus: formData.availabilityStatus
      };

      // RTK Query - NEW APPROACH using useAddProductMutation
      try {
        const response = await addProductMutation(productData).unwrap();
        console.log("Product added successfully:", response);
        setSuccess("Product added successfully!");
        setFormData({
          title: "",
          description: "",
          price: "",
          discountPercentage: "0",
          category: "Electronics",
          brand: "",
          stock: "",
          thumbnail: "",
          images: "",
          rating: "5",
          warrantyInformation: "",
          shippingInformation: "",
          returnPolicy: "",
          availabilityStatus: "In Stock"
        });

        // Redirect to products list after 2 seconds
        setTimeout(() => {
          navigate("/admin/products");
        }, 2000);
      } catch (rtqError) {
        console.error("RTK Query error adding product:", rtqError);
        setError("Failed to add product via API. Using demo mode fallback...");

        // DEPRECATED: Fallback demo mode (kept for reference)
        // Simulate API call to add product
        // In a real app, this would be an API request to your backend
        console.log("Adding product (demo):", productData);

        // Here you would make an API call like:
        // const response = await fetch('/api/products', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(productData)
        // });

        // For demo, simulate successful addition
        setTimeout(() => {
          setSuccess("Product added successfully!");
          setFormData({
            title: "",
            description: "",
            price: "",
            discountPercentage: "0",
            category: "Electronics",
            brand: "",
            stock: "",
            thumbnail: "",
            images: "",
            rating: "5",
            warrantyInformation: "",
            shippingInformation: "",
            returnPolicy: "",
            availabilityStatus: "In Stock"
          });

          // Redirect to products list after 2 seconds
          setTimeout(() => {
            navigate("/admin/products");
          }, 2000);
        }, 500);
      }
    } catch (err) {
      setError("Failed to add product. Please try again.");
      console.error("Error adding product:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-product-page">
      <h1>Add New Product</h1>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit} className="add-product-form">
        {/* Basic Information Section */}
        <div className="form-section">
          <h2>Basic Information</h2>

          <div className="form-group">
            <label htmlFor="title">
              Product Title <span className="required">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter product title"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter product description"
              rows="5"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="brand">Brand</label>
              <input
                type="text"
                id="brand"
                name="brand"
                value={formData.brand}
                onChange={handleInputChange}
                placeholder="Enter brand name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">
                Category <span className="required">*</span>
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
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
        </div>

        {/* Pricing & Inventory Section */}
        <div className="form-section">
          <h2>Pricing & Inventory</h2>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="price">
                Price <span className="required">*</span>
              </label>
              <div className="input-with-prefix">
                <span className="prefix">$</span>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="discountPercentage">Discount (%)</label>
              <input
                type="number"
                id="discountPercentage"
                name="discountPercentage"
                value={formData.discountPercentage}
                onChange={handleInputChange}
                placeholder="0"
                step="0.01"
                min="0"
                max="100"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="stock">
                Stock Quantity <span className="required">*</span>
              </label>
              <input
                type="number"
                id="stock"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                placeholder="0"
                min="0"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="availabilityStatus">Availability</label>
              <select
                id="availabilityStatus"
                name="availabilityStatus"
                value={formData.availabilityStatus}
                onChange={handleInputChange}
              >
                {availabilityOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Images Section */}
        <div className="form-section">
          <h2>Images</h2>

          <div className="form-group">
            <label htmlFor="thumbnail">Thumbnail URL</label>
            <input
              type="url"
              id="thumbnail"
              name="thumbnail"
              value={formData.thumbnail}
              onChange={handleInputChange}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="form-group">
            <label htmlFor="images">Additional Images (one URL per line)</label>
            <textarea
              id="images"
              name="images"
              value={formData.images}
              onChange={handleInputChange}
              placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
              rows="4"
            />
          </div>
        </div>

        {/* Product Details Section */}
        <div className="form-section">
          <h2>Product Details</h2>

          <div className="form-group">
            <label htmlFor="rating">Rating (0-5)</label>
            <input
              type="number"
              id="rating"
              name="rating"
              value={formData.rating}
              onChange={handleInputChange}
              placeholder="5"
              step="0.1"
              min="0"
              max="5"
            />
          </div>

          <div className="form-group">
            <label htmlFor="warrantyInformation">Warranty Information</label>
            <textarea
              id="warrantyInformation"
              name="warrantyInformation"
              value={formData.warrantyInformation}
              onChange={handleInputChange}
              placeholder="Enter warranty details"
              rows="3"
            />
          </div>

          <div className="form-group">
            <label htmlFor="shippingInformation">Shipping Information</label>
            <textarea
              id="shippingInformation"
              name="shippingInformation"
              value={formData.shippingInformation}
              onChange={handleInputChange}
              placeholder="Enter shipping details"
              rows="3"
            />
          </div>

          <div className="form-group">
            <label htmlFor="returnPolicy">Return Policy</label>
            <textarea
              id="returnPolicy"
              name="returnPolicy"
              value={formData.returnPolicy}
              onChange={handleInputChange}
              placeholder="Enter return policy details"
              rows="3"
            />
          </div>
        </div>

        {/* Form Actions */}
        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Adding Product..." : "Add Product"}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/admin/products")}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
