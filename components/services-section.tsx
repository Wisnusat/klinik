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
  Sparkles
  // Ambulance,
  // Scalpel
} from 'lucide-react'

export default function ServicesSection() {
  const services = [
    {
      id: 1,
      icon: Stethoscope,
      name: 'General Practitioner',
      description: 'Comprehensive primary healthcare services for all ages',
      hours: 'Mon–Fri: 08:00–17:00 | Sat: 09:00–13:00'
    },
    {
      id: 2,
      icon: Baby,
      name: 'Pediatrics',
      description: 'Specialized care for infants, children, and adolescents',
      hours: 'Mon–Fri: 08:00–17:00 | Sat: 10:00–14:00'
    },
    {
      id: 3,
      icon: Sparkles,
      name: 'Dental',
      description: 'Complete dental care including cleanings and treatments',
      hours: 'Mon–Fri: 09:00–18:00 | Tue, Thu: 09:00–20:00'
    },
    {
      id: 4,
      icon: Pill,
      name: 'Internal Medicine',
      description: 'Treatment of complex internal medical conditions',
      hours: 'Mon–Fri: 08:00–17:00'
    },
    {
      id: 5,
      icon: Heart,
      name: 'Cardiology',
      description: 'Heart and cardiovascular system specialists',
      hours: 'Mon, Wed, Fri: 10:00–16:00'
    },
    {
      id: 6,
      icon: Eye,
      name: 'Eye Care',
      description: 'Comprehensive eye examinations and treatments',
      hours: 'Tue, Thu: 10:00–17:00 | Sat: 10:00–15:00'
    },
    // {
    //   id: 7,
    //   icon: Ambulance,
    //   name: 'IGD (Emergency)',
    //   description: '24/7 emergency and critical care services',
    //   hours: 'Open 24 hours daily'
    // },
    // {
    //   id: 8,
    //   icon: Stethoscope,
    //   name: 'Operations',
    //   description: 'Advanced surgical procedures with modern facilities',
    //   hours: 'Mon–Fri: 09:00–18:00'
    // }
  ]

  return (
    <section id="services" className="w-full py-20 md:py-32 bg-secondary/5">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Medical Services
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto text-balance">
            Wide range of healthcare services provided by our experienced professionals
          </p>
        </div>

        <Carousel
          opts={{ align: 'start', loop: true }}
          className="relative"
        >
          <CarouselContent>
            {services.map((service) => {
              const IconComponent = service.icon
              return (
                <CarouselItem
                  key={service.id}
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
                      <p className="text-xs text-foreground/50 font-medium mb-2">Hours</p>
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
