import { useState } from "react";
import { motion } from "motion/react";
import { Cpu, Github, Twitter, Linkedin, Slack, Mail, ArrowRight, Check } from "lucide-react";

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isLogged, setIsLogged] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !newsletterEmail.includes("@")) return;

    setIsLogged(true);
    setNewsletterEmail("");
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-black border-t border-white/10 text-gray-400 py-16 sm:py-20 overflow-hidden">
      
      {/* Glow visual highlights */}
      <div className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-gradient-to-t from-purple-600/10 to-transparent blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top block */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 sm:gap-8 pb-12 border-b border-white/5">
          
          {/* Brand details */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-xl bg-gradient-to-tr from-purple-600 to-blue-500 text-white">
                <Cpu className="h-4 w-4" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Aetheris<span className="text-purple-500">.ai</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed max-w-sm text-gray-500">
              Aetheris delivers premium predictive SaaS routing models and real-time dashboard analytics. Hardened security, sub-microsecond pipelines, SOC2 integrated guidelines.
            </p>
            
            {/* Social Icons list */}
            <div className="flex space-x-4">
              <a href="#" className="p-2 rounded-lg bg-white/5 border border-white/5 hover:border-purple-500/30 hover:bg-purple-500/10 text-gray-400 hover:text-white transition-all">
                <Github className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-white/5 border border-white/5 hover:border-purple-500/30 hover:bg-purple-500/10 text-gray-400 hover:text-white transition-all">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-white/5 border border-white/5 hover:border-purple-500/30 hover:bg-purple-500/10 text-gray-400 hover:text-white transition-all">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-white/5 border border-white/5 hover:border-purple-500/30 hover:bg-purple-500/10 text-gray-400 hover:text-white transition-all">
                <Slack className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Nav Block 1 */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">Solution Stack</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#features" className="hover:text-white transition-colors">Platform Routing</a></li>
              <li><a href="#dashboard" className="hover:text-white transition-colors">Dashboard Overview</a></li>
              <li><a href="#metrics" className="hover:text-white transition-colors">SLA Guarantees</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing Comparison</a></li>
            </ul>
          </div>

          {/* Nav Block 2 */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">Engineering Base</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#faq" className="hover:text-white transition-colors">Developer Q&A</a></li>
              <li><a href="#blog" className="hover:text-white transition-colors">SaaS Articles</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API Docs Sandbox</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cluster Status</a></li>
            </ul>
          </div>

          {/* Newsletter subscription form */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">Platform Bulletins</h4>
            <p className="text-[11px] text-gray-500 leading-relaxed">
              Subscribe to get immediate notification on network latency statistics and telemetry pipelines.
            </p>

            {isLogged ? (
              <div className="p-3.5 rounded-xl bg-purple-500/5 border border-purple-500/20 text-purple-400 text-xs flex items-center space-x-2">
                <Check className="h-4 w-4 shrink-0 text-purple-400" />
                <span className="font-mono font-semibold">Subscription Logged!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="relative flex items-center">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="news@agency.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-white/10 text-xs text-gray-300 placeholder-gray-600 font-mono focus:outline-none focus:border-purple-500 focus:ring-0 transition-colors pr-12"
                />
                <button
                  type="submit"
                  className="absolute right-1 p-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white transition-colors focus:outline-none"
                  aria-label="Submit subscribe email"
                >
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom copyright block */}
        <div className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-[10px] font-mono text-gray-600">
          <span>&copy; {currentYear} Aetheris AI, Inc. SOC2 Type II Certified Pipeline.</span>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-gray-400 transition-colors">Privacy Charter</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Platform SLA Clause</a>
            <a href="#" className="hover:text-gray-400 transition-colors">API Disclosures</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
