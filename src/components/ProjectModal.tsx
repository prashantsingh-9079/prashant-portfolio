import { useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence, type Variants, type Easing } from 'framer-motion'
import './ProjectModal.css'

// ─── Shared types ─────────────────────────────────────────────
export interface ProjectDetail {
  number: string
  title: string
  tagline: string
  description: string
  problem: string
  solution: string
  architecture: string
  features: string[]
  stack: string[]
  results: string[]
  accent: string
  github?: string
  demo?: string
}

const EASE_OUT: Easing = [0.16, 1, 0.3, 1]

const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.35 } },
  exit: { opacity: 0, transition: { duration: 0.3, delay: 0.1 } },
}

const panelVariants: Variants = {
  hidden: { opacity: 0, y: 60, scale: 0.97 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.55, ease: EASE_OUT },
  },
  exit: {
    opacity: 0, y: 40, scale: 0.97,
    transition: { duration: 0.3, ease: EASE_OUT },
  },
}

interface ProjectModalProps {
  project: ProjectDetail | null
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  // Lock body scroll
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden'
      if (scrollRef.current) scrollRef.current.scrollTop = 0
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [project])

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose()
  }, [onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="modal-overlay"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={handleBackdropClick}
          role="dialog"
          aria-modal="true"
          aria-label={project.title}
        >
          <motion.div
            className="modal-panel"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Close button */}
            <button className="modal-close" onClick={onClose} aria-label="Close" data-cursor="hover">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Scrollable content */}
            <div ref={scrollRef} className="modal-scroll">
              {/* Hero band */}
              <div
                className="modal-hero"
                style={{ '--accent': project.accent } as React.CSSProperties}
              >
                <div className="modal-hero__glow" />
                <div className="modal-hero__content">
                  <span className="modal-number">{project.number}</span>
                  <h2 className="modal-title">{project.title}</h2>
                  <p className="modal-tagline">{project.tagline}</p>
                  <div className="modal-stack">
                    {project.stack.map(t => (
                      <span key={t} className="modal-tag">{t}</span>
                    ))}
                  </div>
                  {/* Links */}
                  <div className="modal-links">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="modal-link modal-link--ghost"
                        data-cursor="hover"
                      >
                        <GithubIcon /> GitHub
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="modal-link modal-link--primary"
                        data-cursor="hover"
                      >
                        <ExternalIcon /> Live Demo
                      </a>
                    )}
                    {!project.demo && (
                      <span className="modal-link modal-link--disabled">
                        <ExternalIcon /> Demo Coming Soon
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Body sections */}
              <div className="modal-body">
                <ModalSection title="Overview" delay={0}>
                  <p className="modal-text">{project.description}</p>
                </ModalSection>

                <div className="modal-grid">
                  <ModalSection title="The Problem" delay={0.05}>
                    <p className="modal-text">{project.problem}</p>
                  </ModalSection>
                  <ModalSection title="The Solution" delay={0.1}>
                    <p className="modal-text">{project.solution}</p>
                  </ModalSection>
                </div>

                <ModalSection title="Architecture & Approach" delay={0.1}>
                  <p className="modal-text">{project.architecture}</p>
                </ModalSection>

                <ModalSection title="Key Features" delay={0.15}>
                  <ul className="modal-list">
                    {project.features.map(f => (
                      <li key={f} className="modal-list-item">
                        <span className="modal-list-dot" style={{ background: project.accent }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </ModalSection>

                <ModalSection title="Results & Impact" delay={0.2}>
                  <ul className="modal-list">
                    {project.results.map(r => (
                      <li key={r} className="modal-list-item">
                        <span className="modal-list-dot" style={{ background: project.accent }} />
                        {r}
                      </li>
                    ))}
                  </ul>
                </ModalSection>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function ModalSection({
  title,
  children,
  delay = 0,
}: {
  title: string
  children: React.ReactNode
  delay?: number
}) {
  return (
    <motion.div
      className="modal-section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 + delay, ease: EASE_OUT }}
    >
      <h3 className="modal-section-title">{title}</h3>
      {children}
    </motion.div>
  )
}

function GithubIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

function ExternalIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  )
}
