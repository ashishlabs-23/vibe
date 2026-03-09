/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useSession } from "next-auth/react";
import PageLayout from "../components/PageLayout";
import { useEffect, useState } from "react";
import IdeaCard from "../components/IdeaCard";
import { motion } from "framer-motion";

export default function ProfilePage() {
    const { data: session, status } = useSession();
    const [ideas, setIdeas] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (status === "unauthenticated") {
            window.location.href = "/";
            return;
        }

        if (status === "authenticated" && session?.user?.name) {
            fetch("/api/ideas")
                .then(res => res.json())
                .then(data => {
                    if (Array.isArray(data)) {
                        // Filter the ideas to only show ones authored by the current user
                        const myIdeas = data.filter((idea: any) => idea?.author?.name === session.user?.name);
                        setIdeas(myIdeas);
                    }
                    setIsLoading(false);
                })
                .catch(err => {
                    console.error("Error fetching ideas:", err);
                    setIsLoading(false);
                });
        }
    }, [status, session]);

    if (status === "loading") {
        return (
            <PageLayout>
                <div style={{ padding: "120px 6vw", textAlign: "center", color: "#757575", fontSize: "16px", fontWeight: 500 }}>
                    Loading profile...
                </div>
            </PageLayout>
        );
    }

    if (!session) return null;

    return (
        <PageLayout>
            {/* Profile Header Section */}
            <section style={{
                background: "#111",
                padding: "140px 6vw 80px",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                gap: "32px",
                position: "relative",
                overflow: "hidden"
            }}>
                <div style={{
                    position: "absolute",
                    top: "50%",
                    right: "-10%",
                    transform: "translateY(-50%)",
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: "clamp(120px, 20vw, 300px)",
                    fontWeight: 900,
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.03)",
                    pointerEvents: "none",
                    whiteSpace: "nowrap"
                }}>
                    CREATOR
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    style={{ position: "relative", zIndex: 2 }}
                >
                    {session.user?.image ? (
                        <img
                            src={session.user.image}
                            alt={session.user.name || "User"}
                            referrerPolicy="no-referrer"
                            style={{
                                width: 120, height: 120,
                                borderRadius: "50%",
                                border: "4px solid rgba(255,255,255,0.1)",
                                objectFit: "cover"
                            }}
                        />
                    ) : (
                        <div style={{
                            width: 120, height: 120,
                            borderRadius: "50%",
                            background: "#e5251a",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: "42px", fontWeight: 700,
                            border: "4px solid rgba(255,255,255,0.1)"
                        }}>
                            {session.user?.name?.[0] || "?"}
                        </div>
                    )}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                    style={{ position: "relative", zIndex: 2 }}
                >
                    <p style={{
                        fontSize: "12px",
                        fontWeight: 700,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "#e5251a",
                        marginBottom: "8px",
                    }}>
                        Verified Member
                    </p>
                    <h1 style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontSize: "clamp(48px, 6vw, 64px)",
                        fontWeight: 900,
                        lineHeight: 1,
                        textTransform: "uppercase",
                        letterSpacing: "-0.01em",
                        margin: "0 0 12px"
                    }}>
                        {session.user?.name}
                    </h1>
                    <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "16px", margin: 0, fontWeight: 500 }}>
                        {session.user?.email}
                    </p>
                </motion.div>
            </section>

            {/* User Ideas Section */}
            <section style={{ padding: "80px 6vw" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "40px" }}>
                    <div>
                        <h2 style={{
                            fontFamily: "'Barlow Condensed', sans-serif",
                            fontSize: "36px",
                            fontWeight: 900,
                            textTransform: "uppercase",
                            letterSpacing: "-0.01em",
                            color: "#111",
                            margin: "0 0 8px"
                        }}>
                            My Sparks
                        </h2>
                        <p style={{ fontSize: "14px", color: "#757575", fontWeight: 500, margin: 0 }}>
                            Ideas you have ignited in the community.
                        </p>
                    </div>
                </div>

                {isLoading ? (
                    <div style={{ padding: "40px 0", textAlign: "center" }}>
                        <p style={{ color: "#757575", fontSize: "16px", fontWeight: 500 }}>Loading your ideas...</p>
                    </div>
                ) : ideas.length > 0 ? (
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                        gap: "20px"
                    }}>
                        {ideas.map((idea, index) => (
                            <motion.div
                                key={idea.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                            >
                                <IdeaCard idea={idea} onSpark={() => { }} />
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        style={{
                            background: "#f9f9f9",
                            border: "1px dashed rgba(0,0,0,0.1)",
                            borderRadius: "16px",
                            padding: "60px",
                            textAlign: "center"
                        }}
                    >
                        <p style={{ fontSize: "18px", fontWeight: 600, color: "#111", marginBottom: "8px" }}>No ideas shared yet.</p>
                        <p style={{ fontSize: "15px", color: "#757575", maxWidth: "400px", margin: "0 auto" }}>
                            You haven&apos;t posted any ideas up to Vibe. Head back to the homepage to spark your first movement!
                        </p>
                    </motion.div>
                )}
            </section>
        </PageLayout>
    );
}
