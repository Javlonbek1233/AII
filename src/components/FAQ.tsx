import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HelpCircle, ChevronDown } from "lucide-react";
import { FAQItem } from "../types";

const faqItems: FAQItem[] = [
  {
    id: "f-1",
    category: "Platform",
    question: "How does Aetheris deliver a mean 11.4ms response time?",
    answer: "Aetheris runs built-in regional server caching nodes paired with smart predictive routing algorithms. If a prompt or analysis has high correlation to previously evaluated structures, we fulfill standard predictions client-side or from near-edge CDN memories, escaping the cold start delays of raw server iterations."
  },
  {
    id: "f-2",
    category: "Integration",
    question: "What model runs behind the Interactive AI Content Lab?",
    answer: "Our dashboard demo playground is driven server-side by the stable, high-speed 'gemini-3.5-flash' model via the modern @google/genai TypeScript SDK. We laziness-eval the credentials to ensure smooth client operations even if your local API secrets are being configured on the fly."
  },
  {
    id: "f-3",
    category: "Contracts & Pricing",
    question: "Can I cancel, downgrade, or scale up my plan at any time?",
    answer: "Absolutely. All subscriptions are metered monthly or annually without lock-in contracts. When upgrading or downgrading, your active API metrics and request token allocations are instantly pro-rated with absolute accuracy."
  },
  {
    id: "f-4",
    category: "Security & Privacy",
    question: "Is raw customer traffic or personal log data saved?",
    answer: "No. Aetheris is fully SOC2 compliance guided. Payload files and text metadata are evaluated on a write-and-forget channel. We sanitization-filter all inputs through local military shielding layers and strictly avoid persistent DB tracking unless you explicitly hook an external Room database."
  }
];

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>("f-1");

  const toggleAccordion = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section 
      id="faq" 
      className="relative py-24 sm:py-32 bg-black overflow-hidden border-t border-purple-500/10"
    >
      {/* Background glow visual styling */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative">
        
        {/* Module Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/5 font-mono text-xs text-purple-300">
            <HelpCircle className="h-3.5 w-3.5" />
            <span>Support Q&A</span>
          </div>
          <h2 className="mt-4 text-3xl sm:text-5xl font-sans font-bold text-white tracking-tight">
            Frequently Asked Queries
          </h2>
        </div>

        {/* Collapsible item stack */}
        <div className="space-y-4">
          {faqItems.map((item, idx) => {
            const isOpen = openId === item.id;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                viewport={{ once: true }}
                className={`rounded-xl border transition-all duration-300 overflow-hidden ${
                  isOpen 
                    ? "border-purple-500 bg-purple-950/10" 
                    : "border-white/10 hover:border-white/20 bg-neutral-950/45"
                }`}
              >
                {/* Trigger Button bar */}
                <button
                  onClick={() => toggleAccordion(item.id)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none focus:ring-1 focus:ring-purple-500/40"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item.id}`}
                  id={`faq-trigger-${item.id}`}
                >
                  <span className="text-base font-semibold text-white font-sans pr-4">
                    {item.question}
                  </span>
                  <ChevronDown className={`h-4.5 w-4.5 text-purple-400 shrink-0 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`} />
                </button>

                {/* Animated collapsing item text */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${item.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-5 pt-1 text-sm text-gray-400 leading-relaxed border-t border-white/5 font-sans">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
