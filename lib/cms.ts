/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from '@/lib/supabase/client'

/**
 * Fetch all CMS content sections for the klinik landing page.
 * Reads directly from Supabase `cms_content` table.
 * Returns a map of section_key → content.
 */
export async function fetchCmsContent(): Promise<Record<string, any>> {
    try {
        const supabase = createClient()
        const { data, error } = await supabase
            .from('cms_content')
            .select('section_key, content')
            .eq('is_active', true)

        if (error) {
            console.error('CMS fetch error:', error)
            return {}
        }

        const map: Record<string, any> = {}
        for (const item of data ?? []) {
            map[item.section_key] = item.content
        }
        return map
    } catch (err) {
        console.error('CMS fetch exception:', err)
        return {}
    }
}

// ─── Typed accessors with Indonesian fallbacks ────────────────────────────

export interface HeroContent {
    title: string
    subtitle: string
    cta_primary_text: string
    cta_secondary_text: string
}

export const DEFAULT_HERO: HeroContent = {
    title: 'Melayani dengan Sepenuh Hati',
    subtitle: 'Klinik Utama Harapan Bunda hadir untuk memberikan pelayanan kesehatan berkualitas dengan tenaga medis profesional dan fasilitas modern.',
    cta_primary_text: 'Daftar Online',
    cta_secondary_text: 'Lihat Layanan',
}

export interface StatItem {
    value: string
    label: string
}

export const DEFAULT_STATS: StatItem[] = [
    { value: '26+', label: 'Tenaga Medis' },
    { value: '4', label: 'Poli Spesialis' },
    { value: '24/7', label: 'Layanan Darurat' },
]

export interface AboutContent {
    title: string
    description: string
    sub_description: string
    highlights: { title: string; description: string }[]
}

export const DEFAULT_ABOUT: AboutContent = {
    title: 'Tentang Klinik Kami',
    description: 'Klinik Utama Harapan Bunda adalah fasilitas kesehatan yang berlokasi di Dharmasraya, Sumatera Barat.',
    sub_description: 'Dengan tim medis berpengalaman, kami siap melayani kebutuhan kesehatan Anda dan keluarga.',
    highlights: [
        { title: 'Pelayanan 24 Jam', description: 'Layanan darurat dan rawat inap tersedia sepanjang waktu.' },
        { title: 'Dokter Spesialis', description: 'Tersedia dokter spesialis Obgyn, Bedah, dan Anestesi.' },
        { title: 'Pemantauan Lengkap', description: 'Pemantauan tanda vital dan observasi pasca perawatan.' },
        { title: 'Keselamatan Pasien', description: 'Protokol standar dan pencegahan infeksi dalam setiap pelayanan.' },
    ],
}

export interface ServiceItem {
    name: string
    description: string
    hours: string
}

export interface ServicesContent {
    title: string
    subtitle: string
    items: ServiceItem[]
}

export const DEFAULT_SERVICES: ServicesContent = {
    title: 'Layanan Medis',
    subtitle: 'Berbagai layanan kesehatan yang disediakan oleh tenaga profesional berpengalaman',
    items: [
        { name: 'Poli Obgyn', description: 'Layanan kebidanan dan kandungan', hours: 'Senin–Jumat: 09.00–13.00' },
        { name: 'Poli Bedah', description: 'Layanan bedah umum', hours: 'Selasa & Kamis: 14.00–16.00' },
        { name: 'Poli Gigi', description: 'Perawatan gigi lengkap', hours: 'Senin–Sabtu: 16.00–20.00' },
        { name: 'Poli Umum', description: 'Layanan kesehatan umum', hours: 'Senin–Sabtu' },
    ],
}

export interface FaqItem {
    question: string
    answer: string
}

export interface FaqContent {
    title: string
    subtitle: string
    items: FaqItem[]
}

export const DEFAULT_FAQ: FaqContent = {
    title: 'Pertanyaan yang Sering Diajukan',
    subtitle: 'Informasi penting seputar layanan, BPJS, pendaftaran, dan jadwal praktek.',
    items: [
        { question: 'Apakah klinik menerima BPJS?', answer: 'Ya, kami menerima BPJS untuk layanan yang memenuhi syarat.' },
        { question: 'Bagaimana cara mendaftar antrian online?', answer: 'Anda dapat mendaftar melalui menu Daftar Online di website ini.' },
        { question: 'Apa saja dokumen yang perlu dibawa?', answer: 'Bawa KTP, kartu BPJS (jika ada), surat rujukan, dan rekam medis sebelumnya.' },
    ],
}

export interface ContactContent {
    clinic_name: string
    tagline: string
    address: string
    phone: string
    email: string
    emergency_text: string
}

export const DEFAULT_CONTACT: ContactContent = {
    clinic_name: 'Klinik Utama Harapan Bunda',
    tagline: 'Melayani dengan Sepenuh Hati',
    address: 'Jln. Pondok Pesantren Km.2 Sungai Kambut, Kec. Pulau Punjung, Kabupaten Dharmasraya, Sumatera Barat 27614',
    phone: '',
    email: '',
    emergency_text: 'Layanan Darurat Tersedia 24 Jam',
}
