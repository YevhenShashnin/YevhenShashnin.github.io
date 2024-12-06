import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/fanat/button";
import { z } from "zod";
import { MultipleSelect } from "@/components/ui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import axiosInstance from "@/utils/axiosInstance";
import { apiRoutesSuperAdmin } from "@/constants/apiRoutes";
import { Checkbox } from "@/components/ui/checkbox";

interface SuperAdminCreateUserProps {
    open: boolean;
    close: () => void;
    createCallback: () => void;
    id?: string | null;
}

const SuperAdminCreateUser = ({
                                  open,
                                  close, createCallback, id,
                              }: SuperAdminCreateUserProps) => {
    const { t } = useTranslation();

    const formSchema = z.object({
        username: z.string().nonempty(t("common.notEmpty")),
        password: z.string().nonempty(t("common.notEmpty")),
        email: z.string().email(t("common.notEmpty")),
        roles: z.array(
            z.object({
                value: z.string(),
                label: z.string(),
            }),
        ).nonempty(t("common.notEmpty")),
        enabled: z.boolean(),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            enabled: false,
            username: "",
            password: "",
            email: "",
            roles: [],
        },
    });
    useEffect(() => {
        if (id) {
            const fetchUserData = async () => {
                try {
                    const response = await axiosInstance.get(apiRoutesSuperAdmin.users.getById.url(id));
                    const userData = response.data;
                    form.setValue("username", userData.username);
                    form.setValue("password", userData.password);
                    form.setValue("email", userData.email);
                    form.setValue("roles", userData.roles.map((role: string) => ({ value: role, label: role })));
                    form.setValue("enabled", userData.enabled);
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            };
            fetchUserData();
        }
    }, [id, form, open]);


    const closeHandler = () => {
        close();
        form.clearErrors();
        form.reset();

    };

    const handleFormSubmit = async (formValues: z.infer<typeof formSchema>) => {
        try {
            // Map roles to their values and set enabled to 0
            formValues.roles = formValues.roles.map((role) => role.value);
            formValues.enabled = formValues.enabled ? 1 : 0;
            // Send a POST request to create a new user
            let response;
            if (id) {
                response = await axiosInstance.put(apiRoutesSuperAdmin.users.updateById.url(id), formValues);
            } else {
                response = await axiosInstance.post(apiRoutesSuperAdmin.users.create.url, formValues);
            }

            // Check if the status is 200 or 201 (success statuses)
            if (response.status === 200 || response.status === 201) {
                // Call the callback to handle success
                createCallback();
            } else {
                console.error("Unexpected status code:", response.status);
            }
        } catch (error) {
            console.error("Error while creating user:", error);
            // Optionally, handle the error (e.g., show a notification or set an error state)
        }

    };
    return (
        <Dialog open={open}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{t("superAdmin.createUser")}</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleFormSubmit)} className="grid gap-4 py-4">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t("superAdmin.username")}</FormLabel>
                                    <FormControl>
                                        <Input placeholder={t("superAdmin.username")} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t("superAdmin.password")}</FormLabel>
                                    <FormControl>
                                        <Input placeholder={t("superAdmin.password")} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t("superAdmin.email")}</FormLabel>
                                    <FormControl>
                                        <Input placeholder={t("superAdmin.email")} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="roles"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t("superAdmin.roles")}</FormLabel>
                                    <FormControl>
                                        <MultipleSelect
                                            options={[
                                                { value: "ROLE_SUPER_ADMIN", label: t("superAdmin.ROLE_SUPER_ADMIN") },
                                                { value: "ROLE_ADMIN", label: t("superAdmin.ROLE_ADMIN") },
                                                { value: "ROLE_USER", label: t("superAdmin.ROLE_USER") },
                                            ]}
                                            value={field.value}
                                            onChange={(selected) => {
                                                field.onChange(selected);
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="enabled"
                            render={({ field }) => (
                                <FormItem className="mb-2 flex items-center">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={(value) => field.onChange(value)}
                                        />
                                    </FormControl>
                                    <FormLabel className="ml-2 pb-2">{t("superAdmin.enabled")}</FormLabel>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter className="gap-2">
                            <Button type="reset" variant="secondary"
                                    onClick={closeHandler}>{t("common.cancel")}</Button>
                            <Button type="submit">{t(id ? "common.update" : "common.create")}</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default SuperAdminCreateUser;
