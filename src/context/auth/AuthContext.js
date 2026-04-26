import React, { createContext, useCallback, useEffect, useState } from "react";

/**
 * AuthContext - Provides authentication state and methods
 * Manages user login/logout and authentication status
 */
export const AuthContext = createContext();

/**
 * AuthProvider Component
 * Wraps the application and provides auth context to all children
 */
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedAuthToken = localStorage.getItem("authToken");

    if (storedUser && storedAuthToken) {
      try {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error parsing stored user:", error);
        localStorage.removeItem("user");
        localStorage.removeItem("authToken");
      }
    }
    setLoading(false);
  }, []);

  /**
   * Login function - sets user and authentication token
   * @param {Object} userData - User data to store
   * @param {string} token - Authentication token
   */
  const login = useCallback((userData, token) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("authToken", token);
  }, []);

  /**
   * Logout function - clears user and authentication token
   */
  const logout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
  }, []);

  /**
   * Update user profile
   * @param {Object} updatedUserData - Updated user data
   */
  const updateUser = useCallback(
    (updatedUserData) => {
      const newUserData = { ...user, ...updatedUserData };
      setUser(newUserData);
      localStorage.setItem("user", JSON.stringify(newUserData));
    },
    [user]
  );

  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    logout,
    updateUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Custom hook to use auth context
 * @returns {Object} - Auth context value
 */
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
