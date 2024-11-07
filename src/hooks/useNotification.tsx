import Toast from "@/shared/ui/Toast.tsx";
import {useState} from "react";
import {GiftAnimationName} from "@/inerfaces/interfaces.ts";

const useNotification = ({ onClose }) => {
    const [notification, setNotification] = useState(null);

    const showNotification = (message: string, subMessage: string, buttonText?: string, giftName?: GiftAnimationName) => {
        setNotification({
            message,
            subMessage,
            buttonText,
            giftName,
        });
    };

    const NotificationComponent = () => {
        if (!notification) return null;

        return (
            <Toast
                message={notification.message}
                subMessage={notification.subMessage}
                buttonText={notification.buttonText}
                giftName={notification.giftName}
                onClose={onClose}
            />
        );
    };

    return { showNotification, NotificationComponent };
};

export default useNotification;