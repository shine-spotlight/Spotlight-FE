import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@stores/authStore";
import { useUserStore } from "@stores/userStore";

interface ProtectedRouteProps {
  children?: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const verified = useAuthStore((s) => s.socialVerified);
  const role = useUserStore((s) => s.currentRole);
  const onboardedByRoleMap = useUserStore((s) => s.onboardedByRole);
  const onboardedByRole = role ? onboardedByRoleMap[role] : false;

  // 1. role이 없으면 시작 화면으로
  if (!role) {
    return <Navigate to="/" replace />;
  }

  // 2. 인증이 안 된 경우 → 인증 페이지로
  if (!verified) {
    return <Navigate to="/register/verify" replace />;
  }

  // 3. 프로필이 있으면 정상 접근 허용 (온보딩 완료로 간주)
  if (onboardedByRole) {
    return <>{children ?? <Outlet />}</>;
  }

  // 4. role은 있는데 프로필이 없는 경우 → 회원가입 진행
  return <Navigate to="/register" replace />;
}
