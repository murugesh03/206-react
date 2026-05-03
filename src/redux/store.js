import { configureStore } from "@reduxjs/toolkit";
import {
  adminApi,
  authApi,
  cartApi,
  contactApi,
  fileUploadApi,
  ordersApi,
  productsApi,
  userApi,
  wishlistApi
} from "./api/apiClient";
import authReducer from "./slices/auth/authSlice";
import cartReducer from "./slices/cart/cartSlice";

export const store = configureStore({
  reducer: {
    // Redux slices
    cart: cartReducer,
    auth: authReducer,

    // RTK Query APIs
    [productsApi.reducerPath]: productsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [wishlistApi.reducerPath]: wishlistApi.reducer,
    [contactApi.reducerPath]: contactApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [fileUploadApi.reducerPath]: fileUploadApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productsApi.middleware,
      authApi.middleware,
      userApi.middleware,
      ordersApi.middleware,
      cartApi.middleware,
      wishlistApi.middleware,
      contactApi.middleware,
      adminApi.middleware,
      fileUploadApi.middleware
    )
});
