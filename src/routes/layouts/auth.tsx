import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/hooks/use-auth";
import NavBar from "@/components/navbar";

function AuthLayout() {
  const { isAuth, isLoading } = useAuth();
  if (isLoading) return null;
  return isAuth ? (
    <>
      <NavBar />
      <div className="max-w-[820px] mx-auto">
        <Outlet />
      </div>
    </>
  ) : (
    <Navigate to="login" />
  );
}

export default AuthLayout;
