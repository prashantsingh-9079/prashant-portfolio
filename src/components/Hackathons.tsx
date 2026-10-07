import { useRef } from 'react'
import { motion, type Variants, type Easing } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import './Hackathons.css'

const EASE_OUT: Easing = [0.16, 1, 0.3, 1]

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: 0.1 + i * 0.1,
      ease: EASE_OUT,
    },
  }),
}

interface HackathonEntry {
  title: string
  role: string
  theme: string
  description: string
  tags: string[]
  accent: string
  github?: string
  status: 'Completed Build' | 'Next Sprint'
  isPlaceholder?: boolean
}

const entries: HackathonEntry[] = [
  {
    title: 'FloodMesh',
    role: 'AI & Data Integration',
    theme: 'AI-assisted disaster response & decision support',
    description:
      'Engineered during an emergency response build sprint. FloodMesh aggregates disparate citizen reports, environmental sensor inputs, and open map layers to help emergency coordinators prioritize rescue dispatches during intense flooding scenarios.',
    tags: ['Python', 'AI / ML', 'Emergency Response', 'Mapping', 'Decision Support'],
    accent: '#0ea5e9',
    github: 'https://github.com/prashantsingh-9079',
    status: 'Completed Build',
  },
  {
    title: 'Next Collaborative Sprint',
    role: 'Builder / Participant',
    theme: 'Open Problem Space',
    description:
      'Actively preparing for upcoming national and global hackathons focused on generative AI systems, developer infrastructure, and social impact tools. Ready to team up and ship under pressure.',
    tags: ['Teamwork', 'Rapid Prototyping', '48hr Sprint', 'AI Systems'],
    accent: '#818cf8',
    status: 'Next Sprint',
    isPlaceholder: true,
  },
]

export default function Hackathons() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { threshold: 0.15 })

  return (
    <section id="hackathons" ref={sectionRef} className="hackathons">
      <div className="hackathons__inner">
        {/* Header */}
        <div className="hackathons__header">
          <motion.span
            className="hackathons__label"
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={0}
          >
            Collaborative Building
          </motion.span>

          <motion.h2
            className="hackathons__title"
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={1}
          >
            Hackathons & Building.
          </motion.h2>

          <motion.p
            className="hackathons__sub"
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={2}
          >
            Sprint-based collaborative environments where ideas are pressured into working prototypes in hours.
          </motion.p>
        </div>

        {/* Entries Grid */}
        <div className="hackathons__grid">
          {entries.map((item, idx) => (
            <motion.div
              key={item.title}
              className={`hackathons__card ${item.isPlaceholder ? 'hackathons__card--placeholder' : ''}`}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              custom={3 + idx}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25 }}
              style={{ '--accent-color': item.accent } as React.CSSProperties}
            >
              <div className="hackathons__card-header">
                <span className="hackathons__status-pill">
                  <span className="hackathons__status-dot" />
                  {item.status}
                </span>
                <span className="hackathons__role">{item.role}</span>
              </div>

              <h3 className="hackathons__card-title">{item.title}</h3>
              <span className="hackathons__theme">{item.theme}</span>

              <p className="hackathons__desc">{item.description}</p>

              <div className="hackathons__tags">
                {item.tags.map(t => (
                  <span key={t} className="hackathons__tag">
                    {t}
                  </span>
                ))}
              </div>

              {item.github && (
                <div className="hackathons__footer">
                  <a
                    href={item.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hackathons__link"
                    data-cursor="hover"
                  >
                    View Project on GitHub →
                  </a>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
