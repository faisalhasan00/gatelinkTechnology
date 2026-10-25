import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import StatementSection from './components/StatementSection';
import SelectedWorksSection from './components/SelectedWorksSection';
import CultureGallerySection from './components/CultureGallerySection';
import AIEcosystemSection from './components/AIEcosystemSection';
import ComplianceSection from './components/ComplianceSection';
import ProcessSection from './components/ProcessSection';
import FeaturedInsightsSection from './components/FeaturedInsightsSection';
import IndustriesSection from './components/IndustriesSection';
import PressSection from './components/PressSection';
import FAQSection from './components/FAQSection';
import TestimonialsSection from './components/TestimonialsSection';
import OfficesSection from './components/OfficesSection';
import CTABannerSection from './components/CTABannerSection';
import ContactAndOfficesSection from './components/ContactAndOfficesSection';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-[#000000] text-white">
      {/* 1. Official Header with OZRIT Alpha Logo, Mega Dropdowns, and Red Contact Action */}
      <Navbar />

      <main id="main-content">
        {/* 2. Fullscreen Cinematic Hero Banner (height 100svh, Video Background, 2 CTAs) */}
        <HeroSection />

        {/* 3. We Build. We Automate. We Transform. (Expanding Accordion with 4 Service Pillars) */}
        <StatementSection />

        {/* 4. Selected Works / Case Studies (8 Pastel Cards Carousel with Real Mobile Mockups) */}
        <SelectedWorksSection />

        {/* 5. Inside OZRIT Culture & Engineering Gallery (Blush #ffeded + 500+ Engineers Marquee) */}
        <CultureGallerySection />

        {/* 6. Building AI Ecosystems + OUR IMPACT (Hand Video + 3 White Service Cards + 6 Impact Stats) */}
        <AIEcosystemSection />

        {/* 7. Compliance Built In, Not Bolted On (Red Gradient + 3D Sphere + 6 Accordion Items) */}
        <ComplianceSection />

        {/* 8. Our Proven Development Process (5 Steps Connected by Continuous Red Wave Timeline) */}
        <ProcessSection />

        {/* 9. Featured Insights (4 Enterprise Thought Leadership Cards with Laser Thread Curve) */}
        <FeaturedInsightsSection />

        {/* 10. Solving Complex Challenges Across Every Major Sector (3-Column Interactive Tabs) */}
        <IndustriesSection />

        {/* 11. OZRIT in the press (#f2f2f2 Light Marquee with Authentic Press Logo Cards) */}
        <PressSection />

        {/* 12. Questions? We've Got Answers (FAQ with Sticky Metrics & 8 Expandable Questions) */}
        <FAQSection />

        {/* 13. Trusted Partners & Testimonials (Organizations We've Worked With + Leaders Marquee) */}
        <TestimonialsSection />

        {/* 14. Our Offices - Global Presence, Local Expertise (Single Hyderabad Flagship Campus) */}
        <OfficesSection />

        {/* 15. LET'S TURN IDEAS INTO DIGITAL REALITY! (Signature Red CTA Banner) */}
        <CTABannerSection />

        {/* 16. Collaborate with OZRIT (Contact Form + Single Hyderabad Campus) */}
        <ContactAndOfficesSection />
      </main>

      {/* 17. Global Footer (5 Ratings Cards + OZRIT SVG Logo + Social Circles + WhatsApp Widget) */}
      <Footer />
    </div>
  );
}
