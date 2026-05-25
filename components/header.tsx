'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { handleNavClick } from '@/lib/helpers'
import { DEFAULT_CONTACT, type ContactContent } from '@/lib/cms'

/* eslint-disable @typescript-eslint/no-explicit-any */
interface HeaderProps {
  contact?: any
}

export default function Header({ contact }: HeaderProps) {
  const c: ContactContent = { ...DEFAULT_CONTACT, ...contact }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt={c.clinic_name} width={36} height={36} className="h-9 w-auto" />
          <span className="text-xl font-bold text-foreground hidden sm:inline">{c.clinic_name}</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="/#about"
            onClick={handleNavClick}
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            Tentang
          </a>
          <a
            href="/#services"
            onClick={handleNavClick}
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            Layanan
          </a>
          <a
            href="/#register"
            onClick={handleNavClick}
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            Daftar
          </a>
          <a
            href="/#faq"
            onClick={handleNavClick}
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            FAQ
          </a>
        </nav>
        <Link href="/appointment">
          <Button className="bg-primary hover:bg-primary/90">Buat Janji</Button>
        </Link>
      </div>
    </header>
  )
}
