import MonthCalendar from "./components/month-calendar";
import { getMonthsWithDays } from "./lib/date";

function App() {
  const currentYear = 2025;
  const months = getMonthsWithDays(currentYear);
  return (
    <div>
      {months.map((month) => (
        <MonthCalendar data={month} key={month.index} />
      ))}
    </div>
  );
}

export default App;
