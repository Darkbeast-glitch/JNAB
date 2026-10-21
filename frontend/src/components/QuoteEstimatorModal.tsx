import React, { useState, useEffect } from 'react';
import { X, ArrowUpRight, CheckCircle2, Building, Send, Sparkles, Users, GraduationCap, Code2, AlertCircle } from 'lucide-react';
import { submitProductBuild, submitHireTalent, submitAcademyApplication } from '../services/api';

interface QuoteEstimatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'project' | 'talent' | 'academy';
  initialService?: string;
}

export const QuoteEstimatorModal: React.FC<QuoteEstimatorModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'project',
  initialService = 'Full-Cycle Product Build'
}) => {
  const [activeType, setActiveType] = useState<'project' | 'talent' | 'academy'>(initialTab);

  useEffect(() => {
    if (initialTab) setActiveType(initialTab);
  }, [initialTab]);

  // Common Contact Info
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');

  // 1. Product Build State
  const [projectType, setProjectType] = useState('full_cycle');
  const [budget, setBudget] = useState('tier_2');
  const [timeline, setTimeline] = useState('standard');
  const [projectDescription, setProjectDescription] = useState('');
  const [specUrl, setSpecUrl] = useState('');

  // 2. Hire Talent State
  const [engagementModel, setEngagementModel] = useState('embedded_talent');
  const [rolesNeeded, setRolesNeeded] = useState('Senior Full-Stack Developer');
  const [seniority, setSeniority] = useState('senior');
  const [duration, setDuration] = useState('6_months');
  const [headcount, setHeadcount] = useState('1–2 Engineers');
  const [technicalReqs, setTechnicalReqs] = useState('');

  // 3. Academy State
  const [track, setTrack] = useState('full_stack');
  const [experienceLevel, setExperienceLevel] = useState('intermediate');
  const [learningMode, setLearningMode] = useState('bootcamp');
  const [motivation, setMotivation] = useState('');
  const [scholarship, setScholarship] = useState(false);

  // Status & Feedback
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (activeType === 'project') {
        const res = await submitProductBuild({
          full_name: fullName,
          company_name: company,
          work_email: email,
          phone: phone,
          project_type: projectType,
          budget_range: budget,
          timeline: timeline,
          project_description: projectDescription,
          existing_spec_url: specUrl,
        });
        setSuccessMessage(res.message || 'Your product build inquiry has been logged.');
      } else if (activeType === 'talent') {
        const res = await submitHireTalent({
          full_name: fullName,
          company_name: company || 'Venture Client',
          work_email: email,
          phone: phone,
          engagement_model: engagementModel,
          roles_needed: rolesNeeded,
          seniority_level: seniority,
          headcount: headcount,
          duration: duration,
          start_date: 'Within 2 Weeks',
          technical_requirements: technicalReqs || 'General modern stack',
        });
        setSuccessMessage(res.message || 'Your talent squad inquiry has been logged.');
      } else if (activeType === 'academy') {
        const res = await submitAcademyApplication({
          full_name: fullName,
          email: email,
          phone: phone,
          track: track,
          experience_level: experienceLevel,
          learning_mode: learningMode,
          motivation_statement: motivation,
          scholarship_requested: scholarship,
        });
        setSuccessMessage(res.message || 'Your JNAB Academy application has been submitted.');
      }
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Failed to submit. Please check your network or try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-[#0D131F] text-white border border-white/10 rounded-3xl w-full max-w-2xl max-h-[92vh] overflow-y-auto shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 sm:p-8 border-b border-white/10 bg-[#0A0E17]/95 backdrop-blur-md">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#02AA69]"></span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#02AA69]">
                JNAB Client & Academy Gateway
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight">
              {submitted ? 'Inquiry Received' : 'Partner with JNAB'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 sm:p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-[#02AA69]/20 text-[#02AA69] flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
            </div>
            <h4 className="text-2xl font-bold mb-3">Thank You, {fullName || 'Partner'}!</h4>
            <p className="text-gray-300 text-base max-w-md mx-auto mb-8 leading-relaxed">
              {successMessage}
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="bg-[#02AA69] hover:bg-[#018552] text-white font-bold py-3.5 px-8 rounded-full transition-all cursor-pointer shadow-lg shadow-[#02AA69]/25"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4 flex items-center gap-3 text-red-300 text-sm">
                <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
                <span>{error}</span>
              </div>
            )}

            {/* Purpose Switcher (3 Distinct Models) */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2.5">
                Select Engagement Track
              </label>
              <div className="grid grid-cols-3 gap-2 p-1.5 bg-white/5 border border-white/10 rounded-2xl">
                <button
                  type="button"
                  onClick={() => setActiveType('project')}
                  className={`py-3 px-2 rounded-xl text-xs sm:text-sm font-bold flex flex-col sm:flex-row items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    activeType === 'project'
                      ? 'bg-[#02AA69] text-white shadow-md'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Code2 className="w-4 h-4" />
                  <span>Product Build</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveType('talent')}
                  className={`py-3 px-2 rounded-xl text-xs sm:text-sm font-bold flex flex-col sm:flex-row items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    activeType === 'talent'
                      ? 'bg-[#02AA69] text-white shadow-md'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>Hire Talent Pod</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveType('academy')}
                  className={`py-3 px-2 rounded-xl text-xs sm:text-sm font-bold flex flex-col sm:flex-row items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    activeType === 'academy'
                      ? 'bg-[#02AA69] text-white shadow-md'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>JNAB Academy</span>
                </button>
              </div>
            </div>

            {/* Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Mensah"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 focus:border-[#02AA69] rounded-xl px-4 py-3 text-white text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                  Work Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="sarah@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 focus:border-[#02AA69] rounded-xl px-4 py-3 text-white text-sm outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                  Phone / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+233 24 000 0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 focus:border-[#02AA69] rounded-xl px-4 py-3 text-white text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                  {activeType === 'academy' ? 'Current Organization / School' : 'Company / Venture Name'}
                </label>
                <input
                  type="text"
                  placeholder={activeType === 'academy' ? 'Self / University / Company' : 'e.g. PayAfrik Technologies'}
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 focus:border-[#02AA69] rounded-xl px-4 py-3 text-white text-sm outline-none"
                />
              </div>
            </div>

            {/* TAB 1: PRODUCT BUILD SPECIFICS */}
            {activeType === 'project' && (
              <div className="space-y-4 pt-2 border-t border-white/10">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                      Project Type
                    </label>
                    <select
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                      className="w-full bg-[#161D2B] border border-white/10 focus:border-[#02AA69] rounded-xl px-3 py-3 text-white text-sm outline-none"
                    >
                      <option value="full_cycle">End-to-End Build (Design + Code)</option>
                      <option value="mobile_app">Mobile App (Flutter / iOS / Android)</option>
                      <option value="web_platform">Web Platform / SaaS App</option>
                      <option value="enterprise_system">Enterprise Backend & Cloud</option>
                      <option value="ui_ux_design">UI/UX & Design System</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                      Target Budget
                    </label>
                    <select
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full bg-[#161D2B] border border-white/10 focus:border-[#02AA69] rounded-xl px-3 py-3 text-white text-sm outline-none"
                    >
                      <option value="tier_1">$5,000 – $15,000</option>
                      <option value="tier_2">$15,000 – $30,000</option>
                      <option value="tier_3">$30,000 – $60,000</option>
                      <option value="tier_4">$60,000+ (Enterprise)</option>
                      <option value="undecided">To Be Scoped</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                      Target Timeline
                    </label>
                    <select
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value)}
                      className="w-full bg-[#161D2B] border border-white/10 focus:border-[#02AA69] rounded-xl px-3 py-3 text-white text-sm outline-none"
                    >
                      <option value="immediate">Immediate (&lt; 1 month)</option>
                      <option value="standard">1 – 3 Months (MVP)</option>
                      <option value="medium">3 – 6 Months</option>
                      <option value="flexible">Flexible / Exploring</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                    Project Scope & Key Features *
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Describe your vision, core user flows, technical integrations required, or specific problem to solve..."
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 focus:border-[#02AA69] rounded-xl px-4 py-3 text-white text-sm outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                    Figma / PRD / Notion Specification Link (Optional)
                  </label>
                  <input
                    type="url"
                    placeholder="https://figma.com/file/... or Notion spec"
                    value={specUrl}
                    onChange={(e) => setSpecUrl(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 focus:border-[#02AA69] rounded-xl px-4 py-3 text-white text-sm outline-none"
                  />
                </div>
              </div>
            )}

            {/* TAB 2: HIRE TALENT SPECIFICS */}
            {activeType === 'talent' && (
              <div className="space-y-4 pt-2 border-t border-white/10">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                      Engagement Model
                    </label>
                    <select
                      value={engagementModel}
                      onChange={(e) => setEngagementModel(e.target.value)}
                      className="w-full bg-[#161D2B] border border-white/10 focus:border-[#02AA69] rounded-xl px-3 py-3 text-white text-sm outline-none"
                    >
                      <option value="embedded_talent">Embedded Senior Devs</option>
                      <option value="dedicated_pod">Autonomous Tech Pod</option>
                      <option value="staff_augmentation">Staff Augmentation</option>
                      <option value="tech_advisory">Fractional CTO / Advisory</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                      Seniority Level
                    </label>
                    <select
                      value={seniority}
                      onChange={(e) => setSeniority(e.target.value)}
                      className="w-full bg-[#161D2B] border border-white/10 focus:border-[#02AA69] rounded-xl px-3 py-3 text-white text-sm outline-none"
                    >
                      <option value="senior">Senior (4–7+ yrs)</option>
                      <option value="mid">Mid-Level (2–4 yrs)</option>
                      <option value="lead">Principal / Lead Architect</option>
                      <option value="mixed">Mixed Squad</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                      Engagement Duration
                    </label>
                    <select
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="w-full bg-[#161D2B] border border-white/10 focus:border-[#02AA69] rounded-xl px-3 py-3 text-white text-sm outline-none"
                    >
                      <option value="3_months">3 Months (Sprint)</option>
                      <option value="6_months">6 Months</option>
                      <option value="12_months_plus">12+ Months (Strategic)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                      Roles Needed *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 2x React Devs, 1x Python/Django, 1x UI/UX"
                      value={rolesNeeded}
                      onChange={(e) => setRolesNeeded(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 focus:border-[#02AA69] rounded-xl px-4 py-3 text-white text-sm outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                      Headcount
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 1 Engineer, or Squad of 3"
                      value={headcount}
                      onChange={(e) => setHeadcount(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 focus:border-[#02AA69] rounded-xl px-4 py-3 text-white text-sm outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                    Technical Stack & Workflow Requirements
                  </label>
                  <textarea
                    rows={2}
                    placeholder="List required languages, cloud tools, timezone overlap requirements, or sprint cadences..."
                    value={technicalReqs}
                    onChange={(e) => setTechnicalReqs(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 focus:border-[#02AA69] rounded-xl px-4 py-3 text-white text-sm outline-none resize-none"
                  />
                </div>
              </div>
            )}

            {/* TAB 3: ACADEMY APPLICATION SPECIFICS */}
            {activeType === 'academy' && (
              <div className="space-y-4 pt-2 border-t border-white/10">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                      Selected Track
                    </label>
                    <select
                      value={track}
                      onChange={(e) => setTrack(e.target.value)}
                      className="w-full bg-[#161D2B] border border-white/10 focus:border-[#02AA69] rounded-xl px-3 py-3 text-white text-sm outline-none"
                    >
                      <option value="full_stack">Track 02: Full-Stack Engineering</option>
                      <option value="product_design">Track 01: Product Design & UI/UX</option>
                      <option value="enterprise_upskilling">Track 03: Enterprise Upskilling</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                      Current Experience
                    </label>
                    <select
                      value={experienceLevel}
                      onChange={(e) => setExperienceLevel(e.target.value)}
                      className="w-full bg-[#161D2B] border border-white/10 focus:border-[#02AA69] rounded-xl px-3 py-3 text-white text-sm outline-none"
                    >
                      <option value="intermediate">Intermediate (1–2 yrs coding)</option>
                      <option value="beginner">Beginner (Foundational)</option>
                      <option value="advanced">Advanced Practitioner</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                      Learning Format
                    </label>
                    <select
                      value={learningMode}
                      onChange={(e) => setLearningMode(e.target.value)}
                      className="w-full bg-[#161D2B] border border-white/10 focus:border-[#02AA69] rounded-xl px-3 py-3 text-white text-sm outline-none"
                    >
                      <option value="bootcamp">Full-Time Intensive Fellowship</option>
                      <option value="part_time">Part-Time / Evening & Weekend</option>
                      <option value="corporate">Corporate Sponsored</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                    Motivation & Goals *
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Tell us what you want to achieve with JNAB Academy, and what kind of high-impact systems you want to build..."
                    value={motivation}
                    onChange={(e) => setMotivation(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 focus:border-[#02AA69] rounded-xl px-4 py-3 text-white text-sm outline-none resize-none"
                  />
                </div>

                <div className="flex items-center gap-3 pt-1">
                  <input
                    type="checkbox"
                    id="scholarship"
                    checked={scholarship}
                    onChange={(e) => setScholarship(e.target.checked)}
                    className="w-4 h-4 accent-[#02AA69] rounded cursor-pointer"
                  />
                  <label htmlFor="scholarship" className="text-xs text-gray-300 cursor-pointer select-none">
                    Apply for need-based tuition subsidy / merit scholarship
                  </label>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#02AA69] hover:bg-[#018552] disabled:opacity-50 text-white font-bold py-4 rounded-full flex items-center justify-center gap-2 shadow-lg shadow-[#02AA69]/25 transition-all cursor-pointer"
              >
                {loading ? (
                  <span>Transmitting Brief...</span>
                ) : (
                  <>
                    <span>Submit Inquiry</span>
                    <Send className="w-4 h-4 stroke-[2.5]" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
