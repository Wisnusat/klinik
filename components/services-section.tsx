'use client'

import { Card } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import {
  Stethoscope,
  Baby,
  Pill,
  Heart,
  Eye,
  Sparkles,
  Scissors,
  FlaskConical,
  Activity,
  Brain,
  Microscope,
  Syringe,
  Thermometer,
  Ear,
  Shield,
  Dna,
} from 'lucide-react'
import { DEFAULT_SERVICES, type ServicesContent, type ServiceItem } from '@/lib/cms'

/* eslint-disable @typescript-eslint/no-explicit-any */
const SERVICE_ICONS: Record<string, any> = {
  // icon key lookups (stored in cms_content item.icon)
  'Stethoscope': Stethoscope,
  'Baby': Baby,
  'Scissors': Scissors,
  'Sparkles': Sparkles,
  'Pill': Pill,
  'FlaskConical': FlaskConical,
  'Heart': Heart,
  'Eye': Eye,
  'Activity': Activity,
  'Brain': Brain,
  'Microscope': Microscope,
  'Syringe': Syringe,
  'Thermometer': Thermometer,
  'Ear': Ear,
  'Shield': Shield,
  'Dna': Dna,
  // legacy name-based fallbacks
  'Poli Obgyn': Baby,
  'Poli Bedah': Scissors,
  'Poli Gigi': Sparkles,
  'Poli Umum': Stethoscope,
  'Farmasi': Pill,
  'Laboratorium': FlaskConical,
  'Poli Mata': Eye,
  'Poli Jantung': Heart,
}

interface ServicesSectionProps {
  services?: any
}

export default function ServicesSection({ services }: ServicesSectionProps) {
  const s: ServicesContent = {
    ...DEFAULT_SERVICES,
    ...services,
    items: services?.items ?? DEFAULT_SERVICES.items,
  }

  return (
    <section id="services" className="w-full py-20 md:py-32 bg-secondary/5">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            {s.title}
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto text-balance">
            {s.subtitle}
          </p>
        </div>

        <Carousel
          opts={{ align: 'start', loop: true }}
          className="relative"
        >
          <CarouselContent>
            {s.items.map((service: ServiceItem, index: number) => {
              const IconComponent = SERVICE_ICONS[service.icon ?? service.name] ?? Stethoscope
              return (
                <CarouselItem
                  key={index}
                  className="basis-full sm:basis-1/2 lg:basis-1/4"
                >
                  <Card className="h-full p-8 border border-border/40 hover:shadow-lg hover:border-primary/20 transition-all duration-300 group cursor-pointer">
                    <div className="mb-4 text-primary group-hover:scale-110 transition-transform duration-300">
                      <IconComponent size={40} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-foreground/60 mb-4 text-sm">
                      {service.description}
                    </p>
                    <div className="pt-4 border-t border-border/20">
                      <p className="text-xs text-foreground/50 font-medium mb-2">Jam Layanan</p>
                      <p className="text-xs text-foreground/70">
                        {service.hours}
                      </p>
                    </div>
                  </Card>
                </CarouselItem>
              )
            })}
          </CarouselContent>
          <CarouselPrevious className="left-2 top-1/2 -translate-x-1/2 lg:-left-12 bg-background/90 backdrop-blur border-border/40 shadow-sm hover:bg-background" />
          <CarouselNext className="right-2 top-1/2 translate-x-1/2 lg:-right-12 bg-background/90 backdrop-blur border-border/40 shadow-sm hover:bg-background" />
        </Carousel>
      </div>
    </section>
  )
}
