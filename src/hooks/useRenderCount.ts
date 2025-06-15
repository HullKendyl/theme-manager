import { useRef } from "react";

export function useRenderCount(): number {
    const count = useRef(1);

    //increment count on each render
    count.current += 1;

    return count.current;
}