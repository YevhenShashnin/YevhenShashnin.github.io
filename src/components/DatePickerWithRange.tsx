"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useTranslation } from "react-i18next";
import { enUS, de, ru, es, fr, uk } from "date-fns/locale";
import { calendarOptionsEnum } from "@/constants/enums";


interface DatePickerWithRangeProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
    date: DateRange | undefined;
    setDate: (date: DateRange | undefined) => void;

}

// Import locale objects from date-fns
type LocaleKey = "en" | "de" | "ru" | "es" | "fr" | "uk";

// Mapping of language codes to date-fns locale objects
const localeMap = {
    en: enUS,
    de: de,
    ru: ru,
    es: es,
    fr: fr,
    uk: uk,
};

const buttons = [
    {
        label: "calendar.last24h",
        value: calendarOptionsEnum.LAST_24H,
    },
    {
        label: "calendar.yesterday",
        value: calendarOptionsEnum.YESTERDAY,
    },
    {
        label: "calendar.last7d",
        value: calendarOptionsEnum.LAST_7_DAYS,
    },
    {
        label: "calendar.thisWeek",
        value: calendarOptionsEnum.THIS_WEEK,
    },
    {
        label: "calendar.lastWeek",
        value: calendarOptionsEnum.LAST_WEEK,
    },
    {
        label: "calendar.thisMonth",
        value: calendarOptionsEnum.THIS_MONTH,
    },
    {
        label: "calendar.lastMonth",
        value: calendarOptionsEnum.LAST_MONTH,
    },
    {
        label: "calendar.last30d",
        value: calendarOptionsEnum.LAST_30_DAYS,
    },
    {
        label: "calendar.allTime",
        value: calendarOptionsEnum.ALL_TIME,
    },
];


export function DatePickerWithRange({
                                        className,
                                        date,
                                        setDate,
                                    }: DatePickerWithRangeProps) {
    const { i18n, t } = useTranslation();
    const dateFnsLocale = localeMap[i18n.language as LocaleKey] || enUS;
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

    const togglePopover = () => setIsPopoverOpen(!isPopoverOpen);
    const manualCalenarHandler = (value: calendarOptionsEnum) => {
        const today = new Date();
        switch (value) {
            case calendarOptionsEnum.LAST_24H:
                setDate({
                    from: new Date(),
                    to: new Date(),
                });
                break;
            case calendarOptionsEnum.YESTERDAY:
                setDate({
                    from: new Date(new Date().setDate(new Date().getDate() - 1)),
                    to: new Date(new Date().setDate(new Date().getDate() - 1)),
                });
                break;
            case calendarOptionsEnum.LAST_7_DAYS:
                setDate({
                    from: new Date(new Date().setDate(new Date().getDate() - 7)),
                    to: new Date(),
                });
                break;
            case calendarOptionsEnum.THIS_WEEK:
                const dayOfWeek = today.getDay();
                const startOfWeek = new Date(today.setDate(today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1)));
                setDate({
                    from: startOfWeek,
                    to: today,
                });
                break;
            case calendarOptionsEnum.LAST_WEEK:
                const currentDay = today.getDay();
                const startOfThisWeek = new Date(today);
                startOfThisWeek.setDate(today.getDate() - currentDay + (currentDay === 0 ? -6 : 1));
                let startDate = new Date(startOfThisWeek);
                startDate.setDate(startOfThisWeek.getDate() - 7);
                let endDate = new Date(startOfThisWeek);
                endDate.setDate(startOfThisWeek.getDate() - 1);
                setDate({
                    from: startDate,
                    to: endDate,
                });
                break;
            case calendarOptionsEnum.THIS_MONTH:
                setDate({
                    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                    to: new Date(),
                });
                break;
            case calendarOptionsEnum.LAST_MONTH:
                setDate({
                    from: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
                    to: new Date(new Date().getFullYear(), new Date().getMonth(), 0),
                });
                break;
            case calendarOptionsEnum.LAST_30_DAYS:
                setDate({
                    from: new Date(new Date().setDate(new Date().getDate() - 30)),
                    to: new Date(),
                });
                break;
            case calendarOptionsEnum.ALL_TIME:
                setDate({
                    from: undefined,
                    to: undefined,
                });
                break;
            default:
                break;
        }
        togglePopover();
    };
    return (
        <div className={cn("grid gap-2", className)}>
            <Popover open={isPopoverOpen} onOpenChange={togglePopover}>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                            "w-[300px] justify-start text-left font-normal",
                            !date && "text-muted-foreground",
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, "LLL dd, y", { locale: dateFnsLocale })} -{" "}
                                    {format(date.to, "LLL dd, y", { locale: dateFnsLocale })}
                                </>
                            ) : (
                                format(date.from, "LLL dd, y", { locale: dateFnsLocale })
                            )
                        ) : (
                            <span>Pick a date</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 flex flex-col sm:flex-row items-center" align="start">
                    <div className="flex flex-col p-3">
                        {buttons.map((button, index) => (
                            <Button className="text-sm font-normal py-0 px-0 h-8" variant="ghost" key={button.label}
                                    onClick={() => manualCalenarHandler(button.value)}>
                                {t(button.label)}
                            </Button>
                        ))}
                    </div>
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                        locale={dateFnsLocale}
                        disabled={{
                            after: new Date(),
                        }}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}
