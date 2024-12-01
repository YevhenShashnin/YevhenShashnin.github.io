import React, { useState } from "react";
import { apiRoutesSuperAdmin } from "@/constants/apiRoutes";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import PageWithTable from "@/modules/shared/PageWithTable/PageWithTable";
import SuperAdminCreateUser from "@/modules/SuperAdmin/SuperAdminCreateUser";

const SuperAdmin = () => {
    const { t } = useTranslation();
    const [createUserModal, setCreateUserModal] = useState(false);
    const [shouldRefetch, setShouldRefetch] = useState(false);
    const [editUserId, setEditUserId] = useState<string | null>(null);
    const createUserCallback = () => {
        setCreateUserModal(false);
        setShouldRefetch(!shouldRefetch);
        setTimeout(() => {
            setShouldRefetch(false);
        }, 1000);
    };
    const columns: ColumnDef<{}>[] = [

        {
            accessorKey: "username",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        {t("superAdmin.username")}
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => (
                <div className="capitalize pl-4">{row.getValue("username")}</div>
            ),
            meta: {
                width: "20%",  // Percentage width for name column
            },
        },
        {
            accessorKey: "email",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        {t("superAdmin.email")}
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => (
                <div className="pl-4">{row.getValue("email")}</div>
            ),
            meta: {
                width: "15%",  // Percentage width for name column
            },
        },
        {
            accessorKey: "enabled",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        {t("superAdmin.enabled")}
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => (
                <div className="capitalize pl-4">{row.getValue("enabled").toString()}</div>
            ),
            meta: {
                width: "5%",  // Percentage width for maxGroupsCount column
            },
        },
        {
            accessorKey: "roles",
            header: ({ column }) => {
                return (
                    t("superAdmin.roles")
                );
            },
            cell: ({ row }) => {
                return (
                    <div
                        className="capitalize">{row.getValue("roles").map((role: string) => t(`superAdmin.${role}`)).join(", ")}</div>
                );
            },
            meta: {
                width: "20%",  // Percentage width for maxGroupsCount column
            },
        },
        {
            accessorKey: "subscription",
            header: ({ column }) => {
                return (
                    t("superAdmin.subscription")
                );
            },
            cell: ({ row }) => (
                <div className="capitalize">{JSON.stringify(row.getValue("subscription"))}</div>
            ),
            meta: {
                width: "20%",  // Percentage width for maxGroupsCount column
            },
        },
        {
            accessorKey: "subscriptionCount",
            header: ({ column }) => {
                return (
                    t("superAdmin.subscriptionCount")
                );
            },
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("subscriptionCount")}</div>
            ),
            meta: {
                width: "5%",
            },
        },
    ];
    const editUserHandler = (id: string) => {
        setCreateUserModal(true);
        setEditUserId(id);
    }
    return (
        <>
            <PageWithTable title={"superAdmin.users"}
                           columns={columns}
                           filterPlaceholder={("superAdmin.filter")}
                           filterColumnName={"username"}
                           getRoute={apiRoutesSuperAdmin.users.list}
                           createCallback={() => setCreateUserModal(true)}
                           deleteText={"superAdmin.delete"}
                           deleteRoute={apiRoutesSuperAdmin.users.deleteById.url}
                           shouldRefetch={shouldRefetch}
                           editRoute={"super-admin/edit-user"}
                           editUserCallback={editUserHandler}
            />
            <SuperAdminCreateUser open={createUserModal}
                                  close={() => setCreateUserModal(false)}
                                  createCallback={createUserCallback}
                                  id={editUserId}
            />
        </>

    );
};

export default SuperAdmin;