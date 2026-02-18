import { Suspense } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FaqsClient from './FaqsClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'ACCA Frequently Asked Questions - Lakshya',
    description: 'Find answers to all your ACCA Initial Registration questions — Registration Process, Payment Queries, and Document Requirements.',
}

export default function FaqsPage() {
    return (
        <>
            <Navbar />
            <main>
                <Suspense fallback={
                    <div style={{ textAlign: 'center', color: 'white', padding: '3rem', fontSize: '1.2rem' }}>
                        Loading FAQs...
                    </div>
                }>
                    <FaqsClient />
                </Suspense>
            </main>
            <Footer />
        </>
    )
}
