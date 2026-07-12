"use client";

import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import FeaturedDishes from "@/components/FeaturedDishes";
import FoodMenu from "@/components/FoodMenu";
import BeverageMenu from "@/components/BeverageMenu";
import Events from "@/components/Events";
import Gallery from "@/components/Gallery";
import Reviews from "@/components/Reviews";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import Particles from "@/components/Particles";

export default function Home() {
  useEffect(() => {
    // Smooth reveal for sections on load
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen bg-[var(--warm-black)]">
      <Particles />
      <Navbar />
      <Hero />
      <About />
      <FeaturedDishes />
      <FoodMenu />
      <BeverageMenu />
      <Events />
      <Gallery />
      <Reviews />
      <Contact />
      <Footer />
      <BackToTop />
    </main>
  );
}
