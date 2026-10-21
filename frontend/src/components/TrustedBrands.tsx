import React from 'react';

export const TrustedBrands: React.FC = () => {
  const brands = [
    {
      name: 'Savile Row',
      category: 'Luxury Retail & Bespoke Fashion',
      logo: '/savilerow.jpeg',
      tag: 'E-Commerce & Digital',
      imgClass: 'h-16 sm:h-20 w-auto object-contain rounded-xl shadow-md border border-white/10'
    },
    {
      name: 'Cardia',
      category: 'FinTech & Digital Payments',
      logo: '/cardia-lockup-white.png',
      tag: 'FinTech Platform',
      imgClass: 'h-12 sm:h-14 w-auto object-contain'
    },
    {
      name: 'ASPPEG',
      category: 'Energy & Supply Chain Alliances',
      logo: '/asspeg_logo.jpeg',
      tag: 'Enterprise Scale',
      imgClass: 'h-16 sm:h-20 w-auto object-contain rounded-xl bg-white p-1.5 shadow-md'
    },
    {
      name: 'SpeakWise',
      category: 'AI & Voice Communication',
      logo: '/speakwise-white.png',
      tag: 'AI Voice Engine',
      imgClass: 'h-14 sm:h-16 w-auto object-contain'
    },
    {
      name: 'Digivibe',
      category: 'Future-Ready Tech Workforce',
      logo: '/digivibe-white.png',
      tag: 'Workforce Inclusion',
      imgClass: 'h-11 sm:h-13 w-auto object-contain'
    },
    {
      name: 'Linguago',
      category: 'EdTech & Language Learning',
      logo: '/lingo-clean.png',
      tag: 'Multilingual App',
      imgClass: 'h-14 sm:h-16 w-auto object-contain rounded-xl'
    },
    {
      name: 'Brandlift Africa',
      category: 'Brand Strategy & Growth Studio',
      logo: '/brandlift-white.png',
      tag: 'Growth Partner',
      imgClass: 'h-11 sm:h-13 w-auto object-contain'
    },
  ];

  return (
    <section className="bg-[#001F37] text-white py-20 lg:py-24 border-y border-white/10 overflow-hidden">
      <div className="max-w-[1240px] mx-auto text-center px-6 lg:px-8 mb-12">
        <span className="text-xs uppercase tracking-widest font-extrabold text-[#02AA69] mb-3 inline-block">
          Client Credentials & Strategic Partners
        </span>
        
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold max-w-2xl mx-auto leading-tight">
          We've built and engineered for amazing brands
        </h2>
      </div>

      {/* Infinite unstoppable scrolling marquee from left to right */}
      <div className="relative w-full overflow-hidden py-4">
        {/* Soft edge fade masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 sm:w-36 bg-gradient-to-r from-[#001F37] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 sm:w-36 bg-gradient-to-l from-[#001F37] to-transparent z-10" />

        <div className="animate-marquee-ltr-slow">
          {/* Track 1 — repeated to span over 4,800px preventing gaps on ultra-wide screens */}
          <div className="flex items-center shrink-0">
            {[...brands, ...brands].map((b, idx) => (
              <div
                key={`b1-${b.name}-${idx}`}
                className="mx-3 w-[280px] sm:w-[320px] bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-[#02AA69]/50 rounded-2xl sm:rounded-3xl p-6 sm:p-7 flex flex-col items-center justify-between transition-all duration-300 group text-center shrink-0 shadow-lg min-h-[220px]"
              >
                <div className="flex items-center justify-center h-20 sm:h-24 w-full mb-3">
                  <img
                    src={b.logo}
                    alt={b.name}
                    className={`${b.imgClass} transition-transform duration-300 group-hover:scale-105`}
                  />
                </div>
                <div className="mt-auto">
                  <div className="font-extrabold text-base sm:text-lg text-white group-hover:text-[#02AA69] transition-colors mb-0.5">
                    {b.name}
                  </div>
                  <div className="text-xs text-gray-400 font-medium">
                    {b.category}
                  </div>
                  <div className="mt-3 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#02AA69]/20 text-[#02AA69] border border-[#02AA69]/30 inline-block">
                    {b.tag}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Track 2 (Identical duplicate for seamless continuous loop) */}
          <div className="flex items-center shrink-0" aria-hidden="true">
            {[...brands, ...brands].map((b, idx) => (
              <div
                key={`b2-${b.name}-${idx}`}
                className="mx-3 w-[280px] sm:w-[320px] bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-[#02AA69]/50 rounded-2xl sm:rounded-3xl p-6 sm:p-7 flex flex-col items-center justify-between transition-all duration-300 group text-center shrink-0 shadow-lg min-h-[220px]"
              >
                <div className="flex items-center justify-center h-20 sm:h-24 w-full mb-3">
                  <img
                    src={b.logo}
                    alt={b.name}
                    className={`${b.imgClass} transition-transform duration-300 group-hover:scale-105`}
                  />
                </div>
                <div className="mt-auto">
                  <div className="font-extrabold text-base sm:text-lg text-white group-hover:text-[#02AA69] transition-colors mb-0.5">
                    {b.name}
                  </div>
                  <div className="text-xs text-gray-400 font-medium">
                    {b.category}
                  </div>
                  <div className="mt-3 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#02AA69]/20 text-[#02AA69] border border-[#02AA69]/30 inline-block">
                    {b.tag}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trust statement */}
      <div className="mt-12 text-sm text-gray-300 max-w-xl mx-auto text-center px-6">
        Delivering enterprise-grade reliability, strict data compliance, and human-first digital experiences.
      </div>
    </section>
  );
};

