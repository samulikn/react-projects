import { useLocation, Outlet, Navigate } from "react-router-dom";
import useUser from "../hooks/useAuth";

function RequireAuth() {
  const { auth } = useUser();
  const location = useLocation();

  return auth?.email ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default RequireAuth;
