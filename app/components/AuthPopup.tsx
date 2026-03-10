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
            // Optional: You could force a reload here if the session doesn't immediately reflect
            // window.location.reload();
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

                        {/* Divider */}
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                                margin: "20px 0",
                            }}
                        >
                            <div style={{ flex: 1, height: "1px", background: "#eee" }} />
                            <span style={{ fontSize: "11px", color: "#999", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>or</span>
                            <div style={{ flex: 1, height: "1px", background: "#eee" }} />
                        </div>

                        {/* Google Sign In */}
                        <button
                            onClick={() => signIn("google")}
                            style={{
                                width: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "10px",
                                padding: "13px",
                                border: "1.5px solid #eee",
                                borderRadius: "40px",
                                background: "#fff",
                                cursor: "pointer",
                                fontSize: "13px",
                                fontWeight: 600,
                                color: "#111",
                                fontFamily: "'Barlow', sans-serif",
                                transition: "all 0.2s",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = "#111";
                                e.currentTarget.style.background = "#fafafa";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = "#eee";
                                e.currentTarget.style.background = "#fff";
                            }}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Continue with Google
                        </button>

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
