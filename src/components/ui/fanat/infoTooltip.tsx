import React from 'react';
import {useTranslation} from "react-i18next";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {Info} from "lucide-react";

interface Props {
    tooltipText: string;
}

export const InfoTooltip = ({tooltipText}: Props) => {
    const {t} = useTranslation();
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Info className="w-[16px] hidden sm:block ml-2"/>
                </TooltipTrigger>
                <TooltipContent>
                    <p className="max-w-[300px] text-wrap">
                        {t(tooltipText)}
                    </p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

