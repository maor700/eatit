import { useCallback, useState } from "react";

export const useToggle = (init?: boolean) => {
    const [isToggled, setIsToggle] = useState(init);
    const toggle = useCallback((force?: boolean) => {
        const finalStatus = force ?? !isToggled;
        setIsToggle(finalStatus);
    }, []);

    return { isToggled, toggle, setIsToggle };
}