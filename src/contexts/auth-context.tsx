import LoadingSpinner from "@/components/loading-spinner";
import { auth, googleProvider } from "@/lib/firebase";
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { toast } from "sonner";

interface AuthContextData {
  user: User | null;
  isAuth: boolean;
  isLoading: boolean;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

interface Props {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    // setIsLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      setUser(user);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setIsAuth(!!user);
  }, [user]);

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      toast.error("Unable to logout.");
    }
  };

  const signInWithGoogle = async () => {
    try {
      setIsLoading(true);
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      toast.error("Unable to login with Google.");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuth,
        isLoading,
        signInWithGoogle,
        logout,
      }}
    >
      {isLoading ? (
        <div className="w-full flex justify-center mt-72">
          <LoadingSpinner className="w-10 h-10" />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
export default AuthContext;
