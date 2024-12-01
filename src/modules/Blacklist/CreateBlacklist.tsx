import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { z } from "zod";
import CreateEdit, { Field } from "@/modules/shared/CreateEdit/CreateEdit";
import { ROUTES } from "@/constants/routes";
import { apiRoutes, apiRoutesSuperAdmin } from "@/constants/apiRoutes";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    PenLine, Type,
} from "lucide-react";

const CreateOurGroup = () => {
    const { t } = useTranslation();
    const { id, userId } = useParams();
    const fields: Field[] = [
        {
            id: "entityType",
            name: "entityType",
            labelKey: "blacklist.entityType",
            placeholderKey: "blacklist.entityType",
            type: "select",
            options: [
                {
                    "label": "Group ID",
                    "value": "group_id",
                },
                {
                    "label": "User",
                    "value": "user",
                },
                {
                    "label": "Phrase",
                    "value": "phrase",
                },
            ],
            icon: <Type />,
            tooltip: "blacklist.entityTypeTooltip",
            order: 1,
        },
        {
            id: "value",
            name: "value",
            labelKey: "blacklist.value",
            placeholderKey: "blacklist.value",
            type: "text",
            icon: <PenLine />,
            tooltip: t("blacklist.valueTooltip"),
        },
    ];

    const formSchema = z.object({
        entityType: z.string().nonempty(t("common.notEmpty")),
        value: z.string().nonempty(t("common.notEmpty")),
    });
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            entityType: "group_id",
            value: "",
        },
    });
    const apiRoutesToUse = userId ? {
        fetchById: apiRoutesSuperAdmin.blacklist.getById.url,
        create: apiRoutesSuperAdmin.blacklist.create.url,
        update: apiRoutesSuperAdmin.blacklist.updateById.url,
        delete: apiRoutesSuperAdmin.blacklist.deleteById.url,
    } : {
        fetchById: apiRoutes.blacklist.getById.url,
        create: apiRoutes.blacklist.create.url,
        update: apiRoutes.blacklist.updateById.url,
        delete: apiRoutes.blacklist.deleteById.url,
    };
    return (
        <CreateEdit
            title={id ? t("blacklist.edit") : t("blacklist.create")}
            deleteText={t("blacklist.delete", { selected: 1 })}
            fields={fields}
            apiRoutes={apiRoutesToUse}
            previousRoute={userId ? `/super-admin/edit-user/${userId}/blacklist` : ROUTES.BLACKLIST.LIST}
            form={form}
            id={id}
        />
    );
};

export default CreateOurGroup;