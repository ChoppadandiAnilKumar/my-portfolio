"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Zap } from "lucide-react"; // Using Lucide icons for consistency

// Data for the tabs
const aboutMeTabsData = [
    {
        id: "about",
        label: "About Me",
        icon: <User size={16} style={{ marginRight: '0.4em' }} />, // Added icon
        content: `~ As an AI-Driven DevOps Engineer at TCS, I specialize in designing and implementing seamless CI/CD pipelines and cloud-native architectures that enhance deployment speed, efficiency, and reliability. By integrating Artificial Intelligence (AI), Generative AI, and Prompt Engineering into DevOps workflows, I optimize processes for improved automation, security, and operational efficiency.`,
    },
    {
        id: "connect",
        label: "Why Connect With Me?",
        icon: <Zap size={16} style={{ marginRight: '0.4em' }} />, // Added icon
        content: `✅ I am passionate about leveraging AI and automation to redefine DevOps efficiency. With the ability to handle tasks typically managed by multiple team members, I bring valuable insights, innovative methodologies, and industry-best security practices to optimize your organization's DevOps ecosystem.`,
    },
];

export default function AboutMeSection() {
    // Initialize with the ID of the first tab to ensure consistent initial server/client state
    const [activeTab, setActiveTab] = useState(aboutMeTabsData[0].id);

    // Find the currently active tab's data object for rendering content
    const currentActiveTabData = aboutMeTabsData.find(tab => tab.id === activeTab);

    return (
        <section className="aboutme-wrapper"> {/* Ensure this class is defined in your CSS */}
            {/* Tabs Navigation */}
            <div className="chrome-tabs" 
                 // *** FIX: Added suppressHydrationWarning to the button container ***
                 // This helps when browser extensions add attributes like fdprocessedid
                 suppressHydrationWarning={true}
            >
                {aboutMeTabsData.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`chrome-tab ${activeTab === tab.id ? "active" : ""}`}
                        // The fdprocessedid attribute is added by browser extensions, not your React code.
                        // suppressHydrationWarning on the parent div handles this.
                    >
                        {tab.icon} {/* Render icon */}
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="chrome-tab-content">
                <AnimatePresence mode="wait">
                    {/*
                      *** IMPROVEMENT: Using a single motion.div with a changing key ***
                      This is a more robust pattern for AnimatePresence when switching
                      between distinct content items. Framer Motion will correctly
                      animate out the old content and animate in the new content.
                    */}
                    {currentActiveTabData && ( // Ensure currentActiveTabData exists before rendering
                        <motion.div
                            key={currentActiveTabData.id} // Key change triggers enter/exit animations
                            initial={{ opacity: 0, y: 25 }} // Slightly adjusted initial y
                            animate={{ opacity: 1, y: 0 }}   // Animation to visible state
                            exit={{ opacity: 0, y: -25 }}    // Adjusted exit y
                            transition={{ duration: 0.35, ease: "easeInOut" }} // Slightly adjusted transition
                        >
                            {/* You can choose to display the tab label as a heading or not */}
                            {/* <h2 className="aboutme-heading">{currentActiveTabData.label}</h2> */}
                            
                            {/* Split content by newlines for paragraph breaks if your content string has them */}
                            {currentActiveTabData.content.split('\n').map((paragraph, index) => (
                                <p key={index} className="aboutme-text">
                                    {paragraph.trim() ? paragraph : <>&nbsp;</>} {/* Render non-breaking space for empty lines if any */}
                                </p>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
