"use client"

import { useState } from "react"
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
    <header className="sticky top-0 z-50 w-full border-b border-[#ebd2bd] bg-[#fdefdf]/95 backdrop-blur-md transition-all">
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

          {/* User Profile Avatar */}
          <Link
            href="/profile"
            className="flex size-10 sm:size-11 items-center justify-center rounded-full bg-[#FCD5D5] text-[#1E3A5F] shadow-sm transition-transform duration-200 hover:scale-105 active:scale-95"
            aria-label="Tài khoản cá nhân"
          >
            <svg
              className="size-5"
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
          </Link>

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
        <div className="border-t border-[#ebd2bd] bg-[#fdefdf] px-4 py-4 lg:hidden animate-in slide-in-from-top-2 duration-200">
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
