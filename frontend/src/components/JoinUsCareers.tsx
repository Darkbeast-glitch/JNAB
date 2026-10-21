import React, { useState, useEffect } from 'react';
import { ArrowUpRight, CheckCircle2, HeartHandshake, Briefcase, MapPin, Clock, Sparkles } from 'lucide-react';
import { getCareers, JobPosition as ApiJobPosition } from '../services/api';

interface JoinUsCareersProps {
  onApply: (roleName: string, roleId?: number) => void;
}

export const JoinUsCareers: React.FC<JoinUsCareersProps> = ({ onApply }) => {
  const [activeDepartment, setActiveDepartment] = useState<'all' | 'engineering' | 'design' | 'talent' | 'operations'>('all');
  const [roles, setRoles] = useState<ApiJobPosition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRoles = async () => {
    setLoading(true);
    setError(null);
    try {
      const apiRoles = await getCareers();
      setRoles(apiRoles || []);
    } catch (err: any) {
      console.error('[JNAB Careers] Error loading positions:', err);
      setError('Unable to load current career openings. Please try again.');
      setRoles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const filteredRoles = activeDepartment === 'all'
    ? roles
    : roles.filter((r) => r.department?.toLowerCase() === activeDepartment.toLowerCase());

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
            className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-[#02AA69] px-8 text-base font-semibold text-white transition-all hover:bg-[#018350] shadow-md hover:shadow-lg active:scale-95 whitespace-nowrap cursor-pointer"
          >
            View Open Opportunities
          </a>
        </div>

        {/* Real Team Visual */}
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
            <div>
              <h3 className="text-2xl font-bold text-gray-950">
                Available Positions ({loading ? '...' : filteredRoles.length})
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Managed & live-synchronized from JNAB Command Center
              </p>
            </div>
            
            {/* Department Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'All Roles' },
                { id: 'engineering', label: 'Engineering' },
                { id: 'design', label: 'Product Design' },
                { id: 'talent', label: 'Academy & Talent' },
                { id: 'operations', label: 'Operations & Strategy' },
              ].map((dep) => (
                <button
                  key={dep.id}
                  onClick={() => setActiveDepartment(dep.id as any)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    activeDepartment === dep.id
                      ? 'bg-black text-white shadow-sm'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {dep.label}
                </button>
              ))}
            </div>
          </div>

          {/* Loading Skeleton */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-[#F6F6F6] border border-gray-200/60 animate-pulse flex flex-col justify-between min-h-[190px]"
                >
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="h-6 bg-gray-200 rounded w-2/3"></div>
                      <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                    </div>
                    <div className="space-y-2 mb-4">
                      <div className="h-4 bg-gray-200 rounded w-full"></div>
                      <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-200/60 flex items-center justify-between">
                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="p-8 rounded-2xl bg-amber-50/50 border border-amber-200 text-center max-w-xl mx-auto my-6">
              <p className="text-amber-900 font-medium mb-3">{error}</p>
              <button
                onClick={fetchRoles}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-full bg-black text-white hover:bg-gray-800 transition-colors cursor-pointer"
              >
                Retry Connection
              </button>
            </div>
          ) : filteredRoles.length === 0 ? (
            <div className="p-12 rounded-2xl bg-gray-50 border border-gray-200 text-center max-w-xl mx-auto my-6">
              <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-6 h-6 stroke-[1.5]" />
              </div>
              <h4 className="font-bold text-gray-900 text-lg mb-1">
                No open roles in this department right now
              </h4>
              <p className="text-gray-600 text-sm mb-6">
                We frequently expand our engineering and design squads. Send us an open application and we'll reach out as soon as a fitting engagement opens up.
              </p>
              <div className="flex items-center justify-center gap-3">
                {activeDepartment !== 'all' && (
                  <button
                    onClick={() => setActiveDepartment('all')}
                    className="text-xs font-semibold px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    View all roles
                  </button>
                )}
                <button
                  onClick={() => onApply('General Talent Network Application')}
                  className="text-xs font-bold px-5 py-2.5 rounded-full bg-[#02AA69] text-white hover:bg-[#018350] transition-colors cursor-pointer"
                >
                  Submit Open Profile
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredRoles.map((role) => (
                <div
                  key={role.id}
                  className="p-6 rounded-2xl bg-[#F6F6F6] hover:bg-white border border-gray-200/80 hover:border-[#02AA69]/40 hover:shadow-lg transition-all duration-200 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex flex-col gap-1">
                        {role.featured && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#02AA69] bg-[#02AA69]/10 px-2 py-0.5 rounded-full w-fit">
                            <Sparkles className="w-2.5 h-2.5" /> Featured Opening
                          </span>
                        )}
                        <h4 className="font-bold text-lg text-gray-950 group-hover:text-black">
                          {role.title}
                        </h4>
                      </div>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white text-gray-700 shrink-0 border border-gray-200">
                        {role.work_type_display || role.work_type || 'Full-time'}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {role.summary || role.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-200/60 flex items-center justify-between">
                    <div className="text-xs text-gray-500 font-medium flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#02AA69]" />
                      {role.location}
                    </div>
                    <button
                      onClick={() => onApply(role.title, role.id)}
                      className="text-xs font-bold text-[#02AA69] hover:text-[#018350] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform cursor-pointer"
                    >
                      <span>Apply for Role</span>
                      <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Open Talent Network CTA */}
          <div className="mt-8 p-6 rounded-2xl bg-gray-50 border border-gray-200/70 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h5 className="font-bold text-gray-900 text-base">Don't see your specific role listed?</h5>
              <p className="text-gray-500 text-xs sm:text-sm mt-0.5">
                We are always seeking exceptional African software engineers, UI/UX architects, and DevOps pioneers.
              </p>
            </div>
            <button
              onClick={() => onApply('General Talent Network Application')}
              className="bg-black hover:bg-gray-800 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-full transition-all shrink-0 cursor-pointer"
            >
              Send Open Application
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
