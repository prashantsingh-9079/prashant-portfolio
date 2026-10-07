import { useRef } from 'react'
import { motion, type Variants, type Easing } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import './CurrentlyExploring.css'

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

interface LearningItem {
  name: string
  status: 'Learning' | 'Exploring' | 'Building'
  context: string
}

const learningItems: LearningItem[] = [
  {
    name: 'AI / Machine Learning',
    status: 'Exploring',
    context: 'Foundations, supervised/unsupervised algorithms, and neural networks applied to practical data pipelines.',
  },
  {
    name: 'Generative AI',
    status: 'Building',
    context: 'LLM orchestration, prompt optimization, Gemini API integrations, and RAG contextual augmentation.',
  },
  {
    name: 'Java',
    status: 'Learning',
    context: 'Object-oriented architecture, strong static typing, memory management, and structured backend systems.',
  },
  {
    name: 'DSA',
    status: 'Learning',
    context: 'Data structures & algorithms — trees, graphs, sorting, and algorithmic complexity for problem solving.',
  },
  {
    name: 'React',
    status: 'Building',
    context: 'Component lifecycles, custom hooks, performant state, and creating fluid interactive digital interfaces.',
  },
  {
    name: 'TypeScript',
    status: 'Building',
    context: 'Type-safe contracts, interfaces, compile-time rigor, and scaling frontends without runtime ambiguity.',
  },
  {
    name: 'Web Development',
    status: 'Building',
    context: 'Full-stack fundamentals, modern browser APIs, responsive layouts, and performant web applications.',
  },
  {
    name: 'Data Science',
    status: 'Exploring',
    context: 'Exploratory data analysis, cleaning noisy datasets, statistical metrics, and turning numbers into clarity.',
  },
]

export default function CurrentlyExploring() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { threshold: 0.15 })

  return (
    <section id="learning" ref={sectionRef} className="exploring">
      <div className="exploring__inner">
        {/* Header */}
        <div className="exploring__header">
          <motion.span
            className="exploring__label"
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={0}
          >
            Continuous Growth
          </motion.span>

          <motion.h2
            className="exploring__title"
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={1}
          >
            Currently Exploring.
          </motion.h2>

          <motion.p
            className="exploring__sub"
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={2}
          >
            Active topics, languages, and technical domains I am learning and building with right now — without vanity metrics.
          </motion.p>
        </div>

        {/* Exploration Grid */}
        <div className="exploring__grid">
          {learningItems.map((item, idx) => {
            const statusClass =
              item.status === 'Building'
                ? 'exploring__tag--building'
                : item.status === 'Exploring'
                ? 'exploring__tag--exploring'
                : 'exploring__tag--learning'

            return (
              <motion.div
                key={item.name}
                className="exploring__card"
                variants={fadeUp}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                custom={3 + idx}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
              >
                <div className="exploring__card-top">
                  <h3 className="exploring__card-name">{item.name}</h3>
                  <span className={`exploring__tag ${statusClass}`}>
                    <span className="exploring__tag-dot" />
                    {item.status}
                  </span>
                </div>

                <p className="exploring__card-context">{item.context}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
