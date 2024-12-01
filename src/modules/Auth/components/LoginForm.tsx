import React, { useState, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { debounce } from "@/utils/debounce";
import axiosInstance from "@/utils/axiosInstance";
import { apiRoutes } from "@/constants/apiRoutes";
import { ROUTES } from "@/constants/routes";
import { useUserStore } from "@/store/userStore";
import { useNavigate } from "react-router-dom";
import { AxiosResponse } from "axios";
import { toast } from "sonner";
import i18next from "i18next";

interface FormData {
    email: string;
    password: string;
}

interface FormErrors {
    email: string;
    password: string;
}

interface AuthResponse {
    token: string;
}

interface LoginFormProps {
    forgetHandler: () => void;
    show: boolean;
}

const LoginForm: React.FC = ({ forgetHandler, show }: LoginFormProps) => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState<FormData>({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState<FormErrors>({
        email: "",
        password: "",
    });

    const validateEmail = (email: string): boolean => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const validatePassword = (password: string): boolean => {
        return password.length >= 6;
    };

    const debouncedValidation = debounce((name: string, value: string) => {
        switch (name) {
            case "email":
                setErrors(prevState => ({
                    ...prevState,
                    email: validateEmail(value) ? "" : t("auth.invalidEmail"),
                }));
                break;
            case "password":
                setErrors(prevState => ({
                    ...prevState,
                    password: validatePassword(value) ? "" : t("auth.invalidPassword"),
                }));
                break;
            default:
                break;
        }
    }, 500);

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
        debouncedValidation(name, value);
    };

    const { setAuthToken, setRefreshTime, setRoles, setPlans, setFreeTrial } = useUserStore();
    const navigate = useNavigate();

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Enter" && validateEmail(formData.email) && validatePassword(formData.password)) {
                handleSubmit(e as unknown as React.FormEvent);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [formData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res: AxiosResponse<AuthResponse> = await axiosInstance({
                method: apiRoutes.auth.login.method,
                url: apiRoutes.auth.login.url,
                data: {
                    email: formData.email,
                    password: formData.password,
                },
            });
            if (res.data.token) {
                setAuthToken(res.data.token);
                setRefreshTime(new Date().getTime() + 1000 * 60 * 15); // Set next refresh time for 15 minutes
                navigate(ROUTES.HOME);
            }
            if (res?.data?.user?.roles) {
                setRoles(res?.data?.user?.roles);
            }
            if (res?.data?.active_subscriptions) {
                setPlans(res?.data?.active_subscriptions);
                if (res?.data?.active_subscriptions?.length === 0) {
                    navigate(ROUTES.SUBSCRIPTION);
                } else if (res?.data?.active_subscriptions?.length === 1 && res?.data?.active_subscriptions[0]?.plan === "FREE_TRIAL") {
                    setFreeTrial(true);
                }
            }

        } catch (err) {
            console.log(err);
            if (err?.response?.data?.error?.message) {
                toast.error(i18next.t(err.response.data.error.message));
            }
            console.error("Login failed", err);
            setErrors(prevState => ({
                ...prevState,
                password: t("auth.loginFailed"),
            }));
        }
    };

    return (
        <Card className="w-[90%] sm:w-[450px]">
            <CardHeader>
                <CardTitle className="text-center">{t("auth.authorization")}</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className="grid w-full items-center gap-4">
                        <Label className="ml-3" htmlFor="email">{t("auth.email")}</Label>
                        <Input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={inputHandler}
                            placeholder={t("auth.email")}
                            aria-invalid={!!errors.email}
                        />
                        {errors.email && <span className="text-red-500 ml-3">{errors.email}</span>}
                        <Label className="ml-3" htmlFor="password">{t("auth.password")}</Label>
                        <Input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={inputHandler}
                            placeholder={t("auth.password")}
                            aria-invalid={!!errors.password}
                        />
                        {errors.password && <span className="text-red-500 ml-3">{errors.password}</span>}
                    </div>
                </form>
                {show && <p
                    className=" mt-2"
                >{t("auth.registrationSuccess")}</p>}

            </CardContent>
            <CardFooter className="flex flex-col gap-4 mb-4">
                <Button type="submit" className="w-full" onClick={handleSubmit}>{t("auth.login")}</Button>
                <Button type="button" className="w-full" onClick={forgetHandler}>{t("auth.forgotPassword")}</Button>
            </CardFooter>
        </Card>
    );
};

export default LoginForm;
