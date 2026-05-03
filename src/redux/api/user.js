/**
 * User Profile API - RTK Query
 * Endpoints for user profile and settings operations
 */

import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "./config";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
    /**
     * Get user profile information
     * @param {string} userId - User ID
     * @returns {Promise} User profile data
     */
    getProfile: builder.query({
      query: (userId) => `/users/${userId}/profile`,
      providesTags: (result, error, userId) => [
        { type: "UserProfile", id: userId }
      ]
    }),

    /**
     * Update user profile
     * @param {object} params - userId and profileData
     * @returns {Promise} Updated profile data
     */
    updateProfile: builder.mutation({
      query: ({ userId, profileData }) => ({
        url: `/users/${userId}/profile`,
        method: "PUT",
        body: profileData
      }),
      invalidatesTags: (result, error, { userId }) => [
        { type: "UserProfile", id: userId }
      ]
    }),

    /**
     * Update user settings
     * @param {object} params - userId and settings
     * @returns {Promise} Updated settings
     */
    updateSettings: builder.mutation({
      query: ({ userId, settings }) => ({
        url: `/users/${userId}/settings`,
        method: "PUT",
        body: settings
      }),
      invalidatesTags: (result, error, { userId }) => [
        { type: "UserProfile", id: userId }
      ]
    })
  })
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUpdateSettingsMutation
} = userApi;
