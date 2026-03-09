"use client";

import Link from "next/link";
import { Github, Twitter, Linkedin, Instagram } from "lucide-react";

export default function Footer() {
    return (
        <footer style={{ background: "#111", color: "#fff", padding: "60px 6vw 32px", fontFamily: "'Barlow', sans-serif", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "40px", marginBottom: "48px" }}>
                <div>
                    <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "32px", fontWeight: 900, letterSpacing: "2px", textTransform: "uppercase", marginBottom: "8px" }}>Vibe</div>
                    <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#e5251a", marginBottom: "16px" }}>Ignite Together</p>
                    <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", lineHeight: 1.7, maxWidth: "280px" }}>
                        The community platform for bold thinkers, builders, and dreamers shaping what comes next.
                    </p>
                </div>
                <div>
                    <h4 style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "16px" }}>Platform</h4>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                        {[{ label: "Features", href: "/features" }, { label: "Ideas", href: "/ideas" }, { label: "Community", href: "/community" }, { label: "Manifesto", href: "/manifesto" }].map((item) => (
                            <li key={item.label}>
                                <Link href={item.href} style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)", textDecoration: "none", transition: "color 0.2s" }}
                                    onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
                                >{item.label}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h4 style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "16px" }}>Company</h4>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                        {["About", "Careers", "Blog", "Press", "Contact"].map((item) => (
                            <li key={item}>
                                <a href="#" style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)", textDecoration: "none", transition: "color 0.2s" }}
                                    onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
                                >{item}</a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h4 style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "16px" }}>Legal</h4>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                        {["Privacy Policy", "Terms of Service", "Cookie Policy", "Accessibility"].map((item) => (
                            <li key={item}>
                                <a href="#" style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)", textDecoration: "none", transition: "color 0.2s" }}
                                    onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
                                >{item}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div style={{ height: "1px", background: "rgba(255,255,255,0.1)", marginBottom: "24px" }} />
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
                <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.35)" }}>© 2026 Vibe Inc. All rights reserved.</p>
                <div style={{ display: "flex", gap: "16px" }}>
                    {[<Twitter key="tw" size={16} />, <Github key="gh" size={16} />, <Linkedin key="li" size={16} />, <Instagram key="ig" size={16} />].map((icon, i) => (
                        <a key={i} href="#" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 36, height: 36, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.5)", textDecoration: "none", transition: "all 0.2s" }}
                            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#e5251a"; e.currentTarget.style.color = "#e5251a"; e.currentTarget.style.background = "rgba(229,37,26,0.1)"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; e.currentTarget.style.background = "transparent"; }}
                        >{icon}</a>
                    ))}
                </div>
            </div>
        </footer>
    );
}
