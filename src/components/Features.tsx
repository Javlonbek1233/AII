import { motion } from "motion/react";
import { 
  Cpu, Rocket, BarChart3, ShieldCheck, HeartPulse, Zap, 
  Workflow, Globe, CheckCircle 
} from "lucide-react";

interface FeatureCard {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlight: string;
  gradient: string;
}

const features: FeatureCard[] = [
  {
    icon: <Cpu className="h-6 w-6 text-purple-400" />,
    title: "Dynamic Model Router",
    description: "Intelligently routes inference workflows based on priority to maximize speed and decrease token consumption.",
    highlight: "Saves up to 45% API cost",
    gradient: "from-purple-500/20 to-blue-500/5",
  },
  {
    icon: <Workflow className="h-6 w-6 text-blue-400" />,
    title: "Automated Orchestrator",
    description: "Write workflows once, trigger on telemetry events. Automates diagnostic restarts, notification triggers, and client billing.",
    highlight: "No-code workflow canvas",
    gradient: "from-blue-500/20 to-indigo-500/5",
  },
  {
    icon: <BarChart3 className="h-6 w-6 text-indigo-400" />,
    title: "Real-time Metrics Pipeline",
    description: "Aggregates global telemetry data down to 10ms spikes. Clean representation inside rich SVG grids.",
    highlight: "15,000 requests/sec ingest",
    gradient: "from-indigo-500/20 to-purple-500/5",
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-purple-400" />,
    title: "Military-Grade Safeguards",
    description: "Includes end-to-end payload encryption. Integrated sanitization layers filter toxic inputs before they touch your backend.",
    highlight: "SOC2 Type II certified compliant",
    gradient: "from-pink-500/20 to-purple-500/5",
  },
  {
    icon: <Globe className="h-6 w-6 text-blue-400" />,
    title: "Global CDN Optimization",
    description: "Edge-caching prompts and vector outputs near users across 40 physical regions. Minimizes server roundtrip delays.",
    highlight: "Average 12ms global TTFT",
    gradient: "from-blue-400/20 to-purple-500/5",
  },
  {
    icon: <Zap className="h-6 w-6 text-amber-400" />,
    title: "Instant Integration API",
    description: "Connect standard clients using our elegant typescript SDK. Autodetects platform headers for microsecond responses.",
    highlight: "One line setup import",
    gradient: "from-amber-500/20 to-purple-500/5",
  }
];

export default function Features() {
  return (
    <section 
      id="features" 
      className="relative py-24 sm:py-32 bg-black overflow-hidden border-t border-purple-500/10"
    >
      {/* Glow Backdrops */}
      <div className="absolute top-1/4 right-[5%] w-[400px] h-[400px] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-[5%] w-[450px] h-[450px] bg-blue-600/5 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Module Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/5 font-mono text-xs text-blue-300"
          >
            <Rocket className="h-3 w-3 text-blue-400" />
            <span>Core Capabilities</span>
          </motion.div>
          
          <h2 className="mt-4 text-3xl sm:text-5xl font-sans font-bold text-white tracking-tight">
            Designed for Modern Edge Operations
          </h2>
          <p className="mt-4 text-gray-400 text-lg">
            Stop stitching together custom telemetry layers. Aetheris handles pipeline distribution, automated prompt evaluation, and real-time usage metrics in one.
          </p>
        </div>

        {/* Features Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true, margin: "-40px" }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group relative rounded-2xl border border-white/10 bg-neutral-950/40 p-6 flex flex-col justify-between hover:border-purple-500/30 transition-all duration-300"
            >
              {/* Card visual background gradient highlight */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

              <div>
                {/* Icon Shell */}
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 inline-block mb-6 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>

                <h3 className="text-xl font-sans font-bold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              {/* Dynamic Micro Info line */}
              <div className="mt-auto pt-4 border-t border-white/5 flex items-center space-x-2 text-xs font-mono text-purple-400">
                <CheckCircle className="h-3.5 w-3.5 text-purple-400" />
                <span className="font-semibold">{item.highlight}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
