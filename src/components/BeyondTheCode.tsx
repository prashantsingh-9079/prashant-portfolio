import { useRef } from 'react'
import { motion, type Variants, type Easing } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import './BeyondTheCode.css'

const EASE_OUT: Easing = [0.16, 1, 0.3, 1]

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: 0.1 + i * 0.08,
      ease: EASE_OUT,
    },
  }),
}

interface Pillar {
  number: string
  title: string
  description: string
  accent: string
}

const pillars: Pillar[] = [
  {
    number: '01',
    title: 'Curiosity',
    description: 'Driven by asking "how does this actually work underneath?" Digging past surface abstractions to build genuine intuition about systems.',
    accent: '#818cf8',
  },
  {
    number: '02',
    title: 'Learning',
    description: 'Holding onto a perpetual beginner mindset. Reading documentation, studying open architectures, and learning rapidly from mistakes.',
    accent: '#38bdf8',
  },
  {
    number: '03',
    title: 'Experimenting',
    description: 'Embracing the courage to write throwaway code, test hypotheses, and discover unexpected solutions by playing at the boundary.',
    accent: '#34d399',
  },
  {
    number: '04',
    title: 'Building',
    description: 'The conviction that shipping real, interactive artifacts teaches more than passive absorption. Ideas matter only when given form.',
    accent: '#f59e0b',
  },
  {
    number: '05',
    title: 'Problem Solving',
    description: 'Anchoring software to human reality. Caring as much about why software is created and who it helps as how elegant the code is.',
    accent: '#c084fc',
  },
]

export default function BeyondTheCode() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { threshold: 0.15 })

  return (
    <section id="beyond" ref={sectionRef} className="beyond">
      <div className="beyond__inner">
        {/* Header */}
        <div className="beyond__header">
          <motion.span
            className="beyond__label"
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={0}
          >
            Human Perspective
          </motion.span>

          <motion.h2
            className="beyond__title"
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={1}
          >
            Beyond The Code.
          </motion.h2>

          <motion.p
            className="beyond__sub"
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={2}
          >
            The values, mindset, and authentic drivers that shape how I approach software, engineering, and collaboration.
          </motion.p>
        </div>

        {/* Pillars Grid */}
        <div className="beyond__grid">
          {pillars.map((p, idx) => (
            <motion.div
              key={p.title}
              className="beyond__card"
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              custom={3 + idx}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25 }}
              style={{ '--pillar-accent': p.accent } as React.CSSProperties}
            >
              <div className="beyond__card-num">{p.number}</div>
              <h3 className="beyond__card-title">{p.title}</h3>
              <p className="beyond__card-desc">{p.description}</p>
              <div className="beyond__card-bar" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
