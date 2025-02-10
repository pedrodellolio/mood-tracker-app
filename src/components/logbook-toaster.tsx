import { LogbookToastProvider } from "@/contexts/logbook-toast-context";
import { Card, CardContent } from "./ui/card";
import { useLogbookToast } from "@/hooks/use-logbook-toast";

export function LogbookToaster() {
  const { isAlertOpen } = useLogbookToast();

  return (
    <LogbookToastProvider>
      {isAlertOpen && (
        <Card className="w-full absolute bottom-0">
          <CardContent>Mood updated</CardContent>
        </Card>
      )}
    </LogbookToastProvider>
  );
}
