"use client";

import React from "react";
import { motion } from "framer-motion";
import { Linkedin, ArrowUpRightSquare } from "lucide-react"; // Icons

// --- Data Structure for LinkedIn Posts ---
interface LinkedInPost {
    id: string;
    title: string;
    linkedInUrl: string;
    imageUrl: string; // URL to an image you provide for the card (e.g., /images/linkedin/post1.jpg)
    snippet: string;
    datePosted: string; // e.g., "May 2025"
}

// --- Curated LinkedIn Posts Data ---
// ** IMPORTANT: Replace this placeholder data with your actual curated posts! **
// ** Make sure images are placed in your `public` folder (e.g., public/images/linkedin/your-image.jpg) **
// ** and referenced like `/images/linkedin/your-image.jpg` **
const featuredLinkedInPosts: LinkedInPost[] = [
    {
        id: "post1",
        title: "The Docker Architecture simplified!",
        linkedInUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7276190571919024128?utm_source=share&utm_medium=member_desktop&rcm=ACoAADfQWbMBc5v0HbxIScFFVUHIXp3KvdeKNps", // Replace with actual link
        imageUrl: "/assets/Docker_architecute.png", // Replace with your image path e.g. /images/linkedin/devops-2025.jpg
        snippet: "A deep dive into Docker Architecture and its components. Understanding the building blocks of containerization.",
        datePosted: "JAN 2025"
    },
    {
        id: "post2",
        title: "Mastering Kubernetes Architecture",
        linkedInUrl: "https://www.linkedin.com/posts/anil-kumar-b03722221_devops-docker-kubernetes-activity-7265730149076078592-HJrx?utm_source=share&utm_medium=member_desktop&rcm=ACoAADfQWbMBc5v0HbxIScFFVUHIXp3KvdeKNps",
        imageUrl: "/assets/K8S_architecture.png", // Replace with your image path
        snippet: "Logical separation of Kubernetes components and their roles. A visual guide to understanding Kubernetes architecture.",
        datePosted: "DEC 2024"
    },
    {
        id: "post3",
        title: "Controlling the load with K8S Ingress",
        linkedInUrl: "https://www.linkedin.com/posts/anil-kumar-b03722221_k8s-activity-7279441088916963328-83gd?utm_source=share&utm_medium=member_desktop&rcm=ACoAADfQWbMBc5v0HbxIScFFVUHIXp3KvdeKNps",
        imageUrl: "/assets/K8S_Ingress.jpg", // Replace with your image path
        snippet: "A deep dive into Kubernetes Ingress controllers and their role in managing external access to services. Learn how to control the load effectively.",
        datePosted: "Feb 2025"
    },
    {
        id: "post4",
        title: "Understanding K8S Namespaces and their role in resource isolation",
        linkedInUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7284510670996303872?utm_source=share&utm_medium=member_desktop&rcm=ACoAADfQWbMBc5v0HbxIScFFVUHIXp3KvdeKNps",
        imageUrl: "/assets/K8S_ns.jpg", // Replace with your image path
        snippet: "A deep dive into Kubernetes Namespaces and their role in resource isolation. Learn how to effectively manage resources in a multi-tenant environment.",
        datePosted: "Mar 2025"
    },
    {
        id: "post5",
        /*k8s pv*/
        title: "Mastering Kubernetes Persistent Volumes and Claims",
        linkedInUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7305847007389040640?utm_source=share&utm_medium=member_desktop&rcm=ACoAADfQWbMBc5v0HbxIScFFVUHIXp3KvdeKNps",
        imageUrl: "assets/K8S_PV.png", // Replace with your image path
        snippet: "A deep dive into Kubernetes Persistent Volumes and Claims. Learn how to manage storage in a Kubernetes cluster effectively.",
        datePosted: "Mar 2025"
    },
    // Add 1-3 more of your curated posts here for a good initial display
    // {
    //     id: "post4",
    //     title: "...",s
    //     linkedInUrl: "...",
    //     imageUrl: "/placeholder-linkedin-4.jpg",
    //     snippet: "...",
    //     datePosted: "..."
    // },
];
// ** End of LinkedIn Posts Data **


// --- Post Card Component ---
const PostCard = ({ post }: { post: LinkedInPost }) => {
    const cardVariants = {
        initial: { opacity: 0, y: 30, scale: 0.95 },
        animate: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 100, damping: 15 } },
    };

    const hoverVariants = {
        hover: {
            scale: 1.03,
            // rotateX: 5, // Subtle 3D tilt
            // rotateY: -5,
            boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.4)",
            transition: { type: 'spring', stiffness: 200, damping: 10 }
        }
    };

    return (
        <motion.a
            href={post.linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="linkedin-post-card"
            variants={cardVariants} // For grid stagger
            whileHover="hover"
            // initial="initial" // Not needed if parent handles stagger variants
            // animate="animate"
            style={{ perspective: 800 }} // Apply perspective for 3D hover effect on child
        >
            <motion.div className="card-inner" variants={hoverVariants}> {/* Apply hover animation to inner div */}
                <div className="card-image-container">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={post.imageUrl} alt={post.title} className="card-image" />
                    <div className="card-image-overlay">
                        <ArrowUpRightSquare size={24} />
                        <span>Read on LinkedIn</span>
                    </div>
                </div>
                <div className="card-content">
                    <span className="card-date">{post.datePosted}</span>
                    <h3 className="card-title">{post.title}</h3>
                    <p className="card-snippet">{post.snippet}</p>
                </div>
            </motion.div>
        </motion.a>
    );
};


// --- Main LinkedIn Insights Section Component ---
const LinkedInInsights = () => {
    const sectionVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delay: 0.2,
                staggerChildren: 0.15, // Stagger animation of child elements (grid items)
            },
        },
    };

    return (
        <section className="linkedin-insights-section temporal-flux-theme">
            <motion.div
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
                <h2 className="linkedin-insights-title">
                    <Linkedin size={36} style={{ marginRight: '0.75rem', verticalAlign: 'bottom' }} />
                    LinkedIn Insights & Articles
                </h2>
            </motion.div>

            {featuredLinkedInPosts.length > 0 ? (
                <motion.div
                    className="linkedin-insights-grid"
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible" // Animate when grid comes into view
                    viewport={{ once: true, amount: 0.1 }} // Adjust amount needed in view
                >
                    {featuredLinkedInPosts.map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </motion.div>
            ) : (
                <p className="no-posts-message">No featured posts at the moment. Check back soon!</p>
            )}

            <motion.a
                href="https://www.linkedin.com/in/anil-kumar-b03722221/" // ** REPLACE with your actual LinkedIn Profile URL **
                target="_blank"
                rel="noopener noreferrer"
                className="view-all-linkedin-button"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ type: "spring", stiffness: 150, damping: 15, delay: 0.5 }}
                whileHover={{ scale: 1.05, backgroundColor: "var(--ide-accent-secondary, #50fa7b)", color: "var(--bg-color, #0B0B10)" }}
            >
                View All My Posts on LinkedIn <ArrowUpRightSquare size={18} style={{ marginLeft: '0.5rem' }}/>
            </motion.a>
        </section>
    );
};

export default LinkedInInsights;