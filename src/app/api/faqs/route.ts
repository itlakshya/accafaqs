import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

export const dynamic = 'force-dynamic'

// GET all FAQs (public)
export async function GET() {
    try {
        const faqs = await prisma.fAQ.findMany({
            orderBy: { createdAt: 'asc' },
        })
        return NextResponse.json(faqs)
    } catch (error) {
        console.error('Error fetching FAQs:', error)
        return NextResponse.json({ error: 'Failed to fetch FAQs' }, { status: 500 })
    }
}

// POST create new FAQ (admin only)
export async function POST(request: NextRequest) {
    const authError = await requireAuth(request)
    if (authError) return authError

    try {
        const formData = await request.formData()
        const category = formData.get('category') as string
        const question = formData.get('question') as string
        const answer = formData.get('answer') as string
        const imageFile = formData.get('image') as File | null

        if (!category || !question || !answer) {
            return NextResponse.json({ error: 'Category, question and answer are required' }, { status: 400 })
        }

        let imageUrl: string | null = null

        if (imageFile && imageFile.size > 0) {
            const bytes = await imageFile.arrayBuffer()
            const buffer = Buffer.from(bytes)
            const uploadDir = path.join(process.cwd(), 'public', 'uploads')
            await mkdir(uploadDir, { recursive: true })
            const filename = `${Date.now()}-${imageFile.name.replace(/\s/g, '_')}`
            await writeFile(path.join(uploadDir, filename), buffer)
            imageUrl = `/uploads/${filename}`
        }

        const faq = await prisma.fAQ.create({
            data: { category, question, answer, imageUrl },
        })

        return NextResponse.json(faq, { status: 201 })
    } catch (error) {
        console.error('Error creating FAQ:', error)
        return NextResponse.json({ error: 'Failed to create FAQ' }, { status: 500 })
    }
}
