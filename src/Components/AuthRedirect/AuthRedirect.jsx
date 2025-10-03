import { Navigate } from "react-router-dom";
import useAuthStore from "../../store/store";
export default function AuthRedirect({ children }) {
  const token = useAuthStore((state) => state.token);

  if (token) {
    // لو المستخدم مسجل دخول رجّعه للهوم
    return <Navigate to="/" replace />;
  }

  // لو مش مسجل دخول  كمل عادي وروح للصفحة (Login/Register)
  return children;
}
