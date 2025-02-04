import { Outlet } from "react-router";
import { AuthProvider } from "@/contexts/auth-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DailyMoodProvider } from "@/contexts/daily-mood-context";
import { Toaster } from "@/components/ui/toaster";
import { UserPreferencesProvider } from "@/contexts/user-preferences-context";
import ErrorBoundary from "@/components/error-boundary";

function RootLayout() {
  const queryClient = new QueryClient({ defaultOptions: {} });

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <UserPreferencesProvider>
            <DailyMoodProvider>
              <div className="p-6">
                <Outlet />
                <Toaster />
              </div>
            </DailyMoodProvider>
          </UserPreferencesProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default RootLayout;
