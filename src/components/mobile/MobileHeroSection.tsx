"use client" /* Top-Left Authentic Calligraphy Graphic */ /* Top Header Bar with Centered Slogan Title */ /* Left spacing for top-left logo */ /* Center: Slogan Title */ /* Right spacing for sticky NavigationMenu */ /* Main Content Area */ /* Top Arch Frame Line with Embedded Pickup Indicator */ /* Black Arch Outline (Left line, top curve, top line, right curve, right line) */ /* Pickup Indicator Text resting directly on top line (breaks the line with white padding) */ /* Central Dome Stadium Capsule Photo */ /* Description Card with Raised Tab (Continuous 4-sided border, perfect rounded corners, zero overhang) */ /* The Raised Tab on top-left of the card */ /* Mask strip covering the card body's top border directly beneath the tab */ /* Seamless SVG Fillet Curve connecting tab right border to card top border */ /* Title */ /* Tag Pills in Dark Teal */ /* Slide Pagination Dots */
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
    bgColor: "#df8f88",
    tags: ["Bánh xèo giòn", "Nem lụi than", "Đặc sản miền Trung", "Gia truyền"],
  },
]

function TabCornerCurve({ fillColor }: { fillColor: string }) {
  return (
    <svg
      preserveAspectRatio="none"
      overflow="visible"
      className="block size-full"
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
    <section className="relative w-full overflow-hidden bg-white pt-3 pb-6 text-[#222]">
      {}
      <div className="absolute top-0 -left-[6px] w-[90px] h-[220px] pointer-events-none select-none z-10">
        <img
          src={imgGroup}
          alt="HYUN"
          className="size-full object-contain object-left-top"
        />
      </div>

      {}
      <div className="relative w-full max-w-[430px] mx-auto px-4 flex items-center justify-between min-h-[64px] z-20">
        {}
        <div className="w-[60px] shrink-0" aria-hidden="true" />

        <div className="flex-1 text-center px-1">
          <h1 className="font-['Inter:Bold',sans-serif] font-bold text-[18px] sm:text-[19px] text-[#222] tracking-[0.05em] leading-tight">
            Điểm hẹn chuẩn gu
          </h1>
        </div>

        {}
        <div className="w-[60px] shrink-0" aria-hidden="true" />
      </div>

      {}
      <div
        className="relative w-full max-w-[390px] mx-auto px-4 mt-1 select-none"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {}
        <div className="relative w-full pt-[22px]">
          {}
          <div className="absolute top-0 left-0 right-0 h-[65px] border-t-[1.6px] border-l-[1.6px] border-r-[1.6px] border-[#222] rounded-t-[32px] pointer-events-none" />

          {}
          <div className="absolute -top-[11px] left-[26px] bg-white px-2 z-20">
            <span className="font-['Space_Grotesk:Light','Inter',sans-serif] font-bold text-[13.5px] text-[#222] tracking-[1.4px] whitespace-nowrap">
              Pickup {currentSlide.pickupNo}
            </span>
          </div>

          {}
          <div className="relative w-[92%] aspect-[1.42/1] rounded-t-[145px] sm:rounded-t-[160px] rounded-b-[90px] sm:rounded-b-[100px] overflow-hidden border border-black/10 shadow-xs bg-[#faf9f7] z-10 mx-auto">
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
        <div className="relative w-full -mt-[22px] z-20">
          <div
            className="relative w-full p-4 sm:p-5 border-[1.6px] border-[#222] rounded-bl-[16px] rounded-br-[16px] rounded-tr-[16px] shadow-sm transition-colors duration-400"
            style={{ backgroundColor: currentSlide.bgColor }}
          >
            {}
            <div
              className="absolute -top-[37.6px] left-[-1.6px] h-[37.6px] px-4 flex items-center border-t-[1.6px] border-l-[1.6px] border-r-[1.6px] border-[#222] rounded-tl-[8px] rounded-tr-[8px] z-20"
              style={{ backgroundColor: currentSlide.bgColor }}
            >
              <span className="font-['Noto_Sans_JP:Bold','Inter:Bold',sans-serif] font-bold text-[14px] text-[#075d50] tracking-wide whitespace-nowrap">
                {currentSlide.city}
              </span>

              {}
              <div
                className="absolute -bottom-[2px] left-0 right-[-1px] h-[3.5px]"
                style={{ backgroundColor: currentSlide.bgColor }}
              />

              {}
              <div className="absolute bottom-0 overflow-clip right-[-9px] size-[10px] pointer-events-none">
                <TabCornerCurve fillColor={currentSlide.bgColor} />
              </div>
            </div>

            {}
            <h2 className="font-['Noto_Sans_JP:Bold','Inter:Bold',sans-serif] font-bold text-[17px] sm:text-[18px] text-[#075d50] leading-[1.38] mb-3.5 tracking-tight">
              {currentSlide.title}
            </h2>

            {}
            <div className="flex flex-wrap gap-2">
              {currentSlide.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-[#075d50] text-white font-medium text-[12.5px] px-3.5 py-1.5 rounded-[6px] tracking-wide shadow-2xs whitespace-nowrap"
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
