import { Outlet } from "react-router";
import { useAuth } from "@/hooks/use-auth";
import Login from "../login";

function AuthLayout() {
  const { isAuth, isLoading } = useAuth();
  if (isLoading) return null;
  return isAuth ? <Outlet /> : <Login />;
}

export default AuthLayout;
