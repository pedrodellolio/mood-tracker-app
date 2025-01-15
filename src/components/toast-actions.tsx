import { useDailyMood } from "@/hooks/use-daily-mood";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { addOrUpdateMoods } from "@/services/mood";
import { Day, Mood } from "@/models/calendar";
import { useAuth } from "@/hooks/use-auth";

export default function ToastActions() {
  const { clearChanges, months } = useDailyMood();
  const { user } = useAuth();
  const { mutateAsync } = useMutation({
    mutationFn: (days: Day[]) => addOrUpdateMoods(user!.uid, days),
    onSuccess: () => {
      toast.dismiss("mood");
      toast.success("Mood updated successfully.", {
        duration: 3000,
      });
      clearChanges();
    },
    onError: () => {
      alert("there was an error");
    },
  });

  const undoMoodChanges = () => {
    clearChanges();
  };

  const saveMoodChanges = () => {
    const daysWithMoodChanges = months
      .flatMap((month) => month.days)
      .filter((day) => day.mood !== Mood.DEFAULT);
    mutateAsync(daysWithMoodChanges);
  };

  return (
    <div className="flex flex-row gap-2">
      <Button
        onClick={undoMoodChanges}
        size={"sm"}
        variant={"ghost"}
        className="text-red-600 hover:text-red-600 hover:bg-red-50"
      >
        Undo
      </Button>
      <Button size={"sm"} type="button" onClick={saveMoodChanges}>
        Save
      </Button>
    </div>
  );
}
