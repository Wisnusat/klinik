import { NextRequest } from 'next/server'
import { createClient as createServerClient } from '@/lib/supabase/server'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { apiResponse } from '@/lib/api/response'
import { rateLimit, RATE_LIMITS } from '@/lib/api/rate-limit'

type RouteContext = { params: Promise<{ id: string }> }

/**
 * GET /api/poli/slots/[id]
 * Returns all active poli service slots.
 * Auth: None (public — used on hospital info page and booking)
 */
export async function GET(request: NextRequest, context: RouteContext) {
    const rl = rateLimit(request, 'cms:poli:slots:id', RATE_LIMITS.read)
    if (!rl.allowed) return apiResponse.tooManyRequests(rl.retryAfter)

    try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
        const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

        let supabase = await createServerClient()
        if (serviceKey && supabaseUrl) {
            supabase = createSupabaseClient(supabaseUrl, serviceKey)
        }

        const { id } = await context.params

        const { data: appointmentSlots, error } = await supabase
            .from('appointment_slots')
            .select(`
                id,
                start_time,
                end_time,
                is_active,
                practitioners (
                    full_name,
                    specialization
                )
            `)
            .eq('poli_service_id', id)
            .eq('is_active', true)
            .order('start_time', { ascending: true })

        if (error || !appointmentSlots) {
            console.error('Poli services fetch error:', error)
            return apiResponse.serverError('Failed to fetch poli services')
        }

        return apiResponse.ok(appointmentSlots)
    } catch {
        return apiResponse.serverError()
    }
}
