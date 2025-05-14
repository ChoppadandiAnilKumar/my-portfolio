// src/components/LoadingScreen.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const LoadingScreen = () => {
  const loadingScreenVariants = {
    initial: { opacity: 1 },
    exit: {
      opacity: 0,
      transition: { 
        duration: 0.7, 
        ease: "easeInOut", // Valid easing
        delay: 0.4 
      }
    },
  };

  const contentVariants = {
    initial: { opacity: 0, scale: 0.7 },
    animate: { 
      opacity: 1, 
      scale: 1, 
      transition: { duration: 0.6, ease: [0.65, 0, 0.35, 1], delay: 0.1 } 
    },
  };

  // SVG Circle Animation Parameters
  const svgViewBoxSize = 100; // The viewBox of the SVG (e.g., "0 0 100 100")
  const svgCircleRadius = 46;  // Radius of the circle within the 100x100 viewBox
  const svgStrokeWidth = 4;    // Stroke width of the ring in viewBox units
  const circlePathLength = 2 * Math.PI * svgCircleRadius;

  const progressArcVariants = {
    initial: { strokeDashoffset: circlePathLength, opacity: 0.7 },
    animate: {
      strokeDashoffset: 0,
      opacity: 1,
      transition: {
        strokeDashoffset: { duration: 2.0, ease: "linear", delay: 0.3 },
        opacity: { duration: 0.3, delay: 0.2 }
      },
    },
  };

  const startRotation = 135; // Your preferred start rotation for the arc

  // --- ADJUST OVERALL SIZES HERE ---
  // Let's make the logo image itself noticeably larger
  const actualLogoImageSize = 320; // New desired pixel size of your logo image (e.g., from 180 to 220)
  // The container for the logo image will match this size
  const logoContainerSize = actualLogoImageSize; 
  // The SVG wrapper needs to be larger to encompass the logo container AND the ring around it
  // Add a bit more padding for the ring to be clearly around the logo
  const svgWrapperPadding = 40; // Total padding around the logo for the ring (20px on each side)
  const svgWrapperSize = logoContainerSize + svgWrapperPadding; // e.g., 220 + 40 = 260px

  return (
    <motion.div
      className="loading-screen-container-logo-arc"
      variants={loadingScreenVariants}
      initial="initial"
      exit="exit" 
    >
      <motion.div 
        className="logo-arc-loader-wrapper"
        variants={contentVariants}
        animate="animate"
        initial="initial"
        // This style sets the overall size of the loader element
        style={{ width: `${svgWrapperSize}px`, height: `${svgWrapperSize}px` }}
      >
        {/* This div holds the actual logo image and is centered within the wrapper */}
        <div 
          className="logo-circle-container" 
          // This container should be sized to hold the logo image snugly
          style={{ width: `${logoContainerSize}px`, height: `${logoContainerSize}px` }}
        >
          <Image
            src="/assets/loading_logo.png" // Ensure this path is correct to your image in the public/assets folder
            alt="Anil Kumar Logo Loading"
            width={actualLogoImageSize} // The image itself
            height={actualLogoImageSize}
            className="loading-base-logo"
            priority // Good for LCP if this is the first thing seen
          />
        </div>
        {/* The SVG overlays the logo container and draws the ring */}
        <svg 
          className="loading-progress-arc-svg" 
          width={svgWrapperSize} // SVG element takes full size of the wrapper
          height={svgWrapperSize}
          viewBox={`0 0 ${svgViewBoxSize} ${svgViewBoxSize}`} // Standard viewBox
        >
          {/* Optional: Background track for the progress arc */}
          <circle
            cx={svgViewBoxSize / 2} // Center of viewBox
            cy={svgViewBoxSize / 2} // Center of viewBox
            r={svgCircleRadius}
            stroke="rgba(139, 233, 253, 0.15)" // Faint track color
            strokeWidth={svgStrokeWidth} // Use variable
            fill="transparent"
          />
          {/* Animated Progress Arc */}
          <motion.circle
            cx={svgViewBoxSize / 2}
            cy={svgViewBoxSize / 2}
            r={svgCircleRadius}
            stroke="var(--loading-arc-color, #F0F8FF)" // Bright contrasting color
            strokeWidth={svgStrokeWidth} // Use variable
            fill="transparent"
            strokeLinecap="round"
            transform={`rotate(${startRotation} ${svgViewBoxSize / 2} ${svgViewBoxSize / 2})`} // Rotate around SVG center
            strokeDasharray={circlePathLength}
            variants={progressArcVariants}
            initial="initial"
            animate="animate"
          />
        </svg>
      </motion.div>
      <motion.p 
        className="loading-text-logo-arc"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 0.8, y: 0 }}
        transition={{ delay: 1.0, duration: 0.5 }}
      >
        Initializing Portfolio...
      </motion.p>
    </motion.div>
  );
};

export default LoadingScreen;
