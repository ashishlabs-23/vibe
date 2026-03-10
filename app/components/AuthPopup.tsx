"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Lock, User, ArrowRight } from "lucide-react";

type AuthMode = "signin" | "signup";

export default function AuthPopup({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) {
    const [mode, setMode] = useState<AuthMode>("signin");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            if (mode === "signup") {
                const res = await fetch("/api/auth/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, email, password }),
                });

                if (!res.ok) {
                    const data = await res.json();
                    throw new Error(data.message || "Failed to register");
                }
            }

            const result = await signIn("credentials", {
                redirect: false,
                email,
                password,
            });

            if (result?.error) {
                throw new Error("Invalid email or password");
            }

            onClose();
            // Force a reload so the Navbar updates to show the logged-in user
            window.location.reload();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div
                    style={{
                        position: "fixed",
                        inset: 0,
                        zIndex: 9999,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "rgba(0,0,0,0.5)",
                        backdropFilter: "blur(4px)",
                    }}
                    onClick={(e) => {
                        if (e.target === e.currentTarget) onClose();
                    }}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.92, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.92, y: 20 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        style={{
                            position: "relative",
                            width: "100%",
                            maxWidth: "400px",
                            background: "#fff",
                            borderRadius: "16px",
                            padding: "36px 32px 32px",
                            boxShadow: "0 32px 80px rgba(0,0,0,0.25)",
                            margin: "16px",
                        }}
                    >
                        {/* Close */}
                        <button
                            onClick={onClose}
                            style={{
                                position: "absolute",
                                top: 16,
                                right: 16,
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                color: "#757575",
                                padding: 4,
                                display: "flex",
                            }}
                        >
                            <X size={18} />
                        </button>

                        {/* Logo */}
                        <div
                            style={{
                                fontFamily: "'Barlow Condensed', sans-serif",
                                fontSize: "28px",
                                fontWeight: 900,
                                letterSpacing: "2px",
                                textTransform: "uppercase",
                                color: "#111",
                                textAlign: "center",
                                marginBottom: "4px",
                            }}
                        >
                            Vibe
                        </div>
                        <p
                            style={{
                                textAlign: "center",
                                fontSize: "12px",
                                fontWeight: 700,
                                letterSpacing: "0.12em",
                                textTransform: "uppercase",
                                color: "#e5251a",
                                marginBottom: "24px",
                            }}
                        >
                            {mode === "signin" ? "Welcome Back" : "Join the Movement"}
                        </p>

                        {/* Tabs */}
                        <div
                            style={{
                                display: "flex",
                                borderRadius: "8px",
                                overflow: "hidden",
                                border: "1.5px solid #eee",
                                marginBottom: "24px",
                            }}
                        >
                            {(["signin", "signup"] as AuthMode[]).map((m) => (
                                <button
                                    key={m}
                                    onClick={() => setMode(m)}
                                    style={{
                                        flex: 1,
                                        padding: "10px",
                                        fontSize: "12px",
                                        fontWeight: 700,
                                        letterSpacing: "0.08em",
                                        textTransform: "uppercase",
                                        border: "none",
                                        cursor: "pointer",
                                        background: mode === m ? "#111" : "#fff",
                                        color: mode === m ? "#fff" : "#757575",
                                        transition: "all 0.2s ease",
                                        fontFamily: "'Barlow', sans-serif",
                                    }}
                                >
                                    {m === "signin" ? "Sign In" : "Sign Up"}
                                </button>
                            ))}
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div style={{ color: "#e5251a", fontSize: "13px", marginBottom: "16px", textAlign: "center", fontWeight: 600 }}>
                                {error}
                            </div>
                        )}

                        {/* Form */}
                        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                            {mode === "signup" && (
                                <div style={{ position: "relative" }}>
                                    <User
                                        size={16}
                                        style={{
                                            position: "absolute",
                                            left: 14,
                                            top: "50%",
                                            transform: "translateY(-50%)",
                                            color: "#999",
                                        }}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Full name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        style={{
                                            width: "100%",
                                            background: "#f5f5f5",
                                            border: "1.5px solid transparent",
                                            borderRadius: "8px",
                                            padding: "13px 14px 13px 40px",
                                            fontSize: "14px",
                                            color: "#111",
                                            outline: "none",
                                            fontFamily: "'Barlow', sans-serif",
                                            transition: "border-color 0.2s",
                                        }}
                                        onFocus={(e) => {
                                            e.target.style.borderColor = "#111";
                                            e.target.style.background = "#fff";
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.borderColor = "transparent";
                                            e.target.style.background = "#f5f5f5";
                                        }}
                                    />
                                </div>
                            )}

                            <div style={{ position: "relative" }}>
                                <Mail
                                    size={16}
                                    style={{
                                        position: "absolute",
                                        left: 14,
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        color: "#999",
                                    }}
                                />
                                <input
                                    type="email"
                                    placeholder="Email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    style={{
                                        width: "100%",
                                        background: "#f5f5f5",
                                        border: "1.5px solid transparent",
                                        borderRadius: "8px",
                                        padding: "13px 14px 13px 40px",
                                        fontSize: "14px",
                                        color: "#111",
                                        outline: "none",
                                        fontFamily: "'Barlow', sans-serif",
                                        transition: "border-color 0.2s",
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = "#111";
                                        e.target.style.background = "#fff";
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = "transparent";
                                        e.target.style.background = "#f5f5f5";
                                    }}
                                />
                            </div>

                            <div style={{ position: "relative" }}>
                                <Lock
                                    size={16}
                                    style={{
                                        position: "absolute",
                                        left: 14,
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        color: "#999",
                                    }}
                                />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    style={{
                                        width: "100%",
                                        background: "#f5f5f5",
                                        border: "1.5px solid transparent",
                                        borderRadius: "8px",
                                        padding: "13px 14px 13px 40px",
                                        fontSize: "14px",
                                        color: "#111",
                                        outline: "none",
                                        fontFamily: "'Barlow', sans-serif",
                                        transition: "border-color 0.2s",
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = "#111";
                                        e.target.style.background = "#fff";
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = "transparent";
                                        e.target.style.background = "#f5f5f5";
                                    }}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                style={{
                                    marginTop: "4px",
                                    background: loading ? "#999" : "#111",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "40px",
                                    padding: "14px",
                                    fontSize: "13px",
                                    fontWeight: 700,
                                    letterSpacing: "0.08em",
                                    textTransform: "uppercase",
                                    cursor: loading ? "not-allowed" : "pointer",
                                    fontFamily: "'Barlow', sans-serif",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "8px",
                                    transition: "background 0.2s",
                                }}
                                onMouseEnter={(e) => { if (!loading) e.currentTarget.style.background = "#e5251a"; }}
                                onMouseLeave={(e) => { if (!loading) e.currentTarget.style.background = "#111"; }}
                            >
                                {loading ? "Please wait..." : (mode === "signin" ? "Sign In" : "Create Account")}
                                {!loading && <ArrowRight size={15} />}
                            </button>
                        </form>

                        {/* Footer text */}
                        <p style={{
                            textAlign: "center",
                            fontSize: "12px",
                            color: "#999",
                            marginTop: "20px",
                            lineHeight: 1.5,
                        }}>
                            {mode === "signin" ? (
                                <>
                                    New to Vibe?{" "}
                                    <button
                                        onClick={() => setMode("signup")}
                                        style={{
                                            background: "none",
                                            border: "none",
                                            color: "#111",
                                            fontWeight: 700,
                                            cursor: "pointer",
                                            textDecoration: "underline",
                                            fontSize: "12px",
                                        }}
                                    >
                                        Create an account
                                    </button>
                                </>
                            ) : (
                                <>
                                    Already have an account?{" "}
                                    <button
                                        onClick={() => setMode("signin")}
                                        style={{
                                            background: "none",
                                            border: "none",
                                            color: "#111",
                                            fontWeight: 700,
                                            cursor: "pointer",
                                            textDecoration: "underline",
                                            fontSize: "12px",
                                        }}
                                    >
                                        Sign in
                                    </button>
                                </>
                            )}
                        </p>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
