import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/fanat/button";
import { ArrowUpDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import PageWithTable from "@/modules/shared/PageWithTable/PageWithTable";
import { ROUTES } from "@/constants/routes";
import { apiRoutes, apiRoutesSuperAdmin } from "@/constants/apiRoutes";
import { useUserStore } from "@/store/userStore";

interface OurGroupProps {
    superAdmin?: boolean;
}

const getRoutes = (superAdmin: boolean, id?: string) => ({
    createRoute: superAdmin
        ? `/super-admin/edit-user/${id}/our-group/create`
        : ROUTES.OUR_GROUPS.CREATE,
    getRoute: superAdmin && id
        ? {
            ...apiRoutesSuperAdmin.ourGroups.list,
            url: apiRoutesSuperAdmin.ourGroups.list.url(id),
        }
        : apiRoutes.ourGroups.list,
    deleteRoute: superAdmin
        ? apiRoutesSuperAdmin.ourGroups.deleteById.url
        : apiRoutes.ourGroups.deleteById.url,
    editRoute: superAdmin
        ? `super-admin/edit-user/${id}/our-groups/edit`
        : "our-groups/edit",
});

const OurGroup = ({ superAdmin }: OurGroupProps) => {
    const { t } = useTranslation();
    const columns: ColumnDef<{}>[] = [
        {
            accessorKey: "strId",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        {t("ourGroups.strId")}
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => (
                <div className="capitalize pl-4">{row.getValue("strId")}</div>
            ),
            meta: {
                width: "40%",  // Percentage width for name column
            },
        },
        {
            accessorKey: "groupOwner",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        {t("ourGroups.groupOwner")}
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => (
                <Link to={`/account/${row.getValue("groupOwner") ? row.getValue("groupOwner").id : ""}`}
                      className="capitalize pl-4 text-blue">{row.getValue("groupOwner") ? row.getValue("groupOwner").name : ""}</Link>), // adjust to refer to account
            meta: {
                width: "20%",  // Percentage width for maxGroupsCount column
            },
        },

        {
            accessorKey: "title",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        {t("ourGroups.title")}
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>


                );
            },
            cell: ({ row }) =>
                <div className="lowercase pl-4">{row.getValue("title")}</div>,
            meta: {
                width: "20%",  // Percentage width for cooldown column
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
                        {t("ourGroups.rate")}
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>


                );
            },
            cell: ({ row }) =>
                <div className="lowercase pl-4">{row.getValue("rate")}</div>,
            meta: {
                width: "20%",  // Percentage width for cooldown column
            },
        },
        {
            accessorKey: "rule",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        {t("ourGroups.rule")}
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>


                );
            },
            cell: ({ row }) =>
                <div className="lowercase pl-4">{row.getValue("rule")}</div>,
            meta: {
                width: "20%",  // Percentage width for cooldown column
            },
        },
        {
            accessorKey: "maxOurAccounts",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        {t("ourGroups.maxOurAccounts")}
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>


                );
            },
            cell: ({ row }) =>
                <div className="lowercase pl-4">{row.getValue("maxOurAccounts")}</div>,
            meta: {
                width: "20%",
            },
        },

    ];
    const {  freeTrial } = useUserStore();
    const { userId } = useParams();
    const { createRoute, getRoute, deleteRoute, editRoute } = getRoutes(!!superAdmin, userId);
    return (
        <PageWithTable title={"ourGroups.ourGroups"}
                       columns={columns}
                       createRoute={createRoute}
                       filterPlaceholder={("ourGroups.filter")}
                       filterColumnName={"title"}
                       getRoute={getRoute}
                       deleteText={"ourGroups.delete"}
                       deleteRoute={deleteRoute}
                       showRoute={"our-groups"}
                       editRoute={editRoute}
                       userId={userId}
                       freeTrial={freeTrial}
        />
    );
};

export default OurGroup;
