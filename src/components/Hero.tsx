"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Phone } from "lucide-react";

export default function Hero() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrollY = window.scrollY;
        parallaxRef.current.style.transform = `translateY(${scrollY * 0.4}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="home" className="relative h-screen overflow-hidden">
      {/* Background Image with Parallax */}
      <div
  ref={parallaxRef}
  className="absolute inset-0 -top-20 -bottom-20"
  style={{ willChange: "transform" }}
>
  <motion.div
    className="absolute inset-0 bg-cover bg-center"
    style={{
      backgroundImage: `url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070')`,
    }}
    animate={{
      scale: [1, 1.08, 1],
    }}
    transition={{
      duration: 24,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
</div>

      {/* Overlay */}
      <div className="absolute inset-0 hero-overlay" />
      {/* Ambient Golden Glow */}
<motion.div
  className="absolute -top-32 -left-32 w-[550px] h-[550px] rounded-full bg-yellow-400/10 blur-3xl"
  animate={{
    x: [0, 60, 0],
    y: [0, 40, 0],
    scale: [1, 1.15, 1],
  }}
  transition={{
    duration: 18,
    repeat: Infinity,
    ease: "easeInOut",
  }}
/>

<motion.div
  className="absolute -bottom-32 -right-32 w-[450px] h-[450px] rounded-full bg-orange-300/10 blur-3xl"
  animate={{
    x: [0, -50, 0],
    y: [0, -30, 0],
    scale: [1, 1.1, 1],
  }}
  transition={{
    duration: 20,
    repeat: Infinity,
    ease: "easeInOut",
  }}
/>

      {/* Gold accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-6"
        >
          {/* Gold divider */}
          <div className="gold-divider mb-8" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[var(--gold)] tracking-[6px] uppercase text-sm sm:text-base font-medium mb-4"
        >
          Casper & Gambini&apos;s Ikeja
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-[var(--cream)] mb-6 leading-tight"
        >
          Where Great Food
          <br />
          <span className="text-gradient">Meets Great Moments</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="font-alt text-lg sm:text-xl text-[var(--cream)]/70 max-w-xl mb-10 italic"
        >
          Experience the finest international cuisine in the heart of Ikeja
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <a href="#menu" className="btn-primary text-base sm:text-lg">
            View Menu
          </a>
          <a
            href="tel:+2349038900015"
            className="btn-outline text-base sm:text-lg flex items-center justify-center gap-2"
          >
            <Phone size={18} />
            Reserve Now
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8"
        >
          <motion.a
            href="#about"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 text-[var(--cream)]/50 hover:text-[var(--gold)] transition-colors"
          >
            <span className="text-xs tracking-[3px] uppercase">Scroll</span>
            <ChevronDown size={20} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
