import Link from "next/link"

export default function ProfileHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#161616]/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Back Button & Breadcrumbs */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            href="/"
            className="group flex items-center gap-2.5 rounded-full border border-white/10 bg-[#222222] px-3.5 py-2 text-xs sm:text-sm font-medium text-white/80 transition-all hover:border-[#F2A93B]/50 hover:bg-[#2c2c2c] hover:text-white active:scale-95"
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

          <span className="hidden sm:inline-block h-5 w-px bg-white/15" aria-hidden="true" />

          <nav
            aria-label="Breadcrumb"
            className="hidden sm:flex items-center gap-2 text-xs font-medium tracking-wide uppercase text-white/50"
          >
            <span>Hồ sơ cá nhân</span>
            <span className="text-white/20">/</span>
            <span className="text-[#F2A93B]">Lịch trình trải nghiệm</span>
          </nav>
        </div>

        {/* Member Badge */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-full border border-[#F2A93B]/20 bg-[#F2A93B]/10 px-3 py-1.5 sm:px-3.5 text-xs font-semibold text-[#F2A93B] shadow-[0_0_12px_rgba(242,169,59,0.1)]">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#F2A93B] opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-[#F2A93B]" />
            </span>
            <span>Thành viên Tinh Hoa</span>
          </div>
        </div>
      </div>
    </header>
  )
}
