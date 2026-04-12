import { createClient as createServerClient } from '@/lib/supabase/server'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { apiResponse } from '@/lib/api/response'

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url)
        const poliId = searchParams.get('poli_id')

        if (!poliId) {
            return apiResponse.badRequest('poli_id is required')
        }

        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
        const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

        let supabase = await createServerClient()
        if (serviceKey && supabaseUrl) {
            supabase = createSupabaseClient(supabaseUrl, serviceKey)
        }

        const queueDate = new Date().toISOString().split('T')[0]

        // Find current serving queue for this poli 
        const { data: currentQueue, error } = await supabase
            .from('queues')
            .select('queue_number')
            .eq('poli_service_id', poliId)
            .eq('queue_date', queueDate)
            .in('status', ['called', 'in_service'])
            .order('sequence_number', { ascending: false })
            .limit(1)
            .maybeSingle()

        if (error) {
            console.error('Queue current error:', error)
            return apiResponse.serverError('Failed to fetch current queue')
        }

        return apiResponse.ok({
            current: currentQueue?.queue_number || null
        })

    } catch (e: any) {
        console.error('Queue current GET error:', e)
        return apiResponse.serverError()
    }
}
