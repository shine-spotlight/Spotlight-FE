import { Navigate } from "react-router-dom";
import { useUserStore } from "@stores/userStore";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { accessToken } = useUserStore();
  return accessToken ? <>{children}</> : <Navigate to="/login" replace />;
}
