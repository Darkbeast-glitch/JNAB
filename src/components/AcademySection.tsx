import React, { useState } from 'react';
import { 
  GraduationCap, 
  Calendar, 
  Clock, 
  Users, 
  CheckCircle2, 
  ArrowUpRight, 
  Sparkles, 
  BookOpen, 
  Laptop, 
  Award,
  Download
} from 'lucide-react';

interface AcademySectionProps {
  onApplyOrInquire: (trackName: string) => void;
}

export const AcademySection: React.FC<AcademySectionProps> = ({ onApplyOrInquire }) => {
  const [selectedTrack, setSelectedTrack] = useState<number>(0);

  const tracks = [
    {
      title: 'Product Design & UI/UX Fellowship',
      duration: '12 Weeks',
      pace: 'Intensive · Cohort-Based',
      level: 'Beginner to Intermediate',
      summary: 'Master end-to-end product design from user discovery to production Figma design systems, usability testing, and engineering handoff.',
      curriculum: [
        'User Research, Personas & Problem Framing',
        'Information Architecture & Low-Fidelity Wireframes',
        'Advanced Figma: Auto-Layout, Components & Variables',
        'Scalable Design Systems & Accessibility (WCAG 2.1)',
        'Micro-interactions & High-Fidelity Prototyping',
        'Real-world Client Capstone & Portfolio Review'
      ],
      badge: 'High Demand',
      outcome: 'Junior to Mid-Level Product / UI/UX Designer'
    },
    {
      title: 'Full-Stack Software Engineering',
      duration: '16 Weeks',
      pace: 'Intensive · Real Sprints',
      level: 'Intermediate to Advanced',
      summary: 'Build production-ready, distributed web applications using TypeScript, React, Node.js, PostgreSQL, and modern cloud deployment pipelines.',
      curriculum: [
        'TypeScript Deep-Dive & Architectural Patterns',
        'Frontend Engineering with React, Next.js & Tailwind',
        'Backend Microservices with Node.js & REST/GraphQL',
        'Relational & NoSQL Databases (PostgreSQL, Redis)',
        'Docker, CI/CD Actions & AWS/GCP Deployment',
        'Agile Sprint Simulations & Production Code Reviews'
      ],
      badge: 'Flagship Track',
      outcome: 'Full-Stack Software Engineer'
    },
    {
      title: 'Corporate & Team Tech Upskilling',
      duration: 'Custom',
      pace: 'Tailored Corporate Schedules',
      level: 'Enterprise Teams',
      summary: 'Custom technical and design sprints designed to modernize your existing in-house team into high-velocity product squads.',
      curriculum: [
        'Modernizing Enterprise Legacy Stacks to TypeScript',
        'Adopting Unified Company-wide Figma Design Systems',
        'Cloud-Native DevOps & Automated Testing Protocols',
        'Cross-Functional Agile Product Management Workshops'
      ],
      badge: 'For Companies',
      outcome: 'Certified High-Performing In-House Squad'
    }
  ];

  return (
    <section id="academy" className="bg-[#070B11] text-white py-20 lg:py-28 px-6 lg:px-8 border-b border-white/5 relative overflow-hidden">
      
      {/* Structural technical grid background (No AI glitter) */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
      />

      <div className="max-w-[1240px] mx-auto relative z-10">
        
        {/* Unique JNAB Academy Title Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16 pb-6 border-b border-white/10">
          <div className="flex items-center gap-4">
            <div className="w-2.5 h-10 bg-[#02AA69] rounded-full shrink-0"></div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white whitespace-nowrap">
              JNAB ACADEMY
            </h2>
          </div>
          <p className="text-gray-400 text-base md:text-lg max-w-md font-normal">
            Accelerating the careers of Africa's most driven product designers and software engineers through rigorous real-world apprenticeships.
          </p>
        </div>

        {/* 3 Column Track Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          {tracks.map((track, index) => {
            const isSelected = selectedTrack === index;
            return (
              <div
                key={track.title}
                onClick={() => setSelectedTrack(index)}
                className={`rounded-3xl p-8 transition-all duration-300 flex flex-col justify-between border cursor-pointer ${
                  isSelected
                    ? 'bg-white/10 border-[#02AA69] shadow-xl shadow-[#02AA69]/10'
                    : 'bg-white/[0.03] border-white/10 hover:border-white/20 hover:bg-white/[0.06]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#02AA69]/20 text-[#02AA69] border border-[#02AA69]/30">
                      {track.badge}
                    </span>
                    <span className="text-xs text-gray-400 font-semibold flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {track.duration}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-2">
                    {track.title}
                  </h3>

                  <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    {track.summary}
                  </p>

                  <div className="space-y-2.5 mb-8">
                    <div className="text-xs uppercase font-extrabold text-gray-400 tracking-wider mb-2">
                      Key Modules
                    </div>
                    {track.curriculum.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-gray-300">
                        <CheckCircle2 className="w-4 h-4 text-[#02AA69] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10">
                  <div className="text-[11px] text-gray-400 font-medium mb-3">
                    Target Outcome: <span className="text-white font-bold">{track.outcome}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onApplyOrInquire(track.title);
                    }}
                    className={`w-full py-3 px-5 rounded-full font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#02AA69] text-white hover:bg-[#018552]'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    <span>Apply For Cohort</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Real Training Metrics & Guarantees */}
        <div className="bg-[#001F37] border border-white/10 rounded-3xl p-8 lg:p-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
            <div>
              <div className="text-4xl font-extrabold text-[#02AA69] mb-1">1,400+</div>
              <div className="text-base font-bold text-white">Graduated Fellows</div>
              <p className="text-xs text-gray-400 mt-1">From Ghana and across the continent</p>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-white mb-1">94%</div>
              <div className="text-base font-bold text-white">Career Placement Rate</div>
              <p className="text-xs text-gray-400 mt-1">Within 90 days of graduation</p>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-[#02AA69] mb-1">100%</div>
              <div className="text-base font-bold text-white">Real-World Capstones</div>
              <p className="text-xs text-gray-400 mt-1">No dummy tutorials, only production builds</p>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-white mb-1">Direct</div>
              <div className="text-base font-bold text-white">Talent Pipeline</div>
              <p className="text-xs text-gray-400 mt-1">Graduates feed directly into JNAB client pods</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
