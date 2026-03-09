"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function IdeaForm({
    isOpen,
    onClose,
    onSubmit
}: {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (idea: { title: string; content: string; category: string }) => void;
}) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("⚡ Tech");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !content) return;
        onSubmit({ title, content, category });
        setTitle("");
        setContent("");
        onClose();
    };

    const inputStyle = {
        width: "100%",
        background: "#f5f5f5",
        border: "1.5px solid transparent",
        borderRadius: "8px",
        padding: "14px 16px",
        fontFamily: "'Barlow', sans-serif",
        fontSize: "15px",
        color: "#111",
        outline: "none",
        transition: "border-color 0.2s ease, background 0.2s ease",
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div
                    style={{
                        position: "fixed",
                        inset: 0,
                        zIndex: 1000,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "rgba(0,0,0,0.6)",
                        padding: "16px",
                        backdropFilter: "blur(4px)",
                    }}
                    onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: 20 }}
                        transition={{ duration: 0.25 }}
                        style={{
                            position: "relative",
                            width: "100%",
                            maxWidth: "500px",
                            background: "#fff",
                            borderRadius: "16px",
                            padding: "40px",
                            boxShadow: "0 32px 80px rgba(0,0,0,0.2)",
                        }}
                    >
                        {/* Close */}
                        <button
                            onClick={onClose}
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

                        {/* Header */}
                        <p style={{
                            fontFamily: "'Barlow', sans-serif",
                            fontSize: "11px",
                            fontWeight: 700,
                            letterSpacing: "0.16em",
                            textTransform: "uppercase",
                            color: "#e5251a",
                            marginBottom: "8px",
                        }}>
                            Share Your Idea
                        </p>
                        <h2 style={{
                            fontFamily: "'Barlow Condensed', sans-serif",
                            fontSize: "32px",
                            fontWeight: 900,
                            letterSpacing: "-0.01em",
                            textTransform: "uppercase",
                            color: "#111",
                            marginBottom: "28px",
                        }}>
                            Ignite a New Idea
                        </h2>

                        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                            <input
                                type="text"
                                placeholder="Title (e.g. Offline-first collaboration tools)"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                style={inputStyle}
                                onFocus={e => {
                                    e.target.style.borderColor = "#111";
                                    e.target.style.background = "#fff";
                                }}
                                onBlur={e => {
                                    e.target.style.borderColor = "transparent";
                                    e.target.style.background = "#f5f5f5";
                                }}
                                maxLength={60}
                                required
                            />
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                style={{ ...inputStyle, cursor: "pointer" }}
                                onFocus={e => {
                                    e.target.style.borderColor = "#111";
                                    e.target.style.background = "#fff";
                                }}
                                onBlur={e => {
                                    e.target.style.borderColor = "transparent";
                                    e.target.style.background = "#f5f5f5";
                                }}
                            >
                                <option value="🚀 Startup">🚀 Startup</option>
                                <option value="🌱 Social Impact">🌱 Social Impact</option>
                                <option value="⚡ Tech">⚡ Tech</option>
                                <option value="🎨 Creative">🎨 Creative</option>
                                <option value="🌍 Environment">🌍 Environment</option>
                                <option value="💼 Business">💼 Business</option>
                                <option value="🧠 Wellness">🧠 Wellness</option>
                                <option value="🤝 Community">🤝 Community</option>
                            </select>
                            <textarea
                                placeholder="What's the raw concept?"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                style={{
                                    ...inputStyle,
                                    minHeight: "120px",
                                    resize: "none",
                                    lineHeight: 1.6,
                                }}
                                onFocus={e => {
                                    e.target.style.borderColor = "#111";
                                    e.target.style.background = "#fff";
                                }}
                                onBlur={e => {
                                    e.target.style.borderColor = "transparent";
                                    e.target.style.background = "#f5f5f5";
                                }}
                                maxLength={300}
                                required
                            />
                            <button
                                type="submit"
                                style={{
                                    marginTop: "8px",
                                    background: "#111",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "40px",
                                    padding: "15px",
                                    fontFamily: "'Barlow', sans-serif",
                                    fontSize: "14px",
                                    fontWeight: 700,
                                    letterSpacing: "0.08em",
                                    textTransform: "uppercase",
                                    cursor: "pointer",
                                    transition: "background 0.2s ease",
                                    width: "100%",
                                }}
                                onMouseEnter={e => (e.currentTarget.style.background = "#e5251a")}
                                onMouseLeave={e => (e.currentTarget.style.background = "#111")}
                            >
                                Spark It →
                            </button>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}