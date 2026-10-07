import { useEffect, useState } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'
import './CustomCursor.css'

type CursorState = 'default' | 'hover' | 'project' | 'link'

export default function CustomCursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const [cursorState, setCursorState] = useState<CursorState>('default')
  const [cursorLabel, setCursorLabel] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)

  const springConfig = { damping: 28, stiffness: 280, mass: 0.5 }
  const springX = useSpring(cursorX, springConfig)
  const springY = useSpring(cursorY, springConfig)

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.matchMedia('(pointer: fine)').matches)
    }
    checkDesktop()
    window.addEventListener('resize', checkDesktop)
    return () => window.removeEventListener('resize', checkDesktop)
  }, [])

  useEffect(() => {
    if (!isDesktop) return

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const projectEl = target.closest('[data-cursor="project"]')
      const linkEl = target.closest('a, button, [data-cursor="hover"]')

      if (projectEl) {
        setCursorState('project')
        setCursorLabel('View')
      } else if (linkEl) {
        setCursorState('link')
        setCursorLabel('Open')
      } else {
        setCursorState('default')
        setCursorLabel('')
      }
    }

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mouseover', handleMouseOver)
    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [isDesktop, isVisible, cursorX, cursorY])

  if (!isDesktop) return null

  const isExpanded = cursorState === 'project' || cursorState === 'link'

  return (
    <>
      {/* Dot cursor */}
      <motion.div
        className="cursor-dot"
        style={{ x: springX, y: springY }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: cursorState === 'default' ? 1 : 0,
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Ring cursor */}
      <motion.div
        className="cursor-ring"
        style={{ x: springX, y: springY }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isExpanded ? 1 : 0.5,
          width: isExpanded ? (cursorState === 'project' ? 80 : 60) : 32,
          height: isExpanded ? (cursorState === 'project' ? 80 : 60) : 32,
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 200 }}
      >
        {cursorLabel && (
          <motion.span
            className="cursor-label"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            {cursorLabel}
          </motion.span>
        )}
      </motion.div>
    </>
  )
}
