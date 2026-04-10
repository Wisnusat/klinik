'use client'

import { Card } from '@/components/ui/card'
import { Calendar, Clock, User, CheckCircle, XCircle } from 'lucide-react'
import { useState, useEffect } from 'react'

interface Appointment {
  id: string
  booking_code: string
  appointment_date: string
  appointment_time: string
  status: string
  poli_service: { name: string } | null
  notes?: string
}

export default function AppointmentHistory() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchAppointments() {
      try {
        const res = await fetch('/api/appointment')
        const json = await res.json()
        if (json.success && json.data.length > 0) {
          // Filter history statuses
          const historyStatuses = ['completed', 'cancelled', 'no_show']
          setAppointments(json.data.filter((a: Appointment) => historyStatuses.includes(a.status)))
        }
      } catch (err) {
        console.error('Failed to fetch appointments:', err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchAppointments()
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString + 'T00:00:00')
    return date.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })
  }

  const getStatusIcon = (status: string) => {
    return status === 'completed' ? (
      <CheckCircle size={20} className="text-primary" />
    ) : (
      <XCircle size={20} className="text-destructive" />
    )
  }

  const getStatusStyles = (status: string) => {
    if (status === 'completed') {
      return 'bg-primary/10 text-primary'
    }
    return 'bg-destructive/10 text-destructive'
  }

  if (isLoading) {
    return (
      <Card className="p-12 text-center border border-border/40">
        <p className="text-foreground/60">Loading appointment history...</p>
      </Card>
    )
  }

  if (appointments.length === 0) {
    return (
      <Card className="p-12 text-center border border-border/40">
        <h3 className="text-lg font-semibold text-foreground mb-2">No Appointment History</h3>
        <p className="text-foreground/60">You haven't had any completed or cancelled appointments yet</p>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {appointments.map((appointment) => (
        <Card key={appointment.id} className="p-6 border border-border/40 hover:shadow-lg transition-all">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                {getStatusIcon(appointment.status)}
                <h3 className="text-lg font-bold text-foreground">
                  {appointment.poli_service?.name || 'General Service'}
                </h3>
              </div>
              <span className={`inline-block px-3 py-1 ${getStatusStyles(appointment.status)} text-xs font-semibold rounded-full capitalize`}>
                {appointment.status.replace('_', ' ')}
              </span>
            </div>
            <p className="text-sm text-foreground/50 font-mono">{appointment.booking_code}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-foreground/50 flex-shrink-0" />
              <span className="text-sm text-foreground/70">{formatDate(appointment.appointment_date)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-foreground/50 flex-shrink-0" />
              <span className="text-sm text-foreground/70">
                {appointment.appointment_time.substring(0, 5)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <User size={16} className="text-foreground/50 flex-shrink-0" />
              <span className="text-sm text-foreground/70">Doctor Not Defined</span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
