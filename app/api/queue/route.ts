import { createClient as createServerClient } from '@/lib/supabase/server'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { apiResponse } from '@/lib/api/response'

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url)
        const service = searchParams.get('service') || 'general' // 'general' or 'dental'

        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
        const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
        
        let supabase = await createServerClient()
        if (serviceKey && supabaseUrl) {
            supabase = createSupabaseClient(supabaseUrl, serviceKey)
        }

        const queueDate = new Date().toISOString().split('T')[0]

        // Find PoliService IDs matching the service query
        // "dental" -> Poli Gigi, "general" -> Poli Umum
        const { data: poliServices } = await supabase
            .from('poli_services')
            .select('id, name')
            .ilike('name', service === 'dental' ? '%gigi%' : '%umum%')

        if (!poliServices || poliServices.length === 0) {
            // Failsafe return if no actual poli mapped in DB yet
            return apiResponse.ok({
                current: null,
                next: null,
                service: service === 'dental' ? 'Poli Gigi' : 'Poli Umum',
                totalWaiting: 0,
                doctor: 'Belum Ada Dokter'
            })
        }
        
        const poliServiceIds = poliServices.map(s => s.id)
        const displayServiceName = poliServices[0].name

        // Find queues
        const { data: queues, error } = await supabase
            .from('queues')
            .select('queue_number, sequence_number, status')
            .in('poli_service_id', poliServiceIds)
            .eq('queue_date', queueDate)

        if (error) {
            console.error('Queue error:', error)
            return apiResponse.serverError('Failed to fetch queues')
        }

        // Determine current, next, and total waiting
        let current = null
        let next = null
        let totalWaiting = 0

        const waitingQueues: any[] = []

        queues?.forEach(q => {
            // Keep the last called as current or if it's in service
            if (q.status === 'called' || q.status === 'in_service') {
                current = q.queue_number
            } else if (q.status === 'waiting') {
                waitingQueues.push(q)
                totalWaiting++
            }
        })

        // Find next by lowest sequence_number among waiting queues
        if (waitingQueues.length > 0) {
            waitingQueues.sort((a, b) => a.sequence_number - b.sequence_number)
            next = waitingQueues[0].queue_number
        }

        // Find current doctor mapping based on schedule or default
        const doctorName = service === 'dental' ? 'Drg. Michael Chen' : 'Dr. Sarah Johnson'

        return apiResponse.ok({
            current,
            next,
            service: displayServiceName,
            totalWaiting,
            doctor: doctorName
        })

    } catch (e: any) {
        console.error('Queue GET error:', e)
        return apiResponse.serverError()
    }
}
