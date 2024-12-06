import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/fanat/card";
import { Label } from "@/components/ui/fanat/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/fanat/button";
import { useTranslation } from "react-i18next";
import { debounce } from "@/utils/debounce";
import axiosInstance from "@/utils/axiosInstance";
import { apiRoutes } from "@/constants/apiRoutes";
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

const ForgetForm: React.FC = () => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState<FormData>({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState<FormErrors>({
        email: "",
        password: "",
    });
    const [emailSent, setEmailSent] = useState(false);

    const validateEmail = (email: string): boolean => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const debouncedValidation = debounce((name: string, value: string) => {
        switch (name) {
            case "email":
                setErrors(prevState => ({
                    ...prevState,
                    email: validateEmail(value) ? "" : t("auth.invalidEmail"),
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
        try {
            const res: AxiosResponse<AuthResponse> = await axiosInstance({

                method: apiRoutes.auth.forget.method,
                url: apiRoutes.auth.forget.url,
                data: {
                    email: formData.email,
                },
            });
            if (res.status === 200) {
                setEmailSent(true);
                toast.success(t("auth.emailSent"));
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
                <CardTitle className="text-center">{t("auth.forget")}</CardTitle>
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
                        {emailSent && <span className="text-green-500 ml-3">{t("auth.emailSentMessage")}</span>}
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex flex-col gap-4 mb-4">
                <Button type="submit" className="w-full" onClick={handleSubmit}>{t("common.submit")}</Button>
            </CardFooter>
        </Card>
    );
};

export default ForgetForm;