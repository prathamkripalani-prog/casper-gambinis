"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Phone, Mail, Clock, ExternalLink } from "lucide-react";

const contactInfo = [
  {
    icon: MapPin,
    label: "Address",
    value: "Ikeja City Mall, Obafemi Awolowo Way, Oregun, Ikeja 101233, Lagos, Nigeria",
    href: "https://maps.google.com/?q=Casper+and+Gambinis+Ikeja+City+Mall+Lagos",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+234 903 890 0015",
    href: "tel:+2349038900015",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@casperandgambinis.com",
    href: "mailto:info@casperandgambinis.com",
  },
  {
    icon: Clock,
    label: "Opening Hours",
    value: "Monday – Sunday\n10:00 AM – 2:00 AM",
  },
];

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="relative py-20 md:py-32 px-4 bg-[var(--warm-black)]">
      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="section-subtitle">Get in Touch</p>
          <h2 className="section-title">Visit Us</h2>
          <div className="gold-divider" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {contactInfo.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="flex gap-4 group"
              >
                <div className="w-12 h-12 rounded-full gold-bg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <item.icon size={20} className="text-[var(--warm-black)]" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-[var(--gold)] uppercase tracking-wider mb-1">
                    {item.label}
                  </h3>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="text-[var(--cream)]/80 hover:text-[var(--gold)] transition-colors text-sm flex items-start gap-1"
                    >
                      {item.value.split("\n").map((line, li) => (
                        <span key={li}>
                          {line}
                          {li < item.value.split("\n").length - 1 && <br />}
                        </span>
                      ))}
                      {item.href.startsWith("http") && (
                        <ExternalLink size={12} className="mt-0.5 flex-shrink-0" />
                      )}
                    </a>
                  ) : (
                    <p className="text-[var(--cream)]/80 text-sm">
                      {item.value.split("\n").map((line, li) => (
                        <span key={li}>
                          {line}
                          {li < item.value.split("\n").length - 1 && <br />}
                        </span>
                      ))}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="pt-6"
            >
              <a href="tel:+2349038900015" className="btn-primary inline-flex items-center gap-2">
                <Phone size={16} />
                Call to Reserve
              </a>
            </motion.div>
          </motion.div>

          {/* Google Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative"
          >
            <div className="rounded-xl overflow-hidden glass-card h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.654321!2d3.354708!3d6.601777!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b922e1e886cb9%3A0x7f1c7535e5b7b8a1!2sIkeja%20City%20Mall!5e0!3m2!1sen!2sng!4v1"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Casper & Gambini's Ikeja Location"
                className="rounded-xl"
              />
            </div>
            <p className="text-center text-[var(--cream)]/40 text-xs mt-3">
              Ikeja City Mall, Obafemi Awolowo Way, Oregun, Ikeja, Lagos
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
