import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

const SECRET = process.env.NEXTAUTH_SECRET || 'lakshya-acca-faq-secret-key-2025'

export function signToken(payload: object) {
    return jwt.sign(payload, SECRET, { expiresIn: '8h' })
}

export function verifyToken(token: string) {
    try {
        return jwt.verify(token, SECRET)
    } catch {
        return null
    }
}

export async function getAuthUser() {
    const cookieStore = await cookies()
    const token = cookieStore.get('admin_token')?.value
    if (!token) return null
    return verifyToken(token)
}

export async function requireAuth(request: NextRequest) {
    const token = request.cookies.get('admin_token')?.value
    if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const user = verifyToken(token)
    if (!user) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }
    return null
}
