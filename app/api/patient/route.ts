import { createClient as createServerClient } from '@/lib/supabase/server'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { apiResponse } from '@/lib/api/response'

function generateMedicalRecordNo() {
    return 'MR/' + new Date().getFullYear() + '/' + Math.floor(100000 + Math.random() * 900000)
}

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const {
            nik, name, email, phone, address, bloodType, gender, dob, bpjsNumber
        } = body

        if (!nik || !name) {
            return apiResponse.badRequest('NIK and Name are required')
        }

        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
        const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
        
        let supabase = await createServerClient()
        if (serviceKey && supabaseUrl) {
            supabase = createSupabaseClient(supabaseUrl, serviceKey)
        }

        // Check if patient already exists (in case form is re-submitted)
        const { data: existingPatient } = await supabase
            .from('patients')
            .select('id')
            .eq('nik', nik)
            .maybeSingle()

        if (existingPatient) {
            return apiResponse.ok(existingPatient)
        }

        const patientData = {
            medical_record_no: generateMedicalRecordNo(),
            nik,
            full_name: name,
            email: email || null,
            phone: phone || null,
            address: address || null,
            blood_type: bloodType || null,
            gender: gender || 'unknown',
            date_of_birth: dob || '1990-01-01',
            bpjs_no: bpjsNumber || null
        }

        const { data: newPatient, error: insertError } = await supabase
            .from('patients')
            .insert(patientData)
            .select('id')
            .single()

        if (insertError) {
            console.error('Failed to create patient:', insertError)
            return apiResponse.serverError('Failed to register patient')
        }

        return apiResponse.ok(newPatient)

    } catch (e: any) {
        console.error('Patient Creation API error:', e)
        return apiResponse.serverError()
    }
}
