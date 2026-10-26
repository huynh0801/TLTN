"use client"

import Image from "next/image"
import Link from "next/link"

export interface FoodCategory {
  id: string
  name: string
  image: string
  query: string
}

export const FOOD_CATEGORIES: FoodCategory[] = [
  { id: "ramen", name: "Ramen", image: "/img/cat-ramen.png", query: "Ramen" },
  { id: "sushi", name: "Sushi", image: "/img/cat-sushi.png", query: "Sushi" },
  { id: "sashimi", name: "Sashimi", image: "/img/cat-sashimi.png", query: "Sashimi" },
  { id: "tempura", name: "Tempura", image: "/img/cat-tempura.png", query: "Tempura" },
  { id: "donburi", name: "Donburi", image: "/img/cat-donburi.png", query: "Donburi" },
  { id: "yakiniku", name: "Yakiniku", image: "/img/cat-yakiniku.png", query: "Yakiniku" },
  { id: "okonomiyaki", name: "Okonomiyaki", image: "/img/cat-okonomiyaki.png", query: "Okonomiyaki" },
  { id: "soba", name: "Soba", image: "/img/cat-soba.png", query: "Soba" },
  { id: "curry", name: "Cà ri Nhật", image: "/img/cat-curry.png", query: "Cà ri" },
  { id: "lau", name: "Lẩu", image: "/img/cat-lau.png", query: "Lẩu" },
  { id: "mon-viet", name: "Món Việt", image: "/img/cat-mon-viet.png", query: "Món Việt" },
  { id: "mon-au", name: "Món Âu", image: "/img/cat-mon-au.png", query: "Món Âu" },
  { id: "trang-mieng", name: "Tráng miệng", image: "/img/cat-trang-mieng.png", query: "Tráng miệng" },
  { id: "do-uong", name: "Đồ uống", image: "/img/cat-do-uong.png", query: "Đồ uống" },
]

export default function CategorySection() {
  return (
    <section className="w-full bg-[#fdefdf] pt-1 pb-2 sm:pt-1.5 sm:pb-3 transition-colors">
      <div className="mx-auto max-w-[1360px] px-3 sm:px-5 lg:px-6">
        {/* Section Header: 🌸 Danh mục món ăn image on left + "Xem tất cả →" on right */}
        <div className="flex items-center justify-between mb-1.5 sm:mb-2">
          <div className="flex items-center">
            <Image
              src="/img/danhmucmonan.png"
              alt="Danh mục món ăn"
              width={208}
              height={33}
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

        {/* 14 Food Categories Row: Spans full width with snug spacing and large icons */}
        <div className="grid grid-cols-7 lg:grid-cols-[repeat(14,minmax(0,1fr))] gap-1.5 sm:gap-2 lg:gap-1.5 xl:gap-2 items-start justify-items-center w-full">
          {FOOD_CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/places?q=${encodeURIComponent(cat.query)}`}
              className="group flex flex-col items-center justify-center w-full focus:outline-none"
            >
              <div className="relative size-14 sm:size-16 md:size-[68px] lg:size-[62px] xl:size-[68px] 2xl:size-[72px] transition-transform duration-300 ease-out group-hover:-translate-y-1">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 640px) 14vw, (max-width: 1024px) 14vw, 7vw"
                  className="object-contain"
                />
              </div>
              <span className="mt-1 text-[11px] sm:text-xs xl:text-[13px] font-semibold text-[#1E3A5F] group-hover:text-[#D34B5E] text-center transition-colors truncate w-full">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
