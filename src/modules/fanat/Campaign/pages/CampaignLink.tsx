import React, { useState } from 'react';
import { Card } from '@/components/ui/fanat/card';
import { Copy } from 'lucide-react';
import { Button } from '@/components/ui/fanat/button';
import { Component } from './chart';
import { useTranslation } from 'react-i18next';

const CampaignLink = () => {
    const [blink, setBlink] = useState({
        account: false,
        link: false,
    });
    const { t } = useTranslation();
    const handleCopyClick = (url: string, key) => {
        navigator.clipboard.writeText(url).then(() => {
            setBlink((prevState) => ({ ...prevState, [key]: true }));
            setTimeout(
                () => setBlink((prevState) => ({ ...prevState, [key]: false })),
                300
            );
        });
    };
    return (
        <div className="flex flex-col sm:justify-center items-center pt-4 sm:pt-0 w-full h-[100vh] ">
            <h1 className="text-xl font-semibold mb-4">{t('campaignLink.campaignDetails')}</h1>

            <Card className="p-5 w-[90%] sm:w-full sm:max-w-md m-2 shadow-md rounded-md">
                <table className="w-full text-sm text-left text-gray-700">
                    <tbody>
                        <tr className="border-b">
                            <th className="py-2 pr-4 font-medium">{t('campaignLink.account')}</th>
                            <td className="py-2 text-blue flex items-center">
                                <a
                                    href="https://example"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    @NataTS
                                </a>
                                <Button
                                    variant="ghost"
                                    onClick={() =>
                                        handleCopyClick(
                                            'https://example',
                                            'account'
                                        )
                                    }
                                    className={`ml-2 px-2 ${blink.account ? 'animate-blink' : ''}`}
                                >
                                    <Copy className="w-4 text-white" />
                                </Button>
                            </td>
                        </tr>
                        <tr className="border-b">
                            <th className="py-2 pr-4 font-medium">{t('campaignLink.label')}</th>
                            <td className="py-2">Fanat Drops 08.14.24</td>
                        </tr>
                        <tr className="border-b">
                            <th className="py-2 pr-4 font-medium">{t('campaignLink.link')}</th>
                            <td className="py-2 text-blue underline flex items-center">
                                <a
                                    href="https://example"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    https://example
                                </a>
                                <Button
                                    variant="ghost"
                                    onClick={() =>
                                        handleCopyClick(
                                            'https://example',
                                            'link'
                                        )
                                    }
                                    className={`ml-2 px-2  ${blink.link ? 'animate-blink' : ''}`}
                                >
                                    <Copy className="w-4 text-white" />
                                </Button>
                            </td>
                        </tr>
                        <tr className="border-b">
                            <th className="py-2 pr-4 font-medium">{t('campaignLink.created')}</th>
                            <td className="py-2">2024-08-14</td>
                        </tr>
                        <tr className="border-b">
                            <th className="py-2 pr-4 font-medium">
                                {t('campaignLink.subscribersCount')}
                            </th>
                            <td className="py-2 font-bold text-4xl text-[#C71585]">
                                180
                            </td>
                        </tr>
                        <tr>
                            <th className="py-2 pr-4 font-medium">{t('campaignLink.revenue')}</th>
                            <td className="py-2 text-2xl font-bold text-[#00836d]">
                                0
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Card>
            <Component />
        </div>
    );
};

export default CampaignLink;
