import { useEffect, useRef } from "react";

export function useInactivityTimer(timeout: number, onTimeout: () => void) {
    const timerId = useRef<number | null>(null);

    // Reset timer function
    const resetTimer = () => {
        if (timerId.current) clearTimeout(timerId.current);
        if (typeof onTimeout === "function") {
          timerId.current = window.setTimeout(onTimeout, timeout);
        }
    };

    useEffect(() => {
        // List of events that reset timer
        const events = ['mousemove', 'keydown', 'scroll', 'touchstart'];

        // Setup event listeners to reset timer on user activity
        events.forEach(event => window.addEventListener(event, resetTimer));

        // Start the timer initially
        resetTimer();

        // Cleanup on unmount
        return () => {
            if (timerId.current) clearTimeout(timerId.current);
            events.forEach(event => window.removeEventListener(event, resetTimer));
        };
    }, [timeout, onTimeout]);
}