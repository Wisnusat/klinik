import { NextResponse } from 'next/server'
import { createClient as createServerClient } from '@/lib/supabase/server'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { apiResponse } from '@/lib/api/response'

function generateMedicalRecordNo() {
    return 'MR/' + new Date().getFullYear() + '/' + Math.floor(100000 + Math.random() * 900000)
}

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { nik } = body

        if (!nik) {
            return apiResponse.badRequest('NIK is required')
        }
        
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
        const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
        
        let supabase = await createServerClient()
        if (serviceKey && supabaseUrl) {
            supabase = createSupabaseClient(supabaseUrl, serviceKey)
        }

        // 1. Check if patient exists natively
        const { data: patient, error } = await supabase
            .from('patients')
            .select('id, nik, full_name, medical_record_no, date_of_birth, gender')
            .eq('nik', nik)
            .maybeSingle()

        if (error) {
            console.error('Supabase query error:', error)
            return apiResponse.serverError(`Database error: ${error.message}`)
        }

        if (patient) {
            return apiResponse.ok({ patient, isNew: false })
        }
        
        // Return 200 with isNew=true to trigger patient profile creation step
        return apiResponse.ok({ patient: null, isNew: true })

        // // 2. If not found in internal backend, hit Mock Satu Sehat Integration
        // // Mock Satu Sehat generates some basic info like name, dob, gender
        // const mockIhsNumber = 'P' + crypto.createHash('md5').update(nik).digest('hex').substring(0, 10).toUpperCase()
        // const mockSsPatientId = crypto.randomUUID()

        // // Randomly generate name or mock it based on NIK
        // const mockPatientData = {
        //     nik,
        //     full_name: 'Satu Sehat User ' + nik.substring(12),
        //     gender: parseInt(nik.substring(6, 8)) > 40 ? 'female' : 'male', // Common Indonesian NIK logic for female
        //     date_of_birth: '1990-01-01', // Mock DOB
        //     ss_ihs_number: mockIhsNumber,
        //     ss_patient_id: mockSsPatientId,
        //     medical_record_no: generateMedicalRecordNo(),
        // }

        // // 3. Store the data in the local database
        // const { data: newPatient, error: insertError } = await supabase
        //     .from('patients')
        //     .insert(mockPatientData)
        //     .select()
        //     .single()

        // if (insertError) {
        //     console.error('Failed to create patient from Satu Sehat data:', insertError)
        //     return apiResponse.serverError('Failed to store patient data from Satu Sehat')
        // }

        // // Return the newly created patient
        // return apiResponse.ok({ patient: newPatient, isNew: true })
    } catch (e: any) {
        console.error('Patient Verification API error:', e)
        return apiResponse.serverError()
    }
}
