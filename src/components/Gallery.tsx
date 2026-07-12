"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

const galleryImages = [
  { src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070", alt: "Elegant restaurant interior", category: "Interior" },
  { src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974", alt: "Restaurant dining area", category: "Interior" },
  { src: "https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=2070", alt: "Grilled steak dish", category: "Mains" },
  { src: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1981", alt: "Freshly baked pizza", category: "Pizza" },
  { src: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?q=80&w=1974", alt: "Chocolate dessert", category: "Desserts" },
  { src: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=1964", alt: "Coffee art", category: "Coffee" },
  { src: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070", alt: "Cocktail drinks", category: "Cocktails" },
  { src: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1974", alt: "Fine dining atmosphere", category: "Interior" },
  { src: "https://images.unsplash.com/photo-1608039829572-9bafb3e1ec0c?q=80&w=1974", alt: "English breakfast", category: "Breakfast" },
  { src: "https://images.unsplash.com/photo-1510693206972-df098062cb71?q=80&w=1974", alt: "Omelette breakfast", category: "Breakfast" },
  { src: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?q=80&w=1974", alt: "Pasta dish", category: "Pasta" },
  { src: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1998", alt: "Premium burger", category: "Burgers" },
  { src: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2072", alt: "Restaurant exterior with signage", category: "Exterior" },
];

const categories = ["All", "Interior", "Exterior", "Breakfast", "Burgers", "Pasta", "Pizza", "Desserts", "Coffee", "Cocktails", "Mains"];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const filtered = activeCategory === "All"
    ? galleryImages
    : galleryImages.filter((img) => img.category === activeCategory);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filtered.length);
    }
  };

  const goPrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filtered.length) % filtered.length);
    }
  };

  return (
    <section id="gallery" className="relative py-20 md:py-32 px-4 bg-[var(--warm-black)]">
      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="section-subtitle">Visual Journey</p>
          <h2 className="section-title">Our Gallery</h2>
          <div className="gold-divider" />
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-2 justify-center mb-10"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`category-btn ${activeCategory === cat ? "active" : ""}`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((image, i) => (
              <motion.div
                key={image.src}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="relative overflow-hidden rounded-lg cursor-pointer group transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(212,175,55,0.18)]"
                onClick={() => openLightbox(i)}
              >
                <div className="aspect-square sm:aspect-auto sm:h-64">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url('${image.src}')` }}
                  />
                  <div className="absolute inset-0 bg-[var(--warm-black)]/0 group-hover:bg-[var(--warm-black)]/50 transition-all duration-300 flex items-center justify-center">
                    <Maximize2
                      size={24}
                      className="text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-50 group-hover:scale-100"
                    />
                  </div>
                </div>
                {/* Category tag */}
                <span className="absolute bottom-2 left-2 text-[10px] uppercase tracking-wider text-white/80 bg-black/50 px-2 py-1 rounded-full">
                  {image.category}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-10"
              aria-label="Close lightbox"
            >
              <X size={28} />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute left-4 text-white/70 hover:text-[var(--gold)] transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft size={32} />
            </button>

            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="max-w-5xl max-h-[85vh] w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="w-full h-full bg-contain bg-center bg-no-repeat"
                style={{ backgroundImage: `url('${filtered[lightboxIndex].src}')` }}
              />
              <p className="text-center text-white/60 text-sm mt-4">
                {filtered[lightboxIndex].alt} — {filtered[lightboxIndex].category}
              </p>
            </motion.div>

            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-4 text-white/70 hover:text-[var(--gold)] transition-colors"
              aria-label="Next image"
            >
              <ChevronRight size={32} />
            </button>

            {/* Counter */}
            <div className="absolute bottom-8 text-white/50 text-sm">
              {lightboxIndex + 1} / {filtered.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
