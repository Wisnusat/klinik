'use client'

import Header from '@/components/header'
import HeroSection from '@/components/hero-section'
import AboutSection from '@/components/about-section'
import ServicesSection from '@/components/services-section'
import MedicalTeamSection from '@/components/medical-team-section'
import BpjsSupportSection from '@/components/bpjs-support-section'
import FaqSection from '@/components/faq-section'
import RegistrationSection from '@/components/registration-section'
import Footer from '@/components/footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      {/* <MedicalTeamSection /> */}
      <BpjsSupportSection />
      <RegistrationSection />
      <FaqSection />
      <Footer />
    </main>
  )
}
