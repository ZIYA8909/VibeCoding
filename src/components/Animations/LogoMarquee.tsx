import React from 'react';

interface ReviewItem {
  id: string;
  rating: number;
  title: string;
  comment: string;
  author: string;
  company: string;
  avatarText: string;
}

export const LogoMarquee: React.FC = () => {
  const logos = ['CVS Health', 'Aetna', 'Cigna', 'Anthem', 'UnitedHealth', 'Humana'];
  
  const reviews: ReviewItem[] = [
    {
      id: 'rev1',
      rating: 5,
      title: 'Infrastructure that scales',
      comment: 'The reliability of Armory is unmatched. We migrated our entire neural processing pipeline to their edge nodes with zero downtime.',
      author: 'Sarah Jenkins',
      company: 'Vertex Labs',
      avatarText: 'SJ'
    },
    {
      id: 'rev2',
      rating: 5,
      title: 'Saved us months of R&D',
      comment: 'Instead of coding custom prompt safety filters, we used Armory. We went from prototype to a global production launch in weeks.',
      author: 'David Chen',
      company: 'FlowState AI',
      avatarText: 'DC'
    },
    {
      id: 'rev3',
      rating: 5,
      title: 'Precision in every inference',
      comment: 'The telemetry scoring features let us monitor agent accuracy in real-time. It has become an essential asset in our pipeline.',
      author: 'Elena Rostova',
      company: 'Neural Sync',
      avatarText: 'ER'
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden bg-oceanic/10 select-none">
      {/* 1. Partner logos infinite sliding marquee */}
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <h3 className="text-center text-xs font-bold text-mint/40 uppercase tracking-widest mb-10">
          Trusted by Industry Pioneers
        </h3>
        
        <div className="relative w-full overflow-hidden mask-gradient-marquee py-2 border-y border-white/5 bg-white/[0.01]">
          {/* We double the array to create a seamless infinite loop */}
          <div className="animate-marquee-scroll flex gap-20 items-center justify-start py-4">
            {[...logos, ...logos, ...logos].map((logo, index) => (
              <span 
                key={index} 
                className="text-lg md:text-xl font-bold font-mono text-mint/40 uppercase tracking-wider flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary-hex/40" />
                {logo}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Customer review grid */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold tracking-widest text-primary-hex uppercase mb-3">
            Social Proof
          </h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight uppercase">
            Proven Performance
          </h3>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {reviews.map((rev) => (
            <article 
              key={rev.id} 
              className="glass-card p-6.5 rounded-2xl border border-white/5 flex flex-col justify-between"
            >
              <div>
                {/* 5-star rating SVG */}
                <div className="flex items-center gap-1 mb-4" aria-label="5 star rating">
                  {[...Array(rev.rating)].map((_, i) => (
                    <svg 
                      key={i} 
                      className="w-4.5 h-4.5 text-primary-hex" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <h4 className="text-base font-bold text-white mb-2 uppercase">{rev.title}</h4>
                <p className="text-xs text-mint/70 leading-relaxed mb-6">"{rev.comment}"</p>
              </div>

              {/* Author info */}
              <div className="flex items-center gap-3.5 border-t border-white/5 pt-4">
                <div className="w-9 h-9 rounded-full bg-primary-hex/10 border border-primary-hex/20 text-primary-hex font-mono font-bold text-xs flex items-center justify-center">
                  {rev.avatarText}
                </div>
                <div>
                  <div className="text-xs font-bold text-white">{rev.author}</div>
                  <div className="text-[10px] text-mint/50 font-bold uppercase tracking-wider">{rev.company}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoMarquee;
