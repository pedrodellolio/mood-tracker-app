import { Outlet } from "react-router";
import { AuthProvider } from "@/contexts/auth-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DailyMoodProvider } from "@/contexts/daily-mood-context";
import { Toaster } from "@/components/ui/toaster";
import { UserPreferencesProvider } from "@/contexts/user-preferences-context";
import Footer from "@/components/footer";

function RootLayout() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <UserPreferencesProvider>
          <DailyMoodProvider>
            <div className="p-6">
              <Outlet />
              <Toaster />
              <Footer />
            </div>
          </DailyMoodProvider>
        </UserPreferencesProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default RootLayout;
