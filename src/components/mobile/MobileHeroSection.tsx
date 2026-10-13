"use client" /* Top Header Bar with Rotated Logo Graphic, Slogan, and Menu clearance */ /* Left: Rotated Logo Graphic */ /* Center: Slogan Title */ /* Right clearance for sticky NavigationMenu */ /* Main Slider Area with Arched Frame and Capsule Photo */ /* Arched Border Container Frame */ /* Pickup Indicator Tab on Top Left of Frame */ /* Central Photo with Stadium Capsule Oval Rounding */ /* Description Card with Raised Tab (Authentic Figma Design) */ /* Raised Tab on Top-Left with Curved Corner */ /* The Tab Rectangle */ /* Tab Corner Curve joining to the main card */ /* Filler line for the rest of top border */ /* Main Card Body */ /* Title */ /* Tag Pills */ /* Slide Pagination Dots & Quick Steppers */

import { useState, useEffect, useRef, type TouchEvent } from "react"
import {
  imgGroup,
  imgImg1592Jpg1,
  imgImg5097F09F8C9FScaledJpeg,
  imgImg3206ScaledJpg,
  imgLineAlbum22071822800X5331Jpg,
} from "@/constants/assets"

interface MobileSlide {
  id: number
  pickupNo: string
  city: string
  title: string
  image: string
  bgColor: string
  tags: string[]
}

const MOBILE_HERO_SLIDES: MobileSlide[] = [
  {
    id: 0,
    pickupNo: "01",
    city: "TP. Hà Nội",
    title: "Phở Bát Đàn | Tinh hoa phở bò phố cổ trăm năm",
    image: imgImg1592Jpg1,
    bgColor: "#df8f88",
    tags: ["Phở bò tái lăn", "Nước dùng thanh", "Phố cổ Hà Nội", "Gia truyền"],
  },
  {
    id: 1,
    pickupNo: "02",
    city: "TP. Hồ Chí Minh",
    title: "Cơm Tấm Ba Ghiền | Sườn nướng than hồng chuẩn vị Sài Gòn",
    image: imgImg5097F09F8C9FScaledJpeg,
    bgColor: "#c8a97e",
    tags: ["Sườn bì chả", "Ăn đêm Sài Gòn", "Hương vị Nam Bộ", "Quán quen"],
  },
  {
    id: 2,
    pickupNo: "03",
    city: "TP. Đà Lạt",
    title: "Lẩu Gà Lá É Tao Ngộ | Nồi lẩu nóng hổi giữa sương mù phố núi",
    image: imgImg3206ScaledJpg,
    bgColor: "#9ea98b",
    tags: ["Lẩu gà lá é", "Ẩm thực phố núi", "Ấm lòng ngày đông"],
  },
  {
    id: 3,
    pickupNo: "04",
    city: "TP. Đà Nẵng",
    title: "Bánh Xèo & Nem Lụi Bà Dưỡng | Đậm đà nước chấm gan heo béo bùi",
    image: imgLineAlbum22071822800X5331Jpg,
    bgColor: "#85a6ad",
    tags: ["Bánh xèo giòn", "Nem lụi than", "Đặc sản miền Trung", "Gia truyền"],
  },
]

function TabCornerCurve({ fillColor }: { fillColor: string }) {
  return (
    <svg
      preserveAspectRatio="none"
      overflow="visible"
      className="block w-[14px] h-[14px]"
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Group">
        <path
          id="Vector"
          d="M0 10V2H2V6.315C2.20896 6.62872 2.44665 6.92232 2.71 7.192C3.00573 7.49482 3.33253 7.76564 3.685 8H8V10H0Z"
          fill={fillColor}
        />
        <path
          id="Vector_2"
          d="M8 9C5.416 9 3.6 8.359 2.455 7.04C1.463 5.9 1 4.3 1 2V0H3V2C2.86688 3.31798 3.20912 4.64014 3.965 5.728C4.709 6.584 6.029 7 8 7H10V9H8Z"
          fill="#222"
        />
      </g>
    </svg>
  )
}

export default function MobileHeroSection() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [isPaused, setIsPaused] = useState(false)
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null)

  const minSwipeDistance = 45

  const goToSlide = (index: number) => {
    setActiveSlide(
      (index + MOBILE_HERO_SLIDES.length) % MOBILE_HERO_SLIDES.length,
    )
  }

  const prevSlide = () => goToSlide(activeSlide - 1)
  const nextSlide = () => goToSlide(activeSlide + 1)

  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (touchStart === null || touchEnd === null) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

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

  const currentSlide = MOBILE_HERO_SLIDES[activeSlide]

  return (
    <section className="relative w-full overflow-hidden bg-white pt-3 pb-8 text-[#222]">
      {}
      <div className="relative w-full max-w-[440px] mx-auto px-4 flex items-center justify-between min-h-[70px]">
        {}
        <div className="relative w-[75px] h-[65px] -ml-2 shrink-0 select-none pointer-events-none">
          <img
            src={imgGroup}
            alt="Logo"
            className="size-full object-contain object-left"
          />
        </div>

        {}
        <div className="flex-1 text-center px-1">
          <h1 className="font-['Noto_Sans_JP:Bold','Inter:Bold',sans-serif] font-bold text-[17px] sm:text-[19px] text-[#222] tracking-[0.05em] leading-tight">
            みんなの暮らし方不動産
          </h1>
          <p className="text-[11px] text-[#666] font-medium tracking-wider mt-0.5">
            Điểm hẹn ẩm thực chuẩn gu
          </p>
        </div>

        {}
        <div className="w-[45px] shrink-0" aria-hidden="true" />
      </div>

      {}
      <div
        className="relative w-full max-w-[430px] mx-auto px-3.5 mt-3 select-none"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {}
        <div className="relative w-full pt-[28px] pb-3 px-3 rounded-t-[34px] border-t-[1.6px] border-l-[1.6px] border-r-[1.6px] border-[#222] bg-white">
          {}
          <div className="absolute -top-[14px] left-[20px] bg-white px-3 py-0.5 border-[1.6px] border-[#222] rounded-[4px] shadow-2xs z-20">
            <span className="font-['Space_Grotesk:Light','Inter',sans-serif] font-bold text-[13px] tracking-[1.5px] text-[#222]">
              Pickup {currentSlide.pickupNo}
            </span>
          </div>

          {}
          <div className="relative w-full aspect-[1/1.08] rounded-t-[130px] rounded-b-[130px] overflow-hidden shadow-xs border border-black/10 bg-[#faf9f7]">
            {MOBILE_HERO_SLIDES.map((slide, idx) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-600 ease-in-out ${
                  idx === activeSlide
                    ? "opacity-100 z-10 pointer-events-auto"
                    : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="size-full object-cover object-center"
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>

        {}
        <div className="relative w-full -mt-[1.6px]">
          {}
          <div className="relative flex items-end">
            {}
            <div
              className="px-4 py-1.5 border-[1.6px] border-b-0 border-[#222] rounded-t-[8px] z-10 relative"
              style={{ backgroundColor: currentSlide.bgColor }}
            >
              <span className="font-['Noto_Sans_JP:Bold','Inter:Bold',sans-serif] font-bold text-[14px] text-[#0e5c54] tracking-wide whitespace-nowrap">
                {currentSlide.city}
              </span>
            </div>

            {}
            <div className="relative -ml-[1.6px] mb-[1.6px] w-[14px] h-[14px] z-10">
              <TabCornerCurve fillColor={currentSlide.bgColor} />
            </div>

            {}
            <div className="flex-1 h-[1.6px] bg-[#222]" />
          </div>

          {}
          <div
            className="w-full p-4 sm:p-5 border-[1.6px] border-t-0 border-[#222] rounded-b-[16px] rounded-tr-[16px] shadow-sm transition-colors duration-400"
            style={{ backgroundColor: currentSlide.bgColor }}
          >
            {}
            <h2 className="font-['Noto_Sans_JP:Bold','Inter:Bold',sans-serif] font-bold text-[17px] sm:text-[18px] text-[#0e5c54] leading-[1.38] mb-3.5 tracking-tight">
              {currentSlide.title}
            </h2>

            {}
            <div className="flex flex-wrap gap-2">
              {currentSlide.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-[#0e5c54] text-white font-medium text-[12px] px-3 py-1 rounded-[6px] tracking-wide shadow-2xs whitespace-nowrap"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {}
        <div className="flex items-center justify-center gap-2 mt-4 pt-1">
          {MOBILE_HERO_SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => goToSlide(idx)}
              aria-label={`Slide ${idx + 1}`}
              className="p-1 cursor-pointer focus:outline-none"
            >
              <span
                className={`block h-2 rounded-full transition-all duration-300 ${
                  idx === activeSlide
                    ? "w-6 bg-[#222]"
                    : "w-2 bg-[#222]/30 hover:bg-[#222]/50"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
