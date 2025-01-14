import MonthCalendar from "@/components/month-calendar";
import MoodLegend from "@/components/mood-legend";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import YearCalendar from "@/components/year-calendar";
import { useAuth } from "@/hooks/use-auth";
import { useDailyMood } from "@/hooks/use-daily-mood";
import { currentYear } from "@/lib/date";
import { Layout } from "@/models/calendar";
import { format } from "date-fns";
import { Calendar, ChevronLeft, ChevronRight, LayoutGrid } from "lucide-react";

function Home() {
  const { months, selectedYear, changeYear } = useDailyMood();
  const { userCreationDate } = useAuth();

  const userCreationYear = parseInt(
    format(userCreationDate ?? new Date(), "yyyy")
  );

  const disablePrevButton = selectedYear <= userCreationYear;
  const disableNextButton = selectedYear >= currentYear;

  return (
    <div>
      <MoodLegend />
      <Tabs defaultValue={Layout.MONTH.toString()}>
        <div className="flex flex-row justify-between items-center mb-6 mt-8">
          <TabsList>
            <TabsTrigger value={Layout.MONTH.toString()}>
              <Calendar size={18} />
            </TabsTrigger>
            <TabsTrigger value={Layout.YEAR.toString()}>
              <LayoutGrid size={18} />
            </TabsTrigger>
          </TabsList>

          <div className="flex flex-row items-center">
            <Button
              variant={"ghost"}
              size={"sm"}
              onClick={() => changeYear(-1)}
              disabled={disablePrevButton} // Disable button if at creation year
            >
              <ChevronLeft />
            </Button>
            <p className="font-semibold text-secondary-foreground/90 cursor-pointer hover:bg-secondary px-4 py-1 rounded-md">
              {selectedYear}
            </p>
            <Button
              variant={"ghost"}
              size={"sm"}
              onClick={() => changeYear(1)}
              disabled={disableNextButton} // Disable button if at current year
            >
              <ChevronRight />
            </Button>
          </div>
        </div>
        <TabsContent value={Layout.MONTH.toString()}>
          {months?.map((month) => (
            <MonthCalendar data={month} key={month.index} />
          ))}
        </TabsContent>
        <TabsContent value={Layout.YEAR.toString()}>
          <YearCalendar data={months} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Home;
