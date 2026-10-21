import React from 'react';

export const TrustedBrands: React.FC = () => {
  const brands = [
    {
      name: 'Digivibe',
      category: 'Future-Ready Tech Workforce',
      logo: '/digivibe-white.png',
      tag: 'Empowerment',
      imgClass: 'h-6 sm:h-7 w-auto'
    },
    {
      name: 'Cardia',
      category: 'FinTech & Digital Payments',
      logo: '/cardia-lockup-white.png',
      tag: 'Scale Partner',
      imgClass: 'h-7 sm:h-8 w-auto'
    },
    {
      name: 'SpeakWise',
      category: 'AI & Voice Communication',
      logo: '/speakwise-white.png',
      tag: 'AI Platform',
      imgClass: 'h-8 sm:h-9 w-auto'
    },
    {
      name: 'Linguago',
      category: 'EdTech & Language Learning',
      logo: '/lingo-clean.png',
      tag: 'Multilingual',
      imgClass: 'h-8 sm:h-9 w-auto rounded-md'
    },
    {
      name: 'Brandlift Africa',
      category: 'Brand Architecture & Growth',
      logo: '/brandlift-white.png',
      tag: 'Growth Studio',
      imgClass: 'h-6 sm:h-7 w-auto'
    },
  ];

  return (
    <section className="bg-[#001F37] text-white py-20 lg:py-24 px-6 lg:px-8 border-y border-white/10">
      <div className="max-w-[1240px] mx-auto text-center">
        
        <span className="text-xs uppercase tracking-widest font-extrabold text-[#02AA69] mb-3 inline-block">
          Client Credentials
        </span>
        
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-14 max-w-2xl mx-auto leading-tight">
          We've built and engineered for amazing brands
        </h2>

        {/* Clean, authentic solid brand tiles with actual logos */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {brands.map((b) => (
            <div
              key={b.name}
              className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#02AA69]/50 rounded-2xl p-6 flex flex-col items-center justify-between transition-all duration-200 group text-center min-h-[160px]"
            >
              <div className="flex items-center justify-center h-12 w-full my-auto">
                <img
                  src={b.logo}
                  alt={b.name}
                  className={`${b.imgClass} object-contain opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-200`}
                />
              </div>
              <div className="mt-3">
                <div className="font-bold text-sm sm:text-base text-white group-hover:text-[#02AA69] transition-colors mb-0.5">
                  {b.name}
                </div>
                <div className="text-[11px] text-gray-400 font-medium">
                  {b.category}
                </div>
                <div className="mt-2 text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-[#02AA69]/20 text-[#02AA69] border border-[#02AA69]/30 inline-block">
                  {b.tag}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust statement */}
        <div className="mt-12 text-sm text-gray-300 max-w-xl mx-auto">
          Delivering enterprise-grade reliability, strict data compliance, and human-first digital experiences.
        </div>

      </div>
    </section>
  );
};
