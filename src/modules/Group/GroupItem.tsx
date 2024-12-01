import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import axiosInstance from "@/utils/axiosInstance";
import { Link } from "react-router-dom";
import { Loader } from "@/components/ui";
import { apiRoutes } from "@/constants/apiRoutes";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const GroupItem = () => {
    const { t } = useTranslation();
    const { id, userId } = useParams();
    const [group, setGroup] = React.useState<any>([]);
    const [loading, setLoading] = React.useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axiosInstance.get(apiRoutes.groups.getById.url(id));
                setGroup(res.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    if (loading) return (
        <Loader />
    );
    const groupDetails = [
        { label: t("groups.strId"), value: group.strId },
        { label: t("groups.rate"), value: group.rate },
        { label: t("groups.status"), value: group.status },
        { label: t("groups.avgViewPerUser"), value: group.avgViewPerUser },
    ];

    return (
        <div>
            <div className="flex items-center mb-4 mt-2 border-b pb-4">
                <Button variant="ghost" className="mr-4"
                        onClick={() => navigate(-1)}
                ><ArrowLeft className="text-blue" /></Button>
                <h1
                    className="text-xl text-blue">{group.name}
                </h1>
            </div>
            <div className="flex flex-col pb-4 mb-4 ">
                {groupDetails.map((detail, index) => (
                    <p
                        key={index}
                        className={`p-2 ${index % 2 === 0 ? " bg-card" : ""}`}
                    >

                        {detail.label}: <span>{detail.value}</span>
                    </p>
                ))}
                <div className={`p-2  bg-card`}>
                    <p>
                        {t("groups.accounts")} : <span>{group.accounts.length}</span>
                    </p>
                    <ul>
                        {group.accounts.map((account, index) => (
                            <li key={index}>
                                <Link to={`/accounts/${account.id}`} className="text-blue p-2">{account.name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>

        </div>
    );
};

export default GroupItem;