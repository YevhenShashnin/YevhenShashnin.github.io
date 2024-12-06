import React from "react";
import { apiRoutes, apiRoutesSuperAdmin } from "@/constants/apiRoutes";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/fanat/button";
import { ArrowUpDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import PageWithTable from "@/modules/shared/PageWithTable/PageWithTable";
import { Badge } from "@/components/ui/badge";
import { badgeClass } from "@/constants/badgeClass";

interface GroupProps {
    superAdmin?: boolean;
}

const getRoutes = (superAdmin: boolean, id?: string) => ({

    getRoute: superAdmin && id
        ? {
            ...apiRoutesSuperAdmin.groups.list,
            url: apiRoutesSuperAdmin.groups.list.url(id),
        }
        : apiRoutes.groups.list,
});

const Group = ({ superAdmin }: GroupProps) => {
    const { t } = useTranslation();
    const [showGroup, setShowGroup] = React.useState(null);
    const columns: ColumnDef<{}>[] = [
        {
            accessorKey: "id",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        {t("groups.id")}
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => (
                <div className="capitalize pl-4">{row.getValue("id")}</div>
            ),
            meta: {
                width: "20%",
            },
        },
        {
            accessorKey: "name",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        {t("groups.name")} <ArrowUpDown className="ml-2 h-4 w-4" /></Button>
                );
            },
            cell: ({ row }) => (
                <div className="capitalize pl-4">{row.getValue("name")}</div>
            ),
            meta: {
                width: "25%",
            },
        },

        {
            accessorKey: "accountsCount",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        {t("groups.accountsCount")} <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) =>
                <div className="lowercase pl-4">{row.getValue("accountsCount")}</div>,
            meta: {
                width: "10%",
            },
        },
        {
            accessorKey: "rate",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        {t("groups.rate")} <ArrowUpDown className="ml-2 h-4 w-4" /></Button>
                );
            },
            cell: ({ row }) =>

                <div className="lowercase pl-4">{row.getValue("rate")}</div>,
            meta: {
                width: "10%",  // Percentage width for cooldown column
            },
        },
        {
            accessorKey: "status",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        {t("groups.status")} <ArrowUpDown className="ml-2 h-4 w-4" /></Button>
                );
            },
            cell: ({ row }) =>

                (
                    <Badge className={`lowercase ${badgeClass[row.getValue("status")]}`}>
                        {row.getValue("status")}
                    </Badge>
                ),
            meta: {
                width: "10%",
            },
        },
        {
            accessorKey: "avgViewPerUser",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        {t("groups.avgViewPerUser")} <ArrowUpDown className="ml-2 h-4 w-4" /></Button>
                );
            },
            cell: ({ row }) =>

                <div className="lowercase pl-4">{row.getValue("avgViewPerUser")}</div>,
            meta: {
                width: "10%",
            },
        },

    ];
    const { userId } = useParams();
    const { getRoute } = getRoutes(!!superAdmin, userId);
    return (
        <div>
            <PageWithTable title={"groups.groups"}
                           columns={columns}
                           filterPlaceholder={("groups.filter")}
                           filterColumnName={"name"}
                           getRoute={getRoute}
                           deleteText={"groups.delete"}
                           deleteRoute={apiRoutes.groups.getById.url}
                           showRoute={"groups"}
                           showItem
                           dontAllowSelection
                           dontShowSettings
                           dontShowDelete
            />
            <Dialog open={!!showGroup}>
                <DialogContent className="sm:max-w-[550px]" closeHandler={() => setShowGroup(null)}>
                    <DialogHeader>
                        <DialogTitle className="mb-4">{showGroup?.name}</DialogTitle>
                        <DialogDescription />
                        <p>{t("groups.id")}: {showGroup?.id}</p>
                        <p>{t("groups.accountsCount")}: {showGroup?.accountsCount}</p>
                        <p>{t("groups.rate")}: {showGroup?.rate}</p>
                        <p>{t("groups.status")}: {showGroup?.status}</p>
                        <p>{t("groups.avgViewPerUser")}: {showGroup?.avgViewPerUser}</p>
                        <p>{t("groups.accounts")}:</p>
                        <ul>
                            {showGroup?.accounts?.map((acc: { id: number; name: string }) => (
                                <li key={acc.id}>
                                    <Link to={`/account/${acc.id}`} className="text-blue">
                                        {acc.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Group;
