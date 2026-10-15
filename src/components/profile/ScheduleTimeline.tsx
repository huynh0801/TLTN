"use client"

import type { ScheduleItem } from "@/types/profile"
import ScheduleItemCard from "./ScheduleItemCard"

export interface ScheduleTimelineProps {
  items: ScheduleItem[]
  selectedScheduleId: string | null
  onSelectSchedule: (id: string) => void
  filterLabel?: string
}

export default function ScheduleTimeline({
  items,
  selectedScheduleId,
  onSelectSchedule,
  filterLabel,
}: ScheduleTimelineProps) {
  const hasItems = items.length > 0

  return (
    <div className="border-2 border-black bg-white p-4 sm:p-6 shadow-[4px_4px_0px_#000000]">
      {/* Header Section */}
      <div className="mb-6 flex flex-col gap-3.5 border-b-2 border-black pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="flex size-8 items-center justify-center border border-black bg-black text-white">
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
              <rect width="18" height="18" x="3" y="4" rx="0" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </span>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-black uppercase tracking-tight">
              Lịch trình Food Tour & Lịch hẹn
            </h3>
            <p className="mt-0.5 text-xs text-neutral-600 font-medium">
              Hành trình trải nghiệm ẩm thực từng bước theo thời gian
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          {filterLabel && (
            <span className="inline-flex items-center border border-black bg-neutral-100 px-2.5 py-1 text-xs font-bold text-black">
              Bộ lọc: <span className="ml-1 underline">{filterLabel}</span>
            </span>
          )}
          <span className="inline-flex items-center border border-black bg-black px-2.5 py-1 text-xs font-bold text-white">
            {items.length} điểm đến
          </span>
        </div>
      </div>

      {/* Content Section: Timeline or Empty State */}
      {!hasItems ? (
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-black bg-neutral-50 p-8 text-center sm:p-12">
          <div className="mb-4 flex size-12 items-center justify-center border-2 border-black bg-white shadow-[2px_2px_0px_#000000]">
            <svg
              className="size-6 text-black"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect width="18" height="18" x="3" y="4" rx="0" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </div>
          <h4 className="text-base font-bold text-black uppercase">
            Chưa có lịch trình nào trong mục này
          </h4>
          <p className="mt-1.5 max-w-sm text-xs leading-relaxed text-neutral-600 sm:text-sm font-medium">
            {filterLabel
              ? `Không tìm thấy địa điểm nào phù hợp với bộ lọc "${filterLabel}". Bạn hãy thử chọn tab bộ lọc khác.`
              : "Hiện tại chưa có lịch trình ẩm thực nào được ghi nhận."}
          </p>
        </div>
      ) : (
        <div className="relative pl-7 sm:pl-9 space-y-5 sm:space-y-6">
          {/* Timeline Track (Solid Black Line) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-3 sm:left-4 top-5 bottom-5 w-[2px] bg-black"
          />

          {items.map((item, index) => {
            const isSelected = item.id === selectedScheduleId

            return (
              <div key={item.id} className="relative group/timeline">
                {/* Timeline Square Node */}
                <div
                  className={`absolute -left-7 sm:-left-9 top-4 flex size-6 sm:size-7 items-center justify-center border-2 border-black transition-all duration-200 z-10 ${
                    isSelected
                      ? "bg-black text-white shadow-[2px_2px_0px_#000000] scale-105 font-bold"
                      : "bg-white text-black group-hover/timeline:bg-black group-hover/timeline:text-white"
                  }`}
                  title={`Điểm dừng #${index + 1}`}
                >
                  <span className="text-[10px] sm:text-xs font-bold leading-none">
                    {index + 1}
                  </span>
                </div>

                {/* Schedule Item Card */}
                <ScheduleItemCard
                  item={item}
                  isSelected={isSelected}
                  onSelect={onSelectSchedule}
                />
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
