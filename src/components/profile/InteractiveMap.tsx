"use client"

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
    <div className="relative flex h-full w-full min-h-[360px] sm:min-h-[420px] lg:min-h-[440px] flex-col items-center justify-center bg-neutral-100 border-2 border-black">
      <div className="relative z-10 flex flex-col items-center gap-3.5 text-center px-4">
        <div className="flex size-14 items-center justify-center border-2 border-black bg-white shadow-[3px_3px_0px_#000000]">
          <svg
            className="size-7 text-black animate-pulse"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
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
          <h4 className="text-sm font-bold text-black uppercase tracking-wide">
            Đang khởi tạo Bản đồ Vị trí...
          </h4>
          <p className="mt-1 text-xs text-neutral-600 font-medium">
            Đang đồng bộ tọa độ ẩm thực và vị trí của bạn
          </p>
        </div>

        <div className="h-2 w-36 overflow-hidden border border-black bg-neutral-200">
          <div className="h-full w-1/2 bg-black animate-[pulse_1s_infinite]" />
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
    <div className="border-2 border-black bg-white p-4 sm:p-6 shadow-[4px_4px_0px_#000000]">
      {/* Header & Legend */}
      <div className="mb-4 flex flex-col gap-3.5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex size-7 items-center justify-center border border-black bg-black text-white">
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
            <h3 className="text-base sm:text-lg font-bold text-black uppercase tracking-tight">
              Bản đồ Khám phá Ẩm thực
            </h3>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-neutral-600 font-medium">
            Tọa độ các điểm hẹn ẩm thực trong hành trình tại Hà Nội
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="flex items-center gap-2 border border-black bg-white px-2.5 py-1 text-black font-semibold shadow-[2px_2px_0px_#000000]">
            <span className="size-2.5 bg-emerald-500 border border-black" />
            <span>Vị trí của bạn</span>
          </div>

          <div className="flex items-center gap-2 border border-black bg-white px-2.5 py-1 text-black font-semibold shadow-[2px_2px_0px_#000000]">
            <span className="size-2.5 bg-[#F2A93B] border border-black" />
            <span>Điểm hẹn ({items.length})</span>
          </div>
        </div>
      </div>

      {/* Map Frame Container */}
      <div className="relative h-[360px] sm:h-[420px] lg:h-[440px] w-full border-2 border-black bg-neutral-100">
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
