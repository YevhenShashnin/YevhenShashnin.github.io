import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";

interface State {
    authToken: string | null;
    refreshTime: number | null;
    roles: string[] | null;
    plans: string[] | null;
    freeTrial: boolean | null;
}

interface Actions {
    setAuthToken: (token: string | null) => void;
    setRefreshTime: (time: number | null) => void;
    setRoles: (roles: string[] | null) => void;
    setPlans: (plans: string[] | null) => void;
    setFreeTrial: (freeTrial: boolean | null) => void;
    logOut: () => void;
}

const initialState: State = {
    authToken: null,
    refreshTime: null,
    roles: null,
    plans: null,
    freeTrial: null,
};

export const useUserStore = create<State & Actions>()(
    persist(
        immer((set) => ({
            ...initialState,
            setAuthToken: (token) =>
                set(() => ({
                    authToken: token,
                })),
            setRefreshTime: (time) =>
                set(() => ({
                    refreshTime: time,
                })),
            setRoles: (roles) =>
                set(() => ({
                        roles,
                    }),
                ),
            setPlans: (plans) =>
                set(() => ({
                        plans,
                    }),
                ),
            setFreeTrial: (freeTrial) =>
                set(() => ({
                        freeTrial,
                    }),
                ),
            logOut: () =>
                set(() => ({
                        authToken: null,
                        refreshTime: null,
                        plans: null,
                        roles: null,
                    }),
                ),
        })),
        { name: "userStore" },
    ),
);
