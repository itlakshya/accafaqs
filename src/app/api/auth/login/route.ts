import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { signToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
    try {
        const { username, password } = await request.json()

        if (!username || !password) {
            return NextResponse.json({ error: 'Username and password are required' }, { status: 400 })
        }

        const user = await prisma.user.findUnique({ where: { username } })
        if (!user) {
            return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 })
        }

        const isValid = await bcrypt.compare(password, user.password)
        if (!isValid) {
            return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 })
        }

        const token = signToken({ id: user.id, username: user.username })

        const response = NextResponse.json({ success: true, message: 'Login successful' })
        response.cookies.set('admin_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 8, // 8 hours
            path: '/',
        })

        return response
    } catch (error) {
        console.error('Login error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
