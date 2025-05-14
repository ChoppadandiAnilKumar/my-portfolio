"use client";

import React, { useState, useRef, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader, CheckCircle, AlertCircle } from "lucide-react";

// Form state type
type FormState = "idle" | "loading" | "success" | "error";
type FormValues = {
    name: string;
    email: string;
    message: string;
    phone?: string; // Optional phone
};

const ContactForm = () => {
    const [formData, setFormData] = useState<FormValues>({ name: "", email: "", message: "", phone: "" });
    const [formState, setFormState] = useState<FormState>("idle");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormState("loading");
        setErrorMessage(null);

        // --- Simulate API Call ---
        // ** IMPORTANT: Replace this simulation with your actual fetch call **
        // ** to your backend API endpoint (e.g., /api/contact) **
        try {
            // Example fetch structure:
            // const response = await fetch('/api/contact', { // Your API route
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(formData),
            // });

            // if (!response.ok) {
            //     const errorData = await response.json();
            //     throw new Error(errorData.message || 'Something went wrong.');
            // }

            // Simulate success after 2 seconds for demo
            await new Promise(resolve => setTimeout(resolve, 2000));
             if (formData.email === "error@test.com") { // Simulate an error for testing
                 throw new Error("Simulated server error. Please try again.");
             }

            // If fetch is successful:
            setFormState("success");
            // Optionally clear form: setFormData({ name: "", email: "", message: "", phone: "" });
            // Reset state after a few seconds
            setTimeout(() => setFormState("idle"), 4000);

        } catch (error: any) {
            console.error("Contact form submission error:", error);
            setFormState("error");
            setErrorMessage(error.message || "An unexpected error occurred.");
            // Don't reset automatically on error, let user retry
             setTimeout(() => setFormState("idle"), 5000); // Reset after longer period
        }
        // --- End of Simulation ---
    };

    // Simple validation check (can be expanded)
    const isFormValid = formData.name.trim() !== "" && formData.email.includes('@') && formData.message.trim() !== "";

    const inputVariants = {
        initial: { y: 10, opacity: 0 },
        animate: { y: 0, opacity: 1, transition: { duration: 0.3, ease: "easeOut" } }
    };

    return (
        <section className="contact-section temporal-flux-theme">
            <motion.div
                 initial={{ opacity: 0, y: -30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true, amount: 0.5 }}
                 transition={{ type: "spring", stiffness: 100, damping: 20 }}
                 className="contact-header"
            >
                <h2 className="contact-title">Get In Touch</h2>
                <p className="contact-subtitle">
                    Have a question, project idea, or just want to connect? Drop me a line!
                </p>
            </motion.div>

            <motion.form
                className="contact-form"
                onSubmit={handleSubmit}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ staggerChildren: 0.1 }}
            >
                 <motion.div className="form-group" variants={inputVariants}>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        disabled={formState === 'loading'}
                    />
                 </motion.div>

                 <motion.div className="form-group" variants={inputVariants}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        disabled={formState === 'loading'}
                    />
                 </motion.div>

                 <motion.div className="form-group" variants={inputVariants}>
                    <label htmlFor="phone">Phone <span className="optional">(Optional)</span></label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={formState === 'loading'}
                    />
                 </motion.div>

                 <motion.div className="form-group" variants={inputVariants}>
                    <label htmlFor="message">Message</label>
                    <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        disabled={formState === 'loading'}
                    />
                 </motion.div>

                 <motion.div className="form-submit-area" variants={inputVariants}>
                     <motion.button
                        type="submit"
                        className={`submit-button state-${formState}`}
                        disabled={formState === 'loading' || !isFormValid}
                        whileHover={formState === 'idle' && isFormValid ? { scale: 1.05 } : {}}
                        whileTap={formState === 'idle' && isFormValid ? { scale: 0.95 } : {}}
                     >
                        {formState === 'loading' && <Loader className="spinner" size={18} />}
                        {formState === 'success' && <CheckCircle size={18} />}
                        {formState === 'error' && <AlertCircle size={18} />}
                        {(formState === 'idle' || formState === 'error') && <Send size={16} />}

                        <span>
                            {formState === 'loading' ? 'Sending...' :
                             formState === 'success' ? 'Message Sent!' :
                             formState === 'error' ? 'Send Failed' :
                             'Send Message'}
                        </span>
                     </motion.button>
                 </motion.div>

                 <AnimatePresence>
                     {formState === 'error' && errorMessage && (
                         <motion.p
                            className="error-message"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                         >
                            {errorMessage}
                         </motion.p>
                     )}
                      {formState === 'success' && (
                         <motion.p
                            className="success-message"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                         >
                            Thanks for reaching out! I'll get back to you soon.
                         </motion.p>
                     )}
                 </AnimatePresence>
            </motion.form>
        </section>
    );
};

export default ContactForm;