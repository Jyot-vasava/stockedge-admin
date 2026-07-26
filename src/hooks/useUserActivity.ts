import { useEffect } from "react";

export const useUserActivity = (isEnabled: boolean) => {
    useEffect(() => {
        if (!isEnabled) return;

        const resetActivity = () => {
            // placeholder for future activity handling
        };

        window.addEventListener("mousemove", resetActivity);
        window.addEventListener("keydown", resetActivity);

        return () => {
            window.removeEventListener("mousemove", resetActivity);
            window.removeEventListener("keydown", resetActivity);
        };
    }, [isEnabled]);
};
