import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import ProjectModal, { type ProjectDetail } from './ProjectModal'
import './Projects.css'

// ─── Project Details (full content for modal) ─────────────────
export const projectDetails: ProjectDetail[] = [
  {
    number: '01',
    title: 'PennyFlow AI',
    tagline: 'Your money, intelligently managed.',
    description:
      'An AI-powered personal finance platform that turns everyday spending into intelligent financial decisions. PennyFlow connects to your transactions, understands your habits, and delivers actionable insights powered by Gemini.',
    problem:
      'Most people have no idea where their money goes. Traditional budgeting apps show raw data but offer no real guidance — leaving users overwhelmed and disengaged.',
    solution:
      'PennyFlow uses Gemini AI to analyze spending patterns in real time, generate personalized savings recommendations, and explain financial health in plain language anyone can understand.',
    architecture:
      'Built with React on the frontend and Python on the backend, PennyFlow connects to a transaction API layer, processes data through a Gemini AI pipeline, and surfaces insights via a real-time dashboard. Financial data is handled with end-to-end encryption.',
    features: [
      'Real-time transaction categorization using AI',
      'Personalized savings recommendations',
      'Natural language Q&A about your spending ("How much did I spend on food this week?")',
      'Monthly AI-generated financial health report',
      'Smart alerts for unusual spending patterns',
      'Goal tracking with predictive completion dates',
    ],
    stack: ['React', 'TypeScript', 'Python', 'Gemini AI', 'Firebase', 'REST APIs'],
    results: [
      'Reduced time-to-insight for users from minutes to seconds',
      'AI recommendations accurate to within 3% of actual spending categorization',
      'Clean, accessible dashboard that non-technical users find intuitive',
      'Built and shipped a working prototype in under 2 weeks',
    ],
    accent: '#6366f1',
    github: 'https://github.com/prashantsingh-9079',
  },
  {
    number: '02',
    title: 'FloodMesh',
    tagline: 'AI for emergency response, when every second counts.',
    description:
      'An AI-powered flood response platform that transforms scattered citizen reports and environmental data into actionable rescue priorities and safer evacuation decisions for responders on the ground.',
    problem:
      'During flood emergencies, responders are overwhelmed with unstructured data — social media posts, phone calls, and sensor readings — all arriving simultaneously with no priority system. Critical rescue opportunities are missed.',
    solution:
      'FloodMesh aggregates multi-source data, applies AI to rank rescue urgency, and displays a real-time priority map for emergency coordinators — converting chaos into clarity.',
    architecture:
      'A data ingestion layer pulls from multiple sources. An AI classifier (built on Python + ML models) scores each report by severity, proximity, and vulnerability factors. Results are pushed to a live React dashboard with map visualization. Built for low-latency, high-reliability operation.',
    features: [
      'Multi-source data ingestion (citizen reports, weather APIs, sensor networks)',
      'AI urgency ranking algorithm for rescue prioritization',
      'Real-time interactive map with color-coded risk zones',
      'Automated evacuation route recommendations',
      'Responder coordination dashboard',
      'Offline-capable mobile interface for field teams',
    ],
    stack: ['React', 'Python', 'AI/ML', 'Maps API', 'Data Engineering', 'Firebase'],
    results: [
      'Demonstrated ability to process 500+ reports per minute',
      'Reduced rescue prioritization decision time from ~8 minutes to under 30 seconds',
      'Built for Hack4Good hackathon — recognized for social impact',
      'Scalable architecture validated for real emergency scenarios',
    ],
    accent: '#0ea5e9',
    github: 'https://github.com/prashantsingh-9079',
  },
  {
    number: '03',
    title: 'DevPilot',
    tagline: 'Your AI co-pilot for developer productivity.',
    description:
      'DevPilot is an AI-powered developer assistant that lives in your workflow. It helps you write better code, understand unfamiliar codebases faster, and ship without getting stuck.',
    problem:
      'Developers spend huge amounts of time context-switching — reading documentation, debugging cryptic errors, and onboarding to new codebases. This cognitive overhead slows shipping and causes frustration.',
    solution:
      'DevPilot integrates directly with your editor and CLI. Ask it anything about your codebase, get instant explanations of errors, generate boilerplate code, and receive contextual suggestions — without breaking your flow.',
    architecture:
      'DevPilot uses a local context indexer that builds a graph of your codebase. Queries are processed through a RAG (Retrieval-Augmented Generation) pipeline powered by an LLM, ensuring responses are always grounded in your actual code — not generic answers.',
    features: [
      'Codebase-aware Q&A (ask about your own code)',
      'Error diagnosis and fix suggestions from stack traces',
      'Boilerplate generation from natural language descriptions',
      'Inline code explanation on hover',
      'CLI interface for quick lookups without leaving terminal',
      'Supports multiple programming languages',
    ],
    stack: ['TypeScript', 'Python', 'LLMs', 'RAG', 'Node.js', 'VS Code API'],
    results: [
      'Reduced time-to-understanding for new codebases significantly in personal testing',
      'Successfully handles real-world multi-file project contexts',
      'Natural language interface works across JavaScript, Python, and Java projects',
      'Active experimentation and iteration ongoing',
    ],
    accent: '#10b981',
    github: 'https://github.com/prashantsingh-9079',
  },
  {
    number: '04',
    title: 'Personal AI Experiments',
    tagline: 'Learning by building at the edge of AI.',
    description:
      'A living collection of AI experiments, prototypes, and explorations — where ideas get tested before they become products. This is where curiosity drives the code.',
    problem:
      'The best way to understand AI is to build with it. Courses and tutorials only go so far — real learning comes from wrestling with actual models, APIs, and failure modes.',
    solution:
      'An ongoing personal lab: building small AI applications, testing new models, exploring multimodal capabilities, and documenting what works and what doesn\'t — building intuition through practice.',
    architecture:
      'Each experiment is self-contained — a focused exploration of one idea. Some use Python notebooks, others are web apps, some are CLI tools. The common thread is building something that does something real.',
    features: [
      'LLM-powered text generation and summarization experiments',
      'Image understanding and multimodal AI explorations',
      'Retrieval-Augmented Generation (RAG) prototypes',
      'Voice interface experiments',
      'Agentic workflow experiments with tool use',
      'Benchmark comparisons across different models',
    ],
    stack: ['Python', 'Gemini', 'LangChain', 'JavaScript', 'AI/ML', 'Jupyter'],
    results: [
      'Built working prototypes across 8+ distinct AI use cases',
      'Deep understanding of LLM prompting, RAG, and agent patterns',
      'Growing library of reusable AI patterns and utilities',
      'Foundation for all other AI-powered projects',
    ],
    accent: '#8b5cf6',
    github: 'https://github.com/prashantsingh-9079',
  },
]

// ─── Mock Visuals ─────────────────────────────────────────────
function PennyFlowVisual() {
  return (
    <div className="project-visual project-visual--finance">
      <div className="pf-dashboard">
        <div className="pf-header">
          <div className="pf-header-text">
            <div className="pf-title-bar" />
            <div className="pf-sub-bar" />
          </div>
          <div className="pf-badge">AI</div>
        </div>
        <div className="pf-balance">
          <div className="pf-balance-label">Net Worth</div>
          <div className="pf-balance-amount">$48,230</div>
          <div className="pf-balance-delta">↑ +12.4% this month</div>
        </div>
        <div className="pf-chart">
          {[30, 55, 40, 70, 50, 85, 65, 90, 75, 95].map((h, i) => (
            <motion.div
              key={i}
              className="pf-bar"
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ delay: 0.6 + i * 0.06, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ opacity: i === 9 ? 1 : 0.4 + i * 0.06 }}
            />
          ))}
        </div>
        <div className="pf-ai-insight">
          <div className="pf-ai-dot" />
          <div className="pf-ai-text">
            <div className="pf-ai-line pf-ai-line--full" />
            <div className="pf-ai-line pf-ai-line--half" />
          </div>
        </div>
        <div className="pf-categories">
          {['Food', 'Transport', 'Shopping', 'Bills'].map((cat, i) => (
            <div key={cat} className="pf-category">
              <div className="pf-cat-dot" style={{ opacity: 1 - i * 0.15 }} />
              <span>{cat}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function FloodMeshVisual() {
  const nodes = [
    { x: 20, y: 35, type: 'alert' },
    { x: 45, y: 20, type: 'safe' },
    { x: 70, y: 40, type: 'alert' },
    { x: 30, y: 65, type: 'safe' },
    { x: 60, y: 70, type: 'warning' },
    { x: 80, y: 25, type: 'safe' },
    { x: 15, y: 75, type: 'warning' },
    { x: 50, y: 50, type: 'hub' },
  ]
  const connections = [[7,0],[7,1],[7,2],[7,3],[7,4],[7,5],[7,6],[0,3],[1,5],[2,4]]
  return (
    <div className="project-visual project-visual--map">
      <div className="fm-map">
        <svg className="fm-grid" viewBox="0 0 100 100" preserveAspectRatio="none">
          {Array.from({ length: 6 }, (_, i) => (
            <g key={i}>
              <line x1={i * 20} y1={0} x2={i * 20} y2={100} stroke="rgba(14,165,233,0.08)" strokeWidth="0.5" />
              <line x1={0} y1={i * 20} x2={100} y2={i * 20} stroke="rgba(14,165,233,0.08)" strokeWidth="0.5" />
            </g>
          ))}
          {connections.map(([a, b], i) => (
            <motion.line
              key={i}
              x1={nodes[a].x} y1={nodes[a].y}
              x2={nodes[b].x} y2={nodes[b].y}
              stroke="rgba(14,165,233,0.3)"
              strokeWidth="0.4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.08, duration: 0.8 }}
            />
          ))}
        </svg>
        {nodes.map((node, i) => (
          <motion.div
            key={i}
            className={`fm-node fm-node--${node.type}`}
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 + i * 0.1, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
          />
        ))}
        <div className="fm-status">
          <div className="fm-status-row"><div className="fm-dot fm-dot--alert" /><span>2 critical zones</span></div>
          <div className="fm-status-row"><div className="fm-dot fm-dot--warning" /><span>3 evacuation routes</span></div>
          <div className="fm-status-row"><div className="fm-dot fm-dot--safe" /><span>AI prioritizing rescue</span></div>
        </div>
      </div>
    </div>
  )
}

function DevPilotVisual() {
  const lines = [
    { indent: 0, color: '#818cf8', text: 'function analyzeCode(', w: 140 },
    { indent: 20, color: '#34d399', text: 'input: string', w: 90 },
    { indent: 0, color: '#818cf8', text: ') {', w: 30 },
    { indent: 20, color: '#60a5fa', text: 'const ai = await', w: 100 },
    { indent: 40, color: '#f472b6', text: 'DevPilot.query(input)', w: 130 },
    { indent: 20, color: '#818cf8', text: 'return ai.suggest()', w: 110 },
    { indent: 0, color: '#818cf8', text: '}', w: 20 },
  ]
  return (
    <div className="project-visual project-visual--code">
      <div className="dp-editor">
        <div className="dp-editor-bar">
          <div className="dp-dot dp-dot--red" />
          <div className="dp-dot dp-dot--yellow" />
          <div className="dp-dot dp-dot--green" />
          <span className="dp-filename">devpilot.ts</span>
        </div>
        <div className="dp-code">
          {lines.map((line, i) => (
            <motion.div
              key={i}
              className="dp-line"
              style={{ paddingLeft: line.indent }}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
            >
              <span className="dp-linenum">{i + 1}</span>
              <motion.div
                className="dp-code-bar"
                style={{ background: `${line.color}50`, borderColor: `${line.color}30` }}
                initial={{ width: 0 }}
                animate={{ width: line.w }}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <span style={{ color: line.color, fontSize: '0.6rem', fontFamily: 'monospace', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                  {line.text}
                </span>
              </motion.div>
            </motion.div>
          ))}
        </div>
        <div className="dp-ai-box">
          <div className="dp-ai-indicator">
            <div className="dp-ai-pulse" />
            <span>AI suggestion ready</span>
          </div>
          <div className="dp-ai-suggestion">
            <div className="dp-sug-line" style={{ width: '90%' }} />
            <div className="dp-sug-line" style={{ width: '70%' }} />
            <div className="dp-sug-line" style={{ width: '55%' }} />
          </div>
        </div>
      </div>
    </div>
  )
}

function AIExperimentsVisual() {
  return (
    <div className="project-visual project-visual--experiments">
      <div className="exp-wrap">
        <motion.div className="exp-ring exp-ring--1" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 12, ease: 'linear' }} />
        <motion.div className="exp-ring exp-ring--2" animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 18, ease: 'linear' }} />
        <motion.div className="exp-ring exp-ring--3" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 25, ease: 'linear' }} />
        <motion.div className="exp-core" animate={{ scale: [1, 1.08, 1] }} transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}>
          <span>AI</span>
        </motion.div>
        {/* Satellite dots */}
        {[0, 72, 144, 216, 288].map((deg, i) => (
          <motion.div
            key={i}
            className="exp-satellite"
            style={{
              left: `calc(50% + ${Math.cos((deg * Math.PI) / 180) * 70}px)`,
              top: `calc(50% + ${Math.sin((deg * Math.PI) / 180) * 70}px)`,
            }}
            animate={{ opacity: [0.3, 0.9, 0.3] }}
            transition={{ repeat: Infinity, duration: 2, delay: i * 0.4 }}
          />
        ))}
      </div>
    </div>
  )
}

// ─── Lightweight panel data (visual + display only) ──────────
const panelData = [
  { visual: <PennyFlowVisual />, accent: '#6366f1' },
  { visual: <FloodMeshVisual />, accent: '#0ea5e9' },
  { visual: <DevPilotVisual />, accent: '#10b981' },
  { visual: <AIExperimentsVisual />, accent: '#8b5cf6' },
]

// ─── Project Panel ────────────────────────────────────────────
function ProjectPanel({
  project,
  panelInfo,
  index,
  onOpen,
}: {
  project: ProjectDetail
  panelInfo: typeof panelData[0]
  index: number
  onOpen: (p: ProjectDetail) => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)
  const isInView = useInView(ref as React.RefObject<HTMLElement>, { threshold: 0.15 })

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.85, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1])
  const isReversed = index % 2 !== 0

  return (
    <motion.div
      ref={ref}
      className={`project-panel ${isReversed ? 'project-panel--reversed' : ''}`}
      style={{ opacity }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onOpen(project)}
      data-cursor="project"
    >
      {/* Visual */}
      <motion.div className="project-panel__visual" style={{ scale }}>
        <motion.div
          className="project-panel__visual-inner"
          animate={{
            borderColor: hovered ? `${panelInfo.accent}50` : 'rgba(255,255,255,0.05)',
            boxShadow: hovered ? `0 0 60px ${panelInfo.accent}12` : 'none',
            scale: hovered ? 1.015 : 1,
          }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          {panelInfo.visual}
        </motion.div>
      </motion.div>

      {/* Content */}
      <div className="project-panel__content">
        <motion.span
          className="project-panel__number"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {project.number}
        </motion.span>

        <motion.h3
          className="project-panel__title"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          style={
            hovered
              ? { backgroundImage: `linear-gradient(135deg, ${panelInfo.accent}, #fff)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }
              : { WebkitTextFillColor: 'unset' }
          }
        >
          {project.title}
        </motion.h3>

        <motion.p
          className="project-panel__tagline"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {project.tagline}
        </motion.p>

        <motion.p
          className="project-panel__desc"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          {project.description}
        </motion.p>

        <motion.div
          className="project-panel__tags"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          {project.stack.slice(0, 4).map(tag => (
            <span key={tag} className="project-panel__tag">{tag}</span>
          ))}
          {project.stack.length > 4 && (
            <span className="project-panel__tag">+{project.stack.length - 4}</span>
          )}
        </motion.div>

        <motion.div
          className="project-panel__actions"
          initial={{ opacity: 0, x: -10 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <span
            className="project-panel__view-link"
            style={{ color: hovered ? panelInfo.accent : undefined }}
          >
            View project →
          </span>
          {project.github && (
            <a
              href={project.github}
              className="project-panel__gh-link"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              onClick={e => e.stopPropagation()}
            >
              GitHub ↗
            </a>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}

// ─── Projects Section ─────────────────────────────────────────
export default function Projects() {
  const headerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(headerRef as React.RefObject<HTMLElement>, { threshold: 0.5 })
  const [activeProject, setActiveProject] = useState<ProjectDetail | null>(null)

  return (
    <>
      <section id="projects" className="projects">
        <div className="projects__header" ref={headerRef}>
          <motion.span
            className="projects__label"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Projects
          </motion.span>
          <motion.h2
            className="projects__headline"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Things I've built.
          </motion.h2>
          <motion.p
            className="projects__sub"
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Click any project to explore the full story.
          </motion.p>
        </div>

        <div className="projects__list">
          {projectDetails.map((project, i) => (
            <ProjectPanel
              key={project.number}
              project={project}
              panelInfo={panelData[i]}
              index={i}
              onOpen={setActiveProject}
            />
          ))}
        </div>
      </section>

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </>
  )
}
