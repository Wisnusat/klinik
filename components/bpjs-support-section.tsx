'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { FileCheck2, ShieldCheck, Wallet } from 'lucide-react'
import Image from 'next/image'

export default function BpjsSupportSection() {
  const points = [
    {
      icon: FileCheck2,
      title: 'BPJS Accepted',
      description: 'We support BPJS for eligible services with clear administrative guidance.'
    },
    {
      icon: Wallet,
      title: 'Transparent Payment Options',
      description: 'BPJS, self-pay, and additional services—explained upfront before treatment.'
    },
    {
      icon: ShieldCheck,
      title: 'Document & Referral Support',
      description: 'Help with required documents, referrals, and verification (dummy flow for now).'
    }
  ]

  return (
    <section id="bpjs" className="w-full py-16 md:py-24 bg-secondary/5">
      <div className="container mx-auto max-w-7xl px-4">
        <Card className="p-8 md:p-10 border border-border/40 bg-card/60">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                {/* <Badge>BPJS Support</Badge> */}
                <Image src="/logo_bpjs.webp" alt="logo_bpjs" width={140} height={140} />
                <span className="text-sm text-foreground/60">Trusted payment coverage</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
                BPJS Support for Your Visit
              </h2>
              <p className="text-foreground/60 max-w-2xl text-balance">
                For eligible services, we accept BPJS and help you understand the required documents and process. This content is placeholder—replace with your clinic’s real BPJS flow.
              </p>
            </div>

            {/* <div className="w-full lg:w-auto flex gap-3">
              <Button className="bg-primary hover:bg-primary/90">Check Requirements</Button>
              <Button variant="outline" className="border-primary/30 text-primary hover:bg-secondary">
                Contact Admin
              </Button>
            </div> */}
          </div>

          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {points.map((p, idx) => {
              const Icon = p.icon
              return (
                <div
                  key={idx}
                  className="p-6 rounded-xl border border-border/40 bg-background hover:shadow-md transition-shadow"
                >
                  <div className="mb-3 text-primary">
                    <Icon size={26} strokeWidth={1.6} />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{p.title}</h3>
                  <p className="text-sm text-foreground/60">{p.description}</p>
                </div>
              )
            })}
          </div>
        </Card>
      </div>
    </section>
  )
}
