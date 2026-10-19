import React from 'react';
import { Building2, Globe2, Landmark, Leaf, ShieldCheck, Handshake } from 'lucide-react';

export const Partnerships: React.FC = () => {
  const partners = [
    {
      name: 'MTN Ghana',
      category: 'Strategic Telecom Partner',
      icon: Building2,
      description: 'The nation’s largest telecom provider, delivering mobile and digital services to over 25+ million subscribers.',
      highlight: 'Telecom & FinTech'
    },
    {
      name: 'GIZ International',
      category: 'Sustainable Development',
      icon: Globe2,
      description: 'German development agency supporting high-impact digital employment and technical capacity building programs across West Africa.',
      highlight: 'Global Impact'
    },
    {
      name: 'The World Bank',
      category: 'Development Initiatives',
      icon: Landmark,
      description: 'Advisory and digital modernization partner providing strategic consulting for regional youth tech empowerment programs.',
      highlight: 'Institutional'
    },
    {
      name: 'Saving Grains',
      category: 'Social Impact Enterprise',
      icon: Leaf,
      description: 'A social agricultural technology enterprise leveraging JNAB mobile solutions to eliminate post-harvest losses for grain farmers.',
      highlight: 'AgriTech'
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
            Teaming up with premier telecommunications networks, global institutions, and venture initiatives.
          </p>
        </div>

        {/* 2x2 Grid matching Dexwin #F6F6F6 styling */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {partners.map((partner) => {
            const Icon = partner.icon;
            return (
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
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-950">
                        {partner.name}
                      </h3>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-gray-800 shrink-0">
                      <Icon className="w-6 h-6 stroke-[2]" />
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
            );
          })}
        </div>

      </div>
    </section>
  );
};
