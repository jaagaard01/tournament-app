import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../../constants";
export default function CheckAuth() {
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  return <Navigate to="/login" replace />;
}
