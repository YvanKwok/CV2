"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface HorizontalScrollProps {
  children: React.ReactNode
}

export function HorizontalScroll({ children }: HorizontalScrollProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const updateArrows = () => {
    if (!scrollRef.current) return

    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    setShowLeftArrow(scrollLeft > 0)
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10)
  }

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    const handleScroll = () => {
      updateArrows()
    }

    scrollContainer.addEventListener("scroll", handleScroll)
    updateArrows()

    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return

    const { clientWidth } = scrollRef.current
    const scrollAmount = clientWidth * 0.8

    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    })
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return

    setIsDragging(true)
    setStartX(e.pageX - scrollRef.current.offsetLeft)
    setScrollLeft(scrollRef.current.scrollLeft)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return

    e.preventDefault()
    const x = e.pageX - scrollRef.current.offsetLeft
    const walk = (x - startX) * 2
    scrollRef.current.scrollLeft = scrollLeft - walk
  }

  // 添加触摸事件处理
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!scrollRef.current) return

    setIsDragging(true)
    setStartX(e.touches[0].pageX - scrollRef.current.offsetLeft)
    setScrollLeft(scrollRef.current.scrollLeft)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !scrollRef.current) return

    // 不阻止默认行为，以允许页面滚动
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft
    const walk = (x - startX) * 2
    scrollRef.current.scrollLeft = scrollLeft - walk
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  return (
    <div className="relative group">
      {showLeftArrow && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 backdrop-blur-sm p-2 rounded-full text-white"
          onClick={() => scroll("left")}
        >
          <ChevronLeft className="h-6 w-6" />
        </motion.button>
      )}

      {showRightArrow && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 backdrop-blur-sm p-2 rounded-full text-white"
          onClick={() => scroll("right")}
        >
          <ChevronRight className="h-6 w-6" />
        </motion.button>
      )}

      <div
        ref={scrollRef}
        className="flex overflow-x-auto hide-scrollbar py-8 px-6"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex gap-8">{children}</div>
      </div>
    </div>
  )
}

