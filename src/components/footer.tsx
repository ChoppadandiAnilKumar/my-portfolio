"use client"; // Needed for framer-motion hover effects

import React from "react";
import { motion } from "framer-motion";
import { Linkedin, Instagram, Mail, Phone, GithubIcon } from "lucide-react"; // Using Phone for WhatsApp for now

const Footer = () => {
    const currentYear = new Date().getFullYear();

    // --- IMPORTANT: Replace placeholders with your actual links/info ---
    const linkedInUrl = "https://www.linkedin.com/in/anil-kumar-b03722221/"; // Replace!
    const instagramUrl = "https://www.instagram.com/anilkumar_ofcl?igsh=enViemc5Mjc1bHow"; // Replace!
    const emailAddress = "anilsa7989@gmail.com"; // Replace!
    const whatsappNumber = "917989310156"; // Replace with your number including country code (e.g., 91 for India) but NO + or spaces
    const githubUrl = "https://github.com/Anil-KumarCH";
    // --- End Placeholders ---

    const whatsappUrl = `https://wa.me/${whatsappNumber}`;

    const iconHoverEffect = {
        y: -4, // Move up slightly
        scale: 1.15,
        color: "var(--text-highlight-color, #ffffff)", // Brighter color on hover
        transition: { type: "spring", stiffness: 300, damping: 15 }
    };

    const iconVariants = {
      hidden: { opacity: 0, y: 10 },
      visible: { opacity: 1, y: 0 }
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.1 }
        }
    };

    return (
        <footer className="footer-section temporal-flux-theme">
            <motion.div
                className="footer-container"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={containerVariants}
            >
                <div className="footer-social-links">
                    {/* LinkedIn */}
                    <motion.a
                        href={linkedInUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn Profile"
                        title="LinkedIn"
                        variants={iconVariants}
                        whileHover={iconHoverEffect}
                    >
                        <Linkedin size={24} />
                    </motion.a>

                    {/* Instagram */}
                    <motion.a
                        href={instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram Profile"
                        title="Instagram"
                         variants={iconVariants}
                        whileHover={iconHoverEffect}
                    >
                        <Instagram size={24} />
                    </motion.a>

                    {/* Email */}
                    <motion.a
                        href={`mailto:${emailAddress}`}
                        aria-label="Send Email"
                        title="Email"
                        variants={iconVariants}
                        whileHover={iconHoverEffect}
                    >
                        <Mail size={24} />
                    </motion.a>

                    {/* WhatsApp */}
                    <motion.a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Chat on WhatsApp"
                        title="WhatsApp"
                        variants={iconVariants}
                        whileHover={iconHoverEffect}
                    >
                        {/* Using Phone icon as a common representation */}
                        <Phone size={24} />
                    </motion.a>
                    {/* GitHub */}
                    <motion.a
                        href={githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub Profile"
                        title="GitHub"
                        variants={iconVariants}
                        whileHover={iconHoverEffect}
                    >
                        <GithubIcon size={24} />
                    </motion.a>
                </div>

                <motion.div
                    className="footer-copyright"
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     transition={{ delay: 0.5, duration: 0.5 }}
                >
                    © {currentYear} Anil Kumar. All Rights Reserved. <br />
                    Built with Next.js & Passion | Hyderabad, India.
                </motion.div>
            </motion.div>
        </footer>
    );
};

export default Footer;