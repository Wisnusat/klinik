'use client'

export default function ContactSection() {
  return (
    <section id="contact" className="w-full py-20 md:py-32 bg-background">
      <div className="container mx-auto max-w-7xl px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-16 text-center text-balance">
          Hubungi Kami
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <span className="text-2xl">📍</span> Alamat Kami
              </h3>
              <p className="text-lg text-foreground/70">
                Klinik Utama Harapan Bunda<br />
                Jln. Pondok Pesantren Km.2 Sungai Kambut<br />
                Kec. Pulau Punjung, Kabupaten Dharmasraya<br />
                Sumatera Barat 27614
              </p>
            </div>

            {/* <div className="space-y-2">
              <h3 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <span className="text-2xl">📞</span> Telepon
              </h3>
              <a href="tel:+6281234567890" className="text-lg text-primary font-semibold hover:underline">
                +62 812-3456-7890
              </a>
              <p className="text-foreground/60">
                Senin - Sabtu: 08:00–20:00
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <span className="text-2xl">✉️</span> Email
              </h3>
              <a href="mailto:info@harapanbunda.co.id" className="text-lg text-primary font-semibold hover:underline">
                info@harapanbunda.co.id
              </a>
              <p className="text-foreground/60">
                Kami membalas dalam 24 jam
              </p>
            </div> */}

            {/* <div className="space-y-2">
              <h3 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <span className="text-2xl">🌐</span> Media Sosial
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
            </div> */}
          </div>

          {/* Map Placeholder */}
          <div className="h-96 md:h-full min-h-96 rounded-2xl overflow-hidden shadow-lg border border-border/40">
            <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
              <div className="text-center">
                <div className="text-7xl mb-4">🗺️</div>
                <p className="text-foreground/50 text-lg">Peta Lokasi Google Maps</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
