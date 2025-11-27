import { FC } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Episode } from "@/types/anime.types";

interface CustomSelectProps {
  options: Episode[];
  handleChange: (value: string) => void;
  placeholder?: string;
}

export const CustomSelect: FC<CustomSelectProps> = ({
  options,
  handleChange,
  placeholder,
}) => {
  return (
    <Select onValueChange={handleChange}>
      <SelectTrigger className="w-[200px] text-white">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((episode, index) => (
            <SelectItem
              key={episode.id}
              value={episode.hls_720 ? episode.hls_720 : ""}
            >
              {episode.name ? episode.name : index + 1 + " Серия"}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
