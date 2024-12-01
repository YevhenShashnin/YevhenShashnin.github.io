import React, { useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";
import SettingLine from "@/modules/Accounts/EditAccount/SettingLine/SettingLine";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
    CircleUser,
    Waypoints,
    Cog,
    Globe,
    BrainCog,
    CirclePower,
    Gauge,
    StickyNote,
    Pin,
    ListOrdered, Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/utils/axiosInstance";
import { useNavigate, useParams } from "react-router-dom";
import { apiRoutes, apiRoutesSuperAdmin } from "@/constants/apiRoutes";
import { Loader, MultipleSelect } from "@/components/ui";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SelectComponent } from "@/components/ui/select-component";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { SettingsOptionEnum } from "@/modules/Accounts/enums";
import EditModal from "@/modules/Accounts/EditAccount/EditModal";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useModalStore } from "@/store/modalStore";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const statuses = ["active", "paused", "suspended"];


const EditAccount = () => {
    const { t } = useTranslation();
    const [loading, setLoading] = React.useState(false);
    const [editedId, setEditedId] = React.useState(null);
    const navigate = useNavigate();
    const { userId, id } = useParams();
    const [showSettings, setShowSettings] = React.useState(null);
    const [content, setContent] = React.useState([]);
    const [contentGroups, setContentGroups] = React.useState([]);
    useEffect(() => {
        getContent();
        getContentGroups();
    }, []);

    const getContent = async () => {
        const values = await axiosInstance({
            method: userId ? apiRoutesSuperAdmin.content.getAll.method : apiRoutes.content.getAll.method,
            url: userId ? apiRoutesSuperAdmin.content.getAll.url(userId) : apiRoutes.content.getAll.url,
        });
        setContent(values.data.data.map((group: any) => ({
            label: group.text,
            value: `${group.id}`,
        })));
    };
    const getContentGroups = async () => {
        const values = await axiosInstance({
            method: userId ? apiRoutesSuperAdmin.contentGroup.getAll.method : apiRoutes.contentGroup.getAll.method,
            url: userId ? apiRoutesSuperAdmin.contentGroup.getAll.url(userId) : apiRoutes.contentGroup.getAll.url,
        });

        setContentGroups(values.data.data.map((group: any) => ({
            label: group.name,
            value: `${group.id}`,
        })));
    };
    useEffect(() => {
        if (id) {
            setLoading(true);
            axiosInstance.get(userId ? apiRoutesSuperAdmin.accounts.getById.url({
                userId,
                id,
            }) : apiRoutes.accounts.getById.url(id))
                .then((res) => {
                    let data = { ...res.data };
                    if (res.data.credentials && res.data.credentials.includes(":")) {
                        const [userName, credentials] = res.data.credentials.split(":");
                        data = { ...res.data, userName, credentials };
                    }
                    if (res.data.content) {
                        data.content = res.data.content.map((item) => ({ value: item.id, label: item.text }));
                    }
                    if (res.data.contentGroup) {
                        data.contentGroup = res.data.contentGroup.map((item) => ({ value: item.id, label: item.name }));
                    }
                    if (statuses.every(status => status !== res.data.status)) {
                        data.status = "paused";
                    }
                    form.reset(data);
                })
                .catch((err) => console.error("Error fetching data:", err))
                .finally(() => setLoading(false));
        }
    }, [id]);
    const formSchema = z.object({
        status: z.string().nonempty(t("common.notEmpty")),
        name: z.string().nonempty(t("common.notEmpty")),
        token: z.string().nonempty(t("common.notEmpty")),
        username: z.string().optional().nullable(),
        password: z.string().optional().nullable(),

        autojoinEnabled: z.boolean(),
        behaviour: z.object({
            id: z.number(),
            name: z.string(),
        }), // Mark as optional and nullable
        browser: z.object({
            id: z.union([z.string(), z.number()]),
            name: z.string(),
        }),
        contentGroup: z.array(z.object({
            value: z.union([z.string(), z.number()]),
        })).optional().nullable(),
        content: z.array(z.object({
            value: z.union([z.string(), z.number()]),
        })).optional().nullable(),
        followDailyLimit: z.union([z.string(), z.number()]).optional(),
        followEnabled: z.boolean().default(false),
        maxDailyFollows: z.union([z.string(), z.number()]).optional().nullable(),
        maxFollowLimit: z.union([z.string(), z.number()]).optional().nullable(),
        proxy: z.object({
            id: z.number(),
            ip: z.string(),
        }),
        autojoinSettings: z.object({
            id: z.number(),
            name: z.string(),
        }).optional().nullable(),
        pinnedSettings: z.object({
            id: z.number(),
            name: z.string(),
        }).optional().nullable(),
        skipChudai: z.boolean(),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            autojoinEnabled: false,
            behaviour: null,
            browser: null,
            content: [],
            contentGroup: [],
            followDailyLimit: 0,
            followEnabled: false,
            maxDailyFollows: 0,
            maxFollowLimit: 0,
            status: "",
            name: "",
            username: "",
            password: "",
            token: "",
            proxy: undefined,
            autojoinSettings: null,
            pinnedSettings: null,
            skipChudai: false,
        },
    });

    const onSubmit = async (formValues) => {
        formValues.followDailyLimit = parseInt(formValues.followDailyLimit, 10);
        formValues.maxDailyFollows = parseInt(formValues.maxDailyFollows, 10);
        formValues.maxFollowLimit = parseInt(formValues.maxFollowLimit, 10);
        formValues.proxy = formValues.proxy ? formValues.proxy.id : null;
        formValues.behaviour = formValues.behaviour ? formValues.behaviour.id : null;
        formValues.browser = formValues.browser ? formValues.browser.id : null;
        formValues.autojoinSettings = formValues.autojoinSettings ? formValues.autojoinSettings.id : null;
        formValues.pinnedSettings = formValues.pinnedSettings ? formValues.pinnedSettings.id : null;
        formValues.content = formValues.content.map((item) => item.value);
        formValues.contentGroup = formValues.contentGroup.map((item) => item.value);
        const apiUrl = id
            ? (userId ? apiRoutesSuperAdmin.accounts.updateById.url({
                userId,
                id,
            }) : apiRoutes.accounts.updateById.url(id))
            : (userId ? apiRoutesSuperAdmin.accounts.create.url(userId) : apiRoutes.accounts.create.url);
        const method = id ? "PUT" : "POST";

        try {
            await axiosInstance({
                method,
                url: apiUrl,
                data: formValues,
            });
            navigate(-1);
        } catch (error) {
            console.error("Form submission failed:", error);
        }
    };
    const { setDeleteModal, setDeleteModalAction, setDeleteModalText, setCancelModalAction } = useModalStore();

    const deleteHandler = async () => {
        setDeleteModal(true);
        setDeleteModalText(t("accounts.delete", { selected: 1 }));
        setDeleteModalAction(async () => {
            try {
                await axiosInstance({
                    method: "DELETE",
                    url: userId ? apiRoutesSuperAdmin.accounts.deleteById.url({
                        userId,
                        id,
                    }) : apiRoutes.accounts.deleteById.url(id),
                });
                setDeleteModal(false);
                navigate(-1);
            } catch (error) {
                console.error("Error deleting account:", error);
            }
        });
        setCancelModalAction(() => {
            setDeleteModal(false);
        });

    };

    if (loading) <Loader />;
    return (
        <div className="mt-[45px] mb-[20px]">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid gap-4 sm:grid-cols-2 mb-4">
                        <Card className="w-full">
                            <CardHeader>
                                <CardTitle className="flex"><CircleUser className="mr-2" /> {t("edit.account")}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>

                                <FormField
                                    control={form.control}
                                    name={"status"}
                                    render={({ field }) => (
                                        <FormItem className="mb-2">
                                            <FormLabel className="flex items-center gap-1">
                                                {t("edit.status")}
                                            </FormLabel>
                                            <FormControl>
                                                <SelectComponent
                                                    field={{
                                                        value: form.watch("status"),
                                                        onChange: (value) => form.setValue("status", value),  // Set the value in the form
                                                    }}
                                                    fieldData={{
                                                        id: "status",
                                                        placeholderKey: "edit.status",
                                                        options: statuses.map((status) => ({
                                                            label: status,
                                                            value: status,
                                                        })),
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />

                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field, fieldState }) => (
                                        <FormItem className="mb-2">
                                            <FormLabel className="ml-3 mb-2 flex items-center" htmlFor="name">
                                                {t("edit.name")}
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Info className="w-[16px] hidden sm:block ml-2" />
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p className="max-w-[300px] text-wrap">{t("edit.nameTooltip")}</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="mb-2"
                                                    type="text"
                                                    id="name"
                                                    placeholder={t("edit.name")}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />


                                <FormField
                                    control={form.control}
                                    name="token"
                                    render={({ field, fieldState }) => (
                                        <FormItem>
                                            <FormLabel className="ml-3 mb-2 flex items-center" htmlFor="token">
                                                {t("edit.token")}
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Info className="w-[16px] hidden sm:block ml-2" />
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p className="max-w-[300px] text-wrap">{t("edit.tokenTooltip")}</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="mb-2"
                                                    type="text"
                                                    id="token"
                                                    placeholder={t("edit.token")}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                            </CardContent>
                        </Card>
                        <Card className="w-full">
                            <CardHeader>
                                <CardTitle className="flex"><Cog className="mr-2" />{t("edit.accountSettings")}
                                </CardTitle>
                            </CardHeader>
                            <CardContent
                            >
                                <div className="mb-2">
                                    <Label className="ml-3" htmlFor="name">{t("edit.userName")}</Label>
                                    <Input
                                        className="mt-2"
                                        type="text"
                                        id="userName"
                                        name="userName"
                                        placeholder={t("edit.userName")}
                                        value={form.watch("username")}
                                        onChange={(e) => form.setValue("username", e.target.value)} // Update form value when user types
                                    />
                                </div>
                                <div className="">
                                    <Label className="ml-3" htmlFor="password">{t("edit.password")}</Label>
                                    <Input
                                        className="mt-2"
                                        type="text"
                                        id="password"
                                        name="password"
                                        placeholder={t("edit.password")}
                                        value={form.watch("password")} // Watch for the name value from the form
                                        onChange={(e) => form.setValue("password", e.target.value)} // Update form value when user types
                                    />
                                </div>

                            </CardContent>
                        </Card>
                        <Card className="">
                            <CardHeader>
                                <CardTitle className="flex"><Waypoints className="mr-2" />{t("edit.proxy.proxy")}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <SettingLine label={"edit.proxy.proxy"}
                                             labelTooltip={"edit.proxy.labelTooltip"}
                                             listTooltip={"edit.proxy.listTooltip"}
                                             addNewTooltip={"edit.proxy.addNewTooltip"}
                                             editTooltip={"edit.proxy.editTooltip"}
                                             deleteTooltip={"edit.proxy.deleteTooltip"}
                                             value={form.watch("proxy")?.ip}
                                             error={form.formState.errors?.proxy}
                                             onListClick={() => {
                                                 setShowSettings(SettingsOptionEnum.PROXY);
                                             }}
                                             onAddNewClick={() => setShowSettings(SettingsOptionEnum.ADD_PROXY)}
                                             onEditClick={() => {
                                                 setShowSettings(SettingsOptionEnum.EDIT_PROXY);
                                                 setEditedId(form.watch("proxy")?.id);
                                             }}
                                />
                            </CardContent>
                        </Card>
                        <Card className="">
                            <CardHeader>
                                <CardTitle className="flex items"><Globe className="mr-2" />{t("edit.browser.browser")}
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Info className="w-[16px] hidden sm:block ml-2" />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p className="max-w-[300px] text-wrap">{t("edit.browser.browserTooltip")}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <SettingLine label={"edit.browser.browser"}
                                             labelTooltip={"edit.browser.labelTooltip"}
                                             listTooltip={"edit.browser.listTooltip"}
                                             addNewTooltip={"edit.browser.addNewTooltip"}
                                             editTooltip={"edit.browser.editTooltip"}
                                             deleteTooltip={"edit.browser.deleteTooltip"}
                                             value={form.watch("browser")?.name}
                                             error={form.formState.errors?.browser}
                                             onListClick={() => setShowSettings(SettingsOptionEnum.BROWSER)}
                                             onAddNewClick={() => {
                                                 setShowSettings(SettingsOptionEnum.ADD_BROWSER);
                                             }}
                                             onEditClick={() => {
                                                 setShowSettings(SettingsOptionEnum.EDIT_BROWSER);
                                                 setEditedId(form.watch("browser")?.id);
                                             }}
                                />
                            </CardContent>
                        </Card>
                        <Card className="">
                            <CardHeader>
                                <CardTitle className="flex"><BrainCog className="mr-2 flex items-center" />{t("edit.behaviour.behaviour")}
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Info className="w-[16px] hidden sm:block ml-2" />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p className="max-w-[300px] text-wrap">{t("edit.behaviour.behaviourTooltip")}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <SettingLine label={"edit.behaviour.behaviour"}
                                             labelTooltip={"edit.behaviour.labelTooltip"}
                                             listTooltip={"edit.behaviour.listTooltip"}
                                             addNewTooltip={"edit.behaviour.addNewTooltip"}
                                             editTooltip={"edit.behaviour.editTooltip"}
                                             deleteTooltip={"edit.behaviour.deleteTooltip"}
                                             value={form.watch("behaviour")?.name}
                                             error={form.formState.errors?.behaviour}
                                             onListClick={() => setShowSettings(SettingsOptionEnum.BEHAVIOUR)}
                                             onAddNewClick={() => {
                                                 setShowSettings(SettingsOptionEnum.ADD_BEHAVIOUR);
                                             }}
                                             onEditClick={() => {
                                                 setShowSettings(SettingsOptionEnum.EDIT_BEHAVIOUR);
                                                 setEditedId(form.watch("behaviour")?.id);
                                             }}

                                />
                            </CardContent>
                        </Card>
                        <Card className="">
                            <CardHeader>
                                <CardTitle className="flex"><CirclePower
                                    className="mr-2" />{t("edit.autojoinSettings.autojoinSettings")}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <SettingLine label={"edit.autojoinSettings.autojoin"}
                                             labelTooltip={"edit.autojoinSettings.labelTooltip"}
                                             listTooltip={"edit.autojoinSettings.listTooltip"}
                                             addNewTooltip={"edit.autojoinSettings.addNewTooltip"}
                                             editTooltip={"edit.autojoinSettings.editTooltip"}
                                             deleteTooltip={"edit.autojoinSettings.deleteTooltip"}
                                             value={form.watch("autojoinSettings")?.name}
                                             onListClick={() => setShowSettings(SettingsOptionEnum.AUTOJOIN)}
                                             onAddNewClick={() => {
                                                 setShowSettings(SettingsOptionEnum.ADD_AUTOJOIN);
                                             }}
                                             onEditClick={() => {
                                                 setShowSettings(SettingsOptionEnum.EDIT_AUTOJOIN);
                                                 setEditedId(form.watch("autojoinSettings")?.id);
                                             }}
                                             onDeleteClick={() => {
                                             }}
                                />
                                <div className="flex items-center space-x-2 mt-4 ml-2">
                                    <Checkbox id="terms"
                                              checked={form.watch("autojoinEnabled")}
                                              onCheckedChange={(value) => form.setValue("autojoinEnabled", value)}
                                    />
                                    <TooltipProvider>
                                        <label
                                            htmlFor="terms"
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            {t("edit.autojoinSettings.enable")}
                                        </label>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Info className="w-[16px] hidden sm:block ml-2" />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>{t("edit.autojoinSettings.tooltip")}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="">
                            <CardHeader>
                                <CardTitle className="flex"><Pin
                                    className="mr-2" />{t("edit.pinned.pinned")}
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Info className="w-[16px] hidden sm:block ml-2" />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>{t("edit.pinned.pinnedTooltip")}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </CardTitle>

                            </CardHeader>
                            <CardContent>
                                <SettingLine label={"edit.pinned.pinned"}
                                             labelTooltip={"edit.pinned.labelTooltip"}
                                             listTooltip={"edit.pinned.listTooltip"}
                                             addNewTooltip={"edit.pinned.addNewTooltip"}
                                             editTooltip={"edit.pinned.editTooltip"}
                                             deleteTooltip={"edit.pinned.deleteTooltip"}
                                             value={form.watch("pinnedSettings")?.name}
                                             onListClick={() => setShowSettings(SettingsOptionEnum.PINNED)}
                                             onAddNewClick={() => {
                                                 setShowSettings(SettingsOptionEnum.ADD_PINNED);
                                             }}
                                             onEditClick={() => {
                                                 setShowSettings(SettingsOptionEnum.EDIT_PINNED);
                                                 setEditedId(form.watch("pinnedSettings")?.id);
                                             }}
                                             onDeleteClick={() => {
                                             }}
                                />

                            </CardContent>
                        </Card>


                        <Card className="">
                            <CardHeader>
                                <CardTitle className="flex"><Gauge className="mr-2" />{t("edit.followSettings.limits")}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="mb-2">
                                    <Label className="ml-3"
                                           htmlFor="limits12h">{t("edit.followSettings.followLimits12h")}
                                    </Label>
                                    <Input
                                        className="mt-2"
                                        type="text"
                                        id="limits12h"
                                        name="limits12h"
                                        placeholder={t("edit.followSettings.followLimits12h")}
                                        value={form.watch("followDailyLimit")} // Watch for the name value from the form
                                        onChange={(e) => form.setValue("followDailyLimit", e.target.value.replace(/\D/g, ""))}
                                    />
                                </div>
                                <div className="mb-2">
                                    <Label className="ml-3"
                                           htmlFor="maxLimits12h">{t("edit.followSettings.maxFollowLimits12h")}
                                    </Label>
                                    <Input
                                        className="mt-2"
                                        type="text"
                                        id="maxLimits12h"
                                        name="maxLimits12h"
                                        placeholder={t("edit.followSettings.maxFollowLimits12h")}
                                        value={form.watch("maxDailyFollows")}
                                        onChange={(e) => form.setValue("maxDailyFollows", e.target.value.replace(/\D/g, ""))}
                                    />
                                </div>
                                <div className="mb-2">
                                    <Label className="ml-3"
                                           htmlFor="followLimitsAll">{t("edit.followSettings.followLimitsAll")}
                                    </Label>
                                    <Input
                                        className="mt-2"
                                        type="text"
                                        id="followLimitsAll"
                                        name="followLimitsAll"
                                        placeholder={t("edit.followSettings.followLimitsAll")}
                                        value={form.watch("maxFollowLimit")}
                                        onChange={(e) => form.setValue("maxFollowLimit", e.target.value.replace(/\D/g, ""))}
                                    />
                                </div>
                                <div className="flex items-center space-x-2 mt-4 ml-2">
                                    <Checkbox id="follow"
                                              checked={form.watch("enableFollow")}
                                              onChange={(value) => form.setValue("enableFollow", value)}
                                    />
                                    <label
                                        htmlFor="follow"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        {t("edit.followSettings.enable")}
                                    </label>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="">
                            <CardHeader>
                                <CardTitle className="flex"><StickyNote className="mr-2" />{t("content.content")}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>

                                <div className="grid mb-4">
                                    <Label className="ml-3 mb-4 flex items-center" htmlFor="name">{t("content.contentGroup")}
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Info className="w-[16px] hidden sm:block ml-2" />
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>{t("content.contentGroupTooltip")}</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </Label>
                                    <MultipleSelect
                                        label={t("content.contentGroup")}
                                        key={contentGroups}
                                        options={contentGroups}
                                        value={form.watch("contentGroup")}
                                        onChange={(selected) => {
                                            form.setValue("contentGroup", selected);
                                        }}
                                    />
                                </div>
                                <div className="grid gap-4 mb-4">
                                    <Label className="ml-3 flex items-center" htmlFor="name">{t("content.content")}
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Info className="w-[16px] hidden sm:block ml-2" />
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>{t("content.contentTooltip")}</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </Label>
                                    <MultipleSelect
                                        key={content}
                                        options={content}
                                        value={form.watch("content")}
                                        onChange={(selected) => {
                                            form.setValue("content", selected);
                                        }}
                                    />
                                </div>
                                <div className="flex items-center space-x-2 mt-4 ml-2">
                                    <Checkbox id="chudai"
                                              checked={form.watch("skipChudai")}
                                              onCheckedChange={(value) => {
                                                  form.setValue("skipChudai", value);
                                              }}
                                    />
                                    <label
                                        htmlFor="follow"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        {t("edit.skipChudai")}
                                    </label>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="secondary" type="button" onClick={() => navigate(-1)}>
                            Cancel
                        </Button>
                        <Button type="submit"
                        >{id ? t("common.update") : t("common.create")}</Button>
                        {id && (
                            <Button variant="destructive" type="button" onClick={deleteHandler}>
                                Delete
                            </Button>
                        )}
                    </div>
                </form>
            </Form>

            <Dialog open={showSettings !== null && showSettings !== undefined}>
                <DialogContent className="sm:max-w-[98%] max-h-[98%] overflow-auto"
                               closeHandler={() => setShowSettings(null)}
                >
                    <EditModal value={showSettings}
                               edditedId={editedId}
                               selectProxy={(value) => {
                                   form.setValue("proxy", { id: value.id, ip: value.ip });
                                   setShowSettings(null);
                               }}
                               selectBrowser={(value) => {
                                   form.setValue("browser", { id: value.id, name: value.language });
                                   setShowSettings(null);
                               }}
                               selectBehavior={(value) => {

                                   form.setValue("behaviour", { id: value.id, name: value.name });
                                   setShowSettings(null);
                               }}
                               selectAutojoin={(value) => {
                                   form.setValue("autojoinSettings", { id: value.id, name: value.title });
                                   setShowSettings(null);
                               }}
                               selectPinned={(value) => {
                                   form.setValue("pinnedSettings", { id: value.id, name: value.name });
                                   setShowSettings(null);
                               }}
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default EditAccount;