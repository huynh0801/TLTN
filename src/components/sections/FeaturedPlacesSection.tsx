"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

export interface FeaturedPlace {
  id: string
  name: string
  image: string
  rating: number
  location: string
  badge: string
  tags: { label: string; highlight?: boolean }[]
  href: string
}

export const FEATURED_PLACES: FeaturedPlace[] = [
  {
    id: "luna-cafe",
    name: "Luna Cafe & Bistro",
    image: "/img/luna-cafe.png",
    rating: 4.8,
    location: "Quận 1, TP. Hồ Chí Minh",
    badge: "Dành cho cặp đôi",
    tags: [{ label: "Café" }, { label: "Âu" }, { label: "View đẹp" }],
    href: "/places?q=Luna%20Cafe",
  },
  {
    id: "sakura-restaurant",
    name: "Sakura Japanese Restaurant",
    image: "/img/sakura-restaurant.png",
    rating: 4.7,
    location: "Quận 3, TP. Hồ Chí Minh",
    badge: "Nhà hàng Nhật",
    tags: [{ label: "Sushi" }, { label: "Ramen" }, { label: "Yakiniku" }],
    href: "/places?q=Sakura",
  },
  {
    id: "bui-vien",
    name: "Phố Ẩm Thực Bùi Viện",
    image: "/img/bui-vien.png",
    rating: 4.5,
    location: "Quận 1, TP. Hồ Chí Minh",
    badge: "Quán ăn đường phố",
    tags: [
      { label: "Đặc sản" },
      { label: "Đường phố" },
      { label: "Giá tốt", highlight: true },
    ],
    href: "/places?q=Bui%20Vien",
  },
  {
    id: "riverside-garden",
    name: "Riverside Garden",
    image: "/img/riverside-garden.png",
    rating: 4.6,
    location: "Thủ Đức, TP. Hồ Chí Minh",
    badge: "View đẹp",
    tags: [{ label: "Việt Nam" }, { label: "Âu" }, { label: "Hải sản" }],
    href: "/places?q=Riverside%20Garden",
  },
]

export default function FeaturedPlacesSection() {
  const [favoriteIds, setFavoriteIds] = useState<Record<string, boolean>>({})

  const toggleFavorite = (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    e.stopPropagation()
    setFavoriteIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  return (
    <section className="w-full bg-[#fdefdf] pt-1 pb-6 sm:pt-2 sm:pb-8 transition-colors">
      <div className="mx-auto max-w-[1360px] px-3 sm:px-5 lg:px-6">
        <div className="flex flex-col lg:flex-row gap-3.5 lg:gap-4 items-stretch">
          <div className="flex-1 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2 sm:mb-2.5">
              <div className="flex items-center">
                <Image
                  src="/img/diadiemnoibat.jpg"
                  alt="Địa điểm nổi bật"
                  width={260}
                  height={64}
                  priority
                  className="h-7 sm:h-8 w-auto object-contain mix-blend-multiply"
                />
              </div>

              <Link
                href="/places"
                className="group inline-flex items-center gap-1 text-xs sm:text-sm font-medium text-[#1E3A5F] hover:text-[#D34B5E] transition-colors shrink-0"
              >
                <span>Xem tất cả</span>
                <span
                  className="transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  →
                </span>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3.5 items-stretch flex-1">
              {FEATURED_PLACES.map((place) => {
                const isFaved = favoriteIds[place.id]
                return (
                  <div
                    key={place.id}
                    className="group relative bg-white rounded-2xl overflow-hidden border border-[#f0e4d7]/70 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                  >
                    <Link
                      href={place.href}
                      className="flex flex-col h-full justify-between focus:outline-none"
                    >
                      <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#faf5f0]">
                        <Image
                          src={place.image}
                          alt={place.name}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />

                        <button
                          type="button"
                          aria-label={`Yêu thích ${place.name}`}
                          onClick={(e) => toggleFavorite(e, place.id)}
                          className="absolute top-2 right-2 size-7 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-xs shadow-xs hover:scale-110 active:scale-95 transition-transform"
                        >
                          <svg
                            className={`size-4 transition-colors ${
                              isFaved
                                ? "fill-[#F88590] text-[#F88590]"
                                : "fill-[#F88590] text-[#F88590]"
                            }`}
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                          </svg>
                        </button>
                      </div>

                      <div className="p-3 flex flex-col justify-between flex-1">
                        <div>
                          <div className="flex items-center justify-between gap-1">
                            <h3 className="font-bold text-[#1E3A5F] text-[13px] sm:text-sm truncate group-hover:text-[#D34B5E] transition-colors">
                              {place.name}
                            </h3>
                            <div className="flex items-center gap-0.5 shrink-0 text-xs font-semibold text-[#333]">
                              <span className="text-[#F59E0B] text-xs">★</span>
                              <span>{place.rating.toFixed(1)}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-1 text-[11px] text-[#64748B] mt-1">
                            <svg
                              className="size-3 text-[#4A607A] shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="truncate">{place.location}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 mt-2.5 flex-wrap">
                          {place.tags.map((tag) => (
                            <span
                              key={tag.label}
                              className={`text-[10px] sm:text-[11px] px-2 py-0.5 rounded-full font-medium transition-colors ${
                                tag.highlight
                                  ? "bg-[#EAF7EE] text-[#2E7D32]"
                                  : "bg-[#FDF0F0] text-[#D34B5E]"
                              }`}
                            >
                              {tag.label}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Link>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="w-full lg:w-[31.5%] xl:w-[31%] 2xl:w-[30.5%] shrink-0 flex flex-col justify-start items-center">
            <div className="group relative w-full aspect-[471/441] flex items-center justify-center">
              <Image
                src="/img/preview.png"
                alt="Gợi ý cho cặp đôi hôm nay"
                fill
                sizes="(max-width: 1024px) 100vw, 32vw"
                className="object-contain transition-transform duration-300 group-hover:scale-[1.02]"
              />

              <Link
                href="/places?tag=couple"
                className="absolute bottom-[5.5%] left-1/2 -translate-x-1/2 w-[58%] max-w-[160px] py-2 px-3.5 bg-[#F88590] hover:bg-[#F26473] active:scale-95 text-white text-xs sm:text-[13px] font-bold rounded-full text-center shadow-xs hover:shadow transition-all duration-200 flex items-center justify-center gap-1 z-10"
              >
                <span>Xem ngay</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
