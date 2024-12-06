import { Button } from "@/components/ui/fanat/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useModalStore } from "@/store/modalStore";
import { useTranslation } from "react-i18next";

function DeleteModal() {
    const { deleteModal, deleteModalText, cancelModalAction, deleteModalAction } = useModalStore();
    const { t } = useTranslation();
    return (
        <Dialog open={deleteModal}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{t("common.delete")}</DialogTitle>
                    <DialogDescription>
                        {deleteModalText}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="secondary" onClick={cancelModalAction}>{t("common.cancel")}</Button>
                    <Button variant="destructive" onClick={deleteModalAction}>{t("common.delete")}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default DeleteModal;
