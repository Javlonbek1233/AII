/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import DashboardPreview from "./components/DashboardPreview";
import Features from "./components/Features";
import Stats from "./components/Stats";
import Testimonials from "./components/Testimonials";
import Pricing from "./components/Pricing";
import FAQ from "./components/FAQ";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans selection:bg-purple-500/30 selection:text-white ${
      darkMode ? "bg-black text-white" : "bg-slate-50 text-slate-900"
    }`}>
      {/* Upper absolute atmospheric lights */}
      <div className="absolute top-0 inset-x-0 h-[600px] bg-gradient-to-b from-purple-900/10 via-blue-900/5 to-transparent pointer-events-none" />

      {/* Main content layout stack */}
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="relative">
        <Hero />
        
        {/* Decorative divider section wrap */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-900/10 to-transparent pointer-events-none opacity-40" />
          <DashboardPreview />
        </div>

        <Features />
        
        <Stats />
        
        <Pricing />
        
        <Testimonials />
        
        <Blog />
        
        <FAQ />
        
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
