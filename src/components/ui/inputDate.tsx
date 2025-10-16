"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function formatDate(date: Date | undefined) {
  if (!date) return "";
  return date.toISOString().split("T")[0];
}

function isValidDate(date: Date | undefined) {
  return date instanceof Date && !isNaN(date.getTime());
}

export function InputDate({
  onChangeDate,
  value: propValue,
}: {
  onChangeDate: (date: string) => void;
  value?: string;
}) {
  const [open, setOpen] = React.useState(false);

  const [date, setDate] = React.useState<Date | undefined>(() =>
    propValue && isValidDate(new Date(propValue))
      ? new Date(propValue)
      : undefined
  );
  const [month, setMonth] = React.useState<Date | undefined>(date);
  const [value, setValue] = React.useState<string>(() =>
    date ? formatDate(date) : ""
  );

  React.useEffect(() => {
    if (!propValue) return;
    const newDate = new Date(propValue);
    if (isValidDate(newDate)) {
      setDate(newDate);
      setMonth(newDate);
      setValue(formatDate(newDate));
    }
  }, [propValue]);

  return (
    <div className="flex flex-col gap-3 mt-2">
      <Label>
        Application Date<span className="text-red-500">*</span>
      </Label>
      <div className="relative flex gap-2">
        <Input
          id="date"
          type="date"
          value={value}
          className="bg-[#fffdf6] pr-10"
          onChange={(e) => {
            const newDate = new Date(e.target.value);
            const iso = e.target.value;
            setValue(iso);
            if (isValidDate(newDate)) {
              setDate(newDate);
              setMonth(newDate);
              onChangeDate(iso);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setOpen(true);
            }
          }}
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              id="date-picker"
              variant="ghost"
              className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
            >
              <CalendarIcon className="size-3.5" />
              <span className="sr-only">Select date</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto overflow-hidden p-0"
            align="end"
            alignOffset={-8}
            sideOffset={10}
          >
            <Calendar
              mode="single"
              selected={date}
              month={month}
              onMonthChange={setMonth}
              onSelect={(newDate) => {
                if (
                  !newDate ||
                  (date && newDate.toDateString() === date.toDateString())
                ) {
                  setOpen(false);
                  return;
                }

                setDate(newDate);
                const iso = newDate.toISOString().split("T")[0];
                setValue(iso);
                setOpen(false);
                onChangeDate(iso);
              }}
              className="bg-[#fffdf6]"
              captionLayout="dropdown"
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
