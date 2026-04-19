import { createClient } from '@/lib/supabase/server'
import { apiResponse } from '@/lib/api/response'

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const {
            nik, name, email, phone, address,
            bloodType, gender, dob, bpjsNumber,
        } = body

        if (!nik || !name) {
            return apiResponse.badRequest('NIK and name are required')
        }

        if (!dob) {
            return apiResponse.badRequest('Date of birth is required')
        }

        // Validate date format
        if (!/^\d{4}-\d{2}-\d{2}$/.test(dob)) {
            return apiResponse.badRequest('date_of_birth must be YYYY-MM-DD format')
        }

        const supabase = await createClient()

        const { data, error } = await supabase.rpc('create_patient_public', {
            p_nik: nik,
            p_full_name: name,
            p_gender: gender ?? 'unknown',
            p_date_of_birth: dob,
            p_email: email ?? null,
            p_phone: phone ?? null,
            p_address: address ?? null,
            p_blood_type: bloodType ?? null,
            p_bpjs_no: bpjsNumber ?? null,
        })

        if (error) {
            console.error('create_patient_public RPC error:', error)

            if (error.message?.includes('NIK_REQUIRED')) {
                return apiResponse.badRequest('NIK is required')
            }
            if (error.message?.includes('NAME_REQUIRED')) {
                return apiResponse.badRequest('Name is required')
            }
            if (error.message?.includes('INVALID_GENDER')) {
                return apiResponse.badRequest('gender must be male, female, other, or unknown')
            }
            if (error.message?.includes('NO_ORGANIZATION_FOUND')) {
                return apiResponse.serverError('System configuration error — no active organization found')
            }
            if (error.code === '23505') {
                return apiResponse.conflict('A patient with this NIK or BPJS number already exists')
            }

            return apiResponse.serverError('Failed to register patient')
        }

        return apiResponse.ok(data)

    } catch (e) {
        console.error('Patient Creation API error:', e)
        return apiResponse.serverError()
    }
}