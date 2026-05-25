import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Sun, Moon, Cpu, ChevronRight } from "lucide-react";

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const navLinks = [
  { name: "Features", href: "#features" },
  { name: "SaaS Dashboard", href: "#dashboard" },
  { name: "Metrics", href: "#metrics" },
  { name: "Pricing", href: "#pricing" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Articles", href: "#blog" },
  { name: "FAQ", href: "#faq" },
];

export default function Navbar({ darkMode, toggleDarkMode }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      setIsOpen(false);
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "py-3 bg-black/60 dark:bg-black/70 border-b border-purple-500/10 backdrop-blur-xl"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => scrollToSection(e, "hero")}
            className="flex items-center space-x-2 group focus:outline-none"
            id="nav-logo"
          >
            <div className="p-2 rounded-xl bg-gradient-to-tr from-purple-600 to-blue-500 text-white shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-transform duration-300">
              <Cpu className="h-5 w-5 animate-pulse" />
            </div>
            <span className="text-xl font-sans font-bold tracking-tight bg-gradient-to-r from-white via-purple-300 to-blue-200 bg-clip-text text-transparent group-hover:opacity-90 transition-opacity">
              Aetheris<span className="text-purple-500 font-normal">.ai</span>
            </span>
          </a>

          {/* Nav links - Desktop */}
          <div className="hidden lg:flex items-center space-x-1 bg-white/5 dark:bg-white/5 py-1.5 px-3 rounded-full border border-white/10 dark:border-white/5 backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href.substring(1))}
                className="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 text-gray-300 hover:text-white hover:bg-white/10"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Right actions - Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full border border-purple-500/20 bg-purple-500/5 hover:bg-purple-500/10 text-purple-300 hover:text-white transition-all duration-300 focus:outline-none"
              aria-label="Toggle theme"
              id="theme-toggle-desktop"
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* Launch Console */}
            <a
              href="#dashboard"
              onClick={(e) => scrollToSection(e, "dashboard")}
              className="relative group overflow-hidden px-5 py-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium text-sm shadow-xl shadow-purple-500/20 hover:shadow-purple-500/35 transition-all duration-300"
              id="cta-nav-button"
            >
              <div className="absolute inset-0 bg-white/15 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
              <div className="flex items-center space-x-1">
                <span>Try Demo</span>
                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
          </div>

          {/* Mobile Actions */}
          <div className="flex lg:hidden items-center space-x-3">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full border border-purple-500/20 bg-purple-500/5 hover:bg-purple-500/10 text-purple-300 hover:text-white transition-all duration-300 focus:outline-none"
              aria-label="Toggle theme"
              id="theme-toggle-mobile"
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg border border-purple-500/20 bg-purple-500/5 text-purple-300 focus:outline-none"
              aria-expanded={isOpen}
              aria-label="Toggle Navigation menu"
              id="menu-toggle-button"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Backdrop & Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black z-40 lg:hidden"
            />

            {/* Content Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed top-0 right-0 h-full w-[280px] bg-black/95 border-l border-purple-500/10 backdrop-blur-2xl p-6 z-50 lg:hidden flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    Aetheris
                  </span>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-md hover:bg-purple-950/20 text-purple-400"
                    id="mobile-close-button"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="flex flex-col space-y-3">
                  {navLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => scrollToSection(e, link.href.substring(1))}
                      className="px-4 py-3 rounded-xl text-base font-medium text-gray-300 hover:text-white hover:bg-purple-950/30 border border-transparent hover:border-purple-500/20 transition-all duration-200"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>

              <div className="mt-auto space-y-4">
                <a
                  href="#dashboard"
                  onClick={(e) => scrollToSection(e, "dashboard")}
                  className="block text-center py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium text-sm shadow-lg shadow-purple-500/10 focus:outline-none"
                  id="mobile-nav-cta"
                >
                  Start Demo Console
                </a>
                <p className="text-center text-xs text-gray-500 font-mono">
                  Aetheris Cloud v1.2
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
