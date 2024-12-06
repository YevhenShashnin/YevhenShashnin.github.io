import React, { useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/fanat/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import axiosInstance from "@/utils/axiosInstance";
import { apiRoutes } from "@/constants/apiRoutes";
import { MultipleSelect } from "@/components/ui";
import { Label } from "@/components/ui/fanat/label";
import { SelectComponent } from "@/components/ui/fanat/select-component";

interface SwitchFormProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    id: string | null;
    setShouldRefetch: (shouldRefetch: boolean) => void;
}

const SwitchForm = ({ open, setOpen, id, setShouldRefetch }: SwitchFormProps) => {
    const { t } = useTranslation();
    const [content, setContent] = React.useState([]);
    const [contentGroups, setContentGroups] = React.useState([]);
    const [behaviour, setBehaviour] = React.useState([]);
    useEffect(() => {
        getContent();
        getContentGroups();
        getBehaviour();
    }, []);
    const getContent = async () => {
        const values = await axiosInstance({
            method: apiRoutes.content.getAll.method,
            url: apiRoutes.content.getAll.url,
        });
        setContent(values.data.data.map((group: any) => ({
            label: group.text,
            value: `${group.id}`,
        })));
    };
    const getContentGroups = async () => {
        const values = await axiosInstance({
            method: apiRoutes.contentGroup.getAll.method,
            url: apiRoutes.contentGroup.getAll.url,
        });
        setContentGroups(values.data.data.map((group: any) => ({
            label: group.name,
            value: `${group.id}`,
        })));
    };
    const getBehaviour = async () => {
        const values = await axiosInstance({
            method: apiRoutes.behavior.getAll.method,
            url: apiRoutes.behavior.getAll.url,
        });
        setBehaviour(values.data.data.map((group: any) => ({
            label: group.name,
            value: `${group.id}`,
        })));
    };
    const formSchema = z.object({
        followEnabled: z.boolean(),
        autojoinEnabled: z.boolean(),
        followDailyLimit: z.number().nonnegative(t("common.notEmpty")),
        maxDailyFollows: z.number().nonnegative(t("common.notEmpty")),
        maxFollowLimit: z.number().nullable(),
        contentGroup: z.array(z.object({
            value: z.union([z.string(), z.number()]),  // Each object should have a string `id`
        })).optional().nullable(),
        content: z.array(z.object({
            value: z.union([z.string(), z.number()]),  // Each object should have a string `id`
        })).optional().nullable(),
        behaviour: z.string().nonempty(t("common.notEmpty")),
        skipChudai: z.boolean(),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            followEnabled: false,
            autojoinEnabled: false,
            followDailyLimit: 0,
            maxDailyFollows: 0,
            maxFollowLimit: null,
            contentGroup: null,
            content: 0,
            behaviour: null,
            skipChudai: false,
        },
    });

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        try {
            axiosInstance({
                method: apiRoutes.accountsFollowing.switchToRetweet.method,
                url: apiRoutes.accountsFollowing.switchToRetweet.url(id),
                data: form.getValues(),
            });
            setTimeout(() => {
                setShouldRefetch(true);
            }, 1000);
            setTimeout(() => {
                setShouldRefetch(false);
            }, 2000);
        } catch (err) {
            console.error("Switch failed", err);
        }
        setOpen(false);
    };

    return (
        <Dialog open={open}>
            <DialogContent className="sm:max-w-[550px]" closeHandler={() => setOpen(false)}>
                <DialogHeader>
                    <DialogTitle className="mb-4">{t("common.settings")}</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="">
                        <FormField
                            control={form.control}
                            name="followEnabled"
                            render={({ field }) => (
                                <FormItem className="mb-2 flex items-center">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={(value) => field.onChange(value)}
                                        />

                                    </FormControl>
                                    <FormLabel className="ml-2 pb-2">{t("edit.followSettings.enable")}</FormLabel>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="autojoinEnabled"
                            render={({ field }) => (
                                <FormItem className="mb-2 flex items-center">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={(value) => field.onChange(value)}
                                        />
                                    </FormControl>
                                    <FormLabel className="ml-2 pb-2">{t("edit.autojoinSettings.enable")}</FormLabel>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="skipChudai"
                            render={({ field }) => (
                                <FormItem className="mb-2 flex items-center">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={(value) => field.onChange(value)}
                                        />
                                    </FormControl>
                                    <FormLabel className="ml-2 pb-2">{t("edit.skipChudai")}</FormLabel>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="followDailyLimit"
                            render={({ field }) => (
                                <FormItem className="mb-2">
                                    <FormLabel>{t("edit.followSettings.followLimits12h")}</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            onChange={(e) => form.setValue("followDailyLimit", +e.target.value.replace(/\D/g, ""))}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="maxDailyFollows"
                            render={({ field }) => (
                                <FormItem className="mb-2">
                                    <FormLabel>{t("edit.followSettings.maxFollowLimits12h")}</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            onChange={(e) => form.setValue("maxDailyFollows", +e.target.value.replace(/\D/g, ""))}

                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="maxFollowLimit"
                            render={({ field }) => (
                                <FormItem className="mb-2">
                                    <FormLabel>{t("edit.followSettings.maxFollowLimits12h")}</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            onChange={(e) => form.setValue("maxFollowLimit", +e.target.value.replace(/\D/g, ""))}

                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid mb-4">
                            <FormField
                                control={form.control}
                                name="behaviour"
                                render={({ field }) => (
                                    <FormControl>
                                        <FormItem>
                                            <FormLabel htmlFor="behaviour">
                                                {t("behavior.behavior")}
                                            </FormLabel>
                                            <SelectComponent field={field} fieldData={{
                                                id: "behaviour",
                                                placeholderKey: "behavior.behavior",
                                                options: behaviour,
                                            }} />
                                            <FormMessage />
                                        </FormItem>
                                    </FormControl>
                                )}
                            />
                        </div>
                        <div className="grid mb-4">
                            <Label className="ml-3 mb-4" htmlFor="name">{t("content.contentGroup")}
                            </Label>
                            <MultipleSelect
                                label="Content Group"
                                key={contentGroups}
                                options={contentGroups}
                                value={form.watch("contentGroups")}
                                onChange={(selected) => {
                                    form.setValue("contentGroup", selected);
                                }}
                            />
                        </div>
                        <div className="grid gap-4 mb-4">
                            <Label className="ml-3 " htmlFor="name">{t("content.content")}</Label>
                            <MultipleSelect
                                key={content}
                                options={content}
                                value={form.watch("content")}
                                onChange={(selected) => {
                                    form.setValue("content", selected);
                                }}
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

