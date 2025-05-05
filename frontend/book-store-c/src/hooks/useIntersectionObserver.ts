import { useCallback, useEffect, useRef } from "react";

type Callback = (entries: IntersectionObserverEntry[]) => void

interface IObserverOptions {
  root?: Element | null
  rootMargin?: string
  threshold?: number | number[];
}

export const useIntersectionObserver = (callback: Callback, options: IObserverOptions = {}) => {
  const targetRef = useRef<HTMLDivElement | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const isObservingRef = useRef(false)

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    if (!isObservingRef.current) return
    callback(entries)
  }, [callback])

  useEffect(() => {
    if (!targetRef.current) return

    observerRef.current = new IntersectionObserver(handleIntersection, options)
    observerRef.current.observe(targetRef.current)
    isObservingRef.current = true

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
        isObservingRef.current = false
      }
    }
  }, [handleIntersection, options])

  return targetRef
}
