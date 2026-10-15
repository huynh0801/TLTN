"use client" /* Decorative glow when selected */ /* Thumbnail */ /* Category badge overlay on mobile */ /* Main Details */ /* Header Badges */ /* Place Name */ /* Address with Map Pin icon */ /* Time & Date */ /* Signature Dish */ /* Notes */ /* Footer actions */
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
    badgeClass: "border-[#F2A93B]/30 bg-[#F2A93B]/10 text-[#F2A93B]",
    dotClass: "bg-[#F2A93B]",
  },
  in_progress: {
    label: "Đang diễn ra",
    badgeClass: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
    dotClass: "bg-emerald-400 animate-pulse",
  },
  completed: {
    label: "Đã ghé",
    badgeClass: "border-white/10 bg-white/5 text-white/50",
    dotClass: "bg-white/40",
  },
}

export default function ScheduleItemCard({
  item,
  isSelected,
  onSelect,
}: ScheduleItemCardProps) {
  const statusInfo = statusConfig[item.status] || {
    label: item.status,
    badgeClass: "border-white/10 bg-white/5 text-white/60",
    dotClass: "bg-white/40",
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
      className={`group relative flex flex-col sm:flex-row gap-4 sm:gap-5 overflow-hidden rounded-2xl border p-4 sm:p-5 transition-all duration-300 cursor-pointer ${
        isSelected
          ? "border-[#F2A93B] bg-[#242424] shadow-[0_0_20px_rgba(242,169,59,0.2)] ring-1 ring-[#F2A93B]/40"
          : "border-white/10 bg-[#1c1c1c] hover:border-white/20 hover:bg-[#202020]"
      }`}
    >
      {}
      {isSelected && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-12 -top-12 size-36 rounded-full bg-[#F2A93B]/15 blur-2xl"
        />
      )}

      {}
      <div className="relative w-full sm:w-44 sm:min-w-[176px] h-40 sm:h-auto overflow-hidden rounded-xl bg-[#262626] shrink-0">
        <img
          src={item.imageUrl}
          alt={item.placeName}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent sm:hidden" />
        {}
        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 sm:hidden">
          <span className="rounded-md border border-white/15 bg-black/75 px-2 py-0.5 text-[11px] font-medium text-white backdrop-blur-sm">
            {item.category}
          </span>
        </div>
      </div>

      {}
      <div className="relative z-10 flex flex-1 flex-col justify-between gap-3 min-w-0">
        <div>
          {}
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="hidden sm:inline-flex items-center rounded-md border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs font-medium text-white/80">
              {item.category}
            </span>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${statusInfo.badgeClass}`}
            >
              <span
                className={`size-1.5 rounded-full ${statusInfo.dotClass}`}
              />
              <span>{statusInfo.label}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-white/70">
              <svg
                className="size-3 text-white/50"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
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

          {}
          <h4 className="text-base sm:text-lg font-bold text-white transition-colors group-hover:text-[#F2A93B] line-clamp-1">
            {item.placeName}
          </h4>

          {}
          <p className="mt-1 flex items-start gap-1.5 text-xs sm:text-sm text-white/60 line-clamp-2">
            <svg
              className="size-3.5 shrink-0 mt-0.5 text-[#F2A93B]/80"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span>{item.address}</span>
          </p>

          {}
          <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm text-white/75">
            <div className="flex items-center gap-1.5">
              <svg
                className="size-3.5 text-[#F2A93B]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span className="font-bold text-[#F2A93B]">{item.time}</span>
              <span className="text-white/40">•</span>
              <span className="text-white/80">{formatDate(item.date)}</span>
            </div>
          </div>

          {}
          <div className="mt-2.5 flex items-start gap-1.5 text-xs sm:text-sm text-[#F2A93B]/90 bg-[#F2A93B]/5 border border-[#F2A93B]/15 rounded-lg px-2.5 py-1.5">
            <svg
              className="size-3.5 shrink-0 mt-0.5 text-[#F2A93B]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
              <path d="M7 2v20" />
              <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
            </svg>
            <span className="line-clamp-1">
              <strong className="font-semibold text-white/90">
                Món đặc trưng:
              </strong>{" "}
              {item.signatureDish}
            </span>
          </div>

          {}
          {item.notes && (
            <p className="mt-2 text-xs italic text-white/50 line-clamp-2 border-l-2 border-[#F2A93B]/30 pl-2.5">
              &ldquo;{item.notes}&rdquo;
            </p>
          )}
        </div>

        {}
        <div className="flex items-center justify-between pt-2.5 border-t border-white/5 mt-1">
          <span className="text-[11px] text-white/40">
            Tọa độ:{" "}
            <span className="font-mono text-white/60">
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
            className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all active:scale-95 ${
              isSelected
                ? "bg-[#F2A93B] text-[#141414] shadow-md shadow-[#F2A93B]/20 font-bold"
                : "border border-white/10 bg-white/5 text-white/80 hover:border-[#F2A93B]/40 hover:bg-[#F2A93B]/10 hover:text-[#F2A93B]"
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
