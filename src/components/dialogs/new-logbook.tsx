import { useMediaQuery } from "@/hooks/use-media-query";
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
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";

export default function NewLogbookDialog() {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
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

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button size={"sm"} variant={"neutral"} className="w-full">
          New Logbook
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Create a Logbook</DrawerTitle>
          <DrawerDescription>
            Create a new Logbook here. Click save when you're done.
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-6 mb-8">
          <NewLogbookForm />
        </div>
        {/* <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="noShadow">Cancel</Button>
          </DrawerClose>
        </DrawerFooter> */}
      </DrawerContent>
    </Drawer>
  );

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
