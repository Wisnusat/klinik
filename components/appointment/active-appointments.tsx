'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, User, MapPin, Copy, Check, ListOrdered, Ticket } from 'lucide-react'
import { useState } from 'react'

export default function ActiveAppointments() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  // Mock active appointments data
  const activeAppointments = [
    {
      id: 1,
      bookingCode: 'BK12A5F7X',
      service: 'General Practitioner',
      date: '2024-03-10',
      time: '10:00 AM',
      doctor: 'Dr. Sarah Johnson',
      location: 'Room 101',
      status: 'Checked In',
      checkedIn: true,
      queueNumber: 'A-017',
      currentQueueNumber: 'A-012'
    },
    {
      id: 2,
      bookingCode: 'BK78Q9M2L',
      service: 'Dental',
      date: '2024-03-15',
      time: '02:00 PM',
      doctor: 'Dr. Michael Chen',
      location: 'Dental Clinic',
      status: 'Confirmed',
      checkedIn: false,
      queueNumber: null as string | null,
      currentQueueNumber: 'D-006'
    }
  ]

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString + 'T00:00:00')
    return date.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })
  }

  if (activeAppointments.length === 0) {
    return (
      <Card className="p-12 text-center border border-border/40">
        <div className="inline-block p-4 rounded-full bg-secondary/20 mb-4">
          <Calendar className="w-8 h-8 text-foreground/40" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">No Active Appointments</h3>
        <p className="text-foreground/60 mb-6">You don't have any upcoming appointments scheduled</p>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
          Book an Appointment
        </Button>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {activeAppointments.map((appointment) => (
        <Card key={appointment.id} className="p-6 border border-border/40 hover:shadow-lg transition-all">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-6">
            <div className="space-y-4 flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-1">{appointment.service}</h3>
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                    {appointment.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Calendar size={18} className="text-primary flex-shrink-0" />
                  <span className="text-foreground/70">{formatDate(appointment.date)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={18} className="text-primary flex-shrink-0" />
                  <span className="text-foreground/70">{appointment.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User size={18} className="text-primary flex-shrink-0" />
                  <span className="text-foreground/70">{appointment.doctor}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-primary flex-shrink-0" />
                  <span className="text-foreground/70">{appointment.location}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-border/40 bg-secondary/5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 text-primary">
                      <ListOrdered size={18} strokeWidth={1.8} />
                    </div>
                    <div>
                      <p className="text-xs text-foreground/50 uppercase tracking-wider">Current Queue</p>
                      <p className="text-foreground font-semibold">
                        <span className="text-primary">{appointment.currentQueueNumber}</span>
                      </p>
                      <p className="text-xs text-foreground/50 mt-1">Current queue number is auto-updated</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 text-primary">
                      <Ticket size={18} strokeWidth={1.8} />
                    </div>
                    <div>
                      <p className="text-xs text-foreground/50 uppercase tracking-wider">Your Queue Number</p>
                      {appointment.checkedIn && appointment.queueNumber ? (
                        <p className="text-foreground font-semibold">
                          <span className="text-primary">{appointment.queueNumber}</span>
                        </p>
                      ) : (
                        <p className="text-foreground/70 text-sm">
                          Queue number will be given after check-in.
                        </p>
                      )}
                      <p className="text-xs text-foreground/50 mt-1">
                        {appointment.checkedIn ? 'Checked-in status: Yes' : 'Checked-in status: Not yet'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {!appointment.checkedIn && (
              <div className="border-l border-border/40 pl-6 md:w-48">
                <p className="text-xs text-foreground/50 uppercase tracking-wider mb-2">Booking Code</p>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-primary font-mono">{appointment.bookingCode}</span>
                  <button
                    onClick={() => copyToClipboard(appointment.bookingCode)}
                    className="p-2 hover:bg-secondary rounded-lg transition-colors"
                  >
                    {copiedCode === appointment.bookingCode ? (
                      <Check size={18} className="text-primary" />
                    ) : (
                      <Copy size={18} className="text-foreground/50 hover:text-primary" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-foreground/50 mt-2">Present this code at check-in</p>
              </div>
            )}
          </div>

          {!appointment.checkedIn && (
            <div className="flex gap-3">
              <Button variant="outline" className="border-primary text-primary hover:bg-secondary flex-1">
                Reschedule
              </Button>
              <Button variant="outline" className="border-destructive text-destructive hover:bg-destructive/10 flex-1">
                Cancel
              </Button>
            </div>
          )}
        </Card>
      ))}
    </div>
  )
}
