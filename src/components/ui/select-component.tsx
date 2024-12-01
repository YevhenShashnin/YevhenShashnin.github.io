import React, {forwardRef} from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {clsx} from "clsx";
import {useTranslation} from "react-i18next";

interface Option {
    id: string;
    value: string;
    label: string;
}

interface SelectComponentProps {
    field: {
        onChange: (value: string) => void;
    };
    fieldData: {
        id: string;
        placeholderKey: string;
        options: Option[];
    };
    defaultValue?: string;
}

const SelectComponent = forwardRef<HTMLSelectElement, SelectComponentProps>(({field, fieldData, defaultValue}, ref) => {
    const {t} = useTranslation();
    return (
        <Select {...field} ref={ref} onValueChange={field?.onChange} defaultValue={defaultValue}>
            <SelectTrigger className={clsx("mt-2 ")}>
                <SelectValue id={fieldData?.id} placeholder={t(fieldData?.placeholderKey)}/>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {fieldData?.options?.map((option) => (
                        <SelectItem key={`${option.id}-${option.value}`} value={option.value}>
                            <SelectLabel>{option.label}</SelectLabel>
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
});

export {SelectComponent};