import MonthCalendar from "@/components/month-calendar";
import MoodLegend from "@/components/mood-legend";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toaster } from "@/components/ui/toaster";
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
        <div className="flex flex-col-reverse xl:flex-row gap-8 justify-between items-center mb-8 mt-10">
          <TabsList className="w-full xl:w-auto">
            <TabsTrigger className="w-1/2 xl:w-auto" value={Layout.MONTH.toString()}>
              <Calendar size={18} />
            </TabsTrigger>
            <TabsTrigger className="w-1/2 xl:w-auto" value={Layout.YEAR.toString()}>
              <LayoutGrid size={18} />
            </TabsTrigger>
          </TabsList>

          <YearPicker />
        </div>
        <TabsContent value={Layout.MONTH.toString()}>
          {!months ? (
            <p>Loading...</p>
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
      <Toaster />
    </div>
  );
}

export default Home;
