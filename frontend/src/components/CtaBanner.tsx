import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface CtaBannerProps {
  onRequestQuote: () => void;
  onContactUs?: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ onRequestQuote, onContactUs }) => {
  return (
    <section className="flex flex-col lg:flex-row w-full min-h-[480px] overflow-hidden bg-[#001426] text-white">
      {/* Left Column (Content & Action) */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-8 py-14 lg:py-24 lg:px-20 relative z-10">
        <div className="max-w-[580px]">
          <span className="text-xs uppercase tracking-widest font-extrabold text-[#02AA69] mb-3 inline-block">
            Initiate Your Transformation
          </span>
          <h2 className="leading-[1.15] font-extrabold text-3xl sm:text-4xl md:text-[50px] mb-6 sm:mb-8 text-white tracking-tight">
            Ready to accelerate your roadmap with elite engineering?
          </h2>

          <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed mb-8 sm:mb-10">
            Whether you are architecting a complex product from scratch, reinforcing your team with senior developers, or upskilling internal talent through our academy — JNAB is ready to deliver.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onRequestQuote}
              className="bg-[#02AA69] hover:bg-[#018552] text-white cursor-pointer rounded-full font-semibold text-xs sm:text-sm md:text-base inline-flex items-center gap-3 pl-4 sm:pl-5 pr-1.5 py-1.5 transition-all duration-200 group shadow-md hover:shadow-[#02AA69]/30 active:scale-95 whitespace-nowrap w-auto"
            >
              <span>Request a Quote</span>
              <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 bg-white text-[#02AA69] rounded-full flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200 shadow-sm shrink-0">
                <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
              </div>
            </button>

            {onContactUs && (
              <button
                onClick={onContactUs}
                className="bg-white/10 hover:bg-white/20 text-white cursor-pointer rounded-full font-semibold text-xs sm:text-sm md:text-base inline-flex items-center px-5 py-3 transition-all duration-200 border border-white/15 hover:border-white/30 whitespace-nowrap"
              >
                <span>Contact Us</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Right Column (High Impact Editorial Tech Visual - Clean & Architectural) */}
      <div className="flex-1 relative min-h-[260px] sm:min-h-[320px] lg:min-h-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80"
          alt="JNAB workspace and planning"
          className="w-full h-full object-cover filter brightness-90 saturate-110"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#001426] via-transparent to-transparent lg:block hidden"></div>
      </div>
    </section>
  );
};
