"use client"

import Link from "next/link"

export interface DetailHeaderProps {
  placeTitle?: string
}

export default function DetailHeader({ placeTitle }: DetailHeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b-2 border-black bg-white/95 backdrop-blur-md pt-[env(safe-area-inset-top)]">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Navigation Back Buttons */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          <Link
            href="/"
            className="group flex items-center gap-2 border-2 border-black bg-white px-3.5 py-2 text-xs sm:text-sm font-bold text-black transition-all hover:bg-black hover:text-white shadow-[2px_2px_0px_#000000]"
            aria-label="Quay lại Trang chủ"
          >
            <svg
              className="size-4 transition-transform group-hover:-translate-x-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span>Trang chủ</span>
          </Link>

          <Link
            href="/schedule"
            className="flex items-center gap-1.5 border-2 border-black bg-neutral-100 px-3 py-2 text-xs sm:text-sm font-semibold text-black transition-all hover:bg-black hover:text-white shadow-[2px_2px_0px_#000000]"
          >
            <svg
              className="size-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span>Lịch trình & Bản đồ</span>
          </Link>

          <span className="hidden md:inline-block h-5 w-[2px] bg-black/20" aria-hidden="true" />

          <nav
            aria-label="Breadcrumb"
            className="hidden md:flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-black/60"
          >
            <span>HYUN</span>
            <span className="text-black/30">/</span>
            <span>Khám phá</span>
            <span className="text-black/30">/</span>
            <span className="text-black underline underline-offset-4 decoration-2 truncate max-w-[200px]">
              {placeTitle || "Chi tiết quán ăn"}
            </span>
          </nav>
        </div>

        {/* Share & Save Actions */}
        <div className="flex items-center gap-2">
          <Link
            href="/profile"
            className="hidden sm:inline-flex border-2 border-black bg-white px-3 py-1.5 text-xs font-bold text-black hover:bg-neutral-100 shadow-[2px_2px_0px_#000000]"
          >
            Hồ sơ
          </Link>
          <div className="flex items-center gap-2 border-2 border-black bg-black text-white px-3 py-1.5 text-xs font-bold shadow-[2px_2px_0px_#000000]">
            <span className="size-2 bg-emerald-400 animate-pulse" />
            <span>Điểm Hẹn Chuẩn Gu</span>
          </div>
        </div>
      </div>
    </header>
  )
}
