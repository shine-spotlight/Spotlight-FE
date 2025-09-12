import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@stores/authStore";

interface ProtectedRouteProps {
  children?: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const verified = useAuthStore((s) => s.socialVerified);
  if (!verified) {
    return <Navigate to="/register/verify" replace />;
  }
  return <>{children ?? <Outlet />}</>;
}
