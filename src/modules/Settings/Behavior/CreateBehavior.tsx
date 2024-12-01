import React from "react";
import { Pencil, Gauge,  Calculator, Hash } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import CreateEdit, { Field } from "@/modules/shared/CreateEdit/CreateEdit";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { apiRoutes, apiRoutesSuperAdmin } from "@/constants/apiRoutes";
import { ROUTES } from "@/constants/routes";

interface CreateBehaviorProps {
    selectBehavior?: () => void;
    edditedId?: string;
}

const CreateBehavior = ({ selectBehavior, edditedId }: CreateBehaviorProps) => {
    const { t } = useTranslation();
    const { id, userId } = useParams();

    const fields: Field[] = [
        {
            id: "name",
            name: "name",
            labelKey: "behavior.name",
            placeholderKey: "behavior.name",
            type: "text",
            icon: <Pencil />,
            tooltip: t("behavior.nameTooltip"),
        },
        {
            id: "retweetSpeed",
            name: "retweetSpeed",
            labelKey: "behavior.retweetsSpeed",
            placeholderKey: "behavior.retweetsSpeed",
            type: "text",
            validation: "number",
            icon: <Gauge />,
            tooltip: t("behavior.retweetsSpeedTooltip"),
        },
        // {
        //     id: "cooldown",
        //     name: "cooldown",
        //     labelKey: "behavior.coolDown",
        //     placeholderKey: "behavior.coolDown",
        //     type: "text",
        //     icon: <TimerReset />,
        // },
        {
            id: "selfRetweetAmount",
            name: "selfRetweetAmount",
            labelKey: "behavior.selfRetweetsAmount",
            placeholderKey: "behavior.selfRetweetsAmount",
            type: "text",
            validation: "number",
            icon: <Hash />,
            tooltip: t("behavior.selfRetweetsAmountTooltip"),
        },
        {
            id: "maxGroupsCount",
            name: "maxGroupsCount",
            labelKey: "behavior.maxGroupsCount",
            placeholderKey: "behavior.maxGroupsCount",
            type: "text",
            validation: "number",
            icon: <Calculator />,
            tooltip: t("behavior.maxGroupsCountTooltip"),
        },
        // {
        //     id: "orderGroupsBy",
        //     name: "orderGroupsBy",
        //     labelKey: "behavior.orderGroupsBy",
        //     placeholderKey: "behavior.orderGroupsBy",
        //     type: "number",
        //     icon: <ListOrdered />,
        // },
    ];

    const formSchema = z.object({
        name: z.string().nonempty(t("common.notEmpty")),
        selfRetweetAmount: z.number().int().positive(t("common.notEmpty")),
        maxGroupsCount: z.number().int().positive(t("common.notEmpty")),
        retweetSpeed: z.number().int().positive(t("common.notEmpty")),
        orderGroupsBy: z.string().optional(),
        cooldown: z.number().int(t("common.notEmpty")),
        cooldownThreshold: z.number().int(t("common.notEmpty")),
    });
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            selfRetweetAmount: 0,
            maxGroupsCount: 0,
            retweetSpeed: 0,
            orderGroupsBy: "avg_view_per_user",
            cooldown: 0,
            cooldownThreshold: 0,
        },
    });
    const apiRoutesToUse = userId ? {
        fetchById: apiRoutesSuperAdmin.behavior.getById.url,
        create: apiRoutesSuperAdmin.behavior.create.url,
        update: apiRoutesSuperAdmin.behavior.updateById.url,
        delete: apiRoutesSuperAdmin.behavior.deleteById.url,
    } : {
        fetchById: apiRoutes.behavior.getById.url,
        create: apiRoutes.behavior.create.url,
        update: apiRoutes.behavior.updateById.url,
        delete: apiRoutes.behavior.deleteById.url,
    };
    return (
        <CreateEdit
            title={id ? t("behavior.edit") : t("behavior.create")}
            deleteText={t("behavior.delete", { selected: 1 })}
            fields={fields}
            apiRoutes={apiRoutesToUse}
            previousRoute={userId ? `/super-admin/edit-user/${userId}/settings/behaviour` : ROUTES.BEHAVIOR.LIST}
            form={form}
            id={edditedId ? edditedId : id}
            callBack={selectBehavior}
        />
    );
};

export default CreateBehavior;
