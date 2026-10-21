import { useState } from 'react';
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

export function App() {
  // Client Inquiry Modal State (Product Build, Hire Talent, Academy)
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<'project' | 'talent' | 'academy'>('project');
  const [modalService, setModalService] = useState('Full-Cycle Product Build');

  // Candidate Career Application Modal State (Distinct from client quotes)
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [selectedRoleTitle, setSelectedRoleTitle] = useState('Senior Full-Stack Engineer');
  const [selectedRoleId, setSelectedRoleId] = useState<number | null>(null);

  const handleOpenQuoteModal = (tab: 'project' | 'talent' | 'academy' = 'project', serviceName?: string) => {
    setModalTab(tab);
    if (serviceName) setModalService(serviceName);
    setIsQuoteModalOpen(true);
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
  };

  const scrollToAcademy = () => {
    const el = document.getElementById('academy');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans antialiased selection:bg-[#02AA69] selection:text-white">
      {/* Navigation */}
      <Navbar onRequestQuote={() => handleOpenQuoteModal('project', 'General Project Consultation')} />

      {/* Main Content Sections */}
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
        <CtaBanner onRequestQuote={() => handleOpenQuoteModal('project', 'Project Consultation')} />
      </main>

      {/* Footer */}
      <Footer />

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
