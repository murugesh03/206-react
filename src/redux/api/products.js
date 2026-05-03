/**
 * Products API - RTK Query
 * Endpoints for product operations (external API - dummyjson.com)
 */

import { createApi } from "@reduxjs/toolkit/query/react";
import { externalBaseQuery } from "./config";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: externalBaseQuery,
  endpoints: (builder) => ({
    /**
     * Get all products
     * @returns {Promise} List of all products
     */
    getAllProducts: builder.query({
      query: () => "/products",
      providesTags: ["Products"]
    }),

    /**
     * Get a single product by ID
     * @param {string|number} productId - Product ID
     * @returns {Promise} Single product details
     */
    getProductById: builder.query({
      query: (productId) => `/products/${productId}`,
      providesTags: (result, error, productId) => [
        { type: "Products", id: productId }
      ]
    }),

    /**
     * Get products by category
     * @param {string} category - Category name
     * @returns {Promise} Products in the specified category
     */
    getProductsByCategory: builder.query({
      query: (category) => `/products/category/${category}`,
      providesTags: (result, error, category) => [
        { type: "ProductsByCategory", id: category }
      ]
    }),

    /**
     * Search products
     * @param {string} query - Search query string
     * @returns {Promise} Search results
     */
    searchProducts: builder.query({
      query: (searchQuery) => `/products/search?q=${searchQuery}`,
      providesTags: ["SearchResults"]
    })
  })
});

// Export auto-generated hooks
export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useGetProductsByCategoryQuery,
  useSearchProductsQuery
} = productsApi;
