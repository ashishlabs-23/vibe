"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useEffect } from "react";

export default function Hero({ onOpenForm }: { onOpenForm?: () => void }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 150 };
    const x = useSpring(useTransform(mouseX, [0, 2000], [20, -20]), springConfig);
    const y = useSpring(useTransform(mouseY, [0, 1000], [20, -20]), springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <section
            id="hero"
            style={{
                position: "relative",
                minHeight: "92vh",
                background: "#111",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-end",
                overflow: "hidden",
                padding: "0 6vw 80px",
            }}
        >
            {/* Big background text — Parallax effect */}
            <motion.div
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    x,
                    y,
                    translateX: "-50%",
                    translateY: "-50%",
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: "clamp(160px, 28vw, 380px)",
                    fontWeight: 900,
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.03)",
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                    whiteSpace: "nowrap",
                    userSelect: "none",
                    pointerEvents: "none",
                }}
            >
                VIBE
            </motion.div>

            {/* Red accent line */}
            <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    height: "4px",
                    width: "100%",
                    background: "#e5251a",
                    transformOrigin: "left",
                }}
            />

            {/* Content */}
            <div style={{ position: "relative", zIndex: 2, maxWidth: "900px" }}>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    style={{
                        fontFamily: "'Barlow', sans-serif",
                        fontSize: "12px",
                        fontWeight: 700,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "#e5251a",
                        marginBottom: "20px",
                    }}
                >
                    A new kind of community
                </motion.p>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.45 }}
                    style={{
                        fontFamily: "'Barlow Condensed', 'Helvetica Neue', sans-serif",
                        fontSize: "clamp(64px, 10vw, 140px)",
                        fontWeight: 900,
                        lineHeight: 0.9,
                        letterSpacing: "-0.02em",
                        textTransform: "uppercase",
                        color: "#fff",
                        marginBottom: "28px",
                    }}
                >
                    Where Ideas<br />
                    <span style={{ color: "#e5251a" }}>Ignite.</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.65 }}
                    style={{
                        fontSize: "17px",
                        fontWeight: 400,
                        color: "rgba(255,255,255,0.55)",
                        maxWidth: "480px",
                        lineHeight: 1.65,
                        marginBottom: "44px",
                    }}
                >
                    A living community built to spark bold thinking, share raw ideas, and rise together beyond the ordinary.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.8 }}
                    style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}
                >
                    <motion.button
                        onClick={onOpenForm}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                            background: "#fff",
                            color: "#111",
                            border: "none",
                            borderRadius: "40px",
                            padding: "15px 36px",
                            fontFamily: "'Barlow', sans-serif",
                            fontSize: "14px",
                            fontWeight: 700,
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            cursor: "pointer",
                            transition: "background 0.2s ease, color 0.2s ease",
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.background = "#e5251a";
                            e.currentTarget.style.color = "#fff";
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.background = "#fff";
                            e.currentTarget.style.color = "#111";
                        }}
                    >
                        Join the Movement
                    </motion.button>
                    <motion.a
                        href="#ideas"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                            background: "transparent",
                            color: "#fff",
                            border: "1.5px solid rgba(255,255,255,0.3)",
                            borderRadius: "40px",
                            padding: "14px 36px",
                            fontFamily: "'Barlow', sans-serif",
                            fontSize: "14px",
                            fontWeight: 700,
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            cursor: "pointer",
                            textDecoration: "none",
                            transition: "all 0.2s ease",
                            display: "inline-block",
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.borderColor = "#fff";
                            e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
                            e.currentTarget.style.background = "transparent";
                        }}
                    >
                        Explore Ideas →
                    </motion.a>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
                style={{
                    position: "absolute",
                    bottom: "36px",
                    right: "6vw",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "8px",
                }}
            >
                <span style={{
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.3)",
                }}>
                    Scroll
                </span>
                <div style={{
                    width: "1px",
                    height: "48px",
                    background: "linear-gradient(to bottom, #e5251a, transparent)",
                }} />
            </motion.div>
        </section>
    );
}