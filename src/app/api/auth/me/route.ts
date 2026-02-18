import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function GET() {
    const user = await getAuthUser()
    if (!user) {
        return NextResponse.json({ authenticated: false })
    }
    return NextResponse.json({ authenticated: true, user })
}
