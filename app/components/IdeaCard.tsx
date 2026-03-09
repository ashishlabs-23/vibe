/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Idea {
    id: string;
    title: string;
    content: string;
    category: string;
    _count: { sparks: number };
    author: { name: string; image: string };
    sparkedByMe?: boolean;
}

export default function IdeaCard({ idea, onSpark }: { idea: Idea; onSpark: (id: string) => void }) {
    const [sparked, setSparked] = useState(idea.sparkedByMe || false);
    const [count, setCount] = useState(idea._count.sparks);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => { document.body.style.overflow = "auto"; };
    }, [isModalOpen]);

    const handleSpark = (e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        setSparked(!sparked);
        setCount(sparked ? count - 1 : count + 1);
        onSpark(idea.id);
    };

    return (
        <>
            <motion.div
                onClick={() => setIsModalOpen(true)}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                style={{
                    background: "#f5f5f5",
                    borderRadius: "12px",
                    padding: "28px",
                    display: "flex",
                    flexDirection: "column",
                    cursor: "pointer",
                    transition: "box-shadow 0.25s ease",
                    height: "100%",
                }}
                onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "0 16px 48px rgba(0,0,0,0.12)";
                }}
                onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                }}
            >
                {/* Category badge */}
                <span style={{
                    display: "inline-block",
                    background: "#111",
                    color: "#fff",
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    padding: "4px 12px",
                    borderRadius: "20px",
                    marginBottom: "16px",
                    width: "fit-content",
                }}>
                    {idea.category}
                </span>

                {/* Title */}
                <h3 style={{
                    fontFamily: "'Barlow Condensed', 'Helvetica Neue', sans-serif",
                    fontSize: "22px",
                    fontWeight: 800,
                    lineHeight: 1.15,
                    letterSpacing: "-0.01em",
                    textTransform: "uppercase",
                    color: "#111",
                    marginBottom: "12px",
                }}>
                    {idea.title}
                </h3>

                {/* Content */}
                <p style={{
                    fontSize: "14px",
                    lineHeight: 1.7,
                    color: "#757575",
                    marginBottom: "24px",
                    flex: 1,
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                }}>
                    {idea.content}
                </p>

                {/* Footer */}
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTop: "1px solid rgba(0,0,0,0.08)",
                    paddingTop: "16px",
                }}>
                    {/* Author */}
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        {idea.author.image ? (
                            <img
                                src={idea.author.image}
                                style={{ width: 28, height: 28, borderRadius: "50%" }}
                                alt={idea.author.name}
                            />
                        ) : (
                            <div style={{
                                width: 28, height: 28, borderRadius: "50%",
                                background: "#e5251a", color: "#fff",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                fontSize: "11px", fontWeight: 700,
                            }}>
                                {idea.author.name?.[0] || "?"}
                            </div>
                        )}
                        <span style={{ fontSize: "13px", fontWeight: 600, color: "#757575" }}>
                            {idea.author.name}
                        </span>
                    </div>

                    {/* Spark button */}
                    <button
                        onClick={handleSpark}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            background: sparked ? "#111" : "transparent",
                            color: sparked ? "#fff" : "#111",
                            border: "1.5px solid #111",
                            borderRadius: "20px",
                            padding: "6px 14px",
                            fontSize: "12px",
                            fontWeight: 700,
                            letterSpacing: "0.04em",
                            textTransform: "uppercase",
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                        }}
                        onMouseEnter={e => {
                            if (!sparked) {
                                e.currentTarget.style.background = "#111";
                                e.currentTarget.style.color = "#fff";
                            }
                        }}
                        onMouseLeave={e => {
                            if (!sparked) {
                                e.currentTarget.style.background = "transparent";
                                e.currentTarget.style.color = "#111";
                            }
                        }}
                    >
                        🔥 {count}
                    </button>
                </div>
            </motion.div>

            <AnimatePresence>
                {isModalOpen && (
                    <div
                        style={{
                            position: "fixed",
                            inset: 0,
                            zIndex: 9999,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: "rgba(0,0,0,0.6)",
                            padding: "16px",
                            backdropFilter: "blur(4px)",
                        }}
                        onClick={(e) => {
                            if (e.target === e.currentTarget) setIsModalOpen(false);
                        }}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.96, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.96, y: 20 }}
                            transition={{ duration: 0.25 }}
                            style={{
                                position: "relative",
                                width: "100%",
                                maxWidth: "600px",
                                maxHeight: "90vh",
                                overflowY: "auto",
                                background: "#fff",
                                borderRadius: "16px",
                                padding: "40px",
                                boxShadow: "0 32px 80px rgba(0,0,0,0.2)",
                            }}
                        >
                            <button
                                onClick={() => setIsModalOpen(false)}
                                style={{
                                    position: "absolute",
                                    top: "20px",
                                    right: "20px",
                                    background: "none",
                                    border: "none",
                                    fontSize: "20px",
                                    cursor: "pointer",
                                    color: "#757575",
                                    lineHeight: 1,
                                    padding: "4px 8px",
                                }}
                            >
                                ✕
                            </button>

                            <span style={{
                                display: "inline-block",
                                background: "#111",
                                color: "#fff",
                                fontSize: "11px",
                                fontWeight: 700,
                                letterSpacing: "0.1em",
                                textTransform: "uppercase",
                                padding: "6px 14px",
                                borderRadius: "20px",
                                marginBottom: "20px",
                            }}>
                                {idea.category}
                            </span>

                            <h2 style={{
                                fontFamily: "'Barlow Condensed', 'Helvetica Neue', sans-serif",
                                fontSize: "clamp(28px, 5vw, 42px)",
                                fontWeight: 900,
                                lineHeight: 1.1,
                                letterSpacing: "-0.01em",
                                textTransform: "uppercase",
                                color: "#111",
                                marginBottom: "24px",
                            }}>
                                {idea.title}
                            </h2>

                            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px", paddingBottom: "24px", borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
                                {idea.author.image ? (
                                    <img
                                        src={idea.author.image}
                                        style={{ width: 40, height: 40, borderRadius: "50%", border: "2px solid #eee" }}
                                        alt={idea.author.name}
                                    />
                                ) : (
                                    <div style={{
                                        width: 40, height: 40, borderRadius: "50%",
                                        background: "#e5251a", color: "#fff",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        fontSize: "16px", fontWeight: 700,
                                    }}>
                                        {idea.author.name?.[0] || "?"}
                                    </div>
                                )}
                                <div>
                                    <p style={{ fontSize: "15px", fontWeight: 700, color: "#111", margin: 0 }}>
                                        {idea.author.name}
                                    </p>
                                    <p style={{ fontSize: "13px", color: "#757575", margin: 0 }}>
                                        Author
                                    </p>
                                </div>
                            </div>

                            <div style={{
                                fontSize: "17px",
                                lineHeight: 1.8,
                                color: "#333",
                                marginBottom: "40px",
                                whiteSpace: "pre-wrap",
                            }}>
                                {idea.content}
                            </div>

                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#f9f9f9", padding: "20px", borderRadius: "12px" }}>
                                <span style={{ fontSize: "14px", fontWeight: 600, color: "#757575" }}>Do you believe in this idea?</span>
                                <button
                                    onClick={(e) => handleSpark()}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "8px",
                                        background: sparked ? "#111" : "#fff",
                                        color: sparked ? "#fff" : "#111",
                                        border: "2px solid #111",
                                        borderRadius: "40px",
                                        padding: "10px 24px",
                                        fontSize: "14px",
                                        fontWeight: 700,
                                        letterSpacing: "0.04em",
                                        textTransform: "uppercase",
                                        cursor: "pointer",
                                        transition: "all 0.2s ease",
                                    }}
                                >
                                    🔥 Spark ({count})
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}