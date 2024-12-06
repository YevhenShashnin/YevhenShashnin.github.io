import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import axiosInstance from "@/utils/axiosInstance";
import { Link } from "react-router-dom";
import { Loader } from "@/components/ui";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/fanat/button";
import { useNavigate } from "react-router-dom";
import { apiRoutes, apiRoutesSuperAdmin } from "@/constants/apiRoutes";

const ContentGroupItem = () => {
    const { t } = useTranslation();
    const { userId, id } = useParams();
    const [groupData, setGroupData] = React.useState<any>({});
    const [loading, setLoading] = React.useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            let url = userId ? apiRoutesSuperAdmin.contentGroup.getById.url({
                userId,
                id,
            }) : apiRoutes.contentGroup.getById.url(id);
            axiosInstance({
                method: apiRoutes.contentGroup.getById.method,
                url: url,
            }).then((res) => {
                setGroupData(res.data);
                setLoading(false);
            });
        }

    }, []);
    if (loading) return (
        <Loader />
    );
    return (
        <div>
            <div className="flex items-center mb-4 mt-2"><Button variant="ghost" className="mr-4"
                                                                 onClick={() => navigate(-1)}
            ><ArrowLeft className="text-blue" /></Button><h1
                className=" text-xl text-blue">{groupData.name}</h1>
            </div>
            <div className="flex border-b pb-4 mb-4">
                <p className="w-40">{t("contentGroup.contents")}: </p>
                <ul className="list-disc">
                    {groupData.contents?.map((content: any) => (
                        <li key={content.id}><Link className="text-blue"
                                                   to={userId ? `/super-admin/edit-user/1/content/edit/${content.id}` : `/content/edit/${content.id}`}>{content.text}</Link>
                        </li>
                    ))}
                </ul>
            </div>
            <p>{t("contentGroup.accounts")}: </p>
        </div>
    );
};

export default ContentGroupItem;