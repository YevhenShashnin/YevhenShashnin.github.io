import React, {useEffect, useState} from 'react';
import {DatePickerWithRange} from '@/components/DatePickerWithRange';
import {DateRange} from 'react-day-picker';
import {subDays} from 'date-fns';
import {MultipleSelect} from '@/components/ui';
import {useTranslation} from 'react-i18next';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Label} from '@/components/ui/label';
import {SelectComponent} from '@/components/ui/select-component';
import OnlyFans from '@/assets/icons/fansly.svg?react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import {Info, TicketPlus, Lightbulb, StickyNote, Asterisk, MessageCircleMore, TvMinimalPlay} from 'lucide-react';
import {Bar, BarChart, CartesianGrid, XAxis, YAxis, LineChart, Line, LabelList} from "recharts"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

const mockAccounts = [
    {value: 'account1', label: 'Account 1'},
    {value: 'account2', label: 'Account 2'},
    {value: 'account3', label: 'Account 3'},
    {value: 'account4', label: 'Account 4'},
    {value: 'account5', label: 'Account 5'},
];
const chartData = [
    {date: "2024-04-01", desktop: 222, mobile: 150},
    {date: "2024-04-02", desktop: 97, mobile: 180},
    {date: "2024-04-03", desktop: 167, mobile: 120},
    {date: "2024-04-04", desktop: 242, mobile: 260},
    {date: "2024-04-05", desktop: 373, mobile: 290},
    {date: "2024-04-06", desktop: 301, mobile: 340},
    {date: "2024-04-07", desktop: 245, mobile: 180},
    {date: "2024-04-08", desktop: 409, mobile: 320},
    {date: "2024-04-09", desktop: 59, mobile: 110},
    {date: "2024-04-10", desktop: 261, mobile: 190},
    {date: "2024-04-11", desktop: 327, mobile: 350},
    {date: "2024-04-12", desktop: 292, mobile: 210},
    {date: "2024-04-13", desktop: 342, mobile: 380},
    {date: "2024-04-14", desktop: 137, mobile: 220},
    {date: "2024-04-15", desktop: 120, mobile: 170},
    {date: "2024-04-16", desktop: 138, mobile: 190},
    {date: "2024-04-17", desktop: 446, mobile: 360},
    {date: "2024-04-18", desktop: 364, mobile: 410},
    {date: "2024-04-19", desktop: 243, mobile: 180},
    {date: "2024-04-20", desktop: 89, mobile: 150},
    {date: "2024-04-21", desktop: 137, mobile: 200},
    {date: "2024-04-22", desktop: 224, mobile: 170},
    {date: "2024-04-23", desktop: 138, mobile: 230},
    {date: "2024-04-24", desktop: 387, mobile: 290},
    {date: "2024-04-25", desktop: 215, mobile: 250},
    {date: "2024-04-26", desktop: 75, mobile: 130},
    {date: "2024-04-27", desktop: 383, mobile: 420},
    {date: "2024-04-28", desktop: 122, mobile: 180},
    {date: "2024-04-29", desktop: 315, mobile: 240},
    {date: "2024-04-30", desktop: 454, mobile: 380},
    {date: "2024-05-01", desktop: 165, mobile: 220},
    {date: "2024-05-02", desktop: 293, mobile: 310},
    {date: "2024-05-03", desktop: 247, mobile: 190},
    {date: "2024-05-04", desktop: 385, mobile: 420},
    {date: "2024-05-05", desktop: 481, mobile: 390},
    {date: "2024-05-06", desktop: 498, mobile: 520},
    {date: "2024-05-07", desktop: 388, mobile: 300},
    {date: "2024-05-08", desktop: 149, mobile: 210},
    {date: "2024-05-09", desktop: 227, mobile: 180},
    {date: "2024-05-10", desktop: 293, mobile: 330},
    {date: "2024-05-11", desktop: 335, mobile: 270},
    {date: "2024-05-12", desktop: 197, mobile: 240},
    {date: "2024-05-13", desktop: 197, mobile: 160},
    {date: "2024-05-14", desktop: 448, mobile: 490},
    {date: "2024-05-15", desktop: 473, mobile: 380},
    {date: "2024-05-16", desktop: 338, mobile: 400},
    {date: "2024-05-17", desktop: 499, mobile: 420},
    {date: "2024-05-18", desktop: 315, mobile: 350},
    {date: "2024-05-19", desktop: 235, mobile: 180},
    {date: "2024-05-20", desktop: 177, mobile: 230},
    {date: "2024-05-21", desktop: 82, mobile: 140},
    {date: "2024-05-22", desktop: 81, mobile: 120},
    {date: "2024-05-23", desktop: 252, mobile: 290},
    {date: "2024-05-24", desktop: 294, mobile: 220},
    {date: "2024-05-25", desktop: 201, mobile: 250},
    {date: "2024-05-26", desktop: 213, mobile: 170},
    {date: "2024-05-27", desktop: 420, mobile: 460},
    {date: "2024-05-28", desktop: 233, mobile: 190},
    {date: "2024-05-29", desktop: 78, mobile: 130},
    {date: "2024-05-30", desktop: 340, mobile: 280},
    {date: "2024-05-31", desktop: 178, mobile: 230},
    {date: "2024-06-01", desktop: 178, mobile: 200},
    {date: "2024-06-02", desktop: 470, mobile: 410},
    {date: "2024-06-03", desktop: 103, mobile: 160},
    {date: "2024-06-04", desktop: 439, mobile: 380},
    {date: "2024-06-05", desktop: 88, mobile: 140},
    {date: "2024-06-06", desktop: 294, mobile: 250},
    {date: "2024-06-07", desktop: 323, mobile: 370},
    {date: "2024-06-08", desktop: 385, mobile: 320},
    {date: "2024-06-09", desktop: 438, mobile: 480},
    {date: "2024-06-10", desktop: 155, mobile: 200},
    {date: "2024-06-11", desktop: 92, mobile: 150},
    {date: "2024-06-12", desktop: 492, mobile: 420},
    {date: "2024-06-13", desktop: 81, mobile: 130},
    {date: "2024-06-14", desktop: 426, mobile: 380},
    {date: "2024-06-15", desktop: 307, mobile: 350},
    {date: "2024-06-16", desktop: 371, mobile: 310},
    {date: "2024-06-17", desktop: 475, mobile: 520},
    {date: "2024-06-18", desktop: 107, mobile: 170},
    {date: "2024-06-19", desktop: 341, mobile: 290},
    {date: "2024-06-20", desktop: 408, mobile: 450},
    {date: "2024-06-21", desktop: 169, mobile: 210},
    {date: "2024-06-22", desktop: 317, mobile: 270},
    {date: "2024-06-23", desktop: 480, mobile: 530},
    {date: "2024-06-24", desktop: 132, mobile: 180},
    {date: "2024-06-25", desktop: 141, mobile: 190},
    {date: "2024-06-26", desktop: 434, mobile: 380},
    {date: "2024-06-27", desktop: 448, mobile: 490},
    {date: "2024-06-28", desktop: 149, mobile: 200},
    {date: "2024-06-29", desktop: 103, mobile: 160},
    {date: "2024-06-30", desktop: 446, mobile: 400},
]
const chartConfig = {
    views: {
        label: "Page Views",
    },
    desktop: {
        label: "Desktop",
        color: "hsl(var(--chart-1))",
    },
    mobile: {
        label: "Mobile",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig
const chartData2 = [
    { month: "January", subscriptions: 186, tips: 80, posts: 50, messages: 30, referrals: 20, streams: 10 },
    { month: "February", subscriptions: 305, tips: 200, posts: 70, messages: 40, referrals: 30, streams: 20 },
    { month: "March", subscriptions: 237, tips: 120, posts: 60, messages: 35, referrals: 25, streams: 15 },
    { month: "April", subscriptions: 73, tips: 190, posts: 80, messages: 50, referrals: 40, streams: 30 },
    { month: "May", subscriptions: 209, tips: 130, posts: 65, messages: 45, referrals: 35, streams: 25 },
    { month: "June", subscriptions: 214, tips: 140, posts: 75, messages: 55, referrals: 45, streams: 35 },
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
const Dashboard = () => {
    const {t} = useTranslation();
    const [activeChart, setActiveChart] =
        React.useState<keyof typeof chartConfig>("desktop")
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: subDays(new Date(), 7),
        to: new Date(),
    });
    const [allAccounts, setAllAccounts] = React.useState(new Set());
    const [selectedAccounts, setSelectedAccounts] = React.useState([]);

    return (
        <div className=" max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-2 m-10">
            {/*<Card className="w-full px-5 py-5">*/}
            {/*    <div className='flex flex-col gap-2'>*/}
            {/*        <Label>*/}
            {/*            {t("common.creator")}*/}
            {/*        </Label>*/}
            {/*        <MultipleSelect*/}
            {/*            options={mockAccounts}*/}
            {/*            value={selectedAccounts}*/}
            {/*            onChange={setSelectedAccounts}*/}
            {/*            placeholder={t("common.allCreators")}*/}
            {/*        />*/}
            {/*    </div>*/}

            {/*</Card>*/}
            <Card className=" px-5 py-5 col-span-4 flex gap-2">
                <div className="flex flex-col gap-2 w-[50%]">
                    <Label>{t('common.creator')}</Label>
                    <MultipleSelect
                        options={mockAccounts}
                        value={selectedAccounts}
                        onChange={setSelectedAccounts}
                        placeholder={t('common.allCreators')}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <Label>{t('dashboard.timeRange')}</Label>
                    <DatePickerWithRange date={date} setDate={setDate}/>
                </div>
                <div className="flex flex-col ">
                    <Label>{t('dashboard.earningType')}</Label>
                    <SelectComponent
                        field={{
                            onChange: (value) => console.log(value),
                        }}
                        fieldData={{
                            value: {id: 'net', value: 'net', label: 'Net'},
                            options: [
                                {id: 'net', value: 'net', label: 'Net'},
                                {id: 'gross', value: 'gross', label: 'Gross'},
                            ],
                        }}
                        defaultValue="net"
                    />
                </div>
            </Card>

            <Card className=" px-5 py-5 col-span-4 gap-2">
                <CardTitle className="flex items-center">
                    {t('dashboard.earningSummary')}
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Info className="w-[16px] hidden sm:block ml-2"/>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p className="max-w-[300px] text-wrap">
                                    {t('dashboard.earningTooltip')}
                                </p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </CardTitle>
                <CardContent className="grid grid-cols-4 p-0">
                    <div className="flex flex-col p-5 gap-4 border-r">
                        <OnlyFans className="w-10 h-10"/>
                        <p className=" text-[12px]">{t('dashboard.totalEarnings')}</p>
                        <p className="text-blue text-[36px] font-bold">$2,968.94</p>
                    </div>
                    <div className="flex flex-col p-5 gap-4 border-r justify-between">
                        <div className='flex justify-between'>
                            <div>
                                <p className='font-bold'>
                                    $1,346.18
                                </p>
                                <p className='text-[12px]'>
                                    {t('dashboard.subscriptions')}
                                </p>
                            </div>
                            <div className='bg-[#3357FF] w-[40px] h-[40px] rounded-full flex justify-center items-center'>
                                <TicketPlus/>
                            </div>
                        </div>
                        <div className='flex justify-between'>
                            <div>
                                <p className='font-bold'>
                                    $1,346.18
                                </p>
                                <p className='text-[12px]'>
                                    {t('dashboard.tips')}
                                </p>
                            </div>
                            <div className='bg-[#FFA833] w-[40px] h-[40px] rounded-full flex justify-center items-center'>
                                <Lightbulb/>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col p-5 gap-4 border-r justify-between">
                        <div className='flex justify-between'>
                            <div>
                                <p className='font-bold'>
                                    $1,346.18
                                </p>
                                <p className='text-[12px]'>
                                    {t('dashboard.posts')}
                                </p>
                            </div>
                            <div className='bg-[#33FFA8] w-[40px] h-[40px] rounded-full flex justify-center items-center'>
                                <StickyNote/>
                            </div>
                        </div>
                        <div className='flex justify-between'>
                            <div>
                                <p className='font-bold'>
                                    $1,346.18
                                </p>
                                <p className='text-[12px]'>
                                    {t('dashboard.refs')}
                                </p>
                            </div>
                            <div className='bg-[hsl(var(--chart-5))] w-[40px] h-[40px] rounded-full flex justify-center items-center'>
                                <Asterisk/>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col p-5 gap-4 justify-between">
                        <div className='flex justify-between'>
                            <div>
                                <p className='font-bold'>
                                    $1,346.18
                                </p>
                                <p className='text-[12px]'>
                                    {t('dashboard.messages')}
                                </p>
                            </div>
                            <div className='bg-[hsl(var(--chart-4))] w-[40px] h-[40px] rounded-full flex justify-center items-center'>
                                <MessageCircleMore/>
                            </div>
                        </div>
                        <div className='flex justify-between'>
                            <div>
                                <p className='font-bold'>
                                    $1,346.18
                                </p>
                                <p className='text-[12px]'>
                                    {t('dashboard.streams')}
                                </p>
                            </div>
                            <div className='bg-[#b4915d]  w-[40px] h-[40px] rounded-full flex justify-center items-center'>
                                <TvMinimalPlay/>
                            </div>
                        </div>
                    </div>

                </CardContent>
            </Card>
            <Card className=" px-5 py-5 col-span-4 gap-2">
                <CardTitle className="flex items-center">
                    {t('dashboard.earningTrends')}
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Info className="w-[16px] hidden sm:block ml-2"/>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p className="max-w-[300px] text-wrap">
                                    {t('dashboard.earningTrendsTooltip')}
                                </p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </CardTitle>
                <CardContent className='pt-5'>
                    <ChartContainer
                        config={chartConfig}
                        className="aspect-auto h-[250px] w-full"
                    >
                        <BarChart
                            accessibilityLayer
                            data={chartData}
                            margin={{
                                left: 12,
                                right: 12,
                            }}
                        >
                            <CartesianGrid vertical={false}/>
                            {/*<YAxis />*/}
                            <XAxis
                                dataKey="date"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                minTickGap={32}
                                tickFormatter={(value) => {
                                    const date = new Date(value)
                                    return date.toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                    })
                                }}
                            />
                            <ChartTooltip
                                content={
                                    <ChartTooltipContent
                                        className="w-[150px]"
                                        nameKey="views"
                                        labelFormatter={(value) => {
                                            return new Date(value).toLocaleDateString("en-US", {
                                                month: "short",
                                                day: "numeric",
                                                year: "numeric",
                                            })
                                        }}
                                    />
                                }
                            />
                            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`}/>
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>
            <Card className=" px-5 py-5 col-span-4 gap-2">
                <CardTitle className="flex items-center">
                    {t('dashboard.earningByChannels')}
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Info className="w-[16px] hidden sm:block ml-2"/>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p className="max-w-[300px] text-wrap">
                                    {t('dashboard.earningByChannelsTooltip')}
                                </p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </CardTitle>
                <CardContent className='grid grid-cols-4 gap-10'>
                    <ChartContainer className='col-span-3' config={chartConfig2}>
                        <LineChart
                            accessibilityLayer
                            data={chartData2}
                            margin={{
                                top: 20,
                                left: 12,
                                right: 12,
                            }}
                        >
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent indicator="line" />}
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
                        <div className="flex flex-col h-full gap-4 justify-center">
                            {Object.keys(chartConfig2).map((key) => (
                                <div key={key} className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <div
                                            className="w-4 h-4 rounded-full"
                                            style={{backgroundColor: chartConfig2[key].color}}
                                        ></div>
                                        <span>{chartConfig2[key].label}</span>
                                    </div>
                                    <span>
            ${chartData2.reduce((acc, item) => acc + item[key], 0).toLocaleString()}
          </span>
                                </div>
                            ))}
                        </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Dashboard;
