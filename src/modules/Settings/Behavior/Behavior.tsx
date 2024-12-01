import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { useParams } from "react-router-dom";
import { apiRoutes, apiRoutesSuperAdmin } from "@/constants/apiRoutes";
import { ROUTES } from "@/constants/routes";

import {
    ColumnDef,
} from "@tanstack/react-table";
import PageWithTable from "@/modules/shared/PageWithTable/PageWithTable";
import { useUserStore } from "@/store/userStore";

interface BehaviorProps {
    superAdmin?: boolean;
    editAcc?: boolean;
    selectBehavior?: (selected: string[]) => void;
}

const getRoutes = (superAdmin: boolean, id?: string) => ({
    createRoute: superAdmin
        ? `/super-admin/edit-user/${id}/settings/behavior/create`
        : ROUTES.BEHAVIOR.CREATE,
    getRoute: superAdmin && id
        ? {
            ...apiRoutesSuperAdmin.behavior.list,
            url: apiRoutesSuperAdmin.behavior.list.url(id),
        }
        : apiRoutes.behavior.list,
    deleteRoute: superAdmin
        ? apiRoutesSuperAdmin.behavior.deleteById.url
        : apiRoutes.behavior.deleteById.url,
    editRoute: superAdmin
        ? `super-admin/edit-user/${id}/settings/behavior/edit`
        : "behavior/edit",
});

const Behavior: React.FC = ({ superAdmin, editAcc, selectBehavior }: BehaviorProps) => {
    const { t } = useTranslation();
    const columns: ColumnDef<{}>[] = [
        {
            accessorKey: "name",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        {t("behavior.name")}
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => (
                <div className="capitalize pl-4">{row.getValue("name")}</div>
            ),
            meta: {
                width: "30%",
            },
        },
        {
            accessorKey: "maxGroupsCount",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        {t("behavior.maxGroupsCount")}
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => <div className="lowercase pl-4">{row.getValue("maxGroupsCount")}</div>,
            meta: {
                width: "20%",
            },
        },
        // {
        //     accessorKey: "orderGroupsBy",
        //     header: t("behavior.orderGroupsBy"),
        //     cell: ({ row }) => <div className="lowercase">{row.getValue("orderGroupsBy")}</div>,
        //     meta: {
        //         width: "20%",  // Percentage width for orderGroupsBy column
        //     },
        // },
        {
            accessorKey: "cooldown",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        {t("behavior.coolDown")}
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) =>
                <div className="lowercase pl-4">{row.getValue("cooldown")}</div>,
            meta: {
                width: "10%",
            },
        },
        {
            accessorKey: "retweetSpeed",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        {t("behavior.retweetsSpeed")}
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) =>
                <div className="lowercase pl-4">{row.getValue("retweetSpeed")}</div>,
            meta: {
                width: "10%",
            },
        },
        {
            accessorKey: "selfRetweetAmount",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        {t("behavior.selfRetweetsAmount")}
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => <div className="lowercase pl-4">{row.getValue("selfRetweetAmount")}</div>,
            meta: {
                width: "15%",
            },
        },
    ];
    const { userId } = useParams();
    const { createRoute, getRoute, deleteRoute, editRoute } = getRoutes(!!superAdmin, userId);
    const { freeTrial } = useUserStore();

    return (
        <PageWithTable
            title={superAdmin ? null : "behavior.behavior"}
            columns={columns}
            createRoute={createRoute}
            filterPlaceholder={"behavior.filter"}
            filterColumnName="name"
            getRoute={getRoute}
            deleteText={"behavior.delete"}
            deleteRoute={deleteRoute}
            editRoute={editRoute}
            userId={userId}
            noAction={editAcc}
            editAcc={editAcc}
            selectFunction={selectBehavior}
            freeTrial={freeTrial}
        />
    );
};

export default Behavior;
