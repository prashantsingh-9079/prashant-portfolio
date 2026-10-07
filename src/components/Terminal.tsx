import { useRef, useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import './Terminal.css'

// ─── Command responses ────────────────────────────────────────
type CommandResult = string[]

const commands: Record<string, CommandResult> = {
  help: [
    '  Available commands:',
    '',
    '  whoami      — About Prashant Singh',
    '  about       — More about me',
    '  projects    — List of projects',
    '  skills      — Tech stack',
    '  stack       — Technologies I use',
    '  contact     — Get in touch',
    '  pennyflow   — About PennyFlow AI',
    '  floodmesh   — About FloodMesh',
    '  devpilot    — About DevPilot',
    '  building    — What I am currently building',
    '  lab         — Experiments in The Lab',
    '  resume      — Resume status',
    '  clear       — Clear terminal',
    '',
    '  Or ask naturally:',
    '  "who is prashant singh"',
    '  "what does he build"',
    '  "what technologies does he use"',
  ],
  building: [
    '  Currently Building: PennyFlow AI',
    '  ────────────────────────────────',
    '  Status:  IN PROGRESS (Active Development)',
    '  Concept: AI-powered personal finance platform to help people',
    '           understand, manage and improve their money.',
    '  Tech:    React, TypeScript, Python, Gemini AI, Financial Data',
  ],
  lab: [
    '  The Lab — Experiments & Prototypes',
    '  ──────────────────────────────────',
    '  01 → AI Experiments (Prompt chaining & structured LLM output)',
    '  02 → Generative AI (Multimodal perception & retrieval)',
    '  03 → Web Experiments (Canvas shaders & motion systems)',
    '  04 → ML Experiments (Data classification & models)',
    '  05 → Random Ideas (Conceptual architecture & proofs-of-concept)',
  ],
  resume: [
    '  Resume Status',
    '  ─────────────',
    '  Currently updating with recent project builds and technical systems.',
    '  Connect directly via email: prashantsingh51406@gmail.com',
    '  Or LinkedIn: https://www.linkedin.com/in/prashant-singh-8b9538235/',
  ],
  whoami: [
    '  Prashant Singh',
    '  Developer • AI Enthusiast • Builder',
    '',
    '  I build intelligent things at the intersection',
    '  of software, AI, and product design.',
    '  Currently exploring GenAI & real-world AI applications.',
    '',
    '  Based in India. Constantly shipping.',
  ],
  about: [
    '  About Prashant Singh',
    '  ─────────────',
    '  I don\'t just learn technology — I build with it.',
    '',
    '  Developer who cares deeply about what gets built.',
    '  From the architecture underneath to the experience on top.',
    '',
    '  → AI enthusiast who uses AI for real problems',
    '  → Hackathon participant & product builder',
    '  → Continuous learner, always shipping',
    '  → Based in India, available for interesting work',
  ],
  projects: [
    '  01 → PennyFlow AI',
    '        AI-powered personal finance platform',
    '        Stack: React, Gemini, Python, Firebase',
    '',
    '  02 → FloodMesh',
    '        AI flood response & rescue prioritization',
    '        Stack: React, Python, AI/ML, Maps API',
    '',
    '  03 → DevPilot',
    '        AI developer productivity assistant',
    '        Stack: TypeScript, Python, LLMs, RAG',
    '',
    '  04 → Personal AI Experiments',
    '        Lab of AI prototypes & explorations',
    '        Stack: Python, Gemini, JavaScript',
  ],
  skills: [
    '  Languages:    Java • Python • JavaScript • TypeScript',
    '  Frontend:     React • HTML • CSS • Vite',
    '  Backend:      Node.js • REST APIs',
    '  AI/ML:        Machine Learning • GenAI • LLMs • RAG',
    '  Tools:        Git • GitHub • Firebase • Figma',
    '  Exploring:    Agents • Multimodal AI • Data Science',
  ],
  stack: [
    '  Primary Stack',
    '  ─────────────',
    '  Language:   Python, JavaScript, TypeScript, Java',
    '  Frontend:   React + TypeScript + CSS',
    '  AI:         Gemini, LLMs, RAG pipelines',
    '  Data:       Firebase, REST APIs',
    '  Tooling:    Git, GitHub, Vite, VS Code',
    '',
    '  Currently learning: Agents, LangChain, Data Science',
  ],
  contact: [
    '  Ways to reach me:',
    '',
    '  GitHub    → https://github.com/prashantsingh-9079',
    '  LinkedIn  → https://www.linkedin.com/in/prashant-singh-8b9538235/',
    '  Email     → prashantsingh51406@gmail.com',
    '',
    '  Open to interesting projects, collabs & conversations.',
  ],
  pennyflow: [
    '  PennyFlow AI — Personal Finance Platform',
    '  ─────────────────────────────────────────',
    '  Problem:  People don\'t know where their money goes.',
    '  Solution: AI that understands your spending & advises you.',
    '',
    '  Key features:',
    '  → Real-time transaction categorization',
    '  → Natural language financial Q&A (Gemini-powered)',
    '  → Personalized savings recommendations',
    '  → Smart spending alerts',
    '',
    '  Stack: React, Python, Gemini AI, Firebase',
  ],
  floodmesh: [
    '  FloodMesh — AI Emergency Response Platform',
    '  ───────────────────────────────────────────',
    '  Problem:  Flood responders overwhelmed by unstructured data.',
    '  Solution: AI that ranks rescue urgency from chaotic inputs.',
    '',
    '  Key features:',
    '  → Multi-source data ingestion (reports, sensors, weather)',
    '  → AI urgency ranking algorithm',
    '  → Real-time priority map for coordinators',
    '  → Automated evacuation route recommendations',
    '',
    '  Built for Hack4Good — recognized for social impact.',
  ],
  devpilot: [
    '  DevPilot — AI Developer Productivity Assistant',
    '  ───────────────────────────────────────────────',
    '  Problem:  Developers lose hours to context-switching.',
    '  Solution: AI co-pilot that understands your actual codebase.',
    '',
    '  Key features:',
    '  → Codebase-aware Q&A (ask about YOUR code)',
    '  → Error diagnosis from stack traces',
    '  → Boilerplate generation from natural language',
    '  → CLI interface — no browser required',
    '',
    '  Stack: TypeScript, Python, LLMs, RAG, Node.js',
  ],
}

// ─── Natural language matcher ─────────────────────────────────
function matchNaturalLanguage(input: string): CommandResult | null {
  const q = input.toLowerCase()

  if (q.includes('who is') || q.includes('who are') || q.includes('tell me about prashant') || q.includes('prashant singh')) {
    return commands['about']
  }
  if (q.includes('what does he build') || q.includes('what do you build') || q.includes('what have you built')) {
    return commands['projects']
  }
  if (q.includes('what technolog') || q.includes('what stack') || q.includes('what languages') || q.includes('what tools')) {
    return commands['stack']
  }
  if (q.includes('how to contact') || q.includes('how can i reach') || q.includes('email') || q.includes('reach out')) {
    return commands['contact']
  }
  if (q.includes('experience') || q.includes('journey') || q.includes('background')) {
    return [
      '  Prashant Singh\'s journey:',
      '',
      '  01 Learning        → Exploring software from first principles',
      '  02 Building        → Shipping real projects, learning by making',
      '  03 Experimenting   → Fast prototypes & unconventional ideas',
      '  04 Hackathons      → High-pressure sprints (FloodMesh)',
      '  05 AI / ML         → LLMs, prompt pipelines, context systems',
      '  06 Product Building→ End-to-end applications (PennyFlow AI)',
    ]
  }
  if (q.includes('ai') && (q.includes('interested') || q.includes('passionate') || q.includes('love'))) {
    return [
      '  AI is at the center of everything I build.',
      '',
      '  Not just as a tool — as the core of the product.',
      '  LLMs, RAG, agents, multimodal AI, GenAI platforms.',
      '  I build AI systems that solve real problems.',
    ]
  }
  return null
}

interface HistoryEntry {
  id: number
  type: 'input' | 'output' | 'error'
  content: string
}

let idCounter = 0

export default function Terminal() {
  const sectionRef = useRef<HTMLElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const isInView = useInView(sectionRef, { threshold: 0.2 })

  const [history, setHistory] = useState<HistoryEntry[]>([
    { id: idCounter++, type: 'output', content: '  Welcome to Prashant Singh\'s portfolio terminal.' },
    { id: idCounter++, type: 'output', content: '  Type "help" to see available commands.' },
    { id: idCounter++, type: 'output', content: '  Or ask a question naturally — try "who is prashant singh?"' },
    { id: idCounter++, type: 'output', content: '' },
  ])
  const [input, setInput] = useState('')
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [isTyping, setIsTyping] = useState(false)

  // Auto-run demo sequence once in view
  const demoRan = useRef(false)
  useEffect(() => {
    if (!isInView || demoRan.current) return
    demoRan.current = true

    const demo = async () => {
      await sleep(800)
      await typeCommand('whoami')
      await sleep(300)
      runCommand('whoami')
      await sleep(1400)
      await typeCommand('projects')
      await sleep(300)
      runCommand('projects')
      await sleep(1400)
      await typeCommand('stack')
      await sleep(300)
      runCommand('stack')
    }

    demo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView])

  function sleep(ms: number) {
    return new Promise(r => setTimeout(r, ms))
  }

  async function typeCommand(cmd: string) {
    setIsTyping(true)
    setInput('')
    for (let i = 0; i <= cmd.length; i++) {
      setInput(cmd.slice(0, i))
      await sleep(55 + Math.random() * 35)
    }
    setIsTyping(false)
  }

  const runCommand = useCallback((cmd: string) => {
    const trimmed = cmd.trim().toLowerCase()

    const inputEntry: HistoryEntry = {
      id: idCounter++,
      type: 'input',
      content: cmd.trim(),
    }

    if (trimmed === 'clear') {
      setHistory([])
      setInput('')
      return
    }

    // Try exact command first, then natural language
    const directResult = commands[trimmed]
    const nlResult = !directResult ? matchNaturalLanguage(trimmed) : null
    const result = directResult ?? nlResult

    const outputEntries: HistoryEntry[] = result
      ? result.map(line => ({ id: idCounter++, type: 'output' as const, content: line }))
      : [
          { id: idCounter++, type: 'error', content: `  command not found: ${cmd.trim()}` },
          { id: idCounter++, type: 'output', content: '  Try "help" for available commands, or ask naturally.' },
        ]

    setHistory(prev => [...prev, inputEntry, ...outputEntries, { id: idCounter++, type: 'output', content: '' }])
    setCommandHistory(prev => [cmd.trim(), ...prev])
    setHistoryIndex(-1)
    setInput('')
  }, [])

  // Scroll to bottom on new output
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim()) {
      runCommand(input)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const next = Math.min(historyIndex + 1, commandHistory.length - 1)
      setHistoryIndex(next)
      setInput(commandHistory[next] ?? '')
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const next = Math.max(historyIndex - 1, -1)
      setHistoryIndex(next)
      setInput(next === -1 ? '' : (commandHistory[next] ?? ''))
    }
  }

  return (
    <section ref={sectionRef} className="terminal-section">
      <div className="terminal-section__inner">
        {/* Header */}
        <div className="terminal-section__header">
          <motion.span
            className="terminal-section__label"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Interactive
          </motion.span>
          <motion.h2
            className="terminal-section__headline"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Ask my portfolio.
          </motion.h2>
          <motion.p
            className="terminal-section__sub"
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Type <code>help</code>, <code>pennyflow</code>, <code>devpilot</code> — or ask naturally like{' '}
            <code>what does he build?</code>
          </motion.p>
        </div>

        {/* Terminal */}
        <motion.div
          className="terminal"
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Title bar */}
          <div className="terminal__bar">
            <div className="terminal__dots">
              <div className="terminal__dot terminal__dot--red" />
              <div className="terminal__dot terminal__dot--yellow" />
              <div className="terminal__dot terminal__dot--green" />
            </div>
            <span className="terminal__title">prashant-singh — portfolio</span>
          </div>

          {/* Output */}
          <div
            ref={terminalRef}
            className="terminal__output"
            onClick={() => inputRef.current?.focus()}
          >
            {history.map(entry => (
              <div key={entry.id} className={`terminal__line terminal__line--${entry.type}`}>
                {entry.type === 'input' && (
                  <span className="terminal__prompt">
                    <span className="terminal__prompt-user">prashant</span>
                    <span className="terminal__prompt-at">@</span>
                    <span className="terminal__prompt-host">portfolio</span>
                    <span className="terminal__prompt-arrow"> $ </span>
                  </span>
                )}
                {entry.content}
              </div>
            ))}

            {/* Input line */}
            <div className="terminal__line terminal__line--input terminal__input-line">
              <span className="terminal__prompt">
                <span className="terminal__prompt-user">prashant</span>
                <span className="terminal__prompt-at">@</span>
                <span className="terminal__prompt-host">portfolio</span>
                <span className="terminal__prompt-arrow"> $ </span>
              </span>
              <span className="terminal__input-display">{input}</span>
              {!isTyping && <span className="terminal__cursor" />}
              <input
                ref={inputRef}
                className="terminal__hidden-input"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                aria-label="Terminal input"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
