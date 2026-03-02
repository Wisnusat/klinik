'use client'

export default function OperatingHoursSection() {
  const schedule = [
    { day: 'Monday', hours: '08:00 – 17:00' },
    { day: 'Tuesday', hours: '08:00 – 17:00' },
    { day: 'Wednesday', hours: '08:00 – 17:00' },
    { day: 'Thursday', hours: '08:00 – 17:00' },
    { day: 'Friday', hours: '08:00 – 17:00' },
    { day: 'Saturday', hours: '09:00 – 14:00' },
    { day: 'Sunday', hours: 'Emergency Only' }
  ]

  return (
    <section id="hours" className="w-full py-20 md:py-32 bg-background">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
              Operating Hours
            </h2>
            <p className="text-lg text-foreground/60 mb-8 text-balance">
              Plan your visit with our convenient clinic hours. We're here when you need us.
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

            <div className="mt-10 p-6 rounded-xl bg-accent/10 border border-accent/20">
              <h3 className="font-bold text-foreground mb-2 flex items-center gap-2">
                <span className="text-xl">🚨</span> Emergency Contact
              </h3>
              <p className="text-foreground/70 mb-2">
                Available 24/7 for urgent medical needs
              </p>
              <a href="tel:+1234567890" className="text-primary font-semibold text-lg hover:underline">
                +1 (234) 567-890
              </a>
            </div>
          </div>

          <div className="h-96 rounded-2xl overflow-hidden shadow-lg border border-border/40">
            <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
              <div className="text-center">
                <div className="text-7xl mb-4">⏰</div>
                <p className="text-foreground/50 text-lg">Open Hours Calendar</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
