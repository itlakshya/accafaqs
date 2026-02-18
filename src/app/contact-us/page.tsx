import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Contact Us - Lakshya ACCA FAQs',
    description: 'Contact Lakshya ACCA branch admins for help with ACCA registration. Available Mon-Sat, 9AM-5:30PM IST.',
}

export default function ContactUsPage() {
    return (
        <>
            <Navbar />
            <main>
                <div className="contact-card">
                    <h2>
                        <i className="fas fa-headset"></i> Still Need Help?{' '}
                        <span style={{ color: '#00d9ff' }}>Contact Us!</span>
                    </h2>

                    <div className="contact-info">
                        <p>
                            <i className="fas fa-envelope" style={{ color: '#00d9ff', marginRight: '10px' }}></i>
                            <strong>Email:</strong>{' '}
                            <a href="mailto:cbe.cok@iiclakshya.com">cbe.cok@iiclakshya.com</a>
                        </p>

                        <p>
                            <i className="fas fa-phone-alt" style={{ color: '#00d9ff', marginRight: '10px' }}></i>
                            <strong>Call:</strong> Reach out to your assigned CBE admin:
                        </p>

                        <ul>
                            <li>
                                <i className="fas fa-user" style={{ color: '#ffc107', marginRight: '8px' }}></i>
                                <strong>Kiran A P (Thrissur)</strong> :{' '}
                                <a href="tel:9074556910">9074556910</a>
                            </li>
                            <li>
                                <i className="fas fa-user" style={{ color: '#ffc107', marginRight: '8px' }}></i>
                                <strong>Arun Harikumar (Kottayam)</strong> :{' '}
                                <a href="tel:9074557389">9074557389</a>
                            </li>
                            <li>
                                <i className="fas fa-user" style={{ color: '#ffc107', marginRight: '8px' }}></i>
                                <strong>Jayasree Jayaraj (Kochi)</strong> :{' '}
                                <a href="tel:9074557388">9074557388</a>
                            </li>
                            <li>
                                <i className="fas fa-user" style={{ color: '#ffc107', marginRight: '8px' }}></i>
                                <strong>Akash (Trivandrum)</strong> :{' '}
                                <a href="tel:9778467017">9778467017</a>
                            </li>
                            <li>
                                <i className="fas fa-user" style={{ color: '#ffc107', marginRight: '8px' }}></i>
                                <strong>Nasna (Calicut)</strong> :{' '}
                                <a href="tel:9847507888">9847507888</a>
                            </li>
                            <li>
                                <i className="fas fa-user" style={{ color: '#ffc107', marginRight: '8px' }}></i>
                                <strong>Aishwarya (Kannur)</strong> :{' '}
                                <a href="tel:9778467252">9778467252</a>
                            </li>
                        </ul>

                        <p>
                            <i className="fas fa-mobile-alt" style={{ color: '#00d9ff', marginRight: '10px' }}></i>
                            Online Students can contact any of these numbers.
                        </p>

                        <p>
                            <i className="fas fa-clock" style={{ color: '#00d9ff', marginRight: '10px' }}></i>
                            <strong>Response Time:</strong> 9:00 AM – 5:30 PM, IST (Mon – Sat)
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}
