import { useRef } from 'react'
import { motion, useScroll, useTransform, type Variants, type Easing } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import './About.css'

const EASE_OUT: Easing = [0.16, 1, 0.3, 1]

const fadeUpBlur: Variants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  visible: (custom: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.85,
      delay: 0.1 + custom * 0.12,
      ease: EASE_OUT,
    },
  }),
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.9,
      delay: 0.35,
      ease: EASE_OUT,
    },
  },
}

const quickFacts = [
  { label: 'Currently', value: 'Exploring AI / ML', highlight: true },
  { label: 'I enjoy', value: 'Building & experimenting' },
  { label: 'Languages', value: 'Java • Python • JavaScript' },
  { label: 'Interested in', value: 'AI • Web • Startups • Technology' },
  { label: 'Based in', value: 'India' },
  { label: 'Always', value: 'Learning something new', badge: true },
]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { threshold: 0.15 })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const ambientY = useTransform(scrollYProgress, [0, 1], [-30, 40])
  const parallaxTextY = useTransform(scrollYProgress, [0, 1], [25, -25])

  return (
    <section id="about" ref={sectionRef} className="about">
      {/* Background ambient lighting */}
      <motion.div
        className="about__ambient-orb"
        style={{ y: ambientY }}
        aria-hidden="true"
      />
      <div className="about__ambient-grid" aria-hidden="true" />

      <div className="about__inner">
        {/* Top Header */}
        <div className="about__header">
          <motion.span
            className="about__label"
            variants={fadeUpBlur}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={0}
          >
            About Me
          </motion.span>

          <motion.h2
            className="about__headline"
            variants={fadeUpBlur}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={1}
          >
            Something about me.
          </motion.h2>
        </div>

        {/* Two-Column Editorial Grid */}
        <div className="about__grid">
          {/* Left Column: Narrative Content */}
          <motion.div
            className="about__narrative"
            style={{ y: parallaxTextY }}
          >
            {/* Main Lead Introduction */}
            <motion.p
              className="about__intro"
              variants={fadeUpBlur}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              custom={2}
            >
              I'm Prashant Singh — a developer who likes turning ideas into things people can actually use.
            </motion.p>

            {/* Body Paragraphs */}
            <div className="about__body-group">
              <motion.p
                className="about__body"
                variants={fadeUpBlur}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                custom={3}
              >
                I'm currently exploring the intersection of software development, AI, and creative technology. I enjoy building projects from scratch, experimenting with new tools, and learning by actually shipping things.
              </motion.p>

              <motion.p
                className="about__body"
                variants={fadeUpBlur}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                custom={4}
              >
                From building PennyFlow AI to working on FloodMesh, I'm interested in more than just writing code — I like understanding a problem, designing a solution, and seeing it come to life.
              </motion.p>

              <motion.p
                className="about__body"
                variants={fadeUpBlur}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                custom={5}
              >
                I'm still learning, still experimenting, and probably working on something new right now.
              </motion.p>
            </div>

            {/* Closing Statement with Special Visual Emphasis */}
            <motion.div
              className="about__closing"
              variants={fadeUpBlur}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              custom={6}
            >
              <div className="about__closing-glow" aria-hidden="true" />
              <div className="about__closing-bar" />
              <div className="about__closing-content">
                <span className="about__closing-line about__closing-line--1">
                  Curious by nature.
                </span>
                <span className="about__closing-line about__closing-line--2">
                  Builder by choice.
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: "A Little More About Me" Card */}
          <motion.div
            className="about__side"
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <div className="about__card">
              {/* Card Header */}
              <div className="about__card-header">
                <div className="about__card-badge">
                  <span className="about__card-pulse" />
                  <span className="about__card-badge-text">Profile Brief</span>
                </div>
                <h3 className="about__card-title">A little more about me</h3>
              </div>

              {/* Card Divider */}
              <div className="about__card-divider" />

              {/* Key-Value Rows */}
              <div className="about__card-rows">
                {quickFacts.map((fact, index) => (
                  <motion.div
                    key={fact.label}
                    className="about__card-row"
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.5,
                      delay: 0.45 + index * 0.08,
                      ease: EASE_OUT,
                    }}
                  >
                    <span className="about__card-key">{fact.label}</span>
                    <span className="about__card-arrow">→</span>
                    <span
                      className={`about__card-val ${fact.highlight ? 'about__card-val--highlight' : ''}`}
                    >
                      {fact.value}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Card Bottom Accent */}
              <div className="about__card-footer">
                <div className="about__card-tag">Always in building mode</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
