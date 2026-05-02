import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    user: null,
    loading: true,
    authToken: null
  },
  reducers: {
    loadAuth: (state) => {
      const storedUser = localStorage.getItem("user");
      const storedAuthToken = localStorage.getItem("authToken");

      if (storedUser && storedAuthToken) {
        try {
          state.user = JSON.parse(storedUser);
          state.isAuthenticated = true;
          state.authToken = storedAuthToken;
        } catch (error) {
          console.error("Error parsing stored user:", error);
          localStorage.removeItem("user");
          localStorage.removeItem("authToken");
        }
      }
      state.loading = false;
    },
    login: (state, action) => {
      const { userData, token } = action.payload;
      state.user = userData;
      state.isAuthenticated = true;
      state.authToken = token;
      state.loading = false;
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("authToken", token);
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.authToken = null;
      state.loading = false;
      localStorage.removeItem("user");
      localStorage.removeItem("authToken");
    },
    updateUser: (state, action) => {
      const updatedUserData = action.payload;
      if (state.user) {
        state.user = { ...state.user, ...updatedUserData };
        localStorage.setItem("user", JSON.stringify(state.user));
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const { loadAuth, login, logout, updateUser, setLoading } =
  authSlice.actions;
export default authSlice.reducer;
