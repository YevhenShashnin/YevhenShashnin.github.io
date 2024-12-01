import React from "react";
import { Navigate } from "react-router-dom";
import { useUserStore } from "@/store/userStore";

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRole: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRole }) => {
    const { roles } = useUserStore();
    if (!roles || !roles.includes(allowedRole)) {
        return <Navigate to="/" />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
