"use client";

import PageLayout from "../components/PageLayout";
import { motion } from "framer-motion";
import { Sparkles, Users, Zap, Globe, Lightbulb, Shield, BarChart3, MessageCircle } from "lucide-react";

const features = [
    {
        icon: <Sparkles size={28} />,
        title: "Spark Ideas",
        desc: "Share raw, unfiltered ideas with a community hungry for innovation. No pitch decks required.",
    },
    {
        icon: <Users size={28} />,
        title: "Community Voting",
        desc: "The best ideas rise through collective intelligence. Spark the ones that move you.",
    },
    {
        icon: <Zap size={28} />,
        title: "Real-time Collaboration",
        desc: "Ideas evolve through conversation. Comment, iterate, and build on each other's thinking.",
    },
    {
        icon: <Globe size={28} />,
        title: "Open Platform",
        desc: "Transparent, accessible, and built for everyone. No gatekeepers, no algorithms hiding your voice.",
    },
    {
        icon: <Lightbulb size={28} />,
        title: "Idea Incubation",
        desc: "From spark to reality — we provide the community feedback loop to refine your concepts.",
    },
    {
        icon: <Shield size={28} />,
        title: "Safe Space",
        desc: "Express freely without judgment. Our community guidelines protect original thinking.",
    },
    {
        icon: <BarChart3 size={28} />,
        title: "Trend Insights",
        desc: "See what topics are sparking conversation. Discover emerging ideas before they go mainstream.",
    },
    {
        icon: <MessageCircle size={28} />,
        title: "Direct Feedback",
        desc: "Get honest, constructive feedback from builders, thinkers, and domain experts.",
    },
];

export default function FeaturesPage() {
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
                    Features
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
                        What Powers Vibe
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
                        Built for<br />
                        <span style={{ color: "#e5251a" }}>Bold Thinkers.</span>
                    </h1>
                    <p
                        style={{
                            fontSize: "17px",
                            color: "rgba(255,255,255,0.55)",
                            maxWidth: "480px",
                            lineHeight: 1.65,
                        }}
                    >
                        Every feature is designed to remove friction between having an idea and sharing it with the world.
                    </p>
                </motion.div>
            </section>

            {/* Features Grid */}
            <section style={{ padding: "80px 6vw" }}>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                        gap: "24px",
                    }}
                >
                    {features.map((feature, i) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.08 }}
                            style={{
                                background: "#f5f5f5",
                                borderRadius: "16px",
                                padding: "32px 28px",
                                transition: "transform 0.25s ease, box-shadow 0.25s ease",
                                cursor: "default",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-4px)";
                                e.currentTarget.style.boxShadow = "0 20px 60px rgba(0,0,0,0.1)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.boxShadow = "none";
                            }}
                        >
                            <div
                                style={{
                                    width: 52,
                                    height: 52,
                                    borderRadius: "12px",
                                    background: "#111",
                                    color: "#fff",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginBottom: "20px",
                                }}
                            >
                                {feature.icon}
                            </div>
                            <h3
                                style={{
                                    fontFamily: "'Barlow Condensed', sans-serif",
                                    fontSize: "22px",
                                    fontWeight: 800,
                                    textTransform: "uppercase",
                                    letterSpacing: "-0.01em",
                                    marginBottom: "8px",
                                    color: "#111",
                                }}
                            >
                                {feature.title}
                            </h3>
                            <p
                                style={{
                                    fontSize: "14px",
                                    color: "#757575",
                                    lineHeight: 1.65,
                                }}
                            >
                                {feature.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>
        </PageLayout>
    );
}
