"use client" /* Decorative subtle grid background */ /* Ambient background glow */ /* Animated Center Compass & Status */ /* Shimmer loading bar */ /* Header & Legend */ /* Legend */ /* Map Frame Container */

import dynamic from "next/dynamic"
import type { LocationCoordinate, ScheduleItem } from "@/types/profile"
import type { MapInnerProps } from "./MapInner"

export interface InteractiveMapProps {
  homeCoordinate: LocationCoordinate
  userName: string
  items: ScheduleItem[]
  selectedScheduleId: string | null
  onSelectSchedule: (id: string) => void
}

function MapSkeleton() {
  return (
    <div className="relative flex h-full w-full min-h-[360px] sm:min-h-[420px] lg:min-h-[440px] flex-col items-center justify-center overflow-hidden rounded-2xl bg-[#1a1a1a]">
      {}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-15 bg-[radial-gradient(#F2A93B_1px,transparent_1px)] [background-size:20px_20px]"
      />

      {}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute size-48 rounded-full bg-[#F2A93B]/10 blur-3xl animate-pulse"
      />

      {}
      <div className="relative z-10 flex flex-col items-center gap-3.5 text-center px-4">
        <div className="relative flex size-14 items-center justify-center rounded-2xl border border-white/10 bg-[#222222] shadow-xl">
          <div className="absolute inset-0 rounded-2xl border border-[#F2A93B]/40 animate-ping opacity-40" />
          <svg
            className="size-7 text-[#F2A93B] animate-pulse"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
            <line x1="9" y1="3" x2="9" y2="18" />
            <line x1="15" y1="6" x2="15" y2="21" />
          </svg>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white/90">
            Đang khởi tạo Bản đồ Leaflet...
          </h4>
          <p className="mt-1 text-xs text-white/50">
            Đang đồng bộ tọa độ ẩm thực và vị trí của bạn
          </p>
        </div>

        {}
        <div className="h-1 w-36 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-1/2 rounded-full bg-[#F2A93B] animate-[shimmer_1.5s_infinite]" />
        </div>
      </div>
    </div>
  )
}

const DynamicMapInner = dynamic<MapInnerProps>(() => import("./MapInner"), {
  ssr: false,
  loading: () => <MapSkeleton />,
})

export default function InteractiveMap({
  homeCoordinate,
  userName,
  items,
  selectedScheduleId,
  onSelectSchedule,
}: InteractiveMapProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#222222] p-4 sm:p-5 shadow-2xl backdrop-blur-sm sm:rounded-3xl">
      {}
      <div className="mb-4 flex flex-col gap-3.5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-xl border border-[#F2A93B]/20 bg-[#F2A93B]/10 text-[#F2A93B]">
              <svg
                className="size-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
                <line x1="9" y1="3" x2="9" y2="18" />
                <line x1="15" y1="6" x2="15" y2="21" />
              </svg>
            </span>
            <h3 className="text-base font-bold text-white sm:text-lg">
              Bản đồ Khám phá Ẩm thực
            </h3>
          </div>
          <p className="mt-1 text-xs text-white/60 sm:text-sm">
            Khám phá các tọa độ ẩm thực trong hành trình tại Hà Nội
          </p>
        </div>

        {}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-[#161616]/80 px-3 py-1.5 text-white/80 backdrop-blur-sm">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" />
            </span>
            <span className="font-medium">Vị trí của bạn</span>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-[#161616]/80 px-3 py-1.5 text-white/80 backdrop-blur-sm">
            <span className="size-2.5 rounded-full bg-[#F2A93B] shadow-[0_0_8px_rgba(242,169,59,0.8)]" />
            <span className="font-medium">Điểm hẹn ({items.length})</span>
          </div>
        </div>
      </div>

      {}
      <div className="relative h-[360px] sm:h-[420px] lg:h-[440px] w-full overflow-hidden rounded-xl border border-white/10 bg-[#161616] shadow-inner">
        <DynamicMapInner
          homeCoordinate={homeCoordinate}
          userName={userName}
          items={items}
          selectedScheduleId={selectedScheduleId}
          onSelectSchedule={onSelectSchedule}
        />
      </div>
    </div>
  )
}
