import { useState, useEffect } from "react";
import { AxiosRequestConfig, Method } from "axios";
import axiosInstance from "@/utils/axiosInstance";

interface FetchState<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
    pagination?: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}

interface Props {
    method: Method;
    url: string | ((id: string) => string);
    config?: AxiosRequestConfig;
}

const useFetch = <T, >({ method, url, config }: Props) => {
    const [state, setState] = useState<FetchState<T>>({
        data: [],
        loading: true,
        error: null,
    });
    const fetchData = async ({ page = 1, query = "", searchString = "" } = {}) => {
        try {
            const response = await axiosInstance.request<T>({
                url,
                method,
                ...config,
                params: {
                    ...(page !== 1 && { page }),
                    ...(query && { [query]: searchString })
                },
            });
            setState({
                // TODO check if Inna change this!
                data:  response.data.data ?? response.data.users, loading: false, error: null, pagination: {
                    total: response.data.total,
                    page: response.data.page,
                    limit: response.data.limit,
                    totalPages: response.data.total_pages,
                },
            });
        } catch (error) {
            console.log(error);
            setState({
                data: null,
                loading: false,
                error: "An error occurred",
            });
        }
    };
    useEffect(() => {
        fetchData();
    }, [url]);

    return { ...state, refetch: fetchData };
};

export default useFetch;
