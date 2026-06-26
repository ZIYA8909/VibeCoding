import React, { useState, useEffect, useRef } from 'react';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
}

export const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: 'Hello! I am the Armory Daemon. I can explain our dynamic pricing, bento architectures, or security protocols. Ask me anything!'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const getBotResponse = (userText: string): string => {
    const query = userText.toLowerCase();
    
    if (query.includes('price') || query.includes('pricing') || query.includes('cost') || query.includes('rate')) {
      return 'Armory dynamic pricing starts at $19/mo (Starter) and $49/mo (Professional). We offer a 20% discount on annual cycles, and purchasing power parity offsets for INR (20% off base rate).';
    }
    if (query.includes('agent') || query.includes('build') || query.includes('workflow')) {
      return 'You can orchestrate custom AI agents via our visual workflow editor. Connect triggers (e.g. IMAP email inputs), validation layers, and LLM providers like GPT-4 or Claude 3.';
    }
    if (query.includes('security') || query.includes('secure') || query.includes('encrypt') || query.includes('privacy')) {
      return 'All agent pipelines run inside fully isolated Docker sandbox environments. Data is encrypted using AES-256 at rest, and we maintain an end-to-end encrypted telemetry vault.';
    }
    if (query.includes('hello') || query.includes('hi') || query.includes('hey')) {
      return 'Greetings! How can I assist you with Armory AI today? Try asking about "pricing" or "features".';
    }
    
    return 'I registered your query. Armory automated routing agents can structure this input and trigger a custom model pipeline. Type "pricing" or "security" for specific documentation answers.';
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: input.trim()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    const rawResponse = getBotResponse(userMessage.text);
    
    // Simulate realistic typing speed streaming effect
    setTimeout(() => {
      setIsTyping(false);
      
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: ''
      };
      
      setMessages((prev) => [...prev, botMessage]);

      let index = 0;
      const interval = setInterval(() => {
        setMessages((prev) => {
          const updated = [...prev];
          const lastMsg = updated[updated.length - 1];
          if (lastMsg && lastMsg.sender === 'bot') {
            lastMsg.text = rawResponse.substring(0, index + 1);
          }
          return updated;
        });
        
        index++;
        if (index >= rawResponse.length) {
          clearInterval(interval);
        }
      }, 15); // Fast characters typewriter stream
    }, 800); // Small initial delay for typing indicator
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* 1. Floating Robot Toggle Button */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open AI daemon assistant chat"
          className="w-14 h-14 rounded-full bg-gradient-to-r from-primary-hex to-accent-hex text-oceanic shadow-lg hover:shadow-primary-hex/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center cursor-pointer focus:outline-none"
        >
          {/* Animated SVG Robot Icon */}
          <svg 
            className="w-7.5 h-7.5 animate-float" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <rect x="3" y="11" width="18" height="10" rx="2" />
            <circle cx="8" cy="16" r="1.5" fill="currentColor" />
            <circle cx="16" cy="16" r="1.5" fill="currentColor" />
            <path d="M9 7h6" />
            <path d="M12 3v4" />
            <path d="M2 14v3M22 14v3" />
          </svg>
        </button>
      )}

      {/* 2. Chat drawer box */}
      {isOpen && (
        <div className="w-85 sm:w-96 h-[480px] rounded-3xl glass-heavy border border-white/10 shadow-2xl flex flex-col overflow-hidden animate-fade-in">
          {/* Drawer Header */}
          <div className="px-6 py-4.5 bg-white/5 border-b border-white/5 flex items-center justify-between select-none">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary-hex/10 border border-primary-hex/20 text-primary-hex flex items-center justify-center animate-float">
                <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="10" rx="2" />
                  <circle cx="8" cy="16" r="1" fill="currentColor" />
                  <circle cx="16" cy="16" r="1" fill="currentColor" />
                  <path d="M12 3v4" />
                </svg>
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Armory Daemon</h4>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] text-mint/50 font-bold uppercase tracking-wider">Agent online</span>
                </div>
              </div>
            </div>
            
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close assistant chat"
              className="p-1 rounded-lg hover:bg-white/5 text-mint/60 hover:text-white transition-colors focus:outline-none"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages Log area */}
          <div className="flex-grow p-6 overflow-y-auto space-y-4">
            {messages.map((msg) => {
              const isBot = msg.sender === 'bot';
              return (
                <div 
                  key={msg.id}
                  className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div 
                    className={`max-w-[85%] px-4 py-3 rounded-2xl text-xs leading-relaxed ${
                      isBot 
                        ? 'bg-white/5 border border-white/5 text-mint rounded-tl-none font-sans' 
                        : 'bg-primary-hex text-oceanic font-bold rounded-tr-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/5 border border-white/5 text-mint px-4 py-3 rounded-2xl rounded-tl-none flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-mint/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 bg-mint/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-mint/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input text form */}
          <form onSubmit={handleSend} className="p-4 bg-white/5 border-t border-white/5 flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about pricing, security..."
              className="flex-grow px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-mint/30 focus:outline-none focus:border-primary-hex transition-colors"
            />
            <button
              type="submit"
              disabled={isTyping || !input.trim()}
              aria-label="Send message"
              className="p-2.5 rounded-xl bg-primary-hex hover:bg-primary-hex/90 text-oceanic transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 flex items-center justify-center focus:outline-none cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
