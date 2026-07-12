"use client";

"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Camera, MessageCircle, AtSign, ArrowUp } from "lucide-react";
import LoginModal from "@/components/LoginModal";

const socialLinks = [
  { icon: Camera, href: "#", label: "Instagram" },
  { icon: MessageCircle, href: "#", label: "Facebook" },
  { icon: AtSign, href: "#", label: "Twitter" },
];

export default function Footer() {
  const [loginOpen, setLoginOpen] = useState(false);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[var(--warm-black)] border-t border-[var(--gold)]/10">
      {/* Gold accent line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--gold)]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <a href="#home" className="inline-block group mb-4">
              <span className="text-3xl font-serif font-bold">
                <span className="text-gradient">C</span>
                <span className="text-[var(--cream)]">&</span>
                <span className="text-gradient">G</span>
              </span>
            </a>
            <p className="text-sm text-[var(--cream)]/50 leading-relaxed mb-6">
              Where great food meets great moments. Experience the finest international cuisine at our flagship location in Ikeja City Mall.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-9 h-9 rounded-full border border-[var(--gold)]/20 flex items-center justify-center text-[var(--gold)]/60 hover:text-[var(--gold)] hover:border-[var(--gold)] transition-all duration-300 group"
                  aria-label={social.label}
                >
                  <social.icon size={16} className="group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-sm text-[var(--gold)] uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "#home" },
                { label: "About", href: "#about" },
                { label: "Menu", href: "#menu" },
                { label: "Gallery", href: "#gallery" },
                { label: "Reviews", href: "#reviews" },
                { label: "Contact", href: "#contact" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-[var(--cream)]/50 hover:text-[var(--gold)] transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-serif text-sm text-[var(--gold)] uppercase tracking-wider mb-4">
              Contact
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://maps.google.com/?q=Casper+and+Gambinis+Ikeja+City+Mall+Lagos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 text-sm text-[var(--cream)]/50 hover:text-[var(--gold)] transition-colors"
                >
                  <MapPin size={14} className="mt-0.5 flex-shrink-0" />
                  <span>Ikeja City Mall, Obafemi Awolowo Way, Oregun, Ikeja, Lagos</span>
                </a>
              </li>
              <li>
                <a href="tel:+2349038900015" className="flex items-center gap-2 text-sm text-[var(--cream)]/50 hover:text-[var(--gold)] transition-colors">
                  <Phone size={14} />
                  +234 903 890 0015
                </a>
              </li>
              <li>
                <a href="mailto:info@casperandgambinis.com" className="flex items-center gap-2 text-sm text-[var(--cream)]/50 hover:text-[var(--gold)] transition-colors">
                  <Mail size={14} />
                  info@casperandgambinis.com
                </a>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="font-serif text-sm text-[var(--gold)] uppercase tracking-wider mb-4">
              Opening Hours
            </h3>
            <div className="flex items-start gap-2 text-sm text-[var(--cream)]/50">
              <Clock size={14} className="mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-[var(--cream)]/70">Monday – Sunday</p>
                <p>10:00 AM – 2:00 AM</p>
              </div>
            </div>

          </div>

          {/* Footer Login Link - Tiny & subtle */}
          <div className="text-center mt-8">
            <button
              onClick={() => setLoginOpen(true)}
              className="text-[9px] text-[var(--cream)]/[0.08] hover:text-[var(--cream)]/[0.25] transition-colors duration-300 hover:underline cursor-pointer bg-transparent border-none"
            >
              Login
            </button>
          </div>

          {/* Login Modal */}
          <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[var(--gold)]/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[var(--cream)]/40">
              &copy; {new Date().getFullYear()} Casper & Gambini&apos;s Ikeja. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-xs text-[var(--cream)]/40 hover:text-[var(--gold)] transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-xs text-[var(--cream)]/40 hover:text-[var(--gold)] transition-colors">
                Terms &amp; Conditions
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Back to top */}
      <button
        onClick={scrollToTop}
        className="absolute -top-5 right-8 w-10 h-10 rounded-full gold-bg flex items-center justify-center shadow-lg shadow-[var(--gold)]/20 hover:shadow-[var(--gold)]/40 transition-shadow hover:scale-110 transition-transform"
        aria-label="Back to top"
      >
        <ArrowUp size={18} className="text-[var(--warm-black)]" />
      </button>
    </footer>
  );
}
