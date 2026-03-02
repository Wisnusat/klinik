'use client'

export default function ContactSection() {
  return (
    <section id="contact" className="w-full py-20 md:py-32 bg-background">
      <div className="container mx-auto max-w-7xl px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-16 text-center text-balance">
          Get in Touch
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <span className="text-2xl">📍</span> Visit Us
              </h3>
              <p className="text-lg text-foreground/70">
                CareWell Medical Clinic<br />
                123 Healthcare Avenue<br />
                Medical District, ST 12345<br />
                United States
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <span className="text-2xl">📞</span> Call Us
              </h3>
              <a href="tel:+1234567890" className="text-lg text-primary font-semibold hover:underline">
                +1 (234) 567-890
              </a>
              <p className="text-foreground/60">
                Available Mon-Fri: 08:00–17:00
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <span className="text-2xl">✉️</span> Email Us
              </h3>
              <a href="mailto:info@carewell.com" className="text-lg text-primary font-semibold hover:underline">
                info@carewell.com
              </a>
              <p className="text-foreground/60">
                We respond within 24 hours
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <span className="text-2xl">🌐</span> Follow Us
              </h3>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors text-primary">
                  f
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors text-primary">
                  𝕏
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors text-primary">
                  in
                </a>
              </div>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="h-96 md:h-full min-h-96 rounded-2xl overflow-hidden shadow-lg border border-border/40">
            <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
              <div className="text-center">
                <div className="text-7xl mb-4">🗺️</div>
                <p className="text-foreground/50 text-lg">Google Maps Integration</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
