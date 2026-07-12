"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { formatPrice } from "@/lib/utils";

const featuredDishes = [
  {
    name: "English Breakfast",
    description: "Crispy bacon, frankfurter, eggs & baked beans",
    price: 19000,
    image: "https://images.unsplash.com/photo-1608039829572-9bafb3e1ec0c?q=80&w=1974",
    category: "Breakfast",
  },
  {
    name: "Gambini's Omelette",
    description: "Fluffy three-egg omelette with roasted potatoes",
    price: 10500,
    image: "https://images.unsplash.com/photo-1510693206972-df098062cb71?q=80&w=1974",
    category: "Breakfast",
  },
  {
    name: "Chicken Alfredo",
    description: "Linguini with crispy chicken & parmesan alfredo",
    price: 20000,
    image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?q=80&w=1974",
    category: "Pasta",
  },
  {
    name: "Ginger Salmon",
    description: "Salmon with rice, peppers & tomato-ginger sauce",
    price: 31000,
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=1974",
    category: "Mains",
  },
  {
    name: "Beef Tenderloin",
    description: "Grilled tenderloin with mash & gravy",
    price: 73000,
    image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=2070",
    category: "Mains",
  },
  {
    name: "Classic Pepperoni Pizza",
    description: "Italian pepperoni with mozzarella & herbs",
    price: 15000,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1981",
    category: "Pizza",
  },
  {
    name: "Chocolate Fondant",
    description: "Warm molten cake with vanilla ice cream",
    price: 16000,
    image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?q=80&w=1974",
    category: "Desserts",
  },
];

export default function FeaturedDishes() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-20 md:py-32 px-4 bg-[var(--warm-black-2)] overflow-hidden">
      {/* Background gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[var(--gold)]/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="section-subtitle">Signature Selection</p>
          <h2 className="section-title">Featured Dishes</h2>
          <div className="gold-divider" />
          <p className="text-[var(--cream)]/60 max-w-xl mx-auto">
            A curated selection of our most celebrated dishes, crafted to perfection by our expert chefs
          </p>
        </motion.div>

        {/* Dishes Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredDishes.map((dish, i) => (
            <motion.div
              key={dish.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-xl glass-card cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url('${dish.image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--warm-black)] via-transparent to-transparent" />

                {/* Category tag */}
                <span className="absolute top-3 left-3 text-xs font-medium tracking-wider uppercase px-3 py-1 rounded-full glass text-[var(--gold)]">
                  {dish.category}
                </span>

                {/* Price */}
                <span className="absolute top-3 right-3 text-sm font-bold text-[var(--gold)] glass px-3 py-1 rounded-full">
                  {formatPrice(dish.price)}
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-serif text-lg text-[var(--cream)] group-hover:text-[var(--gold)] transition-colors duration-300 mb-2">
                  {dish.name}
                </h3>
                <p className="text-sm text-[var(--cream)]/60 leading-relaxed">
                  {dish.description}
                </p>
              </div>

              {/* Hover shine effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute top-0 -left-1/2 w-1/2 h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[20deg] group-hover:left-full transition-all duration-700" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
