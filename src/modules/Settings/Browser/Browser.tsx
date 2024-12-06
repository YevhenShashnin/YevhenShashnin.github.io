import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/fanat/button";
import { ArrowUpDown } from "lucide-react";
import { useParams } from "react-router-dom";
import {
    ColumnDef,
} from "@tanstack/react-table";
import PageWithTable from "@/modules/shared/PageWithTable/PageWithTable";
import { apiRoutes, apiRoutesSuperAdmin } from "@/constants/apiRoutes";
import { ROUTES } from "@/constants/routes";

interface columns {
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

interface BrowserProps {
    superAdmin?: boolean;
    editAcc?: boolean;
    selectBrowser?: (selected: string[]) => void;
}

const getRoutes = (superAdmin: boolean, id?: string) => ({
    createRoute: superAdmin
        ? `/super-admin/edit-user/${id}/settings/browser/create`
        : ROUTES.BROWSER.CREATE,
    getRoute: superAdmin && id
        ? {
            ...apiRoutesSuperAdmin.browser.list,
            url: apiRoutesSuperAdmin.browser.list.url(id),
        }
        : apiRoutes.browser.list,
    deleteRoute: superAdmin
        ? apiRoutesSuperAdmin.browser.deleteById.url
        : apiRoutes.browser.deleteById.url,
    editRoute: superAdmin
        ? `super-admin/edit-user/${id}/settings/browser/edit`
        : "browser/edit",
});

const Browser: React.FC = ({ superAdmin, editAcc, selectBrowser }: BrowserProps) => {
    const { t } = useTranslation();
    const columns: ColumnDef<columns>[] = [
        {
            accessorKey: "comment",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        {t("browser.comment")}
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => <div className="lowercase pl-4">{row.getValue("comment")}</div>,
            meta: {
                width: "15%",  // Percentage width for orderGroupsBy column
            },
        },
        {
            accessorKey: "usages",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        {t("browser.usages")}
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => (
                <div className="capitalize pl-4">{row.getValue("usages")}</div>
            ),
            meta: {
                width: "10%",
            },
        },
        {
            accessorKey: "agent",
            header:
                ({ column }) => {
                    return (
                        <Button
                            variant="ghost"
                            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        >
                            {t("browser.agent")}
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                    );
                },
            cell: ({ row }) => <div className="lowercase pl-4">{row.getValue("agent")}</div>,
            meta: {
                width: "50%",  // Percentage width for maxGroupsCount column
            },
        },
        {
            accessorKey: "language",
            header:
                ({ column }) => {
                    return (
                        <Button
                            variant="ghost"
                            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        >
                            {t("browser.language")}
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                    );
                },
            cell: ({ row }) => (
                <div className="capitalize pl-4">{row.getValue("language")}</div>
            ),
            meta: {
                width: "10%",
            },
        },


    ];

    const { userId } = useParams();
    const { createRoute, getRoute, deleteRoute, editRoute } = getRoutes(!!superAdmin, userId);
    return (
        <PageWithTable
            title={superAdmin ? null : "browser.browser"}
            columns={columns}
            createRoute={createRoute}
            filterPlaceholder={"browser.filter"}
            filterColumnName="name"
            getRoute={getRoute}
            deleteText={"browser.delete"}
            deleteRoute={deleteRoute}
            editRoute={editRoute}
            userId={userId}
            noAction={editAcc}
            editAcc={editAcc}
            selectFunction={selectBrowser}
        />
    );
};

export default Browser;
