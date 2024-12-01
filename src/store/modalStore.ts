import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface State {
    deleteModal: boolean;
    deleteModalAction: () => void;
    cancelModalAction: () => void;
    deleteModalText: string;
}

interface Actions {
    setDeleteModal: (value: boolean) => void;
    setDeleteModalAction: (action: () => void) => void;
    setCancelModalAction: (action: () => void) => void;
    setDeleteModalText: (text: string) => void;
}

const initialState: State = {
    deleteModal: false,
    deleteModalAction: () => {
    },
    cancelModalAction: () => {
    },
    deleteModalText: "",
};

export const useModalStore = create<State & Actions>()(
    immer((set) => ({
        ...initialState,
        setDeleteModal: (value) =>
            set((state) => {
                state.deleteModal = value;
            }),
        setDeleteModalAction: (action) =>
            set((state) => {
                state.deleteModalAction = action;
            }),
        setDeleteModalText: (text) =>
            set((state) => {
                state.deleteModalText = text;
            }),
        setCancelModalAction: (action) =>
            set((state) => {
                state.cancelModalAction = action;
            }),
    })),
);
