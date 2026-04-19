
'use client'

import { useMemo, useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Calendar, CheckCircle2, Clock, MapPin, Search, Ticket, User, XCircle, Info } from 'lucide-react'
import HeaderCheckin from '@/components/header-checkin'
import Image from 'next/image'

type AppointmentLookup = {
  id?: string
  bookingCode: string
  service: string
  date: string
  time: string
  doctor: string
  location: string
}

function formatDate(dateString: string) {
  const date = new Date(dateString + 'T00:00:00')
  return date.toLocaleDateString('id-ID', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

function generateQueueNumber(prefix: string) {
  const n = Math.floor(1 + Math.random() * 99)
  return `${prefix}-${String(n).padStart(3, '0')}`
}

export default function CheckinPage() {
  const [bookingCode, setBookingCode] = useState('')
  const [appointment, setAppointment] = useState<AppointmentLookup | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isCheckedIn, setIsCheckedIn] = useState(false)
  const [queueNumber, setQueueNumber] = useState<string | null>(null)

  useEffect(() => {
    if (isCheckedIn && queueNumber) {
      const timer = setTimeout(() => {
        setBookingCode('')
        setAppointment(null)
        setError(null)
        setIsCheckedIn(false)
        setQueueNumber(null)
      }, 10000)

      return () => clearTimeout(timer)
    }
  }, [isCheckedIn, queueNumber])

  const [isSearching, setIsSearching] = useState(false)
  const [isCheckingIn, setIsCheckingIn] = useState(false)

  const handleSearch = async () => {
    const normalized = bookingCode.trim().toUpperCase()

    setError(null)
    setAppointment(null)
    setIsCheckedIn(false)
    setQueueNumber(null)

    if (!normalized) {
      setError('Masukkan kode booking terlebih dahulu.')
      return
    }

    setIsSearching(true)
    try {
      const res = await fetch(`/api/checkin?code=${normalized}`)
      const json = await res.json()

      if (json.success) {
        setAppointment(json.data.appointment)
        if (json.data.isCheckedIn) {
          setIsCheckedIn(true)
          setQueueNumber(json.data.queueNumber)
        }
      } else {
        setError(json.error || 'Data appointment tidak ditemukan. Periksa kembali kode booking kamu.')
      }
    } catch (err) {
      setError('Terjadi kesalahan saat mencari data appointment.')
    } finally {
      setIsSearching(false)
    }
  }

  const handleCheckIn = async () => {
    if (!appointment || !appointment.id) return

    setIsCheckingIn(true)
    try {
      const res = await fetch(`/api/checkin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ appointmentId: appointment.id })
      })
      const json = await res.json()

      if (json.success) {
        setQueueNumber(json.data.queueNumber)
        setIsCheckedIn(true)
      } else {
        setError(json.error || 'Gagal melakukan check-in.')
      }
    } catch (err) {
      setError('Terjadi kesalahan saat proses check-in.')
    } finally {
      setIsCheckingIn(false)
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <HeaderCheckin />

      <div className="flex-1">
        <div className="container mx-auto max-w-3xl px-4 py-12">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Check-in</h1>
            <p className="text-foreground/60">
              Masukkan kode booking dari appointment kamu untuk melakukan check-in di klinik.
            </p>
          </div>

          {/* <div className="mb-8 flex justify-center">
            <div className="relative w-full max-w-md h-48 rounded-xl overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10 border border-border/20">
              <Image
                src="/api/placeholder/400/200"
                alt="Check-in Illustration"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div> */}

          <Card className="p-6 border border-border/40">
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-foreground mb-2">Kode Booking</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    value={bookingCode}
                    onChange={(e) => setBookingCode(e.target.value)}
                    placeholder="Contoh: BK12A5F7X"
                    className="h-11"
                  />
                  <Button
                    onClick={handleSearch}
                    disabled={isSearching}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground h-11"
                  >
                    <Search className="mr-2" size={18} />
                    {isSearching ? 'Mencari...' : 'Cari'}
                  </Button>
                </div>
              </div>

              {error && (
                <Alert variant="destructive">
                  <XCircle />
                  <AlertTitle>Gagal</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {appointment && !isCheckedIn && (
                <div className="space-y-4">
                  <Alert>
                    <CheckCircle2 className="text-primary" />
                    <AlertTitle>Appointment ditemukan</AlertTitle>
                    <AlertDescription>
                      Silakan cek detail appointment di bawah, lalu tekan tombol check-in.
                    </AlertDescription>
                  </Alert>

                  <div className="rounded-xl border border-border/40 p-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <Calendar size={18} className="text-primary shrink-0" />
                        <span className="text-foreground/70">{formatDate(appointment.date)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={18} className="text-primary shrink-0" />
                        <span className="text-foreground/70">{appointment.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User size={18} className="text-primary shrink-0" />
                        <span className="text-foreground/70">{appointment.doctor}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={18} className="text-primary shrink-0" />
                        <span className="text-foreground/70">{appointment.location}</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-border/20">
                      <p className="text-xs text-foreground/50 uppercase tracking-wider mb-1">Layanan</p>
                      <p className="text-foreground font-semibold">{appointment.service}</p>
                    </div>

                    <div className="mt-5">
                      <Button
                        onClick={handleCheckIn}
                        disabled={isCheckingIn}
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-11"
                      >
                        {isCheckingIn ? 'Memproses...' : 'Check-in Sekarang'}
                      </Button>
                      <p className="text-xs text-foreground/50 mt-3">
                        Nomor antrian akan diberikan setelah check-in.
                      </p>
                      <div className="mt-2 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                        <div className="flex items-start gap-2">
                          <Info className="text-blue-600 dark:text-blue-400 mt-0.5" size={16} />
                          <p className="text-xs text-blue-800 dark:text-blue-200">
                            <strong>Info:</strong> Nomor antrian juga dapat dilihat pada halaman appointment atau booking kamu kapan saja.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {appointment && isCheckedIn && queueNumber && (
                <div className="space-y-4">
                  <Alert>
                    <CheckCircle2 className="text-primary" />
                    <AlertTitle>Check-in berhasil</AlertTitle>
                    <AlertDescription>
                      Kamu sudah terdaftar di antrian. Silakan tunggu panggilan sesuai nomor antrian.
                    </AlertDescription>
                  </Alert>

                  <div className="rounded-2xl border border-border/40 p-6 bg-secondary/5">
                    <div className="flex items-center gap-3">
                      <div className="text-primary">
                        <Ticket size={22} strokeWidth={1.8} />
                      </div>
                      <div>
                        <p className="text-xs text-foreground/50 uppercase tracking-wider">Nomor Antrian Kamu</p>
                        <p className="text-3xl font-bold text-primary font-mono">{queueNumber}</p>
                      </div>
                    </div>

                    <div className="mt-5 grid sm:grid-cols-2 gap-4 text-sm text-foreground/70">
                      <div>
                        <p className="text-xs text-foreground/50 uppercase tracking-wider mb-1">Layanan</p>
                        <p className="font-semibold text-foreground">{appointment.service}</p>
                      </div>
                      <div>
                        <p className="text-xs text-foreground/50 uppercase tracking-wider mb-1">Lokasi</p>
                        <p className="font-semibold text-foreground">{appointment.location}</p>
                      </div>
                    </div>

                    <div className="mt-5 pt-5 border-t border-border/20">
                      <p className="text-sm text-foreground/70">
                        Halaman akan otomatis reset dalam <span className="font-semibold text-primary">10 detik</span> untuk pasien berikutnya.
                      </p>
                      <div className="mt-2 space-y-1 text-sm text-foreground/60">
                        <p>1. Datang ke meja administrasi dan tunjukkan kode booking.</p>
                        <p>2. Siapkan identitas (KTP) dan kartu BPJS (jika menggunakan BPJS).</p>
                        <p>3. Tunggu panggilan sesuai nomor antrian.</p>
                      </div>
                      <div className="mt-3 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                        <div className="flex items-start gap-2">
                          <Info className="text-green-600 dark:text-green-400 mt-0.5" size={16} />
                          <p className="text-xs text-green-800 dark:text-green-200">
                            <strong>Info:</strong> Nomor antrian {queueNumber} juga tersimpan di halaman appointment/booking kamu.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <Button
                        variant="outline"
                        className="w-full border-primary/30 text-primary hover:bg-secondary h-11"
                        onClick={() => {
                          setBookingCode('')
                          setAppointment(null)
                          setError(null)
                          setIsCheckedIn(false)
                          setQueueNumber(null)
                        }}
                      >
                        Check-in Appointment Lain
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </main>
  )
}

