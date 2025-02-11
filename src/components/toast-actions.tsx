import { useLogbook } from "@/hooks/use-logbook";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import { addOrUpdateMoods } from "@/services/mood";
import { Day } from "@/models/calendar";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import LoadingButton from "./loading-button";
import { useParams } from "react-router";
import { useLogbookToast } from "@/hooks/use-logbook-toast";

export default function ToastActions() {
  const { logbookId } = useParams();
  const { clearChanges, months } = useLogbook();
  const { user } = useAuth();
  const { toast } = useToast();
  const { closeAlert } = useLogbookToast();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (days: Day[]) =>
      addOrUpdateMoods(user!.uid, logbookId ?? "", days),
    onSuccess: () => {
      undoMoodChanges();
    },
    onError: (error) => {
      undoMoodChanges();
      toast.error(error?.message);
    },
  });

  const undoMoodChanges = () => {
    clearChanges();
    closeAlert();
  };

  const saveMoodChanges = () => {
    const daysWithMoodChanges = months
      .flatMap((month) => month.days)
      .filter((day) => day.changed);

    mutateAsync(daysWithMoodChanges);
  };

  return (
    <div className="flex flex-row gap-2">
      <Button
        onClick={undoMoodChanges}
        size={"sm"}
        variant={"default"}
        className="text-red-600 hover:text-red-600 hover:bg-red-50"
      >
        Undo
      </Button>
      <LoadingButton
        loading={isPending}
        size={"sm"}
        onClick={saveMoodChanges}
        type="button"
      >
        Save
      </LoadingButton>
    </div>
  );
}
