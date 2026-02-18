import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ACCA FAQs - Lakshya ACCA',
  description: 'Your go-to guide for ACCA Initial Registration (IR) process. Step-by-step answers for Registration, Payments, and Document Requirements.',
}

export default function HomePage() {
  return (
    <div className="home-page-container">
      <Navbar />
      <main>
        <div className="hero-section">
          <div className="hero-container">
            {/* Text Block */}
            <div className="hero-text">
              <div className="text-wrapper">
                <h1>ACCA – IR :</h1>
                <h2>Process</h2>
                <h3>Skill &amp; P Level Category</h3>
                <h4>(For Offline / Online / UAE Hybrid batches)</h4>
                <p>
                  <strong>ACCA Initial Registration (IR)</strong> is the process of officially
                  enrolling with the ACCA to begin your journey towards a globally recognized
                  accounting qualification.
                </p>
                <p>
                  It involves creating a <strong>MyACCA account</strong>, completing an application
                  form, uploading the necessary documents, and paying the registration fees.
                </p>
                <p>
                  <em>Welcome to your go-to guide for everything related to ACCA Initial Registration!</em>
                </p>
              </div>
            </div>

            {/* Image Block */}
            <div className="hero-image-col">
              <div className="image-wrapper">
                <Image
                  src="/mamitha.png"
                  alt="ACCA Ambassador"
                  width={650}
                  height={700}
                  className="profile-image"
                  priority
                  style={{ width: '650px', height: 'auto' }}
                />
              </div>
              <div className="info-box">
                Whether you&apos;re just getting started or stuck somewhere in the process — we&apos;ve
                got you covered with step-by-step answers. 👇
                <div style={{ marginTop: '15px' }}>
                  <Link href="/faqs" className="faq-button">
                    Click for FAQs
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

