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
import {
    CircleUser,
    Waypoints,
    Cog,
    Globe,
    Pin,
    BookPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/utils/axiosInstance";
import { useNavigate, useParams } from "react-router-dom";
import { apiRoutes, apiRoutesSuperAdmin } from "@/constants/apiRoutes";
import { Loader } from "@/components/ui";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SelectComponent } from "@/components/ui/select-component";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { SettingsOptionEnum } from "@/modules/Accounts/enums";
import EditModal from "@/modules/Accounts/EditAccount/EditModal";
import { useModalStore } from "@/store/modalStore";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const statuses = ["active", "paused", "suspended"];

interface EditAccountProps {
    superAdmin?: boolean;
}

const EditAccount = ({ superAdmin }: EditAccountProps) => {
    const { t } = useTranslation();
    const [loading, setLoading] = React.useState(false);
    const [editedId, setEditedId] = React.useState(null);
    const navigate = useNavigate();
    const { userId, id } = useParams();
    const [showSettings, setShowSettings] = React.useState(null);

    useEffect(() => {
        if (id) {
            setLoading(true);
            axiosInstance.get(superAdmin ? apiRoutesSuperAdmin.accountsFollowing.getById.url({
                userId,
                id,
            }) : apiRoutes.accountsFollowing.getById.url(id))
                .then((res) => {
                    let data = { ...res.data };
                    if (res.data.credentials && res.data.credentials.includes(":")) {
                        const [userName, credentials] = res.data.credentials.split(":");
                        data = { ...res.data, userName, credentials };
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

        proxy: z.object({
            id: z.number(),
            ip: z.string(),
        }),
        browser: z.object({
            id: z.union([z.string(), z.number()]),
            name: z.string(),
        }),
        followingSetting: z.object({
            id: z.union([z.string(), z.number()]),
            name: z.string(),
        }),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            status: "",
            name: "",
            token: "",
            username: "",
            password: "",
            proxy: null,
            browser: null,
            followingSetting: null,
        },
    });
    const onSubmit = async (formValues) => {

        formValues.proxy = formValues.proxy ? formValues.proxy.id : null;
        formValues.browser = formValues.browser ? formValues.browser.id : null;
        formValues.followingSetting = formValues.followingSetting ? formValues.followingSetting.id : null;
        const apiUrl = id
            ? (superAdmin && userId ? apiRoutesSuperAdmin.accountsFollowing.updateById.url({
                userId,
                id,
            }) : apiRoutes.accounts.updateById.url(id))
            : (superAdmin && userId ? apiRoutesSuperAdmin.accountsFollowing.create.url(userId) : apiRoutes.accountsFollowing.create.url);
        const method = id ? "PUT" : "POST";

        try {
            await axiosInstance({
                method,
                url: apiUrl,
                data: formValues,
            });
            navigate(-1); // Go back to the previous page after successful submission
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
                    url: superAdmin ? apiRoutesSuperAdmin.accountsFollowing.deleteById.url({
                        userId,
                        id,
                    }) : apiRoutes.accountsFollowing.deleteById.url(id),
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
                                            <FormLabel className="ml-3 mb-2" htmlFor="name">
                                                {t("edit.name")}
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
                                            <FormLabel className="ml-3 mb-2" htmlFor="token">
                                                {t("edit.token")}
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
                                <div>
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
                                    // onDeleteClick={async () => {
                                    //     try {
                                    //         await axiosInstance({
                                    //             method: "DELETE",
                                    //             url:  apiRoutes.deleteProxyById.url(form.watch("proxy").id)
                                    //         });
                                    //         form.setValue("proxy", {});
                                    //     } catch (err) {
                                    //         console.error("Delete failed", err);
                                    //     }
                                    //
                                    // }}
                                />
                            </CardContent>
                        </Card>
                        <Card className="">
                            <CardHeader>
                                <CardTitle className="flex"><Globe className="mr-2" />{t("edit.browser.browser")}
                                </CardTitle>
                                {/*<CardDescription>Deploy your new project in one-click.</CardDescription>*/}
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
                                    // onDeleteClick={() => {
                                    // }}
                                />
                            </CardContent>
                        </Card>


                        <Card className="">
                            <CardHeader>
                                <CardTitle className="flex"><BookPlus
                                    className="mr-2" />{t("edit.followingSettings")}
                                </CardTitle>
                                {/*<CardDescription>Deploy your new project in one-click.</CardDescription>*/}
                            </CardHeader>
                            <CardContent>
                                <SettingLine label={"edit.followingSettings"}
                                             labelTooltip={"edit.followingSettings"}
                                             listTooltip={"edit.followingSettings"}
                                             addNewTooltip={"edit.followingSettings"}
                                             editTooltip={"edit.followingSettings"}
                                             deleteTooltip={"edit.followingSettings"}
                                             value={form.watch("followingSetting")?.name}
                                             error={form.formState.errors?.followingSetting}
                                             onListClick={() => setShowSettings(SettingsOptionEnum.FOLLOWING)}
                                             onAddNewClick={() => {
                                                 setShowSettings(SettingsOptionEnum.ADD_FOLLOWING);
                                             }}
                                             onEditClick={() => {
                                                 setShowSettings(SettingsOptionEnum.EDIT_FOLLOWING);
                                                 setEditedId(form.watch("followingSetting")?.id);
                                             }}
                                             onDeleteClick={() => {
                                             }}
                                />

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
                               selectFollowing={(value) => {
                                   form.setValue("followingSetting", { id: value.id, name: value.name });
                                   setShowSettings(null);
                               }}
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default EditAccount;