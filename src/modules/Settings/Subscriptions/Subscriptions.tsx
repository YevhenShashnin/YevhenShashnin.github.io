import React, { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import Plan from "./Plan";
import { useTranslation } from "react-i18next";
import { Loader } from "@/components/ui";
import { useParams } from "react-router-dom";
import {apiRoutes} from "@/constants/apiRoutes";

const Subscriptions = () => {
    const [loading, setLoading] = useState(true);
    const [plans, setPlans] = useState<any[]>([]);
    const [subscriptions, setSubscriptions] = useState<any[]>([]);
    const { userId } = useParams();
    useEffect(() => {
        axiosInstance.get(apiRoutes.subscribtions.plans.url)
            .then((res) => {
                setPlans(res.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching plans:", error);
                setLoading(false);

            });
        axiosInstance.get(apiRoutes.subscribtions.active.url)
            .then((res) => {
                setSubscriptions(res.data.data);
            })
            .catch((error) => {
                console.error("Error fetching active subscription:", error);
            });
    }, [userId]);

    const { t } = useTranslation();
    if (loading) return <Loader />;
    return (
        <div>
            <h1 className="mb-4 mt-2 text-xl text-blue">{t("subscriptions.subscriptions")}</h1>
            {subscriptions?.length > 0 && <h2 className="mb-4 mt-2 text-lg text-blue">{t("subscriptions.active")}</h2>}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">

                {subscriptions?.length > 0 && subscriptions.map((subscription, index) => (
                    <Plan key={subscription.plan + index} name={subscription.plan} max_accounts={subscription.maxAccounts}
                          amount={subscription.amount} expiresAt={subscription.expiresAt} />
                ))}</div>
            <h2 className="mb-4 mt-2 text-lg text-blue">{t("subscriptions.available")}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {plans && plans.map((plan) => (
                    <Plan key={plan.name} {...plan} />
                ))}
            </div>
        </div>
    );
};

export default Subscriptions;
