import React from "react";
import { Pencil, Scale, Timer, Tally4 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import CreateEdit, { Field } from "@/modules/shared/CreateEdit/CreateEdit";
import { apiRoutes, apiRoutesSuperAdmin } from "@/constants/apiRoutes";
import { ROUTES } from "@/constants/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface CreateAutojoinProps {
    selectAutojoin?: () => void;
    edditedId?: string;
}

const CreateAutojoin = ({ selectAutojoin, edditedId }: CreateAutojoinProps) => {
    const { t } = useTranslation();
    const { id, userId } = useParams();

    const fields: Field[] = [
        {
            id: "title",
            name: "title",
            labelKey: "autojoin.title",
            placeholderKey: "autojoin.title",
            type: "text",
            icon: <Pencil />,
            tooltip: t("autojoin.titleTooltip"),
        },
        {
            id: "rules",
            name: "rules",
            labelKey: "autojoin.rules",
            placeholderKey: "autojoin.rules",
            type: "multi-select",
            options: [
                { label: "nomin", value: "nomin" },
                { label: "1k", value: "1k" },
                { label: "2k", value: "2k" },
                { label: "3k", value: "3k" },
                { label: "4k", value: "4k" },
                { label: "5k", value: "5k" },
                { label: "6k", value: "6k" },
                { label: "7k", value: "7k" },
                { label: "8k", value: "8k" },
                { label: "9k", value: "9k" },
                { label: "10k", value: "10k" },
                { label: "12k", value: "12k" },
                { label: "15k", value: "15k" },
                { label: "20k", value: "20k" },
                { label: "25k", value: "25k" },
                { label: "30k", value: "30k" },
                { label: "35k", value: "35k" },
                { label: "40k", value: "40k" },
                { label: "45k", value: "45k" },
                { label: "50k", value: "50k" },
                { label: "55k", value: "55k" },
                { label: "60k", value: "60k" },
                { label: "65k", value: "65k" },
                { label: "70k", value: "70k" },
                { label: "75k", value: "75k" },
                { label: "80k", value: "80k" },
                { label: "85k", value: "85k" },
                { label: "90k", value: "90k" },
                { label: "100k", value: "100k" },
                { label: "110k", value: "110k" },
                { label: "120k", value: "120k" },
                { label: "150k", value: "150k" },
                { label: "200k", value: "200k" },
                { label: "250k", value: "250k" },
                { label: "300k", value: "300k" },
                { label: "350k", value: "350k" },
                { label: "400k", value: "400k" },
                { label: "450k", value: "450k" },
                { label: "500k", value: "500k" },
                { label: "550k", value: "550k" },
                { label: "600k", value: "600k" },
                { label: "650k", value: "650k" },
                { label: "700k", value: "700k" },
                { label: "750k", value: "750k" },
                { label: "800k", value: "800k" },
                { label: "850k", value: "850k" },
                { label: "900k", value: "900k" },
                { label: "950k", value: "950k" },
                { label: "1m", value: "1m" },
                { label: "no rule", value: "no rule" },
            ],
            icon: <Scale />,
            tooltip: t("autojoin.rulesTooltip"),
        },
        {
            id: "delay",
            name: "delay",
            labelKey: "autojoin.delay",
            placeholderKey: "autojoin.delay",
            type: "text",
            validation: "number",
            icon: <Timer />,
            tooltip: t("autojoin.delayTooltip"),
        },
        {
            id: "maxAccountsPerCycle",
            name: "maxAccountsPerCycle",
            labelKey: "autojoin.maxAccountsPerCycle",
            placeholderKey: "autojoin.maxAccountsPerCycle",
            type: "text",
            validation: "number",
            icon: <Tally4 />,
            tooltip: t("autojoin.maxAccountsPerCycleTooltip"),
        },
        {
            id: "maxGroupsPerCycle",
            name: "maxGroupsPerCycle",
            labelKey: "autojoin.maxGroupsPerCycle",
            placeholderKey: "autojoin.maxGroupsPerCycle",
            type: "text",
            validation: "number",
            icon: <Tally4 />,
            tooltip: t("autojoin.maxGroupsPerCycle"),
        },
    ];

    const formSchema = z.object({
        title: z.string().nonempty(t("common.notEmpty")),
        rules: z.array(
            z.object({
                value: z.string(),
                label: z.string(),
            }),
        ).nonempty(t("common.notEmpty")),
        delay: z.number().int().positive(t("common.notEmpty")),
        maxAccountsPerCycle: z.number().int().positive(t("common.notEmpty")),
        maxGroupsPerCycle: z.number().int().positive(t("common.notEmpty")),
    });
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            rules: [],
            delay: undefined,
            maxAccountsPerCycle: undefined,
            maxGroupsPerCycle: undefined,
        },
    });
    const apiRoutesToUse = userId ? {
        fetchById: apiRoutesSuperAdmin.autojoin.getById.url,
        create: apiRoutesSuperAdmin.autojoin.create.url,
        update: apiRoutesSuperAdmin.autojoin.updateById.url,
        delete: apiRoutesSuperAdmin.autojoin.deleteById.url,
    } : {
        fetchById: apiRoutes.autojoin.getById.url,
        create: apiRoutes.autojoin.create.url,
        update: apiRoutes.autojoin.updateById.url,
        delete: apiRoutes.autojoin.deleteById.url,
    };
    return (
        <CreateEdit
            title={id ? t("autojoin.edit") : t("autojoin.create")}
            deleteText={t("autojoin.delete", { selected: 1 })}
            fields={fields}
            apiRoutes={apiRoutesToUse}
            previousRoute={userId ? `/super-admin/edit-user/${userId}/settings/autojoin` : ROUTES.AUTOJOIN.LIST}
            form={form}
            id={edditedId ? edditedId : id}
            callBack={selectAutojoin}
        />


    );
};

export default CreateAutojoin;
