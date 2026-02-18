import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Seeding database...')

    // Create admin user
    const adminUsername = process.env.ADMIN_USERNAME || 'admin'
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'
    const hashedPassword = await bcrypt.hash(adminPassword, 10)

    const existingUser = await prisma.user.findUnique({ where: { username: adminUsername } })
    if (!existingUser) {
        await prisma.user.create({
            data: { username: adminUsername, password: hashedPassword },
        })
        console.log(`✅ Admin user created: ${adminUsername}`)
    } else {
        console.log(`ℹ️  Admin user already exists: ${adminUsername}`)
    }

    // Seed sample FAQs
    const faqCount = await prisma.fAQ.count()
    if (faqCount === 0) {
        await prisma.fAQ.createMany({
            data: [
                {
                    category: 'Registration Process and Steps',
                    question: 'What is ACCA Initial Registration (IR)?',
                    answer: '<p><strong>ACCA Initial Registration (IR)</strong> is the process of officially enrolling with ACCA to begin your journey towards the globally recognized ACCA qualification.</p><p>It involves creating a <strong>MyACCA account</strong>, completing an online application, uploading required documents, and paying the registration fees.</p>',
                },
                {
                    category: 'Registration Process and Steps',
                    question: 'How do I create a MyACCA account?',
                    answer: '<p>To create a MyACCA account:</p><ol><li>Visit <strong>myacca.accaglobal.com</strong></li><li>Click on <strong>"Register"</strong></li><li>Fill in your personal details (name, date of birth, email)</li><li>Set a strong password</li><li>Verify your email address</li></ol><p>Once verified, you can log in and begin your registration application.</p>',
                },
                {
                    category: 'Registration Process and Steps',
                    question: 'What is the timeline for ACCA registration?',
                    answer: '<p>The ACCA registration process typically takes <strong>3–5 working days</strong> after all documents are submitted correctly.</p><p>Key deadlines:</p><ul><li>Exam entry deadlines are usually <strong>2 months before</strong> the exam session</li><li>Registration can be done at any time of the year</li></ul>',
                },
                {
                    category: 'Payment and Fee-Related Queries',
                    question: 'What are the ACCA registration fees?',
                    answer: '<p>ACCA registration involves the following fees (approximate):</p><ul><li><strong>Registration Fee:</strong> £89 (one-time)</li><li><strong>Annual Subscription:</strong> £122 per year</li><li><strong>Exam Entry Fees:</strong> Vary by paper and level</li></ul><p>Fees are subject to change. Always check the official ACCA website for the latest fee structure.</p>',
                },
                {
                    category: 'Payment and Fee-Related Queries',
                    question: 'What payment methods are accepted by ACCA?',
                    answer: '<p>ACCA accepts the following payment methods:</p><ul><li>Credit/Debit Card (Visa, Mastercard)</li><li>PayPal</li><li>Bank Transfer (for certain regions)</li></ul><p>All payments are processed in <strong>GBP (British Pounds)</strong>. Your bank may apply currency conversion charges.</p>',
                },
                {
                    category: 'Document Requirements & Format',
                    question: 'What documents are required for ACCA registration?',
                    answer: '<p>The following documents are required for ACCA Initial Registration:</p><ul><li><strong>Proof of Identity:</strong> Passport or National ID card</li><li><strong>Academic Certificates:</strong> 10th and 12th mark sheets / certificates</li><li><strong>Passport-size photograph</strong></li></ul><p>All documents must be <strong>clear, legible scans</strong> in PDF or JPEG format.</p>',
                },
                {
                    category: 'Document Requirements & Format',
                    question: 'What is the accepted file format for document uploads?',
                    answer: '<p>ACCA accepts documents in the following formats:</p><ul><li><strong>PDF</strong> (preferred)</li><li><strong>JPEG/JPG</strong></li><li><strong>PNG</strong></li></ul><p>Maximum file size: <strong>2MB per document</strong>. Ensure documents are clearly readable before uploading.</p>',
                },
            ],
        })
        console.log('✅ Sample FAQs created')
    } else {
        console.log(`ℹ️  FAQs already exist (${faqCount} records), skipping seed`)
    }

    console.log('✅ Database seeding complete!')
}

main()
    .catch((e) => {
        console.error('❌ Seeding failed:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
