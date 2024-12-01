import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import PageWithTable from "@/modules/shared/PageWithTable/PageWithTable";
import { useParams } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { apiRoutes, apiRoutesSuperAdmin } from "@/constants/apiRoutes";

interface ContentGroupProps {
    superAdmin?: boolean;
}

const getRoutes = (superAdmin: boolean, id?: string) => ({
    createRoute: superAdmin
        ? `/super-admin/edit-user/${id}/group-content/create`
        : ROUTES.CONTENT_GROUP.CREATE,
    getRoute: superAdmin && id
        ? {
            ...apiRoutesSuperAdmin.contentGroup.list,
            url: apiRoutesSuperAdmin.contentGroup.list.url(id),
        }
        : apiRoutes.contentGroup.list,
    deleteRoute: superAdmin
        ? apiRoutesSuperAdmin.contentGroup.deleteById.url
        : apiRoutes.contentGroup.deleteById.url,
    editRoute: superAdmin
        ? `super-admin/edit-user/${id}/group-content/edit`
        : "group-content/edit",
});

const ContentGroup = ({ superAdmin }: ContentGroupProps) => {
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
                        {t("contentGroup.name")}
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => (
                <div className="capitalize pl-4">{row.getValue("name")}</div>
            ),
            meta: {
                width: "40%",
            },
        },

    ];
    const { userId } = useParams();
    const { createRoute, getRoute, deleteRoute, editRoute } = getRoutes(!!superAdmin, userId);
    return (
        <PageWithTable title={superAdmin ? null : "contentGroup.contentGroup"}
                       columns={columns}
                       createRoute={createRoute}
                       filterPlaceholder={("contentGroup.filter")}
                       filterColumnName={"name"}
                       getRoute={getRoute}
                       deleteText={"accounts.delete"}
                       deleteRoute={deleteRoute}
                       showRoute={superAdmin ? `super-admin/edit-user/${userId}/group-content` :"group-content"}
                       editRoute={editRoute}
                       userId={userId}
        />
    );
};

export default ContentGroup;
