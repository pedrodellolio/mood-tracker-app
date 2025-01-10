import MonthCalendar from "@/components/month-calendar";
import MoodLegend from "@/components/mood-legend";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import YearCalendar from "@/components/year-calendar";
import { useDailyMood } from "@/hooks/use-daily-mood";
import { Calendar, LayoutGrid } from "lucide-react";
import { useState } from "react";

enum Layout {
  MONTH,
  YEAR,
}

function Home() {
  const { months } = useDailyMood();

  return (
    <div>
      <MoodLegend />
      <Tabs defaultValue={Layout.MONTH.toString()}>
        <TabsList className="mb-6 mt-8">
          <TabsTrigger value={Layout.MONTH.toString()}>
            <Calendar size={22} />
          </TabsTrigger>
          <TabsTrigger value={Layout.YEAR.toString()}>
            <LayoutGrid size={22} />
          </TabsTrigger>
        </TabsList>
        <TabsContent value={Layout.MONTH.toString()}>
          {months?.map((month) => (
            <MonthCalendar data={month} key={month.index} />
          ))}
        </TabsContent>
        <TabsContent value={Layout.YEAR.toString()}>
          <YearCalendar data={months} />
        </TabsContent>
      </Tabs>

      {/* <div className="w-full mb-10 flex flex-col justify-end gap-2">
        <Button
          className="self-end"
          variant="outline"
          size="icon"
          onClick={changeView}
        >
          {layout == Layout.MONTH ? <LayoutGrid /> : <Calendar />}
        </Button>

        <MoodLegend />
      </div>

      {layout == Layout.MONTH ? (
        months?.map((month) => <MonthCalendar data={month} key={month.index} />)
      ) : (
        <YearCalendar data={months} />
      )} */}
    </div>
  );
}

export default Home;
