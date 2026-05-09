/**
 * Products API - RTK Query
 * Endpoints for product operations (external API - dummyjson.com)
 */

import { createApi } from "@reduxjs/toolkit/query/react";
import { externalBaseQuery } from "./config";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: externalBaseQuery,
  tagTypes: ["Products", "ProductsByCategory", "SearchResults"],
  endpoints: (builder) => ({
    /**
     * Get all products
     * @returns {Promise} List of all products
     */
    getAllProducts: builder.query({
      query: () => "/products",
      providesTags: (result) =>
        result
          ? [
              ...result.products.map(({ id }) => ({
                type: "Products",
                id
              })),
              { type: "Products", id: "LIST" }
            ]
          : [{ type: "Products", id: "LIST" }]
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
    }),

    /**
     * Create a new product
     * @param {object} productData - Product details (title, description, price, category, etc.)
     * @returns {Promise} Created product with ID
     */
    createProduct: builder.mutation({
      query: (productData) => ({
        url: "/products/add",
        method: "POST",
        body: productData
      }),
      invalidatesTags: [{ type: "Products", id: "LIST" }]
    }),

    /**
     * Update a product
     * @param {object} params - productId and productData
     * @returns {Promise} Updated product details
     */
    updateProduct: builder.mutation({
      query: ({ productId, productData }) => ({
        url: `/products/${productId}`,
        method: "PUT",
        body: productData
      }),
      invalidatesTags: (result, error, { productId }) => [
        { type: "Products", id: "LIST" },
        { type: "Products", id: productId }
      ]
    }),

    /**
     * Delete a product
     * @param {string|number} productId - Product ID to delete
     * @returns {Promise} Deleted product with isDeleted & deletedOn keys
     */
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `/products/${productId}`,
        method: "DELETE"
      }),
      invalidatesTags: (result, error, productId) => [
        { type: "Products", id: "LIST" },
        { type: "Products", id: productId }
      ]
    })
  })
});

console.log(productsApi, "this is productsApi");
// Export auto-generated hooks
export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useGetProductsByCategoryQuery,
  useSearchProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation
} = productsApi;
