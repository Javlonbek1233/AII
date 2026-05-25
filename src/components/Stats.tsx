import { useState } from "react";
import { motion } from "motion/react";
import { TrendingUp, Users, Cpu, ShieldAlert, Award } from "lucide-react";

interface Metric {
  logo: React.ReactNode;
  value: string;
  label: string;
  change: string;
  desc: string;
  glowColor: string;
}

const statsMetrics: Metric[] = [
  {
    logo: <Cpu className="h-5 w-5 text-purple-400" />,
    value: "2,481,591,204",
    label: "Total AI Assertions Run",
    change: "+22.4% MoM",
    desc: "Seamless server-side proxy predictions evaluated global-scale.",
    glowColor: "shadow-purple-500/10",
  },
  {
    logo: <TrendingUp className="h-5 w-5 text-blue-400" />,
    value: "11.42 ms",
    label: "Mean Target TTF Token",
    change: "-1.8ms threshold",
    desc: "Predictive routing mechanisms bypass standard routing latencies.",
    glowColor: "shadow-blue-500/10",
  },
  {
    logo: <Users className="h-5 w-5 text-indigo-400" />,
    value: "14,582",
    label: "Enterprise Connected Tokens",
    change: "+1,240 this week",
    desc: "Active API pipelines running in secure cloud environments.",
    glowColor: "shadow-indigo-500/10",
  },
  {
    logo: <Award className="h-5 w-5 text-purple-400" />,
    value: "99.999%",
    label: "Average Routing SLA Accuracy",
    change: "Tier-1 Certified",
    desc: "Strict adherence to response constraints under heavy cloud loads.",
    glowColor: "shadow-pink-500/10",
  }
];

export default function Stats() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section 
      id="metrics" 
      className="relative py-24 bg-black overflow-hidden border-t border-purple-500/10"
    >
      {/* Visual Backdrops */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Module Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-widest bg-purple-500/10 px-3 py-1 rounded-full">
            Live Platform Metrics
          </span>
          <h2 className="mt-4 text-3xl sm:text-5xl font-sans font-bold text-white tracking-tight">
            Proven Scale, Zero Downtime
          </h2>
          <p className="mt-4 text-gray-400 text-lg">
            We operate in production at hyper-scale, enabling high-performance enterprise applications to deploy with confident certainty.
          </p>
        </div>

        {/* Static Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsMetrics.map((metric, idx) => (
            <motion.div
              key={idx}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              viewport={{ once: true }}
              className={`p-6 rounded-2xl bg-neutral-950/50 border border-white/10 hover:border-purple-500/30 transition-all duration-300 relative overflow-hidden ${metric.glowColor}`}
            >
              {/* Subtle top decoration */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-white/5 border border-white/10 rounded-xl">
                  {metric.logo}
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded-full font-bold">
                  {metric.change}
                </span>
              </div>

              {/* Incremental Big Number Display */}
              <div className="text-2xl sm:text-3xl font-sans font-bold tracking-tight text-white mb-2">
                {metric.value}
              </div>

              <div className="text-xs font-semibold font-mono text-purple-300 uppercase tracking-wide mb-2">
                {metric.label}
              </div>

              <p className="text-xs text-gray-500 leading-relaxed">
                {metric.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
