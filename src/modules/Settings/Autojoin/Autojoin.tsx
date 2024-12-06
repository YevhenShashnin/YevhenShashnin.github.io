import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/fanat/button";
import { ArrowUpDown } from "lucide-react";
import { useParams } from "react-router-dom";
import { apiRoutes, apiRoutesSuperAdmin } from "@/constants/apiRoutes";
import { ROUTES } from "@/constants/routes";
import {
    ColumnDef,
} from "@tanstack/react-table";
import PageWithTable from "@/modules/shared/PageWithTable/PageWithTable";
import { useUserStore } from "@/store/userStore";

interface AutojoinProps {
    superAdmin?: boolean;
    editAcc?: boolean;
    selectAutojoin?: (selected: string[]) => void;
}

const getRoutes = (superAdmin: boolean, id?: string) => ({
    createRoute: superAdmin
        ? `/super-admin/edit-user/${id}/settings/autojoin/create`
        : ROUTES.AUTOJOIN.CREATE,
    getRoute: superAdmin && id
        ? {
            ...apiRoutesSuperAdmin.autojoin.list,
            url: apiRoutesSuperAdmin.autojoin.list.url(id),
        }
        : apiRoutes.autojoin.list,
    deleteRoute: superAdmin
        ? apiRoutesSuperAdmin.autojoin.deleteById.url
        : apiRoutes.autojoin.deleteById.url,
    editRoute: superAdmin
        ? `super-admin/edit-user/${id}/settings/autojoin/edit`
        : "autojoin/edit",
});

const Autojoin: React.FC = ({ superAdmin, editAcc, selectAutojoin }: AutojoinProps) => {
    const { t } = useTranslation();
    const columns: ColumnDef<{}>[] = [
        {
            accessorKey: "title",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        {t("autojoin.title")}
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => (
                <div className="capitalize pl-4">{row.getValue("title")}</div>
            ),
            meta: {
                width: "30%",
            },
        },
        {
            accessorKey: "rules",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        {t("autojoin.rules")}
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => (
                <div className="lowercase pl-4">
                    {row.getValue("rules") && row.getValue("rules").map((rule, index) => (
                        `${rule}${index === row.getValue("rules")?.length - 1 ? "" : ", "}`
                    )).join("")}
                </div>
            ),
            meta: {
                width: "25%",
            },
        },
        {
            accessorKey: "delay",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        {t("autojoin.delay")}
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) =>
                <div className="lowercase pl-4">{row.getValue("delay")}</div>,
            meta: {
                width: "10%",  // Percentage width for cooldown column
            },
        },
        {
            accessorKey: "maxAccountsPerCycle",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        {t("autojoin.maxAccountsPerCycle")}
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) =>
                <div className="lowercase pl-4">{row.getValue("maxAccountsPerCycle")}</div>,
            meta: {
                width: "10%",
            },
        },
        {
            accessorKey: "maxGroupsPerCycle",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        {t("autojoin.maxGroupsPerCycle")}
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => <div className="lowercase pl-4">{row.getValue("maxGroupsPerCycle")}</div>,
            meta: {
                width: "10%",
            },
        },
    ];
    const { freeTrial } = useUserStore();
    const { userId } = useParams();
    const { createRoute, getRoute, deleteRoute, editRoute } = getRoutes(!!superAdmin, userId);

    return (
        <PageWithTable
            title={superAdmin ? null : "autojoin.autojoin"}
            columns={columns}
            createRoute={createRoute}
            filterPlaceholder={("autojoin.filter")}
            filterColumnName={"name"}
            getRoute={getRoute}
            deleteText={"autojoin.delete"}
            deleteRoute={deleteRoute}
            editRoute={editRoute}
            userId={userId}
            noAction={editAcc}
            editAcc={editAcc}
            selectFunction={selectAutojoin}
            freeTrial={freeTrial}
        />
    );
};

export default Autojoin;
