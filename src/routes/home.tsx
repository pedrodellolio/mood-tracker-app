import MonthCalendar from "@/components/month-calendar";
import MoodLegend from "@/components/mood-legend";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { getAllDaysFromYear } from "@/services/mood";
import { useQuery } from "@tanstack/react-query";

function Home() {
  const { logout, user } = useAuth();
  const {
    data: months,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["months", user?.uid, 2025],
    queryFn: () => getAllDaysFromYear(user!.uid, 2025),
    enabled: !!user,
  });

  return (
    <div>
      <Button onClick={logout} className="w-full" variant={"link"}>
        Logout
      </Button>
      <MoodLegend />
      {months?.map((month) => (
        <MonthCalendar data={month} key={month.index} />
      ))}
    </div>
  );
}

export default Home;
