import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, Clock, ArrowRight, Rss } from "lucide-react";
import { BlogPost } from "../types";

const blogPosts: BlogPost[] = [
  {
    id: "post-1",
    title: "The Architecture Behind Low Latency Server-Side AI Caching",
    excerpt: "Discover how we coordinate modern CDN caching, regional server-side proxy routers, and intelligent prompt telemetry to push model response times down to 11.4ms.",
    category: "Engineering",
    date: "May 20, 2026",
    readTime: "6 min read",
    author: {
      name: "Dimitri Volk",
      role: "Principal Systems Architect",
      avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=60&h=60&q=80"
    },
    image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&w=600&h=350&q=80"
  },
  {
    id: "post-2",
    title: "Conversion Copywriting Tactics for Enterprise SaaS Platforms",
    excerpt: "Stuck on boring, technical value propositions? We leverage high-performing conversion copywriting templates to outline core user benefits clearly.",
    category: "Growth",
    date: "May 14, 2026",
    readTime: "4 min read",
    author: {
      name: "Clara Vance",
      role: "VP of Digital Acquisition",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=60&h=60&q=80"
    },
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&h=350&q=80"
  },
  {
    id: "post-3",
    title: "Guide to Hardening Input Payload Layers against Toxic Injections",
    excerpt: "An practical checklist for product managers to secure text queries before sending raw API prompts to large models, SOC2 compliance guaranteed.",
    category: "Security",
    date: "May 08, 2026",
    readTime: "8 min read",
    author: {
      name: "Marcus Chen",
      role: "Lead Security Auditor",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=60&h=60&q=80"
    },
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&h=350&q=80"
  }
];

const categories = ["All", "Engineering", "Growth", "Security"];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts = activeCategory === "All" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory);

  return (
    <section 
      id="blog" 
      className="relative py-24 sm:py-32 bg-black overflow-hidden border-t border-purple-500/10"
    >
      {/* Background glow visual styling */}
      <div className="absolute top-1/4 right-[8%] w-[380px] h-[380px] bg-blue-600/5 blur-[125px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Module Header wrapper */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest bg-blue-500/10 px-3 py-1 rounded-full flex items-center w-fit space-x-1">
              <Rss className="h-3.5 w-3.5 text-blue-400" />
              <span>Aetheris Bulletin</span>
            </span>
            <h2 className="mt-4 text-3xl sm:text-5xl font-sans font-bold text-white tracking-tight">
              SaaS Engineering & Growth Inside
            </h2>
          </div>

          {/* Filter Categories list bar */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all border focus:outline-none ${
                  activeCategory === cat
                    ? "bg-purple-600 border-purple-500 text-white"
                    : "bg-white/2 hover:bg-white/10 text-gray-400 border-white/5"
                }`}
                id={`blog-filter-${cat.toLowerCase()}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Filtered Posts Grid frame */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post, idx) => (
              <motion.article
                key={post.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group flex flex-col justify-between bg-neutral-950/45 rounded-2xl border border-white/10 hover:border-purple-500/30 overflow-hidden hover:shadow-2xl hover:shadow-purple-500/5 transition-all duration-300"
              >
                {/* Visual Image wrap */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 text-[10px] font-mono font-bold text-purple-300 bg-purple-950/80 border border-purple-500/30 px-2.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-md">
                    {post.category}
                  </span>
                </div>

                {/* Article Content frame */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Publication Stats */}
                    <div className="flex items-center space-x-4 text-[10px] font-mono text-gray-500 mb-3">
                      <span className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{post.date}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{post.readTime}</span>
                      </span>
                    </div>

                    <h3 className="text-lg font-sans font-bold text-white group-hover:text-purple-400 transition-colors mb-3 leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-xs text-gray-400 leading-relaxed mb-6 line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Author meta and CTA action button split */}
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img
                        src={post.author.avatarUrl}
                        alt={post.author.name}
                        referrerPolicy="no-referrer"
                        className="w-8 h-8 rounded-full object-cover border border-white/10"
                      />
                      <div>
                        <div className="text-[11px] font-bold text-white font-sans leading-none">{post.author.name}</div>
                        <div className="text-[9px] text-gray-500 font-mono mt-0.5 leading-none">{post.author.role}</div>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="p-2 rounded-xl bg-purple-500/5 border border-purple-500/10 text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-all focus:outline-none"
                      aria-label="Read full article"
                      id={`read-article-${post.id}`}
                    >
                      <ArrowRight className="h-4.5 w-4.5" />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
