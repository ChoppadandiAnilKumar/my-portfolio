"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, X, ExternalLink } from "lucide-react";

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  googleFormUrl: string; // You will provide this
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose, googleFormUrl }) => {
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", damping: 20, stiffness: 200, delay: 0.1 } },
    exit: { opacity: 0, scale: 0.8, y: 30, transition: { duration: 0.2, ease: "easeIn" } },
  };

  if (!isOpen) return null; // More explicit conditional rendering for AnimatePresence

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          className="feedback-modal-overlay"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose} // Close when clicking the overlay
        >
          <motion.div
            className="feedback-modal-content"
            variants={modalVariants}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            <button className="modal-close-button" onClick={onClose} aria-label="Close feedback modal">
              <X size={20} />
            </button>
            <div className="modal-icon-container">
              <Star size={48} className="modal-star-icon" />
            </div>
            <h2 className="modal-title">Thank You for Visiting!</h2>
            <p className="modal-text">
              I appreciate you taking the time to explore my portfolio.
              Your feedback is valuable to me!
            </p>
            <a
              href={googleFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rate-button"
              onClick={onClose} // Optionally close modal when they click to rate
            >
              Rate the Website <ExternalLink size={16} style={{ marginLeft: '0.5rem' }} />
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FeedbackModal;
