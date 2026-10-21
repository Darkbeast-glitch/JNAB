import React from 'react';
import { ArrowUpRight, CheckCircle2, Rocket, Users2, Layers, Cpu } from 'lucide-react';

interface HowWeDoItProps {
  onSelectModel: (tab: 'project' | 'talent', modelName: string) => void;
}

export const HowWeDoIt: React.FC<HowWeDoItProps> = ({ onSelectModel }) => {
  return (
    <section id="delivery-models" className="bg-white text-black py-20 lg:py-28 px-6 lg:px-8">
      <div className="max-w-[1240px] mx-auto">
        
        {/* Section Header (Unique JNAB Identity) */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16 pb-6 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-2.5 h-10 bg-[#02AA69] rounded-full shrink-0"></div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-gray-950 whitespace-nowrap">
              HOW WE DELIVER
            </h2>
          </div>
          <p className="text-gray-600 text-base md:text-lg max-w-md font-medium">
            Flexible collaboration structures engineered around your product roadmap, release deadlines, and team dynamics.
          </p>
        </div>

        {/* 3 Pillar Cards (Asymmetric Geometry with Unique JNAB Models) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Turnkey Product Sprints (Lavender Card with rounded-bl-[64px]) */}
          <div className="bg-[#F2EDFD] text-gray-900 rounded-3xl lg:rounded-bl-[64px] p-8 md:p-10 flex flex-col justify-between hover:shadow-xl transition-all duration-300 group border border-purple-100/50">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-purple-700 font-bold mb-6 shadow-sm">
                <Rocket className="w-6 h-6 stroke-[2.2]" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold mb-3 text-gray-950">
                Full-Cycle Product Builds
              </h3>
              <p className="text-gray-600 font-medium text-base mb-8">
                Complete concept-to-cloud execution. We take full ownership of discovery, UI/UX systems, engineering, and deployment.
              </p>

              {/* Scope details */}
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#02AA69]" />
                  <span>Discovery Sprints & Interactive Prototyping</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#02AA69]" />
                  <span>Scalable Web, Cloud & Mobile Codebases</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#02AA69]" />
                  <span>Automated CI/CD & Security Hardening</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#02AA69]" />
                  <span>Production Handover & SLA Support Warranty</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onSelectModel('project', 'Full-Cycle Product Build')}
              className="w-full mt-4 bg-black hover:bg-gray-800 text-white py-3.5 px-6 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm group-hover:bg-[#02AA69]"
            >
              <span>Commission a Build</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>

          {/* Card 2: Staff Augmentation Surge (Center Accent Card in Emerald Green #02AA69) */}
          <div className="bg-[#02AA69] text-white rounded-3xl p-8 md:p-10 flex flex-col justify-between hover:shadow-2xl transition-all duration-300 group shadow-lg shadow-[#02AA69]/20 transform lg:-translate-y-2">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-[#02AA69] font-bold mb-6 shadow-sm">
                <Users2 className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-extrabold uppercase tracking-wider mb-2">
                Rapid Scaling
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold mb-3 text-white">
                Embedded Senior Talent
              </h3>
              <p className="text-white/90 font-medium text-base mb-8">
                Inject specialized senior product designers and software engineers directly into your ongoing sprint cycles in under 48 hours.
              </p>

              {/* Scope details */}
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-sm text-white font-medium">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  <span>Senior UI/UX & Design System Architects</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-white font-medium">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  <span>Full-Stack, Flutter & Cloud Engineers</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-white font-medium">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  <span>Seamless Standup & Git/Jira Integration</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-white font-medium">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  <span>Full Overlap with UK, US & EU Hours</span>
                </li>
              </ul>
            </div>

            {/* Quick hire button */}
            <button
              onClick={() => onSelectModel('talent', 'Embedded Senior Talent')}
              className="w-full mt-4 bg-white text-[#02AA69] hover:bg-gray-50 py-3.5 px-6 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-transform group-hover:scale-[1.02] shadow-sm cursor-pointer whitespace-nowrap"
            >
              <span>Embed Senior Talent</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>

          {/* Card 3: Autonomous Product Squads (Lavender Card with rounded-br-[64px]) */}
          <div className="bg-[#F2EDFD] text-gray-900 rounded-3xl lg:rounded-br-[64px] p-8 md:p-10 flex flex-col justify-between hover:shadow-xl transition-all duration-300 group border border-purple-100/50">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-purple-700 font-bold mb-6 shadow-sm">
                <Layers className="w-6 h-6 stroke-[2.2]" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold mb-3 text-gray-950">
                Autonomous Tech Pods
              </h3>
              <p className="text-gray-600 font-medium text-base mb-8">
                Self-governing, cross-functional squads that take accountability for feature velocity, architectural hygiene, and roadmap goals.
              </p>

              {/* Scope details */}
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#02AA69]" />
                  <span>Dedicated Technical Product Lead & Scrum Lead</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#02AA69]" />
                  <span>Cohesive Pod: 3–6 Dedicated Developers</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#02AA69]" />
                  <span>Embedded QA, Automated Benchmarking & SRE</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#02AA69]" />
                  <span>Direct Slack / Linear / GitHub Sync</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onSelectModel('talent', 'Autonomous Tech Pod')}
              className="w-full mt-4 bg-black hover:bg-gray-800 text-white py-3.5 px-6 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm group-hover:bg-[#02AA69]"
            >
              <span>Deploy a Tech Pod</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
