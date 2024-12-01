import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import {
    ColumnDef,
} from "@tanstack/react-table";
import PageWithTable from "@/modules/shared/PageWithTable/PageWithTable";
import { useParams } from "react-router-dom";
import { apiRoutes, apiRoutesSuperAdmin } from "@/constants/apiRoutes";
import { ROUTES } from "@/constants/routes";
import { useUserStore } from "@/store/userStore";

interface PinnedProps {
    superAdmin?: boolean;
    editAcc?: boolean;
    selectPinned?: (selected: string[]) => void;
}

const getRoutes = (superAdmin: boolean, id?: string) => ({
    createRoute: superAdmin
        ? `/super-admin/edit-user/${id}/settings/pinned/create`
        : ROUTES.PINNED.CREATE,
    getRoute: superAdmin && id
        ? {
            ...apiRoutesSuperAdmin.pinned.list,
            url: apiRoutesSuperAdmin.pinned.list.url(id),
        }
        : apiRoutes.pinned.list,
    deleteRoute: superAdmin
        ? apiRoutesSuperAdmin.pinned.deleteById.url
        : apiRoutes.pinned.deleteById.url,
    editRoute: superAdmin
        ? `super-admin/edit-user/${id}/settings/pinned/edit`
        : "pinned/edit",
});

const Pinned: React.FC = ({ superAdmin, editAcc, selectPinned }: PinnedProps) => {
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
                        {t("pinned.name")}
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => (
                <div className="capitalize pl-4">{row.getValue("name")}</div>
            ),
            meta: {
                width: "55%",
            },
        },
        {
            accessorKey: "intervalInHours",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        {t("pinned.intervalInHours")}
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => (
                <div className="capitalize pl-4">{row.getValue("intervalInHours")}</div>
            ),
            meta: {
                width: "10%",
            },
        },
        {
            accessorKey: "sortType",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        {t("pinned.sortType")}
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) =>
                <div className="lowercase pl-4">{row.getValue("sortType")}</div>,
            meta: {
                width: "10%",
            },
        },
        {
            accessorKey: "latestCount",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        {t("pinned.latestCount")}
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) =>
                <div className="lowercase pl-4">{row.getValue("latestCount")}</div>,
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
            title={superAdmin ? null : "pinned.pinned"}
            columns={columns}
            createRoute={createRoute}
            filterPlaceholder={("pinned.filter")}
            filterColumnName={"name"}
            getRoute={getRoute}
            deleteText={"pinned.delete"}
            deleteRoute={deleteRoute}
            editRoute={editRoute}
            userId={userId}
            noAction={editAcc}
            editAcc={editAcc}
            selectFunction={selectPinned}
            freeTrial={freeTrial}
        />
    );
};

export default Pinned;
