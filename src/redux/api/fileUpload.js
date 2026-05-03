/**
 * File Upload API - RTK Query
 * Endpoints for file upload operations (images, avatars)
 */

import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "./config";

export const fileUploadApi = createApi({
  reducerPath: "fileUploadApi",
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
    /**
     * Upload product image
     * @param {FormData} formData - File data
     * @returns {Promise} Upload confirmation with file URL
     */
    uploadProductImage: builder.mutation({
      query: (formData) => ({
        url: "/upload/product-image",
        method: "POST",
        body: formData,
        headers: {
          // Remove Content-Type to let browser set it with boundary for multipart
        }
      })
    }),

    /**
     * Upload user avatar
     * @param {FormData} formData - Avatar file data
     * @returns {Promise} Upload confirmation with avatar URL
     */
    uploadUserAvatar: builder.mutation({
      query: (formData) => ({
        url: "/upload/user-avatar",
        method: "POST",
        body: formData,
        headers: {
          // Remove Content-Type to let browser set it with boundary for multipart
        }
      })
    })
  })
});

export const { useUploadProductImageMutation, useUploadUserAvatarMutation } =
  fileUploadApi;
