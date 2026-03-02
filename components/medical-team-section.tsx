'use client'

import { Card } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CalendarClock, Stethoscope } from 'lucide-react'

export default function MedicalTeamSection() {
  const doctors = [
    {
      id: 1,
      name: 'dr. Andi Pratama, Sp.PD',
      specialty: 'Internal Medicine',
      schedule: 'Mon–Fri: 10:00–16:00',
      tags: ['BPJS', 'Adult Care', 'Chronic Care']
    },
    {
      id: 2,
      name: 'dr. Sinta Maharani, Sp.A',
      specialty: 'Pediatrics',
      schedule: 'Mon–Sat: 09:00–14:00',
      tags: ['BPJS', 'Kids & Teen', 'Immunization']
    },
    {
      id: 3,
      name: 'drg. Bima Nugraha',
      specialty: 'Dental',
      schedule: 'Tue & Thu: 09:00–20:00',
      tags: ['Dental', 'Scaling', 'Restoration']
    },
    {
      id: 4,
      name: 'dr. Nadia Kusuma, Sp.B',
      specialty: 'General Surgery',
      schedule: 'By appointment (OR ready)',
      tags: ['Operating Room', 'Minor Surgery', 'Emergency On-call']
    }
  ]

  return (
    <section id="team" className="w-full py-20 md:py-32 bg-background">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Doctors & Medical Team
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto text-balance">
            A professional team ready to support emergency care, operating room procedures, and daily outpatient services.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {doctors.map((doctor) => (
            <Card
              key={doctor.id}
              className="p-6 border border-border/40 hover:shadow-lg hover:border-primary/20 transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                <Avatar className="size-12">
                  <AvatarFallback className="font-semibold text-foreground/80">
                    {doctor.name
                      .split(' ')
                      .slice(0, 2)
                      .map((p) => p[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>

                <div className="min-w-0">
                  <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors truncate">
                    {doctor.name}
                  </h3>
                  <div className="mt-1 inline-flex items-center gap-2 text-sm text-foreground/60">
                    <Stethoscope className="text-primary" size={16} strokeWidth={1.7} />
                    <span className="truncate">{doctor.specialty}</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 inline-flex items-center gap-2 text-sm text-foreground/70">
                <CalendarClock className="text-primary" size={16} strokeWidth={1.7} />
                <span className="truncate">{doctor.schedule}</span>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {doctor.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="mt-6">
                <Button
                  variant="outline"
                  className="w-full border-primary/30 text-primary hover:bg-secondary"
                >
                  View Schedule
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
