import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onRequestQuote: () => void;
  currentView?: 'home' | 'contact';
  onNavigate?: (view: 'home' | 'contact', targetHash?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onRequestQuote, 
  currentView = 'home',
  onNavigate 
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About Us', href: '#about' },
    { label: 'How We Deliver', href: '#delivery-models' },
    { label: 'Capabilities', href: '#capabilities' },
    { label: 'JNAB Academy', href: '#academy', badge: 'Featured' },
    { label: 'Case Studies', href: '#case-studies' },
    { label: 'Alliances', href: '#alliances' },
    { label: 'Careers', href: '#careers' },
    { label: 'Contact Us', href: '/contact', isContact: true },
  ];

  const handleLinkClick = (e: React.MouseEvent, link: typeof navLinks[0]) => {
    if (link.isContact) {
      e.preventDefault();
      setMobileMenuOpen(false);
      if (onNavigate) {
        onNavigate('contact');
      } else {
        window.history.pushState({}, '', '/contact');
      }
      return;
    }

    if (currentView === 'contact') {
      e.preventDefault();
      setMobileMenuOpen(false);
      if (onNavigate) {
        onNavigate('home', link.href);
      }
    } else {
      setMobileMenuOpen(false);
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate('home');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-[#06090e]/95 backdrop-blur-md border-b border-white/10 py-3 shadow-xl' 
        : 'bg-gradient-to-b from-black/80 to-transparent py-4 sm:py-5'
    }`}>
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between gap-4">
          
          {/* Logo as an image file */}
          <a 
            href="/" 
            onClick={handleLogoClick}
            className="shrink-0 flex items-center cursor-pointer"
          >
            <img
              src="/logo.png"
              alt="JNAB Innovations"
              className="h-8 sm:h-9 md:h-10 w-auto object-contain transition-transform hover:scale-105 duration-200"
            />
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-7">
            {navLinks.map((link) => {
              const isContactActive = link.isContact && currentView === 'contact';
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link)}
                  className={`text-xs xl:text-sm font-semibold transition-colors relative py-1 flex items-center gap-1.5 group whitespace-nowrap cursor-pointer ${
                    isContactActive ? 'text-[#02AA69]' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {link.label}
                  {link.badge && (
                    <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-[#02AA69]/20 text-[#02AA69] border border-[#02AA69]/30">
                      {link.badge}
                    </span>
                  )}
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-[#02AA69] transition-all duration-200 ${
                    isContactActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </a>
              );
            })}
          </div>

          {/* Action CTA & Mobile Trigger */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Desktop / Tablet Request a Quote Button */}
            <button
              onClick={onRequestQuote}
              className="bg-[#02AA69] hover:bg-[#018552] text-white cursor-pointer rounded-full font-semibold text-xs sm:text-sm md:text-base flex items-center pl-4 sm:pl-5 pr-1.5 py-1.5 transition-all duration-200 group shadow-md hover:shadow-[#02AA69]/30 active:scale-95 whitespace-nowrap"
            >
              <span className="mr-2.5 sm:mr-3">Request a Quote</span>
              <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 bg-white text-[#02AA69] rounded-full flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200 shadow-sm shrink-0">
                <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
              </div>
            </button>

            {/* Mobile / Tablet Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-white p-2 hover:bg-white/10 rounded-xl transition-colors cursor-pointer border border-white/10"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0A0E17]/98 backdrop-blur-xl border-b border-white/15 px-6 py-6 shadow-2xl animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1">
              Navigation
            </span>
            {navLinks.map((link) => {
              const isContactActive = link.isContact && currentView === 'contact';
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link)}
                  className={`text-base font-semibold py-2.5 flex items-center justify-between border-b border-white/5 active:bg-white/5 rounded-lg px-2 cursor-pointer ${
                    isContactActive ? 'text-[#02AA69]' : 'text-gray-200 hover:text-[#02AA69]'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#02AA69]/20 text-[#02AA69] border border-[#02AA69]/30">
                      {link.badge}
                    </span>
                  )}
                </a>
              );
            })}
            
            <div className="pt-4 mt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onRequestQuote();
                }}
                className="w-full bg-[#02AA69] hover:bg-[#018552] text-white py-3.5 rounded-full font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#02AA69]/25 cursor-pointer"
              >
                <span>Request a Project Quote</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>

            <div className="pt-2 text-center text-xs text-gray-400">
              Accra Tech Hub · Ghana & Global Remote
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
