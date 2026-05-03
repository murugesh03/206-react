/**
 * RTK Query Base Configuration
 * Centralized configuration for all API clients
 */

import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// ============================================
// API BASE URLS
// ============================================

export const PRODUCTS_API_BASE = "https://dummyjson.com";
export const BACKEND_API_BASE =
  process.env.REACT_APP_API_URL || "http://localhost:5000/api";

// ============================================
// BASE QUERY CONFIGURATIONS
// ============================================

/**
 * Base query for backend API with automatic token management
 * Includes Authorization header from Redux auth state
 */
export const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: BACKEND_API_BASE,
  prepareHeaders: (headers, { getState }) => {
    // Get token from Redux auth state if available
    const token = getState()?.auth?.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    headers.set("Content-Type", "application/json");
    return headers;
  }
});

/**
 * Base query for external APIs (like dummyjson.com)
 * No authentication required
 */
export const externalBaseQuery = fetchBaseQuery({
  baseUrl: PRODUCTS_API_BASE,
  prepareHeaders: (headers) => {
    headers.set("Content-Type", "application/json");
    return headers;
  }
});
