/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable react/no-unescaped-entities */

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import IdeaCard from "./components/IdeaCard";
import IdeaForm from "./components/IdeaForm";
import Link from "next/link";
import { Github, Twitter, Linkedin, Instagram } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

export default function Home() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const parallaxX = useSpring(useTransform(mouseX, [0, 2000], [20, -20]), springConfig);
  const parallaxY = useSpring(useTransform(mouseY, [0, 1000], [20, -20]), springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const [ideas, setIdeas] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/ideas")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setIdeas(data.slice(0, 4));
        }
      })
      .catch((err) => console.error("Error fetching ideas:", err));
  }, []);

  return (
    <>
      {/* Announcement Bar — Premium */}
      <div style={{
        background: "linear-gradient(135deg, #111 0%, #1a1a1a 50%, #111 100%)",
        textAlign: "center",
        padding: "10px 20px",
        fontSize: "13px",
        fontWeight: 600,
        letterSpacing: "0.04em",
        color: "rgba(255,255,255,0.8)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
      }}>
        <span style={{
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          background: "#e5251a",
          display: "inline-block",
          animation: "pulse 2s ease-in-out infinite",
          boxShadow: "0 0 8px rgba(229,37,26,0.5)",
        }} />
        <span>Early access is live — Free membership for founding believers</span>
        <a href="/community" style={{
          color: "#e5251a",
          fontWeight: 700,
          textDecoration: "none",
          textTransform: "uppercase",
          fontSize: "11px",
          letterSpacing: "0.1em",
          marginLeft: "4px",
          transition: "color 0.2s",
        }}>Join Now →</a>
      </div>

      <Navbar />
      <Hero onOpenForm={() => setIsFormOpen(true)} />

      {/* Statement Section */}
      <motion.section
        id="statement"
        className="statement-section py-32 text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="mx-auto max-w-[1100px] px-[6vw]">
          <p className="statement-text mx-auto mb-6 max-w-[900px]">
            Great ideas don&apos;t live in isolation. They{" "}
            <span className="text-highlight">spark, collide,</span>{" "}
            and evolve in community.
          </p>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto mt-8 max-w-[480px] text-[17px] font-[500] text-[#757575]"
          >
            Vibe is where visionaries, builders, dreamers, and doers come to think out loud — together.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <button
              onClick={() => setIsFormOpen(true)}
              className="nike-btn-primary"
            >
              Share Your Idea
            </button>
            <Link href="/ideas" className="nike-btn-secondary">
              Explore Ideas
            </Link>
          </motion.div>
        </div>
      </motion.section>

      <hr className="section-divider mx-[6vw]" />

      {/* Ideas Section */}
      <motion.section
        id="ideas"
        className="py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
      >
        <motion.div
          className="mb-10 px-[6vw] flex flex-col sm:flex-row sm:items-end justify-between gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div>
            <h2 className="section-title mb-2">Ideas Lighting Up Vibe</h2>
            <p className="text-[14px] font-[600] uppercase tracking-[0.08em] text-[#757575]">
              Explore what the community is building
            </p>
          </div>
          <div style={{ display: "flex", gap: "12px" }}>
            <Link href="/ideas" style={{ textDecoration: "none" }}>
              <button className="nike-btn-primary self-start sm:self-auto">
                Explore All
              </button>
            </Link>
            <button onClick={() => setIsFormOpen(true)} className="nike-btn-red self-start sm:self-auto">
              + Submit Idea
            </button>
          </div>
        </motion.div>

        <motion.div
          className="px-[6vw]"
          variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.12 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="ideas-grid">
            {ideas.map((idea) => (
              <motion.div
                key={idea.id}
                variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } }}
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
                        window.location.reload(); // To trigger auth popup if needed or just refresh state
                      }
                    } catch (err) {
                      console.error("Spark error:", err);
                    }
                  }}
                />
              </motion.div>
            ))}
            {ideas.length === 0 && (
              <p style={{ gridColumn: "1 / -1", textAlign: "center", color: "#757575", padding: "40px" }}>
                Loading the latest sparks...
              </p>
            )}
          </div>
        </motion.div>
      </motion.section>

      <hr className="section-divider mx-[6vw]" />

      {/* CTA Banner */}
      <section
        style={{
          background: "#111",
          position: "relative",
          overflow: "hidden",
          padding: "100px 6vw",
          textAlign: "center",
        }}
      >
        {/* Big background watermark — Parallax effect */}
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }}>
          <motion.div
            style={{
              x: parallaxX,
              y: parallaxY,
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "clamp(120px, 20vw, 300px)",
              fontWeight: 900,
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.03)",
              letterSpacing: "-0.04em",
              whiteSpace: "nowrap",
              userSelect: "none",
            }}
          >
            IGNITE
          </motion.div>
        </div>

        {/* Red accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "3px",
            width: "100%",
            background: "linear-gradient(90deg, transparent, #e5251a 30%, #ff6b35 50%, #e5251a 70%, transparent)",
            transformOrigin: "center",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ position: "relative", zIndex: 2 }}
        >
          <p style={{
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#e5251a",
            marginBottom: "20px",
            fontFamily: "'Barlow', sans-serif",
          }}>
            Join the Movement
          </p>
          <h2
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "clamp(44px, 7vw, 96px)",
              fontWeight: 900,
              lineHeight: 0.92,
              textTransform: "uppercase",
              letterSpacing: "-0.02em",
              color: "#fff",
              maxWidth: "700px",
              margin: "0 auto 24px",
            }}
          >
            Your Idea Could<br />
            <span style={{ color: "#e5251a" }}>Change Everything.</span>
          </h2>
          <p style={{
            fontSize: "17px",
            color: "rgba(255,255,255,0.55)",
            maxWidth: "420px",
            margin: "0 auto 40px",
            lineHeight: 1.65,
          }}>
            Don&apos;t wait for permission. The community is ready to hear you. Every spark starts somewhere.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center" }}>
            <button
              onClick={() => setIsFormOpen(true)}
              style={{
                background: "#e5251a",
                color: "#fff",
                border: "none",
                borderRadius: "40px",
                padding: "15px 36px",
                fontFamily: "'Barlow', sans-serif",
                fontSize: "14px",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#c0392b"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#e5251a"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              Share Your Idea →
            </button>
            <Link
              href="/ideas"
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
                textDecoration: "none",
                transition: "all 0.2s ease",
                display: "inline-block",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#fff"; e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; e.currentTarget.style.background = "transparent"; }}
            >
              Explore Ideas
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Professional Footer */}
      <Footer />

      {/* Idea Form Modal */}
      {isFormOpen && (
        <IdeaForm
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSubmit={async (idea) => {
            try {
              const res = await fetch('/api/ideas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(idea)
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
              console.error("Submission error:", err);
              alert("An error occurred while submitting your idea.");
            }
          }}
        />
      )}
    </>
  );
}