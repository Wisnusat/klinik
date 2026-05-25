'use client'

import { Button } from '@/components/ui/button'
import { Zap, ShieldCheck, Clock3 } from 'lucide-react'
import Link from 'next/link'

export default function RegistrationSection() {
  return (
    <section id="register" className="w-full py-20 md:py-32 bg-gradient-to-r from-primary/10 via-secondary/20 to-accent/10 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 right-10 w-40 h-40 rounded-full bg-primary/5 blur-2xl"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 rounded-full bg-accent/5 blur-2xl"></div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 relative z-10">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-5xl md:text-6xl font-bold text-foreground text-balance">
              Daftar Antrian Online
            </h2>
            <p className="text-lg md:text-xl text-foreground/70 text-balance max-w-3xl mx-auto">
              Buat janji temu dengan mudah dan cepat. Tidak perlu lagi menunggu lama. Sistem pendaftaran online kami cepat, aman, dan tersedia 24/7.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 my-12">
            <div className="text-center flex flex-col items-center">
              <Zap className='h-10 w-10 mb-2' />
              <h3 className="font-semibold text-foreground mb-2">Cepat &amp; Mudah</h3>
              <p className="text-foreground/60 text-sm">Selesaikan pendaftaran hanya dalam 2 menit</p>
            </div>
            <div className="text-center flex flex-col items-center">
              <ShieldCheck className='h-10 w-10 mb-2' />
              <h3 className="font-semibold text-foreground mb-2">Aman</h3>
              <p className="text-foreground/60 text-sm">Data Anda dilindungi dengan enkripsi</p>
            </div>
            <div className="text-center flex flex-col items-center">
              <Clock3 className='h-10 w-10 mb-2' />
              <h3 className="font-semibold text-foreground mb-2">Selalu Buka</h3>
              <p className="text-foreground/60 text-sm">Daftar kapan saja dari mana saja</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Link href="/appointment">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-10">
                Buat Janji
              </Button>
            </Link>
          </div>

          <p className="text-sm text-foreground/50 pt-4">
            Sudah terdaftar? <a href="/appointment" className="text-primary hover:underline font-semibold">Cek status janji temu Anda</a>
          </p>
        </div>
      </div>
    </section>
  )
}
