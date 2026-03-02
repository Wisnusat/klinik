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
      id: 'mandiri',
      name: 'Mandiri',
      description: 'Cash or Debit Payment',
      icon: Building2,
      details: 'Account number will be provided after confirmation'
    },
    {
      id: 'bpjs',
      name: 'BPJS Health',
      description: 'Indonesian Health Insurance',
      icon: CreditCard,
      details: 'We will verify your BPJS number'
    }
  ]

  const handleSubmit = () => {
    if (!selectedMethod) {
      setError('Please select a payment method')
      return
    }
    setError('')
    onSubmit({ paymentMethod: selectedMethod })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Select Payment Method</h2>
        <p className="text-foreground/60">Choose how you'd like to pay for your appointment</p>
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
              className={`w-full text-left p-6 rounded-lg border-2 transition-all ${
                selectedMethod === method.id
                  ? 'border-primary bg-primary/5'
                  : 'border-border bg-background hover:border-primary/50'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${
                    selectedMethod === method.id
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
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedMethod === method.id
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
        Continue
      </Button>
    </div>
  )
}
