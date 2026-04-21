import type { ReactNode } from "react";
import Navbar from "../../../components/landing/Navbar";
import HeroSection from "../../../components/landing/HeroSection";
import ServicesSection from "../../../components/landing/ServiceSection";
import ContactoSection from "../../../components/landing/ContactoSection";
import Footer from "../../../components/landing/Footer";

export function HomePage(): ReactNode {
  return (
    <div id="top" className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <ContactoSection />
      <Footer />
    </div>
  );
}
