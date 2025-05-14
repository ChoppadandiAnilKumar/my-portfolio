// src/app/layout.tsx
"use client"; // Required because we're using useState and useEffect

import React, { useState, useEffect } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "../../styles/globals.css"; // Ensure this path is correct
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import LoadingScreen from "../components/loading"; // Updated the path to match the relative location
import { AnimatePresence } from "framer-motion";
// Removed unused import: import { loadComponents } from "next/dist/server/load-components";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Static metadata export is not used in Client Components.
// Metadata is set in <head> below.
// export const metadata: Metadata = {
//   title: "Anil Kumar - Portfolio",
//   description: "DevOps Engineer Portfolio of Anil Kumar",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Adjust duration as needed (e.g., 2500ms = 2.5s)

    return () => clearTimeout(timer); // Cleanup timer
  }, []); // Empty dependency array so it runs only once on mount
  return (
    <html lang="en">
      <head>
        <title>Anil Kumar - Portfolio</title>
        <meta name="description" content="DevOps Engineer and Full Stack Developer Portfolio of Anil Kumar" />
        <link rel="icon" href="/assets/loading_logo.png" /> {/* Ensure this path is correct (public folder) */}
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} main-body-container`}>
        <AnimatePresence mode="wait">
          {isLoading && <LoadingScreen key="loadingScreen" />}
        </AnimatePresence>

        {/* *** FIX: Added back the main content wrapper *** */}
        {/* This div will contain your actual portfolio content.
            The CSS classes 'hidden-during-load' and 'visible-after-load'
            (which should be in your globals.css) handle the fade-in.
        */}
        <div className={`app-content ${isLoading ? 'hidden-during-load' : 'visible-after-load'}`}>
          <Navbar />
          {children} {/* This is where your page.tsx content will be rendered */}
          <Footer /> {/* Make sure you have a Footer component or remove this line */}
        </div>
      </body>
    </html>
  );
}
