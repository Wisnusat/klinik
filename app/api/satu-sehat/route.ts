import { NextResponse } from 'next/server'
import { apiResponse } from '@/lib/api/response'
import crypto from 'crypto'

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { nik, name, dob, gender } = body

        if (!nik) {
            return apiResponse.badRequest('NIK is required')
        }

        // Mock MPI lookup delay
        await new Promise(resolve => setTimeout(resolve, 800))

        // Return a mocked SS Patient ID and IHS Number for this NIK
        // Usually IHS starts with P
        const mockIhsNumber = 'P' + crypto.createHash('md5').update(nik).digest('hex').substring(0, 10).toUpperCase()
        const mockSsPatientId = crypto.randomUUID()

        return apiResponse.ok({
            ss_patient_id: mockSsPatientId,
            ss_ihs_number: mockIhsNumber,
            message: 'MPI record found'
        })
    } catch (e: any) {
        console.error('Satu Sehat API error:', e)
        return apiResponse.serverError()
    }
}
