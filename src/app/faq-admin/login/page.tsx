'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import type { Metadata } from 'next'

export default function AdminLoginPage() {
    const router = useRouter()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e: FormEvent) {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            })

            const data = await res.json()

            if (res.ok) {
                router.push('/faq-admin')
                router.refresh()
            } else {
                setError(data.error || 'Login failed. Please try again.')
            }
        } catch {
            setError('Network error. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="admin-login-body">
            <div className="login-container">
                <Image
                    src="/lakshyawhitelogo.png"
                    alt="Lakshya ACCA Logo"
                    width={160}
                    height={50}
                    className="logo-img"
                    style={{ filter: 'invert(1) sepia(1) saturate(2) hue-rotate(190deg)', height: '60px', width: 'auto' }}
                />
                <h1>Admin Login</h1>
                <p className="subtitle">FAQ Management Panel</p>

                {error && <div className="error-msg">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter username"
                            required
                            autoComplete="username"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                            required
                            autoComplete="current-password"
                        />
                    </div>

                    <button type="submit" className="btn-primary" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    )
}
