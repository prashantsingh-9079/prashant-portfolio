import { useEffect, useRef, useCallback } from 'react'
import { motion, useMotionValue, useSpring, type Variants, type Easing } from 'framer-motion'
import './Hero.css'

const EASE_OUT: Easing = [0.16, 1, 0.3, 1]

// ─── Particle Canvas ─────────────────────────────────────────
interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  opacity: number
  baseOpacity: number
}

function createParticles(w: number, h: number, count: number): Particle[] {
  return Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    radius: Math.random() * 1.5 + 0.3,
    opacity: 0,
    baseOpacity: Math.random() * 0.5 + 0.1,
  }))
}

function ParticleCanvas({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const rafRef = useRef<number>(0)
  const mxRef = useRef(mouseX)
  const myRef = useRef(mouseY)

  useEffect(() => { mxRef.current = mouseX }, [mouseX])
  useEffect(() => { myRef.current = mouseY }, [mouseY])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const isMobile = window.matchMedia('(max-width: 768px)').matches
    const count = isMobile ? 40 : 90

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      particlesRef.current = createParticles(canvas.width, canvas.height, count)
    }
    resize()
    window.addEventListener('resize', resize)

    // Orb glow position (slowly drifting)
    let orbX = canvas.width / 2
    let orbY = canvas.height * 0.45
    let orbDx = 0.15
    let orbDy = 0.08

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Drifting orb
      orbX += orbDx
      orbY += orbDy
      if (orbX > canvas.width * 0.7 || orbX < canvas.width * 0.3) orbDx *= -1
      if (orbY > canvas.height * 0.6 || orbY < canvas.height * 0.3) orbDy *= -1

      const grad = ctx.createRadialGradient(orbX, orbY, 0, orbX, orbY, 380)
      grad.addColorStop(0, 'rgba(99, 102, 241, 0.08)')
      grad.addColorStop(0.4, 'rgba(139, 92, 246, 0.04)')
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Mouse interaction orb
      if (mxRef.current > 0) {
        const mGrad = ctx.createRadialGradient(mxRef.current, myRef.current, 0, mxRef.current, myRef.current, 200)
        mGrad.addColorStop(0, 'rgba(99, 102, 241, 0.06)')
        mGrad.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = mGrad
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }

      // Particles
      particlesRef.current.forEach(p => {
        // Mouse repulsion
        const dx = p.x - mxRef.current
        const dy = p.y - myRef.current
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 120 && mxRef.current > 0) {
          const force = (120 - dist) / 120
          p.vx += (dx / dist) * force * 0.15
          p.vy += (dy / dist) * force * 0.15
        }

        p.vx *= 0.98
        p.vy *= 0.98
        p.x += p.vx
        p.y += p.vy

        // Wrap
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        // Fade in
        p.opacity = Math.min(p.opacity + 0.008, p.baseOpacity)

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(160, 162, 255, ${p.opacity})`
        ctx.fill()
      })

      // Grid overlay (very subtle)
      ctx.strokeStyle = 'rgba(255,255,255,0.015)'
      ctx.lineWidth = 1
      const gridSize = 80
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke()
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke()
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    animate()
    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="hero__canvas" aria-hidden="true" />
}

// ─── Text reveal animation config ────────────────────────────
const wordVariants: Variants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(12px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1.1,
      delay: 0.4 + i * 0.15,
      ease: EASE_OUT,
    },
  }),
}

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: 1.3 + i * 0.12,
      ease: EASE_OUT,
    },
  }),
}

// ─── Hero Component ───────────────────────────────────────────
export default function Hero() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 100 })
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 100 })

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    mouseX.set(e.clientX)
    mouseY.set(e.clientY)
  }, [mouseX, mouseY])

  const line1Words = ['I', 'build']
  const line2Words = ['intelligent', 'things.']

  return (
    <section className="hero" onMouseMove={handleMouseMove} aria-label="Hero">
      {/* Particle background */}
      <motion.div
        className="hero__canvas-wrap"
        style={{ x: smoothX, y: smoothY }}
        animate={false}
      >
        <ParticleCanvas mouseX={0} mouseY={0} />
      </motion.div>

      <div className="hero__content">
        {/* Status pill */}
        <motion.div
          className="hero__status"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="hero__status-dot" />
          <span>Available for building</span>
        </motion.div>

        {/* Main headline */}
        <h1 className="hero__headline" aria-label="I build intelligent things.">
          <span className="hero__line">
            {line1Words.map((word, i) => (
              <motion.span
                key={word}
                className="hero__word"
                variants={wordVariants}
                initial="hidden"
                animate="visible"
                custom={i}
              >
                {word}
              </motion.span>
            ))}
          </span>
          <span className="hero__line hero__line--accent">
            {line2Words.map((word, i) => (
              <motion.span
                key={word}
                className={`hero__word ${i === 1 ? 'hero__word--dim' : ''}`}
                variants={wordVariants}
                initial="hidden"
                animate="visible"
                custom={i + 2}
              >
                {word}
              </motion.span>
            ))}
          </span>
        </h1>

        {/* Supporting text */}
        <motion.p
          className="hero__sub"
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          AI • Software • Web • Experiments
        </motion.p>

        <motion.p
          className="hero__tagline"
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          Turning ideas into products with code and AI.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="hero__ctas"
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          <a
            href="#projects"
            className="hero__cta hero__cta--primary"
            data-cursor="hover"
            onClick={e => {
              e.preventDefault()
              document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            View Projects
            <span className="hero__cta-arrow">→</span>
          </a>
          <a
            href="#contact"
            className="hero__cta hero__cta--secondary"
            data-cursor="hover"
            onClick={e => {
              e.preventDefault()
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            Let's Build
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="hero__scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
      >
        <motion.div
          className="hero__scroll-inner"
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
        >
          Scroll to explore ↓
        </motion.div>
      </motion.div>
    </section>
  )
}
