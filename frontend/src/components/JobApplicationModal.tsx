import React, { useState } from 'react';
import { X, CheckCircle2, Upload, Send, AlertCircle } from 'lucide-react';
import { submitJobApplication } from '../services/api';
import { Analytics } from '../utils/analytics';

interface JobApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  roleTitle: string;
  positionId?: number | null;
}

export const JobApplicationModal: React.FC<JobApplicationModalProps> = ({
  isOpen,
  onClose,
  roleTitle,
  positionId = null
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

    // Require resume file OR resume_url OR portfolio/github
    if (!resumeFile && !resumeUrl && !portfolioUrl && !githubUrl && !linkedinUrl) {
      setError('Please provide a resume file, resume link, or link to your portfolio / GitHub / LinkedIn.');
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      if (positionId) {
        formData.append('position', String(positionId));
      }
      formData.append('role_title_applied', roleTitle);
      formData.append('full_name', fullName);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('location', location);
      formData.append('years_of_experience', experience);
      if (portfolioUrl) formData.append('portfolio_url', portfolioUrl);
      if (githubUrl) formData.append('github_url', githubUrl);
      if (linkedinUrl) formData.append('linkedin_url', linkedinUrl);
      if (resumeUrl) formData.append('resume_url', resumeUrl);
      if (resumeFile) formData.append('resume', resumeFile);
      formData.append('cover_note', coverNote);

      await submitJobApplication(formData);
      Analytics.careerApplicationSubmitted(roleTitle, email);
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Failed to submit application. Please verify all fields.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
      <div 
        className="bg-[#0D131F] text-white border border-white/10 rounded-2xl sm:rounded-3xl w-[90%] sm:w-full max-w-lg md:max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl relative my-auto box-border"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-3.5 sm:px-6 sm:py-5 border-b border-white/10 bg-[#0A0E17]/95 backdrop-blur-md">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#02AA69]"></span>
              <span className="text-xs font-semibold text-[#02AA69]">
                Career application
              </span>
            </div>
            <h3 className="text-lg sm:text-2xl font-bold tracking-tight text-white">
              {submitted ? 'Application submitted' : `Apply for ${roleTitle}`}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-6 sm:p-10 text-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#02AA69]/20 text-[#02AA69] flex items-center justify-center mx-auto mb-5">
              <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 stroke-[2.5]" />
            </div>
            <h4 className="text-xl sm:text-2xl font-bold mb-2">Thank you, {fullName}!</h4>
            <p className="text-gray-300 text-sm sm:text-base max-w-md mx-auto mb-6 leading-relaxed">
              Your application for <span className="text-[#02AA69] font-semibold">{roleTitle}</span> has been logged into our hiring pipeline. Our talent engineering team will review your portfolio and reach out.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="bg-[#02AA69] hover:bg-[#018552] text-white font-semibold py-3 px-8 rounded-full transition-all cursor-pointer text-sm shadow-lg shadow-[#02AA69]/25"
            >
              Close window
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 md:p-7 space-y-4 sm:space-y-5">
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 sm:p-4 flex items-center gap-3 text-red-300 text-xs sm:text-sm">
                <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 text-red-400" />
                <span>{error}</span>
              </div>
            )}

            {/* Candidate Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1.5">
                  Full name <span className="text-[#02AA69]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kwame Mensah"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 focus:border-[#02AA69] rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-white text-xs sm:text-sm outline-none transition-colors placeholder:text-gray-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1.5">
                  Email address <span className="text-[#02AA69]">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="kwame@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 focus:border-[#02AA69] rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-white text-xs sm:text-sm outline-none transition-colors placeholder:text-gray-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1.5">
                  Phone / WhatsApp <span className="text-[#02AA69]">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+233 24 000 0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 focus:border-[#02AA69] rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-white text-xs sm:text-sm outline-none transition-colors placeholder:text-gray-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1.5">
                  Current location
                </label>
                <input
                  type="text"
                  placeholder="e.g. Accra, Ghana"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 focus:border-[#02AA69] rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-white text-xs sm:text-sm outline-none transition-colors placeholder:text-gray-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1.5">
                  Experience level
                </label>
                <select
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full bg-[#161D2B] border border-white/10 focus:border-[#02AA69] rounded-xl px-3 py-2.5 sm:py-3 text-white text-xs sm:text-sm outline-none cursor-pointer"
                >
                  <option value="1-2 Years">1 – 2 Years</option>
                  <option value="3-5 Years">3 – 5 Years</option>
                  <option value="5-8 Years">5 – 8 Years (Senior)</option>
                  <option value="8+ Years">8+ Years (Lead / Principal)</option>
                </select>
              </div>
            </div>

            {/* Links / Portfolio */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-1">
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1.5">
                  GitHub profile
                </label>
                <input
                  type="url"
                  placeholder="https://github.com/username"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 focus:border-[#02AA69] rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-white text-xs sm:text-sm outline-none placeholder:text-gray-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1.5">
                  Portfolio or website
                </label>
                <input
                  type="url"
                  placeholder="https://yourwork.design"
                  value={portfolioUrl}
                  onChange={(e) => setPortfolioUrl(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 focus:border-[#02AA69] rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-white text-xs sm:text-sm outline-none placeholder:text-gray-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1.5">
                  LinkedIn URL
                </label>
                <input
                  type="url"
                  placeholder="https://linkedin.com/in/username"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 focus:border-[#02AA69] rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-white text-xs sm:text-sm outline-none placeholder:text-gray-500"
                />
              </div>
            </div>

            {/* Resume Upload or Link */}
            <div className="pt-1">
              <label className="block text-xs font-medium text-gray-300 mb-2">
                Resume or CV (file upload or direct link)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <label className="flex flex-col items-center justify-center p-3.5 sm:p-4 border border-dashed border-white/20 hover:border-[#02AA69] rounded-xl sm:rounded-2xl cursor-pointer bg-white/[0.02] hover:bg-white/[0.05] transition-colors">
                  <Upload className="w-5 h-5 text-[#02AA69] mb-1" />
                  <span className="text-xs font-semibold text-gray-300 text-center truncate max-w-full px-2">
                    {resumeFile ? resumeFile.name : 'Upload PDF or DOCX'}
                  </span>
                  <span className="text-[10px] text-gray-500 mt-0.5">Max file size 10MB</span>
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
                    className="w-full bg-white/5 border border-white/10 focus:border-[#02AA69] rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-white text-xs sm:text-sm outline-none placeholder:text-gray-500"
                  />
                </div>
              </div>
            </div>

            {/* Cover Note */}
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1.5">
                Why JNAB & notable systems built <span className="text-[#02AA69]">*</span>
              </label>
              <textarea
                required
                rows={3}
                placeholder="Tell us about the most challenging software system or product interface you have architected, your favorite tech stack, and why you want to build with JNAB..."
                value={coverNote}
                onChange={(e) => setCoverNote(e.target.value)}
                className="w-full bg-white/5 border border-white/10 focus:border-[#02AA69] rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-white text-xs sm:text-sm outline-none resize-none placeholder:text-gray-500 leading-relaxed"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#02AA69] hover:bg-[#018552] disabled:opacity-50 text-white font-semibold py-3 sm:py-3.5 rounded-full flex items-center justify-center gap-2 shadow-lg shadow-[#02AA69]/25 transition-all cursor-pointer text-xs sm:text-sm"
              >
                {loading ? (
                  <span>Submitting application...</span>
                ) : (
                  <>
                    <span>Submit application</span>
                    <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
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
