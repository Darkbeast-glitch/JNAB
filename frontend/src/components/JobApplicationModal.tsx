import React, { useState } from 'react';
import { X, CheckCircle2, Upload, Send, Briefcase, Link, AlertCircle } from 'lucide-react';
import { submitJobApplication } from '../services/api';

interface JobApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  roleTitle?: string;
  positionId?: number | null;
}

export const JobApplicationModal: React.FC<JobApplicationModalProps> = ({
  isOpen,
  onClose,
  roleTitle = 'General Engineering Application',
  positionId = null,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [experience, setExperience] = useState('3-5 Years');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [resumeUrl, setResumeUrl] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [coverNote, setCoverNote] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      if (positionId) formData.append('position', positionId.toString());
      formData.append('role_title_applied', roleTitle);
      formData.append('full_name', fullName);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('location', location);
      formData.append('years_of_experience', experience);
      if (portfolioUrl) formData.append('portfolio_url', portfolioUrl);
      if (githubUrl) formData.append('github_url', githubUrl);
      if (linkedinUrl) formData.append('linkedin_url', linkedinUrl);
      if (resumeFile) {
        formData.append('resume', resumeFile);
      } else if (resumeUrl) {
        formData.append('resume_url', resumeUrl);
      }
      formData.append('cover_note', coverNote);

      await submitJobApplication(formData);
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Unable to submit application. Please check your network.');
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
                JNAB Engineering Guild · Career Application
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              {submitted ? 'Application Submitted' : `Apply for: ${roleTitle}`}
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
            <h4 className="text-2xl font-bold mb-3">Thank You, {fullName}!</h4>
            <p className="text-gray-300 text-base max-w-md mx-auto mb-8 leading-relaxed">
              Your application for <span className="text-[#02AA69] font-bold">{roleTitle}</span> has been logged into our hiring pipeline. Our talent engineering team will review your portfolio and reach out.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="bg-[#02AA69] hover:bg-[#018552] text-white font-bold py-3.5 px-8 rounded-full transition-all cursor-pointer"
            >
              Close Window
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4 flex items-center gap-3 text-red-300 text-sm">
                <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
                <span>{error}</span>
              </div>
            )}

            {/* Candidate Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kwame Mensah"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 focus:border-[#02AA69] rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="kwame@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 focus:border-[#02AA69] rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                  className="w-full bg-white/5 border border-white/10 focus:border-[#02AA69] rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                  Current Location
                </label>
                <input
                  type="text"
                  placeholder="e.g. Accra, Ghana"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 focus:border-[#02AA69] rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                  Experience Level
                </label>
                <select
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full bg-[#161D2B] border border-white/10 focus:border-[#02AA69] rounded-xl px-3 py-3 text-white text-sm outline-none"
                >
                  <option value="1-2 Years">1 – 2 Years</option>
                  <option value="3-5 Years">3 – 5 Years</option>
                  <option value="5-8 Years">5 – 8 Years (Senior)</option>
                  <option value="8+ Years">8+ Years (Lead / Principal)</option>
                </select>
              </div>
            </div>

            {/* Links / Portfolio */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                  GitHub Profile
                </label>
                <input
                  type="url"
                  placeholder="https://github.com/username"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 focus:border-[#02AA69] rounded-xl px-4 py-3 text-white text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                  Portfolio / Website
                </label>
                <input
                  type="url"
                  placeholder="https://yourwork.design"
                  value={portfolioUrl}
                  onChange={(e) => setPortfolioUrl(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 focus:border-[#02AA69] rounded-xl px-4 py-3 text-white text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                  LinkedIn URL
                </label>
                <input
                  type="url"
                  placeholder="https://linkedin.com/in/username"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 focus:border-[#02AA69] rounded-xl px-4 py-3 text-white text-sm outline-none"
                />
              </div>
            </div>

            {/* Resume Upload or Link */}
            <div className="pt-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                Resume / CV (File Upload or Direct Link)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="flex flex-col items-center justify-center p-4 border border-dashed border-white/20 hover:border-[#02AA69] rounded-2xl cursor-pointer bg-white/[0.02] hover:bg-white/[0.05] transition-colors">
                  <Upload className="w-6 h-6 text-[#02AA69] mb-1.5" />
                  <span className="text-xs font-semibold text-gray-300">
                    {resumeFile ? resumeFile.name : 'Upload PDF / DOCX'}
                  </span>
                  <span className="text-[10px] text-gray-500 mt-0.5">Max size 10MB</span>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setResumeFile(e.target.files[0]);
                      }
                    }}
                  />
                </label>

                <div className="flex flex-col justify-center">
                  <span className="text-xs text-gray-400 mb-1.5">Or paste link to Google Drive / Notion CV:</span>
                  <input
                    type="url"
                    placeholder="https://drive.google.com/..."
                    value={resumeUrl}
                    onChange={(e) => setResumeUrl(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 focus:border-[#02AA69] rounded-xl px-4 py-3 text-white text-sm outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Cover Note */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                Why JNAB & Notable Projects *
              </label>
              <textarea
                required
                rows={4}
                placeholder="Tell us about the most challenging software system or product interface you have architected, your favorite tech stack, and why you want to build with JNAB..."
                value={coverNote}
                onChange={(e) => setCoverNote(e.target.value)}
                className="w-full bg-white/5 border border-white/10 focus:border-[#02AA69] rounded-xl px-4 py-3 text-white text-sm outline-none resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-3">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#02AA69] hover:bg-[#018552] disabled:opacity-50 text-white font-bold py-4 rounded-full flex items-center justify-center gap-2 shadow-lg shadow-[#02AA69]/25 transition-all cursor-pointer"
              >
                {loading ? (
                  <span>Submitting Application...</span>
                ) : (
                  <>
                    <span>Submit Application</span>
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
