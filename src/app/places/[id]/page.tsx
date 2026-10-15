import DetailHeader from "@/components/detail/DetailHeader"
import EditorialShowcaseCard from "@/components/detail/EditorialShowcaseCard"
import PlaceDetailBody from "@/components/detail/PlaceDetailBody"
import NavigationMenu from "@/components/NavigationMenu"
import ChatBox from "@/components/ChatBox"
import { mockScheduleItems } from "@/data/profileData"
import { ARCHIVE_PLACE_DETAILS, type PlaceDetailData } from "@/data/archivePlacesData"
import { ARCHIVE_ITEMS } from "@/constants/archivesData"

export function generateStaticParams() {
  const ids = new Set<string>()

  // 1. Add all archive place details keys
  Object.keys(ARCHIVE_PLACE_DETAILS).forEach((id) => ids.add(id))

  // 2. Add all mock schedule items
  mockScheduleItems.forEach((item) => ids.add(item.id))

  // 3. Add all archive items
  ARCHIVE_ITEMS.forEach((item) => ids.add(item.id))

  return Array.from(ids).map((id) => ({ id }))
}

interface PlaceDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function PlaceDetailPage({ params }: PlaceDetailPageProps) {
  const { id } = await params

  // 1. Check in detailed database first
  const archiveDetail = ARCHIVE_PLACE_DETAILS[id]

  // 2. Check in mockScheduleItems
  const foundSchedule = mockScheduleItems.find((item) => item.id === id)

  // 3. Check in ARCHIVE_ITEMS
  const foundArchiveItem = ARCHIVE_ITEMS.find((item) => item.id === id)

  // 4. Resolve display item
  let displayItem: PlaceDetailData

  if (archiveDetail) {
    displayItem = archiveDetail
  } else if (foundSchedule) {
    displayItem = {
      id: foundSchedule.id,
      city: foundSchedule.address.includes("Hà Nội")
        ? "TP. Hà Nội"
        : foundSchedule.address.includes("Hồ Chí Minh")
        ? "TP. Hồ Chí Minh"
        : "TP. Đà Nẵng",
      indexNo: foundSchedule.id.replace("sch_0", "0"),
      archiveCode: `archive 01${foundSchedule.id.replace("sch_0", "")}`,
      title: `${foundSchedule.placeName} | ${foundSchedule.signatureDish}`,
      image: foundSchedule.imageUrl,
      tags: [
        foundSchedule.category.split("&")[0].trim(),
        foundSchedule.signatureDish.split(",")[0].trim(),
        `Hẹn lúc ${foundSchedule.time}`,
      ],
      address: foundSchedule.address,
      time: foundSchedule.time,
      date: foundSchedule.date,
      guestsCount: foundSchedule.guestsCount,
      signatureDish: foundSchedule.signatureDish,
      notes: foundSchedule.notes || "Điểm hẹn ẩm thực đặc sắc đã được lưu vào lịch trình.",
      phone: "+84 24 3825 1234",
      hours: "06:00 - 21:30 hàng ngày",
    }
  } else if (foundArchiveItem) {
    displayItem = {
      id: foundArchiveItem.id,
      city: foundArchiveItem.city,
      indexNo: foundArchiveItem.index,
      archiveCode: foundArchiveItem.archiveNo,
      title: foundArchiveItem.title,
      image: foundArchiveItem.image,
      tags: foundArchiveItem.tags,
      address: `${foundArchiveItem.city}, Việt Nam`,
      time: "12:00",
      date: "20/10/2026",
      guestsCount: 2,
      signatureDish: foundArchiveItem.title.split("|")[0].trim(),
      notes: "Điểm hẹn ẩm thực chuẩn gu chọn lọc trong cẩm nang ẩm thực 3 miền.",
      phone: "+84 28 3822 5678",
      hours: "07:00 - 22:00 hàng ngày",
    }
  } else {
    displayItem = ARCHIVE_PLACE_DETAILS["hcm-com-tam"]
  }

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#111111] selection:bg-black selection:text-white pb-16">
      {/* Floating navigation & chat widgets */}
      <NavigationMenu />
      <ChatBox />

      {/* Header bar */}
      <DetailHeader placeTitle={displayItem.title.split("|")[0].trim()} />

      {/* Main Container */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        {/* Editorial Showcase Card (Exact Match to User Sample) */}
        <EditorialShowcaseCard
          city={displayItem.city}
          indexNo={displayItem.indexNo}
          archiveCode={displayItem.archiveCode}
          title={displayItem.title}
          image={displayItem.image}
          tags={displayItem.tags}
        />

        {/* Detailed Rendezvous, Story, Menu & Practical Guide */}
        <PlaceDetailBody
          address={displayItem.address}
          time={displayItem.time}
          date={displayItem.date}
          guestsCount={displayItem.guestsCount}
          signatureDish={displayItem.signatureDish}
          notes={displayItem.notes}
          phone={displayItem.phone}
          hours={displayItem.hours}
          story={displayItem.story}
          menuItems={displayItem.menuItems}
        />
      </main>
    </div>
  )
}
