import { NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { apiResponse } from '@/lib/api/response'
import { rateLimit, RATE_LIMITS } from '@/lib/api/rate-limit'

/**
 * GET /api/poli
 * Returns all active poli services.
 * Auth: None (public — used on hospital info page and booking)
 */
export async function GET(request: NextRequest) {
    const rl = rateLimit(request, 'cms:poli:list', RATE_LIMITS.read)
    if (!rl.allowed) return apiResponse.tooManyRequests(rl.retryAfter)

    try {
        const supabase = await createClient()

        const { data: poliServices, error } = await supabase
            .from('poli_services')
            .select(`
                id,
                name,
                code,
                speciality_code,
                quota_per_day,
                is_active,
                ss_healthcare_service_id,
                location_id,
                locations (
                    id,
                    name,
                    floor
                )
            `)
            .eq('is_active', true)
            .order('name', { ascending: true })

        if (error) {
            console.error('Poli services fetch error:', error)
            return apiResponse.serverError('Failed to fetch poli services')
        }

        return apiResponse.ok(poliServices)
    } catch {
        return apiResponse.serverError()
    }
}
