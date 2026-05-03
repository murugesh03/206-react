/**
 * Cart API - RTK Query
 * Endpoints for shopping cart operations (add, remove, update, clear)
 */

import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "./config";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
    /**
     * Get user's cart
     * @param {string} userId - User ID
     * @returns {Promise} Cart items
     */
    getCart: builder.query({
      query: (userId) => `/users/${userId}/cart`,
      providesTags: (result, error, userId) => [{ type: "Cart", id: userId }]
    }),

    /**
     * Add item to cart
     * @param {object} params - userId and cartItem
     * @returns {Promise} Updated cart
     */
    addToCart: builder.mutation({
      query: ({ userId, cartItem }) => ({
        url: `/users/${userId}/cart`,
        method: "POST",
        body: cartItem
      }),
      invalidatesTags: (result, error, { userId }) => [
        { type: "Cart", id: userId }
      ]
    }),

    /**
     * Remove item from cart
     * @param {object} params - userId and itemId
     * @returns {Promise} Updated cart
     */
    removeFromCart: builder.mutation({
      query: ({ userId, itemId }) => ({
        url: `/users/${userId}/cart/${itemId}`,
        method: "DELETE"
      }),
      invalidatesTags: (result, error, { userId }) => [
        { type: "Cart", id: userId }
      ]
    }),

    /**
     * Update cart item quantity
     * @param {object} params - userId, itemId, and quantity
     * @returns {Promise} Updated cart
     */
    updateCartQuantity: builder.mutation({
      query: ({ userId, itemId, quantity }) => ({
        url: `/users/${userId}/cart/${itemId}`,
        method: "PUT",
        body: { quantity }
      }),
      invalidatesTags: (result, error, { userId }) => [
        { type: "Cart", id: userId }
      ]
    }),

    /**
     * Clear entire cart
     * @param {string} userId - User ID
     * @returns {Promise} Confirmation
     */
    clearCart: builder.mutation({
      query: (userId) => ({
        url: `/users/${userId}/cart/clear`,
        method: "DELETE"
      }),
      invalidatesTags: (result, error, userId) => [{ type: "Cart", id: userId }]
    })
  })
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useUpdateCartQuantityMutation,
  useClearCartMutation
} = cartApi;
