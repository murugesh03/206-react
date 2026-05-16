/**
 * Axios Service
 * Provides standalone axios instances for direct API calls
 * Useful for components that need custom request handling outside of RTK Query
 */

import {
  backendAxiosInstance,
  externalAxiosInstance
} from "../redux/api/config";

// ============================================
// EXTERNAL API SERVICE
// ============================================

/**
 * External API Service for public APIs (DummyJSON, etc.)
 */
export const externalApiService = {
  /**
   * Get all products
   */
  getAllProducts: async () => {
    try {
      const response = await externalAxiosInstance.get("/products");
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },

  /**
   * Get product by ID
   */
  getProductById: async (productId) => {
    try {
      const response = await externalAxiosInstance.get(
        `/products/${productId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching product:", error);
      throw error;
    }
  },

  /**
   * Search products
   */
  searchProducts: async (query) => {
    try {
      const response = await externalAxiosInstance.get(
        `/products/search?q=${query}`
      );
      return response.data;
    } catch (error) {
      console.error("Error searching products:", error);
      throw error;
    }
  },

  /**
   * Get products by category
   */
  getProductsByCategory: async (category) => {
    try {
      const response = await externalAxiosInstance.get(
        `/products/category/${category}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching products by category:", error);
      throw error;
    }
  },

  /**
   * Add new product
   */
  createProduct: async (productData) => {
    try {
      const response = await externalAxiosInstance.post(
        "/products/add",
        productData
      );
      return response.data;
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  },

  /**
   * Update product
   */
  updateProduct: async (productId, productData) => {
    try {
      const response = await externalAxiosInstance.put(
        `/products/${productId}`,
        productData
      );
      return response.data;
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  },

  /**
   * Delete product
   */
  deleteProduct: async (productId) => {
    try {
      const response = await externalAxiosInstance.delete(
        `/products/${productId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  }
};

// ============================================
// BACKEND API SERVICE
// ============================================

/**
 * Backend API Service with authentication
 * Token is added via interceptor or manually when available
 */
export const backendApiService = {
  /**
   * Set authorization token
   * Call this after login to update the token
   */
  setAuthToken: (token) => {
    if (token) {
      backendAxiosInstance.defaults.headers.common["Authorization"] =
        `Bearer ${token}`;
    } else {
      delete backendAxiosInstance.defaults.headers.common["Authorization"];
    }
  },

  /**
   * Clear authorization token
   * Call this on logout
   */
  clearAuthToken: () => {
    delete backendAxiosInstance.defaults.headers.common["Authorization"];
  },

  /**
   * User login
   */
  login: async (credentials) => {
    try {
      const response = await backendAxiosInstance.post(
        "/auth/login",
        credentials
      );
      return response.data;
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  },

  /**
   * User signup
   */
  signup: async (userData) => {
    try {
      const response = await backendAxiosInstance.post(
        "/auth/signup",
        userData
      );
      return response.data;
    } catch (error) {
      console.error("Error signing up:", error);
      throw error;
    }
  },

  /**
   * User logout
   */
  logout: async () => {
    try {
      const response = await backendAxiosInstance.post("/auth/logout");
      return response.data;
    } catch (error) {
      console.error("Error logging out:", error);
      throw error;
    }
  },

  /**
   * Get user profile
   */
  getProfile: async () => {
    try {
      const response = await backendAxiosInstance.get("/user/profile");
      return response.data;
    } catch (error) {
      console.error("Error fetching profile:", error);
      throw error;
    }
  },

  /**
   * Update user profile
   */
  updateProfile: async (profileData) => {
    try {
      const response = await backendAxiosInstance.put(
        "/user/profile",
        profileData
      );
      return response.data;
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  },

  /**
   * Get user cart
   */
  getCart: async () => {
    try {
      const response = await backendAxiosInstance.get("/cart");
      return response.data;
    } catch (error) {
      console.error("Error fetching cart:", error);
      throw error;
    }
  },

  /**
   * Add to cart
   */
  addToCart: async (cartData) => {
    try {
      const response = await backendAxiosInstance.post("/cart", cartData);
      return response.data;
    } catch (error) {
      console.error("Error adding to cart:", error);
      throw error;
    }
  },

  /**
   * Update cart item
   */
  updateCartItem: async (itemId, quantity) => {
    try {
      const response = await backendAxiosInstance.put(`/cart/${itemId}`, {
        quantity
      });
      return response.data;
    } catch (error) {
      console.error("Error updating cart item:", error);
      throw error;
    }
  },

  /**
   * Remove from cart
   */
  removeFromCart: async (itemId) => {
    try {
      const response = await backendAxiosInstance.delete(`/cart/${itemId}`);
      return response.data;
    } catch (error) {
      console.error("Error removing from cart:", error);
      throw error;
    }
  },

  /**
   * Get user orders
   */
  getOrders: async () => {
    try {
      const response = await backendAxiosInstance.get("/orders");
      return response.data;
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
  },

  /**
   * Create new order
   */
  createOrder: async (orderData) => {
    try {
      const response = await backendAxiosInstance.post("/orders", orderData);
      return response.data;
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  },

  /**
   * Get wishlist
   */
  getWishlist: async () => {
    try {
      const response = await backendAxiosInstance.get("/wishlist");
      return response.data;
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      throw error;
    }
  },

  /**
   * Add to wishlist
   */
  addToWishlist: async (productId) => {
    try {
      const response = await backendAxiosInstance.post("/wishlist", {
        productId
      });
      return response.data;
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      throw error;
    }
  },

  /**
   * Remove from wishlist
   */
  removeFromWishlist: async (productId) => {
    try {
      const response = await backendAxiosInstance.delete(
        `/wishlist/${productId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      throw error;
    }
  }
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Set backend token globally
 * Use this in your auth slice when token changes
 */
export const setGlobalAuthToken = (token) => {
  backendApiService.setAuthToken(token);
};

/**
 * Clear backend token globally
 * Use this in your auth slice on logout
 */
export const clearGlobalAuthToken = () => {
  backendApiService.clearAuthToken();
};

export default {
  external: externalApiService,
  backend: backendApiService,
  setGlobalAuthToken,
  clearGlobalAuthToken
};
