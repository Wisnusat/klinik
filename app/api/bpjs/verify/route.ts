import { NextResponse } from 'next/server'
import { apiResponse } from '@/lib/api/response'

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { bpjsNumber } = body

        if (!bpjsNumber) {
            return apiResponse.badRequest('bpjsNumber is required')
        }

        // Mock PCare validation delay
        await new Promise(resolve => setTimeout(resolve, 800))

        const validBpjsNumbers = ['0000000000000001', '0000000000000002', '1234567890123456']
        
        if (validBpjsNumbers.includes(bpjsNumber)) {
            return apiResponse.ok({
                isValid: true,
                memberInfo: {
                    name: 'MOCK PATIENT NAME',
                    status: 'AKTIF',
                    faskesTingkat1: 'Klinik Utama',
                    class: 'Kelas 1'
                }
            })
        }

        return apiResponse.error('BPJS number is invalid or inactive', 400)
    } catch (e: any) {
        console.error('BPJS Verify API error:', e)
        return apiResponse.serverError()
    }
}
