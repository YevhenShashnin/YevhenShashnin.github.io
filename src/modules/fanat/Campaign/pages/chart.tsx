'use client';

import * as React from 'react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/fanat/label';
import { useTranslation } from 'react-i18next';
import { DatePickerWithRange_ } from '@/components/DatePickerWithRange_';
import { DateRange } from 'react-day-picker';
import { subDays } from 'date-fns';
import { CardFooter } from '@/components/ui/fanat/card';

const chartData = [
    { date: '2024-04-01', subscribers: 222, revenue: 0 },
    { date: '2024-04-02', subscribers: 97, revenue: 0 },
    { date: '2024-04-03', subscribers: 167, revenue: 0 },
    { date: '2024-04-04', subscribers: 242, revenue: 0 },
    { date: '2024-04-05', subscribers: 373, revenue: 0 },
    { date: '2024-04-06', subscribers: 301, revenue: 0 },
    { date: '2024-04-07', subscribers: 245, revenue: 0 },
    { date: '2024-04-08', subscribers: 409, revenue: 0 },
    { date: '2024-04-09', subscribers: 59, revenue: 0 },
    { date: '2024-04-10', subscribers: 261, revenue: 0 },
    { date: '2024-04-11', subscribers: 327, revenue: 0 },
    { date: '2024-04-12', subscribers: 292, revenue: 0 },
    { date: '2024-04-13', subscribers: 342, revenue: 0 },
    { date: '2024-04-14', subscribers: 137, revenue: 0 },
    { date: '2024-04-15', subscribers: 120, revenue: 0 },
    { date: '2024-04-16', subscribers: 138, revenue: 0 },
    { date: '2024-04-17', subscribers: 446, revenue: 0 },
    { date: '2024-04-18', subscribers: 364, revenue: 0 },
    { date: '2024-04-19', subscribers: 243, revenue: 0 },
    { date: '2024-04-20', subscribers: 89, revenue: 0 },
    { date: '2024-04-21', subscribers: 137, revenue: 0 },
    { date: '2024-04-22', subscribers: 224, revenue: 0 },
    { date: '2024-04-23', subscribers: 138, revenue: 0 },
    { date: '2024-04-24', subscribers: 387, revenue: 0 },
    { date: '2024-04-25', subscribers: 215, revenue: 0 },
    { date: '2024-04-26', subscribers: 75, revenue: 0 },
    { date: '2024-04-27', subscribers: 383, revenue: 0 },
    { date: '2024-04-28', subscribers: 122, revenue: 0 },
    { date: '2024-04-29', subscribers: 315, revenue: 0 },
    { date: '2024-04-30', subscribers: 454, revenue: 0 },
];

const chartConfig = {
    visitors: {
        label: 'Visitors',
    },
    subscribers: {
        label: 'Subscribers',
        color: 'hsl(var(--chart-1))',
    },
    revenue: {
        label: 'Revenue',
        color: 'hsl(var(--chart-2))',
    },
} satisfies ChartConfig;

export function Component() {
    const [timeRange, setTimeRange] = React.useState('90d');
    const [showRevenue, setShowRevenue] = React.useState(false);
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: subDays(new Date(), 7),
        to: new Date(),
    });
    const { t } = useTranslation();

    // const filteredData = chartData.filter((item) => {
    //     const date = new Date(item.date);
    //     const referenceDate = new Date('2024-06-30');
    //     let daysToSubtract = 90;
    //     if (timeRange === '30d') {
    //         daysToSubtract = 30;
    //     } else if (timeRange === '7d') {
    //         daysToSubtract = 7;
    //     }
    //     const startDate = new Date(referenceDate);
    //     startDate.setDate(startDate.getDate() - daysToSubtract);
    //     return date >= startDate;
    // });

    return (
        <Card className="p-5 w-[90%] sm:w-full sm:max-w-md m-2 shadow-md rounded-md">
            <CardHeader className="p-0 flex gap-6 space-y-0 border-b py-5 flex-col justify-center items-center">
                <DatePickerWithRange_
                    className=""
                    date={date}
                    setDate={setDate}
                />
                <div className="items-center gap-2 flex">
                    <Label>{t('campaignLink.subscribers')}</Label>
                    <Switch
                        id={'switch'}
                        checked={showRevenue}
                        onCheckedChange={setShowRevenue}
                    />
                    <Label>{t('campaignLink.revenue')}</Label>
                </div>
                {/*<Select value={timeRange} onValueChange={setTimeRange}>*/}
                {/*    <SelectTrigger*/}
                {/*        className="w-[160px] rounded-lg sm:ml-auto"*/}
                {/*        aria-label="Select a value"*/}
                {/*    >*/}
                {/*        <SelectValue placeholder="Last 3 months" />*/}
                {/*    </SelectTrigger>*/}
                {/*    <SelectContent className="rounded-xl">*/}
                {/*        <SelectItem value="90d" className="rounded-lg">*/}
                {/*            Last 3 months*/}
                {/*        </SelectItem>*/}
                {/*        <SelectItem value="30d" className="rounded-lg">*/}
                {/*            Last 30 days*/}
                {/*        </SelectItem>*/}
                {/*        <SelectItem value="7d" className="rounded-lg">*/}
                {/*            Last 7 days*/}
                {/*        </SelectItem>*/}
                {/*    </SelectContent>*/}
                {/*</Select>*/}
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[250px] w-full"
                >
                    <AreaChart data={chartData}>
                        <defs>
                            <linearGradient
                                id="fillsubscribers"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-subscribers)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-subscribers)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                            <linearGradient
                                id="fillrevenue"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-revenue)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-revenue)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value);
                                return date.toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                });
                            }}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    labelFormatter={(value) => {
                                        return new Date(
                                            value
                                        ).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                        });
                                    }}
                                    indicator="dot"
                                />
                            }
                        />
                        <Area
                            dataKey={showRevenue ? 'revenue' : 'subscribers'}
                            type="natural"
                            fill={`url(#fill${showRevenue ? 'revenue' : 'subscribers'})`}
                            stroke={`var(--color-${showRevenue ? 'revenue' : 'subscribers'})`}
                            stackId="a"
                        />
                        <ChartLegend content={<ChartLegendContent />} />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex "></CardFooter>
        </Card>
    );
}
