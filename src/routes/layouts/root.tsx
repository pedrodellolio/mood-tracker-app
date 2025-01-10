import { Outlet } from "react-router";
import { AuthProvider } from "@/contexts/auth-context";
import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DailyMoodProvider } from "@/contexts/daily-mood-context";

function RootLayout() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <DailyMoodProvider>
          <div className="p-6">
            <Outlet />
            <Toaster />
          </div>
        </DailyMoodProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default RootLayout;
