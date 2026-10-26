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
  { id: "bun-pho", name: "Bún - Phở", image: "/img/bun-pho.png", query: "Bún Phở" },
  { id: "com", name: "Cơm", image: "/img/com.png", query: "Cơm" },
  { id: "nuong", name: "Món nướng", image: "/img/nuong.png", query: "Nướng" },
  { id: "haisan", name: "Hải sản", image: "/img/haisan.png", query: "Hải sản" },
  { id: "lau", name: "Lẩu", image: "/img/lau.png", query: "Lẩu" },
  { id: "streetfood", name: "Street food", image: "/img/streetfood.png", query: "Ăn vặt" },
  { id: "trasua", name: "Trà sữa", image: "/img/trasua.png", query: "Trà sữa" },
  { id: "banh", name: "Bánh ngọt", image: "/img/banh.png", query: "Bánh" },
  { id: "cafe", name: "Cà phê", image: "/img/cafe.png", query: "Cà phê" },
  { id: "chay", name: "Đồ chay", image: "/img/chay.png", query: "Chay" },
]

export default function CategorySection() {
  return (
    <section className="w-full bg-[#fdefdf] pt-2 pb-6 sm:pt-3 sm:pb-8 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header: danhmucmonan image on left + "Xem tất cả →" on right */}
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div className="flex items-center">
            <Image
              src="/img/danhmucmonan.jpg"
              alt="Danh mục món ăn"
              width={260}
              height={64}
              priority
              className="h-8 sm:h-9 w-auto object-contain mix-blend-multiply"
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

        {/* 10 Food Categories Row: Spans full width aligned with header */}
        <div className="grid grid-cols-5 sm:grid-cols-5 lg:grid-cols-10 gap-x-2 sm:gap-x-4 lg:gap-x-2 gap-y-3 sm:gap-y-4 items-start justify-items-center">
          {FOOD_CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/places?q=${encodeURIComponent(cat.query)}`}
              className="group flex flex-col items-center justify-center w-full focus:outline-none"
            >
              <div className="relative size-16 sm:size-20 lg:size-[78px] xl:size-[84px] transition-transform duration-300 ease-out group-hover:-translate-y-1">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 640px) 20vw, (max-width: 1024px) 20vw, 10vw"
                  className="object-contain"
                />
              </div>
              <span className="mt-1.5 text-xs sm:text-[13px] font-semibold text-[#1E3A5F] group-hover:text-[#D34B5E] text-center transition-colors line-clamp-1">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
