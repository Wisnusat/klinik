'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { CreditCard, Building2 } from 'lucide-react'

interface PaymentMethodProps {
  onSubmit: (data: any) => void
}

export default function PaymentMethod({ onSubmit }: PaymentMethodProps) {
  const [selectedMethod, setSelectedMethod] = useState('')
  const [error, setError] = useState('')

  const paymentMethods = [
    {
      id: 'non-bpjs',
      name: 'Umum (Non-BPJS)',
      description: 'Tunai, QRIS, atau Kartu',
      icon: Building2,
      details: 'Detail pembayaran akan diberikan setelah konfirmasi'
    },
    {
      id: 'bpjs',
      name: 'BPJS Kesehatan',
      description: 'Jaminan Kesehatan Nasional',
      icon: CreditCard,
      details: 'Kami akan melakukan verifikasi nomor kartu BPJS Anda'
    }
  ]

  const handleSubmit = () => {
    if (!selectedMethod) {
      setError('Silakan pilih metode pembayaran')
      return
    }
    setError('')
    onSubmit({ paymentMethod: selectedMethod })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Pilih Metode Pembayaran</h2>
        <p className="text-foreground/60">Pilih metode penjaminan/pembayaran untuk janji temu Anda</p>
      </div>

      <div className="space-y-3">
        {paymentMethods.map((method) => {
          const Icon = method.icon
          return (
            <button
              key={method.id}
              onClick={() => {
                setSelectedMethod(method.id)
                setError('')
              }}
              className={`w-full text-left p-6 rounded-lg border-2 transition-all ${selectedMethod === method.id
                  ? 'border-primary bg-primary/5'
                  : 'border-border bg-background hover:border-primary/50'
                }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${selectedMethod === method.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground'
                    }`}>
                    <Icon size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-lg">{method.name}</h3>
                    <p className="text-sm text-foreground/60 mt-1">{method.description}</p>
                    <p className="text-xs text-foreground/50 mt-2">{method.details}</p>
                  </div>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedMethod === method.id
                    ? 'border-primary bg-primary'
                    : 'border-border'
                  }`}>
                  {selectedMethod === method.id && (
                    <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                  )}
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      {/* <Card className="p-4 bg-secondary/30 border-secondary/50">
        <p className="text-sm text-foreground/70">
          <span className="font-semibold text-foreground">Appointment Fee:</span> IDR 150,000 (or covered by BPJS)
        </p>
      </Card> */}

      <Button
        onClick={handleSubmit}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
      >
        Lanjutkan
      </Button>
    </div>
  )
}
