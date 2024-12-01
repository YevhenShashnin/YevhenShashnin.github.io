import { Navigate, Outlet } from "react-router-dom";
import Layout from "@/layouts/Layout";
import { useUserStore } from "@/store/userStore";
import useTokenRefresh from "@/hooks/useTokenRefresh";
import { useEffect } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { apiRoutes } from "@/constants/apiRoutes";

const PrivateRoutes = () => {
    const { authToken, setPlans, setFreeTrial } = useUserStore();
    useTokenRefresh();

    useEffect(() => {
        if (authToken) {
            axiosInstance.get(apiRoutes.subscribtions.active.url)
                .then((res) => {
                    setPlans(res.data.data);
                    if (res?.data?.data?.length === 1 && res?.data?.active_subscriptions[0]?.plan === "FREE_TRIAL") {
                        setFreeTrial(true);
                    }
                })
                .catch((error) => {
                    console.error("Error fetching active subscription:", error);
                });
        }
    }, [authToken]);

    return (
        authToken ?
            (<Layout>
                <Outlet />
            </Layout>) :
            <Navigate to="/login" />
    );
};

export default PrivateRoutes;