import React, { useState } from 'react';
import { Card, CardContent, CardTitle } from "@/components/ui/fanat/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { useTranslation } from "react-i18next";

export const CreatorStats = () => {
    const { t } = useTranslation();

    const [moneyAmounts, setMoneyAmounts] = useState({
        messageEarnings: 9235.66,
        totalEarnings: 22263.66,
        refunded: 249.92,
    });

    return (
        <Card className="px-5 py-5 col-span-4 gap-2">
            <CardTitle className="flex items-center">
                {t('dashboard.creatorStats')}
            </CardTitle>
            <CardContent className="grid grid-cols-4 p-0">
                <div className="flex flex-col p-5 gap-4 border-r">
                    <p className="text-[36px] font-bold">4</p>
                    <div className='flex items-center justify-between'>
                        <p className="text-[12px]">{t('dashboard.creators')}</p>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Info className="w-[16px] hidden sm:block ml-2" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p className="max-w-[300px] text-wrap">
                                        {t('dashboard.creatorsTooltip')}
                                    </p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </div>
                <div className="flex flex-col p-5 gap-4 border-r">
                    <p className="text-[36px] font-bold">${moneyAmounts.messageEarnings.toFixed(2)}</p>
                    <div className='flex items-center justify-between'>
                        <p className="text-[12px]">{t('dashboard.messageEarnings')}</p>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Info className="w-[16px] hidden sm:block ml-2" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p className="max-w-[300px] text-wrap">
                                        {t('dashboard.messageEarningsTooltip')}
                                    </p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </div>
                <div className="flex flex-col p-5 gap-4 border-r">
                    <p className="text-[36px] font-bold">${moneyAmounts.totalEarnings.toFixed(2)}</p>
                    <div className='flex items-center justify-between'>
                        <p className="text-[12px]">{t('dashboard.totalEarnings')}</p>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Info className="w-[16px] hidden sm:block ml-2" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p className="max-w-[300px] text-wrap">
                                        {t('dashboard.totalEarningsTooltip')}
                                    </p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </div>
                <div className="flex flex-col p-5 gap-4">
                    <p className="text-[36px] font-bold">${moneyAmounts.refunded.toFixed(2)}</p>
                    <div className='flex items-center justify-between'>
                        <p className="text-[12px]">{t('dashboard.refunded')}</p>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Info className="w-[16px] hidden sm:block ml-2" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p className="max-w-[300px] text-wrap">
                                        {t('dashboard.refundedTooltip')}
                                    </p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};