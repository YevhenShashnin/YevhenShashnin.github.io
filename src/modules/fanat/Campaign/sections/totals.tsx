import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardTitle } from '@/components/ui/fanat/card';
import { InfoTooltip } from '@/components/ui/fanat/infoTooltip';

export const Totals = () => {
    const { t } = useTranslation();

    return (
        <Card className="px-5 py-5 col-span-4 gap-2">
            <CardContent className="grid grid-cols-1 md:grid-cols-4 p-0">
                <div className="flex flex-col p-2 sm:p-5 gap-2 sm:gap-4  border-r">
                    <p className="text-xl sm:text-2xl	 font-bold">
                        {t('campaign.totalClaims')}
                    </p>
                    <p className="text-2xl sm:text-4xl">475</p>
                </div>
                <div className="flex flex-col p-2 sm:p-5 gap-2 sm:gap-4  border-r justify-between">
                    <p className="text-xl sm:text-2xl	 font-bold">
                        {t('campaign.totalEarnings')}
                    </p>
                    <p className="text-2xl sm:text-4xl">$ 458.34</p>
                </div>
                <div className="flex flex-col p-2 sm:p-5 gap-2 sm:gap-4  border-r justify-between">
                    <p className="text-xl sm:text-2xl	 font-bold">
                        {t('campaign.totalSpent')}
                    </p>
                    <p className="text-2xl sm:text-4xl">$ 0</p>
                </div>
                <div className="flex flex-col p-2 sm:p-5 gap-2 sm:gap-4  justify-between">
                    <div>
                        <div className="flex items-center">
                            <p className="text-xl sm:text-2xl	 font-bold">
                                {t('campaign.avgARPF')}
                            </p>
                            <InfoTooltip
                                tooltipText={'campaign.avgARPFTooltip'}
                            />
                        </div>
                    </div>
                    <p className="text-2xl sm:text-4xl">$ 0.96</p>
                </div>
            </CardContent>
        </Card>
    );
};

export default Totals;
