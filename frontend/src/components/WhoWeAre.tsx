import React from 'react';
import { Check, ArrowRight, Shield, Layers, Award, Terminal } from 'lucide-react';

export const WhoWeAre: React.FC = () => {
  return (
    <section id="about" className="bg-white text-black py-20 lg:py-28 px-6 lg:px-8 border-b border-gray-100">
      <div className="max-w-[1240px] mx-auto">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* Visual Side (Authentic Studio / Tech Workspace, No generic AI CGI) */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gray-900 border border-gray-200">
              <img
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80"
                alt="JNAB Product team collaborating on architecture"
                className="w-full h-[420px] md:h-[500px] object-cover object-center filter saturate-105"
              />
              
              {/* Overlay card for real tangible credentials */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-5 rounded-2xl border border-gray-100 shadow-xl flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-wider font-bold text-[#02AA69]">Engineering Center</div>
                  <div className="text-base font-bold text-gray-900">Accra Tech Cluster & Remote Global</div>
                </div>
                <div className="flex items-center gap-1 text-sm font-semibold text-gray-700 bg-gray-100 px-3 py-1.5 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-[#02AA69]"></span>
                  Active Sprints
                </div>
              </div>
            </div>

            {/* Subtle decorative offset border block */}
            <div className="hidden sm:block absolute -bottom-4 -right-4 w-full h-full rounded-3xl border-2 border-gray-200 -z-10" />
          </div>

          {/* Text Narrative Side (Unique JNAB Identity) */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-gray-950 leading-[1.2] mb-8">
              We bridge strategic product design and engineering rigor to build software that scales predictably.
            </h2>

            <div className="mb-8 flex flex-col sm:flex-row items-start gap-6">
              <span className="inline-block border border-gray-900 text-gray-900 rounded-full px-5 py-2 text-xs md:text-sm font-bold uppercase tracking-wider whitespace-nowrap shrink-0">
                Our Foundation
              </span>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                Headquartered in Accra with global remote reach, JNAB operates as both an agile product engineering studio and a premier talent development hub. We partner with founders and enterprises to architect resilient digital platforms, while training Africa's most ambitious designers and engineers through real-world production apprenticeships.
              </p>
            </div>

            {/* Core Capability Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 mb-8 border-t border-gray-100">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#02AA69]/10 text-[#02AA69] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Strategic Product Design</h4>
                  <p className="text-xs text-gray-600">User research, design systems & prototypes</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#02AA69]/10 text-[#02AA69] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Enterprise Engineering</h4>
                  <p className="text-xs text-gray-600">Cloud architectures, mobile apps & robust APIs</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#02AA69]/10 text-[#02AA69] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">JNAB Training Academy</h4>
                  <p className="text-xs text-gray-600">Cohort fellowships & corporate upskilling</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#02AA69]/10 text-[#02AA69] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Dedicated Tech Pods</h4>
                  <p className="text-xs text-gray-600">Pre-vetted talent integrated into your sprints</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <a 
                href="#services" 
                className="inline-flex items-center gap-2 text-base font-bold text-[#02AA69] hover:text-[#018350] transition-colors"
              >
                <span>Explore all our capabilities</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
