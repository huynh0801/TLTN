import Link from "next/link"

export default function ScheduleHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b-2 border-black bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Navigation Back Buttons */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <Link
            href="/"
            className="group flex items-center gap-2 border-2 border-black bg-white px-3 py-2 text-xs sm:text-sm font-semibold text-black transition-all hover:bg-black hover:text-white shadow-[2px_2px_0px_#000000]"
            aria-label="Quay về Trang chủ HYUN"
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
            <span className="hidden sm:inline">Trang chủ HYUN</span>
            <span className="sm:hidden">Trang chủ</span>
          </Link>

          <Link
            href="/profile"
            className="flex items-center gap-1.5 border-2 border-black bg-neutral-100 px-3 py-2 text-xs sm:text-sm font-semibold text-black transition-all hover:bg-black hover:text-white shadow-[2px_2px_0px_#000000]"
          >
            <svg
              className="size-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span>Hồ sơ</span>
          </Link>

          <span className="hidden md:inline-block h-5 w-[2px] bg-black/20" aria-hidden="true" />

          <nav
            aria-label="Breadcrumb"
            className="hidden md:flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-black/60"
          >
            <span>Lịch hẹn ẩm thực</span>
            <span className="text-black/30">/</span>
            <span className="text-black underline underline-offset-4 decoration-2">Bản đồ hành trình</span>
          </nav>
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 border-2 border-black bg-white px-3 py-1.5 text-xs font-bold text-black shadow-[2px_2px_0px_#000000]">
            <span className="size-2 bg-emerald-500 animate-pulse" />
            <span className="hidden sm:inline">Đang hoạt động</span>
            <span className="sm:hidden">Online</span>
          </div>
        </div>
      </div>
    </header>
  )
}
