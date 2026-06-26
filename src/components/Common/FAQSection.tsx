import React, { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  id: string;
  label: string;
  items: FAQItem[];
}

export const FAQSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('overview');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0); // Default open first item

  const categories: FAQCategory[] = [
    {
      id: 'overview',
      label: 'Overview',
      items: [
        {
          question: 'What is the Armory platform?',
          answer: 'Armory is a specialized infrastructure for building, testing, and deploying custom AI agents. We provide the neural logic and edge nodes required to run autonomous workflows at enterprise scale.'
        },
        {
          question: 'Who is this platform designed for?',
          answer: 'Armory is engineered for software developers, data scientists, and operations teams looking to automate complex backend processes without relying on brittle scripts or hardcoded rules.'
        },
        {
          question: 'Does Armory provide pre-built agents?',
          answer: 'Yes! We ship with a variety of standard connector agents (IMAP routers, spreadsheet parsers, database synchronizers) that can be initialized immediately or fine-tuned.'
        },
        {
          question: 'How does it differ from a standard chatbot?',
          answer: 'Unlike standard chatbots that simply reply to messages, Armory agents execute multi-step logic trees, call third-party APIs, handle errors gracefully, and run continuously in the background.'
        }
      ]
    },
    {
      id: 'security',
      label: 'Security',
      items: [
        {
          question: 'How is data encrypted in Armory?',
          answer: 'All data in transit and at rest utilizes AES-256 and TLS 1.3 encryption. We support end-to-end telemetry vaulting so that your LLM prompts never touch public logs.'
        },
        {
          question: 'Are the execution environments isolated?',
          answer: 'Yes. Each active agent runs inside its own isolated serverless container (Docker sandbox). Compute nodes and network interfaces are completely segregated.'
        }
      ]
    },
    {
      id: 'protocols',
      label: 'Protocols',
      items: [
        {
          question: 'What models does Armory support?',
          answer: 'Armory is model-agnostic. We support direct integrations with GPT-4, Claude 3, Llama 3, and custom fine-tuned weights hosted on Hugging Face or replicate.'
        },
        {
          question: 'Is there a latency guarantee?',
          answer: 'Our core routing layers are written in Go and Rust, maintaining a routing latency overhead of under 2ms. WebGL telemetry logs run independently without blocking API streams.'
        }
      ]
    }
  ];

  const currentCategory = categories.find(c => c.id === activeCategory) || categories[0];

  const handleToggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle(index);
    }
  };

  return (
    <section id="faq" className="py-24 relative overflow-hidden bg-oceanic select-none">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-12 gap-12">
          {/* Left Side Header and Filters (Spans 4 columns) */}
          <div className="md:col-span-4 space-y-8">
            <div>
              <h2 className="text-sm font-semibold tracking-widest text-primary-hex uppercase mb-3">
                Help & Docs
              </h2>
              <h3 className="text-4xl font-extrabold tracking-tight text-white mb-6">
                Common Inquiries
              </h3>
              <p className="text-mint/70 text-sm leading-relaxed">
                Everything you need to know about deploying, scaling, and securing your neural agents with Armory. Can't find an answer?
              </p>
              <div className="mt-8">
                <a
                  href="#pricing"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/5 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-wider rounded-xl border border-white/10 transition-all btn-hover-active focus-visible:outline-none"
                >
                  <span>Contact Us</span>
                  <svg className="w-4 h-4 text-primary-hex" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Category selection list */}
            <div 
              className="flex flex-row md:flex-col gap-2 flex-wrap border-t border-white/5 pt-6"
              role="tablist"
              aria-label="FAQ categories"
            >
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setExpandedIndex(0); // Reset accordion to first item
                  }}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-left transition-all focus-visible:outline-none ${
                    activeCategory === cat.id
                      ? 'bg-white/5 text-primary-hex border border-white/10'
                      : 'text-mint/65 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right Side Accordion items (Spans 8 columns) */}
          <div className="md:col-span-8 space-y-4">
            {currentCategory.items.map((item, index) => {
              const isExpanded = expandedIndex === index;
              return (
                <div 
                  key={index} 
                  className={`glass border rounded-2xl overflow-hidden transition-all duration-300 ${
                    isExpanded ? 'border-primary-hex/25 bg-white/[0.02]' : 'border-white/5'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => handleToggle(index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    aria-expanded={isExpanded}
                    className="w-full px-6 py-5.5 flex items-center justify-between text-left focus:outline-none select-none"
                  >
                    <span className="text-sm font-bold text-white tracking-wide uppercase">
                      {item.question}
                    </span>
                    <div className={`w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-mint/40 transition-transform duration-300 ${
                      isExpanded ? 'transform rotate-180 text-primary-hex bg-primary-hex/10' : ''
                    }`}>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>

                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      isExpanded ? 'max-h-[300px] border-t border-white/5 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="p-6 text-xs text-mint/80 leading-relaxed font-sans">
                      {item.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
