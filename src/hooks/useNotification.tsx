import React, { useState, useCallback } from 'react';
import Toast from "@/shared/ui/Toast.tsx";

const useNotification = () => {
    const [notification, setNotification] = useState(null);

    const showNotification = useCallback((message = "You Bought a Gift", subMessage = "Now send it to your friend.") => {
        setNotification({ message, subMessage });
    }, []);

    const hideNotification = useCallback(() => {
        setNotification(null);
    }, []);

    const NotificationComponent = () =>
        notification && <Toast
            message={notification.message}
            subMessage={notification.subMessage}
            onClose={hideNotification}
        />;

    return {
        showNotification,
        hideNotification,
        NotificationComponent
    };
};

export default useNotification;