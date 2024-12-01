import React from "react";
import { Pencil, Clock10, Type, Tally4 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import CreateEdit, { Field } from "@/modules/shared/CreateEdit/CreateEdit";
import { ROUTES } from "@/constants/routes";
import { apiRoutes, apiRoutesSuperAdmin } from "@/constants/apiRoutes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface CreatePinnedProps {
    selectPinned?: () => void;
    edditedId?: string;
}

const CreatePinned = ({ selectPinned, edditedId }: CreatePinnedProps) => {
    const { t } = useTranslation();
    const { id, userId } = useParams();

    const fields: Field[] = [
        {
            id: "name",
            name: "name",
            labelKey: "pinned.name",
            placeholderKey: "pinned.name",
            type: "text",
            icon: <Pencil />,
            tooltip: t("pinned.nameTooltip"),
        },
        {
            id: "intervalInHours",
            name: "intervalInHours",
            labelKey: "pinned.intervalInHours",
            placeholderKey: "pinned.intervalInHours",
            type: "text",
            validation: "number",
            icon: <Clock10 />,
            tooltip: t("pinned.intervalInHoursTooltip"),
        },
        {
            id: "sortType",
            name: "sortType",
            labelKey: "pinned.sortType",
            placeholderKey: "pinned.sortType",
            type: "select",
            options: [
                { label: t("pinned.sortTypeLatest"), value: "latest" },
                { label: t("pinned.sortTypeRandom"), value: "random" },
            ],
            icon: <Type />,
            tooltip: t("pinned.sortTypeTooltip"),
        },
        {
            id: "latestCount",
            name: "latestCount",
            labelKey: "pinned.latestCount",
            placeholderKey: "pinned.latestCount",
            type: "text",
            validation: "number",
            icon: <Tally4 />,
            tooltip: t("pinned.latestCountTooltip"),
        },
    ];

    const formSchema = z.object({
        name: z.string().nonempty(t("common.notEmpty")),
        intervalInHours: z.number().int().positive(t("common.notEmpty")),
        sortType: z.string().nonempty(t("common.notEmpty")),
        latestCount: z.number().int().positive(t("common.notEmpty")),

    });
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            intervalInHours: undefined,
            sortType: "",
            latestCount: undefined,
        },
    });
    const apiRoutesToUse = userId ? {
        fetchById: apiRoutesSuperAdmin.pinned.getById.url,
        create: apiRoutesSuperAdmin.pinned.create.url,
        update: apiRoutesSuperAdmin.pinned.updateById.url,
        delete: apiRoutesSuperAdmin.pinned.deleteById.url,
    } : {
        fetchById: apiRoutes.pinned.getById.url,
        create: apiRoutes.pinned.create.url,
        update: apiRoutes.pinned.updateById.url,
        delete: apiRoutes.pinned.deleteById.url,
    };
    return (
        <CreateEdit
            title={id ? t("pinned.edit") : t("pinned.create")}
            deleteText={t("pinned.delete", { selected: 1 })}
            fields={fields}
            apiRoutes={apiRoutesToUse}
            previousRoute={userId ? `/super-admin/edit-user/${userId}/settings/pinned` : ROUTES.PINNED.LIST}
            form={form}
            id={edditedId ? edditedId : id}
            callBack={selectPinned}
        />
    );
};

export default CreatePinned;
