import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import React, { forwardRef } from "react";

interface MultipleSelectProps {
    options: Option[];
    placeholder: string;
    notFound: string;
    value: Option[];
    onChange?: (value: Option[]) => void;
}

export const MultipleSelect = forwardRef<HTMLDivElement, MultipleSelectProps>(
    ({ onChange, options, placeholder, notFound, value, ...props }, ref) => {
        return (
            <MultipleSelector
                defaultOptions={options}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                emptyIndicator={
                    <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                        {notFound}
                    </p>
                }
                {...props}
            />
        );
    },
);

MultipleSelect.displayName = "MultipleSelect"; // Necessary when using forwardRef
