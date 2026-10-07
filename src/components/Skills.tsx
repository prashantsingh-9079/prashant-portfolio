import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import './Skills.css'

// ─── Skill data ───────────────────────────────────────────────
interface Skill {
  id: string
  label: string
  description: string
  isCore?: boolean
  angle?: number
  radius?: number
  category?: string
}

const skills: Skill[] = [
  {
    id: 'ai',
    label: 'AI / ML',
    description: 'Building intelligent systems using LLMs, ML models, agents, and GenAI tools for real-world impact.',
    isCore: true,
    category: 'Core',
  },
  {
    id: 'python',
    label: 'Python',
    description: 'Primary language for ML pipelines, backend services, data processing, and AI experimentation.',
    angle: 0,
    radius: 165,
    category: 'Language',
  },
  {
    id: 'java',
    label: 'Java',
    description: 'Solid foundation in OOP, system design, and building robust, structured applications.',
    angle: 30,
    radius: 155,
    category: 'Language',
  },
  {
    id: 'js',
    label: 'JavaScript',
    description: 'Full-stack JavaScript — from interactive UIs to server-side logic and browser APIs.',
    angle: 65,
    radius: 170,
    category: 'Language',
  },
  {
    id: 'ts',
    label: 'TypeScript',
    description: 'Type-safe JavaScript for building reliable, maintainable frontend and backend applications.',
    angle: 100,
    radius: 160,
    category: 'Language',
  },
  {
    id: 'react',
    label: 'React',
    description: 'Building modern, performant, component-driven UIs with React, hooks, and the ecosystem.',
    angle: 135,
    radius: 168,
    category: 'Frontend',
  },
  {
    id: 'html',
    label: 'HTML / CSS',
    description: 'Semantic HTML and modern CSS — the craft behind great UI, accessible and responsive.',
    angle: 168,
    radius: 155,
    category: 'Frontend',
  },
  {
    id: 'nodejs',
    label: 'Node.js',
    description: 'Server-side JavaScript for APIs, tooling, CLIs, and building full-stack applications.',
    angle: 200,
    radius: 165,
    category: 'Backend',
  },
  {
    id: 'firebase',
    label: 'Firebase',
    description: 'Real-time databases, authentication, and serverless hosting for rapid product development.',
    angle: 235,
    radius: 158,
    category: 'Backend',
  },
  {
    id: 'git',
    label: 'Git / GitHub',
    description: 'Version control, collaboration, and open source contributions — the backbone of modern dev.',
    angle: 270,
    radius: 168,
    category: 'Tool',
  },
  {
    id: 'genai',
    label: 'GenAI',
    description: 'Working with generative models — LLMs, multimodal AI, Gemini, prompt engineering, and RAG.',
    angle: 305,
    radius: 160,
    category: 'AI',
  },
  {
    id: 'data',
    label: 'Data Science',
    description: 'Data analysis, visualization, and turning raw datasets into useful insights.',
    angle: 340,
    radius: 162,
    category: 'AI',
  },
]

function toRad(deg: number) {
  return (deg * Math.PI) / 180
}

function getNodePosition(skill: Skill, centerX: number, centerY: number) {
  if (skill.isCore) return { x: centerX, y: centerY }
  const angle = toRad(skill.angle ?? 0)
  const r = skill.radius ?? 160
  return {
    x: centerX + r * Math.cos(angle),
    y: centerY + r * Math.sin(angle),
  }
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { threshold: 0.15 })
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [time, setTime] = useState(0)
  const rafRef = useRef<number>(0)

  // Gentle floating animation
  useEffect(() => {
    let start: number
    const animate = (ts: number) => {
      if (!start) start = ts
      setTime((ts - start) / 1000)
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  const getFloatOffset = useCallback((i: number) => {
    const freq = 0.25 + i * 0.06
    const phase = i * 1.1
    return {
      x: Math.sin(time * freq + phase) * 4,
      y: Math.cos(time * freq * 0.75 + phase) * 3.5,
    }
  }, [time])

  const CENTER_X = 300
  const CENTER_Y = 260

  const hoveredSkill = skills.find(s => s.id === hoveredId)

  return (
    <section id="skills" ref={sectionRef} className="skills">
      <div className="skills__inner">
        {/* Header */}
        <div className="skills__header">
          <motion.span
            className="skills__label"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Skills
          </motion.span>
          <motion.h2
            className="skills__headline"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            My toolkit.
          </motion.h2>
          <motion.p
            className="skills__sub"
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Hover any node to learn more. Everything connects to AI.
          </motion.p>
        </div>

        {/* Constellation wrap */}
        <div className="skills__constellation-wrap">
          <motion.div
            className="skills__constellation"
            initial={{ opacity: 0, scale: 0.88 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* SVG connection lines */}
            <svg
              className="skills__svg"
              viewBox="0 0 600 520"
              preserveAspectRatio="xMidYMid meet"
            >
              {skills
                .filter(s => !s.isCore)
                .map((skill, i) => {
                  const pos = getNodePosition(skill, CENTER_X, CENTER_Y)
                  const offset = getFloatOffset(i)
                  const isActive = hoveredId === skill.id || hoveredId === 'ai'
                  return (
                    <motion.line
                      key={skill.id}
                      x1={CENTER_X}
                      y1={CENTER_Y}
                      x2={pos.x + offset.x}
                      y2={pos.y + offset.y}
                      stroke={isActive ? 'rgba(99,102,241,0.55)' : 'rgba(255,255,255,0.06)'}
                      strokeWidth={isActive ? 1.5 : 0.8}
                      strokeDasharray={isActive ? undefined : '3 5'}
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                      transition={{ delay: 0.6 + i * 0.06, duration: 0.8 }}
                      style={{ transition: 'stroke 0.3s, stroke-width 0.3s' }}
                    />
                  )
                })}
            </svg>

            {/* Nodes */}
            {skills.map((skill, i) => {
              const pos = getNodePosition(skill, CENTER_X, CENTER_Y)
              const floatIdx = skill.isCore ? 0 : i
              const offset = skill.isCore ? { x: 0, y: 0 } : getFloatOffset(floatIdx)
              const isHovered = hoveredId === skill.id

              return (
                <motion.div
                  key={skill.id}
                  className={`skill-node ${skill.isCore ? 'skill-node--core' : 'skill-node--satellite'} ${isHovered ? 'skill-node--hovered' : ''}`}
                  style={{
                    left: pos.x + offset.x,
                    top: pos.y + offset.y,
                    transform: 'translate(-50%, -50%)',
                    position: 'absolute',
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    delay: skill.isCore ? 0.45 : 0.65 + i * 0.06,
                    duration: 0.5,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                  onMouseEnter={() => setHoveredId(skill.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  data-cursor="hover"
                >
                  {skill.label}
                </motion.div>
              )
            })}
          </motion.div>

          {/* Tooltip */}
          <AnimatePresence>
            {hoveredSkill && (
              <motion.div
                className="skill-tooltip"
                key={hoveredSkill.id}
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="skill-tooltip__header">
                  <strong>{hoveredSkill.label}</strong>
                  {hoveredSkill.category && (
                    <span className="skill-tooltip__cat">{hoveredSkill.category}</span>
                  )}
                </div>
                <p>{hoveredSkill.description}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
