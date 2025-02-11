import { ReactNode, createContext, useEffect, useState } from "react";

interface UserPreferencesContextData {
  isColorblindMode: boolean;
  isSidebarOpen: boolean;
  toggleColorblindMode: () => void;
  toggleSidebar: () => void;
}

const UserPreferencesContext = createContext<UserPreferencesContextData>(
  {} as UserPreferencesContextData
);

export const UserPreferencesProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const storedColorblindMode = localStorage.getItem("colorblindMode");
  const initialColorblindMode = storedColorblindMode
    ? JSON.parse(storedColorblindMode)
    : false;

  const [isColorblindMode, setIsColorblindMode] = useState<boolean>(
    initialColorblindMode
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("colorblindMode", JSON.stringify(isColorblindMode));
  }, [isColorblindMode]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  const toggleColorblindMode = () => {
    setIsColorblindMode((prevState) => !prevState);
  };

  return (
    <UserPreferencesContext.Provider
      value={{
        isColorblindMode,
        isSidebarOpen,
        toggleSidebar,
        toggleColorblindMode,
      }}
    >
      {children}
    </UserPreferencesContext.Provider>
  );
};
export default UserPreferencesContext;
