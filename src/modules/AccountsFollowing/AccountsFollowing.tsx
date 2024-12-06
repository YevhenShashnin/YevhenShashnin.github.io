import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { format as dateFnsFormat } from "date-fns";
import { ROUTES } from "@/constants/routes";
import { apiRoutes, apiRoutesSuperAdmin } from "@/constants/apiRoutes";
import axiosInstance from "@/utils/axiosInstance";
import PageWithTable from "@/modules/shared/PageWithTable/PageWithTable";
import SwitchForm from "@/modules/AccountsFollowing/SwitchForm/SwitchForm";
import { Badge } from "@/components/ui/badge";
import { badgeClass } from "@/constants/badgeClass";
import { useUserStore } from "@/store/userStore";
import { Button } from "@/components/ui/fanat/button";
import { ArrowUpDown } from "lucide-react";

interface AccountsFollowingProps {
    superAdmin?: boolean;
}

const getRoutes = (superAdmin: boolean, id?: string) => ({
    createRoute: superAdmin
        ? `/super-admin/edit-user/${id}/acc-following/create`
        : ROUTES.ACCOUNTS_FOLLOWING.CREATE,
    getRoute: superAdmin
        ? {
            ...apiRoutesSuperAdmin.accountsFollowing.list,
            url: apiRoutesSuperAdmin.accountsFollowing.list.url(id),
        }
        : apiRoutes.accountsFollowing.list,
    deleteRoute: superAdmin
        ? apiRoutesSuperAdmin.accountsFollowing.deleteById.url
        : apiRoutes.accountsFollowing.deleteById.url,
    editRoute: superAdmin
        ? `super-admin/edit-user/${id}/acc-following/edit`
        : "acc-following/edit",
});

const AccountsFollowing: React.FC = ({ superAdmin }: AccountsFollowingProps) => {
    const { t } = useTranslation();
    const { roles, freeTrial } = useUserStore();
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
                <div className="capitalize pl-4">{row.getValue("name")}</div>
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
            cell: ({ row }) => (
                <Badge className={`lowercase ml-4  ${badgeClass[row.getValue("status")]}`}>
                    {row.getValue("status")}
                </Badge>
            ),
            meta: {
                width: "10%",
            },
        },
        {
            accessorKey: "cooldown_due",
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
                    className="lowercase pl-4">{row.getValue("cooldown_due") ? dateFnsFormat(new Date(row.getValue("cooldown_due")), "dd/MM/yyyy HH:mm:ss") : ""}</div>,
            meta: {
                width: "10%",
            },
        },
    ];
    const [openModal, setOpenModal] = React.useState(false);
    const { id, userId } = useParams();
    const { createRoute, getRoute, deleteRoute, editRoute } = getRoutes(superAdmin, userId);
    const [shouldRefetch, setShouldRefetch] = React.useState(false);
    const [switchId, setSwitchId] = React.useState(null);
    const switchHandler = (id) => {
        setOpenModal(true);
        setSwitchId(id);
    };
    const pauseHandler = (id) => {
        try {
            axiosInstance({
                method: apiRoutes.accountsFollowing.pause.method,
                url: apiRoutes.accountsFollowing.pause.url(id),
            });
        } catch (err) {
            console.error("Switch failed", err);
        }
    };
    const restartHandler = (id) => {
        try {
            axiosInstance({
                method: apiRoutes.accountsFollowing.restart.method,
                url: apiRoutes.accountsFollowing.restart.url(id),
            });
        } catch (err) {
            console.error("Switch failed", err);
        }
    };
    return (
        <>
            <PageWithTable
                title={superAdmin ? null : "accountFollowing.accounts"}
                columns={columns}
                createRoute={createRoute}
                filterPlaceholder={("behavior.filter")}
                filterColumnName={"name"}
                getRoute={getRoute}
                deleteText={"accounts.delete"}
                deleteRoute={deleteRoute}
                showRoute={"acc-following"}
                editRoute={editRoute}
                userId={userId}
                switchHandler={switchHandler}
                pauseHandler={pauseHandler}
                startHandler={restartHandler}
                shouldRefetch={shouldRefetch}
                dontShowDelete={!roles.some(role => role === "ROLE_SUPER_ADMIN")}
                allowSelection={roles.some(role => role === "ROLE_SUPER_ADMIN")}
                freeTrial={!!freeTrial}
            />
            <SwitchForm open={openModal} setOpen={setOpenModal} id={switchId} key={switchId}
                        setShouldRefetch={setShouldRefetch} />
        </>
    );
};

export default AccountsFollowing;
