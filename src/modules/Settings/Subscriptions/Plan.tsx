import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/fanat/card";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/fanat/button";
import axiosInstance from "@/utils/axiosInstance";
import { format } from "date-fns";

interface PlanProps {
    name: string;
    max_accounts: number;
    amount: number;
    expiresAt?: string;
}

const Plan = ({ name, max_accounts, amount, expiresAt }: PlanProps) => {
    const subscribeHandler = () => {
        if (name === "FREE_TRIAL") {
            axiosInstance.post("subscription/free-trial").then((res) => {
                console.log(res);
            });
            return;
        }
        axiosInstance.post("subscription/subscribe", { plan: name }).then((res) => {
            if (res.data.payment_url) {
                window.location.href = res.data.payment_url;
            }
        });
    };
    const { t } = useTranslation();
    return (
        <Card className={` ${expiresAt ? 'bg-[#006064]' : name === "FREE_TRIAL" ? "dark:bg-black" : ""}`}>
            <CardHeader>
                <CardTitle
                    className={`flex ${name === "FREE_TRIAL" ? "text-pink-500" : ""}`}>{t(`subscriptions.${name}`)}
                </CardTitle>
                <CardDescription>{t("subscriptions.maxAccounts")} {max_accounts}
                    {name === "FREE_TRIAL" && <p    className="text-pink"> {t("subscriptions.limitedFunctional")}</p>}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p className="mb-2">{t("subscriptions.amount")} <span className="text-blue"> {amount}</span> $</p>
                {!expiresAt && <p className="mb-4 text-pink-300">{t(`subscriptions.description.${name}`)}</p>}
                {expiresAt && <p>{t("subscriptions.expiresAt")}:
                    {format(new Date(expiresAt), "dd/MM/yyyy ")}
                </p>}
                {!expiresAt && <Button onClick={subscribeHandler}>{t("subscriptions.subscribe")}</Button>}
            </CardContent>
        </Card>
    );
};

export default Plan;