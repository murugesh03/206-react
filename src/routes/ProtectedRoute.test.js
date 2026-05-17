import { render, screen } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import authReducer from "../redux/slices/auth/authSlice";
import ProtectedRoute from "./ProtectedRoute";

// Mock Navigate from react-router (ProtectedRoute imports from "react-router")
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  Navigate: ({ to }) => (
    <div data-testid="navigate-redirect" data-to={to} />
  )
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

const renderProtectedRoute = (props, authState = {}) => {
  const store = createStore(authState);
  return render(
    <Provider store={store}>
      <MemoryRouter>
        <ProtectedRoute {...props} />
      </MemoryRouter>
    </Provider>
  );
};

const ProtectedContent = () => (
  <div data-testid="protected-content">Protected Page</div>
);

// ─── Positive Scenarios ─────────────────────────────────────────────────────

describe("ProtectedRoute — Positive Scenarios", () => {
  test("renders the protected element when user is authenticated", () => {
    renderProtectedRoute(
      { element: <ProtectedContent /> },
      { isAuthenticated: true, user: { role: "user" } }
    );
    expect(screen.getByTestId("protected-content")).toBeInTheDocument();
  });

  test("renders element when authenticated user has the required role", () => {
    renderProtectedRoute(
      { element: <ProtectedContent />, allowedRoles: ["admin"] },
      { isAuthenticated: true, user: { role: "admin" } }
    );
    expect(screen.getByTestId("protected-content")).toBeInTheDocument();
  });

  test("renders element when multiple roles are allowed and user has one of them", () => {
    renderProtectedRoute(
      { element: <ProtectedContent />, allowedRoles: ["admin", "editor"] },
      { isAuthenticated: true, user: { role: "editor" } }
    );
    expect(screen.getByTestId("protected-content")).toBeInTheDocument();
  });

  test("renders element when allowedRoles is null (no role restriction)", () => {
    renderProtectedRoute(
      { element: <ProtectedContent />, allowedRoles: null },
      { isAuthenticated: true, user: { role: "user" } }
    );
    expect(screen.getByTestId("protected-content")).toBeInTheDocument();
  });

  test("renders element when allowedRoles is not provided (default null)", () => {
    renderProtectedRoute(
      { element: <ProtectedContent /> },
      { isAuthenticated: true, user: { role: "user" } }
    );
    expect(screen.getByTestId("protected-content")).toBeInTheDocument();
  });
});

// ─── Negative Scenarios ─────────────────────────────────────────────────────

describe("ProtectedRoute — Negative Scenarios", () => {
  test("redirects to /login when user is not authenticated", () => {
    renderProtectedRoute(
      { element: <ProtectedContent /> },
      { isAuthenticated: false }
    );
    expect(screen.getByTestId("navigate-redirect")).toHaveAttribute(
      "data-to",
      "/login"
    );
  });

  test("uses custom redirectPath when provided and user is not authenticated", () => {
    renderProtectedRoute(
      { element: <ProtectedContent />, redirectPath: "/custom-login" },
      { isAuthenticated: false }
    );
    expect(screen.getByTestId("navigate-redirect")).toHaveAttribute(
      "data-to",
      "/custom-login"
    );
  });

  test("redirects to /unauthorized when user lacks the required role", () => {
    renderProtectedRoute(
      { element: <ProtectedContent />, allowedRoles: ["admin"] },
      { isAuthenticated: true, user: { role: "user" } }
    );
    expect(screen.getByTestId("navigate-redirect")).toHaveAttribute(
      "data-to",
      "/unauthorized"
    );
  });

  test("redirects to /unauthorized when user role is not in the allowedRoles list", () => {
    renderProtectedRoute(
      { element: <ProtectedContent />, allowedRoles: ["admin", "editor"] },
      { isAuthenticated: true, user: { role: "viewer" } }
    );
    expect(screen.getByTestId("navigate-redirect")).toHaveAttribute(
      "data-to",
      "/unauthorized"
    );
  });

  test("shows loading spinner while auth state is being determined", () => {
    renderProtectedRoute(
      { element: <ProtectedContent /> },
      { loading: true, isAuthenticated: false }
    );
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    expect(screen.queryByTestId("protected-content")).not.toBeInTheDocument();
  });

  test("does not show a redirect while still loading", () => {
    renderProtectedRoute(
      { element: <ProtectedContent /> },
      { loading: true, isAuthenticated: false }
    );
    expect(screen.queryByTestId("navigate-redirect")).not.toBeInTheDocument();
  });

  test("does not render protected content when unauthenticated", () => {
    renderProtectedRoute(
      { element: <ProtectedContent /> },
      { isAuthenticated: false }
    );
    expect(screen.queryByTestId("protected-content")).not.toBeInTheDocument();
  });

  test("does not render protected content when user has wrong role", () => {
    renderProtectedRoute(
      { element: <ProtectedContent />, allowedRoles: ["admin"] },
      { isAuthenticated: true, user: { role: "user" } }
    );
    expect(screen.queryByTestId("protected-content")).not.toBeInTheDocument();
  });
});
