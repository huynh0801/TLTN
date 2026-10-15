"use client" /* Ambient background decoration */ /* Header Section */ /* Content Section: Timeline or Empty State */ /* Elegant Continuous Timeline Track */ /* Timeline Node Point with Step Number */ /* Schedule Item Card */
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
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#1c1c1c] p-4 sm:p-6 shadow-2xl backdrop-blur-sm sm:rounded-3xl">
      {}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -bottom-20 size-72 rounded-full bg-[#F2A93B]/5 blur-3xl"
      />

      <div className="relative z-10">
        {}
        <div className="mb-6 flex flex-col gap-3.5 border-b border-white/10 pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-xl border border-[#F2A93B]/20 bg-[#F2A93B]/10 text-[#F2A93B]">
              <svg
                className="size-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </span>
            <div>
              <h3 className="text-base font-bold text-white sm:text-lg">
                Lịch trình Food Tour & Lịch hẹn
              </h3>
              <p className="mt-0.5 text-xs text-white/50">
                Hành trình trải nghiệm ẩm thực từng bước theo thời gian
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
            {filterLabel && (
              <span className="inline-flex items-center rounded-full border border-white/10 bg-[#161616] px-3 py-1 text-xs font-medium text-white/70">
                Bộ lọc:{" "}
                <strong className="ml-1 text-[#F2A93B]">{filterLabel}</strong>
              </span>
            )}
            <span className="inline-flex items-center rounded-full border border-[#F2A93B]/30 bg-[#F2A93B]/10 px-3 py-1 text-xs font-bold text-[#F2A93B]">
              {items.length} điểm đến
            </span>
          </div>
        </div>

        {}
        {!hasItems ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-[#161616]/60 p-8 text-center sm:p-12">
            <div className="mb-4 flex size-14 items-center justify-center rounded-2xl border border-white/10 bg-[#222222] text-white/40 shadow-inner">
              <svg
                className="size-7 text-[#F2A93B]/60"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
                <line x1="9" y1="14" x2="15" y2="18" />
                <line x1="15" y1="14" x2="9" y2="18" />
              </svg>
            </div>
            <h4 className="text-base font-semibold text-white/90">
              Chưa có lịch trình nào trong mục này
            </h4>
            <p className="mt-1.5 max-w-sm text-xs leading-relaxed text-white/50 sm:text-sm">
              {filterLabel
                ? `Không tìm thấy địa điểm nào phù hợp với bộ lọc "${filterLabel}". Bạn hãy thử chọn tab bộ lọc khác.`
                : "Hiện tại chưa có lịch trình ẩm thực nào được ghi nhận."}
            </p>
          </div>
        ) : (
          <div className="relative pl-7 sm:pl-9 space-y-5 sm:space-y-6">
            {}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-3 sm:left-4 top-6 bottom-6 w-0.5 bg-gradient-to-b from-[#F2A93B] via-white/15 to-[#F2A93B]/30"
            />

            {items.map((item, index) => {
              const isSelected = item.id === selectedScheduleId

              return (
                <div key={item.id} className="relative group/timeline">
                  {}
                  <div
                    className={`absolute -left-7 sm:-left-9 top-5 flex size-6 sm:size-7 items-center justify-center rounded-full border-2 transition-all duration-300 z-10 ${
                      isSelected
                        ? "border-[#F2A93B] bg-[#F2A93B] text-[#141414] shadow-[0_0_12px_rgba(242,169,59,0.7)] scale-110 font-bold ring-4 ring-[#1c1c1c]"
                        : "border-white/20 bg-[#161616] text-white/70 ring-4 ring-[#1c1c1c] group-hover/timeline:border-[#F2A93B]/70 group-hover/timeline:text-[#F2A93B]"
                    }`}
                    title={`Điểm dừng #${index + 1}`}
                  >
                    <span className="text-[10px] sm:text-xs font-bold leading-none">
                      {index + 1}
                    </span>
                  </div>

                  {}
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
    </div>
  )
}
