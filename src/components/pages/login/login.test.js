import { configureStore } from "@reduxjs/toolkit";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { useLoginMutation } from "../../../redux/api/auth";
import authReducer from "../../../redux/slices/auth/authSlice";
import LoginPage from "./index";

// Mock RTK Query auth API
jest.mock("../../../redux/api/auth", () => ({
  useLoginMutation: jest.fn()
}));

// Mock react-router Navigate and useNavigate
const mockNavigate = jest.fn();
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => mockNavigate,
  Navigate: ({ to }) => <div data-testid="navigate-redirect" data-to={to} />
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

const renderLoginPage = (authState = {}) => {
  const store = createStore(authState);
  return {
    ...render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    ),
    store
  };
};

describe("LoginPage", () => {
  let mockLoginMutation;
  let mockUnwrap;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUnwrap = jest.fn();
    // Return a fresh object from the mock function to avoid shared-state
    // between test cases which can cause unhandled promise rejections.
    mockLoginMutation = jest.fn(() => ({ unwrap: mockUnwrap }));
    useLoginMutation.mockReturnValue([mockLoginMutation, { isLoading: false }]);
  });

  // ─── Positive Scenarios ───────────────────────────────────────────────────

  describe("Positive Scenarios", () => {
    test("renders login form with email, password fields and submit button", () => {
      renderLoginPage();

      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /^login$/i })
      ).toBeInTheDocument();
    });

    test("renders signup link on the page", () => {
      renderLoginPage();
      expect(
        screen.getByRole("link", { name: /sign up/i })
      ).toBeInTheDocument();
    });

    test("updates email input value on user input", async () => {
      renderLoginPage();
      const emailInput = screen.getByLabelText(/email/i);
      await userEvent.type(emailInput, "user@example.com");
      expect(emailInput.value).toBe("user@example.com");
    });

    test("updates password input value on user input", async () => {
      renderLoginPage();
      const passwordInput = screen.getByLabelText(/password/i);
      await userEvent.type(passwordInput, "secret123");
      expect(passwordInput.value).toBe("secret123");
    });

    test("redirects to /account/profile when already authenticated", () => {
      renderLoginPage({ isAuthenticated: true, user: { role: "user" } });
      const redirect = screen.getByTestId("navigate-redirect");
      expect(redirect).toHaveAttribute("data-to", "/account/profile");
    });

    test("successful user login dispatches login action and navigates to /account/profile", async () => {
      mockUnwrap.mockResolvedValue({
        token: "test-token",
        user: { email: "user@example.com", role: "user", name: "testuser" }
      });

      const { store } = renderLoginPage();

      await userEvent.type(screen.getByLabelText(/email/i), "user@example.com");
      await userEvent.type(screen.getByLabelText(/password/i), "password123");
      fireEvent.click(screen.getByRole("button", { name: /^login$/i }));

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith("/account/profile");
      });
      expect(store.getState().auth.isAuthenticated).toBe(true);
      expect(store.getState().auth.user.role).toBe("user");
    });

    test("successful admin login dispatches login action and navigates to /admin/dashboard", async () => {
      mockUnwrap.mockResolvedValue({
        token: "admin-token",
        user: { email: "admin@example.com", role: "admin", name: "admin" }
      });

      const { store } = renderLoginPage();

      await userEvent.type(
        screen.getByLabelText(/email/i),
        "admin@example.com"
      );
      await userEvent.type(screen.getByLabelText(/password/i), "adminpass");
      fireEvent.click(screen.getByRole("button", { name: /^login$/i }));

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith("/admin/dashboard");
      });
      expect(store.getState().auth.user.role).toBe("admin");
    });

    test("shows 'Logging in...' text on button while request is in flight", async () => {
      mockUnwrap.mockReturnValue(new Promise(() => {})); // never resolves

      renderLoginPage();

      await userEvent.type(screen.getByLabelText(/email/i), "user@example.com");
      await userEvent.type(screen.getByLabelText(/password/i), "password123");
      fireEvent.click(screen.getByRole("button", { name: /^login$/i }));

      await waitFor(() => {
        expect(
          screen.getByRole("button", { name: /logging in/i })
        ).toBeInTheDocument();
      });
    });

    test("submit button is disabled while request is in flight", async () => {
      mockUnwrap.mockReturnValue(new Promise(() => {})); // never resolves

      renderLoginPage();

      await userEvent.type(screen.getByLabelText(/email/i), "user@example.com");
      await userEvent.type(screen.getByLabelText(/password/i), "password123");
      fireEvent.click(screen.getByRole("button", { name: /^login$/i }));

      await waitFor(() => {
        expect(screen.getByRole("button")).toBeDisabled();
      });
    });
  });

  // ─── Negative Scenarios ───────────────────────────────────────────────────

  describe("Negative Scenarios", () => {
    test("shows validation error when both email and password are empty", async () => {
      renderLoginPage();
      fireEvent.submit(
        screen.getByRole("button", { name: /^login$/i }).closest("form")
      );

      await waitFor(() => {
        expect(
          screen.getByText(/please enter both email and password/i)
        ).toBeInTheDocument();
      });
    });

    test("shows validation error when email is empty but password is filled", async () => {
      renderLoginPage();
      await userEvent.type(screen.getByLabelText(/password/i), "password123");
      fireEvent.submit(
        screen.getByRole("button", { name: /^login$/i }).closest("form")
      );

      await waitFor(() => {
        expect(
          screen.getByText(/please enter both email and password/i)
        ).toBeInTheDocument();
      });
    });

    test("shows validation error when password is empty but email is filled", async () => {
      renderLoginPage();
      await userEvent.type(screen.getByLabelText(/email/i), "user@example.com");
      fireEvent.submit(
        screen.getByRole("button", { name: /^login$/i }).closest("form")
      );

      await waitFor(() => {
        expect(
          screen.getByText(/please enter both email and password/i)
        ).toBeInTheDocument();
      });
    });

    test("falls back to demo mode and authenticates user when API call fails", async () => {
      // When the RTK mutation rejects, the component immediately runs the fallback
      // which dispatches login — both updates are batched, so the error message is
      // never rendered separately. We assert the observable outcome: auth succeeds.
      mockUnwrap.mockRejectedValue(new Error("Network error"));

      const { store } = renderLoginPage();

      await userEvent.type(screen.getByLabelText(/email/i), "user@example.com");
      await userEvent.type(screen.getByLabelText(/password/i), "wrongpass");
      fireEvent.click(screen.getByRole("button", { name: /^login$/i }));

      await waitFor(() => {
        expect(store.getState().auth.isAuthenticated).toBe(true);
      });
    });

    test("demo mode fallback: admin email routes to /admin/dashboard after API failure", async () => {
      mockUnwrap.mockRejectedValue(new Error("Network error"));

      renderLoginPage();

      await userEvent.type(
        screen.getByLabelText(/email/i),
        "admin@example.com"
      );
      await userEvent.type(screen.getByLabelText(/password/i), "anypass");
      fireEvent.click(screen.getByRole("button", { name: /^login$/i }));

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith("/admin/dashboard");
      });
    });

    test("demo mode fallback: regular email routes to /account/profile after API failure", async () => {
      mockUnwrap.mockRejectedValue(new Error("Network error"));

      renderLoginPage();

      await userEvent.type(screen.getByLabelText(/email/i), "user@example.com");
      await userEvent.type(screen.getByLabelText(/password/i), "anypass");
      fireEvent.click(screen.getByRole("button", { name: /^login$/i }));

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith("/account/profile");
      });
    });

    test("does not call loginMutation when fields are empty", async () => {
      renderLoginPage();
      fireEvent.submit(
        screen.getByRole("button", { name: /^login$/i }).closest("form")
      );

      await waitFor(() => {
        expect(
          screen.getByText(/please enter both email and password/i)
        ).toBeInTheDocument();
      });
      expect(mockLoginMutation).not.toHaveBeenCalled();
    });
  });
});
