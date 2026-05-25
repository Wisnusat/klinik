'use client'

import { Card } from '@/components/ui/card'
import { FileCheck2, ShieldCheck, Wallet } from 'lucide-react'
import Image from 'next/image'

export default function BpjsSupportSection() {
  const points = [
    {
      icon: FileCheck2,
      title: 'BPJS Diterima',
      description: 'Kami menerima BPJS untuk layanan yang memenuhi syarat dengan panduan administrasi yang jelas.'
    },
    {
      icon: Wallet,
      title: 'Opsi Pembayaran Transparan',
      description: 'BPJS, bayar mandiri, dan layanan tambahan — dijelaskan di awal sebelum perawatan.'
    },
    {
      icon: ShieldCheck,
      title: 'Bantuan Dokumen & Rujukan',
      description: 'Bantuan untuk dokumen yang diperlukan, surat rujukan, dan verifikasi data.'
    }
  ]

  return (
    <section id="bpjs" className="w-full py-16 md:py-24 bg-secondary/5">
      <div className="container mx-auto max-w-7xl px-4">
        <Card className="p-8 md:p-10 border border-border/40 bg-card/60">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Image src="/logo_bpjs.webp" alt="Logo BPJS Kesehatan" width={140} height={140} />
                <span className="text-sm text-foreground/60">Jaminan kesehatan terpercaya</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
                Dukungan BPJS untuk Kunjungan Anda
              </h2>
              <p className="text-foreground/60 max-w-2xl text-balance">
                Untuk layanan yang memenuhi syarat, kami menerima BPJS dan membantu Anda memahami dokumen serta proses yang diperlukan. Silakan bawa kartu BPJS, KTP, dan surat rujukan saat berkunjung.
              </p>
            </div>
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
