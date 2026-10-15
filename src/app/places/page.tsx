import type { Metadata } from "next"
import NavigationMenu from "@/components/NavigationMenu"
import ChatBox from "@/components/ChatBox"
import PlacesHeader from "@/components/places/PlacesHeader"
import PlacesExplorer from "@/components/places/PlacesExplorer"

export const metadata: Metadata = {
  title: "Khám Phá Địa Điểm Ẩm Thực | HYUN",
  description:
    "Khám phá danh bạ quán ăn truyền thống, món ngon đặc sản 3 miền và tìm kiếm địa điểm ẩm thực chuẩn vị Việt Nam.",
}

export default function PlacesPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] text-[#111111] selection:bg-black selection:text-white pb-24">
      <NavigationMenu />
      <ChatBox />
      <PlacesHeader />
      <main className="mx-auto max-w-7xl px-4 pt-12 pb-16 sm:px-6 sm:pt-16 sm:pb-24 lg:px-8 lg:pt-20">
        <PlacesExplorer />
      </main>
    </div>
  )
}
