import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";

interface UserPreferencesContextData {
  isColorblindMode: boolean;
  setIsColorblindMode: Dispatch<SetStateAction<boolean>>;
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

  const [isColorblindMode, setIsColorblindMode] = useState(initialColorblindMode);

  useEffect(() => {
    localStorage.setItem('colorblindMode', JSON.stringify(isColorblindMode));
  }, [isColorblindMode]);
  
  return (
    <UserPreferencesContext.Provider
      value={{
        isColorblindMode,
        setIsColorblindMode,
      }}
    >
      {children}
    </UserPreferencesContext.Provider>
  );
};
export default UserPreferencesContext;
