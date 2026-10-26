"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"

export interface MainHeaderProps {
  activeTab?: "home" | "explore" | "places" | "articles" | "about"
}

export default function MainHeader({ activeTab = "home" }: MainHeaderProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const profileMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setProfileMenuOpen(false)
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setProfileMenuOpen(false)
      }
    }

    if (profileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      document.addEventListener("keydown", handleKeyDown)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [profileMenuOpen])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/places?q=${encodeURIComponent(searchQuery.trim())}`)
    } else {
      router.push("/places")
    }
  }

  const navItems = [
    { id: "home", label: "Trang chủ", href: "/" },
    { id: "explore", label: "Khám phá", href: "/places" },
    { id: "places", label: "Địa điểm", href: "/places" },
    { id: "articles", label: "Bài viết", href: "#articles" },
    { id: "about", label: "Về chúng tôi", href: "#about" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full bg-[#fdefdf]/95 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* 1. Left: Brand Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0 py-2">
          <Image
            src="/img/logo.png"
            alt="hyun - Ăn ngon, gặp nhau, thêm yêu"
            width={180}
            height={56}
            priority
            className="h-12 sm:h-14 w-auto object-contain"
          />
        </Link>

        {/* 2. Middle: Navigation Links (Desktop lg+) */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.id
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`rounded-full px-5 py-2 text-sm xl:text-[15px] transition-all duration-200 ${
                  isActive
                    ? "bg-[#FDD5D5] font-semibold text-[#D34B5E] shadow-sm"
                    : "font-medium text-[#1E3A5F] hover:bg-white/60 hover:text-[#D34B5E]"
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* 3. Right: Search Box & Profile Avatar */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Search Pill */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden sm:flex items-center gap-2 rounded-full border border-[#ebd2bd] bg-white/80 px-4 py-2 transition-all duration-200 focus-within:border-[#1E3A5F] focus-within:bg-white focus-within:shadow-sm w-52 md:w-64 xl:w-72"
          >
            <svg
              className="size-4 shrink-0 text-[#1E3A5F]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm nhà hàng, món ăn, khu vực..."
              className="w-full bg-transparent text-xs xl:text-sm text-[#1E3A5F] placeholder-[#8E9DAE] outline-none"
            />
          </form>

          {/* Integrated Profile & Hamburger Menu Trigger */}
          <div className="relative" ref={profileMenuRef}>
            <button
              type="button"
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              className="group flex items-center gap-2.5 rounded-full border border-[#ebd2bd] bg-white/90 py-1 pl-3.5 pr-1 text-[#1E3A5F] shadow-xs transition-all duration-200 hover:border-[#1E3A5F]/40 hover:bg-white hover:shadow-md active:scale-95 cursor-pointer"
              aria-label="Menu tài khoản cá nhân"
              aria-expanded={profileMenuOpen}
            >
              {/* 3-dots Hamburger Icon */}
              <span className="flex items-center gap-1" aria-hidden="true">
                <span className="size-1 rounded-full bg-[#1E3A5F] transition-transform duration-200 group-hover:scale-125" />
                <span className="size-1 rounded-full bg-[#1E3A5F] transition-transform duration-200 group-hover:scale-125" />
                <span className="size-1 rounded-full bg-[#1E3A5F] transition-transform duration-200 group-hover:scale-125" />
              </span>

              {/* Profile Avatar Icon */}
              <span className="flex size-8 sm:size-9 items-center justify-center rounded-full bg-[#FCD5D5] text-[#1E3A5F] shadow-inner transition-transform duration-200 group-hover:scale-105">
                <svg
                  className="size-4.5 sm:size-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </button>

            {/* Dropdown Navigation Menu Card */}
            {profileMenuOpen && (
              <div
                className="absolute right-0 top-full mt-2.5 w-64 animate-in fade-in zoom-in-95 duration-200 rounded-2xl bg-[#1c1c1c] p-4 text-white shadow-2xl border border-white/10 z-50"
                role="dialog"
                aria-label="Menu tài khoản"
              >
                {/* Header Info */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-2 px-1">
                  <div className="flex items-center gap-2.5">
                    <div className="flex size-8 items-center justify-center rounded-full bg-[#FCD5D5] text-[#1E3A5F]">
                      <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">Tài khoản HYUN</p>
                      <p className="text-[10px] text-white/60">Foodie Member</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setProfileMenuOpen(false)}
                    className="text-white/50 hover:text-white transition-colors p-1"
                    aria-label="Đóng menu"
                  >
                    <svg
                      className="size-3.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>

                {/* Navigation Menu Items */}
                <nav className="flex flex-col gap-1">
                  <Link
                    href="/profile"
                    onClick={() => setProfileMenuOpen(false)}
                    className="group flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-white/90 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    <svg
                      className="size-4 text-white/70 group-hover:text-white group-hover:scale-110 transition-all shrink-0"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    <span>Hồ sơ cá nhân</span>
                  </Link>

                  <Link
                    href="/schedule"
                    onClick={() => setProfileMenuOpen(false)}
                    className="group flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-white/90 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    <svg
                      className="size-4 text-white/70 group-hover:text-white group-hover:scale-110 transition-all shrink-0"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    <span>Lịch hẹn & Kế hoạch</span>
                  </Link>

                  <Link
                    href="/places"
                    onClick={() => setProfileMenuOpen(false)}
                    className="group flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-white/90 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    <svg
                      className="size-4 text-white/70 group-hover:text-white group-hover:scale-110 transition-all shrink-0"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <span>Khám phá địa điểm</span>
                  </Link>
                </nav>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex size-10 items-center justify-center rounded-full border border-[#ebd2bd] bg-white text-[#1E3A5F] lg:hidden"
            aria-label="Mở menu điều hướng"
          >
            {mobileMenuOpen ? (
              <svg
                className="size-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg
                className="size-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="border-t border-[#ebd2bd]/50 bg-[#fdefdf] px-4 py-4 lg:hidden animate-in slide-in-from-top-2 duration-200">
          {/* Mobile Search input */}
          <form
            onSubmit={handleSearchSubmit}
            className="mb-4 flex items-center gap-2 rounded-full border border-[#ebd2bd] bg-white px-4 py-2.5 sm:hidden"
          >
            <svg
              className="size-4 shrink-0 text-[#1E3A5F]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm nhà hàng, món ăn, khu vực..."
              className="w-full bg-transparent text-sm text-[#1E3A5F] placeholder-[#8E9DAE] outline-none"
            />
          </form>

          {/* Mobile Navigation List */}
          <nav className="flex flex-col gap-1.5">
            {navItems.map((item) => {
              const isActive = activeTab === item.id
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-base transition-colors ${
                    isActive
                      ? "bg-[#FDD5D5] font-semibold text-[#D34B5E]"
                      : "font-medium text-[#1E3A5F] hover:bg-white/60"
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="size-2 rounded-full bg-[#D34B5E]" />
                  )}
                </Link>
              )
            })}
          </nav>
        </div>
      )}
    </header>
  )
}
