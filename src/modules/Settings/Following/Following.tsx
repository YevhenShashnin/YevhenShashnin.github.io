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
    selectFollowing?: (selected: string[]) => void;
}

const getRoutes = (superAdmin: boolean, id?: string) => ({
    createRoute: superAdmin
        ? `/super-admin/edit-user/${id}/settings/following/create`
        : ROUTES.FOLLOWING.CREATE,
    getRoute: superAdmin && id
        ? {
            ...apiRoutesSuperAdmin.following.list,
            url: apiRoutesSuperAdmin.following.list.url(id),
        }
        : apiRoutes.following.list,
    deleteRoute: superAdmin
        ? apiRoutesSuperAdmin.following.deleteById.url
        : apiRoutes.following.deleteById.url,
    editRoute: superAdmin
        ? `super-admin/edit-user/${id}/settings/following/edit`
        : "following/edit",
});

const Following: React.FC = ({ superAdmin, editAcc, selectFollowing }: PinnedProps) => {
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
                        {t("following.name")}
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => (
                <div className="capitalize pl-4">{row.getValue("name")}</div>
            ),
            meta: {
                width: "55%",  // Percentage width for name column
            },
        },
        {
            accessorKey: "maxFollow",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        {t("following.maxFollow")}
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => (
                <div className="capitalize pl-4">{row.getValue("maxFollow")}</div>
            ),
            meta: {
                width: "10%",
            },
        },
        {
            accessorKey: "maxUnfollow",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        {t("following.maxUnfollow")}
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) =>
                <div className="lowercase pl-4">{row.getValue("maxUnfollow")}</div>,
            meta: {
                width: "10%",  // Percentage width for cooldown column
            },
        },
        {
            accessorKey: "likeCount",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        {t("following.likeCount")}
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) =>
                <div className="lowercase pl-4">{row.getValue("likeCount")}</div>,
            meta: {
                width: "10%",  // Percentage width for retweetSpeed column
            },
        },
    ];
    const { userId } = useParams();
    const { createRoute, getRoute, deleteRoute, editRoute } = getRoutes(!!superAdmin, userId);
    const { freeTrial } = useUserStore();

    return (
        <PageWithTable
            title={superAdmin ? null : "following.following"}
            columns={columns}
            createRoute={createRoute}
            filterPlaceholder={("following.filter")}
            filterColumnName={"name"}
            getRoute={getRoute}
            deleteText={"pinned.delete"}
            deleteRoute={deleteRoute}
            editRoute={editRoute}
            userId={userId}
            noAction={editAcc}
            editAcc={editAcc}
            selectFunction={selectFollowing}
            freeTrial={freeTrial}
        />
    );
};

export default Following;
