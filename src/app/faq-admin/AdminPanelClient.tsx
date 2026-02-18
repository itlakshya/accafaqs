'use client'

import { useState, useEffect, FormEvent, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

interface FAQ {
    id: number
    category: string
    question: string
    answer: string
    imageUrl: string | null
    createdAt: string
}

const CATEGORIES = [
    'Registration Process and Steps',
    'Payment and Fee-Related Queries',
    'Document Requirements & Format',
    'Other',
]

function AddFaqForm({ onAdded }: { onAdded: () => void }) {
    const [category, setCategory] = useState(CATEGORIES[0])
    const [customCategory, setCustomCategory] = useState('')
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')
    const [image, setImage] = useState<File | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const fileRef = useRef<HTMLInputElement>(null)

    async function handleSubmit(e: FormEvent) {
        e.preventDefault()
        setError('')
        setSuccess('')
        setLoading(true)

        const finalCategory = category === 'Other' && customCategory ? customCategory : category

        const formData = new FormData()
        formData.append('category', finalCategory)
        formData.append('question', question)
        formData.append('answer', answer)
        if (image) formData.append('image', image)

        try {
            const res = await fetch('/api/faqs', { method: 'POST', body: formData })
            const data = await res.json()
            if (res.ok) {
                setSuccess('FAQ added successfully!')
                setQuestion('')
                setAnswer('')
                setImage(null)
                setCustomCategory('')
                if (fileRef.current) fileRef.current.value = ''
                onAdded()
                setTimeout(() => setSuccess(''), 3000)
            } else {
                setError(data.error || 'Failed to add FAQ')
            }
        } catch {
            setError('Network error. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="admin-form">
            <h2 className="admin-section-title">Add New FAQ</h2>
            {error && <div className="error-msg">{error}</div>}
            {success && <div className="success-msg">{success}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Category</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        {CATEGORIES.map((c) => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                </div>
                {category === 'Other' && (
                    <div className="form-group">
                        <label>Custom Category Name</label>
                        <input
                            type="text"
                            value={customCategory}
                            onChange={(e) => setCustomCategory(e.target.value)}
                            placeholder="Enter custom category"
                        />
                    </div>
                )}
                <div className="form-group">
                    <label>Question *</label>
                    <input
                        type="text"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="Enter the FAQ question"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Answer * (HTML supported)</label>
                    <textarea
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        placeholder="Enter the answer (you can use HTML tags like <strong>, <ul>, <li>, etc.)"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Image (optional)</label>
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileRef}
                        onChange={(e) => setImage(e.target.files?.[0] || null)}
                    />
                </div>
                <button type="submit" className="btn-add" disabled={loading}>
                    {loading ? 'Adding...' : 'Add FAQ'}
                </button>
            </form>
        </div>
    )
}

function EditFaqForm({
    faq,
    onUpdated,
    onCancel,
}: {
    faq: FAQ
    onUpdated: () => void
    onCancel: () => void
}) {
    const [category, setCategory] = useState(
        CATEGORIES.includes(faq.category) ? faq.category : 'Other'
    )
    const [customCategory, setCustomCategory] = useState(
        CATEGORIES.includes(faq.category) ? '' : faq.category
    )
    const [question, setQuestion] = useState(faq.question)
    const [answer, setAnswer] = useState(faq.answer)
    const [image, setImage] = useState<File | null>(null)
    const [deleteImage, setDeleteImage] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    async function handleSubmit(e: FormEvent) {
        e.preventDefault()
        setError('')
        setLoading(true)

        const finalCategory = category === 'Other' && customCategory ? customCategory : category

        const formData = new FormData()
        formData.append('category', finalCategory)
        formData.append('question', question)
        formData.append('answer', answer)
        formData.append('deleteImage', deleteImage ? 'true' : 'false')
        if (image) formData.append('image', image)

        try {
            const res = await fetch(`/api/faqs/${faq.id}`, { method: 'PUT', body: formData })
            const data = await res.json()
            if (res.ok) {
                onUpdated()
            } else {
                setError(data.error || 'Failed to update FAQ')
            }
        } catch {
            setError('Network error. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="edit-form-panel">
            {error && <div className="error-msg">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Category</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        {CATEGORIES.map((c) => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                </div>
                {category === 'Other' && (
                    <div className="form-group">
                        <label>Custom Category Name</label>
                        <input
                            type="text"
                            value={customCategory}
                            onChange={(e) => setCustomCategory(e.target.value)}
                            placeholder="Enter custom category"
                        />
                    </div>
                )}
                <div className="form-group">
                    <label>Question *</label>
                    <input
                        type="text"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Answer * (HTML supported)</label>
                    <textarea
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        required
                    />
                </div>
                {faq.imageUrl && (
                    <div className="form-group">
                        <label>Current Image</label>
                        <div style={{ marginTop: '0.5rem' }}>
                            <img src={faq.imageUrl} alt="Current" style={{ maxHeight: '100px', borderRadius: '6px' }} />
                        </div>
                        <div className="checkbox-row">
                            <input
                                type="checkbox"
                                id={`del-img-${faq.id}`}
                                checked={deleteImage}
                                onChange={(e) => setDeleteImage(e.target.checked)}
                            />
                            <label htmlFor={`del-img-${faq.id}`}>Delete current image</label>
                        </div>
                    </div>
                )}
                <div className="form-group">
                    <label>New Image (optional)</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files?.[0] || null)}
                    />
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                    <button type="submit" className="btn-edit" disabled={loading}>
                        {loading ? 'Saving...' : 'Update FAQ'}
                    </button>
                    <button type="button" className="btn-cancel" onClick={onCancel}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}

function FaqBox({
    faq,
    onDeleted,
    onUpdated,
}: {
    faq: FAQ
    onDeleted: () => void
    onUpdated: () => void
}) {
    const [editing, setEditing] = useState(false)
    const [deleting, setDeleting] = useState(false)

    async function handleDelete() {
        if (!confirm('Are you sure you want to delete this FAQ?')) return
        setDeleting(true)
        try {
            const res = await fetch(`/api/faqs/${faq.id}`, { method: 'DELETE' })
            if (res.ok) {
                onDeleted()
            } else {
                alert('Failed to delete FAQ')
            }
        } catch {
            alert('Network error')
        } finally {
            setDeleting(false)
        }
    }

    return (
        <div className="faq-box">
            <div className="faq-box-header">
                <div className="faq-box-meta">
                    <div className="faq-box-category">{faq.category}</div>
                    <div className="faq-box-question">{faq.question}</div>
                </div>
            </div>

            {faq.imageUrl && (
                <div className="faq-box-image">
                    <img src={faq.imageUrl} alt="FAQ" />
                </div>
            )}

            <div
                className="faq-box-answer"
                dangerouslySetInnerHTML={{ __html: faq.answer }}
            />

            <div className="faq-box-actions">
                <button className="btn-edit" onClick={() => setEditing(!editing)}>
                    {editing ? 'Close Edit' : 'Edit'}
                </button>
                <button className="btn-delete" onClick={handleDelete} disabled={deleting}>
                    {deleting ? 'Deleting...' : 'Delete'}
                </button>
            </div>

            {editing && (
                <EditFaqForm
                    faq={faq}
                    onUpdated={() => {
                        setEditing(false)
                        onUpdated()
                    }}
                    onCancel={() => setEditing(false)}
                />
            )}
        </div>
    )
}

export default function AdminPanelClient() {
    const router = useRouter()
    const [faqs, setFaqs] = useState<FAQ[]>([])
    const [loading, setLoading] = useState(true)
    const [loggingOut, setLoggingOut] = useState(false)

    async function loadFaqs() {
        try {
            const res = await fetch('/api/faqs')
            const data = await res.json()
            setFaqs(data)
        } catch {
            console.error('Failed to load FAQs')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadFaqs()
    }, [])

    async function handleLogout() {
        setLoggingOut(true)
        await fetch('/api/auth/logout', { method: 'POST' })
        router.push('/faq-admin/login')
        router.refresh()
    }

    return (
        <div className="admin-panel-body">
            <div className="admin-panel-header">
                <h1>
                    <i className="fas fa-cog" style={{ marginRight: '0.5rem' }}></i>
                    Custom FAQ Admin Panel
                </h1>
                <button className="btn-logout" onClick={handleLogout} disabled={loggingOut}>
                    {loggingOut ? 'Logging out...' : 'Logout'}
                </button>
            </div>

            <AddFaqForm onAdded={loadFaqs} />

            <h2 className="admin-section-title">
                Existing FAQs ({faqs.length})
            </h2>

            {loading && (
                <p className="no-faqs">Loading FAQs...</p>
            )}

            {!loading && faqs.length === 0 && (
                <p className="no-faqs">No FAQs available. Add your first FAQ above!</p>
            )}

            {!loading && faqs.map((faq) => (
                <FaqBox
                    key={faq.id}
                    faq={faq}
                    onDeleted={loadFaqs}
                    onUpdated={loadFaqs}
                />
            ))}
        </div>
    )
}
