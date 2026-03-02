'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Header from '@/components/header'
import Footer from '@/components/footer'
import BookingForm from '@/components/appointment/booking-form'
import ActiveAppointments from '@/components/appointment/active-appointments'
import AppointmentHistory from '@/components/appointment/appointment-history'

export default function AppointmentPage() {
  const [activeTab, setActiveTab] = useState('book')

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      
      <div className="flex-1">
        <div className="container mx-auto max-w-6xl px-4 py-12">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Appointments</h1>
            <p className="text-foreground/60">Book your appointment or view your appointment history</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="book">Book</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>

            <TabsContent value="book" className="space-y-4">
              <BookingForm viewAppointment={() => setActiveTab('active')} />
            </TabsContent>

            <TabsContent value="active" className="space-y-4">
              <ActiveAppointments />
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
              <AppointmentHistory />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </main>
  )
}
