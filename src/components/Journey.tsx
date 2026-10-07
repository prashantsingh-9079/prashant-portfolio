import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import './Journey.css'

interface Milestone {
  step: string
  year: string
  title: string
  description: string
  accent: string
  isFuture?: boolean
}

const milestones: Milestone[] = [
  {
    step: '01',
    year: 'Learning',
    title: 'Curiosity First',
    description: 'Began exploring software from first principles — languages, data structures, and how computing actually works.',
    accent: '#6366f1',
  },
  {
    step: '02',
    year: 'Building',
    title: 'First Real Projects',
    description: 'Shifted from passive tutorials to shipping real things. Discovered that the fastest way to understand an idea is to build it.',
    accent: '#818cf8',
  },
  {
    step: '03',
    year: 'Experimenting',
    title: 'Rapid Prototyping',
    description: 'Building small proof-of-concepts, trying out new libraries, and testing novel interface interactions without hesitation.',
    accent: '#38bdf8',
  },
  {
    step: '04',
    year: 'Hackathons',
    title: 'High-Pressure Sprints',
    description: 'Collaborative hackathons building functional prototypes under tight time constraints (including FloodMesh).',
    accent: '#a78bfa',
  },
  {
    step: '05',
    year: 'AI / ML',
    title: 'Intelligence & LLMs',
    description: 'Integrating machine learning, LLM prompt pipelines, contextual retrieval, and generative AI into practical workflows.',
    accent: '#c084fc',
  },
  {
    step: '06',
    year: 'Product Building',
    title: 'End-to-End Systems',
    description: 'Crafting coherent, polished platforms that solve genuine problems from the architecture underneath to the UI (e.g. PennyFlow AI).',
    accent: '#f472b6',
    isFuture: true,
  },
]

export default function Journey() {
  const sectionRef = useRef<HTMLElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(headerRef as React.RefObject<HTMLElement>, { threshold: 0.3 })

  const { scrollXProgress } = useScroll({
    container: scrollRef,
  })

  const lineWidth = useTransform(scrollXProgress, [0, 1], ['0%', '100%'])

  return (
    <section id="journey" ref={sectionRef} className="journey">
      <div className="journey__header" ref={headerRef}>
        <div className="journey__header-inner">
          <motion.span
            className="journey__label"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Journey
          </motion.span>
          <motion.h2
            className="journey__headline"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            How I got here.
          </motion.h2>
          <motion.p
            className="journey__hint"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Scroll horizontally →
          </motion.p>
        </div>
      </div>

      {/* Horizontal scroll track */}
      <div ref={scrollRef} className="journey__scroll">
        <div className="journey__track">
          {/* Timeline line */}
          <div className="journey__line-bg" />
          <motion.div className="journey__line-fill" style={{ width: lineWidth }} />

          {/* Cards */}
          {milestones.map((m, i) => (
            <motion.div
              key={m.year}
              className={`journey__card ${m.isFuture ? 'journey__card--future' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{
                duration: 0.7,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -4 }}
            >
              <div
                className="journey__card-dot"
                style={{ background: m.accent, boxShadow: `0 0 12px ${m.accent}60` }}
              />
              <div className="journey__card-content">
                <div className="journey__card-meta">
                  <span className="journey__step">{m.step}</span>
                  <span
                    className="journey__year"
                    style={{ color: m.accent }}
                  >
                    {m.year}
                  </span>
                </div>
                <h3 className="journey__card-title">{m.title}</h3>
                <p className="journey__card-desc">{m.description}</p>
              </div>
            </motion.div>
          ))}

          {/* End spacer */}
          <div className="journey__end-pad" />
        </div>
      </div>
    </section>
  )
}
