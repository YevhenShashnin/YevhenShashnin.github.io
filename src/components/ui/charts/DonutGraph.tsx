import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

interface DonutGraphProps {
    chartData: { browser: string; visitors: number; fill: string }[];
    chartConfig: ChartConfig;
    label: string;
    total: number;
}

function DonutGraph({ chartData: chartDataProps, chartConfig, label, selectedAccounts }: DonutGraphProps) {
    const { t } = useTranslation();
    const [chartData, setChartData] = React.useState<ChartData[]>(chartDataProps);
    const [total, setTotal] = React.useState(0);
    const [activeSeries, setActiveSeries] = useState<string[]>(Object.keys(chartConfig));
    const [legend, setLegend] = useState<string[]>();

    useEffect(() => {
        if (selectedAccounts.length > 0) {
            let accounts = selectedAccounts.map(el => el.value);
            setLegend(accounts);
            setActiveSeries(accounts);


            let filteredChartData = chartDataProps.filter(data => accounts.includes(data.account));
            setChartData(filteredChartData);
            setTotal(filteredChartData.reduce((acc, item) => acc + item.data, 0)); // recalculate total to show only selected accounts
        } else {
            setLegend(Object.keys(chartConfig));
            setActiveSeries(Object.keys(chartConfig).slice(0, 10));
            setTotal(chartData.filter(data => activeSeries.includes(data.account)).reduce((acc, item) => acc + item.data, 0)); // recalculate total to get only active accounts
            setChartData(chartDataProps);
        }
    }, [selectedAccounts, chartDataProps]);

    const handleLegendClick = (key: string) => {
        setActiveSeries(prev => {
            const newActiveSeries = prev.includes(key) ? prev.filter(item => item !== key) : [...prev, key];
            const newTotal = chartData.filter(data => newActiveSeries.includes(data.account)).reduce((acc, item) => acc + item.data, 0);
            setTotal(newTotal);
            return newActiveSeries;
        });
    };

    const filteredChartData = chartData.filter(data => activeSeries.includes(data.account));

    return (
        <Card className="flex flex-col h-full pb-[30px]">
            <CardHeader className="items-center pb-0">
                <CardTitle>{t(label)}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 pb-0 min-w-[200px]">
                {total === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full min-h-[330px]">
                        <p className="fill-foreground text-3xl font-bold">{total}</p>
                        <p className="text-[#746c69] text-[12px]">{t(label)}</p>
                    </div>
                ) : (
                    <ChartContainer
                        config={chartConfig}
                        className="mx-auto aspect-square max-h-[300px]"
                    >
                        <PieChart>
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent hideLabel />}
                            />
                            <Pie
                                data={filteredChartData}
                                dataKey="data"
                                nameKey="account"
                                innerRadius={60}
                                strokeWidth={5}
                            >
                                <Label
                                    content={({ viewBox }) => {
                                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                            return (
                                                <text
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    textAnchor="middle"
                                                    dominantBaseline="middle"
                                                >
                                                    <tspan
                                                        x={viewBox.cx}
                                                        y={viewBox.cy}
                                                        className="fill-foreground text-3xl font-bold"
                                                    >
                                                        {total}
                                                    </tspan>
                                                    <tspan
                                                        x={viewBox.cx}
                                                        y={(viewBox.cy || 0) + 24}
                                                        className="fill-muted-foreground"
                                                    >
                                                        {t(label)}
                                                    </tspan>
                                                </text>
                                            );
                                        }
                                    }}
                                />
                            </Pie>
                        </PieChart>
                    </ChartContainer>
                )}
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
}

export default DonutGraph;