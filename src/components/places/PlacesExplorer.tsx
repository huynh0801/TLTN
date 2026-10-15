"use client"

import { useState, useMemo } from "react"
import { UNIFIED_PLACES, AVAILABLE_CITIES } from "@/data/unifiedPlacesData"
import { matchPlaceSearch } from "@/utils/vietnameseSearch"
import PlaceCard from "@/components/places/PlaceCard"

export interface PlacesExplorerProps {
  className?: string
}

export default function PlacesExplorer({
  className = "",
}: PlacesExplorerProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCity, setSelectedCity] = useState("Tất cả")

  // Calculate static count per city across all places
  const cityCounts = useMemo(() => {
    const counts: Record<string, number> = {
      "Tất cả": UNIFIED_PLACES.length,
    }
    for (const place of UNIFIED_PLACES) {
      if (place.city) {
        counts[place.city] = (counts[place.city] || 0) + 1
      }
    }
    return counts
  }, [])

  // Filter places based on selected city and search query
  const filteredPlaces = useMemo(() => {
    return UNIFIED_PLACES.filter((place) => {
      if (selectedCity !== "Tất cả" && place.city !== selectedCity) {
        return false
      }
      if (searchQuery.trim() !== "" && !matchPlaceSearch(place, searchQuery)) {
        return false
      }
      return true
    })
  }, [selectedCity, searchQuery])

  return (
    <div className={`w-full space-y-6 sm:space-y-8 ${className}`}>
      {/* Title & Stats Banner */}
      <div className="flex flex-col gap-4 border-b border-zinc-200 pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-widest text-zinc-500">
            CẨM NANG ẨM THỰC 3 MIỀN / RENDEZVOUS ARCHIVES
          </p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-black sm:text-4xl md:text-5xl">
            Khám Phá Điểm Hẹn Ẩm Thực
          </h1>
          <p className="mt-3 text-sm text-zinc-600 sm:text-base">
            Tuyển tập các quán ăn truyền thống, tiệm cà phê đặc sản và món ngon đậm đà bản sắc từ Bắc chí Nam.
          </p>
        </div>

        {/* Dynamic Places Counter Badge */}
        <div className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-zinc-200 bg-zinc-50 px-3.5 py-1.5 text-xs font-medium text-zinc-600 sm:self-end">
          <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>
            Hiển thị <strong className="font-semibold text-black">{filteredPlaces.length}</strong> trên tổng số{" "}
            <strong className="font-semibold text-black">{UNIFIED_PLACES.length}</strong> địa điểm
          </span>
        </div>
      </div>

      {/* Search Input Section */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-zinc-400">
          <svg
            className="size-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Tìm kiếm theo tên quán, món ăn (phở, bún chả, cà phê...), hoặc địa chỉ..."
          className="w-full rounded-2xl border border-zinc-200 bg-white py-3.5 pl-11 pr-11 text-sm text-black placeholder-zinc-400 shadow-sm transition-all focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-base"
        />
        {searchQuery !== "" && (
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            aria-label="Xóa tìm kiếm"
            className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-zinc-400 hover:text-black transition-colors"
          >
            <span className="flex size-6 items-center justify-center rounded-full hover:bg-zinc-100">
              <svg
                className="size-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </span>
          </button>
        )}
      </div>

      {/* Horizontal Scrollable City Tabs Bar */}
      <div className="relative -mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {AVAILABLE_CITIES.map((city) => {
            const isActive = selectedCity === city
            const count = cityCounts[city] ?? 0
            return (
              <button
                key={city}
                type="button"
                onClick={() => setSelectedCity(city)}
                className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 text-xs sm:text-sm transition-all duration-200 ${
                  isActive
                    ? "bg-black text-white border-black shadow-sm font-semibold"
                    : "bg-white text-zinc-700 border-zinc-200 hover:border-black font-medium"
                }`}
              >
                <span>{city}</span>
                <span
                  className={`text-xs font-mono ${
                    isActive ? "text-zinc-300" : "text-zinc-400"
                  }`}
                >
                  ({count})
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Places Grid or Empty State */}
      {filteredPlaces.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPlaces.map((place) => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-zinc-200 bg-zinc-50/50 px-6 py-16 text-center sm:py-20">
          <div className="flex size-16 items-center justify-center rounded-2xl border border-zinc-100 bg-white text-zinc-400 shadow-sm">
            <svg
              className="size-8"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
              <path d="M9.5 9.5a2 2 0 0 1 3.5 1.5c0 1-1.5 1.5-1.5 2.5" />
              <path d="M12 17h.01" />
            </svg>
          </div>

          <h3 className="mt-5 text-lg font-bold text-black sm:text-xl">
            Không tìm thấy điểm hẹn phù hợp
          </h3>

          <p className="mt-2 max-w-md text-sm text-zinc-500">
            Không có địa điểm nào khớp với từ khóa "{searchQuery}" tại {selectedCity}.
          </p>

          <button
            type="button"
            onClick={() => {
              setSearchQuery("")
              setSelectedCity("Tất cả")
            }}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-black px-5 py-2.5 text-sm font-semibold text-white shadow transition-all hover:bg-zinc-800 hover:shadow-md"
          >
            <span>Xóa bộ lọc & Xem tất cả</span>
          </button>
        </div>
      )}
    </div>
  )
}
