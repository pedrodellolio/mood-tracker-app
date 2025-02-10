import { ReactNode, createContext, useState } from "react";

interface LogbookToastContextData {
  isAlertOpen: boolean;
  openAlert: () => void;
  closeAlert: () => void;
}

const LogbookToastContext = createContext<LogbookToastContextData>(
  {} as LogbookToastContextData
);

export const LogbookToastProvider = ({ children }: { children: ReactNode }) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const openAlert = () => {
    setIsAlertOpen(true);
  };

  const closeAlert = () => {
    setIsAlertOpen(false);
  };
  return (
    <LogbookToastContext.Provider
      value={{ isAlertOpen, openAlert, closeAlert }}
    >
      {children}
    </LogbookToastContext.Provider>
  );
};
export default LogbookToastContext;
