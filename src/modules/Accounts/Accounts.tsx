import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { apiRoutes, apiRoutesSuperAdmin } from "@/constants/apiRoutes";
import { ROUTES } from "@/constants/routes";
import { format as dateFnsFormat } from "date-fns";
import PageWithTable from "@/modules/shared/PageWithTable/PageWithTable";
import { useParams } from "react-router-dom";
import axiosInstance from "@/utils/axiosInstance";
import SwitchForm from "./SwitchForm/SwitchForm";
import { Badge } from "@/components/ui/badge";
import { badgeClass } from "@/constants/badgeClass";
import { useUserStore } from "@/store/userStore";
import { Button } from "@/components/ui/fanat/button";
import { ArrowUpDown } from "lucide-react";

interface AccountProps {
    superAdmin?: boolean;
}

const getRoutes = (superAdmin: boolean, id?: string) => ({
    createRoute: superAdmin
        ? `/super-admin/edit-user/${id}/accounts/create`
        : ROUTES.ACCOUNTS.CREATE,
    getRoute: superAdmin && id
        ? {
            ...apiRoutesSuperAdmin.accounts.list,
            url: apiRoutesSuperAdmin.accounts.list.url(id),
        }
        : apiRoutes.accounts.list,
    deleteRoute: superAdmin
        ? apiRoutesSuperAdmin.accounts.deleteById.url
        : apiRoutes.accounts.deleteById.url,
    editRoute: superAdmin
        ? `super-admin/edit-user/${id}/accounts/edit`
        : "accounts/edit",
});


const Accounts: React.FC = ({ superAdmin }: AccountProps) => {
    const { t } = useTranslation();
    const columns = [
        {
            accessorKey: "name",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        {t("accounts.name")}
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => (
                <div className="capitalize  pl-4">{row.getValue("name")}</div>
            ),
            meta: {
                width: "20%",
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
                        {t("accounts.status")}
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) =>
                (
                    <Badge className={`lowercase  ml-4  ${badgeClass[row.getValue("status")]}`}>
                        {row.getValue("status")}
                    </Badge>
                ),
            meta: {
                width: "10%",
            },
        },
        {
            accessorKey: "retweets_count_1h",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        {t("accounts.retweets")}
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => {
                const retweetsCountHour = row?.original?.retweetsCount24h;
                const retweetsCount1h = row?.original?.retweetsCount1h;
                return (
                    <div
                        className="lowercase  pl-4">{retweetsCountHour} [{retweetsCount1h}]</div>);
            },
            meta: {
                width: "20%",
            },
        },
        {
            accessorKey: "groupsCount",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        {t("accounts.groupsCount")}
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) =>
                <div
                    className="lowercase pl-4">{row.getValue("groupsCount")}</div>,
            meta: {
                width: "10%",
            },
        },
        {
            accessorKey: "cooldownDue",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        {t("accounts.cooldownDue")}
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) =>
                <div
                    className="lowercase pl-4">{row.getValue("cooldownDue") ? dateFnsFormat(new Date(row.getValue("cooldownDue")), "dd/MM/yyyy HH:mm:ss") : ""}</div>,
            meta: {
                width: "10%",
            },
        },
    ];
    const { userId } = useParams();
    const { roles, plans } = useUserStore();
    const { createRoute, getRoute, deleteRoute, editRoute } = getRoutes(!!superAdmin, userId);
    const [shouldRefetch, setShouldRefetch] = React.useState(false);
    const [openModal, setOpenModal] = React.useState(false);
    const [switchId, setSwitchId] = React.useState(null);
    const switchHandler = (id) => {
        setOpenModal(true);
        setSwitchId(id);
    };

    const pauseHandler = (id) => {
        try {
            axiosInstance({
                method: superAdmin ? apiRoutesSuperAdmin.accounts.pause.method : apiRoutes.accounts.pause.method,
                url: superAdmin ? apiRoutesSuperAdmin.accounts.pause.url({
                    userId,
                    id,
                }) : apiRoutes.accounts.pause.url(id),
            });
            setTimeout(() => {
                setShouldRefetch(true);
                setTimeout(() => {
                    setShouldRefetch(false);
                }, 1000);
            }, 1000);

        } catch (err) {
            console.error("Switch failed", err);
        }
    };
    const restartHandler = (id) => {
        try {
            axiosInstance({
                method: superAdmin ? apiRoutesSuperAdmin.accounts.restart.method : apiRoutes.accounts.restart.method,
                url: superAdmin ? apiRoutesSuperAdmin.accounts.restart.url({
                    userId,
                    id,
                }) : apiRoutes.accounts.restart.url(id),
            });
            setTimeout(() => {
                setShouldRefetch(true);
                setTimeout(() => {
                    setShouldRefetch(false);
                }, 1000);
            }, 1000);
        } catch (err) {
            console.error("Switch failed", err);
        }
    };
    return (
        <>
            <PageWithTable
                title={superAdmin ? null : "accounts.accounts"}
                columns={columns}
                createRoute={createRoute}
                filterPlaceholder={("behavior.filter")}
                filterColumnName={"name"}
                getRoute={getRoute}
                deleteText={"accounts.delete"}
                deleteRoute={deleteRoute}
                showRoute={superAdmin ? `super-admin/edit-user/${userId}/accounts` : "accounts"}
                editRoute={editRoute}
                userId={userId}
                switchHandler={switchHandler}
                pauseHandler={pauseHandler}
                startHandler={restartHandler}
                shouldRefetch={shouldRefetch}
                dontShowDelete={!roles.some(role => role === "ROLE_SUPER_ADMIN")}
            />
            <SwitchForm open={openModal} setOpen={setOpenModal} id={switchId} key={switchId}
                        setShouldRefetch={setShouldRefetch} />
        </>
    );
};

export default Accounts;
