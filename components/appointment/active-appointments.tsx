'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, User, MapPin, Copy, Check, ListOrdered, Ticket } from 'lucide-react'
import { useState, useEffect } from 'react'
import { getStatusLabel } from '@/lib/helpers'

interface Appointment {
  id: string
  booking_code: string
  appointment_date: string
  appointment_time: string
  status: string
  poli_service: { id: string, name: string, code: string } | null
  queue_status: string
  queue_number?: string
}

function CurrentQueueDisplay({ poliCode }: { poliCode: string }) {
  const [currentQueue, setCurrentQueue] = useState<string | null>(null)

  const fetchCurrentQueue = async () => {
    try {
      const res = await fetch(`/api/queue/?service=${poliCode}`)
      const json = await res.json()
      if (json.success) {
        setCurrentQueue(json.data.current)
      }
    } catch (err) {
      console.error('Failed to fetch current queue:', err)
    }
  }

  useEffect(() => {
    fetchCurrentQueue()
    const interval = setInterval(fetchCurrentQueue, 10000)
    return () => clearInterval(interval)
  }, [poliCode])

  return (
    <>
      <p className="text-foreground font-semibold">
        {currentQueue ? (
          <span className="text-primary font-mono text-xl">{currentQueue}</span>
        ) : (
          <span className="text-primary">-</span>
        )}
      </p>
      <p className="text-xs text-foreground/50 mt-1">
        {currentQueue ? 'Sedang dilayani' : 'Mohon menunggu giliran'}
      </p>
    </>
  )
}

export default function ActiveAppointments() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchAppointments = async () => {
    try {
      const res = await fetch('/api/appointment')
      const json = await res.json()
      if (json.success && json.data.length > 0) {
        // Filter active statuses
        const activeStatuses = ['pending', 'booked', 'arrived', 'checked_in']
        setAppointments(json.data.filter((a: Appointment) => activeStatuses.includes(a.status) && a.queue_status !== 'active'))
      }
    } catch (err) {
      console.error('Failed to fetch appointments:', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchAppointments()
  }, [])

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString + 'T00:00:00')
    return date.toLocaleDateString('id-ID', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })
  }

  if (isLoading) {
    return (
      <Card className="p-12 text-center border border-border/40">
        <p className="text-foreground/60">Memuat janji temu...</p>
      </Card>
    )
  }

  if (appointments.length === 0) {
    return (
      <Card className="p-12 text-center border border-border/40">
        <h3 className="text-lg font-semibold text-foreground mb-2">Tidak Ada Janji Temu Aktif</h3>
        <p className="text-foreground/60 mb-6">Anda belum memiliki daftar janji temu aktif untuk saat ini.</p>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {appointments.map((appointment) => {
        const isCheckedIn = appointment.status === 'arrived' || appointment.status === 'checked_in'
        const queueNumber = appointment.queue_number

        return (
          <Card key={appointment.id} className="p-6 border border-border/40 hover:shadow-lg transition-all">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-6">
              <div className="space-y-4 flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-1">
                      {appointment.poli_service?.name || 'Layanan Umum'}
                    </h3>
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                      {getStatusLabel(appointment.queue_status)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar size={18} className="text-primary flex-shrink-0" />
                    <span className="text-foreground/70">{formatDate(appointment.appointment_date)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={18} className="text-primary flex-shrink-0" />
                    <span className="text-foreground/70">
                      {appointment.appointment_time.substring(0, 5)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User size={18} className="text-primary flex-shrink-0" />
                    <span className="text-foreground/70">Belum Ditentukan</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-border/40 bg-secondary/5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 text-primary">
                        <ListOrdered size={18} strokeWidth={1.8} />
                      </div>
                      <div>
                        <p className="text-xs text-foreground/50 uppercase tracking-wider">Antrian Saat Ini</p>
                        {isCheckedIn && appointment.poli_service?.code ? (
                          <CurrentQueueDisplay poliCode={appointment.poli_service.code} />
                        ) : (
                          <>
                            <p className="text-foreground font-semibold">
                              <span className="text-primary">-</span>
                            </p>
                            <p className="text-xs text-foreground/50 mt-1">Kunjungi klinik untuk mendapatkan nomor antrian</p>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 text-primary">
                        <Ticket size={18} strokeWidth={1.8} />
                      </div>
                      <div>
                        <p className="text-xs text-foreground/50 uppercase tracking-wider">Nomor Antrian Anda</p>
                        {queueNumber ? (
                          <p className="text-foreground font-semibold">
                            <span className="text-primary font-mono text-xl">{queueNumber}</span>
                          </p>
                        ) : (
                          <p className="text-foreground/70 text-sm">
                            Nomor antrian akan diberikan setelah Anda melakukan check-in.
                          </p>
                        )}
                        <p className="text-xs text-foreground/50 mt-1">
                          {isCheckedIn ? 'Status Check-in: Sudah' : 'Status Check-in: Belum'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {!isCheckedIn && (
                <div className="border-l border-border/40 pl-6 md:w-48">
                  <p className="text-xs text-foreground/50 uppercase tracking-wider mb-2">Kode Booking</p>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-primary font-mono">{appointment.booking_code}</span>
                    <button
                      onClick={() => copyToClipboard(appointment.booking_code)}
                      className="p-2 hover:bg-secondary rounded-lg transition-colors"
                    >
                      {copiedCode === appointment.booking_code ? (
                        <Check size={18} className="text-primary" />
                      ) : (
                        <Copy size={18} className="text-foreground/50 hover:text-primary" />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-foreground/50 mt-2">Tunjukkan kode ini saat melakukan check-in</p>
                </div>
              )}
            </div>

            {!isCheckedIn && appointment.status !== 'cancelled' && (
              <div className="flex gap-3">
                <Button variant="outline" className="border-destructive text-destructive hover:bg-destructive/10 cursor-pointer flex-1">
                  Batalkan
                </Button>
              </div>
            )}
          </Card>
        )
      })}
    </div>
  )
}
