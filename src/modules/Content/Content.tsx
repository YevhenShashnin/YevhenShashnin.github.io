import React from "react";
import { ROUTES } from "@/constants/routes";
import { apiRoutes, apiRoutesSuperAdmin } from "@/constants/apiRoutes";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/fanat/button";
import { ArrowUpDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import PageWithTable from "@/modules/shared/PageWithTable/PageWithTable";

interface ContentProps {
    superAdmin?: boolean;
}

const getRoutes = (superAdmin: boolean, id?: string) => ({
    createRoute: superAdmin
        ? `/super-admin/edit-user/${id}/content/create`
        : ROUTES.CONTENT.CREATE,
    getRoute: superAdmin && id
        ? {
            ...apiRoutesSuperAdmin.content.list,
            url: apiRoutesSuperAdmin.content.list.url(id),
        }
        : apiRoutes.content.list,
    deleteRoute: superAdmin
        ? apiRoutesSuperAdmin.content.deleteById.url
        : apiRoutes.content.deleteById.url,
    editRoute: superAdmin
        ? `super-admin/edit-user/${id}/content/edit`
        : "content/edit",
});

const Content = ({ superAdmin }: ContentProps) => {
    const { t } = useTranslation();
    const columns: ColumnDef<{}>[] = [
        {
            accessorKey: "text",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        {t("content.text")}
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => (
                <div className="capitalize pl-4">{row.getValue("text")}</div>
            ),
            meta: {
                width: "40%",  // Percentage width for name column
            },
        },
        {
            accessorKey: "gif",
            header: ({ column }) => {
                return (

                    t("content.gif")
                );
            },
            cell: ({ row }) => {
                if (row.getValue("gif")) return (
                    <img src={row.getValue("gif")} alt="gif" className="max-w-[200px] " />);
            },
            meta: {
                width: "20%",
            },
        },

        {
            accessorKey: "contentGroup",
            header: ({ column }) => {
                return (

                    t("content.contentGroup")

                );
            },
            cell: ({ row }) =>
                <Link to={`/group-content/${row.getValue("contentGroup")?.id}`}
                      className=" pl-4 text-blue">{row.getValue("contentGroup")?.name}</Link>,
            meta: {
                width: "20%",
            },
        },


    ];
    const { userId } = useParams();
    const { createRoute, getRoute, deleteRoute, editRoute } = getRoutes(!!superAdmin, userId);

    return (
        <PageWithTable title={superAdmin ? null : "content.content"}
                       columns={columns}
                       createRoute={createRoute}
                       filterPlaceholder={("content.filter")}
                       filterColumnName={"text"}
                       getRoute={getRoute}
                       deleteText={"content.delete"}
                       deleteRoute={deleteRoute}
                       showRoute={"content"}
                       editRoute={editRoute}
                       userId={userId}
        />
    );
};

export default Content;