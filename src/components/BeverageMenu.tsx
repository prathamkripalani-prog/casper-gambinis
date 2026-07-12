"use client";

import { useState, useMemo, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Search, Wine } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { beverageMenu, beverageCategories } from "@/data/beverageMenu";
import type { MenuItem } from "@/data/foodMenu";

function isMenuItem(item: any): item is MenuItem {
  return "price" in item || "sizes" in item || "addOns" in item || "options" in item;
}

function BevMenuItemCard({ item, index }: { item: MenuItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.03 }}
      className="glass-card rounded-lg p-5 menu-item-hover"
    >
      <div className="flex justify-between items-start gap-4 mb-2">
        <h4 className="font-serif text-base sm:text-lg text-[var(--cream)] font-semibold">
          {item.name}
        </h4>
        {item.price && (
          <span className="text-[var(--gold)] font-semibold text-sm whitespace-nowrap">
            {formatPrice(item.price)}
          </span>
        )}
      </div>

      {item.description && (
        <p className="text-xs sm:text-sm text-[var(--cream)]/60 leading-relaxed mb-3">
          {item.description}
        </p>
      )}

      {/* Options */}
      {item.options && (
        <div className="space-y-2 mt-3 border-t border-[var(--gold)]/10 pt-3">
          {item.options.map((opt, i) => (
            <div key={i} className="flex justify-between items-start gap-2">
              <p className="text-xs text-[var(--cream)]/70 leading-relaxed">{opt.label}</p>
              <span className="text-[var(--gold)] text-xs font-medium whitespace-nowrap">
                {formatPrice(opt.price)}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Sizes (Glass/Bottle) */}
      {item.sizes && (
        <div className="space-y-2 mt-3 border-t border-[var(--gold)]/10 pt-3">
          {item.sizes.map((size, i) => (
            <div key={i} className="flex justify-between items-center">
              <span className="text-xs text-[var(--cream)]/70">{size.label}</span>
              <span className="text-[var(--gold)] text-xs font-medium">{formatPrice(size.price)}</span>
            </div>
          ))}
        </div>
      )}

      {/* Add-ons */}
      {item.addOns && (
        <div className="flex flex-wrap gap-2 mt-3 border-t border-[var(--gold)]/10 pt-3">
          {item.addOns.map((addon, i) => (
            <span
              key={i}
              className="text-[10px] sm:text-xs text-[var(--cream)]/60 bg-[var(--warm-black-3)]/50 px-2 py-1 rounded-full"
            >
              {addon.label}: <span className="text-[var(--gold)]">{formatPrice(addon.price)}</span>
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default function BeverageMenu() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const filteredMenu = useMemo(() => {
    return beverageMenu
      .map((category) => ({
        ...category,
        items: category.items.filter((item) => {
          if (isMenuItem(item)) {
            const matchesSearch =
              !search ||
              item.name.toLowerCase().includes(search.toLowerCase()) ||
              (item.description &&
                item.description.toLowerCase().includes(search.toLowerCase()));
            return matchesSearch;
          }
          return true;
        }),
      }))
      .filter(
        (category) =>
          (activeCategory === "All" || category.title === activeCategory) &&
          category.items.length > 0
      );
  }, [search, activeCategory]);

  return (
    <section className="relative py-20 md:py-32 px-4 bg-[var(--warm-black-2)]">
      {/* Background gradient */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--gold)]/3 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="section-subtitle">Raise Your Glass</p>
          <h2 className="section-title">Beverages & Bar</h2>
          <div className="gold-divider" />
          <p className="text-[var(--cream)]/60 max-w-xl mx-auto text-sm">
            From artisanal coffee and refreshing mocktails to an extensive selection of wines, spirits, and craft cocktails
          </p>
        </motion.div>

        {/* Search & Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-10 space-y-4"
        >
          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--gold)]"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search drinks..."
              className="search-input"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 justify-center max-h-32 overflow-y-auto pb-2">
            <button
              onClick={() => setActiveCategory("All")}
              className={`category-btn ${activeCategory === "All" ? "active" : ""}`}
            >
              All
            </button>
            {beverageCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`category-btn ${activeCategory === cat ? "active" : ""}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Menu Items */}
        <AnimatePresence mode="wait">
          <div className="space-y-8">
            {filteredMenu.map((category, catIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: catIndex * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <Wine size={18} className="text-[var(--gold)]/70" />
                  <h3 className="font-serif text-xl sm:text-2xl text-[var(--gold)] font-semibold">
                    {category.title}
                  </h3>
                  <div className="flex-1 h-px bg-gradient-to-r from-[var(--gold)]/30 to-transparent" />
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.items.map((item, itemIndex) => {
                    if (isMenuItem(item)) {
                      const globalIndex = catIndex * 100 + itemIndex;
                      return (
                        <BevMenuItemCard
                          key={item.name}
                          item={item}
                          index={globalIndex}
                        />
                      );
                    }
                    return null;
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>

        {filteredMenu.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-[var(--cream)]/50 py-16"
          >
            No items found. Try a different search or category.
          </motion.p>
        )}
      </div>
    </section>
  );
}
