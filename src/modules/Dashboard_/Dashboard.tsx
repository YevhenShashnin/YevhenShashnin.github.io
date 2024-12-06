import React from 'react';
import {Settings} from "@/modules/Dashboard_/sections/settings";
import {Earnings} from "@/modules/Dashboard_/sections/earnings";
import {EarningTrends} from "@/modules/Dashboard_/sections/earningTrends";
import {EarningChannels} from "@/modules/Dashboard_/sections/earningChannels";
import {CreatorStats} from "@/modules/Dashboard_/sections/creatorTable";


const Dashboard = () => {
    return (
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-2 ">
            <Settings/>
            <Earnings/>
            <EarningTrends/>
            <EarningChannels/>
            <CreatorStats/>
        </div>
    );
};

export default Dashboard;
