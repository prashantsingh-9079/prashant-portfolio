import { useRef } from 'react'
import { motion, type Variants, type Easing } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import './HowIBuild.css'

const EASE_OUT: Easing = [0.16, 1, 0.3, 1]

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      delay: 0.1 + i * 0.08,
      ease: EASE_OUT,
    },
  }),
}

const steps = [
  { step: '01', name: 'IDEA', hint: 'Identify real friction' },
  { step: '02', name: 'RESEARCH', hint: 'Understand first principles' },
  { step: '03', name: 'PROTOTYPE', hint: 'Fast throwaway proof-of-concept' },
  { step: '04', name: 'BUILD', hint: 'Architect clean systems' },
  { step: '05', name: 'BREAK', hint: 'Stress-test edge cases' },
  { step: '06', name: 'IMPROVE', hint: 'Refine latency & usability' },
  { step: '07', name: 'SHIP', hint: 'Deliver running software' },
]

export default function HowIBuild() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { threshold: 0.15 })

  return (
    <section id="how-i-build" ref={sectionRef} className="how-build">
      <div className="how-build__inner">
        {/* Header */}
        <div className="how-build__header">
          <motion.span
            className="how-build__label"
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={0}
          >
            Engineering Methodology
          </motion.span>

          <motion.h2
            className="how-build__title"
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={1}
          >
            How I Build.
          </motion.h2>

          <motion.p
            className="how-build__statement"
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={2}
          >
            I learn by building and iterating — moving from curiosity to working software through disciplined experimentation and continuous refinement.
          </motion.p>
        </div>

        {/* Process Flow Track */}
        <div className="how-build__pipeline">
          <div className="how-build__line" aria-hidden="true" />

          <div className="how-build__steps">
            {steps.map((st, idx) => (
              <motion.div
                key={st.name}
                className="how-build__node"
                variants={fadeUp}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                custom={3 + idx}
                whileHover={{ scale: 1.05 }}
              >
                <div className="how-build__node-circle">
                  <span className="how-build__node-num">{st.step}</span>
                </div>
                <h3 className="how-build__node-name">{st.name}</h3>
                <span className="how-build__node-hint">{st.hint}</span>

                {idx < steps.length - 1 && (
                  <span className="how-build__arrow-mobile" aria-hidden="true">
                    ↓
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
