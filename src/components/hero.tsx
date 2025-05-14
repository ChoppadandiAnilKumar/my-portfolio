"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Hero() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 2000),
      setTimeout(() => setStep(2), 4000),
      setTimeout(() => setStep(3), 6000),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="hero-container">
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.h1
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
            className="hero-text"
          >
            Welcome to my portfolio!
          </motion.h1>
        )}
        {step === 1 && (
          <motion.h1
            key="name"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
            className="hero-text"
          >
            I'm Anil Kumar Choppadandi
          </motion.h1>
        )}
        {step === 2 && (
          <motion.h1
            key="tagline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
            className="hero-text"
          >
            An experience you never experienced!
          </motion.h1>
        )}
        {step === 3 && (
          <motion.h1
            key="final"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
            className="hero-text"
          >
            Anil Kumar Choppadandi, Cloud Engineer @ TCS
          </motion.h1>
        )}
      </AnimatePresence>
    </div>
  );
}

