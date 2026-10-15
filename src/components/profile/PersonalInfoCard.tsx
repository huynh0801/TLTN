"use client" /* Ambient background decoration */ /* 1. Avatar & Identity Header */ /* Avatar Container with Verified Crown Badge */ /* Crown Verified Badge */ /* Names & Title */ /* Bio text */ /* Subtle Divider */ /* 2. Contact & Location Information */ /* Location */ /* Email */ /* Phone */ /* Subtle Divider */ /* 3. Stats Grid 2x2 */ /* Quán đã ghé */ /* Bài đánh giá */ /* Lịch trình ẩm thực */ /* Điểm thưởng foodie */ /* Subtle Divider */ /* 4. Favorite Taste Tags */ /* Subtle Divider */ /* 5. Schedule Filter Tabs */

import type { UserProfile } from "@/types/profile"

export interface PersonalInfoCardProps {
  profile: UserProfile
  filterStatus: "all" | "upcoming" | "completed"
  onFilterChange: (status: "all" | "upcoming" | "completed") => void
  schedulesCount: {
    all: number
    upcoming: number
    completed: number
  }
}

export default function PersonalInfoCard({
  profile,
  filterStatus,
  onFilterChange,
  schedulesCount,
}: PersonalInfoCardProps) {
  const filterTabs: Array<{
    id: "all" | "upcoming" | "completed"
    label: string
    count: number
  }> = [
    { id: "all", label: "Tất cả", count: schedulesCount.all },
    { id: "upcoming", label: "Sắp tới", count: schedulesCount.upcoming },
    { id: "completed", label: "Đã ghé", count: schedulesCount.completed },
  ]

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#1c1c1c] p-5 shadow-2xl backdrop-blur-sm sm:rounded-3xl sm:p-7">
      {}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-[#F2A93B]/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 bottom-1/3 size-64 rounded-full bg-[#F2A93B]/5 blur-3xl"
      />

      <div className="relative z-10 flex flex-col gap-6 sm:gap-7">
        {}
        <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center">
            {}
            <div className="relative shrink-0">
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                className="size-20 rounded-full border-2 border-[#F2A93B]/70 object-cover shadow-lg shadow-black/50 sm:size-24"
              />
              {}
              <div
                className="absolute -bottom-1 -right-1 flex size-7 items-center justify-center rounded-full bg-[#F2A93B] text-[#1c1c1c] shadow-md ring-4 ring-[#1c1c1c] sm:size-8"
                title="Thành viên Tinh Hoa Xác Thực"
                aria-label="Thành viên Tinh Hoa Xác Thực"
              >
                <svg
                  className="size-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 2l2.87 5.82 6.43.93-4.65 4.54 1.1 6.4L12 16.67l-5.75 3.02 1.1-6.4-4.65-4.54 6.43-.93L12 2z" />
                </svg>
              </div>
            </div>

            {}
            <div className="flex flex-col items-center sm:items-start">
              <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                  {profile.name}
                </h2>
                <span className="inline-flex items-center rounded-full border border-[#F2A93B]/30 bg-[#F2A93B]/10 px-2.5 py-0.5 text-xs font-semibold text-[#F2A93B]">
                  VIP Foodie
                </span>
              </div>
              <p className="mt-0.5 text-sm font-medium text-white/50">
                {profile.handle}
              </p>
              <div className="mt-2.5 inline-flex items-center rounded-full border border-[#F2A93B]/25 bg-[#F2A93B]/10 px-2.5 py-1 text-xs font-semibold text-[#F2A93B] w-fit">
                {profile.title}
              </div>
            </div>
          </div>

          {}
          <p className="mt-4 text-sm leading-relaxed text-white/75 sm:mt-5">
            {profile.bio}
          </p>
        </div>

        {}
        <div className="h-px w-full bg-white/10" aria-hidden="true" />

        {}
        <div className="flex flex-col gap-2.5 text-xs sm:text-sm">
          {}
          <div className="flex items-center gap-3 text-white/75">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-[#F2A93B]">
              <svg
                className="size-4"
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
            </span>
            <span className="truncate">{profile.locationName}</span>
          </div>

          {}
          <a
            href={`mailto:${profile.email}`}
            className="group flex items-center gap-3 text-white/75 transition-colors hover:text-white"
          >
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-[#F2A93B] transition-colors group-hover:border-[#F2A93B]/40 group-hover:bg-[#F2A93B]/10">
              <svg
                className="size-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </span>
            <span className="truncate group-hover:underline">
              {profile.email}
            </span>
          </a>

          {}
          <a
            href={`tel:${profile.phone.replace(/\s+/g, "")}`}
            className="group flex items-center gap-3 text-white/75 transition-colors hover:text-white"
          >
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-[#F2A93B] transition-colors group-hover:border-[#F2A93B]/40 group-hover:bg-[#F2A93B]/10">
              <svg
                className="size-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </span>
            <span className="truncate group-hover:underline">
              {profile.phone}
            </span>
          </a>
        </div>

        {}
        <div className="h-px w-full bg-white/10" aria-hidden="true" />

        {}
        <div>
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-white/50">
              Thống kê hoạt động
            </span>
            <span className="text-[11px] font-medium text-[#F2A93B]">
              Ẩm thực Hà Nội
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
            {}
            <div className="group rounded-xl border border-white/5 bg-[#252525]/80 p-3.5 transition-all hover:border-[#F2A93B]/30 hover:bg-[#282828]">
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/50">Quán đã ghé</span>
                <span className="text-[#F2A93B]/70 group-hover:text-[#F2A93B]">
                  <svg
                    className="size-4"
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
                </span>
              </div>
              <p className="mt-2 text-xl font-bold text-white transition-colors group-hover:text-[#F2A93B]">
                {profile.stats.visitedPlaces}
              </p>
            </div>

            {}
            <div className="group rounded-xl border border-white/5 bg-[#252525]/80 p-3.5 transition-all hover:border-[#F2A93B]/30 hover:bg-[#282828]">
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/50">Bài đánh giá</span>
                <span className="text-[#F2A93B]/70 group-hover:text-[#F2A93B]">
                  <svg
                    className="size-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </span>
              </div>
              <p className="mt-2 text-xl font-bold text-white transition-colors group-hover:text-[#F2A93B]">
                {profile.stats.reviewsCount}
              </p>
            </div>

            {}
            <div className="group rounded-xl border border-white/5 bg-[#252525]/80 p-3.5 transition-all hover:border-[#F2A93B]/30 hover:bg-[#282828]">
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/50">Lịch trình</span>
                <span className="text-[#F2A93B]/70 group-hover:text-[#F2A93B]">
                  <svg
                    className="size-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                    <line x1="16" x2="16" y1="2" y2="6" />
                    <line x1="8" x2="8" y1="2" y2="6" />
                    <line x1="3" x2="21" y1="10" y2="10" />
                  </svg>
                </span>
              </div>
              <p className="mt-2 text-xl font-bold text-white transition-colors group-hover:text-[#F2A93B]">
                {profile.stats.upcomingTrips}
              </p>
            </div>

            {}
            <div className="group rounded-xl border border-white/5 bg-[#252525]/80 p-3.5 transition-all hover:border-[#F2A93B]/30 hover:bg-[#282828]">
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/50">Điểm thưởng</span>
                <span className="text-[#F2A93B]/70 group-hover:text-[#F2A93B]">
                  <svg
                    className="size-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </span>
              </div>
              <p className="mt-2 text-xl font-bold text-white transition-colors group-hover:text-[#F2A93B]">
                {profile.stats.rewardPoints.toLocaleString("vi-VN")}
              </p>
            </div>
          </div>
        </div>

        {}
        <div className="h-px w-full bg-white/10" aria-hidden="true" />

        {}
        <div>
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-white/50">
              Gu ẩm thực yêu thích
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {profile.favoriteTags.map((tag) => (
              <span
                key={tag}
                className="cursor-default rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80 transition-all hover:border-[#F2A93B]/40 hover:bg-[#F2A93B]/10 hover:text-[#F2A93B]"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {}
        <div className="h-px w-full bg-white/10" aria-hidden="true" />

        {}
        <div>
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-white/50">
              Bộ lọc lịch trình
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2 rounded-xl border border-white/10 bg-[#141414] p-1.5">
            {filterTabs.map((tab) => {
              const isActive = filterStatus === tab.id
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => onFilterChange(tab.id)}
                  className={`flex flex-col items-center justify-center rounded-lg px-1 py-2 text-xs transition-all active:scale-95 ${
                    isActive
                      ? "bg-[#F2A93B] font-bold text-[#141414] shadow-md shadow-[#F2A93B]/20"
                      : "text-white/70 hover:bg-white/5 hover:text-white"
                  }`}
                  aria-pressed={isActive}
                >
                  <span className="font-semibold">{tab.label}</span>
                  <span
                    className={`mt-1 inline-flex items-center justify-center rounded-full px-2 py-0.5 text-[11px] leading-none ${
                      isActive
                        ? "bg-black/15 font-bold text-[#141414]"
                        : "bg-white/10 text-white/60"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
