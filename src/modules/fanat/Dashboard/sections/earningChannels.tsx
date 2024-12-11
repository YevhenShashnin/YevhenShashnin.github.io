import React from 'react';
import {Card, CardContent, CardTitle} from "@/components/ui/fanat/card";
import {ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent} from "@/components/ui/fanat/chart";
import {CartesianGrid, LabelList, Line, LineChart, Pie, PieChart, XAxis} from "recharts";
import {useTranslation} from "react-i18next";
import {InfoTooltip} from "@/components/ui/fanat/infoTooltip";

const chartData2 = [
    {month: "January", subscriptions: 186, tips: 80, posts: 50, messages: 30, referrals: 20, streams: 10},
    {month: "February", subscriptions: 305, tips: 200, posts: 70, messages: 40, referrals: 30, streams: 20},
    {month: "March", subscriptions: 237, tips: 120, posts: 60, messages: 35, referrals: 25, streams: 15},
    {month: "April", subscriptions: 73, tips: 190, posts: 80, messages: 50, referrals: 40, streams: 30},
    {month: "May", subscriptions: 209, tips: 130, posts: 65, messages: 45, referrals: 35, streams: 25},
    {month: "June", subscriptions: 214, tips: 140, posts: 75, messages: 55, referrals: 45, streams: 35},
];

const chartConfig2 = {
    subscriptions: {
        label: "Subscriptions",
        color: "#3357FF",
    },
    tips: {
        label: "Tips",
        color: "#FFA833",
    },
    posts: {
        label: "Posts",
        color: "#33FFA8",
    },
    messages: {
        label: "Messages",
        color: "hsl(var(--chart-4))",
    },
    referrals: {
        label: "Referrals",
        color: "hsl(var(--chart-5))",
    },
    streams: {
        label: "Streams",
        color: "#b4915d",
    },
} satisfies ChartConfig;
type ChartConfig2Keys = keyof typeof chartConfig2;
type ChartData2Keys = keyof typeof chartData2[0];

const donutData = Object.keys(chartConfig2).map((key) => ({
    name: chartConfig2[key as ChartConfig2Keys].label,
    value: chartData2.reduce((acc, item) => {
        const value = item[key as keyof typeof item];
        return acc + (typeof value === 'number' ? value : 0);
    }, 0),
    fill: chartConfig2[key as ChartConfig2Keys].color,
}));
export const EarningChannels = () => {
    const {t} = useTranslation();
    return (
        <Card className="px-5 py-5 col-span-4 gap-2">
            <CardTitle className="flex items-center">
                {t('dashboard.earningByChannels')}
                <InfoTooltip tooltipText={'dashboard.earningByChannelsTooltip'}/>
            </CardTitle>
            <CardContent className='grid grid-cols-4 gap-10'>


                <ChartContainer className='col-span-4 md:col-span-3' config={chartConfig2}>
                    <LineChart
                        accessibilityLayer
                        data={chartData2}
                        margin={{
                            top: 20,
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false}/>
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line"/>}
                        />
                        {Object.keys(chartConfig2).map((key) => (
                            <Line
                                key={key}
                                dataKey={key}
                                type="natural"
                                stroke={`var(--color-${key})`}
                                strokeWidth={2}
                                dot={{
                                    fill: `var(--color-${key})`,
                                }}
                                activeDot={{
                                    r: 6,
                                }}
                            >
                                <LabelList
                                    position="top"
                                    offset={12}
                                    className="fill-foreground"
                                    fontSize={12}
                                />
                            </Line>
                        ))}
                    </LineChart>
                </ChartContainer>
                <div className="col-span-4 md:col-span-1 flex flex-col h-full gap-4 justify-center">
                    <ChartContainer
                        config={chartConfig2}
                        className="mx-auto aspect-square h-[200px]"
                    >
                        <PieChart>
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent hideLabel/>}
                            />
                            <Pie
                                data={donutData}
                                dataKey="value"
                                nameKey="name"
                                innerRadius={50}
                            />
                        </PieChart>
                    </ChartContainer>
                    {Object.keys(chartConfig2).map((key) => (
                        <div key={key} className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <div
                                    className="w-4 h-4 rounded-full"
                                    style={{backgroundColor: chartConfig2[key as ChartConfig2Keys].color}}
                                ></div>
                                <span>{chartConfig2[key as ChartConfig2Keys].label}</span>
                            </div>
                            <span>
             ${chartData2.reduce((acc, item) => {
                                const value = item[key as keyof typeof item];
                                return acc + (typeof value === 'number' ? value : 0);
                            }, 0).toLocaleString()}
          </span>
                        </div>
                    ))}
                </div>
            </CardContent>

        </Card>

    );
};

