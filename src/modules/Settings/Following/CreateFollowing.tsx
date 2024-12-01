import React, { useEffect } from "react";
import { Pencil, UserPlus, UserMinus, Heart } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import CreateEdit, { Field } from "@/modules/shared/CreateEdit/CreateEdit";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { apiRoutes, apiRoutesSuperAdmin } from "@/constants/apiRoutes";
import { ROUTES } from "@/constants/routes";

interface CreateFollowingProps {
    selectFollowing?: () => void;
    edditedId?: string;
}

const CreateFollowing = ({ selectFollowing, edditedId }: CreateFollowingProps) => {

    const { t } = useTranslation();
    const { id, userId } = useParams();

    const fields: Field[] = [
        {
            id: "name",
            name: "name",
            labelKey: "following.name",
            placeholderKey: "following.name",
            type: "text",
            icon: <Pencil />,
            tooltip: t("following.nameTooltip"),
        },
        {
            id: "maxFollow",
            name: "maxFollow",
            labelKey: "following.maxFollow",
            placeholderKey: "following.maxFollow",
            type: "text",
            validation: "number",
            icon: <UserPlus />,
            tooltip: t("following.maxFollowTooltip"),
        },
        {
            id: "maxUnfollow",
            name: "maxUnfollow",
            labelKey: "following.maxUnfollow",
            placeholderKey: "following.maxUnfollow",
            type: "text",
            validation: "number",
            icon: <UserMinus />,
            tooltip: t("following.maxUnfollowTooltip"),
        },
        {
            id: "likeCount",
            name: "likeCount",
            labelKey: "following.likeCount",
            placeholderKey: "following.likeCount",
            type: "text",
            validation: "number",
            icon: <Heart />,
            tooltip: t("following.likeCountTooltip"),
        },
    ];

    const formSchema = z.object({
        name: z.string().nonempty(t("common.notEmpty")),
        maxFollow: z.number().int().positive(t("common.notEmpty")),
        maxUnfollow:  z.number().int().positive(t("common.notEmpty")),
        likeCount: z.number().int().positive(t("common.notEmpty")),

    });
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: undefined,
            maxFollow: undefined,
            maxUnfollow: undefined,
            likeCount: undefined,
        },
    });
    const apiRoutesToUse = userId ? {
        fetchById: apiRoutesSuperAdmin.following.getById.url,
        create: apiRoutesSuperAdmin.following.create.url,
        update: apiRoutesSuperAdmin.following.updateById.url,
        delete: apiRoutesSuperAdmin.following.deleteById.url,
    } : {
        fetchById: apiRoutes.following.getById.url,
        create: apiRoutes.following.create.url,
        update: apiRoutes.following.updateById.url,
        delete: apiRoutes.following.deleteById.url,
    };
    return (

        <CreateEdit
            title={id ? t("following.edit") : t("following.create")}
            deleteText={t("pinned.delete", { selected: 1 })}
            fields={fields}
            apiRoutes={apiRoutesToUse}
            previousRoute={userId ? `/super-admin/edit-user/${userId}/settings/following` : ROUTES.FOLLOWING.LIST}
            form={form}
            id={edditedId ? edditedId : id}
            callBack={selectFollowing}
        />
    );
};

export default CreateFollowing;
