import LogbookAlert from "@/components/logbook-alert";
import MonthCalendar from "@/components/month-calendar";
import MoodLegend from "@/components/mood-legend";
import MonthCalendarSkeleton from "@/components/skeleton/month-calendar-skeleton";
import YearCalendarSkeleton from "@/components/skeleton/year-calendar-skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import YearCalendar from "@/components/year-calendar";
import YearPicker from "@/components/year-picker";
import { useAuth } from "@/hooks/use-auth";
import { useLogbook } from "@/hooks/use-logbook";
import { useToast } from "@/hooks/use-toast";
import { Layout } from "@/models/calendar";
import { getLogbookByIdOrDefault } from "@/services/logbook";
import { useQuery } from "@tanstack/react-query";
import { Calendar, LayoutGrid } from "lucide-react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";

function Home() {
  const { user } = useAuth();
  const { toast } = useToast();
  const { logbookId } = useParams();
  const { months } = useLogbook();
  const navigate = useNavigate();

  const { data, error } = useQuery({
    queryKey: ["logbook", user?.uid, logbookId],
    queryFn: async () => {
      return await getLogbookByIdOrDefault(user!.uid, logbookId);
    },
    enabled: !!user,
  });

  useEffect(() => {
    if (error) toast.error(error.message);
  }, [error, toast]);

  useEffect(() => {
    if (data && logbookId !== data.id) {
      navigate(`/${data.id}`);
    }
  }, [data, navigate]);

  return (
    <div>
      <MoodLegend />
      <Tabs defaultValue={Layout.MONTH.toString()}>
        <div className="flex flex-col-reverse xl:flex-row gap-8 justify-between items-center mb-8 mt-10">
          <TabsList className="w-full xl:w-auto">
            <TabsTrigger
              title="Calendar View"
              className="w-1/2 xl:w-auto"
              value={Layout.MONTH.toString()}
            >
              <Calendar size={18} />
            </TabsTrigger>
            <TabsTrigger
              title="Grid View"
              className="w-1/2 xl:w-auto"
              value={Layout.YEAR.toString()}
            >
              <LayoutGrid size={18} />
            </TabsTrigger>
          </TabsList>

          <YearPicker />
        </div>
        <TabsContent value={Layout.MONTH.toString()}>
          {months.length === 0 ? (
            <MonthCalendarSkeleton />
          ) : (
            months.map((month) => (
              <MonthCalendar data={month} key={month.index} />
            ))
          )}
        </TabsContent>
        <TabsContent value={Layout.YEAR.toString()}>
          {months.length === 0 ? (
            <YearCalendarSkeleton />
          ) : (
            <YearCalendar data={months} />
          )}
        </TabsContent>
      </Tabs>

      <LogbookAlert />
    </div>
  );
}

export default Home;
