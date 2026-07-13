"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  Sparkles,
  Tag,
  Megaphone,
  ChevronRight,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Event {
  id: number;
  title: string;
  description: string;
  image?: string;
  event_date: string;
  event_time: string;
  event_type: string;
}

const eventTypes = [
  { value: "all", label: "All Events" },
  { value: "upcoming", label: "Upcoming" },
  { value: "promotion", label: "Promotions" },
  { value: "announcement", label: "Announcements" },
];

const typeIcons: Record<string, React.ElementType> = {
  upcoming: Calendar,
  promotion: Tag,
  announcement: Megaphone,
};

const typeColors: Record<string, string> = {
  upcoming: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  promotion: "text-green-400 bg-green-500/10 border-green-500/20",
  announcement: "text-amber-400 bg-amber-500/10 border-amber-500/20",
};

function EventCard({ event, index }: { event: Event; index: number }) {
  const TypeIcon = typeIcons[event.event_type] || Sparkles;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative overflow-hidden rounded-xl glass-card transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_25px_50px_rgba(212,175,55,0.18)] hover:border-[var(--gold)]/40"
    >
      <div className="flex flex-col sm:flex-row h-full">
        {/* Image */}
        {event.image && (
          <div className="relative sm:w-48 lg:w-56 h-48 sm:h-auto overflow-hidden flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: `url('${event.image}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--warm-black)]/60 via-transparent to-transparent sm:bg-gradient-to-t sm:from-[var(--warm-black)]/60 sm:via-transparent sm:to-transparent" />
          </div>
        )}

        {/* Content */}
        <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between">
          <div>
            {/* Type badge */}
            <div className="flex items-center gap-2 mb-3">
              <span
                className={`inline-flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider px-2.5 py-1 rounded-full border ${typeColors[event.event_type]
                  }`}
              >
                <TypeIcon size={10} />
                {event.event_type}
              </span>
            </div>

            <h3 className="font-serif text-lg sm:text-xl text-[var(--cream)] group-hover:text-[var(--gold)] transition-colors duration-300 mb-2">
              {event.title}
            </h3>

            <p className="text-xs sm:text-sm text-[var(--cream)]/60 leading-relaxed mb-4 line-clamp-3">
              {event.description}
            </p>
          </div>

          {/* Date & Time */}
          <div className="flex items-center gap-4 text-xs text-[var(--cream)]/50">
            <span className="flex items-center gap-1.5">
              <Calendar size={12} className="text-[var(--gold)]" />
              {event.event_date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={12} className="text-[var(--gold)]" />
              {event.event_time}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Events() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  useEffect(() => {
    async function loadEvents() {
     const { data, error } = await supabase
  .from("events")
  .select("*");



if (error) {
  alert(JSON.stringify(error));
} else {
  alert(JSON.stringify(data));
  setEvents(data || []);
}

      setLoading(false);
    }

    loadEvents();
  }, []);

  const filteredEvents =
    activeFilter === "all"
      ? events
      : events.filter((e) => e.event_type === activeFilter);

  return (
    <section id="events" className="relative py-20 md:py-32 px-4 bg-[var(--warm-black-2)] overflow-hidden">
      {/* Background gradient */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-[var(--gold)]/3 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto" ref={ref}>
        {/* Removed vertical timeline line */}

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="section-subtitle">Happening Now</p>
          <h2 className="section-title">Events & Promotions</h2>
          <div className="gold-divider" />
          <p className="text-[var(--cream)]/60 max-w-xl mx-auto text-sm">
            From live music nights to exclusive promotions, there&apos;s always
            something special at Casper & Gambini&apos;s
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-2 justify-center mb-10"
        >
          {eventTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => setActiveFilter(type.value)}
              className={`category-btn ${activeFilter === type.value ? "active" : ""
                }`}
            >
              {type.label}
            </button>
          ))}
        </motion.div>

        {/* Events Timeline */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-8 max-w-4xl mx-auto"
          >
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event, i) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="w-full"
                >
                  <EventCard event={event} index={i} />
                </motion.div>
              ))
            ) : (
              <div className="text-center py-16">
                <Calendar size={40} className="mx-auto text-[var(--gold)]/30 mb-4" />
                <p className="text-[var(--cream)]/50">
                  No {activeFilter} events at this time.
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
