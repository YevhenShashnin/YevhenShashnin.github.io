import { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Line, LineChart } from "recharts";
// import { useMediaQuery } from "@/hooks/useMediaQuery";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/fanat/card";
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/fanat/chart";
import { useTranslation } from "react-i18next";
import * as React from "react";

type ChartData = {
    date: string;
    [key: string]: string | number; // Allows dynamic keys for various data series
}

type GradientGraphProps = {
    chartData: ChartData[];
    chartConfig: { [key: string]: { label: string; color: string } };
    label: string;
    selectedAccounts: { value: string; label: string }[];
}

const GradientGraph: React.FC<GradientGraphProps> = ({
                                                         chartData: chartDataProps,
                                                         chartConfig,
                                                         label,
                                                         selectedAccounts,
                                                     }) => {
    const { t } = useTranslation();
    // const isMobile = useMediaQuery("(max-width: 768px)");
    const [chartData, setChartData] = React.useState<ChartData[]>(chartDataProps);
    const [activeSeries, setActiveSeries] = useState<string[]>(Object.keys(chartConfig));
    const [legend, setLegend] = useState<string[]>();

    useEffect(() => {
        if (selectedAccounts.length > 0) {
            let accounts = selectedAccounts.map(el => el.value);
            setLegend(accounts);
            setActiveSeries(accounts);
            const filteredChartData = chartDataProps.map(data => {
                const filteredData = { date: data.date };
                accounts.forEach(account => {
                    if (data[account] !== undefined) {
                        filteredData[account] = data[account];
                    }
                });
                return filteredData;
            });
            setChartData(filteredChartData);

        } else {
            setLegend(Object.keys(chartConfig));
            setActiveSeries(Object.keys(chartConfig).slice(0, 10));
            setChartData(chartDataProps);
        }
    }, [selectedAccounts, chartDataProps]);

    const handleLegendClick = (key: string) => {
        setActiveSeries(prev =>
            prev.includes(key) ? prev.filter(item => item !== key) : [...prev, key],
        );
    };

    return (
        <Card className="w-full pb-[30px]">
            <CardHeader>
                <CardTitle>{t(label)}</CardTitle>
            </CardHeader>
            <CardContent>
                {chartData.length === 0 && (
                    <p>{t('common.noData')}</p>
                )}
                {!!chartData.length && <ChartContainer className="w-full" config={chartConfig}
                >
                    {/*<AreaChart*/}
                    {/*    accessibilityLayer*/}
                    {/*    data={chartData}*/}
                    {/*    margin={{*/}
                    {/*        left: 12,*/}
                    {/*        right: 12,*/}
                    {/*    }}*/}
                    {/*>*/}
                    <LineChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            padding={{ left: 5, right: 0 }}
                            tickFormatter={(value) => {
                                const date = new Date(value);
                                return date.toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                });
                            }}
                        />
                        {/*{isMobile && (*/}
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `${value.toLocaleString()}`}
                        />
                        {/*)}*/}
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                        <defs>
                            {Object.keys(chartConfig).map((key, index) => (
                                <linearGradient id={`fill${key}`} key={index} x1="0" y1="0" x2="0" y2="1">
                                    <stop
                                        offset="5%"
                                        stopColor={chartConfig[key].color}
                                        stopOpacity={0.8}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor={chartConfig[key].color}
                                        stopOpacity={0.1}
                                    />
                                </linearGradient>
                            ))}
                        </defs>
                        {activeSeries.map((key, index) => (
                            chartConfig[key]?.color &&
                            <Line
                                key={index}
                                dataKey={key}
                                type="monotone"
                                stroke={chartConfig[key]?.color}
                                strokeWidth={2}
                                dot={{ fill: chartConfig[key]?.color }}
                                activeDot={{
                                    r: 6,
                                }}
                            />
                        ))}
                    </LineChart>
                    {/*</AreaChart>*/}
                </ChartContainer>}
            </CardContent>
            <CardFooter className="flex flex-wrap max-h-[100px] justify-center overflow-auto">
                {!!legend?.length && legend.map((key, index) => (
                    <div key={chartConfig[key]?.label}
                         className="flex items-center gap-2 mr-2 text-[12px] justify-center m-1"
                         onClick={() => handleLegendClick(key)}
                    >
                        <div className="h-2 w-2 shrink-0 rounded-[2px]"
                             style={{ backgroundColor: chartConfig[key]?.color }}
                        />
                        <p
                            className={`${
                                activeSeries.includes(key) ? "" : "line-through"
                            }`}
                        >{chartConfig[key]?.label}</p>
                    </div>
                ))}
            </CardFooter>
        </Card>
    );
};

export default GradientGraph;