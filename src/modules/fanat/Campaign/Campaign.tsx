import React from 'react';
import {Settings} from "@/modules/fanat/Campaign/sections/settings";
import {Totals} from "@/modules/fanat/Campaign/sections/totals";
import {CampaignTable} from "@/modules/fanat/Campaign/sections/campaignTable";

const Campaign = () => {
    return (
        <div className="w-full max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-2 ">
            <Settings/>
            <Totals/>
            <CampaignTable/>
        </div>
    );
};

export default Campaign;