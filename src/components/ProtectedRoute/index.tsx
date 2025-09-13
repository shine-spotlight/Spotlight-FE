import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@stores/authStore";
import { useUserStore } from "@stores/userStore";

interface ProtectedRouteProps {
  children?: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const verified = useAuthStore((s) => s.socialVerified);
  const role = useUserStore((s) => s.currentRole);
  const onboarded = useUserStore((s) => s.onboardedByRole);

  // 1. 인증이 안 된 경우 → 인증 페이지로
  if (!verified) {
    return <Navigate to="/register/verify" replace />;
  }

  // 2. role이 없으면 시작 화면으로
  if (!role) {
    return <Navigate to="/" replace />;
  }

  // 3. 해당 role의 온보딩이 끝났으면 정상 접근 허용
  if (onboarded[role]) {
    return <>{children ?? <Outlet />}</>;
  }

  // 4. role은 있는데 온보딩이 안된 경우 → 회원가입 진행
  return <Navigate to="/register" replace />;
}
