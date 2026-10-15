"use client"

import { useState, useMemo } from "react"
import ProfileHeader from "@/components/profile/ProfileHeader"
import PersonalInfoCard from "@/components/profile/PersonalInfoCard"
import InteractiveMap from "@/components/profile/InteractiveMap"
import ScheduleTimeline from "@/components/profile/ScheduleTimeline"
import NavigationMenu from "@/components/NavigationMenu"
import ChatBox from "@/components/ChatBox"
import { mockUserProfile, mockScheduleItems } from "@/data/profileData"

const filterLabelMap: Record<"all" | "upcoming" | "completed", string> = {
  all: "Tất cả",
  upcoming: "Sắp tới",
  completed: "Đã ghé",
}

export default function ProfilePage() {
  const [filterStatus, setFilterStatus] = useState<"all" | "upcoming" | "completed">("all")
  const [selectedScheduleId, setSelectedScheduleId] = useState<string | null>("sch_01")

  // Tính toán số lượng lịch trình theo từng trạng thái
  const schedulesCount = useMemo(() => {
    return {
      all: mockScheduleItems.length,
      upcoming: mockScheduleItems.filter((item) => item.status === "upcoming").length,
      completed: mockScheduleItems.filter((item) => item.status === "completed").length,
    }
  }, [])

  // Lọc danh sách lịch trình theo filterStatus
  const filteredItems = useMemo(() => {
    if (filterStatus === "upcoming") {
      return mockScheduleItems.filter((item) => item.status === "upcoming")
    }
    if (filterStatus === "completed") {
      return mockScheduleItems.filter((item) => item.status === "completed")
    }
    return mockScheduleItems
  }, [filterStatus])

  // Xử lý khi đổi tab bộ lọc
  const handleFilterChange = (status: "all" | "upcoming" | "completed") => {
    setFilterStatus(status)
    const newItems = mockScheduleItems.filter((item) => {
      if (status === "all") return true
      return item.status === status
    })

    if (newItems.length > 0) {
      if (!newItems.some((item) => item.id === selectedScheduleId)) {
        setSelectedScheduleId(newItems[0].id)
      }
    } else {
      setSelectedScheduleId(null)
    }
  }

  // Xử lý chọn lịch trình và cuộn mượt đến thẻ tương ứng
  const handleSelectSchedule = (id: string) => {
    setSelectedScheduleId(id)
    if (typeof document !== "undefined") {
      const element = document.getElementById("schedule-item-" + id)
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "nearest" })
      }
    }
  }

  return (
    <div className="min-h-screen bg-[#141414] text-white selection:bg-[#F2A93B]/30 selection:text-white">
      {/* Floating navigation and chat widgets */}
      <NavigationMenu />
      <ChatBox />

      {/* Header bar */}
      <ProfileHeader />

      {/* Main content grid */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-6 sm:gap-8 lg:grid-cols-12">
          {/* Cột trái: Hồ sơ cá nhân (Sticky trên Desktop) */}
          <aside className="lg:col-span-4 lg:sticky lg:top-28">
            <PersonalInfoCard
              profile={mockUserProfile}
              filterStatus={filterStatus}
              onFilterChange={handleFilterChange}
              schedulesCount={schedulesCount}
            />
          </aside>

          {/* Cột phải: Bản đồ tương tác & Dòng thời gian lịch trình */}
          <section className="space-y-8 lg:col-span-8">
            <InteractiveMap
              homeCoordinate={mockUserProfile.homeCoordinate}
              userName={mockUserProfile.name}
              items={filteredItems}
              selectedScheduleId={selectedScheduleId}
              onSelectSchedule={handleSelectSchedule}
            />
            <ScheduleTimeline
              items={filteredItems}
              selectedScheduleId={selectedScheduleId}
              onSelectSchedule={handleSelectSchedule}
              filterLabel={filterLabelMap[filterStatus]}
            />
          </section>
        </div>
      </main>
    </div>
  )
}
