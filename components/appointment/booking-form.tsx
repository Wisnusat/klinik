'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import NikVerification from './steps/nik-verification'
import ProfileForm from './steps/profile-form'
import ServiceDateSelection from './steps/service-date-selection'
import PaymentMethod from './steps/payment-method'
import BpjsValidation from './steps/bpjs-validation'
import BookingConfirmation from './steps/booking-confirmation'

interface BookingFormProps {
  viewAppointment: () => void
}

export default function BookingForm({ viewAppointment }: BookingFormProps) {
  const [step, setStep] = useState(1)
  const [nikExists, setNikExists] = useState(false)
  const [formData, setFormData] = useState({
    nik: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    bloodType: '',
    gender: '',
    dob: '',
    service: '',
    serviceName: '',
    date: '',
    time: '',
    paymentMethod: '',
    bpjsNumber: '',
    bookingCode: '',
    patientId: '',
  })

  const handleNikSubmit = (nik: string, patientData: any, isNew: boolean) => {
    setFormData({
      ...formData,
      nik,
      patientId: patientData?.id || '',
      name: patientData?.full_name || '',
      email: patientData?.email || '',
      phone: patientData?.phone || '',
      address: patientData?.address || '',
      bloodType: patientData?.blood_type || '',
      gender: patientData?.gender || '',
      dob: patientData?.date_of_birth || '',
      bpjsNumber: patientData?.bpjs_no || '',
    })

    // If it's not a new patient, we can skip the profile form
    const exists = !isNew
    setNikExists(exists)
    setStep(exists ? 3 : 2)
  }

  const handleProfileSubmit = (profileData: any) => {
    setFormData({ ...formData, ...profileData })
    setStep(3)
  }

  const handleServiceDateSubmit = (serviceData: any) => {
    setFormData({ ...formData, ...serviceData })
    setStep(4)
  }

  const handlePaymentSubmit = (paymentData: any) => {
    setFormData({ ...formData, ...paymentData })

    if (paymentData.paymentMethod === 'bpjs') {
      setStep(5) // Go to BPJS validation
    } else {
      setStep(6) // Go to confirmation
    }
  }

  const handleBpjsValidation = (bpjsNumber: string) => {
    setFormData({ ...formData, bpjsNumber })
    setStep(6)
  }

  const handleBookingComplete = (bookingCode: string) => {
    setFormData({ ...formData, bookingCode })
    setStep(7)
  }

  const goBack = () => {
    if (step > 1) {
      if (step === 3 && !nikExists) {
        setStep(2) // Back from service to profile
      } else if (step === 5) {
        setStep(4) // Back from BPJS to payment
      } else if (step === 6 && formData.paymentMethod === 'bpjs') {
        setStep(5) // Back from confirmation to BPJS
      } else if (step === 6) {
        setStep(4) // Back from confirmation to payment
      } else {
        setStep(step - 1)
      }
    }
  }

  const renderStepIndicator = () => {
    const steps = ['NIK', 'Profil', 'Layanan & Tanggal', 'Pembayaran']
    const displaySteps = formData.paymentMethod === 'bpjs'
      ? steps
      : steps.filter((_, i) => i !== 4) // Remove BPJS step for non-BPJS payments

    return (
      <div className="mb-8">
        <div className="flex justify-between items-center">
          {displaySteps.map((stepName, index) => {
            const stepNumber = formData.paymentMethod === 'bpjs'
              ? index + 1
              : index < 4 ? index + 1 : index // Adjust numbering for non-BPJS

            const isActive = formData.paymentMethod === 'bpjs'
              ? step === stepNumber
              : step === stepNumber || (step > 5 && index === 5)

            return (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold mb-2 ${isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground'
                    }`}
                >
                  {index + 1}
                </div>
                <span className="text-xs text-center">{stepName}</span>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <Card className="p-8 border border-border/40">
      {step !== 7 && renderStepIndicator()}

      <div className="mb-8">
        {step === 1 && <NikVerification onSubmit={handleNikSubmit} />}
        {step === 2 && <ProfileForm onSubmit={handleProfileSubmit} />}
        {step === 3 && <ServiceDateSelection onSubmit={handleServiceDateSubmit} />}
        {step === 4 && <PaymentMethod onSubmit={handlePaymentSubmit} />}
        {step === 5 && <BpjsValidation onSubmit={handleBpjsValidation} />}
        {step === 6 && <BookingConfirmation formData={formData} onSubmit={handleBookingComplete} />}
        {step === 7 && (
          <div className="text-center py-12">
            <div className="inline-block p-4 rounded-full bg-primary/10 mb-4">
              <div className="text-4xl">✓</div>
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Pendaftaran Berhasil!</h2>
            <p className="text-foreground/60 mb-6">Janji temu Anda telah berhasil didaftarkan</p>
            <div className="bg-secondary/50 p-6 rounded-lg mb-8">
              <p className="text-sm text-foreground/60 mb-2">Kode Booking Anda:</p>
              <p className="text-3xl font-bold text-primary">{formData.bookingCode}</p>
              <p className="text-xs text-foreground/50 mt-2">Simpan kode booking ini untuk melakukan check-in di klinik</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                onClick={() => {
                  setStep(1)
                  setFormData({
                    nik: '',
                    name: '',
                    email: '',
                    phone: '',
                    address: '',
                    bloodType: '',
                    gender: '',
                    dob: '',
                    service: '',
                    serviceName: '',
                    date: '',
                    time: '',
                    paymentMethod: '',
                    bpjsNumber: '',
                    bookingCode: '',
                    patientId: '',
                  })
                  setNikExists(false)
                }}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Daftar Janji Temu Lain
              </Button>
              <Button variant="outline" className="border-primary text-primary hover:bg-secondary" onClick={viewAppointment}>
                Lihat Janji Temu Saya
              </Button>
            </div>
          </div>
        )}
      </div>

      {step !== 7 && (
        <div className="flex justify-between gap-4">
          <Button
            variant="outline"
            onClick={goBack}
            className="border-primary text-primary hover:bg-secondary"
            disabled={step === 1}
          >
            Kembali
          </Button>
        </div>
      )}
    </Card>
  )
}
