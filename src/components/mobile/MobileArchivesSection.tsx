"use client" /* Top Running Marquee Banner */ /* Track 1 */ /* Track 2 (Clone for infinite seamless loop) */ /* Stacked Single-Column Archive Cards (Authentic Figma Design) */ /* Top Row: Location Name (Left) + Category Stamp Circle (Right) */ /* RENT Round Category Stamp */ /* Center: Capsule Oval Photo with Vertical Archive Label on Left */ /* Vertical Archive Label Running on Left Edge */ /* Stadium Capsule Oval Rounded Photo */ /* Bottom Row: Title and Dark Navy Tags */ /* Title in Dark Navy */ /* Tag Pills in Dark Navy */
import { ARCHIVE_ITEMS } from "@/constants/archivesData"

export default function MobileArchivesSection() {
  return (
    <section className="relative w-full bg-[#ecebe3] border-b-[1.6px] border-[#222]">
      {}
      <div className="relative w-full bg-[#222] h-[52px] sm:h-[56px] flex items-center overflow-hidden border-t-[1.6px] border-b-[1.6px] border-[#222] select-none">
        <div className="flex w-max animate-marquee whitespace-nowrap">
          {}
          <div className="flex items-center shrink-0">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div
                key={`m1-${idx}`}
                className="flex items-center shrink-0 mx-6 tracking-[0.03em]"
              >
                <span className="font-['Inter:Bold','Inter',sans-serif] font-bold text-[16px] text-white tracking-[0.06em]">
                  HYUN
                </span>
                <span className="mx-2.5 text-white/40 text-[15px] font-light">
                  -
                </span>
                <span className="font-['Inter:Regular','Inter',sans-serif] font-medium text-[15.5px] text-white/95">
                  Điểm hẹn chuẩn gu, yêu không cần nghĩ
                </span>
                <span className="text-[#ff4b72] text-[13px] ml-8 select-none">
                  ✦
                </span>
              </div>
            ))}
          </div>

          {}
          <div className="flex items-center shrink-0" aria-hidden="true">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div
                key={`m2-${idx}`}
                className="flex items-center shrink-0 mx-6 tracking-[0.03em]"
              >
                <span className="font-['Inter:Bold','Inter',sans-serif] font-bold text-[16px] text-white tracking-[0.06em]">
                  HYUN
                </span>
                <span className="mx-2.5 text-white/40 text-[15px] font-light">
                  -
                </span>
                <span className="font-['Inter:Regular','Inter',sans-serif] font-medium text-[15.5px] text-white/95">
                  Điểm hẹn chuẩn gu, yêu không cần nghĩ
                </span>
                <span className="text-[#ff4b72] text-[13px] ml-8 select-none">
                  ✦
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {}
      <div className="w-full max-w-[440px] mx-auto divide-y-[1.6px] divide-[#222]">
        {ARCHIVE_ITEMS.map((item) => (
          <article
            key={item.id}
            className="w-full bg-[#ecebe3] p-5 sm:p-6 transition-colors duration-300"
          >
            {}
            <div className="flex items-center justify-between mb-2">
              <span className="font-['Noto_Sans_JP:Bold','Inter:Bold',sans-serif] font-bold text-[16px] text-[#292c4b] tracking-wide">
                {item.city}
              </span>

              {}
              <div className="size-[42px] rounded-full border-[1.5px] border-[#292c4b] flex items-center justify-center shrink-0 select-none">
                <span className="font-['Space_Grotesk:Light','Inter',sans-serif] font-bold text-[11.5px] text-[#292c4b] tracking-wider">
                  RENT
                </span>
              </div>
            </div>

            {}
            <div className="relative my-3 flex items-center justify-center">
              {}
              <div className="absolute left-[-8px] top-1/2 -translate-y-1/2 select-none">
                <span className="-rotate-90 block font-['Space_Grotesk:Light','Inter',sans-serif] text-[12px] text-[#292c4b] tracking-[0.2em] whitespace-nowrap font-medium">
                  {item.archiveNo.toLowerCase()}
                </span>
              </div>

              {}
              <div className="w-[82%] sm:w-[78%] aspect-[1/1.08] rounded-t-[130px] rounded-b-[130px] overflow-hidden border border-black/10 shadow-xs bg-[#e2e1d7] mx-auto">
                <img
                  src={item.image}
                  alt={item.title}
                  className="size-full object-cover object-center transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>

            {}
            <div className="mt-2">
              {}
              <h3 className="font-['Noto_Sans_JP:Bold','Inter:Bold',sans-serif] font-bold text-[16.5px] sm:text-[17.5px] text-[#292c4b] leading-[1.38] mb-3 tracking-tight">
                {item.title}
              </h3>

              {}
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-[#292c4b] text-white font-medium text-[12px] px-3 py-1 rounded-[6px] tracking-wide shadow-2xs whitespace-nowrap"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
