import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import LoginForm from "@/modules/Auth/components/LoginForm";
import SignUpForm from "@/modules/Auth/components/SignUpForm";
import { useTranslation } from "react-i18next";
import LanguageAndThemeToggle from "@/components/LanguageAndThemeToggle";
import { useUserStore } from "@/store/userStore";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import ForgetForm from "@/modules/Auth/components/ForgotForm";

enum AuthType {
    LOGIN,
    SIGNUP,
    FORGOT_PASSWORD,
}

const Auth: React.FC = () => {
    const [authType, setAuthType] = useState<AuthType>(AuthType.LOGIN);
    const [showRegistrationSuccess, setShowRegistrationSuccess] = useState(false);
    const { t } = useTranslation();
    const { authToken } = useUserStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (authToken) {
            navigate(ROUTES.HOME);
        }
    }, [authToken, navigate]);
    if (authToken) {
        return null;
    }
    const switchAuthType = () => {
        if (authType === AuthType.LOGIN) {
            setAuthType(AuthType.SIGNUP);
        } else {
            setAuthType(AuthType.LOGIN);
        }
    };
    return (
        <div className="w-full h-screen flex justify-center items-center">
            {authType === AuthType.LOGIN && (
                <LoginForm
                    forgetHandler={() => setAuthType(AuthType.FORGOT_PASSWORD)}
                    show={showRegistrationSuccess}
                />
            )}
            {
                authType === AuthType.SIGNUP && <SignUpForm
                    handler={() => {
                        setShowRegistrationSuccess(true);
                        setAuthType(AuthType.LOGIN);
                    }}
                />
            }
            {
                authType === AuthType.FORGOT_PASSWORD && <ForgetForm />
            }

            <Button
                onClick={switchAuthType}
                className="absolute top-4 right-36"
            >
                {authType === AuthType.SIGNUP ? t("auth.signUp") : t("auth.login")}
            </Button>
            <LanguageAndThemeToggle auth />
        </div>
    );
};

export default Auth;
