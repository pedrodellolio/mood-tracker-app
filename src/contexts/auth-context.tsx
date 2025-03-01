import LoadingSpinner from "@/components/loading-spinner";
import { useToast } from "@/hooks/use-toast";
import { auth, googleProvider } from "@/lib/firebase";
import { createDefaultLogbook, hasAnyLogbooks } from "@/services/logbook";
import { useQueryClient } from "@tanstack/react-query";
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
  const [userCreationDate, setUserCreationDate] = useState<Date | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      setUser(user);
      if (user) {
        validateLogbooks(user.uid);
        queryClient.invalidateQueries({ queryKey: ["logbooks", user.uid] });
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      setUserCreationDate(
        parse(
          user.metadata.creationTime ?? "",
          "EEE, dd MMM yyyy HH:mm:ss 'GMT'",
          new Date()
        )
      );
    }
  }, [user]);

  const validateLogbooks = async (uid: string) => {
    try {
      const hasAny = await hasAnyLogbooks(uid);
      if (!hasAny) await createDefaultLogbook(uid);
    } catch (error) {
      toast({ title: "Unable to fetch for Logbooks." });
    }
  };

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
