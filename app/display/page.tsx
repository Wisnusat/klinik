'use client'

import { Card } from '@/components/ui/card'
import { Clock, Users } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'

type QueueData = {
  current: string | null
  next: string | null
  service: string
  totalWaiting: number
  doctor: string
}

const QueueDisplay = () => {
  const searchParams = useSearchParams()
  const service = searchParams.get('s') || 'general'

  const [queueData, setQueueData] = useState<QueueData>({
    current: null,
    next: null,
    service: '',
    totalWaiting: 0,
    doctor: ''
  })

  const [currentTime, setCurrentTime] = useState(new Date())

  const getServiceLabel = (serviceName: string) => {
    const s = serviceName.toLowerCase()
    if (s === 'general') return 'Umum'
    if (s === 'dental') return 'Gigi'
    return serviceName
  }

  const fetchQueue = async () => {
    try {
      const res = await fetch(`/api/queue?service=${service}`)
      const json = await res.json()
      if (json.success) {
        setQueueData({
          current: json.data.current,
          next: json.data.next,
          service: json.data.service,
          totalWaiting: json.data.totalWaiting || 0,
          doctor: json.data.doctor
        })
      }
    } catch (err) {
      console.error('Failed to fetch queue data:', err)
    }
  }

  // Real-time clock
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    // Initial fetch
    fetchQueue()

    // Poll every 5 seconds
    const interval = setInterval(fetchQueue, 5000)

    return () => clearInterval(interval)
  }, [service])

  const getServiceColor = () => {
    return service === 'dental'
      ? 'text-blue-600 dark:text-blue-400'
      : 'text-emerald-600 dark:text-emerald-400'
  }

  const getServiceBgColor = () => {
    return service === 'dental'
      ? 'bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800'
      : 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800'
  }

  return (
    <main className="h-screen w-screen bg-background text-foreground flex flex-col overflow-hidden">
      {/* Header */}
      <div className="border-b border-border/40">
        <div className="container mx-auto max-w-7xl px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-4xl font-bold ${getServiceColor()}`}>Antrian {getServiceLabel(queueData.service)}</h1>
              <p className="text-lg text-foreground/60 mt-1">Klinik</p>
            </div>
            <div className="flex items-center gap-8">
              <div className="text-right">
                <p className="text-sm text-foreground/50">Menunggu</p>
                <p className="text-3xl font-bold">{queueData.totalWaiting}</p>
              </div>
              {/* <Button
                variant="ghost"
                size="lg"
                onClick={() => setIsSoundOn(!isSoundOn)}
                className="text-foreground hover:bg-secondary"
              >
                <Volume2 className={isSoundOn ? '' : 'opacity-50'} size={24} />
              </Button> */}
              <div className="text-right">
                <p className="text-sm text-foreground/50">{currentTime.toLocaleDateString('id-ID', { weekday: 'long' })}</p>
                <p className="text-2xl font-mono">{currentTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Full Screen */}
      <div className="flex-1 flex items-center justify-center p-4 lg:p-8">
        <div className="w-full max-w-4xl lg:max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">

            {/* Current Queue */}
            <Card className={`p-6 lg:p-12 ${getServiceBgColor()} border-2 lg:border-4`}>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 lg:gap-4 mb-4 lg:mb-8">
                  <Users className={getServiceColor()} size={32} />
                  <h2 className="text-lg lg:text-3xl font-semibold text-foreground">Sedang Dilayani</h2>
                </div>

                <div className="my-6 lg:my-12">
                  <span className="text-5xl lg:text-8xl font-black font-mono text-foreground">
                    {queueData.current || '---'}
                  </span>
                </div>

                <p className="text-xs lg:text-lg text-foreground/70">
                  {queueData.current ? 'Pasien dipanggil ke ruangan' : 'Belum ada pasien'}
                </p>
              </div>
            </Card>

            {/* Next Queue */}
            <Card className="p-6 lg:p-12 border-2 lg:border-4 border-border/40">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 lg:gap-4 mb-4 lg:mb-8">
                  <Clock className="text-primary" size={32} />
                  <h2 className="text-lg lg:text-3xl font-semibold text-foreground">Berikutnya</h2>
                </div>

                <div className="my-6 lg:my-12">
                  <span className="text-5xl lg:text-8xl font-black font-mono text-muted-foreground">
                    {queueData.next || '---'}
                  </span>
                </div>

                <div className="flex items-center justify-center gap-2 lg:gap-3 text-xs lg:text-lg text-foreground/70">
                  <span>Siapkan diri Anda</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Information Panel */}
          <div className="mt-6 lg:mt-12">
            <Card className="p-4 lg:p-8 bg-muted/30 border border-border/40 lg:border-2">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-8 text-center">
                <div>
                  <p className="text-xs lg:text-sm text-foreground/50 uppercase tracking-wider mb-1 lg:mb-2">Layanan</p>
                  <p className="text-sm lg:text-2xl font-semibold text-foreground">{getServiceLabel(queueData.service)}</p>
                </div>
                <div>
                  <p className="text-xs lg:text-sm text-foreground/50 uppercase tracking-wider mb-1 lg:mb-2">Dokter</p>
                  <p className="text-sm lg:text-2xl font-semibold text-foreground">{queueData.doctor}</p>
                </div>
                <div>
                  <p className="text-xs lg:text-sm text-foreground/50 uppercase tracking-wider mb-1 lg:mb-2">Estimasi</p>
                  <p className="text-sm lg:text-2xl font-semibold text-foreground">
                    {queueData.totalWaiting > 0 ? `~${queueData.totalWaiting * 5} menit` : 'Tersedia'}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Important Notice */}
          {/* <div className="mt-4 lg:mt-8">
            <Card className="p-3 lg:p-6 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 lg:border-2">
              <p className="text-xs lg:text-lg text-blue-800 dark:text-blue-200 text-center">
                <strong>Penting:</strong> Nomor antrian juga dapat dilihat di halaman appointment/booking Anda
              </p>
            </Card>
          </div> */}
        </div>
      </div>
    </main>
  )
}

export default function QueueDisplayPage() {
  return (
    <Suspense>
      <QueueDisplay />
    </Suspense>
  )
}