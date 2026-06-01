'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import {
  ChevronLeft,
  ChevronRight,
  X,
  Maximize2,
  Image as ImageIcon
} from 'lucide-react'
import { DEFAULT_GALLERY, type GalleryContent } from '@/lib/cms'

interface GallerySectionProps {
  gallery?: any
}

export default function GallerySection({ gallery }: GallerySectionProps) {
  // Merge dynamic CMS content with default prepopulated images
  const g: GalleryContent = {
    ...DEFAULT_GALLERY,
    ...gallery,
    items: gallery?.items ?? DEFAULT_GALLERY.items,
  }

  // Filter only active images to show on the landing page
  const activeItems = (g.items ?? []).filter(item => item.is_active !== false)

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (lightboxIndex === null) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxIndex(null)
      } else if (e.key === 'ArrowRight') {
        handleNext()
      } else if (e.key === 'ArrowLeft') {
        handlePrev()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    // Prevent body scrolling when lightbox is open
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [lightboxIndex, activeItems.length])

  const handlePrev = () => {
    setLightboxIndex(prev => {
      if (prev === null) return null
      return prev === 0 ? activeItems.length - 1 : prev - 1
    })
  }

  const handleNext = () => {
    setLightboxIndex(prev => {
      if (prev === null) return null
      return prev === activeItems.length - 1 ? 0 : prev + 1
    })
  }

  if (activeItems.length === 0) return null

  return (
    <section id="gallery" className="w-full py-20 md:py-32 bg-secondary/5 border-t border-b border-border/20 overflow-hidden">
      {/* Header Block */}
      <div className="container mx-auto max-w-7xl px-4 mb-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary">
            <ImageIcon size={14} />
            <span>Fasilitas & Layanan Kami</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
            Galeri Foto Klinik
          </h2>
          <p className="text-lg text-foreground/60 text-balance">
            Lihat kenyamanan fasilitas medis, ruang tunggu, poliklinik, dan lingkungan operasional Klinik Utama Harapan Bunda.
          </p>
        </div>
      </div>

      {/* Infinite Horizontal Auto-Scrolling Marquee Track */}
      <div className="relative w-full overflow-hidden py-4 select-none">
        {/* Left Fading Light overlay */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 md:w-48 bg-gradient-to-r from-background via-background/40 to-transparent z-10 pointer-events-none" />

        {/* Right Fading Light overlay */}
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 md:w-48 bg-gradient-to-l from-background via-background/40 to-transparent z-10 pointer-events-none" />

        {/* Marquee scrolling div track */}
        <div className="animate-marquee-track flex gap-6 md:gap-8">
          {[...activeItems, ...activeItems].map((item, index) => {
            const originalIndex = index % activeItems.length
            return (
              <div
                key={`${item.id ?? index}-track-${index}`}
                onClick={() => setLightboxIndex(originalIndex)}
                style={{ aspectRatio: '4/3' }}
                className="group relative w-[260px] sm:w-[320px] md:w-[380px] shrink-0 rounded-2xl overflow-hidden cursor-pointer bg-card border border-border/40 hover:border-primary/20 hover:shadow-xl transition-all duration-500 ease-out"
              >
                {/* Image element */}
                <img
                  src={item.url}
                  alt={item.title ?? 'Fasilitas Klinik'}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Dynamic overlay gradients & icons */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="p-3.5 rounded-full bg-primary/95 text-primary-foreground shadow-lg scale-90 group-hover:scale-100 transition-transform duration-300 ease-out">
                    <Maximize2 size={20} strokeWidth={2.2} />
                  </div>
                </div>

                {/* Caption metadata */}
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 ease-out">
                  <p className="text-base md:text-lg font-bold text-foreground text-balance drop-shadow-xs">
                    {item.title}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* High-End Backdrop-Blur Lightbox */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md transition-all duration-300">
          {/* Close Area */}
          <div className="absolute inset-0 cursor-default" onClick={() => setLightboxIndex(null)} />

          {/* Top Actions bar */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
            <span className="text-sm font-semibold text-white/60 bg-white/10 px-3.5 py-1.5 rounded-full backdrop-blur-xs select-none">
              {lightboxIndex + 1} / {activeItems.length}
            </span>
            <button
              onClick={() => setLightboxIndex(null)}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors duration-200 cursor-pointer backdrop-blur-xs"
              aria-label="Tutup"
            >
              <X size={20} />
            </button>
          </div>

          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-4 p-3 rounded-full bg-white/5 hover:bg-white/15 text-white/80 hover:text-white transition-colors duration-200 cursor-pointer z-10 backdrop-blur-xs hidden sm:block"
            aria-label="Sebelumnya"
          >
            <ChevronLeft size={24} strokeWidth={2.5} />
          </button>

          {/* Image Canvas Box */}
          <div
            style={{ aspectRatio: '16/10' }}
            className="relative max-w-5xl w-full max-h-[80vh] px-4 md:px-12 flex flex-col justify-center items-center z-5"
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src={activeItems[lightboxIndex].url}
                alt={activeItems[lightboxIndex].title ?? 'Fasilitas Klinik'}
                className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl select-none animate-fadeIn"
              />
            </div>
            {/* Title display */}
            <p className="text-center text-lg md:text-xl font-bold text-white mt-6 max-w-2xl px-4 text-balance animate-fadeIn">
              {activeItems[lightboxIndex].title}
            </p>
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-4 p-3 rounded-full bg-white/5 hover:bg-white/15 text-white/80 hover:text-white transition-colors duration-200 cursor-pointer z-10 backdrop-blur-xs hidden sm:block"
            aria-label="Selanjutnya"
          >
            <ChevronRight size={24} strokeWidth={2.5} />
          </button>

          {/* Swipe indicator/controls for mobile */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-6 sm:hidden z-10">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full bg-white/10 text-white cursor-pointer active:scale-95 transition-transform"
            >
              <ChevronLeft size={20} strokeWidth={2.5} />
            </button>
            <button
              onClick={handleNext}
              className="p-3 rounded-full bg-white/10 text-white cursor-pointer active:scale-95 transition-transform"
            >
              <ChevronRight size={20} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
