"use client";

import PageLayout from "../components/PageLayout";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const statements = [
    {
        number: "01",
        title: "Ideas Are Not Commodities.",
        text: "They are living, breathing things. They deserve sunlight, not a locked drawer. We built Vibe because the world deserves to hear what you are thinking.",
    },
    {
        number: "02",
        title: "No Idea Is Too Small.",
        text: "The next revolution might start as a shower thought. A sketch on a napkin. A late-night text to a friend. We take every spark seriously.",
    },
    {
        number: "03",
        title: "Community Over Competition.",
        text: "We do not believe in zero-sum games. When your idea gets better, the whole community wins. We spark, we do not steal. We build, we do not tear down.",
    },
    {
        number: "04",
        title: "Transparency Is Non-Negotiable.",
        text: "No hidden algorithms. No pay-to-play visibility. Every idea gets the same stage. The community decides what rises — not us.",
    },
    {
        number: "05",
        title: "Action Over Perfection.",
        text: "Share the rough draft. Post the half-formed thought. The magic happens when raw ideas collide with fresh eyes. Perfection is the enemy of progress.",
    },
    {
        number: "06",
        title: "The Future Is Collective.",
        text: "The biggest challenges facing humanity will not be solved by a single genius in a garage. They will be solved by communities thinking, failing, iterating, and building together.",
    },
];

export default function ManifestoPage() {
    return (
        <PageLayout>
            {/* Hero */}
            <section
                style={{
                    background: "#111",
                    padding: "120px 6vw 100px",
                    position: "relative",
                    overflow: "hidden",
                    textAlign: "center",
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
                    Manifesto
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    style={{ position: "relative", zIndex: 2, maxWidth: "800px", margin: "0 auto" }}
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
                        What We Believe
                    </p>
                    <h1
                        style={{
                            fontFamily: "'Barlow Condensed', sans-serif",
                            fontSize: "clamp(48px, 8vw, 96px)",
                            fontWeight: 900,
                            lineHeight: 0.92,
                            textTransform: "uppercase",
                            color: "#fff",
                            marginBottom: "28px",
                        }}
                    >
                        The Vibe<br />
                        <span style={{ color: "#e5251a" }}>Manifesto.</span>
                    </h1>
                    <p
                        style={{
                            fontSize: "18px",
                            color: "rgba(255,255,255,0.55)",
                            maxWidth: "540px",
                            lineHeight: 1.65,
                            margin: "0 auto",
                        }}
                    >
                        We are not just another platform. We are a declaration that the world changes one bold idea at a time. Here is what we stand for.
                    </p>
                </motion.div>
            </section>

            {/* Statements */}
            <section style={{ padding: "80px 6vw", maxWidth: "900px", margin: "0 auto" }}>
                {statements.map((statement, i) => (
                    <motion.div
                        key={statement.number}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        style={{
                            padding: "48px 0",
                            borderBottom: i < statements.length - 1 ? "1px solid rgba(0,0,0,0.1)" : "none",
                        }}
                    >
                        <div style={{ display: "flex", gap: "24px", alignItems: "flex-start" }}>
                            <span
                                style={{
                                    fontFamily: "'Barlow Condensed', sans-serif",
                                    fontSize: "48px",
                                    fontWeight: 900,
                                    color: "rgba(0,0,0,0.06)",
                                    lineHeight: 1,
                                    flexShrink: 0,
                                    minWidth: "60px",
                                }}
                            >
                                {statement.number}
                            </span>
                            <div>
                                <h2
                                    style={{
                                        fontFamily: "'Barlow Condensed', sans-serif",
                                        fontSize: "clamp(24px, 3vw, 36px)",
                                        fontWeight: 900,
                                        textTransform: "uppercase",
                                        color: "#111",
                                        marginBottom: "12px",
                                        lineHeight: 1.1,
                                    }}
                                >
                                    {statement.title}
                                </h2>
                                <p
                                    style={{
                                        fontSize: "16px",
                                        color: "#555",
                                        lineHeight: 1.75,
                                        maxWidth: "600px",
                                    }}
                                >
                                    {statement.text}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </section>

            {/* CTA */}
            <section
                style={{
                    background: "#111",
                    padding: "80px 6vw",
                    textAlign: "center",
                }}
            >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <h2
                        style={{
                            fontFamily: "'Barlow Condensed', sans-serif",
                            fontSize: "clamp(36px, 5vw, 64px)",
                            fontWeight: 900,
                            textTransform: "uppercase",
                            color: "#fff",
                            marginBottom: "16px",
                            lineHeight: 1,
                        }}
                    >
                        Ready To Join<br />
                        <span style={{ color: "#e5251a" }}>The Movement?</span>
                    </h2>
                    <p
                        style={{
                            fontSize: "16px",
                            color: "rgba(255,255,255,0.55)",
                            marginBottom: "32px",
                            maxWidth: "400px",
                            margin: "0 auto 32px",
                        }}
                    >
                        Your idea could be the spark that changes everything.
                    </p>
                    <Link
                        href="/ideas"
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "8px",
                            background: "#e5251a",
                            color: "#fff",
                            border: "none",
                            borderRadius: "40px",
                            padding: "15px 36px",
                            fontSize: "14px",
                            fontWeight: 700,
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            textDecoration: "none",
                            fontFamily: "'Barlow', sans-serif",
                            transition: "background 0.2s",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "#c0392b")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "#e5251a")}
                    >
                        Explore Ideas <ArrowRight size={16} />
                    </Link>
                </motion.div>
            </section>
        </PageLayout>
    );
}
