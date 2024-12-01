import React from "react";
import { Loader } from "@/components/ui";
import axiosInstance from "@/utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { useTranslation } from "react-i18next";

const ConfirmRegister = () => {
    const [loading, setLoading] = React.useState(true);
    const navigate = useNavigate();
    const { t } = useTranslation();
    React.useEffect(() => {
        const query = new URLSearchParams(location.search);
        const token = query.get("token");

        axiosInstance.post(`/confirm-registration/${token}`).then(() => {
            setLoading(false);
            setTimeout(() => {
                navigate(ROUTES.AUTH.LOGIN);
            }, 3000);
        });
    }, []);
    return (
        <div>
            {loading ? <Loader /> :
                <p className='text-white p-10'>{t('auth.confirm')}</p>
            }
        </div>
    );
};

export default ConfirmRegister;