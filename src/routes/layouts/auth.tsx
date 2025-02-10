import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/hooks/use-auth";
import NavBar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { useUserPreferences } from "@/hooks/use-user-preferences";
import { useMediaQuery } from "@/hooks/use-media-query";

function AuthLayout() {
  const { user } = useAuth();
  const { isSidebarOpen } = useUserPreferences();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return user ? (
    <div className="">
      {isSidebarOpen && <Sidebar />}
      <div
        className={`py-6 px-4 ${isSidebarOpen && isDesktop && "ml-[220px]"}`}
      >
        <NavBar />
        <div className="max-w-[820px] mx-auto">
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="login" replace />
  );
}

export default AuthLayout;
