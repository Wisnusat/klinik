'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/header'
import HeroSection from '@/components/hero-section'
import AboutSection from '@/components/about-section'
import ServicesSection from '@/components/services-section'
import BpjsSupportSection from '@/components/bpjs-support-section'
import GallerySection from '@/components/gallery-section'
import FaqSection from '@/components/faq-section'
import RegistrationSection from '@/components/registration-section'
import Footer from '@/components/footer'
import { fetchCmsContent } from '@/lib/cms'

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Home() {
  const [cms, setCms] = useState<Record<string, any>>({})

  useEffect(() => {
    fetchCmsContent().then(setCms)
  }, [])

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header contact={cms.contact} />
      <HeroSection hero={cms.hero} stats={cms.stats} />
      <AboutSection about={cms.about} />
      <ServicesSection services={cms.services} />
      <BpjsSupportSection />
      <GallerySection gallery={cms.gallery} />
      <RegistrationSection />
      <FaqSection faq={cms.faq} />
      <Footer contact={cms.contact} services={cms.services} />
    </main>
  )
}
