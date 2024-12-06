import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import axiosInstance from "@/utils/axiosInstance";
import { Link } from "react-router-dom";
import { Loader } from "@/components/ui";
import { apiRoutes } from "@/constants/apiRoutes";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/fanat/button";
import { useNavigate } from "react-router-dom";

const AccountItem = () => {
    const { t } = useTranslation();
    const { id, userId } = useParams();
    const [account, setAccount] = React.useState<any>({});
    const [loading, setLoading] = React.useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        axiosInstance.get(apiRoutes.accountsFollowing.getById.url(id)).then((res) => {
            setAccount(res.data);
            setLoading(false);
        });
    }, []);
    if (loading) return (
        <Loader />
    );
    const accountDetails = [
        { label: t("accountFollowing.name"), value: account.name },
        { label: t("accountFollowing.userName"), value: account.username },
        { label: t("accountFollowing.token"), value: account.token },
        { label: t("accountFollowing.password"), value: account.password },
        {
            label: t("accountFollowing.followingSettings"),
            value: account.followingSettings ? <Link to={`/browser/edit/${account.followingSettings.id}`}
                                                     className="text-blue">{account.followingSettings.name}</Link> : "",
        },
        { label: t("accountFollowing.pinnedSettings"), value: "?" },
        { label: t("accountFollowing.status"), value: account.status },
        {
            label: t("accountFollowing.proxy"), value: account.proxy ?
                <Link to={`/proxy/edit/${account.proxy.id}`} className="text-blue">{account.proxy.ip}</Link> : "",
        },
        {
            label: t("accountFollowing.browser"),
            value: account.browser ? <Link to={`/browser/edit/${account.browser.id}`}
                                           className="text-blue">{account.browser.name}</Link> : "",
        },

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

            </div>

        </div>
    );
};

export default AccountItem;