import { useEffect } from "react";
import { useUserStore } from "@/store/userStore";
import axiosInstance from "@/utils/axiosInstance";
import { apiRoutes } from "@/constants/apiRoutes";

const useTokenRefresh = () => {
    const { setAuthToken, authToken, refreshTime, setRefreshTime, logOut } = useUserStore();

    useEffect(() => {
        let timeoutId: ReturnType<typeof setTimeout>;

        const refreshToken = async () => {
            try {
                const response = await axiosInstance.post(apiRoutes.auth.refreshToken.url as string);
                setAuthToken(response.data.token);
                setRefreshTime(new Date().getTime() + 1000 * 60 * 15);
            } catch (error) {
                console.error("Failed to refresh token:", error);
                logOut();
            }
        };

        const now = new Date().getTime();
        const timeToRefresh = refreshTime ? refreshTime - now : 0;
        if ((!refreshTime || timeToRefresh <= 0) && authToken) {
            refreshToken();
        } else if (authToken) {
            timeoutId = setTimeout(() => {
                refreshToken();
            }, timeToRefresh);
        }

        return () => clearTimeout(timeoutId);
    }, [authToken, refreshTime, setAuthToken, setRefreshTime]);
};

export default useTokenRefresh;
