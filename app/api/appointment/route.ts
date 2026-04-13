import { createClient } from '@/lib/supabase/server'
import { apiResponse } from '@/lib/api/response'
import { cookies } from 'next/headers'

function generateBookingCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let code = 'BK'
    for (let i = 0; i < 8; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return code
}

// Parse time from range string like "08:00 - 12:00" → "08:00:00"
function parseTime(time: string): string {
    const t = time.length > 5 ? time.substring(0, 5) : time
    return `${t}:00`
}

// Get or create device_id from cookie
async function getOrCreateDeviceId(): Promise<string> {
    const cookieStore = await cookies()
    const existing = cookieStore.get('device_id')?.value
    if (existing) return existing

    const newId = crypto.randomUUID()
    cookieStore.set('device_id', newId, {
        maxAge: 60 * 60 * 24 * 365,
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
    })
    return newId
}

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { patientId, service, date, time, paymentMethod } = body

        if (!patientId || !service || !date || !time || !paymentMethod) {
            return apiResponse.badRequest('Missing required fields: patientId, service, date, time, paymentMethod')
        }

        const deviceId = await getOrCreateDeviceId()
        const bookingCode = generateBookingCode()
        const supabase = await createClient()

        const { data, error } = await supabase.rpc('create_appointment', {
            p_patient_id: patientId,
            p_poli_service_id: service,
            p_booking_code: bookingCode,
            p_appointment_date: date,
            p_appointment_time: parseTime(time),
            p_payment_type: paymentMethod === 'bpjs' ? 'bpjs' : 'umum',
            p_device_id: deviceId,
        })

        if (error) {
            console.error('create_appointment RPC error:', error)

            // Surface validation errors from the RPC
            if (error.message?.includes('POLI_NOT_FOUND')) {
                return apiResponse.notFound('Poli service not found or inactive')
            }
            if (error.message?.includes('PATIENT_NOT_FOUND')) {
                return apiResponse.notFound('Patient not found')
            }
            if (error.message?.includes('INVALID_PAYMENT_TYPE')) {
                return apiResponse.badRequest('payment_type must be umum or bpjs')
            }
            if (error.code === '23505') {
                return apiResponse.conflict('Booking code already exists, please try again')
            }

            return apiResponse.serverError('Failed to create appointment')
        }

        return apiResponse.created({
            booking_code: bookingCode,
            appointment: data,
        })

    } catch (e) {
        console.error('Appointment POST error:', e)
        return apiResponse.serverError()
    }
}

export async function GET() {
    try {
        const cookieStore = await cookies()
        const deviceId = cookieStore.get('device_id')?.value

        // No cookie → no appointments to show
        if (!deviceId) {
            return apiResponse.ok([])
        }

        const supabase = await createClient()

        const { data, error } = await supabase.rpc('get_appointments_by_device', {
            p_device_id: deviceId,
        })

        if (error) {
            console.error('get_appointments_by_device RPC error:', error)
            return apiResponse.serverError('Failed to fetch appointments')
        }

        return apiResponse.ok(data ?? [])

    } catch (e) {
        console.error('Appointment GET error:', e)
        return apiResponse.serverError()
    }
}