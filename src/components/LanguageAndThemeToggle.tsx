import React from "react";
import {ModeToggle} from "@/components/mode-toggle";
import {LanguageSelector} from "@/components/LanguageSelector";
import {clsx} from "clsx";
import {CircleUserRound} from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {Button} from "@/components/ui/fanat/button";
import {useTranslation} from "react-i18next";
import {AxiosResponse} from "axios";
import axiosInstance from "@/utils/axiosInstance";
import {apiRoutes} from "@/constants/apiRoutes";
import {useUserStore} from "@/store/userStore";

interface Props {
    className?: string;
    auth?: boolean;
    setShowSidebar?: () => void;
}

const LanguageAndThemeToggle = ({setShowSidebar, className, auth}: Props) => {
    const {t} = useTranslation();
    const {logOut} = useUserStore();
    const logoutHandler = () => {
        axiosInstance(apiRoutes.auth.logout).then((res: AxiosResponse) => {
            logOut();
        }).catch((err) => {
            console.error("Logout failed", err);
        });


    };
    return (
        <div className='flex justify-between mb-4'>
            <Button className="" onClick={setShowSidebar}>
                Menu
            </Button>
            <div className={clsx(" flex right-4 top-4 items-center gap-2", className && className)}>
                <ModeToggle/>
                <LanguageSelector/>
                {!auth && <Popover>
                    <PopoverTrigger asChild>
                        <CircleUserRound/>
                    </PopoverTrigger>
                    <PopoverContent className="w-30 mr-4 mt-2">
                        <Button variant="ghost" onClick={logoutHandler}>{t("common.logout")}</Button>
                    </PopoverContent>
                </Popover>}
            </div>
        </div>
    );
};

export default LanguageAndThemeToggle;