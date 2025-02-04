import { Dispatch, ReactNode, createContext, useState } from "react";

interface UserPreferencesContextData {
  isColorblindMode: boolean;
  setIsColorblindMode: Dispatch<React.SetStateAction<boolean>>;
}

const UserPreferencesContext = createContext<UserPreferencesContextData>(
  {} as UserPreferencesContextData
);

export const UserPreferencesProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isColorblindMode, setIsColorblindMode] = useState(false);

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
