/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import PageLayout from "../components/PageLayout";
import IdeaCard from "../components/IdeaCard";
import IdeaForm from "../components/IdeaForm";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const categories = ["All", "🚀 Startup", "🌱 Social Impact", "⚡ Tech", "🎨 Creative", "🌍 Environment", "💼 Business", "🧠 Wellness", "🤝 Community"];

function IdeasContent() {
    const { data: session } = useSession();
    const searchParams = useSearchParams();
    const filterMine = searchParams.get("filter") === "mine";

    const [activeCategory, setActiveCategory] = useState("All");
    const [ideas, setIdeas] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);

    useEffect(() => {
        fetch("/api/ideas")
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setIdeas(data);
                }
                setIsLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching ideas:", err);
                setIsLoading(false);
            });
    }, []);

    let filteredIdeas = activeCategory === "All"
        ? ideas
        : ideas.filter((idea) => idea.category === activeCategory);

    // Apply "My Ideas" filter
    if (filterMine && session?.user?.name) {
        filteredIdeas = filteredIdeas.filter((idea: any) => idea?.author?.name === session.user?.name);
    }

    return (
        <PageLayout>
            {/* Hero */}
            <section
                style={{
                    background: "#111",
                    padding: "100px 6vw 80px",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontSize: "clamp(150px, 22vw, 320px)",
                        fontWeight: 900,
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.03)",
                        letterSpacing: "-0.04em",
                        whiteSpace: "nowrap",
                        userSelect: "none",
                        pointerEvents: "none",
                    }}
                >
                    Ideas
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    style={{ position: "relative", zIndex: 2, maxWidth: "700px" }}
                >
                    <p
                        style={{
                            fontSize: "12px",
                            fontWeight: 700,
                            letterSpacing: "0.18em",
                            textTransform: "uppercase",
                            color: "#e5251a",
                            marginBottom: "20px",
                        }}
                    >
                        Explore & Discover
                    </p>
                    <h1
                        style={{
                            fontFamily: "'Barlow Condensed', sans-serif",
                            fontSize: "clamp(48px, 8vw, 96px)",
                            fontWeight: 900,
                            lineHeight: 0.92,
                            textTransform: "uppercase",
                            color: "#fff",
                            marginBottom: "24px",
                        }}
                    >
                        {filterMine ? "My Ideas" : "Ideas That"}
                        {!filterMine && <><br /><span style={{ color: "#e5251a" }}>Move People.</span></>}
                    </h1>
                    <p
                        style={{
                            fontSize: "17px",
                            color: "rgba(255,255,255,0.55)",
                            maxWidth: "480px",
                            lineHeight: 1.65,
                        }}
                    >
                        {filterMine ? "Review the sparks you've contributed to the community." : "Browse what the community is thinking, building, and dreaming. Spark the ideas that resonate."}
                    </p>
                </motion.div>
            </section>

            {/* Filter Bar */}
            <section style={{ padding: "32px 6vw 0" }}>
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "16px",
                        marginBottom: "32px",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "8px",
                        }}
                    >
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                style={{
                                    padding: "8px 20px",
                                    borderRadius: "40px",
                                    border: "1.5px solid",
                                    borderColor: activeCategory === cat ? "#111" : "#ddd",
                                    background: activeCategory === cat ? "#111" : "#fff",
                                    color: activeCategory === cat ? "#fff" : "#555",
                                    fontSize: "12px",
                                    fontWeight: 700,
                                    letterSpacing: "0.06em",
                                    textTransform: "uppercase",
                                    cursor: "pointer",
                                    fontFamily: "'Barlow', sans-serif",
                                    transition: "all 0.2s ease",
                                }}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={() => setIsFormOpen(true)}
                        style={{
                            padding: "10px 24px",
                            borderRadius: "40px",
                            background: "#e5251a",
                            color: "#fff",
                            border: "none",
                            fontSize: "13px",
                            fontWeight: 700,
                            letterSpacing: "0.05em",
                            textTransform: "uppercase",
                            cursor: "pointer",
                            transition: "background 0.2s ease"
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = "#c0392b"}
                        onMouseLeave={(e) => e.currentTarget.style.background = "#e5251a"}
                    >
                        + Submit Idea
                    </button>
                </div>
            </section>

            {/* Ideas Grid */}
            <section style={{ padding: "0 6vw 80px" }}>
                <motion.div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                        gap: "20px",
                    }}
                    variants={{
                        hidden: { opacity: 0 },
                        show: { opacity: 1, transition: { staggerChildren: 0.1 } },
                    }}
                    initial="hidden"
                    animate="show"
                    key={activeCategory}
                >
                    {filteredIdeas.map((idea) => (
                        <motion.div
                            key={idea.id}
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                            }}
                        >
                            <IdeaCard
                                idea={idea}
                                onSpark={async (id) => {
                                    try {
                                        const res = await fetch("/api/spark", {
                                            method: "POST",
                                            headers: { "Content-Type": "application/json" },
                                            body: JSON.stringify({ ideaId: id }),
                                        });
                                        if (res.status === 401) {
                                            alert("Please sign in to spark ideas!");
                                        }
                                    } catch (err) {
                                        console.error("Spark error:", err);
                                    }
                                }}
                            />
                        </motion.div>
                    ))}
                </motion.div>            {isLoading && (
                    <div style={{ textAlign: "center", padding: "60px 0" }}>
                        <p style={{ fontSize: "18px", color: "#757575", fontWeight: 500 }}>
                            Loading ideas...
                        </p>
                    </div>
                )}

                {!isLoading && filteredIdeas.length === 0 && (
                    <div style={{ textAlign: "center", padding: "60px 0" }}>
                        <p style={{ fontSize: "18px", color: "#757575", fontWeight: 500 }}>
                            {filterMine ? "You haven't shared any ideas yet. Be the first to start a movement!" : "No ideas in this category yet. Be the first to share one!"}
                        </p>
                    </div>
                )}
            </section>

            <IdeaForm
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                onSubmit={async (newIdea) => {
                    try {
                        const res = await fetch("/api/ideas", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(newIdea),
                        });

                        if (res.ok) {
                            alert("Idea sparked successfully!");
                            setIsFormOpen(false);
                            window.location.reload();
                        } else {
                            const data = await res.json();
                            alert(`Failed to spark idea: ${data.error || "Unknown error"}`);
                        }
                    } catch (err) {
                        console.error("Failed to submit idea", err);
                        alert("An error occurred while submitting your idea.");
                    }
                }}
            />
        </PageLayout >
    );
}

export default function IdeasPage() {
    return (
        <Suspense fallback={<div style={{ padding: "100px", textAlign: "center", color: "#757575" }}>Loading explore page...</div>}>
            <IdeasContent />
        </Suspense>
    );
}
