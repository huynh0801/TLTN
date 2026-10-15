"use client"

import type { ScheduleItem, ScheduleStatus } from "@/types/profile"

export interface ScheduleItemCardProps {
  item: ScheduleItem
  isSelected: boolean
  onSelect: (id: string) => void
}

function formatDate(dateStr: string): string {
  try {
    const parts = dateStr.split("-")
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`
    }
    return dateStr
  } catch {
    return dateStr
  }
}

const statusConfig: Record<ScheduleStatus, {
  label: string
  badgeClass: string
  dotClass: string
}> = {
  upcoming: {
    label: "Sắp tới",
    badgeClass: "border-black bg-white text-black",
    dotClass: "bg-black",
  },
  in_progress: {
    label: "Đang diễn ra",
    badgeClass: "border-black bg-black text-white",
    dotClass: "bg-white animate-pulse",
  },
  completed: {
    label: "Đã ghé",
    badgeClass: "border-black bg-neutral-100 text-neutral-600",
    dotClass: "bg-neutral-400",
  },
}

export default function ScheduleItemCard({
  item,
  isSelected,
  onSelect,
}: ScheduleItemCardProps) {
  const statusInfo = statusConfig[item.status] || {
    label: item.status,
    badgeClass: "border-black bg-white text-black",
    dotClass: "bg-black",
  }

  return (
    <div
      id={`schedule-item-${item.id}`}
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      onClick={() => onSelect(item.id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          onSelect(item.id)
        }
      }}
      className={`group relative flex flex-col sm:flex-row gap-4 sm:gap-5 border-2 border-black p-4 sm:p-5 transition-all duration-200 cursor-pointer ${
        isSelected
          ? "bg-neutral-50 shadow-[4px_4px_0px_#000000] -translate-y-0.5"
          : "bg-white hover:bg-neutral-50 hover:shadow-[3px_3px_0px_#000000]"
      }`}
    >
      {/* Thumbnail */}
      <div className="relative w-full sm:w-44 sm:min-w-[176px] h-40 sm:h-auto border-2 border-black overflow-hidden bg-neutral-100 shrink-0">
        <img
          src={item.imageUrl}
          alt={item.placeName}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        {/* Category badge overlay on mobile */}
        <div className="absolute top-2 left-2 flex flex-wrap gap-1.5 sm:hidden">
          <span className="border border-black bg-white px-2 py-0.5 text-[11px] font-bold text-black uppercase">
            {item.category}
          </span>
        </div>
      </div>

      {/* Main Details */}
      <div className="relative z-10 flex flex-1 flex-col justify-between gap-3 min-w-0">
        <div>
          {/* Header Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="hidden sm:inline-flex items-center border border-black bg-neutral-100 px-2.5 py-0.5 text-xs font-bold text-black uppercase">
              {item.category}
            </span>
            <span
              className={`inline-flex items-center gap-1.5 border px-2.5 py-0.5 text-xs font-bold uppercase ${statusInfo.badgeClass}`}
            >
              <span
                className={`size-1.5 ${statusInfo.dotClass}`}
              />
              <span>{statusInfo.label}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 border border-black bg-white px-2 py-0.5 text-xs font-semibold text-black">
              <svg
                className="size-3 text-black"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              <span>{item.guestsCount} khách</span>
            </span>
          </div>

          {/* Place Name */}
          <h4 className="text-base sm:text-lg font-bold text-black group-hover:underline line-clamp-1">
            {item.placeName}
          </h4>

          {/* Address with Map Pin icon */}
          <p className="mt-1 flex items-start gap-1.5 text-xs sm:text-sm text-neutral-600 font-medium line-clamp-2">
            <svg
              className="size-3.5 shrink-0 mt-0.5 text-black"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span>{item.address}</span>
          </p>

          {/* Time & Date */}
          <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm text-neutral-800">
            <div className="flex items-center gap-1.5">
              <svg
                className="size-3.5 text-black"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span className="font-bold text-black">{item.time}</span>
              <span className="text-neutral-400">•</span>
              <span className="font-semibold text-neutral-700">{formatDate(item.date)}</span>
            </div>
          </div>

          {/* Signature Dish */}
          <div className="mt-2.5 flex items-start gap-1.5 text-xs sm:text-sm text-black bg-neutral-50 border border-black p-2 font-medium">
            <svg
              className="size-3.5 shrink-0 mt-0.5 text-black"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
              <path d="M7 2v20" />
              <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
            </svg>
            <span className="line-clamp-1">
              <strong className="font-bold text-black">
                Món đặc trưng:
              </strong>{" "}
              {item.signatureDish}
            </span>
          </div>

          {/* Notes */}
          {item.notes && (
            <p className="mt-2 text-xs italic text-neutral-600 line-clamp-2 border-l-2 border-black pl-2.5">
              &ldquo;{item.notes}&rdquo;
            </p>
          )}
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between pt-2.5 border-t border-black/15 mt-1">
          <span className="text-[11px] text-neutral-500 font-medium">
            Tọa độ:{" "}
            <span className="font-mono text-black font-semibold">
              {item.coordinates.lat.toFixed(4)},{" "}
              {item.coordinates.lng.toFixed(4)}
            </span>
          </span>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onSelect(item.id)
            }}
            className={`inline-flex items-center gap-2 border-2 border-black px-3.5 py-1.5 text-xs font-bold transition-all active:translate-x-0.5 active:translate-y-0.5 ${
              isSelected
                ? "bg-black text-white shadow-[2px_2px_0px_#000000]"
                : "bg-white text-black hover:bg-black hover:text-white shadow-[2px_2px_0px_#000000]"
            }`}
          >
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
              <circle cx="12" cy="12" r="10" />
              <line x1="22" y1="12" x2="18" y2="12" />
              <line x1="6" y1="12" x2="2" y2="12" />
              <line x1="12" y1="6" x2="12" y2="2" />
              <line x1="12" y1="22" x2="12" y2="18" />
            </svg>
            <span>
              {isSelected ? "Đang chọn trên bản đồ" : "Xem trên bản đồ"}
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
