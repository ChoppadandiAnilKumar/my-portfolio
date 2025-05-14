"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link"; // Use Next.js Link
import Image from "next/image";
import {
    FaHome, FaUser, FaGraduationCap, FaBriefcase, FaChartLine,
    FaLinkedin, FaDev, FaEnvelope, FaBars, FaTimes
} from "react-icons/fa";

interface MenuItem {
    name: string;
    icon: React.ComponentType<{ className?: string }>;
    link: string;
}

const menuItems: MenuItem[] = [
    { name: "Home", icon: FaHome, link: "#Hero" },
    { name: "About", icon: FaUser, link: "#AboutMe" },
    { name: "Education", icon: FaGraduationCap, link: "#EducationSection" },
    { name: "Projects", icon: FaBriefcase, link: "#ProjectsSection" },
    { name: "Skills", icon: FaChartLine, link: "#SkillNebulaV3" },
    { name: "LinkedIn", icon: FaLinkedin, link: "#LinkedInInsights" },
    { name: "Dev.to", icon: FaDev, link: "#DevToSection" },
    { name: "Contact", icon: FaEnvelope, link: "#ContactForm" },
];

const Navbar = () => {
    const [activeSection, setActiveSection] = useState("Hero");
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleScroll = useCallback(() => {
        const currentScrollPos = window.scrollY;
        const scrolled = currentScrollPos > 50;
        if (isScrolled !== scrolled) {
            setIsScrolled(scrolled);
        }

        let currentSectionId = "";
        for (let i = menuItems.length - 1; i >= 0; i--) {
            const item = menuItems[i];
            const sectionElement = document.getElementById(item.link.substring(1));
            if (sectionElement) {
                const navbarHeightOffset = scrolled ? 60 : 70;
                const sectionTop = sectionElement.offsetTop - navbarHeightOffset - (window.innerHeight * 0.3);
                if (currentScrollPos >= sectionTop) {
                    currentSectionId = item.link.substring(1);
                    break;
                }
            }
        }
        
        if (!currentSectionId && currentScrollPos < window.innerHeight * 0.4) {
            currentSectionId = "Hero";
        }

        if (currentSectionId && activeSection !== currentSectionId) {
            setActiveSection(currentSectionId);
        }
    }, [isScrolled, activeSection]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    useEffect(() => {
        const closeMenuOnScrollHandler = () => {
            if (isMobileMenuOpen) {
                setIsMobileMenuOpen(false);
            }
        };
        if (isMobileMenuOpen) {
            window.addEventListener('scroll', closeMenuOnScrollHandler, { once: true });
        }
        return () => {
            window.removeEventListener('scroll', closeMenuOnScrollHandler);
        };
    }, [isMobileMenuOpen]);

    // Modified handleLinkClick to not expect event from <a> if Link handles it
    const handleLinkClick = (sectionIdWithHash: string) => {
        // e.preventDefault(); // No longer needed if Link handles navigation
        const sectionId = sectionIdWithHash.substring(1);
        setActiveSection(sectionId);
        setIsMobileMenuOpen(false);
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    };

    const mobileMenuVariants = {
        hidden: { x: "100%", opacity: 0.9, transition: { type: "tween", ease: "easeInOut", duration: 0.25 } },
        visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 110, damping: 22, mass: 0.9 } },
        exit: { x: "100%", opacity: 0.9, transition: { type: "tween", ease: "easeInOut", duration: 0.3, delay:0.05 } }
    };

    // navItemHover will be applied to a motion.div inside Link
    const navItemContentHover = {
        y: -2,
        transition: { type: "spring", stiffness: 400, damping: 10 }
    };

    const hamburgerIconTransition = { duration: 0.2, ease: "easeInOut" };
    const hamburgerIconVariants = {
        initial: { opacity: 0, scale: 0.6 },
        animate: { opacity: 1, scale: 1, transition: hamburgerIconTransition },
        exit: { opacity: 0, scale: 0.6, transition: { ...hamburgerIconTransition, duration: 0.15} }
    };

    return (
        <motion.nav
            className={`navbar-container ${isScrolled ? "scrolled" : "not-scrolled"}`}
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.3, duration: 0.5 }}
        >
            <div className="navbar-content">
                {/* Link itself is the anchor, onClick for smooth scroll */}
                <Link 
                    href="#Hero" 
                    onClick={(e) => { e.preventDefault(); handleLinkClick("#Hero");}} 
                    className="navbar-logo"
                >
                    <Image
                        src="/assets/portfolio_logo.png"
                        alt="Anil Kumar Logo"
                        width={120}
                        height={40}
                        className="logo-image"
                        priority
                    />
                </Link>

                <div className="navbar-desktop-links">
                    {menuItems.map((item) => {
                        const IconComponent = item.icon;
                        return (
                            <Link
                                key={item.name}
                                href={item.link}
                                onClick={(e) => { e.preventDefault(); handleLinkClick(item.link);}}
                                className={`nav-item ${activeSection === item.link.substring(1) ? "active" : ""}`}
                            >
                                {/* Wrap content in motion.div for hover animation */}
                                <motion.div 
                                    className="nav-item-content-wrapper" // Add a class for flex styling
                                    whileHover={navItemContentHover}
                                >
                                    <IconComponent className="nav-icon" />
                                    <span className="nav-item-text">{item.name}</span>
                                    {activeSection === item.link.substring(1) && (
                                        <motion.div
                                            className="active-pill"
                                            layoutId="activeSectionPill"
                                            transition={{ type: "spring", stiffness: 380, damping: 30, mass:0.7 }}
                                        />
                                    )}
                                </motion.div>
                            </Link>
                        );
                    })}
                </div>

                <div className="navbar-mobile-toggle">
                    {/* ... Hamburger Button logic remains the same ... */}
                    <motion.button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="hamburger-button"
                    >
                        <AnimatePresence mode="wait" initial={false}>
                            {isMobileMenuOpen ? (
                                <motion.div key="times" variants={hamburgerIconVariants} initial="initial" animate="animate" exit="exit" >
                                    <FaTimes size={22} />
                                </motion.div>
                            ) : (
                                <motion.div key="bars" variants={hamburgerIconVariants} initial="initial" animate="animate" exit="exit" >
                                    <FaBars size={22} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.button>
                </div>
            </div>

            {/* Mobile Slide-Out Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            className="mobile-menu-overlay"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                        />
                        <motion.div
                            className="mobile-menu"
                            variants={mobileMenuVariants}
                            initial="hidden" animate="visible" exit="exit"
                        >
                            <div className="mobile-menu-header">
                                <span>Navigation</span>
                                <button onClick={() => setIsMobileMenuOpen(false)} aria-label="Close menu" className="close-mobile-menu-btn">
                                    <FaTimes size={20} />
                                </button>
                            </div>
                            {menuItems.map((item, index) => {
                                const IconComponent = item.icon;
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.link}
                                        onClick={(e) => { e.preventDefault(); handleLinkClick(item.link);}}
                                        className={`mobile-nav-item ${activeSection === item.link.substring(1) ? "active" : ""}`}
                                    >
                                        {/* Wrap content in motion.div for entry animation */}
                                        <motion.div 
                                            className="nav-item-content-wrapper" // Use same class for consistency
                                            initial={{ opacity: 0, x: 30 }} // Adjusted initial for mobile
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.1 + index * 0.06, type: "spring", stiffness: 120, damping: 20 }}
                                        >
                                            <IconComponent className="nav-icon" />
                                            <span className="nav-item-text">{item.name}</span>
                                        </motion.div>
                                    </Link>
                                );
                            })}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
