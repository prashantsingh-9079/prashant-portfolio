import { useRef } from 'react'
import { motion, type Variants, type Easing } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import './CurrentlyBuilding.css'

const EASE_OUT: Easing = [0.16, 1, 0.3, 1]

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: 0.1 + i * 0.1,
      ease: EASE_OUT,
    },
  }),
}

export default function CurrentlyBuilding() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { threshold: 0.15 })

  const handleExplore = (e: React.MouseEvent) => {
    e.preventDefault()
    const target = document.querySelector('#projects')
    target?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="building" ref={sectionRef} className="building">
      <div className="building__glow" aria-hidden="true" />

      <div className="building__inner">
        {/* Header */}
        <div className="building__header">
          <motion.div
            className="building__badge"
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={0}
          >
            <span className="building__badge-pulse" />
            <span className="building__badge-text">In Active Development</span>
          </motion.div>

          <motion.h2
            className="building__title"
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={1}
          >
            Currently Building.
          </motion.h2>

          <motion.p
            className="building__sub"
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={2}
          >
            A dedicated preview of the primary system I am engineering right now.
          </motion.p>
        </div>

        {/* Showcase Card */}
        <motion.div
          className="building__card"
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          custom={3}
        >
          {/* Left / Info Side */}
          <div className="building__info">
            <div className="building__status-row">
              <span className="building__project-num">FEATURED BUILD</span>
              <span className="building__status-tag">
                <span className="building__status-dot" />
                STATUS: IN PROGRESS
              </span>
            </div>

            <h3 className="building__project-name">PennyFlow AI</h3>

            <p className="building__project-desc">
              An AI-powered personal finance platform designed to help people understand, manage and improve their money.
            </p>

            <p className="building__project-note">
              PennyFlow connects raw transactional data with intelligent Gemini processing to deliver contextual explanations, automated categorization, and actionable savings guidance. Currently undergoing architecture refinement and frontend testing.
            </p>

            {/* Tags */}
            <div className="building__tags">
              {['React', 'TypeScript', 'Python', 'Gemini AI', 'Financial Data', 'In Progress'].map(tag => (
                <span key={tag} className="building__tag">
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="building__cta-wrap">
              <a
                href="#projects"
                onClick={handleExplore}
                className="building__cta-btn"
                data-cursor="hover"
              >
                <span>Explore Project Details</span>
                <span className="building__cta-arrow">→</span>
              </a>
              <span className="building__disclaimer">
                ● Work in progress · Not publicly launched yet
              </span>
            </div>
          </div>

          {/* Right / Preview Area */}
          <div className="building__preview">
            <div className="building__preview-screen">
              {/* Screen Top Bar */}
              <div className="building__screen-bar">
                <div className="building__screen-dots">
                  <span className="building__dot building__dot--r" />
                  <span className="building__dot building__dot--y" />
                  <span className="building__dot building__dot--g" />
                </div>
                <span className="building__screen-title">pennyflow-core :: dev branch</span>
                <span className="building__live-pill">LIVE BUILD</span>
              </div>

              {/* Mock Dashboard UI */}
              <div className="building__screen-body">
                <div className="building__metric-row">
                  <div className="building__metric-box">
                    <span className="building__metric-lbl">Analysis Pipeline</span>
                    <span className="building__metric-val">Gemini 1.5 Flash</span>
                  </div>
                  <div className="building__metric-box">
                    <span className="building__metric-lbl">Model Latency</span>
                    <span className="building__metric-val building__metric-val--green">~320ms</span>
                  </div>
                </div>

                {/* Animated Stream Bars */}
                <div className="building__stream-box">
                  <span className="building__stream-title">Transaction Categorization Stream</span>
                  <div className="building__bars">
                    {[45, 78, 62, 90, 52, 84, 70, 95, 60, 88].map((h, idx) => (
                      <motion.div
                        key={idx}
                        className="building__bar"
                        style={{ height: `${h}%` }}
                        animate={{
                          height: [`${h * 0.7}%`, `${h}%`, `${h * 0.85}%`],
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 2.5 + (idx % 3) * 0.5,
                          ease: 'easeInOut',
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Active Insight Box */}
                <div className="building__insight-box">
                  <div className="building__insight-header">
                    <span className="building__insight-icon">✦</span>
                    <span className="building__insight-title">AI Financial Insight</span>
                  </div>
                  <p className="building__insight-text">
                    "Recurring subscriptions account for 18% of monthly discretionary spend. Identified 2 optimization opportunities."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
