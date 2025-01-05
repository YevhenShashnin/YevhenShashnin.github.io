"use client";

import * as React from "react";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "./button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export function TimePicker24h() {

    const [time, setTime] = React.useState<Date>(() => new Date());
    const [isOpen, setIsOpen] = React.useState(false);

    const hours = Array.from({ length: 24 }, (_, i) => i);
    const minuteIncrements = Array.from({ length: 12 }, (_, i) => i * 5); // 0, 5, 10, ... 55

    const handleTimeChange = (type: "hour" | "minute", value: string) => {
        const newDate = new Date(time);
        if (type === "hour") {
            newDate.setHours(parseInt(value));
        } else if (type === "minute") {
            newDate.setMinutes(parseInt(value));
        }
        setTime(newDate);
    };

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className={cn(
                        "w-full justify-start text-left font-normal",
                        !time && "text-muted-foreground"
                    )}
                >
                    {time ? format(time, "HH:mm") : <span>HH:mm</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
                    {/* Hours */}
                    <ScrollArea className="w-64 sm:w-auto">
                        <div className="flex sm:flex-col p-2">
                            {hours.map((hour) => (
                                <Button
                                    key={hour}
                                    size="icon"
                                    variant={time.getHours() === hour ? "default" : "ghost"}
                                    className="sm:w-full shrink-0 aspect-square"
                                    onClick={() => handleTimeChange("hour", hour.toString())}
                                >
                                    {hour.toString().padStart(2, "0")}
                                </Button>
                            ))}
                        </div>
                        <ScrollBar orientation="horizontal" className="sm:hidden" />
                    </ScrollArea>

                    {/* Minutes */}
                    <ScrollArea className="w-64 sm:w-auto">
                        <div className="flex sm:flex-col p-2">
                            {minuteIncrements.map((minute) => (
                                <Button
                                    key={minute}
                                    size="icon"
                                    variant={time.getMinutes() === minute ? "default" : "ghost"}
                                    className="sm:w-full shrink-0 aspect-square"
                                    onClick={() => handleTimeChange("minute", minute.toString())}
                                >
                                    {minute.toString().padStart(2, "0")}
                                </Button>
                            ))}
                        </div>
                        <ScrollBar orientation="horizontal" className="sm:hidden" />
                    </ScrollArea>
                </div>
            </PopoverContent>
        </Popover>
    );
}
