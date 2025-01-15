import MonthCalendar from "@/components/month-calendar";
import MoodLegend from "@/components/mood-legend";
import MonthCalendarSkeleton from "@/components/skeleton/month-calendar-skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import YearCalendar from "@/components/year-calendar";
import YearPicker from "@/components/year-picker";
import { useDailyMood } from "@/hooks/use-daily-mood";
import { Layout } from "@/models/calendar";
import { Calendar, LayoutGrid } from "lucide-react";

function Home() {
  const { months } = useDailyMood();

  return (
    <div>
      <MoodLegend />
      <Tabs defaultValue={Layout.MONTH.toString()}>
        <div className="flex flex-col-reverse md:flex-row md:justify-between md:items-center gap-6 md:gap-0 my-10">
          <TabsList>
            <TabsTrigger className="w-1/2" value={Layout.MONTH.toString()}>
              <Calendar size={18} />
            </TabsTrigger>
            <TabsTrigger className="w-1/2" value={Layout.YEAR.toString()}>
              <LayoutGrid size={18} />
            </TabsTrigger>
          </TabsList>

          <YearPicker />
        </div>
        <TabsContent value={Layout.MONTH.toString()}>
          {!months || months.length == 0 ? (
            <MonthCalendarSkeleton />
          ) : (
            months.map((month) => (
              <MonthCalendar data={month} key={month.index} />
            ))
          )}
        </TabsContent>
        <TabsContent value={Layout.YEAR.toString()}>
          <YearCalendar data={months} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Home;
