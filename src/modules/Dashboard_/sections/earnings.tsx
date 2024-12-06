import React, { useState } from 'react';
import { Card, CardContent, CardTitle } from "@/components/ui/fanat/card";
import { Asterisk, Lightbulb, MessageCircleMore, StickyNote, TicketPlus, TvMinimalPlay } from "lucide-react";
import OnlyFans from '@/assets/icons/fansly.svg?react';
import { useTranslation } from "react-i18next";
import {InfoTooltip} from "@/components/ui/fanat/infoTooltip";

export const Earnings = () => {
    const { t } = useTranslation();

    const [earnings, setEarnings] = useState({
        total: 2968.94,
        subscriptions: 1346.18,
        tips: 1346.18,
        posts: 1346.18,
        refs: 1346.18,
        messages: 1346.18,
        streams: 1346.18,
    });

    return (
        <Card className="px-5 py-5 col-span-4 gap-2">
            <CardTitle className="flex items-center">
                {t('dashboard.earningSummary')}
                <InfoTooltip tooltipText='dashboard.earningTooltip' />
            </CardTitle>
            <CardContent className="grid grid-cols-4 p-0">
                <div className="flex flex-col p-5 gap-4 border-r">
                    <OnlyFans className="w-10 h-10" />
                    <p className="text-[12px]">{t('dashboard.totalEarnings')}</p>
                    <p className="text-blue text-[36px] font-bold">${earnings.total.toFixed(2)}</p>
                </div>
                <div className="flex flex-col p-5 gap-4 border-r justify-between">
                    <div className='flex justify-between'>
                        <div>
                            <p className='font-bold'>
                                ${earnings.subscriptions.toFixed(2)}
                            </p>
                            <p className='text-[12px]'>
                                {t('dashboard.subscriptions')}
                            </p>
                        </div>
                        <div className='bg-[#3357FF] w-[40px] h-[40px] rounded-full flex justify-center items-center'>
                            <TicketPlus />
                        </div>
                    </div>
                    <div className='flex justify-between'>
                        <div>
                            <p className='font-bold'>
                                ${earnings.tips.toFixed(2)}
                            </p>
                            <p className='text-[12px]'>
                                {t('dashboard.tips')}
                            </p>
                        </div>
                        <div className='bg-[#FFA833] w-[40px] h-[40px] rounded-full flex justify-center items-center'>
                            <Lightbulb />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col p-5 gap-4 border-r justify-between">
                    <div className='flex justify-between'>
                        <div>
                            <p className='font-bold'>
                                ${earnings.posts.toFixed(2)}
                            </p>
                            <p className='text-[12px]'>
                                {t('dashboard.posts')}
                            </p>
                        </div>
                        <div className='bg-[#33FFA8] w-[40px] h-[40px] rounded-full flex justify-center items-center'>
                            <StickyNote />
                        </div>
                    </div>
                    <div className='flex justify-between'>
                        <div>
                            <p className='font-bold'>
                                ${earnings.refs.toFixed(2)}
                            </p>
                            <p className='text-[12px]'>
                                {t('dashboard.refs')}
                            </p>
                        </div>
                        <div className='bg-[hsl(var(--chart-5))] w-[40px] h-[40px] rounded-full flex justify-center items-center'>
                            <Asterisk />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col p-5 gap-4 justify-between">
                    <div className='flex justify-between'>
                        <div>
                            <p className='font-bold'>
                                ${earnings.messages.toFixed(2)}
                            </p>
                            <p className='text-[12px]'>
                                {t('dashboard.messages')}
                            </p>
                        </div>
                        <div className='bg-[hsl(var(--chart-4))] w-[40px] h-[40px] rounded-full flex justify-center items-center'>
                            <MessageCircleMore />
                        </div>
                    </div>
                    <div className='flex justify-between'>
                        <div>
                            <p className='font-bold'>
                                ${earnings.streams.toFixed(2)}
                            </p>
                            <p className='text-[12px]'>
                                {t('dashboard.streams')}
                            </p>
                        </div>
                        <div className='bg-[#b4915d] w-[40px] h-[40px] rounded-full flex justify-center items-center'>
                            <TvMinimalPlay />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};