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
          setError(patientJson.error || 'Failed to register patient profile')
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
        setError(json.error || 'Failed to create appointment')
      }
    } catch (err) {
      console.error('Failed to submit appointment:', err)
      setError('An error occurred while communicating with the server')
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString + 'T00:00:00')
    return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Confirm Your Appointment</h2>
        <p className="text-foreground/60">Please review your appointment details before confirming</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Patient Information */}
        <Card className="p-6 border border-border/40">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-primary"></span>
            Patient Information
          </h3>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-foreground/50 uppercase tracking-wider">Name</p>
              <p className="text-foreground font-medium">{formData.name}</p>
            </div>
            <div>
              <p className="text-xs text-foreground/50 uppercase tracking-wider">NIK</p>
              <p className="text-foreground font-medium">{formData.nik}</p>
            </div>
            {/* <div>
              <p className="text-xs text-foreground/50 uppercase tracking-wider">Phone</p>
              <p className="text-foreground font-medium">{formData.phone}</p>
            </div> */}
          </div>
        </Card>

        {/* Appointment Details */}
        <Card className="p-6 border border-border/40">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-primary"></span>
            Appointment Details
          </h3>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-foreground/50 uppercase tracking-wider">Service</p>
              <p className="text-foreground font-medium">{formData.serviceName}</p>
            </div>
            <div>
              <p className="text-xs text-foreground/50 uppercase tracking-wider">Date</p>
              <p className="text-foreground font-medium">{formatDate(formData.date)}</p>
            </div>
            <div>
              <p className="text-xs text-foreground/50 uppercase tracking-wider">Time</p>
              <p className="text-foreground font-medium">{formData.time}</p>
            </div>
          </div>
        </Card>

        {/* Payment Method */}
        <Card className="p-6 border border-border/40">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-primary"></span>
            Payment Method
          </h3>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-foreground/50 uppercase tracking-wider">Method</p>
              <p className="text-foreground font-medium capitalize">
                {formData.paymentMethod === 'bpjs' ? 'BPJS Health' : 'Mandiri'}
              </p>
            </div>
            {formData.paymentMethod === 'bpjs' && (
              <div>
                <p className="text-xs text-foreground/50 uppercase tracking-wider">BPJS Number</p>
                <p className="text-foreground font-medium">{formData.bpjsNumber}</p>
              </div>
            )}
          </div>
        </Card>

        {/* Important Notes */}
        <Card className="p-6 border border-border/40 bg-secondary/20">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-primary"></span>
            Important Notes
          </h3>
          <ul className="space-y-2 text-sm text-foreground/70">
            <li>• Please arrive 10 minutes before your appointment</li>
            <li>• Bring valid ID and health insurance card</li>
            <li>• For cancellations, notify us at least 24 hours ahead</li>
            <li>• You will receive a confirmation via email and SMS</li>
          </ul>
        </Card>
      </div>

      <Card className="p-4 border border-primary/30 bg-primary/5">
        <p className="text-sm text-foreground/70">
          By clicking confirm, you agree to our appointment terms and conditions. Your information will be kept confidential.
        </p>
      </Card>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="flex flex-col gap-3">
        <Button
          onClick={handleConfirm}
          disabled={isSubmitting}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-base py-4"
        >
          {isSubmitting ? 'Confirming...' : 'Confirm Appointment'}
        </Button>
      </div>
    </div>
  )
}
