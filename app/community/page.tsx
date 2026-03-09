"use client";

import PageLayout from "../components/PageLayout";
import { motion } from "framer-motion";
import { Users, Flame, Lightbulb, Globe, TrendingUp, Heart } from "lucide-react";

const stats = [
    { value: "12,400+", label: "Community Members", icon: <Users size={24} /> },
    { value: "3,200+", label: "Ideas Shared", icon: <Lightbulb size={24} /> },
    { value: "48,000+", label: "Sparks Given", icon: <Flame size={24} /> },
    { value: "85+", label: "Countries Represented", icon: <Globe size={24} /> },
];

const contributors = [
    { name: "Arya K.", role: "Serial Ideator", ideas: 47, sparks: 1240, initial: "A" },
    { name: "Marco R.", role: "Community Builder", ideas: 35, sparks: 980, initial: "M" },
    { name: "Priya S.", role: "Impact Thinker", ideas: 29, sparks: 870, initial: "P" },
    { name: "Jake L.", role: "Tech Visionary", ideas: 24, sparks: 650, initial: "J" },
    { name: "Nina T.", role: "Wellness Advocate", ideas: 22, sparks: 590, initial: "N" },
    { name: "Sam W.", role: "Local Champion", ideas: 19, sparks: 520, initial: "S" },
];

const values = [
    {
        icon: <Heart size={24} />,
        title: "Ideas First",
        desc: "We believe every person holds a world-changing idea. Our job is to make sure it gets heard.",
    },
    {
        icon: <TrendingUp size={24} />,
        title: "Rise Together",
        desc: "Success isn't zero-sum. When one idea sparks, the whole community lifts.",
    },
    {
        icon: <Users size={24} />,
        title: "Radical Openness",
        desc: "No gatekeepers. No hierarchy. Just people connecting around what matters.",
    },
];

export default function CommunityPage() {
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
                        fontSize: "clamp(120px, 18vw, 280px)",
                        fontWeight: 900,
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.03)",
                        letterSpacing: "-0.04em",
                        whiteSpace: "nowrap",
                        userSelect: "none",
                        pointerEvents: "none",
                    }}
                >
                    Community
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
                        The People Behind the Ideas
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
                        Stronger<br />
                        <span style={{ color: "#e5251a" }}>Together.</span>
                    </h1>
                    <p
                        style={{
                            fontSize: "17px",
                            color: "rgba(255,255,255,0.55)",
                            maxWidth: "480px",
                            lineHeight: 1.65,
                        }}
                    >
                        Vibe is more than a platform — it is a movement of thinkers,
                        builders, and dreamers who believe the best ideas come from collective energy.
                    </p>
                </motion.div>
            </section>

            {/* Stats */}
            <section style={{ padding: "80px 6vw" }}>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                        gap: "24px",
                    }}
                >
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            style={{
                                background: "#f5f5f5",
                                borderRadius: "16px",
                                padding: "32px 24px",
                                textAlign: "center",
                            }}
                        >
                            <div
                                style={{
                                    width: 48,
                                    height: 48,
                                    borderRadius: "12px",
                                    background: "#111",
                                    color: "#fff",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    margin: "0 auto 16px",
                                }}
                            >
                                {stat.icon}
                            </div>
                            <div
                                style={{
                                    fontFamily: "'Barlow Condensed', sans-serif",
                                    fontSize: "36px",
                                    fontWeight: 900,
                                    color: "#111",
                                    marginBottom: "4px",
                                }}
                            >
                                {stat.value}
                            </div>
                            <p style={{ fontSize: "13px", color: "#757575", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Divider */}
            <hr style={{ border: "none", borderTop: "1px solid rgba(0,0,0,0.1)", margin: "0 6vw" }} />

            {/* Top Contributors */}
            <section style={{ padding: "80px 6vw" }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <p style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#e5251a", marginBottom: "12px" }}>
                        Hall of Sparks
                    </p>
                    <h2 style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontSize: "clamp(32px, 4vw, 56px)",
                        fontWeight: 900,
                        textTransform: "uppercase",
                        color: "#111",
                        marginBottom: "40px",
                    }}>
                        Top Contributors
                    </h2>
                </motion.div>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                        gap: "20px",
                    }}
                >
                    {contributors.map((person, i) => (
                        <motion.div
                            key={person.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.08 }}
                            style={{
                                background: "#f5f5f5",
                                borderRadius: "16px",
                                padding: "28px 24px",
                                display: "flex",
                                alignItems: "center",
                                gap: "16px",
                                transition: "transform 0.25s, box-shadow 0.25s",
                                cursor: "default",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-3px)";
                                e.currentTarget.style.boxShadow = "0 16px 48px rgba(0,0,0,0.08)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.boxShadow = "none";
                            }}
                        >
                            <div
                                style={{
                                    width: 48,
                                    height: 48,
                                    borderRadius: "50%",
                                    background: "#111",
                                    color: "#fff",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontWeight: 800,
                                    fontSize: "18px",
                                    fontFamily: "'Barlow Condensed', sans-serif",
                                    flexShrink: 0,
                                }}
                            >
                                {person.initial}
                            </div>
                            <div>
                                <p style={{ fontWeight: 700, fontSize: "15px", color: "#111" }}>{person.name}</p>
                                <p style={{ fontSize: "12px", color: "#e5251a", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "4px" }}>
                                    {person.role}
                                </p>
                                <p style={{ fontSize: "12px", color: "#999" }}>
                                    {person.ideas} ideas · {person.sparks} sparks
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Divider */}
            <hr style={{ border: "none", borderTop: "1px solid rgba(0,0,0,0.1)", margin: "0 6vw" }} />

            {/* Values */}
            <section style={{ padding: "80px 6vw" }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <p style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#e5251a", marginBottom: "12px" }}>
                        What We Stand For
                    </p>
                    <h2 style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontSize: "clamp(32px, 4vw, 56px)",
                        fontWeight: 900,
                        textTransform: "uppercase",
                        color: "#111",
                        marginBottom: "40px",
                    }}>
                        Community Values
                    </h2>
                </motion.div>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                        gap: "24px",
                    }}
                >
                    {values.map((value, i) => (
                        <motion.div
                            key={value.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            style={{
                                background: "#111",
                                borderRadius: "16px",
                                padding: "36px 28px",
                                color: "#fff",
                            }}
                        >
                            <div
                                style={{
                                    width: 48,
                                    height: 48,
                                    borderRadius: "12px",
                                    background: "#e5251a",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginBottom: "20px",
                                }}
                            >
                                {value.icon}
                            </div>
                            <h3
                                style={{
                                    fontFamily: "'Barlow Condensed', sans-serif",
                                    fontSize: "22px",
                                    fontWeight: 800,
                                    textTransform: "uppercase",
                                    marginBottom: "8px",
                                }}
                            >
                                {value.title}
                            </h3>
                            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)", lineHeight: 1.65 }}>
                                {value.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>
        </PageLayout>
    );
}
