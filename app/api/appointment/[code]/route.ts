import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { apiResponse } from '@/lib/api/response'

export async function GET(
    request: Request,
    { params }: { params: { code: string } }
) {
    try {
        const paramStr = await params
        const bookingCode = paramStr.code

        if (!bookingCode) {
            return apiResponse.badRequest('Booking code is required')
        }

        const supabase = await createClient()

        const { data: appointment, error } = await supabase
            .from('appointments')
            .select(`
                *,
                poli_service:poli_service_id(name),
                patient:patient_id(full_name, nik, phone, bpjs_no)
            `)
            .eq('booking_code', bookingCode)
            .single()

        if (error || !appointment) {
            console.error('Fetch appointment error:', error)
            return apiResponse.notFound('Appointment not found')
        }

        return apiResponse.ok(appointment)
    } catch (e: any) {
        console.error('Single Appointment API error:', e)
        return apiResponse.serverError()
    }
}
