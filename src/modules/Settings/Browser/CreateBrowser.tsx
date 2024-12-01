import React from "react";
import { Languages, Chrome, NotebookPen } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import CreateEdit, { Field } from "@/modules/shared/CreateEdit/CreateEdit";
import { apiRoutes , apiRoutesSuperAdmin} from "@/constants/apiRoutes";
import { ROUTES } from "@/constants/routes";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface CreateBrowserProps {
    selectBrowser?: () => void;
    edditedId?: string;
}

const CreateBrowser = ({ selectBrowser, edditedId }: CreateBrowserProps) => {
    const { t } = useTranslation();
    const { id, userId } = useParams();

    const fields: Field[] = [
        {
            id: "language",
            name: "language",
            labelKey: "browser.language",
            placeholderKey: "browser.language",
            type: "text",
            icon: <Languages />,
            tooltip: t("browser.languageTooltip"),
        },
        {
            id: "agent",
            name: "agent",
            labelKey: "browser.agent",
            placeholderKey: "browser.agent",
            type: "text",
            icon: <Chrome />,
            tooltip: t("browser.agentTooltip"),
        },
        {
            id: "comment",
            name: "comment",
            labelKey: "browser.comment",
            placeholderKey: "browser.comment",
            type: "text",
            icon: <NotebookPen />,
            tooltip: t("browser.commentTooltip"),
        },
    ];

    const formSchema = z.object({
        language: z.string().nonempty(t("common.notEmpty")),
        agent: z.string().nonempty(t("common.notEmpty")),
        comment: z.string().optional(),
    });
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            language: "",
            agent: "",
            comment: "",
        },
    });
    const apiRoutesToUse = userId ? {
        fetchById: apiRoutesSuperAdmin.browser.getById.url,
        create: apiRoutesSuperAdmin.browser.create.url,
        update: apiRoutesSuperAdmin.browser.updateById.url,
        delete: apiRoutesSuperAdmin.browser.deleteById.url,
    } : {
        fetchById: apiRoutes.browser.getById.url,
        create: apiRoutes.browser.create.url,
        update: apiRoutes.browser.updateById.url,
        delete: apiRoutes.browser.deleteById.url,
    };
    return (
        <CreateEdit
            title={(id || edditedId) ? t("browser.edit") : t("browser.create")}
            deleteText={t("browser.delete", { selected: 1 })}
            fields={fields}
            apiRoutes={apiRoutesToUse}
            previousRoute={userId ? `/super-admin/edit-user/${userId}/settings/browser` : ROUTES.BROWSER.LIST}
            form={form}
            id={edditedId ? edditedId : id}
            callBack={selectBrowser}
        />
    );
};

export default CreateBrowser;
