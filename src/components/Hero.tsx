import React from 'react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onRequestQuote: () => void;
  onExploreTraining: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onRequestQuote, onExploreTraining }) => {
  return (
    <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 md:pt-44 md:pb-28 bg-[#070B11] overflow-hidden text-white border-b border-white/5">
      {/* Subtle structural grid lines (Technical, Architectural, NO generic AI gradients) */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Subtle natural dark studio spotlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[350px] sm:w-[600px] md:w-[800px] h-[250px] sm:h-[350px] bg-[#02AA69]/10 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Announcement Pill - Responsive & Overflow Safe */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-[#02AA69]/50 transition-colors cursor-pointer group max-w-full">
            <span className="w-2 h-2 rounded-full bg-[#02AA69] animate-pulse shrink-0"></span>
            <span className="text-[11px] sm:text-xs md:text-sm font-semibold tracking-wide text-gray-300 group-hover:text-white truncate sm:whitespace-nowrap">
              Product Design · Software Engineering · Tech Academy
            </span>
            <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#02AA69] transition-transform group-hover:translate-x-0.5 shrink-0 hidden sm:block" />
          </div>
        </div>

        {/* Hero Title - Perfectly Scaled & Responsive for Mobile and Desktop */}
        <div className="text-center mb-5 sm:mb-6">
          <h1 className="font-bold text-3xl sm:text-5xl md:text-6xl lg:text-[68px] leading-[1.18] sm:leading-tight tracking-tight mx-auto max-w-full">
            <span className="block sm:whitespace-normal lg:whitespace-nowrap">
              Architecting High-Performance Products
            </span>
            <span className="block mt-1 sm:mt-2 sm:whitespace-normal lg:whitespace-nowrap">
              Powered by <span className="text-[#09A768] font-extrabold">Next-Gen African Talent</span>
            </span>
          </h1>
        </div>

        {/* Hero Subtitle - Legible & Balanced */}
        <p className="text-center text-sm sm:text-lg md:text-xl text-gray-300 max-w-4xl mx-auto font-normal leading-relaxed mb-8 sm:mb-12 px-2">
          We craft intuitive interfaces, engineer resilient software, and cultivate world-class tech talent for ambitious global teams.
        </p>

        {/* Call to Actions (Compact & Proportional on Mobile) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-16 mx-auto">
          <button
            onClick={onRequestQuote}
            className="bg-[#02AA69] hover:bg-[#018552] text-white cursor-pointer rounded-full font-semibold text-xs sm:text-sm md:text-base inline-flex items-center gap-3 pl-4 sm:pl-6 pr-1.5 py-1.5 transition-all duration-200 group shadow-md hover:shadow-[#02AA69]/30 active:scale-95 whitespace-nowrap w-auto"
          >
            <span>Request a Quote</span>
            <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 bg-white text-[#02AA69] rounded-full flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200 shadow-sm shrink-0">
              <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
            </div>
          </button>

          <button
            onClick={onExploreTraining}
            className="border border-white/20 hover:border-white/40 hover:bg-white/5 text-white cursor-pointer rounded-full font-semibold text-xs sm:text-sm md:text-base px-5 sm:px-7 py-2.5 sm:py-3 transition-all duration-200 text-center whitespace-nowrap w-auto"
          >
            Explore JNAB Academy
          </button>
        </div>

        {/* Unique Trust Bar (Responsive) */}
        <div className="flex items-center justify-center gap-3 sm:gap-6 mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
          <div className="h-[1px] bg-white/20 flex-1 max-w-[40px] sm:max-w-[80px]"></div>
          <p className="font-bold text-[10px] sm:text-xs tracking-widest text-gray-400 uppercase text-center whitespace-nowrap">
            PROVEN IMPACT WITH LEADING ENTERPRISES & SCALE-UPS
          </p>
          <div className="h-[1px] bg-white/20 flex-1 max-w-[40px] sm:max-w-[80px]"></div>
        </div>

        {/* Logos Bar (Clean, App-style Smooth Scroll on Mobile, Centered on Desktop) */}
        <div className="flex items-center justify-start sm:justify-center gap-6 sm:gap-12 opacity-80 grayscale hover:grayscale-0 transition-all duration-300 overflow-x-auto no-scrollbar py-2 px-2">
          <div className="flex items-center gap-2 text-base sm:text-lg font-bold tracking-tight text-gray-300 shrink-0">
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded bg-[#FFCC00] text-black font-black flex items-center justify-center text-xs">M</div>
            <span>MTN Group</span>
          </div>
          <div className="flex items-center gap-2 text-base sm:text-lg font-bold tracking-tight text-gray-300 shrink-0">
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded bg-blue-600 text-white font-black flex items-center justify-center text-xs">WB</div>
            <span>World Bank</span>
          </div>
          <div className="flex items-center gap-2 text-base sm:text-lg font-bold tracking-tight text-gray-300 shrink-0">
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded bg-red-600 text-white font-black flex items-center justify-center text-xs">GIZ</div>
            <span>GIZ International</span>
          </div>
          <div className="flex items-center gap-2 text-base sm:text-lg font-bold tracking-tight text-gray-300 shrink-0">
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded bg-[#02AA69] text-white font-black flex items-center justify-center text-xs">SG</div>
            <span>Saving Grains</span>
          </div>
          <div className="flex items-center gap-2 text-base sm:text-lg font-bold tracking-tight text-gray-300 shrink-0">
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded bg-teal-600 text-white font-black flex items-center justify-center text-xs">PA</div>
            <span>PayAfrik</span>
          </div>
        </div>

        {/* Key Real Impact Numbers (Balanced Grid for Mobile & Desktop) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-12 sm:mt-16 pt-8 sm:pt-12 border-t border-white/10">
          <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-4 sm:p-5 hover:border-[#02AA69]/30 transition-colors">
            <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#02AA69] mb-0.5 sm:mb-1">45+</div>
            <div className="text-xs sm:text-sm font-semibold text-white">Shipped Digital Products</div>
            <div className="text-[10px] sm:text-xs text-gray-400 mt-0.5 sm:mt-1">Mobile, Web & Cloud Systems</div>
          </div>
          <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-4 sm:p-5 hover:border-[#02AA69]/30 transition-colors">
            <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-0.5 sm:mb-1">1,400+</div>
            <div className="text-xs sm:text-sm font-semibold text-white">Graduated Tech Fellows</div>
            <div className="text-[10px] sm:text-xs text-gray-400 mt-0.5 sm:mt-1">Designers & Full-Stack Devs</div>
          </div>
          <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-4 sm:p-5 hover:border-[#02AA69]/30 transition-colors">
            <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#02AA69] mb-0.5 sm:mb-1">99.98%</div>
            <div className="text-xs sm:text-sm font-semibold text-white">Production Uptime</div>
            <div className="text-[10px] sm:text-xs text-gray-400 mt-0.5 sm:mt-1">Mission-critical infrastructure</div>
          </div>
          <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-4 sm:p-5 hover:border-[#02AA69]/30 transition-colors">
            <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-0.5 sm:mb-1">48 Hrs</div>
            <div className="text-xs sm:text-sm font-semibold text-white">Talent Deployment</div>
            <div className="text-[10px] sm:text-xs text-gray-400 mt-0.5 sm:mt-1">Pre-vetted engineering squads</div>
          </div>
        </div>

      </div>
    </section>
  );
};
