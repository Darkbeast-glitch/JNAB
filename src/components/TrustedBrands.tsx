import React from 'react';

export const TrustedBrands: React.FC = () => {
  const brands = [
    { name: 'MTN Group', category: 'Telecommunications', tag: '1M+ Users' },
    { name: 'World Bank', category: 'Global Development', tag: 'FinTech Advisor' },
    { name: 'GIZ International', category: 'Enterprise Cooperation', tag: 'Impact Partner' },
    { name: 'Ministry of Health', category: 'Public Sector', tag: 'Digital Health' },
    { name: 'Saving Grains', category: 'AgriTech Enterprise', tag: 'Supply Chain' },
    { name: 'PayAfrik Global', category: 'FinTech Payments', tag: 'Sub-second API' },
  ];

  return (
    <section className="bg-[#001F37] text-white py-20 lg:py-24 px-6 lg:px-8 border-y border-white/10">
      <div className="max-w-[1240px] mx-auto text-center">
        
        <span className="text-xs uppercase tracking-widest font-extrabold text-[#02AA69] mb-3 inline-block">
          Enterprise Credentials
        </span>
        
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-14 max-w-2xl mx-auto leading-tight">
          We've built and engineered for amazing brands
        </h2>

        {/* Clean, authentic solid brand tiles (Exact Dexwin Navy Grid styling) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {brands.map((b) => (
            <div
              key={b.name}
              className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#02AA69]/50 rounded-2xl p-6 flex flex-col items-center justify-center transition-all duration-200 group text-center min-h-[130px]"
            >
              <div className="font-bold text-lg md:text-xl text-white group-hover:text-[#02AA69] transition-colors mb-1">
                {b.name}
              </div>
              <div className="text-[11px] text-gray-400 font-medium">
                {b.category}
              </div>
              <div className="mt-2 text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-[#02AA69]/20 text-[#02AA69] border border-[#02AA69]/30">
                {b.tag}
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
