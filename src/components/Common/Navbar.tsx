import React, { useState } from 'react';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'AI Strategy', href: '#features' },
    { label: 'Custom Agents', href: '#features' },
    { label: 'Process Automation', href: '#features' },
    { label: 'Data Intelligence', href: '#features' },
    { label: 'Pricing', href: '#pricing' }
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 glass-navbar select-none">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand logo */}
        <a 
          href="#" 
          className="flex items-center gap-2.5 text-white font-mono text-xl font-bold tracking-wider hover:text-primary-hex transition-colors focus-visible:outline-none"
        >
          <svg 
            className="w-7 h-7 text-primary-hex animate-pulse" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5"
            aria-hidden="true"
          >
            <polygon points="12 2 2 7 12 12 22 7 12 2" />
            <polyline points="2 17 12 22 22 17" />
            <polyline points="2 12 12 17 22 12" />
          </svg>
          <span>ARMORY</span>
        </a>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="text-sm font-semibold text-mint/80 hover:text-white transition-colors tracking-wide focus-visible:outline-none"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Call to action */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="#pricing"
            className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all focus-visible:outline-none"
          >
            Request Demo
          </a>
        </div>

        {/* Mobile menu toggler button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="Toggle navigation menu"
          className="md:hidden p-2 rounded-lg hover:bg-white/5 text-mint focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile nav dropdown overlay */}
      {isOpen && (
        <div className="md:hidden glass border-b border-white/10 py-6 px-6 animate-fade-in">
          <nav className="flex flex-col gap-4">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-sm font-bold text-mint/85 hover:text-white py-2 focus-visible:outline-none"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#pricing"
              onClick={() => setIsOpen(false)}
              className="w-full text-center py-3 bg-primary-hex text-oceanic font-bold text-xs uppercase tracking-wider rounded-xl focus-visible:outline-none"
            >
              Request Demo
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
