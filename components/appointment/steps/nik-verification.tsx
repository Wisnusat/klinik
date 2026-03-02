'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'

interface NikVerificationProps {
  onSubmit: (nik: string) => void
}

export default function NikVerification({ onSubmit }: NikVerificationProps) {
  const [nik, setNik] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = () => {
    if (!nik.trim()) {
      setError('NIK is required')
      return
    }
    
    if (nik.length !== 16) {
      setError('NIK must be 16 digits')
      return
    }

    if (!/^\d+$/.test(nik)) {
      setError('NIK must contain only numbers')
      return
    }

    setError('')
    onSubmit(nik)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Verify Your NIK</h2>
        <p className="text-foreground/60">Enter your NIK (National ID) to proceed with booking</p>
      </div>

      <Card className="p-6 bg-secondary/30 border-secondary/50">
        <p className="text-sm text-foreground/70 mb-4">
          We'll check if you're an existing patient. If not, you'll need to provide additional profile information.
        </p>
      </Card>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">National ID (NIK) *</label>
        <Input
          type="text"
          placeholder="Enter your 16-digit NIK"
          value={nik}
          onChange={(e) => {
            setNik(e.target.value.replace(/\D/g, '').slice(0, 16))
            setError('')
          }}
          maxLength={16}
          className="text-lg tracking-widest"
        />
        {error && <p className="text-sm text-destructive">{error}</p>}
        <p className="text-xs text-foreground/50">{nik.length}/16 digits</p>
      </div>

      <Button
        onClick={handleSubmit}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
      >
        Continue
      </Button>
    </div>
  )
}
