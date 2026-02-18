export default function Footer() {
    return (
        <footer>
            <p>© 2025 ACCA FAQs. All rights reserved.</p>
            <p>
                <a href="#privacy">Privacy Policy</a> |{' '}
                <a href="#terms">Terms of Service</a> |{' '}
                <a href="/contact-us">Contact Us</a>
            </p>
            <div className="social-icons">
                <a
                    href="https://www.youtube.com/@iiclakshyamalayalam"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Follow us on YouTube"
                >
                    <i className="fab fa-youtube"></i>
                </a>
                <a
                    href="https://www.instagram.com/iiclakshya"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Follow us on Instagram"
                >
                    <i className="fab fa-instagram"></i>
                </a>
                <a
                    href="https://www.facebook.com/lakshyacac"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Follow us on Facebook"
                >
                    <i className="fab fa-facebook"></i>
                </a>
            </div>
        </footer>
    )
}
