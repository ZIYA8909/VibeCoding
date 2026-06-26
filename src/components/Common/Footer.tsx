import React, { useState } from 'react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="relative border-t border-white/5 bg-oceanic select-none overflow-hidden">
      {/* Background visual spotlight */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-nocturnal-hex/5 rounded-full blur-3xl -z-10" />

      {/* 1. Pre-footer CTA banner */}
      <div className="max-w-5xl mx-auto px-6 py-20 text-center relative">
        <h3 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6">
          Ready to Automate?
        </h3>
        <p className="max-w-xl mx-auto text-mint/70 text-base md:text-lg mb-10 font-sans">
          Deploy your first process automation agent in minutes. Scale your intelligence with Armory.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <a
            href="#pricing"
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-primary-hex to-accent-hex text-oceanic text-sm font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-primary-hex/10 btn-hover-active text-center focus-visible:outline-none"
          >
            Start Building
          </a>
          <a
            href="#pricing"
            className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white text-sm font-bold uppercase tracking-wider rounded-xl border border-white/10 transition-all btn-hover-active text-center focus-visible:outline-none"
          >
            Request Demo
          </a>
        </div>
      </div>

      {/* 2. Main links & brand block */}
      <div className="max-w-7xl mx-auto px-6 py-16 border-t border-white/5 grid md:grid-cols-12 gap-12">
        {/* Brand details (Spans 4 columns) */}
        <div className="md:col-span-4 space-y-6">
          <div className="flex items-center gap-2.5 text-white font-mono text-xl font-bold tracking-wider">
            <svg 
              className="w-7 h-7 text-primary-hex" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5"
            >
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
            <span>ARMORY</span>
          </div>
          <p className="text-xs text-mint/60 leading-relaxed font-sans">
            Enterprise-grade decision automation engines. We orchestrate secure, high-frequency custom AI agents globally.
          </p>
          <div className="text-[10px] font-mono text-mint/40">
            © 2026 ARMORY AI. All rights reserved.
          </div>
        </div>

        {/* Quick Links (Spans 4 columns) */}
        <div className="md:col-span-4 grid grid-cols-2 gap-8">
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Platform</h4>
            <ul className="space-y-2.5 text-xs text-mint/60">
              <li><a href="#features" className="hover:text-white transition-colors focus-visible:outline-none">Features</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors focus-visible:outline-none">Pricing</a></li>
              <li><a href="#telemetry" className="hover:text-white transition-colors focus-visible:outline-none">Telemetry</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Legal</h4>
            <ul className="space-y-2.5 text-xs text-mint/60">
              <li><a href="#" className="hover:text-white transition-colors focus-visible:outline-none">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors focus-visible:outline-none">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors focus-visible:outline-none">SLA Guarantees</a></li>
            </ul>
          </div>
        </div>

        {/* Newsletter Signup (Spans 4 columns) */}
        <div className="md:col-span-4 space-y-4">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">
            Get smarter about AI systems
          </h4>
          <p className="text-xs text-mint/60 leading-relaxed font-sans">
            Weekly insights on process automation, weights training, and system safety audits.
          </p>
          
          <form onSubmit={handleSubscribe} className="flex gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              className="flex-grow px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-mint/30 focus:outline-none focus:border-primary-hex transition-colors"
            />
            <button
              type="submit"
              className="px-5 py-3 bg-white hover:bg-white/90 text-oceanic font-bold text-xs uppercase tracking-wider rounded-xl transition-all btn-hover-active focus-visible:outline-none"
            >
              {subscribed ? 'Sent' : 'Join'}
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
