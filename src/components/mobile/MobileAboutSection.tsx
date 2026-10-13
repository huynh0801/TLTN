import type { JSX } from "react"
import { imgGroup10, imgImgAboutImage01Jpg } from "@/constants/assets"

export default function MobileAboutSection(): JSX.Element {
  return (
    <section className="relative w-full bg-[#f7f6f4] py-14 px-4 overflow-hidden border-t border-black/10">
      <div className="max-w-2xl mx-auto flex flex-col items-center text-center">
        {/* 1. Uppercase label */}
        <span className="font-mono text-xs uppercase tracking-widest text-[#666] mb-2">
          About HYUN
        </span>

        {/* 2. Speech bubble heading */}
        <div className="border border-[#222] rounded-xl px-6 py-2.5 bg-white shadow-sm mb-8 relative">
          <h2 className="font-bold text-base sm:text-lg text-[#1c1c1c] tracking-wide">
            Về điểm hẹn ẩm thực HYUN
          </h2>
          {/* Balloon tail indicator at bottom center */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3.5 h-2 pointer-events-none">
            <img
              src={imgGroup10}
              alt=""
              className="w-full h-full block object-contain"
            />
          </div>
        </div>

        {/* 3. Featured Image Showcase */}
        <div className="relative w-full max-w-[300px] sm:max-w-[340px] aspect-square rounded-2xl overflow-hidden shadow-lg border-2 border-white rotate-[3deg] transition-transform duration-300 hover:rotate-0 my-4">
          <img
            src={imgImgAboutImage01Jpg}
            alt="HYUN không gian ẩm thực"
            className="object-cover size-full"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/10 pointer-events-none" />
        </div>

        {/* 4. Brand Story Text */}
        <p className="text-[#222] font-semibold text-base sm:text-lg leading-relaxed max-w-lg mt-6">
          HYUN là không gian kết nối những điểm hẹn ẩm thực chuẩn gu, nơi khám
          phá các quán ăn ngon, hương vị đặc sắc và những trải nghiệm ẩm thực
          đáng nhớ tại Việt Nam.
        </p>

        {/* 5. Call-To-Action Link / Button */}
        <div className="mt-8 flex justify-center">
          <a
            href="#explore"
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#222] hover:bg-[#333] text-white font-bold text-sm sm:text-base tracking-wide transition-all shadow-md active:scale-95 min-h-[44px] min-w-[44px] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#222]/40 group"
            aria-label="Khám phá thêm về điểm hẹn ẩm thực HYUN"
          >
            <span>Khám phá thêm</span>
            <span
              className="size-7 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden="true"
            >
              <svg className="size-3.5 fill-current" viewBox="0 0 13 14">
                <path d="M7.94225 0L6.36386 1.18379L8.97708 4.67203C9.05375 4.77463 9.10036 4.89652 9.11173 5.02409C9.12309 5.15166 9.09876 5.27988 9.04144 5.39441C8.98412 5.50894 8.89608 5.60528 8.78716 5.67265C8.67824 5.74002 8.55272 5.77578 8.42465 5.77591H0V7.7489H8.4207C8.54928 7.74816 8.67551 7.78334 8.78517 7.85047C8.89484 7.9176 8.98358 8.01401 9.04141 8.12885C9.09924 8.24369 9.12386 8.3724 9.1125 8.50047C9.10113 8.62855 9.05423 8.75091 8.97708 8.85377L6.36485 12.346L7.94324 13.5297L13.001 6.76537L7.94225 0Z" />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
