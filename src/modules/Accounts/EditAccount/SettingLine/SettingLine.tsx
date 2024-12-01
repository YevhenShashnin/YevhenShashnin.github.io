import React from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { ListOrdered, CirclePlus, Pencil, OctagonX } from "lucide-react";

interface SettingLineProps {
    label: string;
    labelTooltip: string;
    listTooltip: string;
    addNewTooltip: string;
    editTooltip: string;
    deleteTooltip: string;
    value: string | null;
    onListClick: () => void;
    onAddNewClick: () => void;
    onEditClick: () => void;
    onDeleteClick: () => void;
}

const SettingLine = ({
                         label,
                         value,
                         onListClick,
                         onEditClick,
                         onDeleteClick,
                         onAddNewClick,
                         editTooltip,
                         labelTooltip,
                         listTooltip,
                         addNewTooltip,
                         deleteTooltip,
                         error,
                     }: SettingLineProps) => {
    const { t } = useTranslation();
    return (
        <TooltipProvider>
            <div className="flex gap-3 items-center flex-wrap">
                {value ? <p className="mb-[20px] text-blue min-w-full">{value}</p> :
                    <p className={`mb-[20px] min-w-full ${error ? "text-[#7f1d1d]" : ""}`}>{t(error ? "common.notEmpty" : "edit.noValue")}</p>}
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button className="" type="button" variant="outline" onClick={onListClick}><ListOrdered
                            className="mr-2 h-[20px]" />{t("edit.list")}
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{t(listTooltip)}</p>
                    </TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button className="" type="button" variant="outline" onClick={onAddNewClick}><CirclePlus
                            className="mr-2  h-[20px]" />{t("edit.addNew")}</Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{t(addNewTooltip)}</p>
                    </TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button className="" type="button" variant="outline" onClick={onEditClick}><Pencil
                            className="mr-2  h-[20px]" />{t("edit.edit")}</Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{t(editTooltip)}</p>
                    </TooltipContent>
                </Tooltip>
                {/*<Tooltip>*/}
                {/*    <TooltipTrigger asChild>*/}
                {/*        <Button className="" variant="outline" onClick={onDeleteClick}><OctagonX*/}
                {/*            className="mr-2  h-[20px]x" />{t("edit.delete")}</Button>*/}
                {/*    </TooltipTrigger>*/}
                {/*    <TooltipContent>*/}
                {/*        <p>{t(deleteTooltip)}</p>*/}
                {/*    </TooltipContent>*/}
                {/*</Tooltip>*/}
            </div>
        </TooltipProvider>
    );
};

export default SettingLine;