import { NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { apiResponse } from '@/lib/api/response'
import { rateLimit, RATE_LIMITS } from '@/lib/api/rate-limit'

type RouteContext = { params: Promise<{ id: string }> }

export async function GET(request: NextRequest, context: RouteContext) {
    const rl = rateLimit(request, 'cms:poli:slots:id', RATE_LIMITS.read)
    if (!rl.allowed) return apiResponse.tooManyRequests(rl.retryAfter)

    try {
        const { id } = await context.params
        const supabase = await createClient()

        const { data, error } = await supabase
            .rpc('get_poli_slots', { p_poli_service_id: id })

        if (error) {
            console.error('get_poli_slots RPC error:', error)
            return apiResponse.serverError('Failed to fetch slots')
        }

        return apiResponse.ok(data ?? [])

    } catch {
        return apiResponse.serverError()
    }
}