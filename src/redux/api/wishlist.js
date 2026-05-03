/**
 * Wishlist API - RTK Query
 * Endpoints for wishlist operations (add, remove, retrieve)
 */

import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "./config";

export const wishlistApi = createApi({
  reducerPath: "wishlistApi",
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
    /**
     * Get user's wishlist
     * @param {string} userId - User ID
     * @returns {Promise} Wishlist items
     */
    getWishlist: builder.query({
      query: (userId) => `/users/${userId}/wishlist`,
      providesTags: (result, error, userId) => [
        { type: "Wishlist", id: userId }
      ]
    }),

    /**
     * Add item to wishlist
     * @param {object} params - userId and productId
     * @returns {Promise} Updated wishlist
     */
    addToWishlist: builder.mutation({
      query: ({ userId, productId }) => ({
        url: `/users/${userId}/wishlist`,
        method: "POST",
        body: { productId }
      }),
      invalidatesTags: (result, error, { userId }) => [
        { type: "Wishlist", id: userId }
      ]
    }),

    /**
     * Remove item from wishlist
     * @param {object} params - userId and productId
     * @returns {Promise} Updated wishlist
     */
    removeFromWishlist: builder.mutation({
      query: ({ userId, productId }) => ({
        url: `/users/${userId}/wishlist/${productId}`,
        method: "DELETE"
      }),
      invalidatesTags: (result, error, { userId }) => [
        { type: "Wishlist", id: userId }
      ]
    })
  })
});

export const {
  useGetWishlistQuery,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation
} = wishlistApi;
