"use client";

import React, { useState, useRef, useMemo, Suspense, useEffect, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, Billboard } from "@react-three/drei";
import { motion } from "framer-motion-3d";
import { useMotionValue, useSpring, motion as motion2d, AnimatePresence } from "framer-motion";
import * as THREE from "three";
import { Star, GitBranch, Github, RefreshCw, Settings, Box, Ship, Combine, CloudCog, Workflow, Users, CheckCircle, TerminalSquare as DevOpsIcon, Activity, XCircle, Zap, Network } from "lucide-react";

// --- Data Structure ---
interface SkillData3D {
    id: string;
    name: string;
    icon?: React.ReactNode;
    rating: number;
    details: string;
    category: 'Methodology' | 'Version Control' | 'CI/CD & Automation' | 'Code Quality' | 'Containers & Orchestration' | 'Cloud Platform';
    position?: [number, number, number];
}

// --- Skills Data ---
const skillsData: SkillData3D[] = [
    { id: "devops_culture", name: "DevOps Culture", icon: <DevOpsIcon size={20}/>, rating: 5, details: "Leveraging the best outcomes by following the best practices of DevOps.", category: "Methodology" },
    { id: "agile", name: "Agile", icon: <Users size={20}/>, rating: 5, details: "Implementing the Agile Methodology to embrace the best practices.", category: "Methodology" },
    { id: "sdlc", name: "SDLC Opt.", icon: <Workflow size={20}/>, rating: 5, details: "Implementing SDLC phases at each phase of the project lifecycle.", category: "Methodology" },
    { id: "cicd_principles", name: "CI/CD Principles", icon: <RefreshCw size={20}/>, rating: 5, details: "Designing and building secured CI/CD pipelines.", category: "CI/CD & Automation" },
    { id: "git_github", name: "Git & GitHub", icon: <Github size={22}/>, rating: 5, details: "excelled in Distributed Version Control System like Git and GitHub.", category: "Version Control" },
    { id: "jenkins", name: "Jenkins", icon: <Settings size={22}/>, rating: 4, details: "Managed Jenkins instances, creating secured CI/CD pipelinesd.", category: "CI/CD & Automation" },
    { id: "azure_devops", name: "Azure DevOps", icon: <CloudCog size={22}/>, rating: 4, details: "Excelling in cloud platforms like Azure.", category: "CI/CD & Automation" },
    { id: "argocd", name: "Argo CD", icon: <RefreshCw size={22}/>, rating: 4, details: "Implemented GitOps workflows using Argo CD by finding new ways of implementation.", category: "CI/CD & Automation" },
    { id: "sonarqube", name: "SonarQube", icon: <CheckCircle size={22}/>, rating: 4, details: "Integrated SonarQube for code quality and Code smell.", category: "Code Quality" },
    { id: "docker", name: "Docker", icon: <Box size={24}/>, rating: 5, details: "Developed optimized Dockerfiles, managed images securely.", category: "Containers & Orchestration" },
    { id: "kubernetes", name: "Kubernetes", icon: <Ship size={24}/>, rating: 5, details: "Deployed, managed, scaled applications on K8S securely by following the best practices.", category: "Containers & Orchestration" },
    { id: "helm", name: "Helm", icon: <Ship size={20}/>, rating: 4, details: "Created Helm charts for templating K8s apps and deployed them as multiple source of truth.", category: "Containers & Orchestration" },
    { id: "openshift", name: "OpenShift", icon: <Combine size={24}/>, rating: 3, details: "Worked with OpenShift for enterprise K8s and integrated ArgoCD for CD.", category: "Containers & Orchestration" },
];

// --- Constants ---
const BASE_SPHERE_RADIUS = 3.8;
const BASE_ROTATION_SPEED_DPS = 7;
const DRAG_SENSITIVITY = 0.22;
const CATEGORY_COLORS: Record<SkillData3D['category'], string> = {
    'Methodology': '#f07178', 'Version Control': '#c3e88d', 'CI/CD & Automation': '#89ddff',
    'Code Quality': '#ffcb6b', 'Containers & Orchestration': '#c792ea', 'Cloud Platform': '#ff9cac',
};
const DEFAULT_COLOR = '#ffffff';
const MOBILE_BREAKPOINT = 880;

// --- Helper: Spherical Coords ---
function getSphericalPosition(index: number, count: number, radius: number): [number, number, number] {
    const phi = Math.acos(-1 + (2 * index) / (Math.max(1, count - 1)));
    const theta = Math.sqrt(Math.max(1, count) * Math.PI) * phi;
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);
    return [x, y, z];
}

// --- Helper Hook: Screen Size ---
const useIsMobile = (breakpoint = MOBILE_BREAKPOINT) => {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const checkScreenSize = () => setIsMobile(window.innerWidth < breakpoint);
        if (typeof window !== "undefined") { // Ensure window is available
            checkScreenSize();
            window.addEventListener('resize', checkScreenSize);
            return () => window.removeEventListener('resize', checkScreenSize);
        }
    }, [breakpoint]);
    return isMobile;
};

// --- Components ---
const RatingStarsHTML = ({ rating }: { rating: number }) => (
    <div className="nebula-rating">
        {[...Array(5)].map((_, i) => ( <Star key={i} size={14} className={`nebula-rating-star ${i < rating ? 'filled' : ''}`} strokeWidth={2}/> ))}
    </div>
);

const SkillNode3D = ({ skill, onHover, onClick, isHovered, isSelected }: {
    skill: SkillData3D & { position: [number, number, number] };
    onHover: (id: string | null) => void;
    onClick: (skill: SkillData3D) => void;
    isHovered: boolean;
    isSelected: boolean;
}) => {
    const scale = isSelected ? 1.35 : (isHovered ? 1.2 : 1);
    const color = CATEGORY_COLORS[skill.category] || DEFAULT_COLOR;
    const nodeRef = useRef<THREE.Group>(null!);
    useFrame(({ camera }) => { if (nodeRef.current) nodeRef.current.lookAt(camera.position); });
    return (
        <motion.group ref={nodeRef} position={skill.position} onPointerOver={(e) => { e.stopPropagation(); onHover(skill.id); }} onPointerOut={() => onHover(null)} onClick={(e) => { e.stopPropagation(); onClick(skill); }} animate={{ scale }} transition={{ type: 'spring', stiffness: 200, damping: 15 }} {...({} as any)}>
            <Billboard>
                <Text fontSize={0.23} color={color} anchorX="center" anchorY="middle" outlineWidth={0.012} outlineColor="#0a0a12" maxWidth={1.9}>{skill.name}</Text>
            </Billboard>
            <mesh position={[0, 0, -0.01]}><planeGeometry args={[skill.name.length * 0.1 + 0.35, 0.45]} /><meshBasicMaterial transparent opacity={0} depthWrite={false} /></mesh>
        </motion.group>
    );
};

const SceneContent = React.memo(({
    positionedSkills, isPaused, rotationY, smoothRotationY,
    onHover, onClick, selectedSkill, hoveredId, sphereRadius, wireframeOpacity
}: {
    positionedSkills: (SkillData3D & { position: [number, number, number] })[];
    isPaused: boolean;
    rotationY: ReturnType<typeof useMotionValue<number>>;
    smoothRotationY: ReturnType<typeof useSpring>;
    onHover: (id: string | null) => void;
    onClick: (skill: SkillData3D) => void;
    selectedSkill: SkillData3D | null;
    hoveredId: string | null;
    sphereRadius: number;
    wireframeOpacity: number;
}) => {
    const groupRef = useRef<THREE.Group>(null!);
    useFrame((state, delta) => {
        if (!isPaused && groupRef.current) {
            const currentY = rotationY.get();
            const speedRadPerSec = THREE.MathUtils.degToRad(BASE_ROTATION_SPEED_DPS);
            const dt = Math.min(delta, 0.1);
            rotationY.set(currentY + speedRadPerSec * dt);
        }
    });
    return (
        <>
            <ambientLight intensity={0.75} />
            <pointLight position={[10, 15, 10]} intensity={1.1} castShadow />
            <pointLight position={[-10, -5, -15]} intensity={0.4} color="#b0c4ff" />
            <motion.group ref={groupRef} rotation-y={smoothRotationY} {...({} as any)}>
                <mesh scale={sphereRadius} renderOrder={-1}>
                    <sphereGeometry args={[1, 24, 24]} />
                    {/* *** MODIFIED WIREFRAME MATERIAL FOR VISIBILITY *** */}
                    <meshStandardMaterial 
                        wireframe 
                        color="#607D8B" /* A mid-tone blue-gray, adjust as needed */
                        opacity={wireframeOpacity} 
                        transparent 
                        depthWrite={false} 
                        roughness={0.8} 
                        metalness={0.1}
                    />
                </mesh>
                {positionedSkills.map((skill) => (
                    <SkillNode3D key={skill.id} skill={skill} onHover={onHover} onClick={onClick} isHovered={hoveredId === skill.id} isSelected={selectedSkill?.id === skill.id} />
                ))}
            </motion.group>
        </>
    );
});
SceneContent.displayName = "SceneContent";

// --- Main Component ---
const SkillNebulaV3 = () => {
    const titleRef = useRef<HTMLHeadingElement>(null);
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const [selectedSkill, setSelectedSkill] = useState<SkillData3D | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [detailViewActive, setDetailViewActive] = useState(false);

    const isMobile = useIsMobile();

    const [sphereRadius, setSphereRadius] = useState(BASE_SPHERE_RADIUS);
    const [cameraZ, setCameraZ] = useState(BASE_SPHERE_RADIUS * 2.5);
    // *** INCREASED WIREFRAME OPACITY DEFAULTS ***
    const [wireframeOpacity, setWireframeOpacity] = useState(0.35); // Default more visible

    const rotationY = useMotionValue(0);
    const smoothRotationY = useSpring(rotationY, { stiffness: 100, damping: 30, mass: 0.5, restDelta: 0.001 });

    const isPaused = hoveredId !== null || selectedSkill !== null || isDragging || detailViewActive;

    const positionedSkills = useMemo(() => {
        const count = skillsData.length;
        return skillsData.map((skill, i) => ({
            ...skill,
            position: getSphericalPosition(i, count, sphereRadius),
            category: skill.category || "Default",
        }));
    }, [sphereRadius]);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < MOBILE_BREAKPOINT) { // Mobile
                setSphereRadius(BASE_SPHERE_RADIUS * 0.75);
                setCameraZ(BASE_SPHERE_RADIUS * 3.0);
                setWireframeOpacity(0.2); // Adjusted mobile opacity
            } else { // Desktop
                setSphereRadius(BASE_SPHERE_RADIUS);
                setCameraZ(BASE_SPHERE_RADIUS * 2.5);
                setWireframeOpacity(0.35); // Keep it more visible on desktop
            }
        };
        if (typeof window !== "undefined") { // Ensure window is available
            handleResize();
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, []);

    const handleHover = useCallback((id: string | null) => { if (!detailViewActive) setHoveredId(id); }, [detailViewActive]);
    const handleClick = useCallback((skill: SkillData3D) => {
        if (selectedSkill?.id === skill.id) {
            setDetailViewActive(false); setSelectedSkill(null);
        } else {
            setSelectedSkill(skill); setDetailViewActive(true);
        }
    }, [selectedSkill]);
    const handleCloseDetails = useCallback(() => { setDetailViewActive(false); setSelectedSkill(null); }, []);

    const dragStartRotation = useRef(0);
    const handleDragStart = () => { setIsDragging(true); dragStartRotation.current = rotationY.get(); smoothRotationY.stop(); };
    const handleDrag = (event: any, info: { offset: { x: number; y: number } }) => rotationY.set(dragStartRotation.current + info.offset.x * DRAG_SENSITIVITY);
    const handleDragEnd = () => { setIsDragging(false); };

    const [titleInView, setTitleInView] = useState(false);
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => setTitleInView(entry.isIntersecting), { threshold: 0.1 });
        const currentTitleRef = titleRef.current; // Capture ref value
        if (currentTitleRef) observer.observe(currentTitleRef);
        return () => { if (currentTitleRef) observer.unobserve(currentTitleRef); };
    }, []);

    const canvasContainerVariants = {
        center: { x: "0%", width: "100%", transition: { type: "spring", stiffness: 100, damping: 20 } },
        desktopAside: { x: "-20%", width: "60%", transition: { type: "spring", stiffness: 100, damping: 20 } }, // Shift further left
        mobileAside: { y: "-20%", height: "45%", scale: 0.85, transition: { type: "spring", stiffness: 100, damping: 20 } } // Move further up
    };
    const detailsPanelVariants = {
        hidden: (isMobileView: boolean) => ({ opacity: 0, ...(isMobileView ? { y: "100%" } : { x: "100%" }) }),
        visible: (isMobileView: boolean) => ({ opacity: 1, y: "0%", x: "0%", transition: { type: "spring", stiffness: 100, damping: 20, delay: 0.1 } }),
        exit: (isMobileView: boolean) => ({ opacity: 0, ...(isMobileView ? { y: "100%" } : { x: "100%" }), transition: { duration: 0.25, ease: "easeIn" } })
    };

    const currentCanvasVariant = detailViewActive ? (isMobile ? "mobileAside" : "desktopAside") : "center";

    return (
        <section className={`skill-nebula-section temporal-flux-theme ${detailViewActive ? 'detail-view-active' : ''} ${isMobile ? 'is-mobile' : 'is-desktop'}`}>
            <motion2d.h2 ref={titleRef} initial={{ opacity: 0, y: 30 }} animate={titleInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="skill-nebula-title">
                Expertised Tools
            </motion2d.h2>
            
            <div className="skill-nebula-main-content">
                <motion2d.div
                    className="skill-canvas-container"
                    drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0}
                    onDragStart={handleDragStart} onDrag={handleDrag} onDragEnd={handleDragEnd}
                    style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
                    variants={canvasContainerVariants}
                    animate={currentCanvasVariant}
                >
                    <Canvas camera={{ position: [0, 0, cameraZ], fov: 50 }} shadows dpr={[1, 1.5]}>
                        <SceneContent
                            positionedSkills={positionedSkills} isPaused={isPaused}
                            rotationY={rotationY} smoothRotationY={smoothRotationY}
                            onHover={handleHover} onClick={handleClick}
                            selectedSkill={selectedSkill} hoveredId={hoveredId}
                            sphereRadius={sphereRadius} wireframeOpacity={wireframeOpacity}
                        />
                    </Canvas>
                </motion2d.div>

                <AnimatePresence>
                    {detailViewActive && selectedSkill && (
                        <motion2d.div
                            className="nebula-details-panel-standalone"
                            custom={isMobile}
                            variants={detailsPanelVariants}
                            initial="hidden" animate="visible" exit="exit"
                        >
                            <button className="nebula-close-btn" onClick={handleCloseDetails} title="Close"><XCircle size={20} /></button>
                            <h3 style={{ color: CATEGORY_COLORS[selectedSkill.category] || DEFAULT_COLOR }}>{selectedSkill.name}</h3>
                            <RatingStarsHTML rating={selectedSkill.rating} />
                            <p className="details-text-scrollable">{selectedSkill.details}</p>
                        </motion2d.div>
                    )}
                </AnimatePresence>
            </div>
            <p className="skill-nebula-hint">Drag horizontally to rotate. Hover or click skills.</p>
        </section>
    );
};

export default SkillNebulaV3; // You might want to rename this to SkillNebula
