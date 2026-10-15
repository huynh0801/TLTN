"use client"

import Link from "next/link"

export default function PlacesHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-black/10 bg-white/90 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white px-3.5 py-1.5 text-xs font-semibold text-black transition-all hover:bg-black hover:text-white"
          aria-label="Quay lại trang chủ"
        >
          <span aria-hidden="true">←</span>
          <span>Trang chủ</span>
        </Link>

        <div className="hidden sm:flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-zinc-500 select-none">
          <span className="font-bold text-black">HYUN</span>
          <span className="text-zinc-300">/</span>
          <span>KHÁM PHÁ ĐỊA ĐIỂM</span>
        </div>

        <Link
          href="/profile"
          className="inline-flex items-center gap-1.5 rounded-full border border-black bg-black px-3.5 py-1.5 text-xs font-semibold text-white transition-all hover:bg-zinc-800"
        >
          <span>Lịch trình & Profile</span>
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </header>
  )
}
