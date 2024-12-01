import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import LanguageAndThemeToggle from "@/components/LanguageAndThemeToggle";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import axiosInstance from "@/utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

const ResetPassword = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState({
        password: "",
        confirmPassword: "",
    });

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            if (formData.password !== formData.confirmPassword) {
                setErrors({
                    password: t("auth.passwordMismatch"),
                    confirmPassword: t("auth.passwordMismatch"),
                });
            } else {
                const query = new URLSearchParams(location.search);
                const token = query.get("token");

                axiosInstance.post(`/reset-password/${token}`, {
                    password: formData.password,
                }).then(() => {
                    navigate(ROUTES.AUTH.LOGIN);
                });
                setErrors({
                    password: "",
                    confirmPassword: "",
                });
            }
        }
    ;

    return (
        <div className="w-full h-screen flex justify-center items-center">
            <Card className="w-[90%] sm:w-[450px]">
                <CardHeader>
                    <CardTitle className="text-center">{t("auth.resetPassword")}</CardTitle>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent>
                        <div className="grid w-full items-center gap-4">
                            <Label className="ml-3" htmlFor="password">{t("auth.password")}</Label>
                            <Input
                                type="password"
                                id="password"
                                name="password"
                                placeholder={t("auth.password")}
                                value={formData.password}
                                onChange={inputHandler}
                                aria-invalid={!!errors.password}
                            />
                            {errors.password && <span className="text-red-500">{errors.password}</span>}
                            <Label className="ml-3" htmlFor="confirmPassword">{t("auth.confirmPass")}</Label>
                            <Input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                placeholder={t("auth.confirmPass")}
                                value={formData.confirmPassword}
                                onChange={inputHandler}
                                aria-invalid={!!errors.confirmPassword}
                            />
                            {errors.confirmPassword &&
                                <span className="text-red-500">{errors.confirmPassword}</span>}
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" className="w-full">{t("common.submit")}</Button>
                    </CardFooter>
                </form>
            </Card>
            <LanguageAndThemeToggle auth />
        </div>
    );
};

export default ResetPassword;