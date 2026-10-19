import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2, HeartHandshake, Briefcase, MapPin, Clock } from 'lucide-react';

interface JoinUsCareersProps {
  onApply: (roleName: string) => void;
}

export const JoinUsCareers: React.FC<JoinUsCareersProps> = ({ onApply }) => {
  const [activeDepartment, setActiveDepartment] = useState<'all' | 'design' | 'eng' | 'academy'>('all');

  const openRoles = [
    {
      id: 'sr-product-designer',
      title: 'Senior Product Designer (UI/UX)',
      department: 'design',
      type: 'Full-time · Hybrid / Remote',
      location: 'Accra, Ghana / Global Remote',
      description: 'Lead discovery workshops, craft complex design systems in Figma, and mentor fellowship designers.'
    },
    {
      id: 'lead-flutter-engineer',
      title: 'Lead Mobile Engineer (Flutter)',
      department: 'eng',
      type: 'Full-time · Remote',
      location: 'Accra, Ghana / Global Remote',
      description: 'Architect cross-platform mobile apps for fintech and supply chain clients with high performance standards.'
    },
    {
      id: 'fullstack-ts-engineer',
      title: 'Senior Full-Stack Engineer (React / Node)',
      department: 'eng',
      type: 'Full-time · Remote',
      location: 'Global Remote',
      description: 'Build mission-critical web applications, GraphQL/REST APIs, and maintain cloud infrastructure.'
    },
    {
      id: 'academy-design-mentor',
      title: 'Design Track Instructor & Mentor',
      department: 'academy',
      type: 'Part-time / Cohort Sprints',
      location: 'Accra, Ghana (In-Person & Online)',
      description: 'Deliver design critique, teach advanced prototyping, and nurture early-career African design talent.'
    }
  ];

  const filteredRoles = activeDepartment === 'all' 
    ? openRoles 
    : openRoles.filter(r => r.department === activeDepartment);

  return (
    <section id="careers" className="bg-white text-black py-20 lg:py-28 px-6 lg:px-8 border-b border-gray-100">
      <div className="max-w-[1240px] mx-auto">
        
        {/* Unique JNAB Career Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-10 bg-[#02AA69] rounded-full"></div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-gray-950 whitespace-nowrap">
              BUILD WITH JNAB
            </h2>
          </div>
          <p className="text-gray-700 text-lg sm:text-xl leading-relaxed mb-8">
            We are cultivating an environment of radical ownership, technical rigor, and design craftsmanship. If you are driven to engineer products that create tangible value across continents, explore our open tracks.
          </p>
          <a
            href="#careers-list"
            className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-[#02AA69] px-8 text-base font-semibold text-white transition-all hover:bg-[#018350] shadow-md hover:shadow-lg active:scale-95 whitespace-nowrap"
          >
            View Open Opportunities
          </a>
        </div>

        {/* Real Team Visual (Dexwin careers-team style) */}
        <div className="mb-16">
          <div className="relative rounded-[24px] md:rounded-[36px] overflow-hidden shadow-2xl border border-gray-200 aspect-[21/9]">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80"
              alt="JNAB team collaborating at Accra studio"
              className="w-full h-full object-cover filter saturate-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-6 md:p-10">
              <div className="text-white max-w-xl">
                <span className="text-xs font-bold uppercase tracking-widest text-[#02AA69] mb-1 block">
                  Life at JNAB
                </span>
                <h4 className="text-xl md:text-2xl font-bold">
                  High autonomy, world-class standards, and tangible human impact.
                </h4>
              </div>
            </div>
          </div>
        </div>

        {/* Open Roles List */}
        <div id="careers-list" className="pt-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <h3 className="text-2xl font-bold text-gray-950">
              Available Positions ({filteredRoles.length})
            </h3>
            
            {/* Department Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'All Roles' },
                { id: 'design', label: 'Product Design' },
                { id: 'eng', label: 'Engineering' },
                { id: 'academy', label: 'Academy & Training' },
              ].map((dep) => (
                <button
                  key={dep.id}
                  onClick={() => setActiveDepartment(dep.id as any)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    activeDepartment === dep.id
                      ? 'bg-black text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {dep.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredRoles.map((role) => (
              <div
                key={role.id}
                className="p-6 rounded-2xl bg-[#F6F6F6] hover:bg-[#F2EDFD] border border-gray-200/60 hover:border-purple-200 transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="font-bold text-lg text-gray-950 group-hover:text-purple-950">
                      {role.title}
                    </h4>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white text-gray-700 shrink-0 border border-gray-200">
                      {role.type}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {role.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-200/60 flex items-center justify-between">
                  <div className="text-xs text-gray-500 font-medium flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#02AA69]" />
                    {role.location}
                  </div>
                  <button
                    onClick={() => onApply(role.title)}
                    className="text-xs font-bold text-[#02AA69] hover:text-[#018350] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform cursor-pointer"
                  >
                    <span>Apply Now</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
