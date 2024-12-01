import React from "react";
import { Type, EthernetPort, MapPinXInside, NotebookPen, User, KeySquare } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import CreateEdit, { Field } from "@/modules/shared/CreateEdit/CreateEdit";
import { useForm } from "react-hook-form";
import { apiRoutes, apiRoutesSuperAdmin } from "@/constants/apiRoutes";
import { ROUTES } from "@/constants/routes";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

interface CreateProxyProps {
    selectProxy?: () => void;
    edditedId?: string;
}

const CreateProxy = ({ selectProxy, edditedId }: CreateProxyProps) => {
    const { t } = useTranslation();
    const { id, userId } = useParams();

    const fields: Field[] = [
        {
            id: "type",
            name: "type",
            labelKey: "proxy.type",
            placeholderKey: "proxy.type",
            type: "select",
            options: [
                {
                    "label": "HTTP",
                    "value": "http",
                },
                {
                    "label": "SOCKS4",
                    "value": "socks4",
                },
                {
                    "label": "SOCKS5",
                    "value": "socks5",
                },
            ],
            icon: <Type />,
            tooltip: "proxy.typeTooltip",
            order: 1,
        },
        {
            id: "userName",
            name: "userName",
            labelKey: "proxy.userName",
            placeholderKey: "proxy.userName",
            type: "text",
            validation: "text",
            icon: <User />,
            tooltip: "proxy.userNameTooltip",
            order: 4,
        },

        {
            id: "ip",
            name: "ip",
            labelKey: "proxy.ip",
            placeholderKey: "proxy.ip",
            type: "text",
            validation: "ip",
            icon: <MapPinXInside />,
            tooltip: "proxy.ipTooltip",
            order: 2,
        },
        {
            id: "credentials",
            name: "credentials",
            labelKey: "proxy.credentials",
            placeholderKey: "proxy.credentials",
            type: "text",
            validation: "text",
            icon: <KeySquare />,
            tooltip: "proxy.credentialsTooltip",
            order: 5,

        },

        {
            id: "port",
            name: "port",
            labelKey: "proxy.port",
            placeholderKey: "proxy.port",
            type: "port",
            validation: "number",
            icon: <EthernetPort />,
            tooltip: "proxy.portTooltip",
            order: 3,
        },
        {
            id: "comment",
            name: "comment",
            labelKey: "proxy.comment",
            placeholderKey: "proxy.comment",
            type: "text",
            icon: <NotebookPen />,
            tooltip: "proxy.commentTooltip",
            order: 6,
        },
    ];

    const formSchema = z.object({
        type: z.string().nonempty(t("common.notEmpty")),
        userName: z.string().nonempty(t("common.notEmpty")),
        ip: z.string().regex(ipRegex).nonempty(t("common.notEmpty")),
        port: z.number().int().min(1).max(65535),
        credentials: z.string().nonempty(t("common.notEmpty")),
        comment: z.string().optional(),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            type: "",
            userName: "",
            ip: "",
            credentials: "",
            port: 0,
            comment: "",
        },
    });

    const apiRoutesToUse = userId ? {
        fetchById: apiRoutesSuperAdmin.proxy.getById.url,
        create: apiRoutesSuperAdmin.proxy.create.url,
        update: apiRoutesSuperAdmin.proxy.updateById.url,
        delete: apiRoutesSuperAdmin.proxy.deleteById.url,
    } : {
        fetchById: apiRoutes.proxy.getById.url,
        create: apiRoutes.proxy.create.url,
        update: apiRoutes.proxy.updateById.url,
        delete: apiRoutes.proxy.deleteById.url,
    };
    return (
        <CreateEdit
            title={(id || edditedId) ? t("proxy.edit") : t("proxy.create")}
            deleteText={t("proxy.delete", { selected: 1 })}
            fields={fields}
            apiRoutes={apiRoutesToUse}
            previousRoute={userId ? `/super-admin/edit-user/${userId}/settings/proxy` : ROUTES.PROXY.LIST}
            form={form}
            id={edditedId ? edditedId : id}
            callBack={selectProxy}
        />
    );
};

export default CreateProxy;
