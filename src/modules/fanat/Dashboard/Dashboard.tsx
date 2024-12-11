import React from 'react';
import {Settings} from "@/modules/fanat/Dashboard/sections/settings";
import {Earnings} from "@/modules/fanat/Dashboard/sections/earnings";
import {EarningTrends} from "@/modules/fanat/Dashboard/sections/earningTrends";
import {EarningChannels} from "@/modules/fanat/Dashboard/sections/earningChannels";
import {CreatorStats} from "@/modules/fanat/Dashboard/sections/creatorTable";


const Dashboard = () => {
    return (
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-2 ">
            <Settings/>
            <Earnings/>
            <EarningTrends/>
            <EarningChannels/>
            <CreatorStats/>
        </div>
    );
};

export default Dashboard;
