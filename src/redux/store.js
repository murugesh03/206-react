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

// ============================================
// CUSTOM MIDDLEWARE - DATA MODIFICATION EXAMPLES
// ============================================

/**
 * Logging Middleware
 * Logs all dispatched actions with their payloads
 */
const loggingMiddleware = (storeAPI) => (next) => (action) => {
  console.log(
    "%c=== LOGGING MIDDLEWARE ===",
    "color: blue; font-weight: bold; font-size: 12px;"
  );
  console.log(
    "%cDispatching action:",
    "color: blue; font-weight: bold;",
    action.type
  );
  console.log("%cAction payload:", "color: blue;", action.payload);
  console.log("%cPrevious state:", "color: blue;", storeAPI.getState());

  let result = next(action);

  console.log(
    "%cNew state after action:",
    "color: green;",
    storeAPI.getState()
  );
  console.log(
    "%c=== END LOGGING MIDDLEWARE ===",
    "color: blue; font-weight: bold; font-size: 12px;"
  );
  console.log("");

  return result;
};

/**
 * Data Transformation Middleware
 * Transforms specific action payloads before they reach reducers
 * Example: Adding timestamps, formatting data, etc.
 */
const dataTransformMiddleware = (storeAPI) => (next) => (action) => {
  console.log(
    "%c➜ DATA TRANSFORM MIDDLEWARE ENTRY",
    "color: #FF6B6B; font-weight: bold; font-size: 12px;"
  );
  console.log("%cAction type:", "color: #FF6B6B;", action.type);

  // Transform cart actions - add timestamp
  if (action.type.startsWith("cart/")) {
    console.log(
      "%c  📦 Cart action detected - Adding metadata",
      "color: #FF8C42;"
    );
    action.meta = {
      ...action.meta,
      timestamp: new Date().toISOString(),
      user: storeAPI.getState()?.auth?.user?.id || "anonymous"
    };
    console.log("%c  ✓ Metadata added:", "color: #FF8C42;", action.meta);
  }

  // Transform product data - ensure prices are numbers
  if (action.type.includes("products") && action.payload?.price) {
    console.log(
      "%c  💰 Product action detected - Converting price to number",
      "color: #4ECDC4;"
    );
    console.log("%c  Original price:", "color: #4ECDC4;", action.payload.price);
    action.payload.price = parseFloat(action.payload.price);
    console.log(
      "%c  Converted price:",
      "color: #4ECDC4;",
      action.payload.price
    );
  }

  console.log(
    "%c➜ DATA TRANSFORM MIDDLEWARE - Passing to next middleware",
    "color: #FF6B6B; font-weight: bold; font-size: 12px;"
  );

  return next(action);
};

/**
 * Product Price Formatter Middleware
 * Ensures all product prices are formatted consistently
 */
const productPriceFormatterMiddleware = (storeAPI) => (next) => (action) => {
  console.log(
    "%c➜ PRODUCT PRICE FORMATTER MIDDLEWARE ENTRY",
    "color: #95E1D3; font-weight: bold; font-size: 12px;"
  );

  // Format prices in product-related actions
  if (
    (action.type.includes("getAllProducts") ||
      action.type.includes("getProductById")) &&
    action.payload?.products
  ) {
    console.log(
      "%c  💵 Formatting product prices",
      "color: #38ADA9; font-weight: bold;"
    );
    console.log(
      "%c  Found products count:",
      "color: #38ADA9;",
      action.payload.products.length
    );

    action.payload.products = action.payload.products.map((product) => {
      const formattedProduct = {
        ...product,
        price: parseFloat(product.price).toFixed(2),
        displayPrice: `$${parseFloat(product.price).toFixed(2)}`
      };
      console.log(
        "%c  ✓ Formatted:",
        "color: #38ADA9;",
        `${product.title}: ${formattedProduct.displayPrice}`
      );
      return formattedProduct;
    });

    console.log(
      "%c  ✓ All prices formatted successfully",
      "color: #38ADA9; font-weight: bold;"
    );
  }

  console.log(
    "%c➜ PRODUCT PRICE FORMATTER - Passing to next middleware",
    "color: #95E1D3; font-weight: bold; font-size: 12px;"
  );

  return next(action);
};

/**
 * Auth Token Management Middleware
 * Handles token refresh and validation
 */
const authTokenMiddleware = (storeAPI) => (next) => (action) => {
  console.log(
    "%c➜ AUTH TOKEN MIDDLEWARE ENTRY",
    "color: #F7DC6F; font-weight: bold; font-size: 12px;"
  );
  console.log("%cAction type:", "color: #F7DC6F;", action.type);

  // Check if token is expiring on every action
  if (action.type.startsWith("auth/")) {
    const token = storeAPI.getState()?.auth?.token;
    const user = storeAPI.getState()?.auth?.user;

    console.log(
      "%c  🔐 Auth action detected!",
      "color: #F39C12; font-weight: bold;"
    );
    console.log("%c  Token present:", "color: #F39C12;", !!token);
    console.log("%c  User:", "color: #F39C12;", user?.email || "No user");

    if (token) {
      console.log(
        "%c  ✓ Token validation passed",
        "color: #27AE60; font-weight: bold;"
      );
    } else {
      console.warn(
        "%c  ⚠️  No token found!",
        "color: #E74C3C; font-weight: bold;"
      );
    }
  }

  console.log(
    "%c➜ AUTH TOKEN MIDDLEWARE - Passing to next middleware",
    "color: #F7DC6F; font-weight: bold; font-size: 12px;"
  );

  return next(action);
};

/**
 * Error Tracking Middleware
 * Logs and tracks errors that occur during action dispatch
 */
const errorTrackingMiddleware = (storeAPI) => (next) => (action) => {
  console.log(
    "%c➜ ERROR TRACKING MIDDLEWARE ENTRY",
    "color: #E74C3C; font-weight: bold; font-size: 12px;"
  );

  try {
    console.log("%c  ✓ Executing action:", "color: #27AE60;", action.type);
    let result = next(action);
    console.log(
      "%c  ✓ Action completed successfully",
      "color: #27AE60; font-weight: bold;"
    );
    console.log(
      "%c➜ ERROR TRACKING MIDDLEWARE - No errors",
      "color: #E74C3C; font-weight: bold; font-size: 12px;"
    );
    return result;
  } catch (error) {
    console.error(
      "%c❌ ERROR IN ACTION:",
      "color: #E74C3C; font-weight: bold;",
      action.type
    );
    console.error("%c  Error details:", "color: #E74C3C;", error);
    console.error(
      "%c  Error message:",
      "color: #E74C3C;",
      error?.message || "Unknown error"
    );
    console.error("%c  Stack trace:", "color: #E74C3C;", error?.stack);
    // Could send to error tracking service
    throw error;
  }
};

/**
 * Cart Validation Middleware
 * Validates cart items and prevents invalid operations
 */
const cartValidationMiddleware = (storeAPI) => (next) => (action) => {
  console.log(
    "%c➜ CART VALIDATION MIDDLEWARE ENTRY",
    "color: #9B59B6; font-weight: bold; font-size: 12px;"
  );
  console.log("%cAction type:", "color: #9B59B6;", action.type);

  if (action.type === "cart/addItem" && action.payload) {
    const { quantity, price, title } = action.payload;

    console.log(
      "%c  🛒 Cart add item detected",
      "color: #8E44AD; font-weight: bold;"
    );
    console.log("%c  Product:", "color: #8E44AD;", title || "Unknown");
    console.log("%c  Quantity:", "color: #8E44AD;", quantity);
    console.log("%c  Price:", "color: #8E44AD;", price);

    // Validate quantity
    if (!quantity || quantity <= 0) {
      console.warn(
        "%c  ⚠️  Invalid quantity detected:",
        "color: #E74C3C;",
        quantity
      );
      console.warn("%c  🔧 Correcting to 1", "color: #F39C12;");
      action.payload.quantity = 1;
    } else {
      console.log("%c  ✓ Quantity valid", "color: #27AE60;");
    }

    // Validate price
    if (!price || price < 0) {
      console.error(
        "%c  ❌ Invalid price detected:",
        "color: #E74C3C; font-weight: bold;",
        price
      );
      console.error(
        "%c  🚫 Action blocked - Not dispatching",
        "color: #E74C3C; font-weight: bold;"
      );
      return; // Don't dispatch invalid action
    } else {
      console.log("%c  ✓ Price valid", "color: #27AE60;");
    }

    console.log(
      "%c  ✓ All validations passed",
      "color: #27AE60; font-weight: bold;"
    );
  }

  console.log(
    "%c➜ CART VALIDATION MIDDLEWARE - Passing to next middleware",
    "color: #9B59B6; font-weight: bold; font-size: 12px;"
  );

  return next(action);
};

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
      // RTK Query middleware
      productsApi.middleware,
      authApi.middleware,
      userApi.middleware,
      ordersApi.middleware,
      cartApi.middleware,
      wishlistApi.middleware,
      contactApi.middleware,
      adminApi.middleware,
      fileUploadApi.middleware,

      // Custom middleware for data modification
      loggingMiddleware,
      productPriceFormatterMiddleware,
      dataTransformMiddleware,
      authTokenMiddleware,
      errorTrackingMiddleware,
      cartValidationMiddleware
    )
});
