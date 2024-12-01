import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface State {
    content: string[];
    contentGroup: string[];
}

interface Actions {
    setContent: (content: any) => void;
    setContentGroup: (content: any) => void;
}

const initialState: State = {
    content: [],
    contentGroup: [],
};

export const useModalStore = create<State & Actions>()(
    immer((set) => ({
        ...initialState,
        setContent: (content) =>
            set(() => ({
                content,
            })),
        setContentGroup: (contentGroup) =>
            set(() => ({
                    contentGroup,
                }),
            ),
    })),
);
