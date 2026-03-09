"use client";
/* eslint-disable @next/next/no-img-element */

import { useSession, signOut } from "next-auth/react";
import { useScroll, motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { LogOut, User, Menu, X, Lightbulb } from "lucide-react";
import Link from "next/link";
import AuthPopup from "./AuthPopup";

export default function Navbar() {
    const { data: session } = useSession();
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);
    const [authOpen, setAuthOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

    // Common style for dropdown items
    const dropdownItemStyle: React.CSSProperties = {
        display: "flex", alignItems: "center", gap: "8px",
        padding: "10px 12px", fontSize: "13px", fontWeight: 600, color: "#111",
        textDecoration: "none", borderRadius: "8px", border: "none", background: "none",
        cursor: "pointer", width: "100%", textAlign: "left", transition: "background 0.15s"
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (profileDropdownOpen && !(e.target as Element).closest('.nav-desktop-auth')) {
                setProfileDropdownOpen(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [profileDropdownOpen]);

    useEffect(() => {
        return scrollY.on("change", (latest) => {
            setIsScrolled(latest > 40);
        });
    }, [scrollY]);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (mobileOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [mobileOpen]);

    const navItems = [
        { label: "Home", href: "/" },
        { label: "Features", href: "/features" },
        { label: "Ideas", href: "/ideas" },
        { label: "Community", href: "/community" },
        { label: "Manifesto", href: "/manifesto" },
    ];

    return (
        <>
            <nav style={{
                position: "sticky",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 500,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                height: "60px",
                padding: "0 40px",
                background: isScrolled ? "rgba(255,255,255,0.96)" : "#fff",
                backdropFilter: isScrolled ? "blur(12px)" : "none",
                borderBottom: "1px solid rgba(0,0,0,0.1)",
                transition: "all 0.3s ease",
            }}>
                {/* Logo */}
                <Link href="/" style={{
                    fontFamily: "'Barlow Condensed', 'Helvetica Neue', sans-serif",
                    fontSize: "26px",
                    fontWeight: 900,
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    color: "#111",
                    textDecoration: "none",
                    zIndex: 600,
                }}>
                    Vibe
                </Link>

                {/* Desktop Nav links */}
                <ul style={{
                    display: "flex",
                    gap: "32px",
                    listStyle: "none",
                    margin: 0,
                    padding: 0,
                }} className="nav-desktop-links">
                    {navItems.map((item) => (
                        <motion.li key={item.label} whileHover={{ y: -2 }}>
                            <Link
                                href={item.href}
                                style={{
                                    fontSize: "13px",
                                    fontWeight: 700,
                                    letterSpacing: "0.06em",
                                    textTransform: "uppercase",
                                    color: "#111",
                                    textDecoration: "none",
                                    transition: "color 0.15s",
                                }}
                                onMouseEnter={e => (e.currentTarget.style.color = "#e5251a")}
                                onMouseLeave={e => (e.currentTarget.style.color = "#111")}
                            >
                                {item.label}
                            </Link>
                        </motion.li>
                    ))}
                </ul>

                {/* Right side: auth + hamburger */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px", zIndex: 600 }}>
                    {/* Auth — desktop only */}
                    <div className="nav-desktop-auth">
                        {session ? (
                            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                                {/* Profile Dropdown */}
                                <div style={{ position: "relative" }}>
                                    <button
                                        onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                                        style={{
                                            display: "flex", alignItems: "center", gap: "8px",
                                            background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.08)",
                                            padding: "4px 12px 4px 4px", borderRadius: "40px",
                                            cursor: "pointer", transition: "all 0.2s"
                                        }}
                                        onMouseEnter={e => e.currentTarget.style.background = "rgba(0,0,0,0.08)"}
                                        onMouseLeave={e => e.currentTarget.style.background = "rgba(0,0,0,0.04)"}
                                    >
                                        {session.user?.image ? (
                                            <div style={{ position: "relative", width: 32, height: 32 }}>
                                                {/* Fallback initial behind the image in case it breaks */}
                                                <div style={{
                                                    position: "absolute", inset: 0,
                                                    background: "#e5251a", color: "#fff",
                                                    borderRadius: "50%",
                                                    display: "flex", alignItems: "center", justifyContent: "center",
                                                    fontWeight: 700, fontSize: 13, zIndex: 1
                                                }}>
                                                    {session.user?.name?.[0] || "U"}
                                                </div>
                                                <img
                                                    src={session.user.image}
                                                    alt="User"
                                                    referrerPolicy="no-referrer"
                                                    style={{
                                                        position: "relative", zIndex: 2,
                                                        width: "100%", height: "100%",
                                                        borderRadius: "50%", border: "2px solid #fff",
                                                        objectFit: "cover", backgroundColor: "#fff"
                                                    }}
                                                    onError={(e) => {
                                                        // Hide image on error to reveal fallback initial beneath it
                                                        e.currentTarget.style.display = 'none';
                                                    }}
                                                />
                                            </div>
                                        ) : (
                                            <div style={{
                                                width: 32, height: 32, borderRadius: "50%",
                                                background: "#e5251a", color: "#fff",
                                                display: "flex", alignItems: "center", justifyContent: "center",
                                                fontWeight: 700, fontSize: 13, border: "2px solid #fff"
                                            }}>
                                                {session.user?.name?.[0] || <User size={14} />}
                                            </div>
                                        )}
                                        <span style={{ fontSize: 13, fontWeight: 600, color: "#111" }}>
                                            {session.user?.name?.split(" ")[0]}
                                        </span>
                                    </button>

                                    {/* Dropdown Menu */}
                                    <AnimatePresence>
                                        {profileDropdownOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                transition={{ duration: 0.15, ease: "easeOut" }}
                                                style={{
                                                    position: "absolute", top: "calc(100% + 8px)", right: 0,
                                                    width: "200px", background: "#fff",
                                                    borderRadius: "12px", padding: "8px",
                                                    boxShadow: "0 10px 40px rgba(0,0,0,0.12), 0 1px 3px rgba(0,0,0,0.05)",
                                                    border: "1px solid rgba(0,0,0,0.08)",
                                                    display: "flex", flexDirection: "column",
                                                    transformOrigin: "top right"
                                                }}
                                            >
                                                <div style={{ padding: "8px 12px 12px", borderBottom: "1px solid rgba(0,0,0,0.06)", marginBottom: "8px" }}>
                                                    <p style={{ fontSize: "14px", fontWeight: 600, color: "#111", margin: 0 }}>{session.user?.name}</p>
                                                    <p style={{ fontSize: "12px", color: "#757575", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{session.user?.email}</p>
                                                </div>

                                                <Link href="/profile" onClick={() => setProfileDropdownOpen(false)} style={dropdownItemStyle}>
                                                    <User size={14} /> My Profile
                                                </Link>
                                                <Link href="/ideas?filter=mine" onClick={() => setProfileDropdownOpen(false)} style={dropdownItemStyle}>
                                                    <Lightbulb size={14} />
                                                    My Ideas
                                                </Link>
                                                <Link href="/settings" onClick={() => setProfileDropdownOpen(false)} style={dropdownItemStyle}>
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>
                                                    Settings
                                                </Link>

                                                <div style={{ height: "1px", background: "rgba(0,0,0,0.06)", margin: "4px 0" }} />

                                                <button
                                                    onClick={() => { setProfileDropdownOpen(false); signOut(); }}
                                                    style={{ ...dropdownItemStyle, color: "#e5251a" }}
                                                >
                                                    <LogOut size={14} /> Sign out
                                                </button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        ) : (
                            <motion.button
                                onClick={() => setAuthOpen(true)}
                                whileHover={{ scale: 1.05, y: -1 }}
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    background: "#111",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "40px",
                                    padding: "10px 24px",
                                    fontSize: "13px",
                                    fontWeight: 700,
                                    letterSpacing: "0.06em",
                                    textTransform: "uppercase",
                                    cursor: "pointer",
                                    transition: "background 0.2s ease",
                                }}
                                onMouseEnter={e => (e.currentTarget.style.background = "#e5251a")}
                                onMouseLeave={e => (e.currentTarget.style.background = "#111")}
                            >
                                Join the Movement
                            </motion.button>
                        )}
                    </div>

                    {/* Hamburger button — mobile only */}
                    <button
                        className="nav-hamburger"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle menu"
                        style={{
                            display: "none", /* shown via CSS on mobile */
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            padding: "4px",
                            color: "#111",
                            zIndex: 600,
                        }}
                    >
                        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </nav>

            {/* ── Mobile Menu Overlay ── */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        style={{
                            position: "fixed",
                            top: 60,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            zIndex: 499,
                            background: "#fff",
                            display: "flex",
                            flexDirection: "column",
                            padding: "24px 32px 32px",
                        }}
                    >
                        {/* Nav links */}
                        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "4px" }}>
                            {navItems.map((item, i) => (
                                <motion.li
                                    key={item.label}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.06, duration: 0.3 }}
                                >
                                    <Link
                                        href={item.href}
                                        onClick={() => setMobileOpen(false)}
                                        style={{
                                            display: "block",
                                            padding: "16px 0",
                                            fontFamily: "'Barlow Condensed', sans-serif",
                                            fontSize: "28px",
                                            fontWeight: 800,
                                            letterSpacing: "-0.01em",
                                            textTransform: "uppercase",
                                            color: "#111",
                                            textDecoration: "none",
                                            borderBottom: "1px solid rgba(0,0,0,0.06)",
                                            transition: "color 0.15s",
                                        }}
                                    >
                                        {item.label}
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>

                        {/* Divider */}
                        <div style={{ height: "1px", background: "rgba(0,0,0,0.1)", margin: "16px 0 24px" }} />

                        {/* Mobile auth */}
                        {session ? (
                            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                    {session.user?.image ? (
                                        <img
                                            src={session.user.image}
                                            alt="User"
                                            style={{ width: 40, height: 40, borderRadius: "50%", border: "2px solid #eee" }}
                                        />
                                    ) : (
                                        <div style={{
                                            width: 40, height: 40, borderRadius: "50%",
                                            background: "#e5251a", color: "#fff",
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            fontWeight: 700, fontSize: 16,
                                            fontFamily: "'Barlow Condensed', sans-serif",
                                        }}>
                                            {session.user?.name?.[0] || <User size={16} />}
                                        </div>
                                    )}
                                    <div>
                                        <p style={{ fontWeight: 700, fontSize: "15px", color: "#111" }}>{session.user?.name}</p>
                                        <p style={{ fontSize: "13px", color: "#757575" }}>{session.user?.email}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => { signOut(); setMobileOpen(false); }}
                                    style={{
                                        display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                                        background: "none", border: "1.5px solid rgba(0,0,0,0.15)",
                                        borderRadius: "40px", padding: "12px 24px",
                                        fontSize: "13px", fontWeight: 700, letterSpacing: "0.06em",
                                        textTransform: "uppercase", color: "#111",
                                        cursor: "pointer", fontFamily: "'Barlow', sans-serif",
                                    }}
                                >
                                    <LogOut size={16} /> Sign Out
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => { setAuthOpen(true); setMobileOpen(false); }}
                                style={{
                                    background: "#111",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "40px",
                                    padding: "15px 32px",
                                    fontSize: "14px",
                                    fontWeight: 700,
                                    letterSpacing: "0.06em",
                                    textTransform: "uppercase",
                                    cursor: "pointer",
                                    fontFamily: "'Barlow', sans-serif",
                                    width: "100%",
                                    transition: "background 0.2s",
                                }}
                            >
                                Join the Movement
                            </button>
                        )}

                        {/* Bottom tagline */}
                        <p style={{
                            marginTop: "auto",
                            fontSize: "11px",
                            fontWeight: 700,
                            letterSpacing: "0.15em",
                            textTransform: "uppercase",
                            color: "#e5251a",
                            textAlign: "center",
                        }}>
                            Where Ideas Ignite
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Auth Popup */}
            <AuthPopup isOpen={authOpen} onClose={() => setAuthOpen(false)} />

            {/* Red accent line under navbar */}
            <div style={{
                height: "2px",
                width: "100%",
                background: "linear-gradient(90deg, transparent, #e5251a 20%, #ff6b35 50%, #e5251a 80%, transparent)",
                opacity: 0.85,
            }} />
        </>
    );
}