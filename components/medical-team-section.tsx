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
      specialty: 'Spesialis Penyakit Dalam',
      schedule: 'Senin–Jumat: 10:00–16:00',
      tags: ['BPJS', 'Layanan Dewasa', 'Penyakit Kronis']
    },
    {
      id: 2,
      name: 'dr. Sinta Maharani, Sp.A',
      specialty: 'Spesialis Anak',
      schedule: 'Senin–Sabtu: 09:00–14:00',
      tags: ['BPJS', 'Anak & Remaja', 'Imunisasi']
    },
    {
      id: 3,
      name: 'drg. Bima Nugraha',
      specialty: 'Kedokteran Gigi',
      schedule: 'Selasa & Kamis: 09:00–20:00',
      tags: ['Gigi', 'Pembersihan Karang', 'Tambal Gigi']
    },
    {
      id: 4,
      name: 'dr. Nadia Kusuma, Sp.B',
      specialty: 'Spesialis Bedah',
      schedule: 'Dengan Perjanjian (Siap OK)',
      tags: ['Kamar Operasi', 'Bedah Minor', 'Darurat On-Call']
    }
  ]

  return (
    <section id="team" className="w-full py-20 md:py-32 bg-background">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Dokter & Tim Medis
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto text-balance">
            Tim dokter spesialis yang siap melayani rawat jalan, tindakan bedah, dan penanganan gawat darurat.
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
                  Lihat Jadwal
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
