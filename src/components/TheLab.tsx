import { useRef } from 'react'
import { motion, type Variants, type Easing } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import './TheLab.css'

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

interface LabExperiment {
  title: string
  focus: string
  description: string
  tags: string[]
  icon: string
  accent: string
}

const experiments: LabExperiment[] = [
  {
    title: 'AI Experiments',
    focus: 'Prompt chaining & structured LLM output',
    description: 'Prototyping multi-step prompt chains, agent tool calling patterns, and parsing JSON contracts directly from large language models.',
    tags: ['Prompt Engineering', 'Structured Output', 'LLM Chains'],
    icon: '⟡',
    accent: '#818cf8',
  },
  {
    title: 'Generative AI',
    focus: 'Multimodal perception & retrieval',
    description: 'Hands-on exploration with the Gemini API, image understanding pipelines, and vector semantic similarity search for context augmentation.',
    tags: ['Gemini API', 'Multimodal', 'Embeddings'],
    icon: '✦',
    accent: '#a78bfa',
  },
  {
    title: 'Web Experiments',
    focus: 'Dynamic canvas shaders & motion systems',
    description: 'Sandbox for custom canvas animations, spring-physics cursor tracking, fluid layouts, and minimal dark-mode digital aesthetic explorations.',
    tags: ['HTML5 Canvas', 'Spring Physics', 'Micro-Interactions'],
    icon: '◈',
    accent: '#38bdf8',
  },
  {
    title: 'ML Experiments',
    focus: 'Data classification & model training loops',
    description: 'Small scikit-learn and Python scripts exploring feature engineering, baseline classification, evaluation metrics, and dataset preprocessing.',
    tags: ['Python', 'Feature Engineering', 'Scikit-Learn'],
    icon: '▲',
    accent: '#34d399',
  },
  {
    title: 'Random Ideas',
    focus: 'Conceptual architecture & quick proofs-of-concept',
    description: 'Scratchpad repository for architectural musings, CLI utilities, workflow automation scripts, and ideas that sparked during late-night building.',
    tags: ['CLI Utilities', 'Scratchpad', 'Proof-of-Concept'],
    icon: '⬡',
    accent: '#f472b6',
  },
]

export default function TheLab() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { threshold: 0.15 })

  return (
    <section id="lab" ref={sectionRef} className="lab">
      <div className="lab__inner">
        {/* Header */}
        <div className="lab__header">
          <motion.span
            className="lab__label"
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={0}
          >
            Digital Sandbox
          </motion.span>

          <motion.h2
            className="lab__title"
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={1}
          >
            The Lab.
          </motion.h2>

          <motion.p
            className="lab__sub"
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={2}
          >
            An ongoing collection of smaller prototypes, experiments, and technical proof-of-concepts that don't need to be full case studies.
          </motion.p>
        </div>

        {/* Experiments Grid */}
        <div className="lab__grid">
          {experiments.map((exp, idx) => (
            <motion.div
              key={exp.title}
              className="lab__card"
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              custom={3 + idx}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25 }}
              style={{ '--exp-accent': exp.accent } as React.CSSProperties}
            >
              <div className="lab__card-header">
                <span className="lab__status-tag">
                  <span className="lab__status-dot" />
                  EXPERIMENT
                </span>
                <span className="lab__icon">{exp.icon}</span>
              </div>

              <h3 className="lab__card-title">{exp.title}</h3>
              <span className="lab__card-focus">{exp.focus}</span>

              <p className="lab__card-desc">{exp.description}</p>

              <div className="lab__card-tags">
                {exp.tags.map(t => (
                  <span key={t} className="lab__tag">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
