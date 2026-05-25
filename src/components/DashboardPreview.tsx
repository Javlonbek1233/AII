import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  BarChart3, Brain, Play, RotateCcw, Activity, ArrowUpRight, 
  Sparkles, Check, AlertCircle, RefreshCw, Cpu, Layers 
} from "lucide-react";

// Types for AI sandbox templates
interface AIPreset {
  id: string;
  label: string;
  query: string;
  context: "copywrite" | "analyze" | "general";
}

const AI_PRESETS: AIPreset[] = [
  {
    id: "marketing",
    label: "Aetheris Launch Copy",
    query: "Draft a high-converting, tech-focused LinkedIn tagline for the launch of Aetheris AI analytics platform.",
    context: "copywrite"
  },
  {
    id: "system",
    label: "Analyze Server Latency",
    query: "Summarize this system anomaly: 'ERR_TIMEOUT at US-East db-write node, re-routed 2400 queries. Average latency spiked to 240ms.'",
    context: "analyze"
  },
  {
    id: "feature",
    label: "SaaS Taglines",
    query: "Generate three premium, benefit-driven product taglines about real-time dashboard analytics.",
    context: "copywrite"
  }
];

export default function DashboardPreview() {
  const [activeTab, setActiveTab] = useState<"insights" | "ai-studio">("insights");
  
  // Simulated stats state toggled for interactive feeling
  const [metricMultiplier, setMetricMultiplier] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // AI sandbox state
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiContext, setAiContext] = useState<"copywrite" | "analyze" | "general">("copywrite");
  const [aiResult, setAiResult] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [configError, setConfigError] = useState<string | null>(null);

  const triggerMetricsRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setMetricMultiplier(1 + Math.random() * 0.15);
      setIsRefreshing(false);
    }, 800);
  };

  const handleAIQuery = async (promptText: string, ctx: "copywrite" | "analyze" | "general") => {
    if (!promptText.trim()) return;
    setIsGenerating(true);
    setConfigError(null);
    setAiResult("");

    try {
      const response = await fetch("/api/gemini/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: promptText,
          context: ctx,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.isConfigError) {
          setConfigError("Gemini API key is not yet set in Settings > Secrets. Showing simulated output representation below:");
          // Simulate generated response for elegant fallback representation
          setTimeout(() => {
            getSimulatedOutput(promptText, ctx);
          }, 1200);
        } else {
          throw new Error(data.error || "An API error occurred");
        }
      } else {
        setAiResult(data.text);
        setIsGenerating(false);
      }
    } catch (err: any) {
      console.error(err);
      setConfigError("Failed to fetch from server. Below is an offline mock response:");
      getSimulatedOutput(promptText, ctx);
    }
  };

  const getSimulatedOutput = (promptText: string, ctx: "copywrite" | "analyze" | "general") => {
    let mockText = "";
    if (ctx === "copywrite") {
      mockText = '✦ Aetheris AI turns silent system data into atomic customer growth. Automate insights, claim your hours. 🚀';
    } else if (ctx === "analyze") {
      mockText = '• Root Cause: High database concurrency spike on DB Node 4.\n• Actions taken: Auto-routed 2,400 query workflows smoothly.\n• Impact: Average latency recovered to 14ms inside 60 seconds.';
    } else {
      mockText = `Aetheris platform computed the parameters for: "${promptText}". Predictive signals are optimized successfully!`;
    }
    setAiResult(mockText);
    setIsGenerating(false);
  };

  return (
    <section 
      id="dashboard" 
      className="relative py-24 sm:py-32 bg-black overflow-hidden border-t border-purple-500/10"
    >
      {/* Background visual detail */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title & Description */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-sans font-bold text-white tracking-tight">
            Next-Gen SaaS Control Center
          </h2>
          <p className="mt-4 text-gray-400 text-lg">
            Experience our multi-dimensional system analytics console. Toggle views to trial live conversion predictions or run the built-in AI assistant.
          </p>
        </div>

        {/* Outer Glassmorphic Container frame */}
        <div className="relative rounded-2xl border border-white/10 dark:border-white/5 bg-neutral-950/60 backdrop-blur-3xl shadow-2xl overflow-hidden shadow-purple-500/5">
          {/* Header Bar of Dashboard representation */}
          <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5 gap-4">
            <div className="flex items-center space-x-3">
              <div className="flex space-x-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-500" />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
              </div>
              <span className="h-4 w-[1px] bg-white/20 hidden sm:block" />
              <div className="flex items-center space-x-2 text-xs text-gray-400 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>Console Core v2.0-STABLE</span>
              </div>
            </div>

            {/* Main Tabs */}
            <div className="flex space-x-1 p-1 bg-black/45 rounded-lg border border-white/10">
              <button
                onClick={() => setActiveTab("insights")}
                className={`flex items-center space-x-1.5 px-4 py-1.5 rounded-md text-xs font-semibold font-mono transition-all focus:outline-none ${
                  activeTab === "insights"
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md shadow-purple-500/10"
                    : "text-gray-400 hover:text-white"
                }`}
                id="tab-insights"
              >
                <BarChart3 className="h-3.5 w-3.5" />
                <span>Performance Overview</span>
              </button>
              <button
                onClick={() => setActiveTab("ai-studio")}
                className={`flex items-center space-x-1.5 px-4 py-1.5 rounded-md text-xs font-semibold font-mono transition-all focus:outline-none ${
                  activeTab === "ai-studio"
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md shadow-purple-500/10"
                    : "text-gray-400 hover:text-white"
                }`}
                id="tab-ai-studio"
              >
                <Brain className="h-3.5 w-3.5" />
                <span>Interactive AI Content Lab</span>
              </button>
            </div>
          </div>

          {/* Interactive Views */}
          <div className="p-6 min-h-[460px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              {activeTab === "insights" ? (
                // VIEW A: PERFORMANCE OVERVIEW SCREEN
                <motion.div
                  key="insights"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Metric row */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-5 rounded-xl border border-white/5 bg-white/2 backdrop-blur-md">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-500 text-xs font-mono font-medium">MONTHLY ACTIVE SESSIONS</span>
                        <span className="text-emerald-500 text-xs font-mono flex items-center bg-emerald-500/10 px-2 py-0.5 rounded-full">+14.2%</span>
                      </div>
                      <div className="flex items-baseline space-x-2">
                        <span className="text-3xl font-sans font-bold tracking-tight text-white">
                          {Math.floor(1342500 * metricMultiplier).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-[10px] text-gray-500 font-mono mt-1">Updated in real-time</p>
                    </div>

                    <div className="p-5 rounded-xl border border-white/5 bg-white/2 backdrop-blur-md">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-500 text-xs font-mono font-medium">AI ACCURACY INDEX</span>
                        <span className="text-purple-400 text-xs font-mono flex items-center bg-purple-500/10 px-2 py-0.5 rounded-full">Optimal</span>
                      </div>
                      <div className="flex items-baseline space-x-2">
                        <span className="text-3xl font-sans font-bold tracking-tight text-white">99.84%</span>
                      </div>
                      <p className="text-[10px] text-gray-500 font-mono mt-1">Confidence rating threshold</p>
                    </div>

                    <div className="p-5 rounded-xl border border-white/5 bg-white/2 backdrop-blur-md">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-500 text-xs font-mono font-medium">EST. AWS INFRA SAVINGS</span>
                        <span className="text-blue-400 text-xs font-mono flex items-center bg-blue-500/10 px-2 py-0.5 rounded-full">Max Efficiency</span>
                      </div>
                      <div className="flex items-baseline space-x-2">
                        <span className="text-3xl font-sans font-bold tracking-tight text-white">
                          ${Math.floor(42810 * metricMultiplier).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-[10px] text-gray-500 font-mono mt-1">Platform automated optimization</p>
                    </div>
                  </div>

                  {/* Layout: Chart preview mock on left, operations logs on right */}
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                    {/* Visual Bar Chart simulation */}
                    <div className="p-5 rounded-xl border border-white/5 bg-white/2 lg:col-span-3">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-2">
                          <Activity className="h-4 w-4 text-purple-400" />
                          <span className="text-sm font-semibold font-mono text-white">PREDICTIVE SECTOR LATENCY</span>
                        </div>
                        <button
                          onClick={triggerMetricsRefresh}
                          disabled={isRefreshing}
                          className="p-1 px-3.5 rounded-lg border border-purple-500/30 bg-purple-500/5 hover:bg-purple-500/15 text-purple-300 text-xs font-mono flex items-center space-x-1 transition-all"
                        >
                          <RefreshCw className={`h-3 w-3 ${isRefreshing ? "animate-spin" : ""}`} />
                          <span>Refresh System</span>
                        </button>
                      </div>

                      {/* Floating Graphic Simulation */}
                      <div className="h-[210px] flex items-end justify-between px-2 pt-4 relative">
                        {/* Grid Lines */}
                        <div className="absolute inset-0 flex flex-col justify-between py-1 border-b border-white/5 pointer-events-none">
                          <div className="border-b border-white/[0.04] w-full" />
                          <div className="border-b border-white/[0.04] w-full" />
                          <div className="border-b border-white/[0.04] w-full" />
                        </div>

                        {/* Interactive Bars */}
                        {[72, 54, 88, 65, 94, 48, 77, 60, 85, 99].map((val, idx) => (
                          <div key={idx} className="flex flex-col items-center group w-6 sm:w-8 z-10">
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: `${val}%` }}
                              transition={{ duration: 0.8, delay: idx * 0.04 }}
                              className="w-full rounded-t-lg bg-gradient-to-t from-blue-600/70 via-purple-600 to-purple-400 relative overflow-hidden group-hover:scale-x-110 transition-transform shadow-lg shadow-purple-500/10"
                            >
                              <div className="absolute inset-x-0 top-0 h-1 bg-white/40" />
                            </motion.div>
                            <span className="text-[10px] text-gray-500 font-mono mt-2 flex">S{idx + 1}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Simulation Live System Stream Logs */}
                    <div className="p-5 rounded-xl border border-white/5 bg-white/2 lg:col-span-2 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-xs font-semibold font-mono text-gray-400 uppercase tracking-widest">AETHERIS AGENT LOGS</span>
                          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded">CONNECTED</span>
                        </div>
                        <div className="space-y-3 font-mono text-[11px] text-gray-400">
                          <div className="flex items-start space-x-2">
                            <span className="text-purple-400">[09:41:00]</span>
                            <span>Model alias 'gemini-3.5-flash' connected.</span>
                          </div>
                          <div className="flex items-start space-x-2 text-blue-300">
                            <span className="text-purple-400">[09:41:15]</span>
                            <span>Latency forecast routine loaded dynamically.</span>
                          </div>
                          <div className="flex items-start space-x-2 text-rose-400/90">
                            <span className="text-purple-400">[09:41:35]</span>
                            <span>CPU throttling automatically corrected (99.8%)</span>
                          </div>
                          <div className="flex items-start space-x-2">
                            <span className="text-purple-400">[09:41:59]</span>
                            <span>Aetheris Platform sync: Success in 1500ms.</span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-white/5 text-[10px] text-purple-400 font-mono flex items-center justify-between">
                        <span>Cluster: Node-East-US-4</span>
                        <span>SLA: COMPLIANT</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                // VIEW B: ACTIVE AI CONTENT PLAYGROUND DEMO (REAL GEMINI INTERACTION!)
                <motion.div
                  key="ai-studio"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6 flex flex-col justify-between"
                >
                  {/* Preset Buttons */}
                  <div>
                    <span className="text-xs font-mono font-medium text-gray-400 block mb-3">
                      CLICK A TEMPLATE PRESET TO TRY:
                    </span>
                    <div className="flex flex-wrap gap-2.5">
                      {AI_PRESETS.map((preset) => (
                        <button
                          key={preset.id}
                          onClick={() => {
                            setAiPrompt(preset.query);
                            setAiContext(preset.context);
                          }}
                          className={`px-4 py-2.5 rounded-xl border text-xs font-medium font-sans flex items-center space-x-2 transition-all ${
                            aiPrompt === preset.query
                              ? "bg-purple-900/40 text-purple-300 border-purple-500"
                              : "bg-white/2 hover:bg-white/10 text-gray-300 border-white/5"
                          }`}
                        >
                          <Sparkles className="h-3.5 w-3.5 text-purple-400" />
                          <span>{preset.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Prompt Textbox */}
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
                    {/* Sandbox Controls Form */}
                    <div className="lg:col-span-3 space-y-4">
                      <div>
                        <label className="text-xs font-mono font-medium text-gray-400 uppercase tracking-widest block mb-1.5">
                          Enter custom prompt description
                        </label>
                        <textarea
                          rows={4}
                          value={aiPrompt}
                          onChange={(e) => setAiPrompt(e.target.value)}
                          placeholder="Type your own instructions or marketing prompts..."
                          className="w-full px-4 py-3 rounded-xl bg-black border border-white/10 text-gray-200 placeholder-gray-500 font-mono text-xs focus:outline-none focus:border-purple-500 transition-all font-sans"
                        />
                      </div>

                      {/* System Role Trigger Controls */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex space-x-2">
                          {(["copywrite", "analyze", "general"] as const).map((ctxType) => (
                            <button
                              key={ctxType}
                              type="button"
                              onClick={() => setAiContext(ctxType)}
                              className={`px-3 py-1.5 rounded-lg border text-[11px] font-mono capitalize transition-all focus:outline-none ${
                                aiContext === ctxType
                                  ? "bg-purple-500/10 text-purple-300 border-purple-500/40"
                                  : "bg-transparent text-gray-500 border-white/5 hover:bg-white/5"
                              }`}
                            >
                              {ctxType}
                            </button>
                          ))}
                        </div>

                        <button
                          onClick={() => handleAIQuery(aiPrompt, aiContext)}
                          disabled={isGenerating || !aiPrompt.trim()}
                          className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/20 text-xs font-bold flex items-center justify-center space-x-2 hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:pointer-events-none focus:outline-none self-end sm:self-auto"
                        >
                          {isGenerating ? (
                            <>
                              <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                              <span>Generating...</span>
                            </>
                          ) : (
                            <>
                              <Play className="h-3 w-3 fill-current" />
                              <span>Execute Gemini Stream</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Live response block */}
                    <div className="lg:col-span-2 border border-white/10 rounded-xl bg-black/60 p-5 min-h-[220px] flex flex-col justify-between relative overflow-hidden">
                      {/* Subdued corner icons */}
                      <div className="absolute top-4 right-4 text-purple-500/10 pointer-events-none">
                        <Cpu className="h-16 w-16" />
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2.5">
                          <span className="text-xs font-mono font-bold text-white tracking-widest uppercase flex items-center space-x-1.5">
                            <Layers className="h-3.5 w-3.5 text-blue-400" />
                            <span>AI Output Shell</span>
                          </span>
                          <span className="text-[10px] font-mono text-purple-400 px-2 py-0.5 rounded bg-purple-500/15">
                            Gemini-3.5-flash
                          </span>
                        </div>

                        {/* Config warning message, rendered gracefully if the user has not pasted API key */}
                        {configError && (
                          <div className="mb-3 p-3 rounded-lg bg-indigo-950/25 border border-indigo-500/30 text-indigo-300 text-[10px] leading-relaxed flex items-start space-x-2">
                            <AlertCircle className="h-4 w-4 shrink-0 text-indigo-400" />
                            <span>{configError}</span>
                          </div>
                        )}

                        {/* Actual content string layout */}
                        {aiResult ? (
                          <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-xs font-mono text-gray-200 leading-relaxed overflow-y-auto max-h-[140px]"
                          >
                            {aiResult}
                          </motion.p>
                        ) : isGenerating ? (
                          <div className="flex flex-col space-y-2">
                            <div className="h-2.5 bg-purple-500/20 rounded-full w-3/4 animate-pulse" />
                            <div className="h-2.5 bg-blue-500/20 rounded-full w-5/6 animate-pulse" />
                            <div className="h-2.5 bg-purple-500/10 rounded-full w-1/2 animate-pulse" />
                          </div>
                        ) : (
                          <p className="text-xs font-mono text-gray-500 italic">
                            Select a template preset or specify instructions, then press Execute to fetch Gemini instructions...
                          </p>
                        )}
                      </div>

                      {aiResult && (
                        <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] text-gray-500 font-mono">
                          <span className="text-emerald-500 flex items-center space-x-1">
                            <Check className="h-3 w-3" />
                            <span>Success (Real-time token proxy)</span>
                          </span>
                          <button 
                            onClick={() => {
                              setAiResult("");
                              setAiPrompt("");
                              setConfigError(null);
                            }}
                            className="hover:text-white transition-colors"
                          >
                            Clear Shell
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
