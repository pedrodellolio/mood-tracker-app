import React, { Dispatch } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "./ui/drawer";
import { Button } from "./ui/button";

type Props = {
  isDrawerOpen: boolean;
  setIsDrawerOpen: Dispatch<React.SetStateAction<boolean>>;
};

export default function MarkerOptionsDrawer({
  isDrawerOpen,
  setIsDrawerOpen,
}: Props) {
  return (
    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <DrawerContent>
        <div className="mx-auto w-[300px]">
          <DrawerHeader>
            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter className="grid grid-cols-2">
            <Button variant="noShadow">Submit</Button>
            <DrawerClose asChild>
              <Button className="bg-bw text-text" variant="noShadow">
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
