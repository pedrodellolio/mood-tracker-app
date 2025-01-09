import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/hooks/use-auth";

function AnonymousLayout() {
  const { isAuth } = useAuth();
  return isAuth ? <Navigate to={"/"} /> : <Outlet />;
}

export default AnonymousLayout;
