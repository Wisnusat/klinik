'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Calendar } from 'lucide-react'

interface ServiceDateSelectionProps {
  onSubmit: (data: any) => void
}

export default function ServiceDateSelection({ onSubmit }: ServiceDateSelectionProps) {
  const services = [
    { id: 'gp', name: 'General Practitioner', quota: 8 },
    { id: 'pediatrics', name: 'Pediatrics', quota: 6 },
    { id: 'dental', name: 'Dental', quota: 5 },
    { id: 'internal', name: 'Internal Medicine', quota: 7 },
    { id: 'cardiology', name: 'Cardiology', quota: 4 },
    { id: 'eye', name: 'Eye Care', quota: 5 },
    { id: 'igd', name: 'IGD (Emergency)', quota: 20 },
    { id: 'operations', name: 'Operations', quota: 3 }
  ]

  // Mock quota data for dates (remaining appointments)
  const quotaByDate: Record<string, number> = {
    '2024-02-28': 6,
    '2024-02-29': 8,
    '2024-03-01': 5,
    '2024-03-02': 7,
    '2024-03-03': 4,
    '2024-03-04': 8
  }

  const timeSlots = [
    '08:00 AM',
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    '01:00 PM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM'
  ]

  const [selectedService, setSelectedService] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const getAvailableQuota = (date: string) => {
    return quotaByDate[date] || 8
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!selectedService) newErrors.service = 'Service is required'
    if (!selectedDate) newErrors.date = 'Date is required'
    if (!selectedTime) newErrors.time = 'Time is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit({
        service: selectedService,
        date: selectedDate,
        time: selectedTime
      })
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Select Service & Date</h2>
        <p className="text-foreground/60">Choose your preferred service and appointment date</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Service *</label>
          <Select value={selectedService} onValueChange={(value) => {
            setSelectedService(value)
            if (errors.service) setErrors({ ...errors, service: '' })
          }}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent>
              {services.map((service) => (
                <SelectItem key={service.id} value={service.id}>
                  {service.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.service && <p className="text-sm text-destructive">{errors.service}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Preferred Date *</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary pointer-events-none" />
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value)
                if (errors.date) setErrors({ ...errors, date: '' })
              }}
              className="pl-10"
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
          {errors.date && <p className="text-sm text-destructive">{errors.date}</p>}
          
          {selectedDate && (
            <Card className="p-3 bg-secondary/30 border-secondary/50">
              <p className="text-sm text-foreground/70">
                <span className="font-semibold text-primary">{getAvailableQuota(selectedDate)} slots</span> available on this date
              </p>
            </Card>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Time Slot *</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {timeSlots.map((slot) => (
              <button
                key={slot}
                onClick={() => {
                  setSelectedTime(slot)
                  if (errors.time) setErrors({ ...errors, time: '' })
                }}
                className={`p-3 rounded-lg border-2 transition-all ${
                  selectedTime === slot
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-background text-foreground hover:border-primary'
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
          {errors.time && <p className="text-sm text-destructive">{errors.time}</p>}
        </div>
      </div>

      <div className="border-t border-border/40 pt-6">
        <div className="space-y-2 mb-6">
          <h3 className="font-semibold text-foreground">Appointment Summary</h3>
          <div className="bg-secondary/30 p-4 rounded-lg space-y-2">
            <div className="flex justify-between">
              <span className="text-foreground/60">Service:</span>
              <span className="font-medium text-foreground">
                {selectedService ? services.find(s => s.id === selectedService)?.name : '-'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-foreground/60">Date:</span>
              <span className="font-medium text-foreground">{selectedDate || '-'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-foreground/60">Time:</span>
              <span className="font-medium text-foreground">{selectedTime || '-'}</span>
            </div>
          </div>
        </div>
      </div>

      <Button
        onClick={handleSubmit}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
      >
        Continue to Payment
      </Button>
    </div>
  )
}
