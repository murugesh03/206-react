/**
 * RTK Query Base Configuration with Axios
 * Centralized configuration for all API clients using Axios
 */

import axios from "axios";

// ============================================
// API BASE URLS
// ============================================

export const PRODUCTS_API_BASE = "https://dummyjson.com";
export const BACKEND_API_BASE =
  process.env.REACT_APP_API_URL || "http://localhost:5000/api";

// ============================================
// AXIOS INSTANCES
// ============================================

/**
 * Axios instance for external APIs (like dummyjson.com)
 * No authentication required
 */
export const externalAxiosInstance = axios.create({
  baseURL: PRODUCTS_API_BASE,
  timeout: 10000,
  responseType: "json",
  headers: {
    "Content-Type": "application/json"
  }
});

/**
 * Axios instance for backend API
 * Will add token dynamically via interceptors
 */
export const backendAxiosInstance = axios.create({
  baseURL: BACKEND_API_BASE,
  timeout: 10000,
  responseType: "json",
  headers: {
    "Content-Type": "application/json"
  }
});

// ============================================
// AXIOS INTERCEPTORS
// ============================================

/**
 * Response interceptor for error handling
 */
backendAxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

externalAxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("External API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// ============================================
// CUSTOM BASE QUERY WITH AXIOS FOR RTK QUERY
// ============================================

/**
 * Generic Axios Base Query for RTK Query
 * @param {AxiosInstance} axiosInstance - Configured axios instance
 * @returns {Function} Base query function compatible with RTK Query
 */
const normalizeResponseData = (payload) => {
  if (typeof payload === "string") {
    try {
      return JSON.parse(payload);
    } catch {
      return payload;
    }
  }
  return payload;
};

export const axiosBaseQuery = (axiosInstance) => async (arg) => {
  const {
    url,
    method = "get",
    data,
    body,
    params
  } = typeof arg === "string" ? { url: arg } : arg;
  const requestData = data ?? body;
  try {
    console.log("RTK Query -> request:", {
      url,
      method,
      params,
      data: requestData
    });
    const response = await axiosInstance({
      url,
      method,
      data: requestData,
      params
    });
    const normalizedData = normalizeResponseData(response?.data ?? response);
    console.log("RTK Query -> response:", {
      url,
      status: response.status,
      data: Array.isArray(normalizedData)
        ? `array(${normalizedData.length})`
        : typeof normalizedData
    });
    return { data: normalizedData };
  } catch (error) {
    console.error("RTK Query -> error:", {
      url,
      method,
      error: error?.message
    });
    return {
      error: {
        status: error.response?.status,
        data: error.response?.data || error.message
      }
    };
  }
};

/**
 * Axios Base Query with Auth for RTK Query
 * Returns a function that can be used as baseQuery in createApi
 * @returns {Function} Base query function that receives { getState }
 */
export const axiosBaseQueryWithAuth = async (
  { url, method = "get", data, params },
  api,
  extraOptions
) => {
  try {
    // Get token from Redux state
    const state = api.getState();
    const token = state?.auth?.token;

    const config = {
      url,
      method,
      data,
      params,
      headers: {
        "Content-Type": "application/json"
      }
    };

    // Add authorization header if token exists
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log("RTK Query (auth) -> request:", { url, method, params, data });
    const response = await backendAxiosInstance(config);
    const normalizedData = normalizeResponseData(response?.data ?? response);
    console.log("RTK Query (auth) -> response:", {
      url,
      status: response.status,
      data: Array.isArray(normalizedData)
        ? `array(${normalizedData.length})`
        : typeof normalizedData
    });
    return { data: normalizedData };
  } catch (error) {
    return {
      error: {
        status: error.response?.status,
        data: error.response?.data || error.message
      }
    };
  }
};

// const getProduct = async () => {
//   try {
//     const res = await axios("routepath");
//     return res.data;
//   } catch (error) {
//     console.error("Error fetching product:", error);
//     throw error;
//   }
// };
