'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'

interface FAQ {
    id: number
    category: string
    question: string
    answer: string
    imageUrl: string | null
}

const CATEGORY_ORDER = [
    'Registration Process and Steps',
    'Payment and Fee-Related Queries',
    'Document Requirements & Format',
]

function groupFaqs(faqs: FAQ[], selectedCategory?: string) {
    const grouped: Record<string, FAQ[]> = {}

    if (selectedCategory) {
        grouped[selectedCategory] = faqs.filter((f) => f.category === selectedCategory)
        return grouped
    }

    for (const cat of CATEGORY_ORDER) {
        const items = faqs.filter((f) => f.category === cat)
        if (items.length > 0) grouped[cat] = items
    }

    const others = faqs.filter((f) => !CATEGORY_ORDER.includes(f.category))
    if (others.length > 0) grouped['Other'] = others

    return grouped
}

function FAQItem({
    faq,
    isOpen,
    onToggle,
}: {
    faq: FAQ
    isOpen: boolean
    onToggle: () => void
}) {
    return (
        <div className="faq-block">
            <div
                className="faq-question"
                role="button"
                aria-expanded={isOpen}
                onClick={onToggle}
            >
                <div className="faq-question-text">{faq.question}</div>
                <span className={`faq-chevron ${isOpen ? 'open' : ''}`}>
                    <i className="fas fa-chevron-down"></i>
                </span>
            </div>
            {isOpen && (
                <div className="faq-answer">
                    <div className="faq-answer-content">
                        <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
                        {faq.imageUrl && (
                            <div className="faq-image">
                                <img src={faq.imageUrl} alt="FAQ illustration" />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

function CategoryGroup({
    category,
    faqs,
    defaultOpen,
}: {
    category: string
    faqs: FAQ[]
    defaultOpen: boolean
}) {
    const [groupOpen, setGroupOpen] = useState(defaultOpen)
    const [openFaqId, setOpenFaqId] = useState<number | null>(null)

    return (
        <div className="faq-group">
            <div className="category-header" onClick={() => setGroupOpen(!groupOpen)}>
                <span>{category}</span>
                <span className={`category-chevron ${groupOpen ? 'open' : ''}`}>
                    <i className="fas fa-chevron-down"></i>
                </span>
            </div>
            {groupOpen && (
                <div>
                    {faqs.map((faq) => (
                        <FAQItem
                            key={faq.id}
                            faq={faq}
                            isOpen={openFaqId === faq.id}
                            onToggle={() => setOpenFaqId(openFaqId === faq.id ? null : faq.id)}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}


export default function FaqsClient() {
    const searchParams = useSearchParams()
    const selectedCategory = searchParams.get('category') || undefined

    const [faqs, setFaqs] = useState<FAQ[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        fetch('/api/faqs')
            .then((r) => r.json())
            .then((data) => {
                setFaqs(data)
                setLoading(false)
            })
            .catch(() => {
                setError('Failed to load FAQs. Please try again.')
                setLoading(false)
            })
    }, [])

    const grouped = groupFaqs(faqs, selectedCategory)
    const pageTitle = selectedCategory
        ? `ACCA FAQs - ${selectedCategory}`
        : 'ACCA Frequently Asked Questions'

    return (
        <div className="faq-page-container">
            <h1 className="faq-page-title" aria-label={pageTitle}>
                {pageTitle}
            </h1>

            {loading && (
                <p style={{ textAlign: 'center', color: 'white', fontSize: '1.2rem' }}>
                    Loading FAQs...
                </p>
            )}

            {error && (
                <p style={{ textAlign: 'center', color: '#ffc107', fontSize: '1.1rem' }}>{error}</p>
            )}

            {!loading && !error && Object.keys(grouped).length === 0 && (
                <p style={{ textAlign: 'center', color: 'white', fontSize: '1.1rem' }}>
                    No ACCA FAQs available at the moment.
                </p>
            )}

            {!loading &&
                Object.entries(grouped).map(([category, items], idx) => (
                    <CategoryGroup
                        key={category}
                        category={category}
                        faqs={items}
                        defaultOpen={idx === 0}
                    />
                ))}
        </div>
    )
}
