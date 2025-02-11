import { useQuery } from "@tanstack/react-query";
import { getLogbooks } from "@/services/logbook";
import { useAuth } from "@/hooks/use-auth";
import { Logbook } from "@/models/logbook";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router";
import NewLogbookDialog from "./dialogs/new-logbook";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { useUserPreferences } from "@/hooks/use-user-preferences";

export default function Sidebar() {
  const { user } = useAuth();
  const { toast } = useToast();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { toggleSidebar } = useUserPreferences();

  const { data, error } = useQuery<Logbook[]>({
    queryKey: ["logbooks", user?.uid],
    queryFn: () => getLogbooks(user!.uid),
    enabled: !!user,
    // retry: 1,
  });

  useEffect(() => {
    if (error) toast.error(error.message);
  }, [error, toast]);

  return (
    <div
      className={`fixed border-r-2 border-border ${
        isDesktop ? "w-[200px]" : "w-full"
      } h-screen transition-all bg-white z-20`}
    >
      <nav className="w-full flex flex-col justify-center">
        <div className="flex flex-row items-center justify-between gap-6 mx-4 md:mx-6 my-6">
          <NewLogbookDialog />
          {!isDesktop && (
            <Button className="mt-1" size={"sm"} variant={"noShadow"} onClick={toggleSidebar}>
              <X />
            </Button>
          )}
        </div>

        <h1 className="text-md text-text font-bold mx-6 mt-8 mb-4">Logbooks</h1>
        <ul>
          {data ? (
            data.map((logbook, i) => {
              return (
                <li
                  key={logbook.id}
                  className={`${
                    data.length > 1 ? "border-b-2" : "border-y-2"
                  } ${i == 0 && "border-t-2"}
                  border-border`}
                >
                  <Link
                    to={`/${logbook.id}`}
                    className="px-6 py-2 flex hover:bg-gray-300 text-secondaryBlack"
                    onClick={toggleSidebar}
                  >
                    {logbook.name}
                  </Link>
                </li>
              );
            })
          ) : (
            <p>Loading...</p>
          )}
        </ul>
      </nav>
    </div>
  );
}
