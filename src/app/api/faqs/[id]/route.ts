import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'
import { writeFile, mkdir, unlink } from 'fs/promises'
import path from 'path'

export const dynamic = 'force-dynamic'

// PUT update FAQ (admin only)
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const authError = await requireAuth(request)
    if (authError) return authError

    try {
        const { id } = await params
        const faqId = parseInt(id)
        const formData = await request.formData()

        const category = formData.get('category') as string
        const question = formData.get('question') as string
        const answer = formData.get('answer') as string
        const imageFile = formData.get('image') as File | null
        const deleteImage = formData.get('deleteImage') === 'true'

        const existingFaq = await prisma.fAQ.findUnique({ where: { id: faqId } })
        if (!existingFaq) {
            return NextResponse.json({ error: 'FAQ not found' }, { status: 404 })
        }

        let imageUrl = existingFaq.imageUrl

        // Delete existing image if requested
        if (deleteImage && existingFaq.imageUrl) {
            try {
                const filePath = path.join(process.cwd(), 'public', existingFaq.imageUrl)
                await unlink(filePath)
            } catch { }
            imageUrl = null
        }

        // Upload new image
        if (imageFile && imageFile.size > 0) {
            // Delete old image first
            if (existingFaq.imageUrl) {
                try {
                    const filePath = path.join(process.cwd(), 'public', existingFaq.imageUrl)
                    await unlink(filePath)
                } catch { }
            }
            const bytes = await imageFile.arrayBuffer()
            const buffer = Buffer.from(bytes)
            const uploadDir = path.join(process.cwd(), 'public', 'uploads')
            await mkdir(uploadDir, { recursive: true })
            const filename = `${Date.now()}-${imageFile.name.replace(/\s/g, '_')}`
            await writeFile(path.join(uploadDir, filename), buffer)
            imageUrl = `/uploads/${filename}`
        }

        const faq = await prisma.fAQ.update({
            where: { id: faqId },
            data: { category, question, answer, imageUrl },
        })

        return NextResponse.json(faq)
    } catch (error) {
        console.error('Error updating FAQ:', error)
        return NextResponse.json({ error: 'Failed to update FAQ' }, { status: 500 })
    }
}

// DELETE FAQ (admin only)
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const authError = await requireAuth(request)
    if (authError) return authError

    try {
        const { id } = await params
        const faqId = parseInt(id)

        const existingFaq = await prisma.fAQ.findUnique({ where: { id: faqId } })
        if (!existingFaq) {
            return NextResponse.json({ error: 'FAQ not found' }, { status: 404 })
        }

        // Delete associated image
        if (existingFaq.imageUrl) {
            try {
                const filePath = path.join(process.cwd(), 'public', existingFaq.imageUrl)
                await unlink(filePath)
            } catch { }
        }

        await prisma.fAQ.delete({ where: { id: faqId } })
        return NextResponse.json({ success: true, message: 'FAQ deleted successfully' })
    } catch (error) {
        console.error('Error deleting FAQ:', error)
        return NextResponse.json({ error: 'Failed to delete FAQ' }, { status: 500 })
    }
}
