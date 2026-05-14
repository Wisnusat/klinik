'use client'

import { useState, useEffect } from 'react'
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

interface PoliService {
  id: string
  name: string
  code: string
}

interface AppointmentSlot {
  id: string
  start_time: string
  end_time: string
  is_active: boolean
  practitioner: {
    full_name: string
    specialization: string
  } | null
}

interface ServiceDateSelectionProps {
  onSubmit: (data: any) => void
}

export default function ServiceDateSelection({ onSubmit }: ServiceDateSelectionProps) {
  const [services, setServices] = useState<PoliService[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const [slots, setSlots] = useState<AppointmentSlot[]>([])
  const [isSlotsLoading, setIsSlotsLoading] = useState(false)

  const [selectedService, setSelectedService] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    async function fetchPoli() {
      try {
        const res = await fetch('/api/poli')
        const json = await res.json()
        if (json.success) {
          setServices(json.data)
        }
      } catch (err) {
        console.error('Failed to fetch poli services:', err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchPoli()
  }, [])

  useEffect(() => {
    if (!selectedService) {
      setSlots([])
      setSelectedTime('')
      return
    }

    async function fetchSlots() {
      setIsSlotsLoading(true)
      try {
        const res = await fetch(`/api/poli/slots/${selectedService}`)
        const json = await res.json()
        if (json.success) {
          setSlots(json.data || [])
        }
      } catch (err) {
        console.error('Failed to fetch slots:', err)
      } finally {
        setIsSlotsLoading(false)
      }
    }
    fetchSlots()
  }, [selectedService])

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
        serviceName: services.find(s => s.id === selectedService)?.name || '',
        date: selectedDate,
        time: selectedTime
      })
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Select Service & Date</h2>
        <p className="text-foreground/60">Choose your preferred service and appointment schedule</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Service *</label>
          <Select value={selectedService} onValueChange={(value) => {
            setSelectedService(value)
            if (errors.service) setErrors({ ...errors, service: '' })
          }} disabled={isLoading}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={isLoading ? "Loading services..." : "Select a service"} />
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
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Time Slot *</label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {isSlotsLoading ? (
              <p className="text-sm text-foreground/60 col-span-full">Loading available slots...</p>
            ) : !selectedService ? (
              <p className="text-sm text-foreground/60 col-span-full">Please select a service first.</p>
            ) : slots.length === 0 ? (
              <p className="text-sm text-foreground/60 col-span-full">No slots available for this service.</p>
            ) : (
              slots.map((slot) => {
                const formattedTime = `${slot.start_time?.slice(0, 5) || '??:??'} - ${slot.end_time?.slice(0, 5) || '??:??'}`
                const practitionerName = slot.practitioner?.full_name || ''

                return (
                  <button
                    key={slot.id}
                    onClick={() => {
                      setSelectedTime(formattedTime)
                      if (errors.time) setErrors({ ...errors, time: '' })
                    }}
                    className={`p-3 rounded-lg border-2 transition-all flex flex-col items-start text-left ${selectedTime === formattedTime
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border bg-background text-foreground hover:border-primary'
                      }`}
                  >
                    <span className="font-semibold text-sm truncate w-full" title={practitionerName}>{practitionerName}</span>
                    <span className="text-sm opacity-90">{formattedTime}</span>
                  </button>
                )
              })
            )}
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
        disabled={isLoading}
      >
        Continue to Payment
      </Button>
    </div>
  )
}
