import React, { useState } from 'react';
import { X, ArrowUpRight, CheckCircle2, Building, Send, Sparkles } from 'lucide-react';

interface QuoteEstimatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

export const QuoteEstimatorModal: React.FC<QuoteEstimatorModalProps> = ({
  isOpen,
  onClose,
  initialService = 'End to End Delivery'
}) => {
  const [activeType, setActiveType] = useState<'project' | 'talent' | 'academy'>('project');
  const [service, setService] = useState(initialService);
  const [budget, setBudget] = useState('$10k - $25k');
  const [timeline, setTimeline] = useState('1 - 3 Months');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-[#0D131F] text-white border border-white/10 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 sm:p-8 border-b border-white/10 bg-[#0A0E17]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#02AA69]"></span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#02AA69]">
                JNAB Client & Talent Gateway
              </span>
            </div>
            <h3 className="text-2xl font-black tracking-tight">
              {submitted ? 'Inquiry Received' : 'Request a Quote / Inquire'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 sm:p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-[#02AA69]/20 text-[#02AA69] flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
            </div>
            <h4 className="text-2xl font-bold mb-3">Thank You, {name || 'Partner'}!</h4>
            <p className="text-gray-300 text-base max-w-md mx-auto mb-8 leading-relaxed">
              We have received your brief regarding <span className="text-white font-bold">{service}</span>. Our engineering and delivery lead will review the scope and reply within 24 business hours.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="bg-[#02AA69] hover:bg-[#018552] text-white px-8 py-3 rounded-full font-bold text-sm cursor-pointer"
            >
              Back to Home
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
            {/* Inquiry Category Selector */}
            <div className="grid grid-cols-3 gap-2 p-1 bg-white/5 rounded-2xl mb-6 border border-white/5">
              <button
                type="button"
                onClick={() => { setActiveType('project'); setService('End-to-End Product Build'); }}
                className={`py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeType === 'project' ? 'bg-[#02AA69] text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                Product Build
              </button>
              <button
                type="button"
                onClick={() => { setActiveType('talent'); setService('Staff Augmentation / Embedded Team'); }}
                className={`py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeType === 'talent' ? 'bg-[#02AA69] text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                Hire Talent
              </button>
              <button
                type="button"
                onClick={() => { setActiveType('academy'); setService('Skills Training & Academy'); }}
                className={`py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeType === 'academy' ? 'bg-[#02AA69] text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                Academy Training
              </button>
            </div>

            {/* Service Focus */}
            <div className="mb-5">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                Primary Engagement Area
              </label>
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#02AA69] cursor-pointer"
              >
                <option value="UI/UX & Design Systems" className="bg-gray-900">UI/UX & Design Systems</option>
                <option value="Full-Cycle Product Build" className="bg-gray-900">Full-Cycle Product Build (Web / Mobile)</option>
                <option value="Embedded Senior Talent" className="bg-gray-900">Embedded Senior Talent (Staff Augmentation)</option>
                <option value="Autonomous Tech Pod" className="bg-gray-900">Autonomous Tech Pod (Dedicated Squad)</option>
                <option value="JNAB Academy: Design Track" className="bg-gray-900">JNAB Academy: Product Design Fellowship</option>
                <option value="JNAB Academy: Engineering Track" className="bg-gray-900">JNAB Academy: Full-Stack Software Bootcamp</option>
                <option value="Corporate Capability Sprints" className="bg-gray-900">Corporate Enterprise Upskilling Program</option>
                <option value="Architecture & Security Audit" className="bg-gray-900">Architecture & Codebase Security Audit</option>
              </select>
            </div>

            {/* Scope / Budget / Timeline Row */}
            {activeType !== 'academy' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                    Estimated Budget Bracket
                  </label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#02AA69] cursor-pointer"
                  >
                    <option value="<$10,000" className="bg-gray-900">Less than $10,000</option>
                    <option value="$10k - $25k" className="bg-gray-900">$10,000 - $25,000</option>
                    <option value="$25k - $60k" className="bg-gray-900">$25,000 - $60,000</option>
                    <option value="$60k+" className="bg-gray-900">$60,000+ (Enterprise)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                    Target Kickoff Timeline
                  </label>
                  <select
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#02AA69] cursor-pointer"
                  >
                    <option value="Immediately (1-2 weeks)" className="bg-gray-900">Immediately (1 - 2 weeks)</option>
                    <option value="1 - 3 Months" className="bg-gray-900">1 - 3 Months</option>
                    <option value="Next Quarter" className="bg-gray-900">Next Quarter</option>
                  </select>
                </div>
              </div>
            )}

            {/* Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kwame Mensah"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#02AA69]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                  Work Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#02AA69]"
                />
              </div>
            </div>

            <div className="mb-5">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                Company / Organization (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Acme Fintech Ltd"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#02AA69]"
              />
            </div>

            <div className="mb-6">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                Briefly Describe What You Want to Build or Achieve
              </label>
              <textarea
                rows={3}
                placeholder="Give us a summary of your product goals, team needs, or questions..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#02AA69] resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#02AA69] hover:bg-[#018552] text-white py-4 rounded-full font-bold text-base flex items-center justify-center gap-2 shadow-lg shadow-[#02AA69]/30 transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Submit Request</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
