import React from "react";
import ReactDOM from "react-dom";

 function ConfirmModal({ open, onClose, children }) {
    if (!open) return null;

    return ReactDOM.createPortal(
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={onClose}>
            <div
                className="rounded-lg border p-4"
                onClick={(e) => e.stopPropagation()}
            >

                {children}
            </div>
        </div>,
        document.body
    );
}

export default ConfirmModal;
