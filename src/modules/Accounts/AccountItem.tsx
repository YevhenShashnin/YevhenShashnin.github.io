import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import axiosInstance from "@/utils/axiosInstance";
import { Link } from "react-router-dom";
import { Loader } from "@/components/ui";
import { apiRoutes, apiRoutesSuperAdmin } from "@/constants/apiRoutes";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const AccountItem = () => {
    const { t } = useTranslation();
    const { id, userId } = useParams();
    const [account, setAccount] = React.useState<any>({});
    const [groups, setGroups] = React.useState<any>([]);
    const [loading, setLoading] = React.useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        axiosInstance.get(userId ? apiRoutesSuperAdmin.accounts.getById.url({
            userId,
            id,
        }) : apiRoutes.accounts.getById.url(id)).then((res) => {
            setAccount(res.data);
            setLoading(false);
        });
        if (!userId) {
            axiosInstance.get(apiRoutes.accounts.getGroups.url(id)).then((res) => {
                setGroups(res.data.groups);
            });
        }
    }, []);
    if (loading) return (
        <Loader />
    );
    const accountDetails = [
        { label: t("account.name"), value: account.name },
        { label: t("account.userName"), value: account.username },
        { label: t("account.token"), value: account.token },
        { label: t("account.password"), value: account.password },
        { label: t("account.followersCount"), value: account.followersCount },
        { label: t("account.status"), value: account.status },
        { label: t("account.cooldownDue"), value: account.cooldownDue },
        { label: t("account.issue"), value: account.issue },
        {
            label: t("account.proxy"),
            value: account.proxy ?
                <Link
                    to={userId ? `super-admin/edit-user/${userId}/proxy/edit/${account.proxy.id}` : `/proxy/edit/${account.proxy.id}`}
                    className="text-blue">{account.proxy.ip}</Link> : "",
        },
        {
            label: t("account.browser"),
            value: account.browser ? <Link
                to={userId ? `super-admin/edit-user/${userId}/browser/edit/${account.browser.id}` : `/browser/edit/${account.browser.id}`}
                className="text-blue">{account.browser.name}</Link> : "",
        },
        {
            label: t("account.behaviour"),
            value: account.behaviour.name ? <Link
                to={userId ? `super-admin/edit-user/${userId}/behavior/edit/${account.behaviour.id}` : `/behavior/edit/${account.behaviour.id}`}
                className="text-blue">{account.behaviour.name}</Link> : "",
        },
        {
            label: t("account.autojoinSettings"),
            value: account.autojoinSettings ?
                <Link
                    to={userId ? `super-admin/edit-user/${userId}/autojoin/edit/${account.autojoinSettings.id}` : `/autojoin/edit/${account.autojoinSettings.id}`}
                    className="text-blue">Autojoin
                    Settings</Link> : "",
        },
        { label: t("account.autojoinEnabled"), value: account.autojoinEnabled ? t("common.yes") : t("common.no") },
        {
            label: t("account.pinnedSettings"),
            value: account.pinnedSettings ?
                <Link to={`/pinned/edit/${account.pinnedSettings.id}`} className="text-blue">Pinned
                    Settings</Link> : "",
        },
        { label: t("account.followDailyLimit"), value: account.followDailyLimit },
        { label: t("account.maxDailyFollows"), value: account.maxDailyFollows },
        { label: t("account.maxFollowLimit"), value: account.maxFollowLimit },
        { label: t("account.enableFollow"), value: account.followEnabled ? t("common.yes") : t("common.no") },
    ];

    return (
        <div>
            <div className="flex items-center mb-4 mt-2 border-b pb-4">
                <Button variant="ghost" className="mr-4"
                        onClick={() => navigate(-1)}
                ><ArrowLeft className="text-blue" /></Button>
                <h1
                    className="text-xl text-blue">{account.name}
                </h1>
            </div>
            <div className="flex flex-col pb-4 mb-4 ">
                {accountDetails.map((detail, index) => (
                    <p
                        key={index}
                        className={`p-2 ${index % 2 === 0 ? " bg-card" : ""}`}
                    >

                        {detail.label}: <span>{detail.value}</span>
                    </p>
                ))}
                <div className={`p-2  bg-card`}>
                    <p>
                        {t("account.groupsList")} : <span>{groups.length}</span>
                    </p>
                    <ul>
                        {groups.map((group, index) => (
                            <li key={index}>
                                <Link
                                    to={userId ? `/super-admin/edit-user/${userId}/groups/${group.id}` : `/groups/${group.id}`}
                                    className="text-blue p-2">{group.name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>

        </div>
    );
};

export default AccountItem;