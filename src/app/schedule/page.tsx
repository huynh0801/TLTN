"use client"

import { useState, useMemo } from "react"
import ScheduleHeader from "@/components/schedule/ScheduleHeader"
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

export default function SchedulePage() {
  const [filterStatus, setFilterStatus] = useState<"all" | "upcoming" | "completed">("all")
  const [selectedScheduleId, setSelectedScheduleId] = useState<string | null>("sch_01")

  // Đếm số lượng theo trạng thái
  const schedulesCount = useMemo(() => {
    return {
      all: mockScheduleItems.length,
      upcoming: mockScheduleItems.filter((item) => item.status === "upcoming").length,
      completed: mockScheduleItems.filter((item) => item.status === "completed").length,
    }
  }, [])

  // Lọc lịch trình theo tab đang chọn
  const filteredItems = useMemo(() => {
    if (filterStatus === "upcoming") {
      return mockScheduleItems.filter((item) => item.status === "upcoming")
    }
    if (filterStatus === "completed") {
      return mockScheduleItems.filter((item) => item.status === "completed")
    }
    return mockScheduleItems
  }, [filterStatus])

  // Chuyển tab bộ lọc
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

  // Chọn lịch trình từ danh sách hoặc bản đồ
  const handleSelectSchedule = (id: string) => {
    setSelectedScheduleId(id)
    if (typeof document !== "undefined") {
      const element = document.getElementById("schedule-item-" + id)
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "nearest" })
      }
    }
  }

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
    <div className="min-h-screen bg-[#fafafa] text-[#111111] selection:bg-black selection:text-white">
      {/* Floating navigation and chat widgets */}
      <NavigationMenu />
      <ChatBox />

      {/* Header bar */}
      <ScheduleHeader />

      {/* Main Container */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
        {/* Page Title & Filter Bar */}
        <div className="mb-8 border-2 border-black bg-white p-5 sm:p-7 shadow-[4px_4px_0px_#000000]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="inline-block border border-black bg-black px-2.5 py-0.5 text-xs font-bold text-white uppercase tracking-wider mb-2">
                Hành Trình Food Tour
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-black tracking-tight uppercase">
                Lịch Trình Ẩm Thực & Bản Đồ Điểm Hẹn
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-neutral-600 font-medium">
                Khám phá vị trí các quán ăn chuẩn gu tại Hà Nội cùng các mốc thời gian trải nghiệm
              </p>
            </div>

            {/* Quick Filter Tabs */}
            <div className="flex items-center gap-2 border-2 border-black bg-neutral-100 p-1.5 self-start sm:self-auto">
              {filterTabs.map((tab) => {
                const isActive = filterStatus === tab.id
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => handleFilterChange(tab.id)}
                    className={`flex items-center gap-2 px-3 py-1.5 text-xs font-bold transition-all ${
                      isActive
                        ? "border-2 border-black bg-black text-white shadow-[2px_2px_0px_#ffffff]"
                        : "border border-transparent bg-transparent text-black hover:border-black hover:bg-white"
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span
                      className={`inline-flex items-center justify-center px-1.5 py-0.2 text-[10px] leading-tight font-bold ${
                        isActive
                          ? "bg-white text-black"
                          : "bg-neutral-200 text-neutral-800"
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

        {/* 2-Column Content Layout: Map on Left (or Sticky on Desktop), Timeline on Right */}
        <div className="grid grid-cols-1 items-start gap-6 sm:gap-8 lg:grid-cols-12">
          {/* Cột trái (Sticky trên Desktop): Bản đồ vị trí tương tác */}
          <section className="lg:col-span-6 lg:sticky lg:top-28">
            <InteractiveMap
              homeCoordinate={mockUserProfile.homeCoordinate}
              userName={mockUserProfile.name}
              items={filteredItems}
              selectedScheduleId={selectedScheduleId}
              onSelectSchedule={handleSelectSchedule}
            />
          </section>

          {/* Cột phải: Dòng thời gian lịch trình chi tiết */}
          <section className="lg:col-span-6">
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
