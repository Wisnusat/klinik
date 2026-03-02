'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { handleNavClick } from '@/lib/helpers'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          {/* <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">
            ♥
          </div> */}
          <span className="text-xl font-bold text-foreground">Klinik</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="/#about"
            onClick={handleNavClick}
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            About
          </a>
          <a
            href="/#services"
            onClick={handleNavClick}
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            Services
          </a>
          {/* <a
            href="/#bpjs"
            onClick={handleNavClick}
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            BPJS
          </a> */}
          <a
            href="/#register"
            onClick={handleNavClick}
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            Register
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
          <Button className="bg-primary hover:bg-primary/90">Book Appointment</Button>
        </Link>
      </div>
    </header>
  )
}
