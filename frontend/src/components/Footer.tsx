import React from 'react';
import { Mail, MapPin, Globe } from 'lucide-react';

interface FooterProps {
  onNavigate?: (view: 'home' | 'contact', targetHash?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (e: React.MouseEvent, view: 'home' | 'contact', targetHash?: string) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(view, targetHash);
    } else if (view === 'contact') {
      window.history.pushState({}, '', '/contact');
    }
  };

  return (
    <footer className="bg-black text-white pt-20 pb-12 px-6 lg:px-16 border-t border-white/10">
      <div className="max-w-[1240px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          
          {/* Brand & Mission (Col 1-2) */}
          <div className="lg:col-span-2">
            <div className="mb-6 cursor-pointer" onClick={(e) => handleNav(e, 'home')}>
              <img
                src="/logo.png"
                alt="JNAB Innovations"
                className="h-10 sm:h-11 w-auto object-contain"
              />
            </div>

            <p className="text-gray-400 text-sm leading-relaxed max-w-sm mb-6">
              JNAB empowers visionary ventures with bespoke digital product design, resilient application engineering, and next-generation technical talent development.
            </p>

            <div className="text-base font-extrabold text-white mb-6">
              Crafted with precision. Engineered for sustainable scale.
            </div>

            <div className="space-y-2 text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#02AA69]" />
                <span>Accra Innovation Quarter, Greater Accra, Ghana</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#02AA69]" />
                <a 
                  href="/contact" 
                  onClick={(e) => handleNav(e, 'contact')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  hello@jnab.tech
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#02AA69]" />
                <span>Global Remote & African Timezone Alignment</span>
              </div>
            </div>
          </div>

          {/* Solutions Column */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-extrabold text-white mb-5">
              Solutions
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="#delivery-models" onClick={(e) => handleNav(e, 'home', '#delivery-models')} className="hover:text-[#02AA69] transition-colors">Full-Cycle Builds</a></li>
              <li><a href="#delivery-models" onClick={(e) => handleNav(e, 'home', '#delivery-models')} className="hover:text-[#02AA69] transition-colors">Embedded Talent</a></li>
              <li><a href="#delivery-models" onClick={(e) => handleNav(e, 'home', '#delivery-models')} className="hover:text-[#02AA69] transition-colors">Autonomous Pods</a></li>
              <li><a href="#capabilities" onClick={(e) => handleNav(e, 'home', '#capabilities')} className="hover:text-[#02AA69] transition-colors">UI/UX & Design Systems</a></li>
              <li><a href="#capabilities" onClick={(e) => handleNav(e, 'home', '#capabilities')} className="hover:text-[#02AA69] transition-colors">Application Engineering</a></li>
              <li><a href="#capabilities" onClick={(e) => handleNav(e, 'home', '#capabilities')} className="hover:text-[#02AA69] transition-colors">Data Intelligence</a></li>
            </ul>
          </div>

          {/* Academy & Talent Column */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-extrabold text-white mb-5">
              Academy & Talent
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="#academy" onClick={(e) => handleNav(e, 'home', '#academy')} className="hover:text-[#02AA69] transition-colors">Product Design Track</a></li>
              <li><a href="#academy" onClick={(e) => handleNav(e, 'home', '#academy')} className="hover:text-[#02AA69] transition-colors">Software Engineering Track</a></li>
              <li><a href="#academy" onClick={(e) => handleNav(e, 'home', '#academy')} className="hover:text-[#02AA69] transition-colors">Corporate Team Training</a></li>
              <li><a href="#careers" onClick={(e) => handleNav(e, 'home', '#careers')} className="hover:text-[#02AA69] transition-colors">Hire JNAB Fellows</a></li>
              <li><a href="#careers" onClick={(e) => handleNav(e, 'home', '#careers')} className="hover:text-[#02AA69] transition-colors">Careers / Join Us</a></li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-extrabold text-white mb-5">
              Company
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="#about" onClick={(e) => handleNav(e, 'home', '#about')} className="hover:text-[#02AA69] transition-colors">Who We Are</a></li>
              <li><a href="#case-studies" onClick={(e) => handleNav(e, 'home', '#case-studies')} className="hover:text-[#02AA69] transition-colors">Case Studies</a></li>
              <li><a href="#alliances" onClick={(e) => handleNav(e, 'home', '#alliances')} className="hover:text-[#02AA69] transition-colors">Alliances</a></li>
              <li><a href="/contact" onClick={(e) => handleNav(e, 'contact')} className="hover:text-[#02AA69] transition-colors font-semibold text-white">Contact Us</a></li>
              <li><a href="#" className="hover:text-[#02AA69] transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#02AA69] transition-colors">Terms of Service</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Line */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© {new Date().getFullYear()} JNAB Tech Solutions (operating as JNAB Innovations). All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#02AA69]"></span>
              Systems Operational (99.98% SLA)
            </span>
            <span>Accra · Global</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
