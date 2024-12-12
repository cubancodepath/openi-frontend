import { CheckIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const parameters = [
  { value: "co_gt", label: "CO" },
  { value: "c6h6_gt", label: "Benzene" },
  { value: "nmhc_gt", label: "NMHC" },
  { value: "nox_gt", label: "NOx" },
  { value: "no2_gt", label: "NO2" },
];

interface ParameterSelectorProps {
  selectedParams: string[];
  setSelectedParams: (params: string[]) => void;
}

export function ParameterSelector({
  selectedParams,
  setSelectedParams,
}: ParameterSelectorProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedParams.length > 0
            ? `${selectedParams.length} selected`
            : "Select parameters..."}
          <CheckIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search parameters..." className="h-9" />
          <CommandEmpty>No parameter found.</CommandEmpty>
          <CommandGroup>
            {parameters.map((parameter) => (
              <CommandItem
                key={parameter.value}
                onSelect={() => {
                  setSelectedParams(
                    selectedParams.includes(parameter.value)
                      ? selectedParams.filter((p) => p !== parameter.value)
                      : [...selectedParams, parameter.value]
                  );
                }}
              >
                <CheckIcon
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedParams.includes(parameter.value)
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
                {parameter.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
