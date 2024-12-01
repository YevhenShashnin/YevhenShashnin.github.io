import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { z } from "zod";
import CreateEdit, { Field } from "@/modules/shared/CreateEdit/CreateEdit";
import { ROUTES } from "@/constants/routes";
import { apiRoutes, apiRoutesSuperAdmin } from "@/constants/apiRoutes";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImagePlay, Pencil, ListChecks } from "lucide-react";
import axiosInstance from "@/utils/axiosInstance";

interface ContentProps {
    superAdmin?: boolean;
}

const CreateContent = ({ superAdmin }: ContentProps) => {
    const { t } = useTranslation();
    const { id, userId } = useParams();
    const [groups, setGroups] = React.useState([]);
    const fields: Field[] = [
        {
            id: "text",
            name: "text",
            labelKey: "content.text",
            placeholderKey: "content.text",
            type: "content",
            icon: <Pencil />,
            tooltip: t("content.textTooltip"),
        },
        {
            id: "gif",
            name: "gif",
            labelKey: "content.gif",
            placeholderKey: "content.gif",
            type: "gif",
            icon: <ImagePlay />,
            tooltip: t("content.gifTooltip"),
        },
        {
            id: "contentGroup",
            name: "contentGroup",
            labelKey: "content.group",
            placeholderKey: "content.content",
            type: "select",
            options: groups,
            icon: <ListChecks />,
            tooltip: "content.groupTooltip",
        },
    ];

    useEffect(() => {
        getGroups();
    }, []);

    const getGroups = async () => {
        const url = superAdmin && userId ? apiRoutesSuperAdmin.contentGroup.getAll.url(userId) : apiRoutes.contentGroup.getAll.url;
        const values = await axiosInstance({
            method: superAdmin ? apiRoutesSuperAdmin.contentGroup.getAll.method : apiRoutes.contentGroup.getAll.method,
            url: url,
        });
        if (!values.data) return;
        let groups = values.data.data.map((group: any) => ({
            label: group.name,
            value: `${group.id}`,
        }));
        groups = [{ label: 'empty', value: "no" }, ...groups];
        setGroups(groups);
    };

    const formSchema = z.object({
        text: z.string().nonempty(t("common.notEmpty")),
        gif: z.string(),
        contentGroup: z.string(),
    });
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            text: "",
            gif: "",
            contentGroup: "",
        },
    });
    const apiRoutesToUse = userId ? {
        fetchById: apiRoutesSuperAdmin.content.getById.url,
        create: apiRoutesSuperAdmin.content.create.url,
        update: apiRoutesSuperAdmin.content.updateById.url,
        delete: apiRoutesSuperAdmin.content.deleteById.url,
    } : {
        fetchById: apiRoutes.content.getById.url,
        create: apiRoutes.content.create.url,
        update: apiRoutes.content.updateById.url,
        delete: apiRoutes.content.deleteById.url,
    };
    return (
        <CreateEdit
            title={id ? t("content.edit") : t("content.create")}
            deleteText={t("content.delete", { selected: 1 })}
            fields={fields}
            apiRoutes={apiRoutesToUse}
            previousRoute={userId ? `/super-admin/edit-user/${userId}/content` : ROUTES.CONTENT.LIST}
            form={form}
            content
            id={id}
        />
    );
};

export default CreateContent;