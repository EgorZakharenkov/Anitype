"use client";

import { FC, SetStateAction, useState } from "react";
import { useOutside } from "@/lib/hooks/useOutside";
import { Ellipse } from "@/components/ui/Ellipse";
import { Input } from "@/components/ui/Input";
import { SearchIcon } from "@/components/shared/icons/search";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/shadcn/dialog";

interface SearchProps {
  value?: string;
}

export const Search: FC<SearchProps> = ({}) => {
  const [value, setValue] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const outsideClick = useOutside(() => setOpen(false));

  const handleClick = () => {
    setOpen(true);
  };

  const handleChangeValue = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setValue(e.target.value);
  };
  return (
    <Dialog>
      <form action="">
        <DialogTrigger>
          <Ellipse>
            <SearchIcon />
          </Ellipse>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[1200px] h-11/12">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </form>
    </Dialog>
  );
};
