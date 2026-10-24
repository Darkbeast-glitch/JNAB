import React, { useState } from 'react';
import { 
  Mail, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  ArrowUpRight, 
  Send, 
  Copy, 
  Check, 
  ShieldCheck, 
  ArrowLeft,
  Building,
  User,
  Phone,
  Code2,
  Users,
  GraduationCap,
  Handshake,
  MessageSquare
} from 'lucide-react';
import { submitContactInquiry, ContactInquiryPayload } from '../services/api';
import { Analytics } from '../utils/analytics';

interface ContactUsPageProps {
  onBackToHome: () => void;
  onRequestQuote: () => void;
}

const INQUIRY_TYPES = [
  { id: 'product_build', label: 'Product Build', icon: Code2, subject: 'Product Build Quote' },
  { id: 'hire_talent', label: 'Dedicated Pod', icon: Users, subject: 'Hire Dedicated Tech Pod' },
  { id: 'academy', label: 'Academy Fellowship', icon: GraduationCap, subject: 'JNAB Academy Inquiry' },
  { id: 'alliances', label: 'Strategic Alliance', icon: Handshake, subject: 'Strategic Partnership Inquiry' },
  { id: 'general', label: 'General Inquiry', icon: MessageSquare, subject: 'General JNAB Inquiry' },
];

export const ContactUsPage: React.FC<ContactUsPageProps> = ({ onBackToHome, onRequestQuote }) => {
  const [selectedType, setSelectedType] = useState(INQUIRY_TYPES[0]);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: INQUIRY_TYPES[0].subject,
    message: '',
  });

  const handleTypeSelect = (type: typeof INQUIRY_TYPES[0]) => {
    setSelectedType(type);
    setFormData(prev => ({
      ...prev,
      subject: type.subject
    }));
  };

  const handleCopyEmail = (emailStr: string) => {
    navigator.clipboard.writeText(emailStr);
    setCopiedEmail(emailStr);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in your name, work email, and project message.');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload: ContactInquiryPayload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || undefined,
        subject: formData.company.trim() 
          ? `[${formData.company.trim()}] ${formData.subject}`
          : formData.subject,
        message: formData.company.trim() 
          ? `Company: ${formData.company.trim()}\n\n${formData.message.trim()}`
          : formData.message.trim(),
        source: 'Contact Us Dedicated Page',
      };

      await submitContactInquiry(payload);
      Analytics.contactFormSubmitted(selectedType.id);
      setIsSubmitted(true);
    } catch (err: any) {
      setErrorMessage(err.message || 'Something went wrong while sending your inquiry. Please try again or email us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070B11] text-white pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Structural Minimalist Grid (NO AI gradients or neon blurs) */}
      <div 
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
      />

      <div className="max-w-[1200px] mx-auto relative z-10">
        
        {/* Navigation Breadcrumb / Back button */}
        <div className="mb-8 sm:mb-12">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs sm:text-sm text-gray-400 hover:text-white transition-colors cursor-pointer group bg-white/[0.03] hover:bg-white/[0.08] px-3.5 py-1.5 rounded-full border border-white/10"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1 text-gray-400 group-hover:text-white" />
            <span>Return to Home</span>
          </button>
        </div>

        {/* Clean Editorial Hero (No cheesy neon green words) */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-gray-300 text-xs font-medium mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#02AA69]"></span>
            Direct Communications & Inquiry
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-[52px] font-bold tracking-tight text-white mb-4 leading-[1.15]">
            Let's build together.
          </h1>

          <p className="text-sm sm:text-base text-gray-400 leading-relaxed font-normal">
            Have a product to architect, need to embed senior African engineering talent, or want to discuss technical partnership? We are ready to help.
          </p>
        </div>

        {/* Main 2-Column Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 mb-20 items-start">
          
          {/* Left Column: Direct Info Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Primary Email Channels Card */}
            <div className="bg-[#0B0F17] border border-white/10 rounded-2xl p-5 sm:p-6 group hover:border-white/20 transition-all duration-200">
              <div className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-gray-300 group-hover:text-white group-hover:border-white/25 group-hover:bg-white/[0.08] transition-all duration-300 mb-4">
                <Mail className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-105" />
              </div>

              <h3 className="text-base font-bold text-white mb-1">Direct Inquiries</h3>
              <p className="text-xs text-gray-400 mb-4">Direct inbox monitored by our solutions architecture team.</p>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between bg-black/50 border border-white/10 rounded-xl px-3.5 py-2.5 hover:border-white/20 transition-colors">
                  <span className="text-xs sm:text-sm text-gray-200 font-mono select-all truncate">
                    jnabtechsolutions@gmail.com
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopyEmail('jnabtechsolutions@gmail.com')}
                    className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors cursor-pointer ml-2 shrink-0 font-medium"
                    title="Copy email address"
                  >
                    {copiedEmail === 'jnabtechsolutions@gmail.com' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#02AA69]" />
                        <span className="text-[#02AA69]">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between bg-black/50 border border-white/10 rounded-xl px-3.5 py-2.5 hover:border-white/20 transition-colors">
                  <span className="text-xs sm:text-sm text-gray-200 font-mono select-all truncate">
                    hello@jnab.tech
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopyEmail('hello@jnab.tech')}
                    className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors cursor-pointer ml-2 shrink-0 font-medium"
                    title="Copy email address"
                  >
                    {copiedEmail === 'hello@jnab.tech' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#02AA69]" />
                        <span className="text-[#02AA69]">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Response SLA Card (Animated Clock Icon) */}
            <div className="bg-[#0B0F17] border border-white/10 rounded-2xl p-5 sm:p-6 group hover:border-white/20 transition-all duration-200">
              <div className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-gray-300 group-hover:text-white group-hover:border-white/25 group-hover:bg-white/[0.08] transition-all duration-300 mb-4">
                <Clock className="w-5 h-5 transition-transform duration-500 ease-out group-hover:rotate-45" />
              </div>

              <h3 className="text-base font-bold text-white mb-1">24-Hour Response SLA</h3>
              <p className="text-xs text-gray-400 mb-3 leading-relaxed">
                Inquiries are dispatched directly to our technical leadership team. A solutions architect will reach out within one business day.
              </p>

              <div className="flex items-center gap-2 text-xs text-gray-400 pt-2 border-t border-white/5">
                <ShieldCheck className="w-4 h-4 text-gray-300 shrink-0" />
                <span>Mutual Non-Disclosure Agreement (NDA) supported upon request.</span>
              </div>
            </div>

            {/* Tech Hub & Delivery Alignment (Animated MapPin Icon) */}
            <div className="bg-[#0B0F17] border border-white/10 rounded-2xl p-5 sm:p-6 group hover:border-white/20 transition-all duration-200">
              <div className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-gray-300 group-hover:text-white group-hover:border-white/25 group-hover:bg-white/[0.08] transition-all duration-300 mb-4">
                <MapPin className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
              </div>

              <h3 className="text-base font-bold text-white mb-1">Global Delivery Alignment</h3>
              <p className="text-xs text-gray-400 mb-3">
                Centrally anchored in Accra, Ghana (GMT/UTC+0) with distributed talent across Africa.
              </p>
              
              <div className="space-y-1.5 text-xs text-gray-400">
                <div className="flex items-start gap-2">
                  <Building className="w-3.5 h-3.5 text-gray-400 shrink-0 mt-0.5" />
                  <span>Accra Innovation Quarter · Greater Accra, Ghana</span>
                </div>
                <div className="text-[11px] text-gray-400 pl-5">
                  Natural overlap with London (GMT/BST), European (CET), and 4+ hours daily live overlap with US Eastern (EST).
                </div>
              </div>
            </div>

            {/* Sleek Project Estimator Launcher (Architectural, NO AI gradient background!) */}
            <div className="bg-[#0B0F17] border border-white/10 rounded-2xl p-5 sm:p-6 hover:border-white/20 transition-all duration-200">
              <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                Instant Discovery
              </div>
              <h4 className="text-sm font-bold text-white mb-2">Need a rapid budget or timeline estimate?</h4>
              <p className="text-xs text-gray-400 mb-4 leading-relaxed">
                Use our interactive scoping tool to configure your project platform, engineering seniority, and pod size.
              </p>
              
              <button
                type="button"
                onClick={onRequestQuote}
                className="w-full bg-white hover:bg-gray-100 text-black font-semibold py-2.5 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-between transition-all group/btn cursor-pointer shadow-sm"
              >
                <span>Launch Interactive Estimator</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </button>
            </div>

          </div>

          {/* Right Column: Contact Inquiry Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-[#0B0F17] border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-8 shadow-xl relative">
              
              {isSubmitted ? (
                /* Success Screen */
                <div className="py-12 px-4 text-center animate-in fade-in zoom-in duration-300">
                  <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#02AA69] mx-auto mb-5 shadow-sm">
                    <CheckCircle2 className="w-8 h-8 stroke-[2.2]" />
                  </div>
                  
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                    Inquiry Received
                  </h3>
                  
                  <p className="text-gray-300 text-xs sm:text-sm max-w-md mx-auto mb-6 leading-relaxed">
                    Thank you, <strong className="text-white">{formData.name}</strong>. Your message has been routed to our technical leadership team. A solutions architect will reach out to <strong className="text-white">{formData.email}</strong> within 24 hours.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          name: '',
                          email: '',
                          phone: '',
                          company: '',
                          subject: selectedType.subject,
                          message: '',
                        });
                      }}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white font-medium text-xs transition-colors cursor-pointer border border-white/10"
                    >
                      Send another message
                    </button>
                    <button
                      type="button"
                      onClick={onBackToHome}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#02AA69] hover:bg-[#018552] text-white font-medium text-xs transition-colors cursor-pointer shadow-md"
                    >
                      Return to homepage
                    </button>
                  </div>
                </div>
              ) : (
                /* Form Screen */
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-white mb-1">Send a Message</h2>
                    <p className="text-xs text-gray-400">
                      Provide a brief overview of your inquiry and our team will get back to you promptly.
                    </p>
                  </div>

                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs flex items-start gap-2">
                      <span className="font-semibold">Notice:</span>
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Clean Intent Selector Chips (NO Emojis, Clean SVGs) */}
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-2">
                      Select inquiry type
                    </label>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {INQUIRY_TYPES.map((type) => {
                        const active = selectedType.id === type.id;
                        const Icon = type.icon;
                        return (
                          <button
                            key={type.id}
                            type="button"
                            onClick={() => handleTypeSelect(type)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer border ${
                              active
                                ? 'bg-white text-black border-white shadow-sm'
                                : 'bg-white/[0.03] text-gray-400 border-white/10 hover:border-white/20 hover:text-white'
                            }`}
                          >
                            <Icon className={`w-3.5 h-3.5 ${active ? 'text-black' : 'text-gray-400'}`} />
                            <span>{type.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Name and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1.5">
                        Full name <span className="text-[#02AA69]">*</span>
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-gray-500 absolute left-3.5 top-3" />
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Kwame Mensah"
                          className="w-full bg-black/50 border border-white/10 focus:border-white/30 focus:ring-1 focus:ring-white/20 rounded-xl pl-9 pr-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-gray-500 outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1.5">
                        Work email <span className="text-[#02AA69]">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-gray-500 absolute left-3.5 top-3" />
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="name@company.com"
                          className="w-full bg-black/50 border border-white/10 focus:border-white/30 focus:ring-1 focus:ring-white/20 rounded-xl pl-9 pr-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-gray-500 outline-none transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Phone & Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1.5">
                        Phone / WhatsApp (optional)
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-gray-500 absolute left-3.5 top-3" />
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+233 ... or +1 ..."
                          className="w-full bg-black/50 border border-white/10 focus:border-white/30 focus:ring-1 focus:ring-white/20 rounded-xl pl-9 pr-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-gray-500 outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1.5">
                        Company or project name (optional)
                      </label>
                      <div className="relative">
                        <Building className="w-4 h-4 text-gray-500 absolute left-3.5 top-3" />
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="e.g. Apex Global Ventures"
                          className="w-full bg-black/50 border border-white/10 focus:border-white/30 focus:ring-1 focus:ring-white/20 rounded-xl pl-9 pr-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-gray-500 outline-none transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1.5">
                      Subject
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-black/50 border border-white/10 focus:border-white/30 focus:ring-1 focus:ring-white/20 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-gray-500 outline-none transition-colors"
                    />
                  </div>

                  {/* Message Brief */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-medium text-gray-300">
                        Project brief or inquiry details <span className="text-[#02AA69]">*</span>
                      </label>
                      <span className="text-[11px] text-gray-500">Timeline, stack, or goals</span>
                    </div>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about the product you want to engineer, target timeline, or specific developer roles you require..."
                      className="w-full bg-black/50 border border-white/10 focus:border-white/30 focus:ring-1 focus:ring-white/20 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-gray-500 outline-none transition-colors resize-y leading-relaxed"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-1">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#02AA69] hover:bg-[#018552] disabled:opacity-50 text-white font-medium py-3 px-5 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md active:scale-[0.99]"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Routing inquiry...</span>
                        </>
                      ) : (
                        <>
                          <span>Send message</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                    <p className="text-[11px] text-center text-gray-500 mt-2.5">
                      Strictly confidential. Bilateral NDAs executed upon request.
                    </p>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>

        {/* Clean FAQ Grid */}
        <div className="border-t border-white/10 pt-12 sm:pt-14">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Common Questions</h3>
            <h2 className="text-xl sm:text-2xl font-bold text-white">What to expect when partnering with JNAB</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            <div className="bg-[#0B0F17] border border-white/10 rounded-xl p-5">
              <h4 className="text-xs sm:text-sm font-bold text-white mb-1.5">How fast can JNAB deploy an engineering pod?</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Autonomous pods and embedded senior developers can typically be matched, interviewed, and onboarded into your sprint cadence within 48 to 72 hours.
              </p>
            </div>

            <div className="bg-[#0B0F17] border border-white/10 rounded-xl p-5">
              <h4 className="text-xs sm:text-sm font-bold text-white mb-1.5">How does JNAB handle timezones for international clients?</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Operating from Accra, Ghana (GMT/UTC+0), our squads naturally align with UK (GMT/BST), European (CET), and guarantee a 4+ hour daily live overlap with US Eastern (EST) schedules.
              </p>
            </div>

            <div className="bg-[#0B0F17] border border-white/10 rounded-xl p-5">
              <h4 className="text-xs sm:text-sm font-bold text-white mb-1.5">Who owns the intellectual property (IP)?</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                You retain 100% full legal ownership of all codebases, architecture diagrams, Figma design systems, repositories, and technical assets created during our engagement.
              </p>
            </div>

            <div className="bg-[#0B0F17] border border-white/10 rounded-xl p-5">
              <h4 className="text-xs sm:text-sm font-bold text-white mb-1.5">Can we execute a Mutual NDA before our discovery call?</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Yes. We routinely execute bilateral NDAs with venture founders and enterprise leaders prior to receiving proprietary roadmaps or technical specifications.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
