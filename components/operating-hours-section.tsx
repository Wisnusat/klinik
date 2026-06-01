'use client'

export default function OperatingHoursSection() {
  const schedule = [
    { day: 'Senin', hours: '08:00 – 17:00' },
    { day: 'Selasa', hours: '08:00 – 17:00' },
    { day: 'Rabu', hours: '08:00 – 17:00' },
    { day: 'Kamis', hours: '08:00 – 17:00' },
    { day: 'Jumat', hours: '08:00 – 17:00' },
    { day: 'Sabtu', hours: '09:00 – 14:00' },
    { day: 'Minggu', hours: 'Hanya Gawat Darurat' }
  ]

  return (
    <section id="hours" className="w-full py-20 md:py-32 bg-background">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
              Jam Operasional
            </h2>
            <p className="text-lg text-foreground/60 mb-8 text-balance">
              Atur kunjungan Anda sesuai dengan jam operasional kami. Kami siap melayani kebutuhan medis Anda.
            </p>

            <div className="space-y-3">
              {schedule.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg border border-border/40 hover:bg-secondary/20 transition-colors"
                >
                  <span className="font-semibold text-foreground">{item.day}</span>
                  <span className="text-primary font-medium">{item.hours}</span>
                </div>
              ))}
            </div>

            {/* <div className="mt-10 p-6 rounded-xl bg-accent/10 border border-accent/20">
              <h3 className="font-bold text-foreground mb-2 flex items-center gap-2">
                <span className="text-xl">🚨</span> Kontak Darurat
              </h3>
              <p className="text-foreground/70 mb-2">
                Tersedia 24 jam untuk kebutuhan medis mendesak
              </p>
              <a href="tel:+6281234567890" className="text-primary font-semibold text-lg hover:underline">
                +62 812-3456-7890
              </a>
            </div> */}
          </div>

          {/* <div className="h-96 rounded-2xl overflow-hidden shadow-lg border border-border/40">
            <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
              <div className="text-center">
                <div className="text-7xl mb-4">⏰</div>
                <p className="text-foreground/50 text-lg">Kalender Jam Operasional</p>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  )
}
