import { useEffect, useRef, useState } from 'react'

interface UseInViewOptions {
  threshold?: number
  rootMargin?: string
  once?: boolean
}

export function useInView(
  ref: React.RefObject<Element | null>,
  options: UseInViewOptions = {}
): boolean {
  const { threshold = 0.1, rootMargin = '0px', once = true } = options
  const [isInView, setIsInView] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          if (once) observerRef.current?.disconnect()
        } else if (!once) {
          setIsInView(false)
        }
      },
      { threshold, rootMargin }
    )

    observerRef.current.observe(el)
    return () => observerRef.current?.disconnect()
  }, [ref, threshold, rootMargin, once])

  return isInView
}
