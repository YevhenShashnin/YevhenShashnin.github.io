import React from "react";
import { useTranslation } from "react-i18next";
import { apiRoutesSuperAdmin } from "@/constants/apiRoutes";
import { format as dateFnsFormat } from "date-fns";
import PageWithTable from "@/modules/shared/PageWithTable/PageWithTable";
import { useParams } from "react-router-dom";

interface SASubscriptionsProps {
    active?: boolean;
}

const SASubscriptions = ({ active }: SASubscriptionsProps) => {
    const { userId } = useParams();

    const { t } = useTranslation();
    const columns = [
        {
            accessorKey: "plan",
            header: t("subscriptions.plan"),
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("plan")}</div>
            ),
            meta: {
                width: "20%",
            },
        },
        {
            accessorKey: "amount",
            header: t("subscriptions.amount"),
            cell: ({ row }) => <div className="lowercase">{row.getValue("amount")}</div>,
            meta: {
                width: "10%",
            },
        },
        {
            accessorKey: "maxAccounts",
            header: t("subscriptions.maxAccounts"),
            cell: ({ row }) => <div className="lowercase">{row.getValue("maxAccounts")}</div>,
            meta: {
                width: "10%",
            },
        },
        {
            accessorKey: "expiresAt",
            header: t("subscriptions.expiresAt"),
            cell: ({ row }) =>
                <div
                    className="lowercase">{row.getValue("expiresAt") ? dateFnsFormat(new Date(row.getValue("expiresAt")), "dd/MM/yyyy") : ""}</div>,
            meta: {
                width: "10%",
            },
        },
    ];

    return (
        <PageWithTable
            columns={columns}
            createRoute={`/super-admin/edit-user/${userId}/subscriptions/create`}
            getRoute={{
                ...apiRoutesSuperAdmin.subscriptions.list,
                url: active ? apiRoutesSuperAdmin.subscriptions.listActive.url(userId) : apiRoutesSuperAdmin.subscriptions.listExpired.url(userId),
            }}
            deleteText={"accounts.delete"}
            deleteRoute={apiRoutesSuperAdmin.subscriptions.deleteById.url}
            editRoute={`super-admin/edit-user/${userId}/subscriptions/create`}
            userId={userId}
            noFilter
        />
    );
};

export default SASubscriptions;
