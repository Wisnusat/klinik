'use client'

import { Button } from '@/components/ui/button'
import { handleNavClick } from '@/lib/helpers'
import Image from 'next/image'

export default function HeroSection() {
  return (
    <section className="relative w-full py-20 md:py-32 overflow-hidden bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-secondary/10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-accent/5 blur-3xl"></div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold text-foreground text-balance leading-tight">
                Your Trusted Healthcare Partner
              </h1>
              <p className="text-xl text-foreground/70 text-balance">
                Experience quality care delivered by our professional medical team in modern, comfortable facilities
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/#register"
                onClick={handleNavClick}
              >
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  Register Online
                </Button>
              </a>
              <a
                href="/#services"
                onClick={handleNavClick}
              >
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-secondary">
                  View Services
                </Button>
              </a>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border/20">
              <div>
                <div className="text-3xl font-bold text-primary">15+</div>
                <p className="text-sm text-foreground/60">Years Experience</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">50+</div>
                <p className="text-sm text-foreground/60">Medical Staff</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">10K+</div>
                <p className="text-sm text-foreground/60">Happy Patients</p>
              </div>
            </div>
          </div>

          {/* Hero image */}
          <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-lg md:flex hidden">
            <Image
              src="/hero-clinic.jpg"
              alt="Modern medical clinic reception area with professional healthcare team"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
