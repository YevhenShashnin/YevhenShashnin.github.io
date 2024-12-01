import { LoaderCircle } from "lucide-react";

export const Loader = () => (
    <div className="flex items-center justify-center h-[500px] w-full">
        <LoaderCircle className="animate-spin h-10 w-10 mr-3" />
    </div>
);
