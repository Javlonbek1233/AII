import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Check, AlertCircle, Send, Globe, MessageSquare } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "support",
    message: ""
  });

  const [isSending, setIsSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMsg("Please fill out all mandatory fields.");
      return;
    }

    setIsSending(true);
    setErrorMsg(null);

    // Simulate sending network telemetry securely
    setTimeout(() => {
      setIsSending(false);
      setSuccess(true);
      setFormData({ name: "", email: "", subject: "support", message: "" });
    }, 1500);
  };

  return (
    <section 
      id="contact" 
      className="relative py-24 sm:py-32 bg-black overflow-hidden border-t border-purple-500/10"
    >
      {/* Background glow visual aesthetics */}
      <div className="absolute top-[30%] left-1/3 w-[500px] h-[500px] bg-purple-600/5 blur-[125px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Module Header layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          
          {/* Info Column left */}
          <div className="lg:col-span-2 space-y-6">
            <span className="text-xs font-mono font-bold text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full uppercase tracking-widest flex items-center w-fit space-x-1">
              <MessageSquare className="h-3.5 w-3.5" />
              <span>Contact Desk</span>
            </span>
            
            <h2 className="text-3xl sm:text-5xl font-sans font-bold text-white tracking-tight leading-none">
              Deploy with Aetheris
            </h2>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              Have customized telemetry requirements, SOC2 integration questions, or need enterprise SLAs? Fill out our secure contact registry and a senior cloud specialist will reply to you within two hours.
            </p>

            <div className="pt-6 space-y-4 text-xs font-mono text-gray-400 leading-normal">
              <div className="flex items-center space-x-3">
                <Mail className="h-4.5 w-4.5 text-purple-400" />
                <span>support@aetheris.ai</span>
              </div>
              <div className="flex items-center space-x-3">
                <Globe className="h-4.5 w-4.5 text-blue-450" />
                <span>Cloud Run Cluster 12.A-West</span>
              </div>
            </div>
          </div>

          {/* Form Column right */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-white/10 bg-neutral-950/60 p-6 sm:p-8 backdrop-blur-3xl shadow-2xl relative overflow-hidden">
              
              <AnimatePresence mode="wait">
                {success ? (
                  // Success layout State
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="py-12 text-center space-y-4"
                  >
                    <div className="inline-flex p-4 rounded-full bg-emerald-500/10 border border-emerald-550/30 text-emerald-400 mb-2">
                      <Check className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold text-white font-sans">Payload Transmitted Successfully</h3>
                    <p className="text-xs text-gray-400 max-w-sm mx-auto leading-relaxed">
                      Your query request was written safely. Our regional support teams have scheduled an automatic follow-up sequence.
                    </p>
                    <button
                      onClick={() => setSuccess(false)}
                      className="mt-6 px-6 py-2.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-xs text-gray-200 hover:text-white transition-all focus:outline-none"
                    >
                      Transmit Another Message
                    </button>
                  </motion.div>
                ) : (
                  // Editable Input Form
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-5"
                  >
                    {errorMsg && (
                      <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center space-x-2">
                        <AlertCircle className="h-4 w-4 text-rose-400 shrink-0" />
                        <span>{errorMsg}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="contact-name" className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest block mb-1.5">
                          Full Name *
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Devon Smith"
                          className="w-full px-4 py-3 rounded-xl bg-black border border-white/10 text-gray-200 placeholder-gray-600 text-xs font-mono focus:outline-none focus:border-purple-500 transition-all"
                        />
                      </div>
                      <div>
                        <label htmlFor="contact-email" className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest block mb-1.5">
                          Email Address *
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="devon@agency.io"
                          className="w-full px-4 py-3 rounded-xl bg-black border border-white/10 text-gray-200 placeholder-gray-600 text-xs font-mono focus:outline-none focus:border-purple-500 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="contact-subject" className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest block mb-1.5">
                        Subject Theme
                      </label>
                      <select
                        id="contact-subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-black border border-white/10 text-gray-300 text-xs font-mono focus:outline-none focus:border-purple-500 transition-all cursor-pointer"
                      >
                        <option value="support">Enterprise SLA Quote</option>
                        <option value="technical">Technical Model Integrations</option>
                        <option value="billing">Developer Partnership / Support</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="contact-message" className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest block mb-1.5">
                        Message Payload *
                      </label>
                      <textarea
                        id="contact-message"
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Detail your request..."
                        className="w-full px-4 py-3 rounded-xl bg-black border border-white/10 text-gray-200 placeholder-gray-600 text-xs font-mono focus:outline-none focus:border-purple-500 transition-all font-sans"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSending}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-purple-500/10 hover:shadow-purple-500/25 hover:scale-[1.01] transition-all disabled:opacity-50 disabled:pointer-events-none focus:outline-none"
                      id="submit-contact-button"
                    >
                      {isSending ? (
                        <>
                          <div className="w-4 h-4 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                          <span>Routing Telemetry Pipeline...</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-3.5 w-3.5 text-white" />
                          <span>Transmit Secure Query</span>
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
