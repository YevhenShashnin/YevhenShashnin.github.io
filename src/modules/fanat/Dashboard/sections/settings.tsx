import React from 'react';
import {Card} from "@/components/ui/fanat/card";
import {Label} from "@/components/ui/fanat/label";
import {MultipleSelect} from "@/components/ui";
import {DatePickerWithRange_} from "@/components/DatePickerWithRange_";
import {SelectComponent} from "@/components/ui/fanat/select-component";
import {useTranslation} from "react-i18next";
import {DateRange} from "react-day-picker";
import {subDays} from "date-fns";

type Option = {
    value: string;
    label: string;
};

const mockAccounts: Option[] = [
    {value: 'account1', label: 'Account 1'},
    {value: 'account2', label: 'Account 2'},
    {value: 'account3', label: 'Account 3'},
    {value: 'account4', label: 'Account 4'},
    {value: 'account5', label: 'Account 5'},
];

export const Settings = () => {
    const [selectedAccounts, setSelectedAccounts] = React.useState<Option[]>([]);
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: subDays(new Date(), 7),
        to: new Date(),
    });
    const {t} = useTranslation();
    return (
        <Card className="px-5 py-5 col-span-4 flex gap-2">
            <div className="flex flex-col gap-2 w-[50%]">
                <Label>{t('common.creator')}</Label>
                <MultipleSelect
                    options={mockAccounts}
                    value={selectedAccounts}
                    onChange={setSelectedAccounts}
                    placeholder={t('common.allCreators')}
                    notFound={t('common.notFound')}
                />
            </div>
            <div className="flex flex-col gap-2">
                <Label>{t('common.timeRange')}</Label>
                <DatePickerWithRange_ date={date} setDate={setDate}/>
            </div>
            <div className="flex flex-col gap-2">
                <Label>{t('dashboard.earningType')}</Label>
                <SelectComponent
                    field={{
                        onChange: (value) => console.log(value),
                    }}
                    fieldData={{
                        options: [
                            {id: 'net', value: 'net', label: 'Net'},
                            {id: 'gross', value: 'gross', label: 'Gross'},
                        ],
                    }}
                    defaultValue="net"
                />
            </div>
        </Card>
    );
};

