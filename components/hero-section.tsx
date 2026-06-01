'use client'

import { Button } from '@/components/ui/button'
import { handleNavClick } from '@/lib/helpers'
import Image from 'next/image'
import {
  DEFAULT_HERO,
  DEFAULT_STATS,
  type HeroContent,
  type StatItem,
} from '@/lib/cms'

/* eslint-disable @typescript-eslint/no-explicit-any */
interface HeroSectionProps {
  hero?: any
  stats?: any
}

export default function HeroSection({ hero, stats }: HeroSectionProps) {
  const h: HeroContent = { ...DEFAULT_HERO, ...hero }
  const s: StatItem[] = stats?.items ?? DEFAULT_STATS

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
                {h.title}
              </h1>
              <p className="text-xl text-foreground/70 text-balance">
                {h.subtitle}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/#register"
                onClick={handleNavClick}
              >
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  {h.cta_primary_text}
                </Button>
              </a>
              <a
                href="/#services"
                onClick={handleNavClick}
              >
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-secondary">
                  {h.cta_secondary_text}
                </Button>
              </a>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border/20">
              {s.map((stat, i) => (
                <div key={i}>
                  <div className="text-3xl font-bold text-primary">{stat.value}</div>
                  <p className="text-sm text-foreground/60">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Hero image */}
          <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-lg md:flex hidden">
            <Image
              src="https://ljmjkepiemhzqztmwqph.supabase.co/storage/v1/object/public/assets/depan.jpeg"
              alt="Klinik Utama Harapan Bunda - Fasilitas Kesehatan Modern"
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
