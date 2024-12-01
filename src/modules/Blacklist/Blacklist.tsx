import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ROUTES } from "@/constants/routes";
import { apiRoutes, apiRoutesSuperAdmin } from "@/constants/apiRoutes";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import PageWithTable from "@/modules/shared/PageWithTable/PageWithTable";
import { useParams } from "react-router-dom";
import { useUserStore } from "@/store/userStore";

interface BlacklistProps {
    superAdmin?: boolean;
}

const getRoutes = (superAdmin: boolean, id?: string) => ({
    createRoute: superAdmin
        ? `/super-admin/edit-user/${id}/blacklist/create`
        : ROUTES.BLACKLIST.CREATE,
    getRoute:
        superAdmin && id
            ? {
                ...apiRoutesSuperAdmin.blacklist.list,
                url: apiRoutesSuperAdmin.blacklist.list.url(id),
            }
            :
            apiRoutes.blacklist.list,
    deleteRoute: superAdmin
        ? apiRoutesSuperAdmin.blacklist.deleteById.url
        : apiRoutes.blacklist.deleteById.url,
    editRoute: superAdmin
        ? `super-admin/edit-user/${id}/blacklist/edit`
        : "blacklist/edit",
});

const Blacklist = ({ superAdmin }: BlacklistProps) => {
    const { t } = useTranslation();
    const columns: ColumnDef<{}>[] = [
        {
            accessorKey: "entityType",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        {t("blacklist.entityType")}
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => (
                <div className="capitalize pl-4">{row.getValue("entityType")}</div>
            ),
            meta: {
                width: "40%",  // Percentage width for name column
            },
        },
        {
            accessorKey: "value",
            header: ({ column }) => {
                return (
                    t("blacklist.value")
                );
            },
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("value")}</div>
            ),
            meta: {
                width: "45%",  // Percentage width for maxGroupsCount column
            },
        },

    ];
    const { userId } = useParams();
    const { createRoute, getRoute, deleteRoute, editRoute } = getRoutes(!!superAdmin, userId);
    const { freeTrial } = useUserStore();
    return (
        <PageWithTable title={"blacklist.blacklist"}
                       columns={columns}
                       createRoute={createRoute}
                       filterPlaceholder={("blacklist.filter")}
                       filterColumnName={"value"}
                       getRoute={getRoute}
                       deleteText={"blacklist.delete"}
                       deleteRoute={deleteRoute}
                       editRoute={editRoute}
                       userId={userId}
                       freeTrial={freeTrial}
        />
    );
};

export default Blacklist;
