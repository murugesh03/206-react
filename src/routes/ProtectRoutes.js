import ProtectedRoute from "./ProtectedRoute";
import ProtectedRouteSimple from "./ProtectedRouteSimple";

/**
 * Export both protected route implementations
 *
 * Use ProtectedRoute for context-based auth (recommended)
 * Use ProtectedRouteSimple for props-based auth
 */
export { ProtectedRoute, ProtectedRouteSimple };
export default ProtectedRoute;
