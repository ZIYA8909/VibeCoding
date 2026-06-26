import React from 'react';
import Navbar from './components/Common/Navbar';
import HeroSection from './components/Hero/HeroSection';
import LogoMarquee from './components/Animations/LogoMarquee';
import FeatureGrid from './components/Features/FeatureGrid';
import BentoSection from './components/Bento/BentoSection';
import Telemetry from './components/Common/Telemetry';
import PricingSection from './components/Pricing/PricingSection';
import FAQSection from './components/Common/FAQSection';
import Footer from './components/Common/Footer';
import ChatBot from './components/Common/ChatBot';
import ScrollReveal from './components/Animations/ScrollReveal';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-oceanic text-arctic selection:bg-primary-hex selection:text-oceanic font-sans antialiased overflow-x-hidden">
      {/* Reusable glass header */}
      <Navbar />
      
      <main>
        {/* Hero renders instantly for FCP/LCP performance optimization */}
        <HeroSection />

        {/* Scroll revealing sequences with progressive time offsets */}
        <ScrollReveal delayClassName="delay-75">
          <LogoMarquee />
        </ScrollReveal>

        <ScrollReveal delayClassName="delay-100">
          <FeatureGrid />
        </ScrollReveal>

        <ScrollReveal delayClassName="delay-150">
          <BentoSection />
        </ScrollReveal>

        <ScrollReveal delayClassName="delay-200">
          <Telemetry />
        </ScrollReveal>

        <ScrollReveal delayClassName="delay-250">
          <PricingSection />
        </ScrollReveal>

        <ScrollReveal delayClassName="delay-300">
          <FAQSection />
        </ScrollReveal>
      </main>

      {/* Semantic footer */}
      <Footer />

      {/* Floating AI Robot assistant */}
      <ChatBot />
    </div>
  );
};

export default App;
