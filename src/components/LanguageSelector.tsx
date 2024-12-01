import * as React from "react";
import { useTranslation } from "react-i18next";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const languages = [
    {
        label: "Deutsch",
        value: "de",
    },
    {
        label: "Russian",
        value: "ru",
    },
    {
        label: "Spanish",
        value: "es",
    },
    {
        label: "Ukrainian",
        value: "uk",
    },
    {
        label: "English",
        value: "en",
    },
    {
        label: "French",
        value: "fr",
    },
];

export function LanguageSelector() {
    const { i18n } = useTranslation();
    const changeLanguageHandler = (lang: string) => {
        i18n.changeLanguage(lang);
    };
    return (
        <Select value={i18n.language} onValueChange={changeLanguageHandler}>
            <SelectTrigger className="w-[70px]">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {languages.map((lang) => (
                        <SelectItem value={lang.value} key={lang.value}
                        >
                            {lang.value}
                        </SelectItem>),
                    )}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
