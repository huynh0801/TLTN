"use client"

// Touch handlers for mobile horizontal swipe

// Auto-play timer with clean unmount clearInterval
/* Header Slogan */ /* Main Slider Container */ /* Photo Frame */ /* Left Arrow Button (tap target >= 44x44px) */ /* Right Arrow Button (tap target >= 44x44px) */ /* Pickup Indicator */ /* Slide Pagination Dots (tap targets >= 44x44px) */ /* Slide Info Detail Card */

import { useState, useEffect, useRef, type TouchEvent } from "react"
import { HERO_SLIDES } from "@/constants/archivesData"

export default function MobileHeroSection() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [isPaused, setIsPaused] = useState(false)
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null)

  const minSwipeDistance = 45

  const goToSlide = (index: number) => {
    setActiveSlide((index + HERO_SLIDES.length) % HERO_SLIDES.length)
  }

  const prevSlide = () =>
    goToSlide(
      activeSlide -
        1,
    )
  const nextSlide = () =>
    goToSlide(
      activeSlide +
        1,
    )
  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (
      touchStart ===
        null ||
      touchEnd ===
        null
    )
      return
    const distance =
      touchStart -
      touchEnd
    const isLeftSwipe =
      distance >
      minSwipeDistance
    const isRightSwipe =
      distance <
      -minSwipeDistance

    if (isLeftSwipe) {
      nextSlide()
    } else if (isRightSwipe) {
      prevSlide()
    }

    setTouchStart(null)
    setTouchEnd(null)
  }
  useEffect(() => {
    if (isPaused) return
    autoPlayTimerRef.current = setInterval(() => {
      goToSlide(activeSlide + 1)
    }, 5500)

    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current)
    }
  }, [activeSlide, isPaused])

  const currentItem = HERO_SLIDES[activeSlide]

  return (
    <section className="relative w-full overflow-hidden bg-[#faf9f6] pt-14 pb-8 sm:pt-16 sm:pb-12 border-b border-black/10">
      {}
      <div className="px-4 text-center mb-6">
        <span className="inline-block px-3 py-1 mb-2.5 text-xs font-semibold uppercase tracking-wider text-[#ff4b72] bg-[#ff4b72]/10 rounded-full">
          Khám Phá Ẩm Thực
        </span>
        <h2 className="font-['Inter:Bold','Inter',sans-serif] text-2xl sm:text-3xl font-bold text-[#1c1c1c] tracking-tight leading-snug">
          Điểm hẹn chuẩn gu, yêu không cần nghĩ
        </h2>
      </div>

      {}
      <div
        className="relative max-w-xl mx-auto px-4"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {}
        <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-black/5 border border-black/15 shadow-md">
          {HERO_SLIDES.map((slide, idx) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                idx === activeSlide
                  ? "opacity-100 z-10 pointer-events-auto"
                  : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="size-full object-cover object-center select-none"
                draggable={false}
              />
            </div>
          ))}

          {}
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Slide trước"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 size-11 sm:size-12 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-sm transition-transform active:scale-90 cursor-pointer shadow-md focus:outline-none focus:ring-2 focus:ring-white/80"
          >
            <svg
              className="size-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {}
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Slide tiếp theo"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 size-11 sm:size-12 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-sm transition-transform active:scale-90 cursor-pointer shadow-md focus:outline-none focus:ring-2 focus:ring-white/80"
          >
            <svg
              className="size-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {}
          <div className="absolute top-3 right-3 z-20 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-xs font-semibold tracking-wider pointer-events-none shadow-sm">
            Pickup 0{activeSlide + 1} / 0{HERO_SLIDES.length}
          </div>
        </div>

        {}
        <div className="flex items-center justify-center gap-1 mt-4">
          {HERO_SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => goToSlide(idx)}
              aria-label={`Chuyển đến Slide ${idx + 1}`}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer p-2 focus:outline-none"
            >
              <span
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === activeSlide
                    ? "w-7 bg-[#1c1c1c]"
                    : "w-2 bg-black/25 hover:bg-black/40"
                }`}
              />
            </button>
          ))}
        </div>

        {}
        <div className="mt-4 p-5 rounded-2xl bg-white border border-black/15 shadow-sm transition-all duration-300">
          <div className="inline-block px-3 py-1 mb-2 rounded-md bg-[#292c4b] text-white text-xs font-bold tracking-wider">
            {currentItem.city}
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-[#1c1c1c] leading-snug">
            {currentItem.title}
          </h3>

          <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-black/10">
            {currentItem.tags.map((tag) => (
              <span
                key={tag}
                className="bg-[#262626] text-white text-xs px-3 py-1.5 rounded-md font-medium tracking-wide"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
