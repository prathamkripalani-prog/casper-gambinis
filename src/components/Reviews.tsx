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
              className="glass-card rounded-xl p-6 group hover:border-[var(--gold)]/30 transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_25px_50px_rgba(212,175,55,0.18)] relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--gold)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl pointer-events-none" />

              {/* Quote icon */}
              <Quote size={34} className="text-[var(--gold)]/15 absolute top-5 right-5 transition-transform duration-500 group-hover:scale-110" />

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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center mt-12"
        >
          <a
            href="https://www.google.com/search?safe=active&sca_esv=20b4b65056ec4911&sxsrf=APpeQnvoqG9wvLQmudRmOvs62icEbnw2wg:1783937082106&q=Casper+%26+Gambini%27s+Lagos&si=APenkKm7iecQ4G6P-TsbSMFKIQtv3EFIqRAFw-i8uEbk55Z-_8RB5hSsrdqitmEWZAaYbP8pp2ybBTxRRM6DIu34_0c0SER-t7UWukVSUWpgMpUDu9OFi0m5bu4yPaXXjo7Dis_WUj5Vol7naEUFE0rbSUUjK3mZFg%3D%3D&sa=X&ved=2ahUKEwiP_NHAs8-VAxUzUUEAHZQsHioQrrQLegQIIRAA&biw=1470&bih=833&dpr=2#lrd=0x103b93ca16b61ca9:0x3768f4c38277bc14,3,,,,"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full border border-[var(--gold)] bg-[var(--gold)]/10 px-8 py-3 text-sm font-medium tracking-wide text-[var(--gold)] transition-all duration-300 hover:bg-[var(--gold)] hover:text-black hover:shadow-[0_0_30px_rgba(212,175,55,0.35)]"
          >
            Leave a Review
          </a>
        </motion.div>
      </div>
    </section>
  );
}
