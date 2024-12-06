import React, { ReactElement, forwardRef, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/fanat/button";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { clsx } from "clsx";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "@/utils/axiosInstance";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useModalStore } from "@/store/modalStore";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import EmojiPicker from "emoji-picker-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Theme } from "emoji-picker-react";
import { Loader, MultipleSelect } from "@/components/ui";
import { SelectComponent } from "@/components/ui/fanat/select-component";
import { BaseRoute } from "@/constants/apiRoutes";

export interface Field {
    id: string;
    name: string;
    labelKey: string;
    placeholderKey: string;
    type: "text" | "number" | "select" | "multi-select" | "gif" | "content"  | "port";
    validation?: "text" | "number" | "ip" ;
    icon: ReactElement;
    tooltip: string;
    options?: { label: string; value: string }[];
    order?: number;
}

interface CreateEditProps {
    fields: Field[];
    title: string;
    apiRoutes: {
        fetchById?: BaseRoute['url'];
        create: BaseRoute['url'];
        update: BaseRoute['url'];
        delete: BaseRoute['url'];
    };
    previousRoute: string;
    deleteText?: string;
    formSchema?: any;
    form: any;
    content?: boolean;
    id?: string;
    callBack?: (data: any) => void;
}


const CreateEdit: React.FC<CreateEditProps> = ({
                                                   fields,
                                                   title,
                                                   apiRoutes,
                                                   previousRoute,
                                                   deleteText,
                                                   form,
                                                   content,
                                                   id,
                                                   callBack,
                                               }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { userId } = useParams();
    const isMobile = useMediaQuery("(max-width: 640px)");
    const { setDeleteModal, setDeleteModalAction, setDeleteModalText, setCancelModalAction } = useModalStore();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (id && apiRoutes.fetchById) {
            setLoading(true);
            axiosInstance.get(apiRoutes.fetchById(userId ? { userId, id } : id))
                .then((res) => {
                    let data = { ...res.data };
                    if (res.data.credentials && res.data.credentials.includes(":")) {
                        const [userName, credentials] = res.data.credentials.split(":");
                        data = { ...res.data, userName, credentials };
                    }
                    if (res.data.groupOwner) {
                        data = {
                            ...res.data, groupOwnerId: `${res.data.groupOwner.id}`,
                        };
                    }
                    if (res.data.contentGroup) {
                        data = {
                            ...res.data, contentGroup: `${res.data.contentGroup.id}`,
                        }
                    }
                    if (res.data.rules) {
                        data = {
                            ...res.data, rules: res.data.rules.map((rule) => ({ value: rule, label: rule })),
                        };
                    }
                    console.log(data);
                    form.reset(data);
                })
                .catch((err) => console.error("Error fetching data:", err))
                .finally(() => setLoading(false));
        }
    }, [id, apiRoutes.fetchById]);

    const handleFormSubmit = async (formValues, createNew = false) => {
        const apiUrl = id
            ? apiRoutes.update(userId ? { userId, id } : id)
            : userId ? apiRoutes.create(userId) : apiRoutes.create;

        const resolvedApiUrl = typeof apiUrl === "function"
            ? apiUrl(userId ? { userId, id } : id)
            : apiUrl;


        if (typeof resolvedApiUrl !== "string") {
            console.error("Form submission failed: resolvedApiUrl is not a string:", resolvedApiUrl);
            return;
        }

        const method = id ? "PUT" : "POST";
        let values = { ...formValues };

        if (values.userName && values.credentials) {
            values.credentials = `${values.userName}:${values.credentials}`;
            delete values.userName;
        }

        if (values.rules) {
            values.rules = values.rules.map((rule) => rule.value);
        }


        // if (content) {
        //     values.id = id;
        // }

        try {
            let response = await axiosInstance({
                method,
                url: resolvedApiUrl,
                data: values,
            });
            if (callBack) {
                callBack(response.data);
            } else {
                createNew ? form.reset() : navigate(previousRoute);
            }
        } catch (error) {
            console.error("Form submission failed:", error);
        }
    };

    const handleDelete = async () => {
        setDeleteModal(true);
        setDeleteModalText(deleteText);

        setDeleteModalAction(async () => {
            try {
                await axiosInstance({
                    method: "DELETE",
                    url: apiRoutes.delete(userId ? { userId, id } : id),
                });
                navigate(previousRoute);
            } catch (err) {
                console.error("Delete failed", err);
            }
            setDeleteModal(false);
        });
        setCancelModalAction(() => {
            setDeleteModal(false);
        });
    };
    let textareaElement: HTMLTextAreaElement | null = null;


    const onEmojiClick = (emojiObject, field) => {
        const emoji = emojiObject.emoji;
        const textarea = textareaElement;

        if (!textarea) return;

        const startPos = textarea.selectionStart;
        const endPos = textarea.selectionEnd;

        // Insert the emoji at the caret position
        textarea.setRangeText(emoji, startPos, endPos, "end");

        // Update the form value
        field.onChange(textarea.value);
    };
    const setRefs = (element, field) => {
        textareaElement = element; // Store the DOM element locally
        field.ref(element);        // Pass the element to the form library
    };
    // Helper function to render different field types
    const renderField = (fieldData, field) => {
        switch (fieldData.type) {
            case "select":
                if (!fieldData.options) return null;
                return (
                    <SelectComponent field={field} fieldData={fieldData} />
                );
            case "gif":
                return (
                    <div className="mt-2">
                        <Input
                            className={clsx("mt-2")}
                            placeholder={t(fieldData.placeholderKey)}
                            {...field}
                            onChange={(event) =>
                                fieldData.validation === "number"
                                    ? field.onChange(+event.target.value.replace(/[^0-9]/g, ""))
                                    : field.onChange(event.target.value)
                            }
                        />
                        <img className="mt-4 w-[50%] " src={field.value} />
                    </div>
                );
            case "content":
                return (
                    <div className="mt-2 relative flex-grow">
                        <Textarea
                            {...field}
                            ref={(element) => setRefs(element, field)}
                            className={clsx("mt-2 resize-none min-h-[200px] h-[calc(100%-2rem)]")}
                            placeholder={t(fieldData.placeholderKey)}
                            onChange={(event) => {
                                const value = event.target.value;
                                fieldData.validation === "number"
                                    ? field.onChange(+value.replace(/[^0-9]/g, ""))
                                    : field.onChange(value);
                            }}
                        />
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="absolute bottom-4 right-2"
                                >
                                    😊
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent side="bottom" align="end" className="w-[380px]">
                                <EmojiPicker
                                    theme={Theme.DARK}
                                    onEmojiClick={(emoji) =>
                                        onEmojiClick(emoji, field)
                                    }
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                );
            case "multi-select":
                return (
                    <MultipleSelect
                        options={fieldData.options}
                        placeholder={t(fieldData.placeholderKey)}
                        {...field}
                        value={field.value}
                    />
                );
            default:
                return (
                    <Input
                        className={clsx("mt-2")}
                        placeholder={t(fieldData.placeholderKey)}
                        {...field}
                        onChange={(event) =>
                            fieldData.validation === "number"
                                ? field.onChange(+event.target.value.replace(/[^0-9]/g, ""))
                                : field.onChange(event.target.value)
                        }
                    />
                );
        }
    };

    if (loading) return <Loader />;
    return (
        <div>
            <h1 className="mb-4 mt-2 text-lg text-blue">{title}</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit((formValues) => handleFormSubmit(formValues))} className="space-y-8">
                    <div className="sm:grid-cols-2 grid gap-4 mb-4">
                        {fields.map((fieldData) => (
                            <FormField key={fieldData.id} control={form.control} name={fieldData.name}
                                       render={({ field }) => (
                                           <FormItem
                                               className={clsx(isMobile && field.order && `order-${field.order}`)}>
                                               <FormLabel className="flex items-center gap-1">
                                                   {React.cloneElement(fieldData.icon, { className: "w-[20px]" })}
                                                   {t(fieldData.labelKey)}
                                                   <TooltipProvider>
                                                       <Tooltip>
                                                           <TooltipTrigger asChild>
                                                               <Info className="w-[16px] hidden sm:block ml-2" />
                                                           </TooltipTrigger>
                                                           <TooltipContent>
                                                               <p className="max-w-[300px] text-wrap">{t(fieldData.tooltip)}</p>
                                                           </TooltipContent>
                                                       </Tooltip>
                                                   </TooltipProvider>
                                               </FormLabel>
                                               <FormControl>{renderField(fieldData, field)}</FormControl>
                                               <FormMessage />
                                           </FormItem>
                                       )} />
                        ))}
                    </div>
                    <div className="flex gap-2">
                        {!callBack && <Button variant="secondary" type="button" onClick={() => navigate(-1)}>
                            Cancel
                        </Button>}
                        <Button type="submit"
                        >{id ? t("common.update") : t("common.create")}</Button>
                        {!id && content &&
                            <Button
                                type={"button"}
                                onClick={() => {
                                    form.handleSubmit((formValues) => handleFormSubmit(formValues, true))();
                                }}
                            >{t("common.createAndCreateNew")}</Button>}
                        {id && (
                            <Button variant="destructive" type="button" onClick={handleDelete}>
                                Delete
                            </Button>
                        )}
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default CreateEdit;
