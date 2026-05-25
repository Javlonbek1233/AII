import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { Testimonial } from "../types";

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Jenkins",
    role: "VP of Product",
    company: "CloudVibe Solutions",
    content: "Deploying Aetheris was the single best decision we made for our telemetry infrastructure. Bypassing manual pipelines and leveraging their real-time Gemini routing saved us an estimated 25 hours per week of manual optimization work.",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80",
    rating: 5,
  },
  {
    id: "2",
    name: "Marcus Chen",
    role: "Lead Engineer",
    company: "Symphony Labs",
    content: "The Interactive AI Content Lab on the dashboard was exactly what our core team needed to try alternative copywriting templates. Seamless API delivery and SOC2 security give us complete piece of mind for standard enterprise workloads.",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80",
    rating: 5,
  },
  {
    id: "3",
    name: "Elena Rostova",
    role: "Founder & CTO",
    company: "NexusHealth",
    content: "We were highly skeptical about latency averages, but the 11.4ms mean response is absolutely genuine. We transitioned our entire prompt evaluation logic directly to Aetheris within 48 hours.",
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&h=120&q=80",
    rating: 5,
  }
];

export default function Testimonials() {
  const [currentIdx, setCurrentIdx] = useState(0);

  const slidePrev = () => {
    setCurrentIdx((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const slideNext = () => {
    setCurrentIdx((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const active = testimonials[currentIdx];

  return (
    <section 
      id="testimonials" 
      className="relative py-24 sm:py-32 bg-black overflow-hidden border-t border-purple-500/10"
    >
      {/* Visual Backdrops */}
      <div className="absolute bottom-1/4 right-[10%] w-[350px] h-[350px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative">
        
        {/* Module Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest bg-blue-500/10 px-3 py-1 rounded-full">
            Client Voices
          </span>
          <h2 className="mt-4 text-3xl sm:text-5xl font-sans font-bold text-white tracking-tight">
            Trusted by Builders Globally
          </h2>
        </div>

        {/* Testimonial card slider frame */}
        <div className="relative rounded-2xl border border-white/10 bg-neutral-950/60 p-8 sm:p-12 backdrop-blur-3xl shadow-2xl">
          {/* Quote bubble mark decoration */}
          <div className="absolute top-8 right-8 text-purple-500/10 pointer-events-none">
            <Quote className="h-20 w-20 transform scale-x-[-1]" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Stars representation */}
              <div className="flex space-x-1">
                {[...Array(active.rating)].map((_, i) => (
                  <Star key={i} className="h-4.5 w-4.5 text-amber-400 fill-amber-400" />
                ))}
              </div>

              {/* Quote Content text */}
              <blockquote className="text-lg sm:text-xl text-gray-200 font-sans italic leading-relaxed">
                "{active.content}"
              </blockquote>

              {/* Client Info row */}
              <div className="flex items-center space-x-4 pt-4 border-t border-white/5">
                <img
                  src={active.avatarUrl}
                  alt={active.name}
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-full border border-purple-500/30 object-cover"
                />
                <div>
                  <div className="text-sm font-bold text-white font-sans">{active.name}</div>
                  <div className="text-xs text-gray-400 font-mono">
                    {active.role} — <span className="text-purple-400 font-bold">{active.company}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Nav Controls buttons */}
          <div className="absolute bottom-8 right-8 flex space-x-2">
            <button
              onClick={slidePrev}
              className="p-2 rounded-xl border border-white/10 hover:border-purple-500/40 bg-white/2 hover:bg-purple-500/10 text-gray-400 hover:text-white transition-all focus:outline-none"
              aria-label="Previous testimonial"
              id="testimonial-prev-button"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={slideNext}
              className="p-2 rounded-xl border border-white/10 hover:border-purple-500/40 bg-white/2 hover:bg-purple-500/10 text-gray-400 hover:text-white transition-all focus:outline-none"
              aria-label="Next testimonial"
              id="testimonial-next-button"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Small slide dot indicators */}
        <div className="flex justify-center space-x-2 mt-8">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIdx(idx)}
              className={`h-1.5 rounded-full transition-all focus:outline-none ${
                currentIdx === idx ? "w-8 bg-purple-500" : "w-1.5 bg-gray-600 hover:bg-gray-400"
              }`}
              aria-label={`Go to testimonial ${idx + 1}`}
              id={`testimonial-dot-${idx}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
