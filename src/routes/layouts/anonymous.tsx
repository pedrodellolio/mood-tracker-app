import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/hooks/use-auth";

function AnonymousLayout() {
  const { user } = useAuth();
  return user ? <Navigate to={"/"} replace /> : <Outlet />;
}

export default AnonymousLayout;
