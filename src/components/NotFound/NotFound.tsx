import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

const NotFound = () => {
    const { t } = useTranslation();
    return (
        <div>
            <h1>{t("404.notFound")}</h1>
            <Link className='text-blue' to={ROUTES.HOME}>{t("404.back")}</Link>
        </div>
    );
};

export default NotFound;