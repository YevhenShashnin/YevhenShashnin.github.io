import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/fanat/button";
import { SelectComponent } from "@/components/ui/fanat/select-component";
import axiosInstance from "@/utils/axiosInstance";
import { apiRoutes } from "@/constants/apiRoutes";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";

interface SwitchFormProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    id: string | null;
    setShouldRefetch: (shouldRefetch: boolean) => void;
}

const SwitchForm = ({ open, setOpen, id, setShouldRefetch }: SwitchFormProps) => {
    const { t } = useTranslation();
    const [followingSettings, setFollowingSettings] = useState([]);
    useEffect(() => {
        getFollowingSettings();
    }, []);
    const getFollowingSettings = async () => {
        const values = await axiosInstance({
            method: apiRoutes.following.getAll.method,
            url: apiRoutes.following.getAll.url,
        });
        setFollowingSettings(values.data.data.map((setting: any) => ({
            label: setting.name,
            value: `${setting.id}`,
        })));
    };
    const formSchema = z.object({
        settings: z.string().nonempty(t("common.notEmpty")),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            settings: "",
        },
    });

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        try {
            axiosInstance({
                method: apiRoutes.accounts.switchToFollow.method,
                url: apiRoutes.accounts.switchToFollow.url(id),
                data: { followingSetting: form.getValues("settings") },
            });
            setTimeout(() => {
                setShouldRefetch(true);
            }, 1000);
            setTimeout(() => {
                setShouldRefetch(false);
            }, 2000);
            setOpen(false);
        } catch (err) {
            console.error("Switch failed", err);
        }
    };

    return (
        <Dialog open={open}>
            <DialogContent className="sm:max-w-[550px]" closeHandler={() => setOpen(false)}>
                <DialogHeader>
                    <DialogTitle className="mb-4">{t("common.settings")}</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="">
                        <div className="grid gap-4 mb-4">
                            <FormField
                                control={form.control}
                                name="settings"
                                render={({ field }) => (
                                    <FormControl>
                                        <FormItem>
                                            <FormLabel htmlFor="settings">
                                                {t("following.following")}
                                            </FormLabel>
                                            <SelectComponent field={field} fieldData={{
                                                id: "settings",
                                                placeholderKey: "following.following",
                                                options: followingSettings,
                                            }} />
                                            <FormMessage />
                                        </FormItem>
                                    </FormControl>
                                )}
                            />
                        </div>

                        <div className="flex gap-2 mt-4">
                            <Button variant="secondary" type="button" onClick={() => setOpen(false)}>
                                {t("common.cancel")}
                            </Button>
                            <Button type="submit">{t("common.save")}</Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default SwitchForm;