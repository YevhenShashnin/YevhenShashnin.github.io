import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { z } from "zod";
import CreateEdit, { Field } from "@/modules/shared/CreateEdit/CreateEdit";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ROUTES } from "@/constants/routes";
import { apiRoutes, apiRoutesSuperAdmin } from "@/constants/apiRoutes";
import {
    PenLine,
} from "lucide-react";

const CreateOurGroup = () => {
    const { t } = useTranslation();
    const { id, userId } = useParams();
    const fields: Field[] = [
        {
            id: "name",
            name: "name",
            labelKey: "contentGroup.name",
            placeholderKey: "contentGroup.name",
            type: "text",
            icon: <PenLine />,
            tooltip: t("contentGroup.nameTooltip"),
        },
    ];

    const formSchema = z.object({
        name: z.string().nonempty(t("common.notEmpty")),
    });
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    });
    const apiRoutesToUse = userId ? {
        fetchById: apiRoutesSuperAdmin.contentGroup.getById.url,
        create: apiRoutesSuperAdmin.contentGroup.create.url,
        update: apiRoutesSuperAdmin.contentGroup.updateById.url,
        delete: apiRoutesSuperAdmin.contentGroup.deleteById.url,
    } : {
        fetchById: apiRoutes.contentGroup.getById.url,
        create: apiRoutes.contentGroup.create.url,
        update: apiRoutes.contentGroup.updateById.url,
        delete: apiRoutes.contentGroup.deleteById.url,
    };
    return (
        <CreateEdit
            title={id ? t("contentGroup.edit") : t("contentGroup.create")}
            deleteText={t("contentGroup.delete", { selected: 1 })}
            fields={fields}
            apiRoutes={apiRoutesToUse}
            previousRoute={userId ? `/super-admin/edit-user/${userId}/content-group` : ROUTES.CONTENT_GROUP.LIST}
            form={form}
            id={id}
        />
    );
};

export default CreateOurGroup;