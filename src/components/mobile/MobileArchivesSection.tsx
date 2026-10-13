import { ARCHIVE_ITEMS } from "@/constants/archivesData"

export default function MobileArchivesSection() {
  return (
    <section className="relative w-full bg-[#faf9f6] border-b border-black/10">
      {/* 1. Running Marquee Banner */}
      <div className="bg-[#222] py-3 overflow-hidden select-none">
        <div className="flex w-max animate-marquee whitespace-nowrap">
          {/* Track 1 */}
          <div className="flex items-center shrink-0">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={`m1-${idx}`}
                className="flex items-center shrink-0 mx-4 sm:mx-6 tracking-[0.03em]"
              >
                <span className="font-['Inter:Bold','Inter',sans-serif] font-bold text-sm sm:text-[15px] text-white tracking-[0.06em]">
                  HYUN
                </span>
                <span className="mx-2.5 text-white/40 text-sm font-light">
                  -
                </span>
                <span className="font-['Inter:Regular','Inter',sans-serif] font-medium text-sm sm:text-[15px] text-white/95">
                  Điểm hẹn chuẩn gu, yêu không cần nghĩ
                </span>
                <span className="text-[#ff4b72] text-xs ml-6 sm:ml-8 select-none">
                  ✦
                </span>
              </div>
            ))}
          </div>

          {/* Track 2 (Clone for seamless infinite marquee) */}
          <div className="flex items-center shrink-0" aria-hidden="true">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={`m2-${idx}`}
                className="flex items-center shrink-0 mx-4 sm:mx-6 tracking-[0.03em]"
              >
                <span className="font-['Inter:Bold','Inter',sans-serif] font-bold text-sm sm:text-[15px] text-white tracking-[0.06em]">
                  HYUN
                </span>
                <span className="mx-2.5 text-white/40 text-sm font-light">
                  -
                </span>
                <span className="font-['Inter:Regular','Inter',sans-serif] font-medium text-sm sm:text-[15px] text-white/95">
                  Điểm hẹn chuẩn gu, yêu không cần nghĩ
                </span>
                <span className="text-[#ff4b72] text-xs ml-6 sm:ml-8 select-none">
                  ✦
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Section Content */}
      <div className="py-8 sm:py-12">
        {/* 2. Section Header */}
        <div className="px-4 text-center mb-8 sm:mb-10">
          <span className="inline-block px-3 py-1 mb-2.5 text-xs font-bold uppercase tracking-widest text-[#292c4b] bg-[#292c4b]/10 rounded-full">
            Khám Phá Danh Sách
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1c1c1c] tracking-tight mt-1">
            Minkura Archives
          </h2>
          <p className="mt-2.5 text-sm sm:text-base text-black/60 max-w-xl mx-auto leading-relaxed">
            Tổng hợp 12 điểm hẹn ẩm thực trứ danh ba miền cùng câu chuyện đậm đà
            bản sắc.
          </p>
        </div>

        {/* 3. 12-Card Grid Layout */}
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          {ARCHIVE_ITEMS.map((item) => (
            <article
              key={item.id}
              className="group border border-black/15 bg-white p-4 sm:p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* 4. Card Top Row */}
                <div className="flex items-center justify-between mb-3.5">
                  <span className="font-bold text-sm text-[#292c4b] tracking-wide">
                    {item.city}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-black/50 tracking-wider">
                      {item.archiveNo}
                    </span>
                    <span className="inline-flex items-center justify-center size-7 rounded-full bg-black/5 border border-black/10 text-xs font-bold text-[#1c1c1c]">
                      {item.index}
                    </span>
                  </div>
                </div>

                {/* Image Frame */}
                <div className="aspect-[16/10] w-full rounded-xl overflow-hidden bg-black/5 relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="size-full object-cover object-center transition-transform duration-500 group-hover:scale-105 select-none"
                    draggable={false}
                  />
                </div>

                {/* Title */}
                <h3 className="font-bold text-base sm:text-lg text-[#1c1c1c] line-clamp-2 mt-3.5 leading-snug">
                  {item.title}
                </h3>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-[#262626] text-white text-[11px] px-2.5 py-1 rounded font-medium tracking-wide"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Read More Footer */}
              <div className="mt-4 pt-3 border-t border-black/10 flex items-center justify-end">
                <a
                  href={`#${item.id}`}
                  className="min-h-[44px] min-w-[44px] -my-1 -mr-2 px-2 inline-flex items-center justify-end gap-1.5 text-xs font-semibold text-[#1c1c1c] hover:text-[#ff4b72] transition-colors focus:outline-none focus:ring-2 focus:ring-[#ff4b72]/40 rounded-lg group/link"
                  aria-label={`Xem chi tiết ${item.title}`}
                >
                  <span>Read more</span>
                  <svg
                    className="size-3.5 transition-transform group-hover/link:translate-x-0.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
