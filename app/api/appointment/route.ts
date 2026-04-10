import { createClient as createServerClient } from '@/lib/supabase/server'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
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

export async function POST(req: Request) {
    try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
        const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

        let supabase = await createServerClient()
        if (serviceKey && supabaseUrl) {
            supabase = createSupabaseClient(supabaseUrl, serviceKey)
        }

        const body = await req.json()
        const {
            patientId, service, date, time, paymentMethod
        } = body

        if (!patientId || !service || !date || !time || !paymentMethod) {
            return apiResponse.badRequest('Missing required fields')
        }

        // 1. Manage Device ID Cookie
        const cookieStore = await cookies()
        let deviceId = cookieStore.get('device_id')?.value
        if (!deviceId) {
            deviceId = crypto.randomUUID()
            cookieStore.set('device_id', deviceId, {
                maxAge: 60 * 60 * 24 * 365, // 1 year
                path: '/',
                httpOnly: true,
                sameSite: 'lax'
            })
        }

        // 2. Insert Appointment
        const bookingCode = generateBookingCode()
        const { data: appointmentData, error: appointmentError } = await supabase
            .from('appointments')
            .insert({
                patient_id: patientId,
                poli_service_id: service, // The service ID from the form
                booking_code: bookingCode,
                appointment_date: date,
                // Time from component is a range like "08:00 - 12:00", we just extract the start_time
                appointment_time: time.length > 5 ? time.substring(0, 5) + ':00' : time + ':00',
                payment_type: paymentMethod === 'bpjs' ? 'bpjs' : 'umum',
                status: 'pending',
                device_id: deviceId
            })
            .select('*')
            .single()

        if (appointmentError) {
            console.error('Appointment insert error:', appointmentError)
            return apiResponse.serverError('Failed to create appointment')
        }

        return apiResponse.created({
            booking_code: bookingCode,
            appointment: appointmentData
        })

    } catch (e: any) {
        console.error('Appointment Create API error:', e)
        return apiResponse.serverError()
    }
}

export async function GET() {
    try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
        const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

        let supabase = await createServerClient()
        if (serviceKey && supabaseUrl) {
            supabase = createSupabaseClient(supabaseUrl, serviceKey)
        }

        const cookieStore = await cookies()
        const deviceId = cookieStore.get('device_id')?.value

        if (!deviceId) {
            return apiResponse.ok([]) // No appointments for this device yet
        }

        // We fetch appointments matching this device_id directly from the column
        const { data: appointments, error } = await supabase
            .from('appointments')
            .select(`
                id, booking_code, appointment_date, appointment_time, status, notes,
                poli_service:poli_service_id (name)
            `)
            .eq('device_id', deviceId)
            .order('appointment_date', { ascending: false })

        if (error) {
            console.error('Fetch appointments error:', error)
            return apiResponse.serverError('Failed to fetch appointments')
        }

        return apiResponse.ok(appointments || [])
    } catch (e: any) {
        console.error('Appointment Fetch API error:', e)
        return apiResponse.serverError()
    }
}
