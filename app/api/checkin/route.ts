import { createClient as createServerClient } from '@/lib/supabase/server'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { apiResponse } from '@/lib/api/response'

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url)
        const code = searchParams.get('code')

        if (!code) {
            return apiResponse.badRequest('Booking code is required')
        }

        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
        const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
        
        let supabase = await createServerClient()
        if (serviceKey && supabaseUrl) {
            supabase = createSupabaseClient(supabaseUrl, serviceKey)
        }

        // Search appointment joined with required info
        const { data: appointment, error } = await supabase
            .from('appointments')
            .select(`
                id,
                booking_code,
                appointment_date,
                appointment_time,
                status,
                poli_services:poli_service_id(id, name, location_id, locations(name)),
                practitioners(full_name),
                patients!inner(id, full_name)
            `)
            .ilike('booking_code', code)
            .maybeSingle()

        if (error) {
            console.error('Fetch appointment error:', error)
            return apiResponse.serverError('Failed to verify appointment')
        }

        if (!appointment) {
            return apiResponse.notFound('Appointment not found')
        }

        // Check if queue exists
        const { data: existingQueue } = await supabase
            .from('queues')
            .select('queue_number')
            .eq('appointment_id', appointment.id)
            .maybeSingle()

        // Extract related safely
        const poliService = appointment.poli_services as any
        const doctor = appointment.practitioners as any
        const patient = appointment.patients as any

        return apiResponse.ok({
            appointment: {
                id: appointment.id,
                bookingCode: appointment.booking_code,
                service: poliService?.name || 'Unknown',
                date: appointment.appointment_date,
                time: appointment.appointment_time,
                doctor: doctor?.full_name || 'Unassigned',
                location: poliService?.locations?.name || 'Klinik Utama',
                patientName: patient?.full_name || 'Unknown'
            },
            isCheckedIn: !!existingQueue,
            queueNumber: existingQueue?.queue_number || null
        })

    } catch (e: any) {
        console.error('Checkin GET error:', e)
        return apiResponse.serverError()
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { appointmentId } = body

        if (!appointmentId) {
            return apiResponse.badRequest('Appointment ID is required')
        }

        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
        const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
        
        let supabase = await createServerClient()
        if (serviceKey && supabaseUrl) {
            supabase = createSupabaseClient(supabaseUrl, serviceKey)
        }

        // Get appointment details
        const { data: appointment, error: aptError } = await supabase
            .from('appointments')
            .select(`
                id, patient_id, poli_service_id, appointment_date, status,
                poli_services(name, location_id)
            `)
            .eq('id', appointmentId)
            .maybeSingle()

        if (aptError || !appointment) {
            return apiResponse.notFound('Appointment not found')
        }

        // Check if queue already exists
        const { data: existingQueue } = await supabase
            .from('queues')
            .select('queue_number')
            .eq('appointment_id', appointmentId)
            .maybeSingle()

        if (existingQueue) {
            return apiResponse.ok({ queueNumber: existingQueue.queue_number })
        }

        const queueDate = new Date().toISOString().split('T')[0] // Use current date for queue

        // Determine Prefix
        let prefix = 'A'
        const poliName = (appointment.poli_services as any)?.name?.toLowerCase() || ''
        if (poliName.includes('gigi') || poliName.includes('dental')) {
            prefix = 'D'
        }

        // Get safe sequence number using COUNT
        const { count, error: countError } = await supabase
            .from('queues')
            .select('*', { count: 'exact', head: true })
            .eq('poli_service_id', appointment.poli_service_id)
            .eq('queue_date', queueDate)

        if (countError) {
            console.error('Queue count error:', countError)
            return apiResponse.serverError('Failed to generate queue')
        }

        const seq = (count || 0) + 1
        const queueNumber = `${prefix}-${seq.toString().padStart(3, '0')}`

        // Insert Queue
        const { error: insertError } = await supabase
            .from('queues')
            .insert({
                appointment_id: appointmentId,
                patient_id: appointment.patient_id,
                poli_service_id: appointment.poli_service_id,
                location_id: (appointment.poli_services as any)?.location_id || null,
                queue_date: queueDate,
                queue_number: queueNumber,
                queue_prefix: prefix,
                sequence_number: seq,
                status: 'waiting'
            })

        if (insertError) {
            console.error('Queue insert error:', insertError)
            return apiResponse.serverError('Failed to generate queue')
        }

        // Update appointment status to checked_in (ignore if fails)
        await supabase
            .from('appointments')
            .update({ status: 'checked_in' })
            .eq('id', appointmentId)

        return apiResponse.ok({ queueNumber })

    } catch (e: any) {
        console.error('Checkin POST error:', e)
        return apiResponse.serverError()
    }
}
