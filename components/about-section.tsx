'use client'

import Image from 'next/image'
import {
  Ambulance,
  Clock,
  HeartPulse,
  Hospital,
  Activity,
  ShieldCheck
} from 'lucide-react'

export default function AboutSection() {
  const highlights = [
    {
      icon: Ambulance,
      title: '24/7 Emergency (IGD)',
      description: 'Round-the-clock triage, stabilization, and critical response with on-call teams.'
    },
    {
      icon: Activity,
      title: 'Operating Room Ready',
      description: 'Sterile OR setup for urgent and scheduled procedures with perioperative support.'
    },
    {
      icon: HeartPulse,
      title: 'Comprehensive Monitoring',
      description: 'Continuous vitals monitoring and post-treatment observation for safer recovery.'
    },
    {
      icon: ShieldCheck,
      title: 'Patient Safety First',
      description: 'Standardized protocols, infection prevention, and quality assurance workflows.'
    }
  ]

  return (
    <section id="about" className="w-full py-20 md:py-32 bg-background">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-80 sm:h-[420px] lg:h-[520px] rounded-2xl overflow-hidden shadow-lg border border-border/40">
            <Image
              src="/hero-clinic.jpg"
              alt="Type A healthcare clinic with 24/7 emergency services and operating room"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-tr from-background/70 via-background/10 to-transparent" />
            <div className="absolute left-6 bottom-6 right-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-border/40 bg-background/80 backdrop-blur px-4 py-2">
                <Hospital className="text-primary" size={18} strokeWidth={1.8} />
                <span className="text-sm font-semibold text-foreground">Type A Healthcare</span>
                <span className="text-sm text-foreground/60">•</span>
                <Clock className="text-primary" size={18} strokeWidth={1.8} />
                <span className="text-sm font-semibold text-foreground">24 Hours</span>
              </div>
            </div>
          </div>

          <div>
            <div className="space-y-4 mb-10">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
                About Our Klinik
              </h2>
              <p className="text-lg text-foreground/70 text-balance">
                We’re a Type A healthcare clinic designed for fast, safe, and complete care—supported by a 24/7 Emergency Unit (IGD) and an operating room for urgent and scheduled procedures.
              </p>
              <p className="text-foreground/60 text-balance">
                From first assessment to treatment and observation, our workflow is built around patient safety, timely decisions, and clear communication.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {highlights.map((item, index) => {
                const IconComponent = item.icon
                return (
                  <div
                    key={index}
                    className="p-6 rounded-xl border border-border/40 bg-card hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="mb-3 text-primary">
                      <IconComponent size={28} strokeWidth={1.6} />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-foreground/60">{item.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
