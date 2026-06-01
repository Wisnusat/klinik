'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface BookingConfirmationProps {
  formData: {
    name: string
    nik: string
    service: string
    serviceName: string
    date: string
    time: string
    // phone: string
    email?: string
    address?: string
    bloodType?: string
    gender?: string
    dob?: string
    paymentMethod: string
    bpjsNumber: string
    patientId: string
  }
  onSubmit: (bookingCode: string) => void
}

export default function BookingConfirmation({ formData, onSubmit }: BookingConfirmationProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleConfirm = async () => {
    setIsSubmitting(true)
    setError('')

    try {
      let finalPatientId = formData.patientId

      // If missing patient ID, this is a new patient. Register them first!
      if (!finalPatientId) {
        const patientRes = await fetch('/api/patient', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        })
        const patientJson = await patientRes.json()

        if (patientJson.success && patientJson.data?.id) {
          finalPatientId = patientJson.data.id
        } else {
          setError(patientJson.error || 'Gagal mendaftarkan profil pasien')
          setIsSubmitting(false)
          return
        }
      }

      const res = await fetch('/api/appointment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...formData, patientId: finalPatientId })
      })

      const json = await res.json()

      if (json.success) {
        onSubmit(json.data.booking_code)
      } else {
        setError(json.error || 'Gagal membuat janji temu')
      }
    } catch (err) {
      console.error('Failed to submit appointment:', err)
      setError('Terjadi kesalahan saat menghubungi server')
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString + 'T00:00:00')
    return date.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Konfirmasi Janji Temu Anda</h2>
        <p className="text-foreground/60">Silakan periksa kembali detail janji temu Anda sebelum melakukan konfirmasi</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Patient Information */}
        <Card className="p-6 border border-border/40">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-primary"></span>
            Informasi Pasien
          </h3>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-foreground/50 uppercase tracking-wider">Nama</p>
              <p className="text-foreground font-medium">{formData.name}</p>
            </div>
            <div>
              <p className="text-xs text-foreground/50 uppercase tracking-wider">NIK</p>
              <p className="text-foreground font-medium">{formData.nik}</p>
            </div>
          </div>
        </Card>

        {/* Appointment Details */}
        <Card className="p-6 border border-border/40">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-primary"></span>
            Detail Janji Temu
          </h3>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-foreground/50 uppercase tracking-wider">Layanan/Poli</p>
              <p className="text-foreground font-medium">{formData.serviceName}</p>
            </div>
            <div>
              <p className="text-xs text-foreground/50 uppercase tracking-wider">Tanggal</p>
              <p className="text-foreground font-medium">{formatDate(formData.date)}</p>
            </div>
            <div>
              <p className="text-xs text-foreground/50 uppercase tracking-wider">Waktu</p>
              <p className="text-foreground font-medium">{formData.time}</p>
            </div>
          </div>
        </Card>

        {/* Payment Method */}
        <Card className="p-6 border border-border/40">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-primary"></span>
            Metode Pembayaran
          </h3>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-foreground/50 uppercase tracking-wider">Metode</p>
              <p className="text-foreground font-medium capitalize">
                {formData.paymentMethod === 'bpjs' ? 'BPJS Kesehatan' : 'Umum (Mandiri)'}
              </p>
            </div>
            {formData.paymentMethod === 'bpjs' && (
              <div>
                <p className="text-xs text-foreground/50 uppercase tracking-wider">Nomor BPJS</p>
                <p className="text-foreground font-medium">{formData.bpjsNumber}</p>
              </div>
            )}
          </div>
        </Card>

        {/* Important Notes */}
        <Card className="p-6 border border-border/40 bg-secondary/20">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-primary"></span>
            Catatan Penting
          </h3>
          <ul className="space-y-2 text-sm text-foreground/70">
            <li>• Harap datang 10 menit sebelum waktu janji temu Anda</li>
            <li>• Bawa kartu identitas (KTP) dan kartu asuransi/BPJS yang valid</li>
          </ul>
        </Card>
      </div>

      <Card className="p-4 border border-primary/30 bg-primary/5">
        <p className="text-sm text-foreground/70">
          Dengan menekan tombol konfirmasi, Anda menyetujui syarat dan ketentuan pendaftaran di klinik kami. Data Anda akan dijaga kerahasiaannya.
        </p>
      </Card>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="flex flex-col gap-3">
        <Button
          onClick={handleConfirm}
          disabled={isSubmitting}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-base py-4"
        >
          {isSubmitting ? 'Mengonfirmasi...' : 'Konfirmasi Janji Temu'}
        </Button>
      </div>
    </div>
  )
}
