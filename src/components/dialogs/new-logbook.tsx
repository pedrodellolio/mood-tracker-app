import NewLogbookForm from "../forms/new-logbook";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

export default function NewLogbookDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"sm"} variant={"neutral"} className="w-full">
          New Logbook
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a Logbook</DialogTitle>
          <DialogDescription>
            Create a new Logbook here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <NewLogbookForm />
      </DialogContent>
    </Dialog>
  );
}
