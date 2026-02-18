import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { verifyToken } from '@/lib/auth'
import AdminPanelClient from './AdminPanelClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Admin Panel - Lakshya ACCA FAQs',
    description: 'Admin panel for managing ACCA FAQs',
}

export default async function AdminPanelPage() {
    const cookieStore = await cookies()
    const token = cookieStore.get('admin_token')?.value

    if (!token || !verifyToken(token)) {
        redirect('/faq-admin/login')
    }

    return <AdminPanelClient />
}
