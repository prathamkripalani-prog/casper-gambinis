"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Clock, MapPin, Star, Wine } from "lucide-react";

const highlights = [
  {
    icon: Star,
    title: "Premium Dining",
    description: "Upscale international cuisine crafted with the finest ingredients",
  },
  {
    icon: Clock,
    title: "Open Late",
    description: "Serving from 10 AM to 2 AM — every day of the week",
  },
  {
    icon: MapPin,
    title: "Ikeja City Mall",
    description: "Conveniently located in the heart of Ikeja, Lagos",
  },
  {
    icon: Wine,
    title: "Curated Selection",
    description: "Extensive wine list, craft cocktails, and premium spirits",
  },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-20 md:py-32 px-4 bg-[var(--warm-black)]">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, var(--gold) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="section-subtitle">Our Story</p>
          <h2 className="section-title">About Casper & Gambini&apos;s</h2>
          <div className="gold-divider" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-lg aspect-[4/3]">
              <div
                className="absolute inset-0 bg-cover bg-center transform hover:scale-105 transition-transform duration-700"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974')`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[var(--warm-black)]/40 to-transparent" />
            </div>
            {/* Decorative border */}
            <div className="absolute -top-3 -left-3 w-24 h-24 border-t-2 border-l-2 border-[var(--gold)]/40 rounded-tl-lg" />
            <div className="absolute -bottom-3 -right-3 w-24 h-24 border-b-2 border-r-2 border-[var(--gold)]/40 rounded-br-lg" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="space-y-6"
          >
            <p className="font-alt text-xl text-[var(--gold)] italic">
              Where culinary artistry meets uncompromising hospitality
            </p>
            <p className="text-[var(--cream)]/70 leading-relaxed">
              Casper & Gambini&apos;s is an upscale dining destination located inside Ikeja City Mall, 
              offering a sophisticated mix of international cuisine, artisanal coffee, handcrafted 
              cocktails, and an extensive selection of premium wines and spirits.
            </p>
            <p className="text-[var(--cream)]/70 leading-relaxed">
              From hearty breakfasts and leisurely lunches to elegant dinners and late-night indulgences, 
              every visit promises an unforgettable experience. Our menu draws inspiration from global 
              culinary traditions while celebrating the rich flavours of Nigerian cuisine.
            </p>
            <p className="text-[var(--cream)]/70 leading-relaxed">
              Whether you&apos;re celebrating a special occasion, enjoying a romantic dinner, catching up 
              with friends, or simply treating yourself to an exceptional meal, our warm and stylish 
              atmosphere provides the perfect setting.
            </p>

            <div className="gold-divider !ml-0" />

            <p className="font-serif text-lg text-[var(--cream)] font-medium">
              Ikeja City Mall, Obafemi Awolowo Way, Oregun, Ikeja, Lagos
            </p>
          </motion.div>
        </div>

        {/* Highlights Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
          {highlights.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
              className="glass-card rounded-lg p-6 text-center group hover:border-[var(--gold)]/30 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-full gold-bg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <item.icon size={20} className="text-[var(--warm-black)]" />
              </div>
              <h3 className="font-serif text-lg text-[var(--cream)] mb-2">{item.title}</h3>
              <p className="text-sm text-[var(--cream)]/60">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
