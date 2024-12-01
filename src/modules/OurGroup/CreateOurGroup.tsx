import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { z } from "zod";
import CreateEdit, { Field } from "@/modules/shared/CreateEdit/CreateEdit";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    User,
    IdCard,
    TypeOutline,
    Star,
    PencilRuler,
    UserPlus,
} from "lucide-react";
import axiosInstance from "@/utils/axiosInstance";
import { apiRoutes, apiRoutesSuperAdmin } from "@/constants/apiRoutes";
import { ROUTES } from "@/constants/routes";

const CreateOurGroup = () => {
    const { t } = useTranslation();
    const { id, userId } = useParams();
    const [accounts, setAccounts] = React.useState([]);
    useEffect(() => {
        getAccounts();
    }, []);
    const getAccounts = async () => {
        const apiUrl = userId ? apiRoutesSuperAdmin.accounts.getAll.url(userId) : apiRoutes.accounts.getAll.url;
        const values = await axiosInstance.get(apiUrl);
        console.log(values);
        setAccounts(values.data.data.map((acc: any) => ({
            label: acc.name,
            value: `${acc.id}`,
        })));
    };
    const fields: Field[] = [
        {
            id: "groupOwnerId",
            name: "groupOwnerId",
            labelKey: "ourGroups.groupOwner",
            placeholderKey: "ourGroups.groupOwner",
            type: "select",
            options: accounts,
            icon: <User />,
            tooltip: "ourGroups.groupOwnerTooltip",
            order: 1,
        },
        {
            id: "strId",
            name: "strId",
            labelKey: "ourGroups.strId",
            placeholderKey: "ourGroups.strId",
            type: "text",
            icon: <IdCard />,
            tooltip: t("ourGroups.strIdTooltip"),
        },
        {
            id: "title",
            name: "title",
            labelKey: "ourGroups.title",
            placeholderKey: "ourGroups.title",
            type: "text",
            icon: <TypeOutline />,
            tooltip: t("ourGroups.titleTooltip"),
        },
        {
            id: "rate",
            name: "rate",
            labelKey: "ourGroups.rate",
            placeholderKey: "ourGroups.rate",
            type: "text",
            validation: "number",
            icon: <Star />,
            tooltip: t("ourGroups.rateTooltip"),
        },
        {
            id: "rule",
            name: "rule",
            labelKey: "ourGroups.rule",
            placeholderKey: "ourGroups.rule",
            type: "text",
            icon: <PencilRuler />,
            tooltip: t("ourGroups.ruleTooltip"),
        },
        {
            id: "maxOurAccounts",
            name: "maxOurAccounts",
            labelKey: "ourGroups.maxOurAccounts",
            placeholderKey: "ourGroups.maxOurAccounts",
            type: "text",
            validation: "number",
            icon: <UserPlus />,
            tooltip: t("ourGroups.maxOurAccountsTooltip"),
        },

    ];

    const formSchema = z.object({
        groupOwnerId: z.string(),
        strId: z.string(),
        title: z.string(),
        rate: z.number(),
        rule: z.string(),
        maxOurAccounts: z.number(),
    });
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            groupOwnerId: "",
            strId: "",
            title: "",
            rate: 0,
            rule: "",
            maxOurAccounts: "",
        },
    });
    const apiRoutesToUse = userId ? {
        fetchById: apiRoutesSuperAdmin.ourGroups.getById.url,
        create: apiRoutesSuperAdmin.ourGroups.create.url,
        update: apiRoutesSuperAdmin.ourGroups.updateById.url,
        delete: apiRoutesSuperAdmin.ourGroups.deleteById.url,
    } : {
        fetchById: apiRoutes.ourGroups.getById.url,
        create: apiRoutes.ourGroups.create.url,
        update: apiRoutes.ourGroups.updateById.url,
        delete: apiRoutes.ourGroups.deleteById.url,
    };
    return (
        <CreateEdit
            title={id ? t("ourGroups.edit") : t("ourGroups.create")}
            deleteText={t("content.delete", { selected: 1 })}
            fields={fields}
            apiRoutes={apiRoutesToUse}
            previousRoute={userId ? `/super-admin/edit-user/${userId}/ourGroups` : ROUTES.OUR_GROUPS.LIST}
            form={form}
            id={id}
        />
    );
};

export default CreateOurGroup;