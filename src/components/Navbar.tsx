"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Menu", href: "#menu" },
  { label: "Events", href: "#events" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
             ? "glass-dark shadow-2xl shadow-black/30 border border-white/10 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="#home" className="flex items-center gap-2 group">
              <span className="text-2xl sm:text-3xl font-serif font-bold">
                <span className="text-gradient">C</span>
                <span className="text-[var(--cream)] group-hover:text-[var(--gold)] transition-colors duration-300">&</span>
                <span className="text-gradient">G</span>
              </span>
              <div className="hidden sm:block">
                <p className="font-serif text-sm text-[var(--cream)] leading-tight">
                  Casper & Gambini&apos;s
                </p>
                <p className="text-[10px] text-[var(--gold)] tracking-widest uppercase font-medium">
                  Ikeja
                </p>
              </div>
            </a>

            {/* Desktop Controls */}
            <div className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-[var(--cream)]/80 hover:text-[var(--gold)] transition-all duration-300 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[var(--gold)] transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
              <a
                href="tel:+2349038900015"
                className="btn-primary text-sm flex items-center gap-2 !py-2 !px-5"
              >
                <Phone size={14} />
                Reserve Now
              </a>
            </div>

            {/* Mobile Controls */}
            <div className="flex items-center gap-3 lg:hidden">
              <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden text-[var(--cream)] hover:text-[var(--gold)] transition-colors p-2"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ?              <X size={24} /> : <Menu size={24} />
            }
          </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-[var(--warm-black)] lg:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setMobileOpen(false)}
                  className="text-2xl font-serif text-[var(--cream)] hover:text-[var(--gold)] transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="tel:+2349038900015"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.1 }}
                onClick={() => setMobileOpen(false)}
                className="btn-primary text-lg mt-4 flex items-center gap-2"
              >
                <Phone size={18} />
                Reserve Now — +234 903 890 0015
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
