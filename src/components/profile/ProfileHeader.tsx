import Link from "next/link"

export default function ProfileHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b-2 border-black bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Back Button & Breadcrumbs */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            href="/"
            className="group flex items-center gap-2.5 border-2 border-black bg-white px-3.5 py-2 text-xs sm:text-sm font-semibold text-black transition-all hover:bg-black hover:text-white active:translate-x-0.5 active:translate-y-0.5 shadow-[2px_2px_0px_#000000]"
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
            <span>Trang chủ HYUN</span>
          </Link>

          <span className="hidden sm:inline-block h-5 w-[2px] bg-black/20" aria-hidden="true" />

          <nav
            aria-label="Breadcrumb"
            className="hidden sm:flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-black/60"
          >
            <span>Hồ sơ cá nhân</span>
            <span className="text-black/30">/</span>
            <span className="text-black underline underline-offset-4 decoration-2">Lịch trình trải nghiệm</span>
          </nav>
        </div>

        {/* Member Badge */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 border-2 border-black bg-white px-3.5 py-1.5 text-xs font-bold text-black shadow-[2px_2px_0px_#000000]">
            <span className="size-2 bg-black animate-pulse" />
            <span>Thành viên Tinh Hoa</span>
          </div>
        </div>
      </div>
    </header>
  )
}
