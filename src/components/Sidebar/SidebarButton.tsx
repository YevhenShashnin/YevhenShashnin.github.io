import { Button } from "@/components/ui/fanat/button";
import { cn } from "@/lib/utils";
import React from "react";
import { useTranslation } from "react-i18next";
import { ChevronLeft } from "lucide-react";

interface SidebarButtonProps {
    icon?: React.ReactNode;
    className?: string;
    active?: boolean;
    label: string;
    nested?: boolean;
    expanded?: boolean;
}


const SidebarButton = ({ icon: Icon, className, label, active, nested, expanded, ...props }: SidebarButtonProps) => {
    const { t } = useTranslation();
    return (
        <Button
            variant="ghost"
            className={cn(`gap-2 justify-start `, className)}
            {...props}
        >
            {Icon && Icon}
            {/*<span className={`${active ? "dark:text-white text-blue" : "dark:text-gray"}`}>{t(label)}</span>*/}
            <span
                // className={`${active ? "text-blue" : "dark:text-gray"}`}
                className={`dark:text-gray`}

            >{t(label)}</span>
            {nested && <ChevronLeft
                className={`ml-auto transition-transform ${expanded ? "rotate-[-90deg]" : ""}`}
            />}
        </Button>
    );
};

export default SidebarButton;