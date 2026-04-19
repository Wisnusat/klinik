import { createClient } from '@/lib/supabase/server'
import { apiResponse } from '@/lib/api/response'

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url)
        const service = searchParams.get('service') ?? 'general'

        const supabase = await createClient()
        const poliCode = service

        const { data, error } = await supabase
            .rpc('get_queue_display', { p_poli_code: poliCode })

        if (error) {
            console.error('Queue display RPC error:', error)
            return apiResponse.serverError('Failed to fetch queue')
        }

        return apiResponse.ok(data)
    } catch (e) {
        console.error('Queue GET error:', e)
        return apiResponse.serverError()
    }
}