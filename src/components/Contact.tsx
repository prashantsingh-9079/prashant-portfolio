import { useRef, useCallback } from 'react'
import { motion, useMotionValue, useSpring, type Variants, type Easing } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import './Contact.css'

const EASE_OUT: Easing = [0.16, 1, 0.3, 1]

// ─── Magnetic Button ──────────────────────────────────────────
function MagneticButton({
  children,
  href,
  variant = 'ghost',
  label,
}: {
  children: React.ReactNode
  href: string
  variant?: 'primary' | 'ghost'
  label?: string
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { damping: 20, stiffness: 200 })
  const springY = useSpring(y, { damping: 20, stiffness: 200 })

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    x.set((e.clientX - cx) * 0.35)
    y.set((e.clientY - cy) * 0.35)
  }, [x, y])

  const handleMouseLeave = useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`contact-btn contact-btn--${variant}`}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      data-cursor="hover"
      aria-label={label}
    >
      {children}
    </motion.a>
  )
}

// ─── Contact Section ──────────────────────────────────────────
export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { threshold: 0.25 })

  const wordVariants: Variants = {
    hidden: { opacity: 0, y: 50, filter: 'blur(10px)' },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 1,
        delay: 0.2 + i * 0.12,
        ease: EASE_OUT,
      },
    }),
  }

  const line1 = ['Have', 'an', 'idea?']
  const line2 = ["Let's", 'build', 'it.']

  return (
    <section id="contact" ref={sectionRef} className="contact">
      {/* Ambient glow */}
      <div className="contact__glow" aria-hidden="true" />

      <div className="contact__inner">
        {/* Identity label */}
        <motion.span
          className="contact__label"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Prashant Singh
        </motion.span>

        {/* Big text */}
        <div className="contact__headline-wrap">
          <h2 className="contact__headline">
            <span className="contact__line">
              {line1.map((word, i) => (
                <motion.span
                  key={word + i}
                  className="contact__word"
                  variants={wordVariants}
                  initial="hidden"
                  animate={isInView ? 'visible' : 'hidden'}
                  custom={i}
                >
                  {word}
                </motion.span>
              ))}
            </span>
            <span className="contact__line contact__line--2">
              {line2.map((word, i) => (
                <motion.span
                  key={word + i}
                  className={`contact__word ${i === 2 ? 'contact__word--accent' : ''}`}
                  variants={wordVariants}
                  initial="hidden"
                  animate={isInView ? 'visible' : 'hidden'}
                  custom={i + 3}
                >
                  {word}
                </motion.span>
              ))}
            </span>
          </h2>
        </div>

        {/* Subtext */}
        <motion.p
          className="contact__sub"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          I'm Prashant Singh — open to projects, collaborations, and interesting conversations.
          Reach out — I'd love to hear from you.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="contact__buttons"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
        >
          <MagneticButton
            href="https://github.com/prashantsingh-9079"
            variant="ghost"
            label="GitHub profile"
          >
            <GithubIcon />
            GitHub
          </MagneticButton>

          <MagneticButton
            href="https://www.linkedin.com/in/prashant-singh-8b9538235/"
            variant="ghost"
            label="LinkedIn profile"
          >
            <LinkedInIcon />
            LinkedIn
          </MagneticButton>

          <MagneticButton
            href="mailto:prashantsingh51406@gmail.com"
            variant="primary"
            label="Send email"
          >
            <EmailIcon />
            Say hello
          </MagneticButton>
        </motion.div>

        {/* Resume CTA & Status */}
        <motion.div
          className="contact__resume-wrap"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <span className="contact__resume-pill">
            <span className="contact__resume-dot" />
            Resume: Currently updating with active build projects
          </span>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer
        className="contact__footer"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 1.4 }}
      >
        <span>© 2026 Prashant Singh. Built with React + Framer Motion.</span>
        <span>Made with ♥ and a lot of coffee.</span>
      </motion.footer>
    </section>
  )
}

// ─── Icons ────────────────────────────────────────────────────
function GithubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function EmailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}
