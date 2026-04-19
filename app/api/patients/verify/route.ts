import { createClient } from '@/lib/supabase/server'
import { apiResponse } from '@/lib/api/response'

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { nik } = body

        if (!nik) {
            return apiResponse.badRequest('NIK is required')
        }

        const supabase = await createClient()

        const { data, error } = await supabase
            .rpc('verify_patient_by_nik', { p_nik: nik })

        if (error) {
            console.error('verify_patient_by_nik RPC error:', error)

            if (error.message?.includes('NIK_REQUIRED')) {
                return apiResponse.badRequest('NIK is required')
            }

            return apiResponse.serverError('Failed to verify patient')
        }

        return apiResponse.ok(data)

    } catch (e) {
        console.error('Patient Verification API error:', e)
        return apiResponse.serverError()
    }
}