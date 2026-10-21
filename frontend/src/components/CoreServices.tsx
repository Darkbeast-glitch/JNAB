import React, { useState } from 'react';
import { 
  Palette, 
  Code2, 
  GraduationCap, 
  Users, 
  BarChart3, 
  Briefcase, 
  ArrowUpRight,
  CheckCircle,
  Sparkles
} from 'lucide-react';

interface CoreServicesProps {
  onSelectService: (serviceName: string) => void;
}

export const CoreServices: React.FC<CoreServicesProps> = ({ onSelectService }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'design' | 'dev' | 'training' | 'talent'>('all');

  const services = [
    {
      id: 'design',
      title: 'UI/UX & Design Systems',
      category: 'design',
      icon: Palette,
      summary: 'Crafting empathetic user journeys, production Figma design systems, and frictionless digital interfaces.',
      deliverables: ['Atomic Design Systems & Component Specs', 'Interactive Clickable Prototypes', 'User Journey Validation & Usability Tests', 'Production Figma-to-Code Handoff'],
      highlight: 'Design Studio'
    },
    {
      id: 'dev',
      title: 'Application Engineering',
      category: 'dev',
      icon: Code2,
      summary: 'Building resilient cloud platforms, distributed web applications, and high-performance cross-platform mobile apps.',
      deliverables: ['Responsive Web & Flutter Mobile Apps', 'Scalable Microservices & REST/GraphQL APIs', 'Cloud Architecture (AWS / GCP / Cloudflare)', 'Automated Test Suites & Security Hardening'],
      highlight: 'Engineering'
    },
    {
      id: 'training',
      title: 'JNAB Academy & Bootcamps',
      category: 'training',
      icon: GraduationCap,
      summary: 'Intensive, cohort-based career bootcamps and corporate training transforming ambitious talent into production-ready specialists.',
      deliverables: ['12-Week Product Design Fellowships', '16-Week Full-Stack Software Bootcamps', 'Corporate Engineering Upskilling Sprints', '1-on-1 Apprenticeship & Portfolio Reviews'],
      highlight: 'Talent Engine'
    },
    {
      id: 'talent',
      title: 'Dedicated Talent Integration',
      category: 'talent',
      icon: Users,
      summary: 'Embed thoroughly assessed African tech professionals directly into your engineering sprints in 48 hours.',
      deliverables: ['Senior Product Designers & Frontends', 'Backend, Flutter & Cloud Engineers', 'Aligned with UK, US & European Working Hours', 'Flexible Monthly Sprint Engagements'],
      highlight: '48hr Deployment'
    },
    {
      id: 'analytics',
      title: 'Data & Applied Intelligence',
      category: 'dev',
      icon: BarChart3,
      summary: 'Transform fragmented operations data into clean analytics pipelines, executive reporting, and predictive business intelligence.',
      deliverables: ['Custom BI Metrics & Dashboards', 'Scalable ETL Pipelines & Data Warehouses', 'Conversion Funnel & Retention Analytics', 'Pragmatic Machine Learning Integration'],
      highlight: 'Data Insights'
    },
    {
      id: 'consulting',
      title: 'Architecture & Tech Advisory',
      category: 'talent',
      icon: Briefcase,
      summary: 'Independent code audits, cloud infrastructure assessments, legacy modernization, and fractional CTO leadership.',
      deliverables: ['Full Codebase & Security Audits', 'Cloud Cost Optimization & Refactoring', 'Tech Stack Selection & Migration Roadmaps', 'Agile Velocity & Team Process Consulting'],
      highlight: 'Advisory'
    },
  ];

  const filteredServices = activeTab === 'all' 
    ? services 
    : services.filter(s => s.category === activeTab);

  return (
    <section id="capabilities" className="bg-white text-black py-20 lg:py-28 px-6 lg:px-8 border-b border-gray-100">
      <div className="max-w-[1240px] mx-auto">
        
        {/* Unique JNAB Title Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 pb-6 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-2.5 h-10 bg-[#02AA69] rounded-full shrink-0"></div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-gray-950 whitespace-nowrap">
              CORE CAPABILITIES
            </h2>
          </div>
          <p className="text-gray-600 text-base md:text-lg max-w-md font-medium">
            From high-fidelity design systems to distributed cloud platforms and intensive career bootcamps.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {[
            { id: 'all', label: 'All Offerings' },
            { id: 'design', label: 'Product Design' },
            { id: 'dev', label: 'Software Engineering' },
            { id: 'training', label: 'Academy & Training' },
            { id: 'talent', label: 'Talent & Consulting' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-black text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 6 Services Grid (Dexwin Card Style: #F2EDFD that inverts to #02AA69 with white text on hover) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                onClick={() => onSelectService(service.title)}
                className="relative group p-8 bg-[#F2EDFD] hover:bg-[#02AA69] hover:text-white rounded-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1 border border-purple-100/60"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    {/* Icon container with hover inversion */}
                    <div className="w-14 h-14 rounded-2xl bg-white group-hover:bg-white/20 flex items-center justify-center text-purple-700 group-hover:text-white transition-colors duration-300 shadow-sm">
                      <Icon className="w-7 h-7 stroke-[2.2]" />
                    </div>

                    <span className="text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-white/70 group-hover:bg-white/20 text-purple-900 group-hover:text-white transition-colors duration-300">
                      {service.highlight}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold mb-3 text-gray-950 group-hover:text-white duration-300">
                    {service.title}
                  </h3>

                  <p className="text-gray-600 group-hover:text-white/90 text-sm leading-relaxed mb-6 duration-300">
                    {service.summary}
                  </p>

                  {/* Bullet Deliverables */}
                  <div className="space-y-2 mb-6">
                    {service.deliverables.map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-gray-700 group-hover:text-white/95 font-medium duration-300">
                        <CheckCircle className="w-3.5 h-3.5 text-[#02AA69] group-hover:text-white shrink-0 duration-300" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer action prompt */}
                <div className="pt-4 border-t border-purple-200/50 group-hover:border-white/20 flex items-center justify-between duration-300">
                  <span className="text-xs font-bold text-purple-900 group-hover:text-white duration-300">
                    Inquire or Request Quote
                  </span>
                  <div className="w-7 h-7 rounded-full bg-white/80 group-hover:bg-white text-gray-900 group-hover:text-[#02AA69] flex items-center justify-center transition-transform group-hover:translate-x-1 duration-300">
                    <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
