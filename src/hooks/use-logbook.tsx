import LogbookContext from "@/contexts/logbook-context";
import { useContext } from "react";

export function useLogbook() {
  const context = useContext(LogbookContext);
  return context;
}
