import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WhoWeAre } from './components/WhoWeAre';
import { HowWeDoIt } from './components/HowWeDoIt';
import { TrustedBrands } from './components/TrustedBrands';
import { CoreServices } from './components/CoreServices';
import { AcademySection } from './components/AcademySection';
import { NotableProjects } from './components/NotableProjects';
import { Partnerships } from './components/Partnerships';
import { JoinUsCareers } from './components/JoinUsCareers';
import { CtaBanner } from './components/CtaBanner';
import { Footer } from './components/Footer';
import { QuoteEstimatorModal } from './components/QuoteEstimatorModal';
import { JobApplicationModal } from './components/JobApplicationModal';
import { ContactUsPage } from './components/ContactUsPage';
import { Analytics } from './utils/analytics';

export function App() {
  // View Router State ('home' | 'contact')
  const [currentView, setCurrentView] = useState<'home' | 'contact'>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path.startsWith('/contact') || hash === '#contact') {
        return 'contact';
      }
    }
    return 'home';
  });

  // Client Inquiry Modal State (Product Build, Hire Talent, Academy)
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('quote') === 'true' || window.location.hash === '#quote';
    }
    return false;
  });
  const [modalTab, setModalTab] = useState<'project' | 'talent' | 'academy'>('project');
  const [modalService, setModalService] = useState('Full-Cycle Product Build');

  // Candidate Career Application Modal State (Distinct from client quotes)
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [selectedRoleTitle, setSelectedRoleTitle] = useState('Senior Full-Stack Engineer');
  const [selectedRoleId, setSelectedRoleId] = useState<number | null>(null);

  // Sync browser back/forward buttons (popstate)
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path.startsWith('/contact') || hash === '#contact') {
        setCurrentView('contact');
      } else {
        setCurrentView('home');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (view: 'home' | 'contact', targetHash?: string) => {
    setCurrentView(view);
    if (view === 'contact') {
      window.history.pushState({}, '', '/contact');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const url = targetHash || '/';
      window.history.pushState({}, '', url);
      if (targetHash) {
        setTimeout(() => {
          const el = document.querySelector(targetHash);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 50);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleOpenQuoteModal = (tab: 'project' | 'talent' | 'academy' = 'project', serviceName?: string) => {
    setModalTab(tab);
    if (serviceName) setModalService(serviceName);
    setIsQuoteModalOpen(true);
    Analytics.quoteModalOpened(serviceName ? `service_${serviceName}` : 'direct_cta', tab);
  };

  const handleSelectService = (serviceName: string) => {
    const s = serviceName.toLowerCase();
    if (s.includes('academy') || s.includes('training') || s.includes('bootcamp')) {
      handleOpenQuoteModal('academy', serviceName);
    } else if (s.includes('talent') || s.includes('pod') || s.includes('advisory')) {
      handleOpenQuoteModal('talent', serviceName);
    } else {
      handleOpenQuoteModal('project', serviceName);
    }
  };

  const handleOpenJobModal = (roleTitle: string, roleId?: number) => {
    setSelectedRoleTitle(roleTitle);
    setSelectedRoleId(roleId || null);
    setIsJobModalOpen(true);
    Analytics.careerModalOpened(roleTitle);
  };

  const scrollToAcademy = () => {
    if (currentView === 'contact') {
      handleNavigate('home', '#academy');
    } else {
      const el = document.getElementById('academy');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans antialiased selection:bg-[#02AA69] selection:text-white">
      {/* Navigation */}
      <Navbar 
        currentView={currentView}
        onNavigate={handleNavigate}
        onRequestQuote={() => handleOpenQuoteModal('project', 'General Project Consultation')} 
      />

      {/* Main View Router */}
      {currentView === 'contact' ? (
        <ContactUsPage 
          onBackToHome={() => handleNavigate('home')}
          onRequestQuote={() => handleOpenQuoteModal('project', 'Direct Consultation')}
        />
      ) : (
        <main>
          {/* Hero Section */}
          <Hero 
            onRequestQuote={() => handleOpenQuoteModal('project', 'Full-Cycle Product Build')}
            onExploreTraining={scrollToAcademy}
          />

          {/* About JNAB */}
          <WhoWeAre />

          {/* How We Deliver */}
          <HowWeDoIt onSelectModel={(tab, model) => handleOpenQuoteModal(tab, model)} />

          {/* Client Credentials & Partner Brands */}
          <TrustedBrands />

          {/* Core Services (Interactive Grid with Inversion on Hover) */}
          <CoreServices onSelectService={handleSelectService} />

          {/* JNAB Academy & Skills Training */}
          <AcademySection onApplyOrInquire={(track) => handleOpenQuoteModal('academy', track)} />

          {/* Notable Projects */}
          <NotableProjects />

          {/* Strategic Alliances */}
          <Partnerships />

          {/* Join Us / Careers (Populated dynamically from backend, dedicated application modal) */}
          <JoinUsCareers onApply={(roleTitle, roleId) => handleOpenJobModal(roleTitle, roleId)} />

          {/* Split CTA Banner */}
          <CtaBanner 
            onRequestQuote={() => handleOpenQuoteModal('project', 'Project Consultation')} 
            onContactUs={() => handleNavigate('contact')}
          />
        </main>
      )}

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* 1. Client & Academy Inquiry Modal (Product Builds, Dedicated Pods, Academy) */}
      <QuoteEstimatorModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        initialTab={modalTab}
        initialService={modalService}
      />

      {/* 2. Dedicated Job Application Modal (Resumes, Portfolios, Experience) */}
      <JobApplicationModal
        isOpen={isJobModalOpen}
        onClose={() => setIsJobModalOpen(false)}
        roleTitle={selectedRoleTitle}
        positionId={selectedRoleId}
      />
    </div>
  );
}

export default App;
