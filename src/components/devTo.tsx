"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Loader2, AlertCircle, PlusCircle } from 'lucide-react';
// Assuming globals.css is imported at a higher level (e.g., in layout.tsx or page.tsx)
// import "../../styles/globals.css";


// Interface for DevToArticle
interface DevToUser {
    name: string;
    username: string;
    twitter_username: string | null;
    github_username: string | null;
    user_id: number;
    website_url: string | null;
    profile_image: string;
    profile_image_90: string;
}

export interface DevToArticle {
    type_of: string;
    id: number;
    title: string;
    description: string;
    readable_publish_date: string;
    slug: string;
    path: string;
    url: string;
    comments_count: number;
    public_reactions_count: number;
    collection_id: number | null;
    published_timestamp: string;
    positive_reactions_count: number;
    cover_image: string | null;
    social_image: string;
    canonical_url: string;
    created_at: string;
    edited_at: string | null;
    crossposted_at: string | null;
    published_at: string;
    last_comment_at: string;
    reading_time_minutes: number;
    tag_list: string[];
    tags: string;
    user: DevToUser;
}

interface DevToSectionProps {
    username: string;
    initialDisplayCount?: number;
    loadMoreCount?: number;
}

const DevToSection: React.FC<DevToSectionProps> = ({
    username,
    initialDisplayCount = 3,
    loadMoreCount = 3
}) => {
    const [allArticles, setAllArticles] = useState<DevToArticle[]>([]);
    const [displayedArticlesCount, setDisplayedArticlesCount] = useState<number>(initialDisplayCount);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchArticles = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`https://dev.to/api/articles?username=${username}&per_page=100&state=published`); // Fetch published articles
                if (!response.ok) {
                    // Try to parse error from Dev.to if possible
                    let errorMsg = `Failed to fetch articles: ${response.status} ${response.statusText}`;
                    try {
                        const errorData = await response.json();
                        errorMsg = errorData.error || errorMsg;
                    } catch (_) { /* Ignore if error body isn't JSON */ }
                    throw new Error(errorMsg);
                }
                const data: DevToArticle[] = await response.json();
                if (data) {
                    setAllArticles(data);
                } else {
                    setAllArticles([]); // Should not happen if response.ok
                }
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unknown error occurred while fetching articles.');
                }
                console.error("Dev.to fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        if (username) {
            fetchArticles();
        } else {
            setError("Dev.to username is not provided."); // Handle missing username
            setLoading(false);
        }
    }, [username]); // Only re-fetch if username changes

    const handleLoadMore = () => {
        setDisplayedArticlesCount(prevCount => Math.min(prevCount + loadMoreCount, allArticles.length));
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20, scale: 0.98 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                delay: i * 0.07,
                type: 'spring',
                stiffness: 100,
                damping: 15,
            },
        }),
        hover: {
            scale: 1.03,
            boxShadow: "0px 12px 25px rgba(0,0,0,0.15)",
            transition: { duration: 0.25, ease: "circOut" }
        }
    };

    if (loading && allArticles.length === 0) {
        return (
            <div className="loading-container">
                <Loader2 className="loading-icon" size={48} />
                <p>Loading Dev.to articles for {username}...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container" style={{ textAlign: 'center', color: 'var(--error-text-color, #ff5555)' }}>
                <AlertCircle className="error-icon" size={48} />
                <p>Error: {error}</p>
                <p>Could not load articles. Please check the username or try again later.</p>
            </div>
        );
    }

    if (!loading && allArticles.length === 0) {
        return (
            <div className="info-container">
                <p>No articles found for "{username}" on Dev.to at the moment.</p>
            </div>
        );
    }

    const articlesToDisplay = allArticles.slice(0, displayedArticlesCount);
    const canLoadMore = displayedArticlesCount < allArticles.length;

    return (
        <section className="dev-to-section">
            <motion.h2 
                className="section-title"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
            >
                My Latest Articles on DEV.to
            </motion.h2>
            <motion.div 
                className="articles-grid"
                // No initial/animate needed here if cards handle their own entrance
            >
                {articlesToDisplay.map((article, index) => (
                    <motion.div
                        key={article.id}
                        className="article-card"
                        custom={index} // Pass index for stagger
                        initial="hidden"
                        animate="visible" // Animate each card as it's added to display
                        variants={cardVariants}
                        whileHover="hover"
                    >
                        {article.cover_image && (
                            <a href={article.url} target="_blank" rel="noopener noreferrer" className="card-link article-image-link">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={article.cover_image} alt={article.title} className="article-image" loading="lazy" />
                            </a>
                        )}
                        <div className="article-content">
                            <h3 className="article-title">
                                <a href={article.url} target="_blank" rel="noopener noreferrer" className="card-link">
                                    {article.title}
                                </a>
                            </h3>
                            <p className="article-date">{article.readable_publish_date}</p>
                            <p className="article-description">{article.description}</p>
                            <div className="article-tags">
                                {article.tag_list.map((tag) => (
                                    <span key={tag} className="tag">#{tag}</span>
                                ))}
                            </div>
                            <a href={article.url} target="_blank" rel="noopener noreferrer" className="read-more-link">
                                Read more <ExternalLink size={16} />
                            </a>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {canLoadMore && (
                <motion.button
                    className="load-more-button"
                    onClick={handleLoadMore}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                >
                    <PlusCircle size={18} style={{ marginRight: '0.5rem' }} />
                    Load More Articles
                </motion.button>
            )}
        </section>
    );
};

export default DevToSection;
