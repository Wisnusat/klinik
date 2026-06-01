'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'

interface BpjsValidationProps {
  onSubmit: (bpjsNumber: string) => void
}

export default function BpjsValidation({ onSubmit }: BpjsValidationProps) {
  const [bpjsNumber, setBpjsNumber] = useState('')
  const [isValidating, setIsValidating] = useState(false)
  const [validationResult, setValidationResult] = useState<'valid' | 'invalid' | null>(null)
  const [error, setError] = useState('')

  const handleValidate = async () => {
    if (!bpjsNumber.trim()) {
      setError('Nomor kartu BPJS wajib diisi')
      return
    }

    if (bpjsNumber.length !== 16) {
      setError('Nomor kartu BPJS harus berisi 16 digit')
      return
    }

    if (!/^\d+$/.test(bpjsNumber)) {
      setError('Nomor kartu BPJS hanya boleh berisi angka')
      return
    }

    setError('')
    setIsValidating(true)

    try {
      const res = await fetch('/api/bpjs/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ bpjsNumber })
      })
      const json = await res.json()

      if (json.success && json.data.isValid) {
        setValidationResult('valid')
      } else {
        setValidationResult('invalid')
      }
    } catch (err) {
      console.error('Failed to verify BPJS:', err)
      setValidationResult('invalid')
    } finally {
      setIsValidating(false)
    }
  }

  const handleContinue = () => {
    if (validationResult === 'valid') {
      onSubmit(bpjsNumber)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Verifikasi Nomor BPJS</h2>
        <p className="text-foreground/60">Kami perlu melakukan verifikasi nomor kartu BPJS Kesehatan Anda</p>
      </div>

      <Card className="p-4 bg-secondary/30 border-secondary/50">
        <p className="text-sm text-foreground/70">
          Pastikan kartu BPJS Anda dalam status aktif dan valid. Kami akan mencocokkan nomor Anda dengan sistem BPJS.
        </p>
      </Card>

      {validationResult === null ? (
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Nomor BPJS *</label>
            <Input
              type="text"
              placeholder="Masukkan 16 digit nomor BPJS Anda"
              value={bpjsNumber}
              onChange={(e) => {
                setBpjsNumber(e.target.value.replace(/\D/g, '').slice(0, 16))
                setError('')
              }}
              maxLength={16}
              disabled={isValidating}
              className="text-lg tracking-widest"
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
            <p className="text-xs text-foreground/50">{bpjsNumber.length}/16 digit</p>
          </div>

          {isValidating && (
            <Card className="p-6 border-primary/20 bg-primary/5">
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="relative w-12 h-12">
                  <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
                  <div
                    className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin"
                    style={{
                      borderTopColor: 'var(--color-primary)',
                      animation: 'spin 1s linear infinite'
                    }}
                  ></div>
                </div>
                <p className="text-sm text-foreground/70 font-medium">Memverifikasi nomor BPJS...</p>
              </div>
            </Card>
          )}

          <Button
            onClick={handleValidate}
            disabled={isValidating || !bpjsNumber}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-50"
          >
            {isValidating ? 'Memverifikasi...' : 'Verifikasi Nomor BPJS'}
          </Button>

          <style jsx>{`
            @keyframes spin {
              from {
                transform: rotate(0deg);
              }
              to {
                transform: rotate(360deg);
              }
            }
          `}</style>
        </div>
      ) : validationResult === 'valid' ? (
        <div className="space-y-4">
          <Card className="p-6 border-primary/30 bg-primary/5">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary">
                  <svg className="h-6 w-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Nomor BPJS Berhasil Diverifikasi</h3>
                <p className="text-sm text-foreground/60 mt-1">Nomor kartu BPJS Anda valid dan berstatus aktif</p>
                <p className="text-xs text-foreground/50 mt-2">Nomor BPJS: {bpjsNumber}</p>
              </div>
            </div>
          </Card>

          <Button
            onClick={handleContinue}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Lanjutkan ke Konfirmasi
          </Button>

          <Button
            onClick={() => {
              setValidationResult(null)
              setBpjsNumber('')
            }}
            variant="outline"
            className="w-full border-primary text-primary hover:bg-secondary"
          >
            Gunakan Nomor BPJS Lain
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <Card className="p-6 border-destructive/30 bg-destructive/5">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-destructive">
                  <svg className="h-6 w-6 text-destructive-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Verifikasi BPJS Gagal</h3>
                <p className="text-sm text-foreground/60 mt-1">Nomor kartu BPJS yang Anda masukkan tidak valid atau tidak aktif</p>
                <p className="text-xs text-foreground/50 mt-2">Silakan periksa kembali nomor kartu Anda dan coba lagi</p>
              </div>
            </div>
          </Card>

          <Button
            onClick={() => {
              setValidationResult(null)
              setBpjsNumber('')
            }}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Coba Lagi
          </Button>
        </div>
      )}
    </div>
  )
}
