import { motion } from "motion/react";
import { Sparkles, Terminal, Shield, ArrowUpRight } from "lucide-react";

export default function Hero() {
  const scrolltoSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-32 pb-24 overflow-hidden bg-black text-white"
    >
      {/* Absolute futuristic ambient glow effects */}
      <div className="absolute top-[20%] left-[10%] w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full bg-purple-600/10 blur-[100px] sm:blur-[130px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-[10%] right-[10%] w-[350px] sm:w-[550px] h-[350px] sm:h-[550px] rounded-full bg-blue-600/10 blur-[110px] sm:blur-[140px] pointer-events-none" />

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#000_90%)] bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] sm:bg-[size:48px_48px] opacity-30 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Glowing Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/5 backdrop-blur-md text-xs font-mono text-purple-300 shadow-xl shadow-purple-500/5"
          id="hero-badge"
        >
          <Sparkles className="h-3.5 w-3.5 animate-spin text-purple-400" />
          <span>Aetheris Platform v2.0 - Gemini Driven</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-6 text-4xl sm:text-6xl lg:text-7xl font-sans font-bold tracking-tight text-white mb-6"
          id="hero-headline"
        >
          Predictive SaaS Analytics
          <span className="block mt-2 bg-gradient-to-r from-purple-400 via-purple-300 to-blue-400 bg-clip-text text-transparent">
            Supercharged by AI
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="max-w-xl text-gray-400 text-lg sm:text-xl font-normal leading-relaxed text-balance"
          id="hero-description"
        >
          Unlock real-time user insights, automated operations forecasts, and premium client reporting. Zero pipelines, infinite action.
        </motion.p>

        {/* Click Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto px-4"
          id="hero-actions"
        >
          {/* Main action: Demo console */}
          <button
            onClick={() => scrolltoSection("dashboard")}
            className="w-full sm:w-auto relative group overflow-hidden px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 via-purple-600 to-blue-600 text-white font-semibold text-base shadow-xl shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 hover:scale-[1.02]"
            id="hero-cta-main"
          >
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <div className="flex items-center justify-center space-x-2">
              <span>Launch Demo Lab</span>
              <ArrowUpRight className="h-4.5 w-4.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </button>

          {/* Secondary Action: Learn More */}
          <button
            onClick={() => scrolltoSection("features")}
            className="w-full sm:w-auto px-8 py-4 rounded-xl border border-white/15 bg-white/5 text-gray-200 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300 font-semibold text-base backdrop-blur-sm"
            id="hero-cta-sub"
          >
            Explore Features
          </button>
        </motion.div>

        {/* Tech Badges / Trust points */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-8 text-xs font-mono text-gray-400"
          id="hero-trust-metrics"
        >
          <div className="flex items-center space-x-2">
            <Terminal className="h-4 w-4 text-purple-400" />
            <span>Developer first API flow</span>
          </div>
          <div className="flex items-center space-x-2">
            <Shield className="h-4 w-4 text-blue-400" />
            <span>SOC2 Type II certified</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>99.99% global uptime SLA</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
