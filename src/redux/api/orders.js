/**
 * Orders API - RTK Query
 * Endpoints for order operations (create, retrieve, cancel)
 */

import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "./config";

export const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
    /**
     * Get all user orders
     * @param {string} userId - User ID
     * @returns {Promise} List of user orders
     */
    getUserOrders: builder.query({
      query: (userId) => `/users/${userId}/orders`,
      providesTags: (result, error, userId) => [
        { type: "UserOrders", id: userId }
      ]
    }),

    /**
     * Get a specific order details
     * @param {string|number} orderId - Order ID
     * @returns {Promise} Order details
     */
    getOrderById: builder.query({
      query: (orderId) => `/orders/${orderId}`,
      providesTags: (result, error, orderId) => [{ type: "Order", id: orderId }]
    }),

    /**
     * Create a new order (checkout)
     * @param {object} orderData - Order information
     * @returns {Promise} Created order
     */
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: "/orders",
        method: "POST",
        body: orderData
      }),
      invalidatesTags: ["UserOrders"]
    }),

    /**
     * Cancel an order
     * @param {string|number} orderId - Order ID
     * @returns {Promise} Cancellation confirmation
     */
    cancelOrder: builder.mutation({
      query: (orderId) => ({
        url: `/orders/${orderId}/cancel`,
        method: "PUT"
      }),
      invalidatesTags: (result, error, orderId) => [
        { type: "Order", id: orderId }
      ]
    })
  })
});

export const {
  useGetUserOrdersQuery,
  useGetOrderByIdQuery,
  useCreateOrderMutation,
  useCancelOrderMutation
} = ordersApi;
