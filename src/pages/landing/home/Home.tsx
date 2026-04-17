import type { ReactNode } from "react";
import Navbar from "../../../components/landing/navbar/Navbar";
import HeroSection from "../../../components/landing/hero-section/HeroSection";
import ServicesSection from "../../../components/landing/service-section/ServiceSection";
import CTASection from "../../../components/landing/cta-section/CTASection";
import Footer from "../../../components/landing/footer/Footer";

export function HomePage(): ReactNode {
  return (
    <div id="top" className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <CTASection />
      <Footer />
    </div>
  );
}
