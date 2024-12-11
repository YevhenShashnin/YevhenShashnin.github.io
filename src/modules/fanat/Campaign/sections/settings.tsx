import React from 'react';
import {Card} from "@/components/ui/fanat/card";
import {Label} from "@/components/ui/fanat/label";
import {MultipleSelect} from "@/components/ui";
import {DatePickerWithRange_} from "@/components/DatePickerWithRange_";
import {SelectComponent, Option} from "@/components/ui/fanat/select-component";
import {useTranslation} from "react-i18next";
import {DateRange} from "react-day-picker";
import {subDays} from "date-fns";
import { Switch } from "@/components/ui/switch"



const mockAccounts: Option[] = [
    {value: 'account1', label: 'Account 1', id: 'account1'},
    {value: 'account2', label: 'Account 2', id: 'account2'},
    {value: 'account3', label: 'Account 3', id: 'account3'},
    {value: 'account4', label: 'Account 4', id: 'account4'},
    {value: 'account5', label: 'Account 5', id: 'account5'},
];
export const Settings = () => {
    const [selectedAccount, setSelectedAccount] = React.useState<string>();
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: subDays(new Date(), 7),
        to: new Date(),
    });
    const {t} = useTranslation();
    return (
        <Card className="px-5 py-5 col-span-4 flex gap-2">
            <div className="flex flex-col gap-2 w-[50%]">
                <Label
                    htmlFor="campaign"
                >{t('common.creator')}</Label>
                <SelectComponent
                    field={{
                        onChange: (value) => setSelectedAccount(value),
                    }}
                    fieldData={{
                        id: "account",
                        placeholderKey: "account",
                        options: mockAccounts
                    }}
                />

            </div>
            <div className="flex flex-col gap-2">
                <Label>{t('common.timeRange')}</Label>
                <DatePickerWithRange_ date={date} setDate={setDate}/>
            </div>
            <div className="flex flex-col gap-4">
                <Label htmlFor="expired">{t('campaign.showExpired')}</Label>
                <Switch id="expired"/>
            </div>
        </Card>
    );
};

