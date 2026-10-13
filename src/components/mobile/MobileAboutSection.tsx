"use client"

import {
  imgGroup10,
  imgGroup6,
  imgImgAboutImage01Jpg,
} from "@/constants/assets"

export default function MobileAboutSection() {
  return (
    <section className="relative w-full bg-white py-12 px-4 sm:px-6 overflow-hidden text-[#222]">
      {/* Background Watermark Graphic */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-15 overflow-hidden">
        <img
          src={imgGroup6}
          alt=""
          className="w-[380px] max-w-none -rotate-12 translate-x-12 translate-y-6"
        />
      </div>

      <div className="relative z-10 w-full max-w-[390px] mx-auto">
        {/* Top Speech Balloon Header: "Về điểm hẹn ẩm thực HYUN" */}
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="relative inline-block">
            <div className="bg-white border-[1.6px] border-[#222] rounded-[8px] px-5 py-2 shadow-2xs">
              <h2 className="font-['Inter:Bold',sans-serif] font-bold text-[15px] sm:text-[16px] text-[#222] tracking-[0.03em] whitespace-nowrap">
                Về điểm hẹn ẩm thực HYUN
              </h2>
            </div>
            {/* Balloon Bottom Notch */}
            <div className="flex justify-center -mt-[1px]">
              <img
                src={imgGroup10}
                alt=""
                className="w-[14px] h-[10px] block"
              />
            </div>
          </div>
        </div>

        {/* Center: Photo Card with Vertical "about HYUN" Label */}
        <div className="relative w-full flex items-center justify-center my-6">
          {/* Vertical "about HYUN" Label on the left edge */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 select-none z-10">
            <span className="-rotate-90 block font-['Inter:Regular',sans-serif] text-[13.5px] text-[#222] tracking-[0.06em] whitespace-nowrap font-normal">
              about HYUN
            </span>
          </div>

          {/* Tilted Photo Card matching desktop (rotate-[4.96deg], rounded-[20px], clean without logo overlay) */}
          <div className="w-[270px] sm:w-[290px] aspect-square rounded-[20px] overflow-hidden relative shadow-md border border-black/10 bg-[#faf9f7] rotate-[4.96deg] ml-6 transition-transform">
            <img
              src={imgImgAboutImage01Jpg}
              alt="Về điểm hẹn ẩm thực HYUN"
              className="size-full object-cover object-center pointer-events-none"
            />
            {/* Subtle dark overlay identical to desktop */}
            <div className="absolute inset-0 bg-black/10 pointer-events-none" />
          </div>
        </div>

        {/* Bottom: Description & CTA Button matching desktop */}
        <div className="mt-8 px-2">
          <p className="font-['Inter:Bold',sans-serif] font-bold text-[17px] sm:text-[18.5px] leading-[1.62] text-[#222] tracking-[0.01em]">
            HYUN là không gian kết nối những điểm hẹn ẩm thực chuẩn gu, nơi khám phá các quán ăn ngon, hương vị đặc sắc và những trải nghiệm ẩm thực đáng nhớ tại Việt Nam.
          </p>

          {/* "Khám phá thêm" CTA with Black Circle Arrow Button */}
          <div className="flex justify-end mt-5">
            <a
              href="#archives"
              className="group inline-flex items-center gap-2.5 cursor-pointer select-none"
            >
              <span className="font-['Inter:Bold',sans-serif] font-bold text-[16px] sm:text-[17px] text-[#222] group-hover:text-[#ff4b72] transition-colors tracking-[0.02em]">
                Khám phá thêm
              </span>
              <div className="size-[32px] rounded-full bg-[#222] group-hover:bg-[#ff4b72] text-white flex items-center justify-center transition-colors shadow-2xs">
                <svg
                  className="w-3.5 h-3.5 block"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
