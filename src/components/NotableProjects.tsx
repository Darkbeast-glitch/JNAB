import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, ExternalLink } from 'lucide-react';

export const NotableProjects: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const projects = [
    {
      id: 'payafrik',
      title: 'PayAfrik Mobile Wallet & API',
      category: 'Fintech & Cross-Border Payments',
      logo: 'PA',
      logoBg: 'bg-emerald-600',
      description: 'Engineered a unified cross-border payment gateway and consumer mobile wallet enabling seamless fiat and mobile money transfers across 6 West African markets.',
      metrics: [
        { label: 'Active Users', value: '1.2M+' },
        { label: 'Monthly Volume', value: '$42M+' },
        { label: 'Sub-second API', value: '<280ms' },
      ],
      tags: ['Product Design', 'Flutter Mobile', 'Node.js Microservices', 'PCI-DSS'],
      image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'agritrack',
      title: 'Saving Grains & AgriTrack',
      category: 'AgriTech & Supply Chain Logistics',
      logo: 'SG',
      logoBg: 'bg-amber-600',
      description: 'Co-developed an offline-first mobile and cloud platform for rural farmers and grain warehouse cooperatives in partnership with German and Ghanaian initiatives.',
      metrics: [
        { label: 'Farmers Connected', value: '35,000+' },
        { label: 'Post-Harvest Loss', value: '-38%' },
        { label: 'Uptime Reliability', value: '99.98%' },
      ],
      tags: ['UX Field Research', 'Offline-First DB', 'React Dashboard', 'IoT Telemetry'],
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'pulsehealth',
      title: 'PulseHealth Telemedicine Hub',
      category: 'Digital Health & Teleconsultation',
      logo: 'PH',
      logoBg: 'bg-blue-600',
      description: 'Designed and deployed a compliant teleconsultation app, digital prescription engine, and doctor schedule dispatch system servicing clinical networks.',
      metrics: [
        { label: 'Patient Consults', value: '250K+' },
        { label: 'Avg Doctor Response', value: '4 Mins' },
        { label: 'Satisfaction Rate', value: '4.9 / 5' },
      ],
      tags: ['Health UI/UX', 'WebRTC Video', 'HIPAA Compliant', 'Mobile App'],
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'talentflow',
      title: 'TalentFlow Vetting Engine',
      category: 'HR Tech & Skill Assessments',
      logo: 'TF',
      logoBg: 'bg-indigo-600',
      description: 'Built an automated code evaluation and portfolio benchmarking platform that JNAB uses to assess, train, and place top 1% African tech engineers.',
      metrics: [
        { label: 'Engineers Vetted', value: '14,000+' },
        { label: 'Assessment Time', value: '-65%' },
        { label: 'Partner Placements', value: '450+' },
      ],
      tags: ['Design Systems', 'TypeScript', 'Automated Sandbox', 'PostgreSQL'],
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80'
    }
  ];

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const current = projects[currentIndex];
  const progressPercent = ((currentIndex + 1) / projects.length) * 100;

  return (
    <section id="case-studies" className="bg-white text-black py-20 lg:py-28 px-6 lg:px-8 border-b border-gray-100">
      <div className="max-w-[1240px] mx-auto">
        
        {/* Unique JNAB Title Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 pb-6 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-2.5 h-10 bg-[#02AA69] rounded-full shrink-0"></div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-gray-950 whitespace-nowrap">
              FLAGSHIP DELIVERIES
            </h2>
          </div>
          <p className="text-gray-600 text-base md:text-lg max-w-md font-medium">
            A showcase of mission-critical digital systems and bespoke interfaces engineered by our squads.
          </p>
        </div>

        {/* Featured Project Big Card (Dexwin #f3f3f3 style with large round action arrow) */}
        <div className="bg-[#f5f6f8] rounded-3xl p-8 lg:p-14 relative overflow-hidden border border-gray-200/80 shadow-sm transition-all duration-300">
          
          {/* Dexwin Round Top-Right Link Arrow */}
          <div className="hidden md:flex absolute top-8 right-10 w-16 h-16 bg-white rounded-full items-center justify-center shadow-md text-gray-800 hover:text-[#02AA69] hover:scale-105 transition-all cursor-pointer">
            <ArrowUpRight className="w-6 h-6 stroke-[2.5]" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Project Details Left (Col 1-7) */}
            <div className="lg:col-span-7">
              
              {/* Logo & Category Badge */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-14 h-14 rounded-2xl ${current.logoBg} text-white font-extrabold text-xl flex items-center justify-center shadow-md shrink-0`}>
                  {current.logo}
                </div>
                <div className="whitespace-nowrap">
                  <span className="text-xs uppercase tracking-widest font-bold text-[#02AA69] block">
                    {current.category}
                  </span>
                  <div className="text-xs text-gray-500 font-semibold">
                    Client Case Study #{currentIndex + 1}
                  </div>
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="text-3xl sm:text-4xl font-extrabold text-gray-950 mb-4 tracking-tight">
                {current.title}
              </h3>

              <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-8 max-w-xl">
                {current.description}
              </p>

              {/* Metrics Row with Dexwin vertical dividers on a straight line */}
              <div className="flex items-center gap-6 sm:gap-8 pt-4 pb-8 border-y border-gray-200 flex-nowrap overflow-x-auto no-scrollbar">
                {current.metrics.map((metric, idx) => (
                  <React.Fragment key={metric.label}>
                    <div>
                      <div className="text-2xl sm:text-3xl font-extrabold text-gray-950">
                        {metric.value}
                      </div>
                      <div className="text-xs sm:text-sm font-semibold text-gray-500 mt-0.5">
                        {metric.label}
                      </div>
                    </div>
                    {idx < current.metrics.length - 1 && (
                      <div className="hidden sm:block h-10 w-[1px] bg-gray-300"></div>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap items-center gap-2 mt-6">
                {current.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-semibold px-3 py-1 rounded-full bg-white text-gray-700 border border-gray-200 shadow-2xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>

            </div>

            {/* Project Media Right (Col 8-12) */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-200 bg-white aspect-[4/3] group">
                <img
                  src={current.image}
                  alt={current.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="text-xs uppercase font-bold tracking-wider text-[#02AA69]">Verified Deployment</div>
                  <div className="text-sm font-semibold">{current.title}</div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Dexwin Carousel Controls (Bottom buttons + progress bar) */}
        <div className="mt-8 flex items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <button
              onClick={prevProject}
              className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-gray-300 bg-white flex items-center justify-center text-gray-800 hover:bg-gray-100 hover:border-gray-400 transition-colors shadow-sm cursor-pointer"
              aria-label="Previous Project"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextProject}
              className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-gray-300 bg-white flex items-center justify-center text-gray-800 hover:bg-gray-100 hover:border-gray-400 transition-colors shadow-sm cursor-pointer"
              aria-label="Next Project"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Dexwin Progress Track */}
          <div className="flex-1 ml-4 md:ml-8">
            <div className="flex justify-between text-xs font-bold text-gray-400 mb-2">
              <span>Case Study 0{currentIndex + 1}</span>
              <span>0{projects.length} Total</span>
            </div>
            <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#001F37] rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
