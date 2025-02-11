import LogbookToastContext from "@/contexts/logbook-toast-context";
import { useContext } from "react";

export function useLogbookToast() {
  const context = useContext(LogbookToastContext);
  return context;
}
