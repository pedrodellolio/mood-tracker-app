import { Outlet } from "react-router";
import { AuthProvider } from "@/contexts/auth-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LogbookProvider } from "@/contexts/logbook-context";
import { Toaster } from "@/components/ui/toaster";
import { UserPreferencesProvider } from "@/contexts/user-preferences-context";
import Footer from "@/components/footer";
import { LogbookToastProvider } from "@/contexts/logbook-toast-context";

function RootLayout() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <UserPreferencesProvider>
          <LogbookToastProvider>
            <LogbookProvider>
              <Outlet />
              <Footer />
              <Toaster />
            </LogbookProvider>
          </LogbookToastProvider>
        </UserPreferencesProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default RootLayout;
