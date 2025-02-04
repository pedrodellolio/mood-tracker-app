import LoadingSpinner from "@/components/loading-spinner";
import { useToast } from "@/hooks/use-toast";
import { auth, googleProvider } from "@/lib/firebase";
import { parse } from "date-fns";
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";

interface AuthContextData {
  user: User | null;
  userCreationDate: Date | null;
  isLoading: boolean;
  isAuth: boolean;
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
  const [userCreationDate, setUserCreationDate] = useState<Date | null>(null);
  const { toast } = useToast();

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
    setUserCreationDate(
      parse(
        user?.metadata.creationTime ?? "",
        "EEE, dd MMM yyyy HH:mm:ss 'GMT'",
        new Date()
      )
    );
  }, [user]);

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      toast({ title: "Unable to logout." });
    }
  };

  const signInWithGoogle = async () => {
    try {
      setIsLoading(true);
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      toast({ title: "Unable to login with Google." });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userCreationDate,
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
