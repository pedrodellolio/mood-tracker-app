import { Outlet } from "react-router";
import { useAuth } from "@/hooks/use-auth";
import Login from "../login";
import NavBar from "@/components/navbar";

function AuthLayout() {
  const { isAuth, isLoading } = useAuth();
  if (isLoading) return null;
  return isAuth ? (
    <>
      <NavBar />
      <div className="max-w-[800px] mx-auto">
        <Outlet />
      </div>
    </>
  ) : (
    <Login />
  );
}

export default AuthLayout;
