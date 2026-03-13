'use client'

import Link from 'next/link'

export default function HeaderCheckin() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          {/* <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">
            ♥
          </div> */}
          <span className="text-xl font-bold text-foreground">Klinik</span>
        </Link>
      </div>
    </header>
  )
}
