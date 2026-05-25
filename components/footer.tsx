'use client'

import { Mail, Phone, MapPin } from 'lucide-react'
import Image from 'next/image'
import { DEFAULT_CONTACT, DEFAULT_SERVICES, type ContactContent, type ServiceItem } from '@/lib/cms'

/* eslint-disable @typescript-eslint/no-explicit-any */
interface FooterProps {
  contact?: any
  services?: any
}

export default function Footer({ contact, services }: FooterProps) {
  const c: ContactContent = { ...DEFAULT_CONTACT, ...contact }
  const serviceItems: ServiceItem[] = services?.items ?? DEFAULT_SERVICES.items
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full border-t border-border/40 bg-background">
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Image src="/logo.png" alt={c.clinic_name} width={32} height={32} className="h-8 w-auto" />
              <span className="text-lg font-bold text-foreground">{c.clinic_name}</span>
            </div>
            <p className="text-foreground/60 text-sm">
              {c.tagline}
            </p>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Layanan</h4>
            <ul className="space-y-2 text-foreground/60 text-sm">
              {serviceItems.slice(0, 5).map((svc, i) => (
                <li key={i}>
                  <a href="/#services" className="hover:text-primary transition-colors">{svc.name}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Kontak</h4>
            <ul className="space-y-3 text-foreground/60 text-sm">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-primary mt-0.5 flex-shrink-0" />
                <span>{c.address}</span>
              </li>
              {c.phone && (
                <li className="flex items-center gap-2">
                  <Phone size={16} className="text-primary flex-shrink-0" />
                  <a href={`tel:${c.phone}`} className="hover:text-primary transition-colors">{c.phone}</a>
                </li>
              )}
              {c.email && (
                <li className="flex items-center gap-2">
                  <Mail size={16} className="text-primary flex-shrink-0" />
                  <a href={`mailto:${c.email}`} className="hover:text-primary transition-colors">{c.email}</a>
                </li>
              )}
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Legalitas</h4>
            <ul className="space-y-2 text-foreground/60 text-sm">
              <li><a href="#" className="hover:text-primary transition-colors">Kebijakan Privasi</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Syarat & Ketentuan</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Aksesibilitas</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border/20 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-foreground/50 text-sm">
            © {currentYear} {c.clinic_name}. Hak cipta dilindungi.
          </p>
          <p className="text-foreground/50 text-sm mt-4 md:mt-0">
            {c.emergency_text}
          </p>
        </div>
      </div>
    </footer>
  )
}
