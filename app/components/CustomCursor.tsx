"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
    const [isHovering, setIsHovering] = useState(false);
    const [isPointer, setIsPointer] = useState(false);
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    // Tighter physics to match "system speed" (nearly instant follow)
    const springConfig = { damping: 30, stiffness: 1000, mass: 0.1 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const touchCheck = window.matchMedia('(pointer: coarse)');
        setIsTouchDevice(touchCheck.matches);

        const moveMouse = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);

            const target = e.target as HTMLElement;
            const isClickable =
                target.closest('button') ||
                target.closest('a') ||
                target.closest('input') ||
                target.closest('select') ||
                target.closest('textarea') ||
                window.getComputedStyle(target).cursor === 'pointer';

            setIsPointer(!!isClickable);
        };

        window.addEventListener("mousemove", moveMouse);
        return () => window.removeEventListener("mousemove", moveMouse);
    }, [mouseX, mouseY]);

    if (isTouchDevice) return null;

    return (
        <motion.div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: isPointer ? 60 : 20,
                height: isPointer ? 60 : 20,
                borderRadius: "50%",
                backgroundColor: isPointer ? "rgba(229, 37, 26, 0.15)" : "rgba(229, 37, 26, 0.8)",
                border: isPointer ? "2px solid #e5251a" : "none",
                pointerEvents: "none",
                zIndex: 2147483647,
                x: cursorX,
                y: cursorY,
                translateX: "-50%",
                translateY: "-50%",
            }}
            transition={{ type: "spring", damping: 20, stiffness: 250, mass: 0.5 }}
            animate={{
                scale: isPointer ? 1.5 : 1,
            }}
        />
    );
}
