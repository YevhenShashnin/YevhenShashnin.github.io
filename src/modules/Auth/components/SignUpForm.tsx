import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/fanat/card";
import { Label } from "@/components/ui/fanat/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/fanat/button";
import { useTranslation } from "react-i18next";
import { debounce } from "@/utils/debounce";
import axiosInstance from "@/utils/axiosInstance";
import { apiRoutes } from "@/constants/apiRoutes";

interface FormData {
    email: string;
    password: string;
    confirmPassword: string;
}

interface FormErrors {
    email: string;
    password: string;
    confirmPassword: string;
}


const SignUpForm = ({handler}) => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState<FormData>({
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState<FormErrors>({
        email: "",
        password: "",
        confirmPassword: "",
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
            case "confirmPassword":
                setErrors(prevState => ({
                    ...prevState,
                    confirmPassword: value === formData.password ? "" : t("auth.passwordMismatch"),
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Perform final validation before making the API call
        if (errors.email || errors.password || errors.confirmPassword) {
            console.log("Validation Errors", errors);
            return;
        }

        try {
            const res = await axiosInstance({
                method: apiRoutes.auth.register.method,
                url: apiRoutes.auth.register.url,
                data: {
                    username: formData.email,
                    email: formData.email,
                    password: formData.password,
                },
            });
            handler();
        } catch (err) {
            console.error("Registration failed", err);
            setErrors(prevState => ({
                ...prevState,
                confirmPassword: t("auth.registrationFailed"),
            }));
        }
    };

    return (
        <Card className="w-[90%] sm:w-[450px]">
            <CardHeader>
                <CardTitle className="text-center">{t("auth.registration")}</CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent>
                    <div className="grid w-full items-center gap-4">
                        <Label className="ml-3" htmlFor="email">{t("auth.email")}</Label>
                        <Input
                            type="email"
                            id="email"
                            name="email"
                            placeholder={t("auth.email")}
                            value={formData.email}
                            onChange={inputHandler}
                            aria-invalid={!!errors.email}
                        />
                        {errors.email && <span className="text-red-500">{errors.email}</span>}
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
                        {errors.confirmPassword && <span className="text-red">{errors.confirmPassword}</span>}
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit" className="w-full">{t("auth.signUp")}</Button>
                </CardFooter>
            </form>
        </Card>
    );
};

export default SignUpForm;
