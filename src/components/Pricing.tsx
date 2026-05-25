import { useState } from "react";
import { motion } from "motion/react";
import { Check, ShieldCheck, Sparkles } from "lucide-react";
import { PricingPlan } from "../types";

const plans: PricingPlan[] = [
  {
    id: "dev",
    name: "Developer Sandbox",
    description: "Ideal for individual developers building prototypes and running evaluation prompts.",
    priceMonthly: 0,
    priceAnnually: 0,
    features: [
      "Up to 15,000 monthly assertion requests",
      "Interactive AI Content Lab Access",
      "Standard 14.2ms latency threshold",
      "Community pipeline supports",
      "API request tracking metrics"
    ],
    ctaText: "Get Started Free",
  },
  {
    id: "pro",
    name: "Growth Pro",
    description: "Perfect for scaling SaaS agencies delivering production-grade AI features to active clients.",
    priceMonthly: 79,
    priceAnnually: 63,
    features: [
      "Up to 500,000 monthly assertion requests",
      "Real-time cluster priority routing",
      "Full API console history analytics",
      "Team collaboration space (5 seats)",
      "Premium 24/7 priority discord setup",
      "SOC2 compliance integration guidelines"
    ],
    isPopular: true,
    ctaText: "Launch Core Pro",
  },
  {
    id: "enter",
    name: "Enterprise Core",
    description: "Designed for high-traffic platforms requiring strict custom SLA, dedicated node, and physical storage.",
    priceMonthly: 349,
    priceAnnually: 279,
    features: [
      "Unlimited monthly assertion requests",
      "Custom dedicated regional server nodes",
      "Average 6ms custom edge caching",
      "Integrated military sanitization layers",
      "Dedicated account manager & Slack channels",
      "Custom SLA & SOC2 audits documentation"
    ],
    ctaText: "Inquire Custom Setup",
  }
];

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");

  return (
    <section 
      id="pricing" 
      className="relative py-24 sm:py-32 bg-black overflow-hidden border-t border-purple-500/10"
    >
      {/* Visual background elements */}
      <div className="absolute top-[20%] left-1/4 w-[450px] h-[450px] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-600/5 blur-[110px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Module Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-mono font-bold text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full">
            Transparent Scaling
          </span>
          <h2 className="mt-4 text-3xl sm:text-5xl font-sans font-bold text-white tracking-tight">
            Predictable Plans, Dynamic Value
          </h2>
          <p className="mt-4 text-gray-400 text-lg text-balance">
            Deploy as a developer for free and scale smoothly into a Growth Pro custom configuration as your pipeline metrics expand.
          </p>

          {/* Monthly / Annually Toggle Button */}
          <div className="mt-10 flex items-center justify-center space-x-4">
            <span className={`text-sm font-medium transition-colors ${billingCycle === "monthly" ? "text-white" : "text-gray-500"}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === "monthly" ? "annual" : "monthly")}
              className="relative w-14 h-7 bg-neutral-800 rounded-full border border-purple-500/20 focus:outline-none transition-all duration-300"
              aria-label="Toggle annual pricing"
              id="billing-cycle-toggle"
            >
              <div 
                className={`absolute top-0.5 w-5.5 h-5.5 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300 ${
                  billingCycle === "annual" ? "left-7.5" : "left-0.5"
                }`} 
              />
            </button>
            <span className={`text-sm font-medium transition-colors flex items-center space-x-1 ${billingCycle === "annual" ? "text-white" : "text-gray-500"}`}>
              <span>Annually</span>
              <span className="text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-400 px-2 py-0.5 rounded-full">
                Save 20%
              </span>
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className={`rounded-2xl border bg-neutral-950/40 p-8 flex flex-col justify-between relative overflow-hidden ${
                plan.isPopular 
                  ? "border-purple-500 shadow-2xl shadow-purple-500/5 lg:-translate-y-4" 
                  : "border-white/10 hover:border-white/20"
              }`}
            >
              {/* Special popular tag and visual glow effects */}
              {plan.isPopular && (
                <>
                  <div className="absolute top-0 right-0 h-2 w-full bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600" />
                  <div className="absolute top-5 right-5 inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-purple-500/10 text-xs font-mono font-semibold text-purple-300 uppercase tracking-wider">
                    <Sparkles className="h-3 w-3 text-purple-400" />
                    <span>Highly Popular</span>
                  </div>
                </>
              )}

              <div>
                {/* Header info */}
                <h3 className="text-xl font-bold text-white font-sans">{plan.name}</h3>
                <p className="mt-2 text-sm text-gray-400 min-h-[40px] leading-relaxed">
                  {plan.description}
                </p>

                {/* Big Price tag */}
                <div className="mt-6 flex items-baseline">
                  <span className="text-4xl sm:text-5xl font-sans font-bold text-white">
                    ${billingCycle === "monthly" ? plan.priceMonthly : plan.priceAnnually}
                  </span>
                  <span className="ml-2 text-sm text-gray-500 font-mono">/ mo</span>
                </div>

                {/* Bullets feature list */}
                <ul className="mt-8 space-y-4 border-t border-white/5 pt-6 text-sm text-gray-300 leading-normal">
                  {plan.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start space-x-3 text-sm">
                      <Check className="h-4.5 w-4.5 text-purple-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Call to action launch button */}
              <div className="mt-8">
                <button
                  type="button"
                  className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 focus:outline-none flex items-center justify-center space-x-2 ${
                    plan.isPopular
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/20 hover:scale-[1.02]"
                      : "bg-white/5 hover:bg-white/10 border border-white/10 text-gray-200 hover:text-white"
                  }`}
                  id={`pricing-cta-${plan.id}`}
                >
                  <span>{plan.ctaText}</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
