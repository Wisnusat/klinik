'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, User, CheckCircle, XCircle } from 'lucide-react'

export default function AppointmentHistory() {
  // Mock appointment history data
  const appointmentHistory = [
    {
      id: 1,
      bookingCode: 'BK99X8K3L',
      service: 'General Practitioner',
      date: '2024-02-15',
      time: '09:00 AM',
      doctor: 'Dr. Sarah Johnson',
      status: 'Completed',
      notes: 'Follow-up consultation required'
    },
    {
      id: 2,
      bookingCode: 'BK45P2R6M',
      service: 'Eye Care',
      date: '2024-02-01',
      time: '03:00 PM',
      doctor: 'Dr. Emma Wilson',
      status: 'Completed',
      notes: 'Prescription updated'
    },
    {
      id: 3,
      bookingCode: 'BK12Q7S9V',
      service: 'Pediatrics',
      date: '2024-01-20',
      time: '11:00 AM',
      doctor: 'Dr. Robert Lee',
      status: 'Cancelled',
      notes: 'Cancelled by patient'
    },
    {
      id: 4,
      bookingCode: 'BK88N5F2D',
      service: 'Dental',
      date: '2024-01-10',
      time: '10:00 AM',
      doctor: 'Dr. Michael Chen',
      status: 'Completed',
      notes: 'Regular cleaning and check-up'
    }
  ]

  const formatDate = (dateString: string) => {
    const date = new Date(dateString + 'T00:00:00')
    return date.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })
  }

  const getStatusIcon = (status: string) => {
    return status === 'Completed' ? (
      <CheckCircle size={20} className="text-primary" />
    ) : (
      <XCircle size={20} className="text-destructive" />
    )
  }

  const getStatusStyles = (status: string) => {
    if (status === 'Completed') {
      return 'bg-primary/10 text-primary'
    }
    return 'bg-destructive/10 text-destructive'
  }

  if (appointmentHistory.length === 0) {
    return (
      <Card className="p-12 text-center border border-border/40">
        <div className="inline-block p-4 rounded-full bg-secondary/20 mb-4">
          <Calendar className="w-8 h-8 text-foreground/40" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">No Appointment History</h3>
        <p className="text-foreground/60">You haven't had any appointments yet</p>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {appointmentHistory.map((appointment) => (
        <Card key={appointment.id} className="p-6 border border-border/40 hover:shadow-lg transition-all">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                {getStatusIcon(appointment.status)}
                <h3 className="text-lg font-bold text-foreground">{appointment.service}</h3>
              </div>
              <span className={`inline-block px-3 py-1 ${getStatusStyles(appointment.status)} text-xs font-semibold rounded-full`}>
                {appointment.status}
              </span>
            </div>
            <p className="text-sm text-foreground/50 font-mono">{appointment.bookingCode}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-foreground/50 flex-shrink-0" />
              <span className="text-sm text-foreground/70">{formatDate(appointment.date)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-foreground/50 flex-shrink-0" />
              <span className="text-sm text-foreground/70">{appointment.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <User size={16} className="text-foreground/50 flex-shrink-0" />
              <span className="text-sm text-foreground/70">{appointment.doctor}</span>
            </div>
          </div>

          {appointment.notes && (
            <div className="p-3 bg-secondary/30 rounded-lg mb-4">
              <p className="text-xs text-foreground/50 uppercase tracking-wider mb-1">Notes</p>
              <p className="text-sm text-foreground/70">{appointment.notes}</p>
            </div>
          )}

          {/* {appointment.status === 'Completed' && (
            <Button variant="outline" className="border-primary text-primary hover:bg-secondary w-full">
              View Medical Records
            </Button>
          )} */}
        </Card>
      ))}
    </div>
  )
}
