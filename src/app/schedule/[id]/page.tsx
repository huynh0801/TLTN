import DetailHeader from "@/components/detail/DetailHeader"
import EditorialShowcaseCard from "@/components/detail/EditorialShowcaseCard"
import PlaceDetailBody from "@/components/detail/PlaceDetailBody"
import NavigationMenu from "@/components/NavigationMenu"
import ChatBox from "@/components/ChatBox"
import { mockScheduleItems } from "@/data/profileData"

export function generateStaticParams() {
  return [
    { id: "hcm-com-tam" },
    { id: "sch_01" },
    { id: "sch_02" },
    { id: "sch_03" },
    { id: "sch_04" },
    { id: "sch_05" },
    { id: "sch_06" },
  ]
}

interface PlaceDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function PlaceDetailPage({ params }: PlaceDetailPageProps) {
  const { id } = await params

  // 1. Dữ liệu chuẩn mực theo đúng hình ảnh người dùng đã gửi
  const comTamItem = {
    id: "hcm-com-tam",
    city: "TP. Hồ Chí Minh",
    indexNo: "02",
    archiveCode: "archive 015",
    title: "Cơm Tấm Phúc Lộc Thọ | Chuẩn vị cơm tấm truyền thống Sài Gòn",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=1000&auto=format&fit=crop&q=80",
    tags: ["Sườn nướng mật ong", "Canh rong biển", "Ăn trưa & tối"],
    address: "236 Đinh Tiên Hoàng, Phường Đa Kao, Quận 1, TP. Hồ Chí Minh",
    time: "12:15",
    date: "18/10/2026",
    guestsCount: 4,
    signatureDish: "Cơm tấm sườn cây nướng mật ong & Canh rong biển",
    notes: "Bàn 4 người đã xác nhận lịch hẹn vào khung giờ trưa 12:15.",
    phone: "+84 28 3822 5678",
    hours: "06:30 - 22:00 (Mở cửa cả ngày)",
  }

  // 2. Tìm kiếm trong danh sách mockScheduleItems nếu có
  const foundSchedule = mockScheduleItems.find((item) => item.id === id)

  // 3. Quyết định item hiển thị
  const displayItem =
    id === "hcm-com-tam" || !foundSchedule
      ? comTamItem
      : {
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
          notes: foundSchedule.notes,
          phone: "+84 24 3825 1234",
          hours: "06:00 - 21:30 hàng ngày",
        }

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#111111] selection:bg-black selection:text-white pb-16">
      {/* Floating navigation & chat widgets */}
      <NavigationMenu />
      <ChatBox />

      {/* Header bar */}
      <DetailHeader />

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
        />
      </main>
    </div>
  )
}
