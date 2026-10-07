import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Navigation.css'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Journey', href: '#journey' },
  { label: 'Projects', href: '#projects' },
  { label: 'Lab', href: '#lab' },
  { label: 'Learning', href: '#learning' },
  { label: 'Contact', href: '#contact' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [showResumeNotice, setShowResumeNotice] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLinkClick = (href: string) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleResumeClick = () => {
    setShowResumeNotice(true)
    setTimeout(() => {
      setShowResumeNotice(false)
    }, 4500)
  }

  return (
    <>
      <motion.nav
        className={`nav ${scrolled ? 'nav--scrolled' : ''}`}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="nav__inner">
          {/* Logo */}
          <a
            href="#"
            className="nav__logo"
            onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            data-cursor="hover"
            aria-label="Home"
          >
            P
          </a>

          {/* Desktop links */}
          <ul className="nav__links">
            {navLinks.map(link => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="nav__link"
                  data-cursor="hover"
                  onClick={e => { e.preventDefault(); handleLinkClick(link.href) }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop Actions */}
          <div className="nav__actions">
            <button
              type="button"
              className="nav__resume-btn"
              onClick={handleResumeClick}
              data-cursor="hover"
              title="Resume coming soon"
            >
              Resume
              <span className="nav__resume-pill">Soon</span>
            </button>

            <a
              href="mailto:prashantsingh51406@gmail.com"
              className="nav__cta"
              data-cursor="hover"
            >
              Let's connect
            </a>
          </div>

          {/* Hamburger */}
          <button
            className={`nav__hamburger ${menuOpen ? 'nav__hamburger--open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="nav__mobile"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  className="nav__mobile-link"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={e => { e.preventDefault(); handleLinkClick(link.href) }}
                >
                  {link.label}
                </motion.a>
              ))}

              <div className="nav__mobile-actions">
                <button
                  type="button"
                  className="nav__mobile-resume"
                  onClick={handleResumeClick}
                >
                  Resume <span className="nav__resume-pill">Soon</span>
                </button>
                <a
                  href="mailto:prashantsingh51406@gmail.com"
                  className="nav__mobile-cta"
                >
                  Let's connect →
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Resume Notice Toast */}
      <AnimatePresence>
        {showResumeNotice && (
          <motion.div
            className="resume-notice"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <div className="resume-notice__content">
              <span className="resume-notice__badge">Resume Status</span>
              <p className="resume-notice__text">
                Resume is currently being updated with recent project builds. Feel free to connect directly via Email or LinkedIn!
              </p>
            </div>
            <button
              type="button"
              className="resume-notice__close"
              onClick={() => setShowResumeNotice(false)}
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
