/**
 * Products API - RTK Query with Axios
 * Endpoints for product operations (external API - dummyjson.com)
 */

import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery, externalAxiosInstance } from "./config";

const normalizeApiResponse = (response) => {
  if (typeof response === "string") {
    try {
      return JSON.parse(response);
    } catch (error) {
      console.warn("Unexpected string response from products API:", response);
      return null;
    }
  }
  return response;
};

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: axiosBaseQuery(externalAxiosInstance),
  tagTypes: ["Products", "ProductsByCategory", "SearchResults"],
  endpoints: (builder) => ({
    /**
     * Get all products
     * @returns {Promise} List of all products
     */
    getAllProducts: builder.query({
      query: () => "/products",
      // Ensure product prices are normalized and add displayPrice locally
      transformResponse: (response) => {
        const normalizedResponse = normalizeApiResponse(response);
        const items =
          normalizedResponse?.products ??
          (Array.isArray(normalizedResponse) ? normalizedResponse : []);
        const formatted = items.map((p) => ({
          ...p,
          price: Number(p.price),
          displayPrice: `$${Number(p.price).toFixed(2)}`
        }));
        return { ...(normalizedResponse || {}), products: formatted };
      },
      providesTags: (result) => {
        const items = result?.products ?? (Array.isArray(result) ? result : []);
        return items.length
          ? [
              ...items.map(({ id }) => ({ type: "Products", id })),
              { type: "Products", id: "LIST" }
            ]
          : [{ type: "Products", id: "LIST" }];
      }
    }),

    /**
     * Get a single product by ID
     * @param {string|number} productId - Product ID
     * @returns {Promise} Single product details
     */
    getProductById: builder.query({
      query: (productId) => `/products/${productId}`,
      // Normalize single product response so components can rely on consistent types
      transformResponse: (response) => {
        console.log(response, "this is getProductById response");
        const normalizedResponse = normalizeApiResponse(response);
        const item =
          normalizedResponse && typeof normalizedResponse === "object"
            ? normalizedResponse
            : {};
        const price = Number(item.price || 0);
        const rating = Number(item.rating || 0);
        const discountPercentage = Number(item.discountPercentage || 0);
        return {
          ...item,
          price,
          rating,
          discountPercentage,
          displayPrice: `$${price.toFixed(2)}`
        };
      },
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
