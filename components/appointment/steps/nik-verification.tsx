'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'

interface NikVerificationProps {
  onSubmit: (nik: string, patientData: any, isNew: boolean) => void
}

export default function NikVerification({ onSubmit }: NikVerificationProps) {
  const [nik, setNik] = useState('')
  const [error, setError] = useState('')
  const [isChecking, setIsChecking] = useState(false)

  const handleSubmit = async () => {
    if (!nik.trim()) {
      setError('NIK wajib diisi')
      return
    }
    
    if (nik.length !== 16) {
      setError('NIK harus berisi 16 digit')
      return
    }

    if (!/^\d+$/.test(nik)) {
      setError('NIK hanya boleh berisi angka')
      return
    }

    setError('')
    setIsChecking(true)

    try {
      const res = await fetch('/api/patient/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nik })
      })
      const json = await res.json()

      if (json.success) {
        onSubmit(nik, json.data.patient, json.data.isNew)
      } else {
        setError(json.error || 'Gagal memverifikasi NIK')
      }
    } catch (err) {
      setError('Terjadi kesalahan saat memverifikasi NIK')
    } finally {
      setIsChecking(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Verifikasi NIK Anda</h2>
        <p className="text-foreground/60">Masukkan NIK (Nomor Induk Kependudukan) Anda untuk melanjutkan pendaftaran</p>
      </div>

      <Card className="p-6 bg-secondary/30 border-secondary/50">
        <p className="text-sm text-foreground/70 mb-4">
          Kami akan memeriksa apakah Anda sudah terdaftar sebagai pasien. Jika belum, silakan lengkapi profil Anda pada langkah berikutnya.
        </p>
      </Card>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Nomor Induk Kependudukan (NIK) *</label>
        <Input
          type="text"
          placeholder="Masukkan 16 digit NIK Anda"
          value={nik}
          onChange={(e) => {
            setNik(e.target.value.replace(/\D/g, '').slice(0, 16))
            setError('')
          }}
          disabled={isChecking}
          maxLength={16}
          className="text-lg tracking-widest"
        />
        {error && <p className="text-sm text-destructive">{error}</p>}
        <p className="text-xs text-foreground/50">{nik.length}/16 digit</p>
      </div>

      <Button
        onClick={handleSubmit}
        disabled={isChecking}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
      >
        {isChecking ? 'Memverifikasi...' : 'Lanjutkan'}
      </Button>
    </div>
  )
}
