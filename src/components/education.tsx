"use client";

import { useRef } from "react";
import {
    motion,
    useInView,
    useScroll,
    useTransform,
    MotionValue,
    useSpring,
} from "framer-motion";
import { Milestone, CircleDot, Building, Code } from "lucide-react";

interface EducationItem {
    id: number;
    title: string;
    institution: string;
    degree: string;
    years: string;
    grade: string;
    side: "right" | "left";
    icon: React.ReactNode;
    description?: string;
}

const educationData: EducationItem[] = [
    {
        id: 1,
        title: "Secondary School",
        institution: "Euro High School",
        degree: "SSC (State Board)",
        years: "2016 – 2017",
        grade: "Grade: 83%",
        side: "right",
        icon: <CircleDot />,
        description: "Completed foundational secondary education curriculum.",
    },
    {
        id: 2,
        title: "Higher Secondary",
        institution: "Shanti Junior College",
        degree: "Intermediate (MPC)",
        years: "2017 – 2019",
        grade: "Grade: 81%",
        side: "left",
        icon: <CircleDot />,
        description: "Focused on Mathematics, Physics, and Chemistry stream.",
    },
    {
        id: 3,
        title: "Bachelor of Science",
        institution: "NSV Degree College (Satavahana University)",
        degree: "BSc, Computer Science",
        years: "2019 – 2022",
        grade: "Grade: 84%",
        side: "right",
        icon: <Building />,
        description: "Learnt the concepts like SDLC, Agile methodologies and the process of DevOps.",
    },
    {
        id: 4,
        title: "Master of Computer Applications",
        institution: "Andhra University",
        degree: "MCA",
        years: "2025 – Present",
        grade: "In Progress",
        side: "left",
        icon: <Code />,
        description: "Pursuing advanced studies in computer applications, focusing on Cloud Computing with integration of AI.",
    },
];

// --- Child Components ---
const TimelinePoint = ({ isActive }: { isActive: boolean }) => {
    const scale = useSpring(isActive ? 1.2 : 1, { stiffness: 300, damping: 20 });

    return (
        <motion.div
            className="timeline-point"
            style={{ scale }}
            transition={{ duration: 0.2 }}
        >
            <div className="timeline-point-inner"></div>
        </motion.div>
    );
};

const EducationCard = ({
    item,
    index,
    scrollYProgress,
    range,
    targetScale
}: {
    item: EducationItem;
    index: number;
    scrollYProgress: MotionValue<number>;
    range: [number, number];
    targetScale: MotionValue<number>;
}) => {
    const cardRef = useRef<HTMLDivElement>(null);

    const [start, end] = range;
    const focusCenter = (start + end) / 2;
    const inputRange = [start, focusCenter, end];

    const activation = useTransform(scrollYProgress, inputRange, [0, 20, 0]);
    const smoothActivation = useSpring(activation, { stiffness: 200, damping: 60 });

    const opacity = useTransform(smoothActivation, [0, 1], [0.6, 1]);
    const filter = useTransform(smoothActivation, [0, 1], ["saturate(0) blur(3px)", "saturate(1) blur(0px)"]);
    const y = useTransform(smoothActivation, [0, 1], [30, 0]);

    const variants = {
        hidden: { opacity: 0, x: item.side === "right" ? 50 : -50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 20,
                delay: index * 0.1,
            },
        },
    };

    return (
        <motion.div
            ref={cardRef}
            className={`edu-entry ${item.side}`}
            variants={variants}
            style={{
                opacity: opacity,
                filter: filter,
                y: y,
                scale: targetScale
            }}
            whileHover={activation.get() > 0.5 ? { scale: 1.03 } : {}}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
            <TimelinePoint isActive={activation.get() > 0.5} />

            <div className="edu-card-content">
                <div className="edu-card-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p className="institution">{item.institution}</p>
                <p className="degree">{item.degree} ({item.years})</p>
                <p className="grade">{item.grade}</p>
                {item.description && <p className="description">{item.description}</p>}
            </div>
        </motion.div>
    );
};

const EducationSection = () => {
    const sectionRef = useRef<HTMLElement>(null);

    const titleInView = useInView(sectionRef, { amount: 0.1, once: true });

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"],
    });

    const smoothScrollYProgress = useSpring(scrollYProgress, {
        stiffness: 50,
        damping: 20,
        mass: 0.5,
    });

    const timelineHeight = useTransform(smoothScrollYProgress, [0, 1], ["0%", "100%"]);

    const cardCount = educationData.length;
    const cardScrollRanges = educationData.map((_, index) => {
        const start = index / cardCount;
        const end = (index + 1) / cardCount;
        return [start, end] as [number, number];
    });

    const scale = useTransform(
        scrollYProgress,
        cardScrollRanges.flatMap(([start, end]) => [start - 0.1, start, end, end + 0.1]),
        cardScrollRanges.flatMap(() => [0.9, 1, 1, 0.9]),
        { clamp: true }
    );

    const smoothScale = useSpring(scale, { stiffness: 150, damping: 25, mass: 0.5 });

    return (
        <section ref={sectionRef} className="education-section temporal-flux-theme">
            <motion.h2
                initial={{ opacity: 0, y: 50 }}
                animate={titleInView ? { opacity: 1, y: 0 } : {}}
                transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
                className="education-title"
            >
                Educational Milestones
            </motion.h2>

            <div className="timeline">
                <motion.div className="timeline-line" style={{ scaleY: timelineHeight, transformOrigin: 'top' }} />

                <motion.div
                    className="timeline-entries"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        visible: { transition: { staggerChildren: 0.15 } }
                    }}
                >
                    {educationData.map((item, index) => (
                        <EducationCard
                            key={item.id}
                            item={item}
                            index={index}
                            scrollYProgress={scrollYProgress}
                            range={cardScrollRanges[index]}
                            targetScale={smoothScale}
                        />
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default EducationSection;
