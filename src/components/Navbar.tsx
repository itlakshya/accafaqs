'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function Navbar() {
    const [navOpen, setNavOpen] = useState(false)
    const [dropdownOpen, setDropdownOpen] = useState(false)

    return (
        <header>
            <nav>
                <div className="logo">
                    <Link href="/">
                        <Image
                            src="/lakshyawhitelogo.png"
                            alt="Lakshya ACCA Logo"
                            width={160}
                            height={50}
                            style={{ height: '50px', width: 'auto' }}
                            priority
                        />
                    </Link>
                </div>

                <ul className={navOpen ? 'nav-open' : ''}>
                    <li
                        className={`dropdown${dropdownOpen ? ' mobile-open' : ''}`}
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                        <a href="#" onClick={(e) => e.preventDefault()}>
                            Category <i className="fas fa-caret-down"></i>
                        </a>
                        <ul className="dropdown-menu">
                            <li>
                                <Link
                                    href="/faqs?category=Registration+Process+and+Steps"
                                    onClick={() => setNavOpen(false)}
                                >
                                    Registration Process
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/faqs?category=Payment+and+Fee-Related+Queries"
                                    onClick={() => setNavOpen(false)}
                                >
                                    Payment Queries
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/faqs?category=Document+Requirements+%26+Format"
                                    onClick={() => setNavOpen(false)}
                                >
                                    Document Requirements
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <Link href="/faqs" onClick={() => setNavOpen(false)}>
                            All FAQs
                        </Link>
                    </li>
                    <li>
                        <Link href="/contact-us" onClick={() => setNavOpen(false)}>
                            📞 Contact Us
                        </Link>
                    </li>
                </ul>

                <button
                    className="hamburger"
                    onClick={() => setNavOpen(!navOpen)}
                    aria-label="Toggle navigation"
                >
                    <i className={`fas ${navOpen ? 'fa-times' : 'fa-bars'}`}></i>
                </button>
            </nav>
        </header>
    )
}
