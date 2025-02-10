import { useLogbookToast } from "@/hooks/use-logbook-toast";
import { Card, CardContent } from "./ui/card";
import ToastActions from "./toast-actions";

export default function LogbookAlert() {
  const { isAlertOpen } = useLogbookToast();

  return (
    isAlertOpen && (
      <Card
        className={`fixed bottom-0 left-0 xl:left-3/4 right-0 m-4 h-24 flex justify-start items-center z-50 transition-transform duration-300 transform 
          data-[state=open]:animate-in data-[state=open]:slide-in-from-bottom-full 
          data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right-full`}
      >
        <CardContent className="p-0 px-6 flex flex-row items-center justify-between w-full">
          <p className="text-sm font-heading">Mood updated</p>
          <ToastActions />
        </CardContent>
      </Card>
    )
  );
}
