import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/fanat/button";
import { ArrowUpDown } from "lucide-react";
import { useParams } from "react-router-dom";
import { apiRoutes, apiRoutesSuperAdmin } from "@/constants/apiRoutes";
import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { ROUTES } from "@/constants/routes";
import PageWithTable from "@/modules/shared/PageWithTable/PageWithTable";
import { badgeClass } from "@/constants/badgeClass";

interface Columns {
    id: number;
    name: string;
    maxGroupsCount: number;
    orderGroupsBy: string;
    coolDown: number;
    retweetsSpeed: number;
    selfRetweetsAmount: number;
    meta: {
        width: string;
    };
}


interface ProxyProps {
    superAdmin?: boolean;
    editAcc?: boolean;
    selectProxy?: (value: any) => void;
}

const getRoutes = (superAdmin: boolean, id?: string) => ({
    createRoute: superAdmin
        ? `/super-admin/edit-user/${id}/settings/proxy/create`
        : ROUTES.PROXY.CREATE,
    getRoute: superAdmin && id
        ? {
            ...apiRoutesSuperAdmin.proxy.list,
            url: apiRoutesSuperAdmin.proxy.list.url(id),
        }
        : apiRoutes.proxy.list,
    deleteRoute: superAdmin
        ? apiRoutesSuperAdmin.proxy.deleteById.url
        : apiRoutes.proxy.deleteById.url,
    editRoute: superAdmin
        ? `super-admin/edit-user/${id}/settings/proxy/edit`
        : "proxy/edit",
});

const Proxy: React.FC<ProxyProps> = ({ superAdmin, editAcc, selectProxy }) => {
    const { t } = useTranslation();
    const { userId } = useParams();
    const { createRoute, getRoute, deleteRoute, editRoute } = getRoutes(!!superAdmin, userId);

    const columns: ColumnDef<Columns>[] = [
        {
            accessorKey: "comment",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    {t("proxy.comment")}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => <div className="lowercase pl-4">
                {row.getValue("comment")}
            </div>,
            meta: {
                width: "15%",
            },
        },
        {
            accessorKey: "status",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    {t("proxy.status")}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => (
                <Badge className={`lowercase ml-4 ${badgeClass[row.getValue("status")]}`}>
                    {row.getValue("status")}
                </Badge>
            ),
            meta: {
                width: "10%", // Percentage width for status column
            },
        },
        {
            accessorKey: "accounts",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    {t("proxy.accounts")}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => <div className="lowercase pl-4">
                {row.getValue("accounts")?.[0]?.name}
            </div>,
            meta: {
                width: "10%", // Percentage width for accounts column
            },
        },
        {
            accessorKey: "type",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    {t("proxy.type")}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => <div className="capitalize pl-4">{row.getValue("type")}</div>,
            meta: {
                width: "10%",
            },
        },
        {
            accessorKey: "port",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    {t("proxy.port")}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => <div className="lowercase pl-4">{row.getValue("port")}</div>,
            meta: {
                width: "10%", // Percentage width for port column
            },
        },
        {
            accessorKey: "ip",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    {t("proxy.ip")}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => <div className="lowercase pl-4">{row.getValue("ip")}</div>,
            meta: {
                width: "10%", // Percentage width for ip column
            },
        },
        {
            accessorKey: "credentials",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    {t("proxy.userName")}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => {
                const credentials = row.getValue("credentials");
                return (
                    <div className="lowercase pl-4">
                        {credentials ? credentials.split(":")[0] : ""}
                    </div>
                );
            },
            meta: {
                width: "10%", // Percentage width for credentials column
            },
        },
    ];

    return (
        <PageWithTable
            title={superAdmin ? null : "proxy.proxy"}
            columns={columns}
            createRoute={createRoute}
            filterPlaceholder={"proxy.filter"}
            filterColumnName="name"
            getRoute={getRoute}
            deleteText={"browser.delete"}
            deleteRoute={deleteRoute}
            editRoute={editRoute}
            userId={userId}
            noAction={editAcc}
            editAcc={editAcc}
            selectFunction={selectProxy}
        />
    );
};

export default Proxy;
