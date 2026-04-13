import { createClient } from '@/lib/supabase/server'
import { apiResponse } from '@/lib/api/response'

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url)
        const code = searchParams.get('code')

        if (!code) {
            return apiResponse.badRequest('Booking code is required')
        }

        const supabase = await createClient()

        const { data, error } = await supabase
            .rpc('get_appointment_by_code', { p_code: code })

        if (error) {
            console.error('get_appointment_by_code RPC error:', error)
            return apiResponse.serverError('Failed to verify appointment')
        }

        if (!data) {
            return apiResponse.notFound('Appointment not found')
        }

        return apiResponse.ok(data)

    } catch (e) {
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

        const supabase = await createClient()

        const { data, error } = await supabase
            .rpc('checkin_appointment', { p_appointment_id: appointmentId })

        if (error) {
            console.error('checkin_appointment RPC error:', error)

            if (error.message?.includes('APPOINTMENT_NOT_FOUND')) {
                return apiResponse.notFound('Appointment not found')
            }

            return apiResponse.serverError('Failed to process check-in')
        }

        return apiResponse.ok(data)

    } catch (e) {
        console.error('Checkin POST error:', e)
        return apiResponse.serverError()
    }
}