import { ModalProps } from "@/types/props";
import { useEffect, useRef } from "react";

export default function ({ isOpen, children }: ModalProps) {
    const ref = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (!isOpen) {
            return
        }
        if (ref.current) {
            const dialog = ref.current
            dialog.showModal()
            return () => {
                dialog.close()
            }
        }
    }, [isOpen]);

    return <dialog ref={ref}>{children}</dialog>
}