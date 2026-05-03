/**
 * Admin API - RTK Query
 * Endpoints for admin operations (users, orders, products, dashboard stats)
 * Requires admin authentication
 */

import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "./config";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
    /**
     * Get all users (Admin only)
     * @returns {Promise} List of all users
     */
    getAllUsers: builder.query({
      query: () => "/admin/users",
      providesTags: ["AdminUsers"]
    }),

    /**
     * Get all orders (Admin only)
     * @returns {Promise} List of all orders
     */
    getAllOrders: builder.query({
      query: () => "/admin/orders",
      providesTags: ["AdminOrders"]
    }),

    /**
     * Get dashboard statistics (Admin only)
     * @returns {Promise} Dashboard data
     */
    getDashboardStats: builder.query({
      query: () => "/admin/dashboard/stats",
      providesTags: ["DashboardStats"]
    }),

    /**
     * Add new product (Admin only)
     * @param {object} productData - Product details
     * @returns {Promise} Created product
     */
    addProduct: builder.mutation({
      query: (productData) => ({
        url: "/admin/products",
        method: "POST",
        body: productData
      }),
      invalidatesTags: ["AdminProducts"]
    }),

    /**
     * Update product (Admin only)
     * @param {object} params - productId and productData
     * @returns {Promise} Updated product
     */
    updateProduct: builder.mutation({
      query: ({ productId, productData }) => ({
        url: `/admin/products/${productId}`,
        method: "PUT",
        body: productData
      }),
      invalidatesTags: (result, error, { productId }) => [
        { type: "AdminProducts", id: productId }
      ]
    }),

    /**
     * Delete product (Admin only)
     * @param {string|number} productId - Product ID
     * @returns {Promise} Deletion confirmation
     */
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `/admin/products/${productId}`,
        method: "DELETE"
      }),
      invalidatesTags: (result, error, productId) => [
        { type: "AdminProducts", id: productId }
      ]
    })
  })
});

export const {
  useGetAllUsersQuery,
  useGetAllOrdersQuery,
  useGetDashboardStatsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation
} = adminApi;
