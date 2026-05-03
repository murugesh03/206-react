/**
 * Authentication API - RTK Query
 * Endpoints for authentication operations (login, signup, logout, token verification)
 */

import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "./config";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
    /**
     * User login
     * @param {object} credentials - Email and password
     * @returns {Promise} User data and authentication token
     */
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials
      }),
      invalidatesTags: ["Auth"]
    }),

    /**
     * User registration/signup
     * @param {object} userData - User registration data
     * @returns {Promise} Created user data and token
     */
    signup: builder.mutation({
      query: (userData) => ({
        url: "/auth/signup",
        method: "POST",
        body: userData
      })
    }),

    /**
     * User logout
     * @returns {Promise} Logout confirmation
     */
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST"
      }),
      invalidatesTags: ["Auth"]
    }),

    /**
     * Verify authentication token
     * @returns {Promise} Token validity and user data
     */
    verifyToken: builder.query({
      query: () => "/auth/verify",
      providesTags: ["Auth"]
    })
  })
});

export const {
  useLoginMutation,
  useSignupMutation,
  useLogoutMutation,
  useVerifyTokenQuery
} = authApi;
