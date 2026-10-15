"use client"

import Link from "next/link"

export default function PlacesHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b-2 border-black bg-white/95 backdrop-blur-md pt-[env(safe-area-inset-top)] transition-all">
      <div className="mx-auto flex h-16 sm:h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 border-2 border-black bg-white px-3.5 py-1.5 text-xs font-bold text-black transition-all hover:bg-black hover:text-white shadow-[2px_2px_0px_#000000]"
          aria-label="Quay lại trang chủ"
        >
          <span aria-hidden="true" className="transition-transform group-hover:-translate-x-1">←</span>
          <span>Trang chủ</span>
        </Link>

        <div className="hidden sm:flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-zinc-500 select-none">
          <span className="font-bold text-black">HYUN</span>
          <span className="text-zinc-300">/</span>
          <span>KHÁM PHÁ ĐỊA ĐIỂM</span>
        </div>

        <Link
          href="/profile"
          className="group inline-flex items-center gap-1.5 border-2 border-black bg-black px-3.5 py-1.5 text-xs font-bold text-white transition-all hover:bg-neutral-800 shadow-[2px_2px_0px_#000000]"
        >
          <span>Lịch trình & Profile</span>
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </header>
  )
}
