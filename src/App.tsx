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

export function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalService, setModalService] = useState('Full-Cycle Product Build');

  const handleOpenModal = (serviceName?: string) => {
    if (serviceName) {
      setModalService(serviceName);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
      <Navbar onRequestQuote={() => handleOpenModal('General Inquiry')} />

      {/* Main Content Sections */}
      <main>
        {/* Hero Section */}
        <Hero 
          onRequestQuote={() => handleOpenModal('Full-Cycle Product Build')}
          onExploreTraining={scrollToAcademy}
        />

        {/* About JNAB */}
        <WhoWeAre />

        {/* How We Deliver */}
        <HowWeDoIt onRequestQuote={() => handleOpenModal('Embedded Senior Talent')} />

        {/* Trusted By Brands (Executive Deep Navy) */}
        <TrustedBrands />

        {/* Core Services (Interactive Grid with Inversion on Hover) */}
        <CoreServices onSelectService={(service) => handleOpenModal(service)} />

        {/* JNAB Academy & Skills Training (Product Design & Engineering Tracks) */}
        <AcademySection onApplyOrInquire={(track) => handleOpenModal(`Academy: ${track}`)} />

        {/* Notable Projects (Case Studies & Interactive Carousel) */}
        <NotableProjects />

        {/* Partnerships (2x2 Grid) */}
        <Partnerships />

        {/* Join Us / Careers */}
        <JoinUsCareers onApply={(role) => handleOpenModal(`Career Application: ${role}`)} />

        {/* Split CTA Banner */}
        <CtaBanner onRequestQuote={() => handleOpenModal('Project Consultation')} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Quote / Inquiry Interactive Modal */}
      <QuoteEstimatorModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        initialService={modalService}
      />
    </div>
  );
}

export default App;
