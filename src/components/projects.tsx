"use client";

import { useState, useRef, useEffect, useCallback } from "react"; // Added useCallback
import { useInView, motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Image from "next/image";
// Assuming globals.css is imported at a higher level (e.g., in layout.tsx or page.tsx)
// If not, you might need: import "../../styles/globals.css";

type Project = {
    id: number;
    title: string;
    shortDesc: string;
    longDesc: string;
    duration: string;
    responsibilities: string[];
    skills: string[];
    achievements: string[];
    smallImage: string;
    bigImage: string;
};

// Ensure your image paths in 'public' folder are correct
const projects: Project[] = [
    {
        id: 1,
        title: "Total Absence Management @ NareshIT",
        shortDesc: "Automated AI-based CI/CD pipelines with Azure by connecting GitHub.",
        longDesc: "Deployed a tier-3 E-commerce website using deployment slots in Azure.",
        duration: "May 2022 - Nov 2022",
        responsibilities: [
            "1️⃣Created and configured App Services, Sql Databases, storage accounts",
            "2️⃣Configured VM's and Azure AD for authentication",
            "3️⃣Configured build and release pipelines in Azure DevOps",
            "4️⃣Integrated Azure Monitor and Application Insights",
            "5️⃣Azure Integration with Docker and Kubernetes",
        ],
        skills: ["SDLC", "CI/CD", "Azure DevOps", "GitHub", "Docker", "Kubernetes"],
        achievements: [
            "Reduced deployment failures by 30%",
            "Saved 100+ hours of manual operations",
        ],
        smallImage: "/assets/NareshIT.png", // Example: public/assets/NareshIT.png
        bigImage: "/assets/NareshIT_big.png", // Example: public/assets/NareshIT_big.png
    },
    {
        id: 2,
        title: "Freelance Trainer @ NareshIT",
        shortDesc: "Provided training on Azure DevOps and CI/CD.",
        longDesc: "Provided training on Azure DevOps to US clients and clients across India. \n Conducted the hands-on sessions on Azure DevOps, CICD with GitHub. \n Interpersonal communication training sessions for job aspirants.",
        duration: "Jan 2022 - Sep 2023",
        responsibilities: [
            "1️⃣Conducted hands-on sessions on Azure DevOps",
            "2️⃣Provided training on CI/CD with GitHub",
            "3️⃣Client focused training sessions.",
            "4️⃣Conducted interpersonal communication training sessions",
            "5️⃣Conducted mock interviews for job aspirants",
        ],
        skills: ["Azure DevOps", "GitHub", "CI/CD", "Interpersonal Communication", "Interview Preparation"],
        achievements: [
            "Client satisfaction and positive feedback",
            "Conducted 20+ training sessions",
        ],
        smallImage: "/assets/NareshIT.png", // Replace with actual image path
        bigImage: "/assets/NareshIT_big.png",     // Replace with actual image path
    },
    {
        id: 3,
        title: "EIP CICD project @ AXA",
        shortDesc: "Established CI/CD pipelines for AXA's EIP project.",
        longDesc: "Implemented CI/CD pipelines for application deployment. Followed GitOps principles to deploy the application into OpenShift.",
        duration: "Dec 2023 - Jun 2024",
        responsibilities: [
            "1️⃣ Established a complete end-to-end CI/CD pipelines using Jenkins and ArgoCD for dev/pre-prod/prod environments in OpenShift",
            "2️⃣ Troubleshooted and resolved integration and deployment issues",
            "3️⃣ Implemented dynamic pipelines for CD process using ArgoCD",
            "4️⃣ Configured multiple tools like GitHub, Jenkins, SonarQube, Helm, and JFrog Artifactory for CI and OpenShift & ArgoCD for CD",


        ],
        skills: ["CI/CD", "GitOps", "Jenkins", "ArgoCD", "OpenShift", "SonarQube", "JFrog Artifactory", "Helm", "GitHub"],
        achievements: [
            "Led a team of experienced professionals to implement CI/CD pipelines within a short period of time.",
            "Achieved 99% deployment success rate.",
            "Researched and found solutions for complex deployment issues in ArgoCD.",
        ],
        smallImage: "/assets/AXA_Logo.png", // Assuming this is a placeholder, replace
        bigImage: "/assets/AXA_big.png",   // Assuming this is a placeholder, replace
    },
    {
        id: 4,
        title: "GitHub Project @ AXA",
        shortDesc: "Conditional file deployment into Linux server ",
        longDesc: "Deployed configuration files into Linux server based on the file change and folder change type.",
        duration: "Jul 2024 - Oct 2024",
        responsibilities: [
            "1️⃣ Created a Jenkins pipeline to deploy configuration files into Linux server",
            "2️⃣ Implemented conditional deployment based on file and folder changes",
            "3️⃣ Integrated GitHub with Jenkins for CI/CD",
            "4️⃣ Configured webhooks for real-time deployment triggers",
        ],
        skills: ["Jenkins", "GitHub", "Linux", "CI/CD", "Webhooks"],
        achievements: [
            "Deployed configuration files into Linux server in real-time",
            "Reduced upgradatuon time by 50%",
            "Improved deployment accuracy and reduced errors",
        ],
        smallImage: "/assets/AXA_Logo.png", // Replace
        bigImage: "/assets/AXA_big.png",   // Replace
    },
    {
        id: 5,
        title: "YARA International @ YARA",
        shortDesc: "Automation of AVD and infrastructure deployment.",
        longDesc: "Automated the deployment of Azure Virtual Desktop and automated the patching using the Powershell, Bicep and Azure Pipelines.",
        duration: "Nov 2024 - Current",
        responsibilities: [
            "1️⃣ Automated the deployment of Azure Virtual Desktop",
            "2️⃣ Automated the patching of AVD using Powershell and Azure Pipelines",
            "3️⃣ Created Bicep templates for infrastructure deployment",
            "4️⃣ ",
        ],
        skills: ["Powershell", "Bicep", "Azure Pipelines", "Azure Virtual Desktop"],
        achievements: [
            "Implemented automation for AVD deployment and patching.",
            "Reduced manual effort by 80%.",
            "Improved the automation process and reduced errors.",
        ],
        smallImage: "/assets/YARA_logo.png", // Assuming placeholder, replace
        bigImage: "/assets/YARA_big.png",   // Assuming placeholder, replace
    },
    {
        id: 6,
        title: "My Portfolio Website @ TCS and Personal",
        shortDesc: "Developed a personal portfolio website using React and Next.js.",
        longDesc: "Created a personal portfolio website to showcase my projects and experience. \n Deployed using multiple devOps tools.",
        duration: "Feb 2025 - May 2025",
        responsibilities: [
            "1️⃣ Designed and developed the website using React and Next.js",
            "2️⃣ Implemented responsive design for mobile and desktop views",
            "3️⃣ Version controlled the project using Git, Implemented CI with Jenkins, CD with ArgoCD, templated by HELM, Imaged by Docker and deployed in AKS.",
            "4️⃣ Established a Secure CICD pipeline using Github and Azure DevOps",
        ],  
        skills: ["Git", "GitHub", "Jenkins", "SonarQube", "HELM","Docker", "ArgoCD", "Kubernetes", "AKS"],
        achievements: [
            "Implemented a fully functional portfolio website.",
            "Showcased my projects and experience effectively.",
            "Implemented a highly secure CICD pipeline with industry's best practices.",
        ],
        smallImage: "/assets/tcslogo.png", // Assuming placeholder, replace
        bigImage: "/assets/TCS_big.png",   // Assuming placeholder, replace
    },
];

export default function ProjectsSection() {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [showFullDetails, setShowFullDetails] = useState(false);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const titleInView = useInView(titleRef, { once: true, amount: 0.3 });
    const carouselRef = useRef<HTMLDivElement>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const scroll = (direction: "left" | "right") => {
        if (carouselRef.current) {
            const cardElement = carouselRef.current.querySelector('.project-card-small');
            const cardWidth = cardElement ? cardElement.clientWidth : 100; // Default width if not found
            const gap = cardElement ? parseFloat(getComputedStyle(cardElement).marginRight) : 8; // Get actual margin
            const scrollAmount = cardWidth + gap;
            const { scrollLeft } = carouselRef.current;
            carouselRef.current.scrollTo({
                left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
                behavior: "smooth",
            });
        }
    };

    const startAutoSwitch = useCallback(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setSelectedIndex((prev) => (prev + 1) % projects.length);
            setShowFullDetails(false);
        }, 7000);
    }, []); // projects.length is stable within this component's lifecycle

    const handleCardClick = (index: number) => {
        setSelectedIndex(index);
        setShowFullDetails(false);
        startAutoSwitch();
    };

    const handleReadMoreClick = () => {
        setShowFullDetails(true);
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    useEffect(() => {
        startAutoSwitch();
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [startAutoSwitch]);

    const selectedProject = projects[selectedIndex];

    if (!selectedProject) {
        return (
            <section id="projects" className="projects-section">
                <div className="container">
                     <motion.h2 className="project-title" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Projects & Experience</motion.h2>
                     <p style={{color: 'white', textAlign: 'center'}}>No projects to display at the moment.</p>
                </div>
            </section>
        );
    }

    return (
        <section id="projects" className="projects-section">
            <div className="container">
                <motion.h2
                    ref={titleRef}
                    initial={{ opacity: 0, y: 30 }}
                    animate={titleInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="project-title"
                >
                    Projects & Experience
                </motion.h2>

                <div className="big-box">
                    <div className="background-image">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedProject.bigImage}
                                initial={{ opacity: 0, scale: 1.05 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.7, ease: "easeInOut" }}
                                className="background-inner"
                            >
                                <Image
                                    src={selectedProject.bigImage}
                                    alt={selectedProject.title}
                                    fill
                                    style={{ objectFit: "cover" }} // Ensures image covers the area
                                    priority={selectedIndex === 0}
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px" // More refined sizes
                                />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                    
                    <div className="left-gradient" />
                    <div className="bottom-gradient" />

                    <div className="big-box-content-overlay">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedProject.id + (showFullDetails ? "-full" : "-short")}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5, ease: "circOut" }}
                                className="content-wrapper" 
                            >
                                <h3 className="big-box-title">{selectedProject.title}</h3>

                                {!showFullDetails ? (
                                    <>
                                        <p className="big-box-description">{selectedProject.shortDesc}</p>
                                        <motion.button
                                            onClick={handleReadMoreClick}
                                            className="read-more-button"
                                            whileHover={{ scale: 1.05, y: -1 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            Read More
                                        </motion.button>
                                    </>
                                ) : (
                                    <div className="full-description">
                                        <p>{selectedProject.longDesc}</p>
                                        <p><strong>Duration:</strong> {selectedProject.duration}</p>
                                        <p><strong>Responsibilities:</strong></p>
                                        <ul>
                                            {selectedProject.responsibilities.map((res, idx) => (
                                                <li key={idx}>{res}</li>
                                            ))}
                                        </ul>
                                        <p><strong>Skills:</strong> {selectedProject.skills.join(", ")}</p>
                                        <p><strong>Achievements:</strong></p>
                                        <ul>
                                            {selectedProject.achievements.map((ach, idx) => (
                                                <li key={idx}>{ach}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="carousel-overlay">
                        <motion.button
                            onClick={() => scroll("left")}
                            className="arrow-button left"
                            aria-label="Scroll Left"
                            whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.3)"}}
                            whileTap={{ scale: 0.9 }}
                        >
                            <FaChevronLeft size={18} />
                        </motion.button>

                        <motion.div
                            ref={carouselRef}
                            className="carousel"
                            whileTap={{ cursor: "grabbing" }}
                        >
                            <div className="carousel-inner"> {/* Keep this a plain div for layout */}
                                {projects.map((project, idx) => (
                                    <motion.div
                                        key={project.id}
                                        className={`project-card-small ${
                                            selectedIndex === idx ? "active" : ""
                                        }`}
                                        whileHover={{ scale: 1.08, y: -3, boxShadow: "0px 4px 12px rgba(0,0,0,0.3)" }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => handleCardClick(idx)}
                                        transition={{ type: "spring", stiffness: 300, damping: 10 }}
                                    >
                                        <Image
                                            src={project.smallImage}
                                            alt={project.title}
                                            width={100}
                                            height={60}
                                            className="small-project-image"
                                            priority={idx < 3} // Prioritize first few small images
                                            sizes="100px" // Simple size for small images
                                        />
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.button
                            onClick={() => scroll("right")}
                            className="arrow-button right"
                            aria-label="Scroll Right"
                            whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.3)"}}
                            whileTap={{ scale: 0.9 }}
                        >
                            <FaChevronRight size={18} />
                        </motion.button>
                    </div>
                </div>
            </div>
        </section>
    );
}
