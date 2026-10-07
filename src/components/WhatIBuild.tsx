import { useState, useRef } from 'react'
import { motion, type Variants, type Easing } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import './WhatIBuild.css'

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

interface Category {
  id: string
  title: string
  tagline: string
  description: string
  icon: string
  tags: string[]
  accent: string
}

const categories: Category[] = [
  {
    id: 'ai-products',
    title: 'AI PRODUCTS',
    tagline: 'Intelligence embedded in human workflows',
    description: 'Building useful applications around AI and intelligent systems — combining LLM pipelines, prompt engineering, and context retrieval into tools that actually solve problems.',
    icon: '✦',
    tags: ['LLMs', 'Gemini API', 'RAG Pipelines', 'Context Systems'],
    accent: '#818cf8',
  },
  {
    id: 'fintech',
    title: 'FINTECH',
    tagline: 'Financial clarity through software',
    description: 'Exploring technology for personal finance and financial intelligence. Creating platforms that transform dry transaction numbers into intuitive behavioral insights.',
    icon: '◈',
    tags: ['Personal Finance', 'Pattern Analysis', 'Data Modeling', 'UX'],
    accent: '#34d399',
  },
  {
    id: 'real-world',
    title: 'REAL-WORLD PROBLEMS',
    tagline: 'Technology where it matters most',
    description: 'Building technology around practical, grounded problems — from disaster coordination tools to emergency prioritization software that handles chaos calmly.',
    icon: '▲',
    tags: ['Emergency Response', 'Mapping', 'Decision Systems', 'Impact'],
    accent: '#38bdf8',
  },
  {
    id: 'experiments',
    title: 'EXPERIMENTS',
    tagline: 'Learning through rapid prototypes',
    description: 'Small prototypes and experiments created while learning. Testing architectural theories, new libraries, and interface interactions without fear of breaking things.',
    icon: '⬡',
    tags: ['Prototypes', 'Explorations', 'Interactive UIs', 'Proof of Concept'],
    accent: '#c084fc',
  },
]

export default function WhatIBuild() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { threshold: 0.15 })
  const [activeId, setActiveId] = useState<string>(categories[0].id)

  return (
    <section id="what-i-build" ref={sectionRef} className="what-build">
      <div className="what-build__inner">
        {/* Header */}
        <div className="what-build__header">
          <motion.span
            className="what-build__label"
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={0}
          >
            Areas of Focus
          </motion.span>

          <motion.h2
            className="what-build__title"
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={1}
          >
            What I Build.
          </motion.h2>

          <motion.p
            className="what-build__sub"
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={2}
          >
            Four dedicated categories where I direct curiosity, code, and systems design.
          </motion.p>
        </div>

        {/* Interactive Categories Grid */}
        <div className="what-build__grid">
          {categories.map((cat, idx) => {
            const isActive = activeId === cat.id
            return (
              <motion.div
                key={cat.id}
                className={`what-build__card ${isActive ? 'what-build__card--active' : ''}`}
                variants={fadeUp}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                custom={3 + idx}
                onClick={() => setActiveId(cat.id)}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25 }}
                data-cursor="hover"
                style={{
                  '--card-accent': cat.accent,
                } as React.CSSProperties}
              >
                <div className="what-build__card-top">
                  <span className="what-build__card-icon">{cat.icon}</span>
                  <span className="what-build__card-num">0{idx + 1}</span>
                </div>

                <h3 className="what-build__card-title">{cat.title}</h3>
                <span className="what-build__card-tagline">{cat.tagline}</span>

                <p className="what-build__card-desc">{cat.description}</p>

                <div className="what-build__card-tags">
                  {cat.tags.map(t => (
                    <span key={t} className="what-build__card-tag">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="what-build__card-indicator" />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
