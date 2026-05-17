import { render, screen } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import authReducer from "../redux/slices/auth/authSlice";
import withAuth from "./AuthAdminHoc";

// Mock Navigate and useLocation from react-router-dom (AuthAdminHoc imports from react-router-dom)
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  Navigate: ({ to }) => (
    <div data-testid="navigate-redirect" data-to={to} />
  ),
  useLocation: () => ({ pathname: "/admin", search: "", hash: "", state: null })
}));

const createStore = (authState = {}) =>
  configureStore({
    reducer: { auth: authReducer },
    preloadedState: {
      auth: {
        isAuthenticated: false,
        user: null,
        loading: false,
        authToken: null,
        ...authState
      }
    }
  });

const AdminDashboard = ({ title }) => (
  <div data-testid="admin-dashboard">{title || "Admin Dashboard"}</div>
);

const renderWithAuth = (authState = {}, WrappedComponent = AdminDashboard, props = {}) => {
  const store = createStore(authState);
  const AuthenticatedComponent = withAuth(WrappedComponent);
  return render(
    <Provider store={store}>
      <MemoryRouter>
        <AuthenticatedComponent {...props} />
      </MemoryRouter>
    </Provider>
  );
};

// ─── Positive Scenarios ─────────────────────────────────────────────────────

describe("withAuth HOC — Positive Scenarios", () => {
  test("renders wrapped component when user is an authenticated admin", () => {
    renderWithAuth({ isAuthenticated: true, user: { role: "admin" } });
    expect(screen.getByTestId("admin-dashboard")).toBeInTheDocument();
  });

  test("renders the default content of the wrapped component", () => {
    renderWithAuth({ isAuthenticated: true, user: { role: "admin" } });
    expect(screen.getByText("Admin Dashboard")).toBeInTheDocument();
  });

  test("passes props through to the wrapped component", () => {
    renderWithAuth(
      { isAuthenticated: true, user: { role: "admin" } },
      AdminDashboard,
      { title: "Products Panel" }
    );
    expect(screen.getByText("Products Panel")).toBeInTheDocument();
  });

  test("works with any component wrapped by the HOC", () => {
    const CustomAdminPage = () => (
      <div data-testid="custom-admin-page">Custom Admin</div>
    );
    renderWithAuth(
      { isAuthenticated: true, user: { role: "admin" } },
      CustomAdminPage
    );
    expect(screen.getByTestId("custom-admin-page")).toBeInTheDocument();
  });
});

// ─── Negative Scenarios ─────────────────────────────────────────────────────

describe("withAuth HOC — Negative Scenarios", () => {
  test("redirects to /login when user is not authenticated", () => {
    renderWithAuth({ isAuthenticated: false, user: null });
    expect(screen.getByTestId("navigate-redirect")).toHaveAttribute(
      "data-to",
      "/login"
    );
  });

  test("redirects to /login when loading is done and no user exists", () => {
    renderWithAuth({ isAuthenticated: false, user: null, loading: false });
    expect(screen.getByTestId("navigate-redirect")).toHaveAttribute(
      "data-to",
      "/login"
    );
  });

  test("redirects to /unauthorized when authenticated user is not an admin", () => {
    renderWithAuth({ isAuthenticated: true, user: { role: "user" } });
    expect(screen.getByTestId("navigate-redirect")).toHaveAttribute(
      "data-to",
      "/unauthorized"
    );
  });

  test("redirects to /unauthorized when authenticated user has editor role", () => {
    renderWithAuth({ isAuthenticated: true, user: { role: "editor" } });
    expect(screen.getByTestId("navigate-redirect")).toHaveAttribute(
      "data-to",
      "/unauthorized"
    );
  });

  test("shows loading spinner while auth state is being resolved", () => {
    renderWithAuth({ loading: true, isAuthenticated: false });
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test("does not redirect while auth state is loading", () => {
    renderWithAuth({ loading: true, isAuthenticated: false });
    expect(screen.queryByTestId("navigate-redirect")).not.toBeInTheDocument();
  });

  test("does not render the admin component when not authenticated", () => {
    renderWithAuth({ isAuthenticated: false, user: null });
    expect(screen.queryByTestId("admin-dashboard")).not.toBeInTheDocument();
  });

  test("does not render the admin component when user role is not admin", () => {
    renderWithAuth({ isAuthenticated: true, user: { role: "user" } });
    expect(screen.queryByTestId("admin-dashboard")).not.toBeInTheDocument();
  });

  test("does not render admin component while still loading", () => {
    renderWithAuth({ loading: true });
    expect(screen.queryByTestId("admin-dashboard")).not.toBeInTheDocument();
  });
});
