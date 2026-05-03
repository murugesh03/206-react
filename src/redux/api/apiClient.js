/**
 * RTK Query API Client - Central Export
 *
 * This file serves as a central hub for all API exports
 * Individual API modules are organized in separate files for better maintainability
 *
 * Files organization:
 * - config.js              : Base configurations and query setups
 * - products.js            : Products API
 * - auth.js                : Authentication API
 * - user.js                : User Profile API
 * - orders.js              : Orders API
 * - cart.js                : Cart API
 * - wishlist.js            : Wishlist API
 * - contact.js             : Contact & Support API
 * - admin.js               : Admin API
 * - fileUpload.js          : File Upload API
 * - apiClient.js (this)    : Central export file
 */

// Export configuration
export {
  BACKEND_API_BASE,
  baseQueryWithAuth,
  externalBaseQuery,
  PRODUCTS_API_BASE
} from "./config";

// Export Products API
export {
  productsApi,
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useGetProductsByCategoryQuery,
  useSearchProductsQuery
} from "./products";

// Export Auth API
export {
  authApi,
  useLoginMutation,
  useLogoutMutation,
  useSignupMutation,
  useVerifyTokenQuery
} from "./auth";

// Export User API
export {
  useGetProfileQuery,
  userApi,
  useUpdateProfileMutation,
  useUpdateSettingsMutation
} from "./user";

// Export Orders API
export {
  ordersApi,
  useCancelOrderMutation,
  useCreateOrderMutation,
  useGetOrderByIdQuery,
  useGetUserOrdersQuery
} from "./orders";

// Export Cart API
export {
  cartApi,
  useAddToCartMutation,
  useClearCartMutation,
  useGetCartQuery,
  useRemoveFromCartMutation,
  useUpdateCartQuantityMutation
} from "./cart";

// Export Wishlist API
export {
  useAddToWishlistMutation,
  useGetWishlistQuery,
  useRemoveFromWishlistMutation,
  wishlistApi
} from "./wishlist";

// Export Contact API
export {
  contactApi,
  useSubmitContactFormMutation,
  useSubmitSupportTicketMutation
} from "./contact";

// Export Admin API
export {
  adminApi,
  useAddProductMutation,
  useDeleteProductMutation,
  useGetAllOrdersQuery,
  useGetAllUsersQuery,
  useGetDashboardStatsQuery,
  useUpdateProductMutation
} from "./admin";

// Export File Upload API
export {
  fileUploadApi,
  useUploadProductImageMutation,
  useUploadUserAvatarMutation
} from "./fileUpload";

/**
 * ============================================================================
 * USAGE EXAMPLES
 * ============================================================================
 *
 * In components, you can import directly from this file:
 *
 * import { useGetAllProductsQuery } from "@/redux/api/apiClient";
 *
 * Or import from specific modules:
 *
 * import { useGetAllProductsQuery } from "@/redux/api/products";
 * import { useLoginMutation } from "@/redux/api/auth";
 *
 * Both approaches work identically.
 *
 * ============================================================================
 * STORE CONFIGURATION
 * ============================================================================
 *
 * The store should include all API reducers and middleware.
 * See src/redux/store.js for the complete configuration.
 *
 * ============================================================================
 */
