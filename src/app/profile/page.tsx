"use client"

import Link from "next/link"
import ProfileHeader from "@/components/profile/ProfileHeader"
import PersonalInfoCard from "@/components/profile/PersonalInfoCard"
import NavigationMenu from "@/components/NavigationMenu"
import ChatBox from "@/components/ChatBox"
import { mockUserProfile, mockScheduleItems } from "@/data/profileData"

export default function ProfilePage() {
  const upcomingSchedules = mockScheduleItems.filter(
    (item) => item.status === "upcoming" || item.status === "in_progress"
  )

  const badges = [
    {
      title: "Chuyên Gia Phở Bò",
      desc: "Đã trải nghiệm hơn 20 quán phở gia truyền tại Hà Nội",
      icon: "🍜",
      level: "Cấp 3",
    },
    {
      title: "Gu Cà Phê Phố Cổ",
      desc: "Khám phá trọn vẹn hương vị cà phê trứng & cà phê muối",
      icon: "☕",
      level: "Cấp 2",
    },
    {
      title: "Thực Khách Tinh Hoa",
      desc: "Top 1% người dùng có bài đánh giá hữu ích nhất tháng",
      icon: "🏆",
      level: "VIP",
    },
    {
      title: "Hành Trình 3 Miền",
      desc: "Đã check-in ẩm thực tại Hà Nội, Sài Gòn, Đà Lạt & Đà Nẵng",
      icon: "🗺️",
      level: "Toàn Quốc",
    },
  ]

  const recentReviews = [
    {
      id: "rev_01",
      placeName: "Phở Gia Truyền Bát Đàn",
      rating: 5,
      date: "14/10/2026",
      dish: "Phở bò tái nạm",
      comment:
        "Nước dùng trong veo nhưng ngọt sâu từ xương bò hầm tự nhiên, không mì chính. Thịt tái mềm ngọt, bánh phở mỏng dẻo chuẩn vị xưa.",
    },
    {
      id: "rev_02",
      placeName: "Cà phê Giảng - Nguyễn Hữu Huân",
      rating: 5,
      date: "12/10/2026",
      dish: "Cà phê trứng nóng",
      comment:
        "Lớp kem trứng đánh bông mịn như nhung, thơm nức không hề tanh, quyện cùng cốt cà phê đậm đà. Ngồi góc ban công tầng 2 ngắm phố cổ rất thư thái.",
    },
    {
      id: "rev_03",
      placeName: "Lẩu Ếch Dũng Béo Lò Đúc",
      rating: 4.8,
      date: "09/10/2026",
      dish: "Lẩu ếch măng cay",
      comment:
        "Đùi ếch xào tía tô giòn rụm bên ngoài mọng nước bên trong. Nước lẩu cay chua vừa vặn, rau muống và măng chua ăn kèm giòn sần sật.",
    },
  ]

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#111111] selection:bg-black selection:text-white">
      {/* Floating navigation and chat widgets */}
      <NavigationMenu />
      <ChatBox />

      {/* Header bar */}
      <ProfileHeader />

      {/* Main content grid */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-6 sm:gap-8 lg:grid-cols-12">
          {/* Cột trái: Thẻ hồ sơ cá nhân (Sticky trên Desktop) */}
          <aside className="lg:col-span-4 lg:sticky lg:top-28">
            <PersonalInfoCard
              profile={mockUserProfile}
              schedulesCount={{
                all: mockScheduleItems.length,
                upcoming: upcomingSchedules.length,
                completed: mockScheduleItems.length - upcomingSchedules.length,
              }}
            />
          </aside>

          {/* Cột phải: Chi tiết hồ sơ, Quán đã lưu, Huy hiệu & Lối tắt sang Lịch trình */}
          <section className="space-y-6 sm:space-y-8 lg:col-span-8">
            {/* Banner nổi bật dẫn sang trang Lịch trình & Bản đồ */}
            <div className="border-2 border-black bg-black p-6 sm:p-8 text-white shadow-[4px_4px_0px_#000000]">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
                <div className="space-y-2">
                  <div className="inline-block border border-white bg-white px-2 py-0.5 text-[11px] font-bold text-black uppercase tracking-wider">
                    Lịch Hẹn & Bản Đồ Điểm Đến
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight">
                    Bạn có {upcomingSchedules.length} lịch trình ẩm thực sắp tới
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 font-medium max-w-xl leading-relaxed">
                    Khám phá toàn bộ lịch trình food tour, vị trí từng quán ăn trên bản đồ OpenStreetMap tương tác và chỉ đường chi tiết.
                  </p>
                </div>

                <Link
                  href="/schedule"
                  className="inline-flex items-center justify-center gap-2 border-2 border-white bg-white px-5 py-3 text-xs sm:text-sm font-bold text-black transition-all hover:bg-neutral-200 active:translate-x-0.5 active:translate-y-0.5 shadow-[3px_3px_0px_#ffffff] shrink-0"
                >
                  <span>Mở Trang Lịch Trình</span>
                  <span className="text-base">→</span>
                </Link>
              </div>
            </div>

            {/* Bộ sưu tập Huy hiệu & Danh hiệu ẩm thực */}
            <div className="border-2 border-black bg-white p-5 sm:p-7 shadow-[4px_4px_0px_#000000]">
              <div className="mb-5 flex items-center justify-between border-b-2 border-black pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="flex size-7 items-center justify-center border border-black bg-black text-white text-sm">
                    ✦
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-black uppercase tracking-tight">
                    Huy Hiệu & Danh Hiệu Foodie
                  </h3>
                </div>
                <span className="border border-black bg-neutral-100 px-2 py-0.5 text-xs font-bold text-black">
                  4 Danh Hiệu
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {badges.map((badge, idx) => (
                  <div
                    key={idx}
                    className="border-2 border-black bg-white p-4 shadow-[2px_2px_0px_#000000] flex items-start gap-3.5 hover:bg-neutral-50 transition-colors"
                  >
                    <span className="text-2xl shrink-0 p-2 border border-black bg-neutral-100">
                      {badge.icon}
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="font-bold text-sm text-black truncate">
                          {badge.title}
                        </h4>
                        <span className="border border-black bg-black text-white text-[10px] font-bold px-1.5 py-0.2">
                          {badge.level}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-neutral-600 font-medium line-clamp-2">
                        {badge.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quán ăn yêu thích đã lưu */}
            <div className="border-2 border-black bg-white p-5 sm:p-7 shadow-[4px_4px_0px_#000000]">
              <div className="mb-5 flex items-center justify-between border-b-2 border-black pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="flex size-7 items-center justify-center border border-black bg-black text-white text-xs">
                    ★
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-black uppercase tracking-tight">
                    Quán Ăn Chuẩn Gu Đã Lưu
                  </h3>
                </div>
                <Link
                  href="/schedule"
                  className="text-xs font-bold text-black hover:underline underline-offset-4"
                >
                  Xem trên bản đồ →
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {mockScheduleItems.slice(0, 3).map((place) => (
                  <div
                    key={place.id}
                    className="border-2 border-black bg-white overflow-hidden shadow-[2px_2px_0px_#000000] flex flex-col justify-between"
                  >
                    <div className="relative h-28 w-full border-b-2 border-black bg-neutral-100">
                      <img
                        src={place.imageUrl}
                        alt={place.placeName}
                        className="size-full object-cover"
                      />
                      <span className="absolute top-2 left-2 border border-black bg-white px-2 py-0.5 text-[10px] font-bold text-black uppercase">
                        {place.category.split("&")[0]}
                      </span>
                    </div>

                    <div className="p-3">
                      <h4 className="font-bold text-sm text-black line-clamp-1">
                        {place.placeName}
                      </h4>
                      <p className="mt-1 text-[11px] text-neutral-600 line-clamp-1">
                        📍 {place.address}
                      </p>
                    </div>

                    <div className="border-t border-black/15 p-2 bg-neutral-50 flex items-center justify-between text-[11px] font-bold text-black">
                      <span>Đặc sản: {place.signatureDish.split(",")[0]}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hoạt động đánh giá gần đây */}
            <div className="border-2 border-black bg-white p-5 sm:p-7 shadow-[4px_4px_0px_#000000]">
              <div className="mb-5 flex items-center justify-between border-b-2 border-black pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="flex size-7 items-center justify-center border border-black bg-black text-white text-xs">
                    💬
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-black uppercase tracking-tight">
                    Nhật Ký Đánh Giá Gần Đây
                  </h3>
                </div>
                <span className="border border-black bg-neutral-100 px-2 py-0.5 text-xs font-bold text-black">
                  36 Bài Viết
                </span>
              </div>

              <div className="space-y-4">
                {recentReviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="border-2 border-black bg-white p-4 shadow-[2px_2px_0px_#000000]"
                  >
                    <div className="flex items-center justify-between gap-2 border-b border-black/10 pb-2 mb-2.5">
                      <div>
                        <h4 className="font-bold text-sm text-black">
                          {rev.placeName}
                        </h4>
                        <span className="text-[11px] font-medium text-neutral-500">
                          Món: <strong>{rev.dish}</strong> • Ngày: {rev.date}
                        </span>
                      </div>
                      <div className="border border-black bg-neutral-100 px-2 py-0.5 text-xs font-bold text-black">
                        ★ {rev.rating}/5
                      </div>
                    </div>
                    <p className="text-xs text-neutral-700 font-medium leading-relaxed italic">
                      &ldquo;{rev.comment}&rdquo;
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
