"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { reviews, overallRating, totalReviews } from "@/data/reviews";

export default function Reviews() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="reviews" className="relative py-20 md:py-32 px-4 bg-[var(--warm-black-2)] overflow-hidden">
      {/* Background */}
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
          className="text-center mb-12"
        >
          <p className="section-subtitle">Guest Feedback</p>
          <h2 className="section-title">What Our Guests Say</h2>
          <div className="gold-divider" />

          {/* Overall Rating */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={18}
                  className={
                    star <= Math.round(overallRating)
                      ? "text-[var(--gold)] fill-[var(--gold)]"
                      : "text-[var(--gold)]/20"
                  }
                />
              ))}
            </div>
            <span className="text-2xl font-serif font-bold text-[var(--gold)]">
              {overallRating}
            </span>
            <span className="text-[var(--cream)]/50 text-sm">
              ({totalReviews.toLocaleString()} reviews)
            </span>
          </div>
        </motion.div>

        {/* Reviews Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.05 }}
              className="glass-card rounded-xl p-6 group hover:border-[var(--gold)]/30 transition-all duration-300"
            >
              {/* Quote icon */}
              <Quote size={20} className="text-[var(--gold)]/30 mb-3" />

              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={14}
                    className={
                      star <= review.rating
                        ? "text-[var(--gold)] fill-[var(--gold)]"
                        : "text-[var(--gold)]/20"
                    }
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-sm text-[var(--cream)]/70 leading-relaxed mb-4 line-clamp-4">
                &ldquo;{review.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center justify-between">
                <p className="font-serif text-sm text-[var(--cream)] font-medium">
                  {review.name}
                </p>
                <span className="text-[10px] text-[var(--cream)]/40">{review.date}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
