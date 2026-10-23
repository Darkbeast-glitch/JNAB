import React from 'react';
import { ShieldCheck, ArrowUpRight } from 'lucide-react';

export const Partnerships: React.FC = () => {
  const partners = [
    {
      name: 'Savile Row',
      category: 'Luxury Fashion & E-Commerce',
      logo: '/savilerow.jpeg',
      logoContainerClass: 'bg-[#16171d] border border-gray-800',
      imgClass: 'h-10 sm:h-12 w-auto object-contain rounded-md',
      description: 'Collaborating on bespoke luxury e-commerce architecture, seamless digital storefront workflows, and high-touch customer experience platforms.',
      highlight: 'Luxury Retail'
    },
    {
      name: 'ASPPEG',
      category: 'Energy & Supply Chain Distribution',
      logo: '/asspeg_logo.jpeg',
      logoContainerClass: 'bg-white border border-gray-200/70',
      imgClass: 'h-10 sm:h-12 w-auto object-contain rounded-md',
      description: 'Engineering resilient supply chain visibility, automated regulatory compliance logging, and digital transaction flows across commodities distribution.',
      highlight: 'Enterprise Alliances'
    },
    {
      name: 'Digivibe',
      category: 'Workforce Inclusion & Talent',
      logo: '/digivibe-logo-pink-uyqcBIAf.png',
      logoContainerClass: 'bg-white border border-gray-200/70',
      imgClass: 'h-9 sm:h-11 w-auto object-contain',
      description: 'Collaborating to train, mentor, and prepare high-potential female engineers for the modern digital workforce through intensive technical programs.',
      highlight: 'Women In Tech'
    },
    {
      name: 'Brandlift Africa',
      category: 'Brand Strategy & Growth',
      logo: '/brandlift-dark.png',
      logoContainerClass: 'bg-white border border-gray-200/70',
      imgClass: 'h-8 sm:h-10 w-auto object-contain',
      description: 'Strategic branding and product venture partner aligning digital software engineering with high-velocity market positioning across Africa.',
      highlight: 'Venture Studio'
    },
    {
      name: 'Cardia',
      category: 'Smart NFC & Digital Identity',
      logo: '/cardia-lockup-dark.png',
      logoContainerClass: 'bg-white border border-gray-200/70',
      imgClass: 'h-9 sm:h-11 w-auto object-contain',
      description: 'Engineering the next-generation NFC-powered digital identity ecosystem, instant contactless profile sharing, and enterprise networking hardware.',
      highlight: 'NFC Identity',
      link: 'https://www.cardia.me'
    },
    {
      name: 'SpeakWise',
      category: 'Conversational AI & Audio Tech',
      logo: '/speakwise-clean.png',
      logoContainerClass: 'bg-white border border-gray-200/70',
      imgClass: 'h-9 sm:h-11 w-auto object-contain',
      description: 'Collaborative development on real-time voice architectures, intelligent conversational feedback systems, and automated communication tools.',
      highlight: 'Speech AI'
    }
  ];

  return (
    <section id="alliances" className="bg-white text-black py-20 lg:py-28 px-6 lg:px-8 border-b border-gray-100">
      <div className="max-w-[1240px] mx-auto">
        
        {/* Unique JNAB Title Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16 pb-6 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-2.5 h-10 bg-[#02AA69] rounded-full shrink-0"></div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-gray-950 whitespace-nowrap">
              STRATEGIC ALLIANCES
            </h2>
          </div>
          <p className="text-gray-600 text-base md:text-lg max-w-md font-medium">
            Teaming up with forward-thinking tech ventures, talent networks, and digital scale-ups.
          </p>
        </div>

        {/* 2x2 Grid matching Dexwin #F6F6F6 styling */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="bg-[#F6F6F6] hover:bg-[#F0EFF8] transition-colors duration-200 rounded-3xl p-8 lg:p-10 flex flex-col justify-between border border-gray-200/60 shadow-xs"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#02AA69] mb-1 block">
                      {partner.category}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-950 flex items-center gap-2">
                      {partner.name}
                      {partner.link && (
                        <a
                          href={partner.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex text-gray-400 hover:text-[#02AA69] transition-colors p-1"
                          title={`Visit ${partner.name} (${partner.link})`}
                        >
                          <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
                        </a>
                      )}
                    </h3>
                  </div>
                  <div className={`h-16 w-auto max-w-[160px] px-3.5 py-2 rounded-2xl shadow-xs flex items-center justify-center shrink-0 ${partner.logoContainerClass || 'bg-white border border-gray-200/60'}`}>
                    <img 
                      src={partner.logo} 
                      alt={partner.name} 
                      className={`${partner.imgClass || 'h-full w-auto max-h-12 object-contain'}`}
                    />
                  </div>
                </div>

                  <p className="text-gray-600 text-base leading-relaxed mb-6">
                    {partner.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-200 flex items-center justify-between text-xs font-semibold text-gray-500">
                  <span className="flex items-center gap-1.5 text-gray-700">
                    <ShieldCheck className="w-4 h-4 text-[#02AA69]" />
                    Verified Partnership
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-white text-gray-700 font-bold border border-gray-200">
                    {partner.highlight}
                  </span>
                </div>
              </div>
            ))}
        </div>

      </div>
    </section>
  );
};
