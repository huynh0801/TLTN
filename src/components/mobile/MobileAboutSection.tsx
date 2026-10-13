"use client" /* Faint Background Watermark Graphic */ /* Top Speech Balloon Container */ /* Downward Pointer Arrow */ /* Center: Photo Card with Iconic White Logo Overlay */ /* Base Photo */ /* Slight Dark Vignette Overlay for Crisp Logo Contrast */ /* Centered Large White Logo Overlaid */ /* min logo */ /* Subtitle tag */ /* kura logo */ /* Bottom: Description Paragraph Text */

import {
  imgGroup10,
  imgGroup3,
  imgGroup4,
  imgGroup6,
  imgImgAboutImage01Jpg,
} from "@/constants/assets"

export default function MobileAboutSection() {
  return (
    <section className="relative w-full bg-white py-12 px-4 sm:px-6 overflow-hidden text-[#222]">
      {}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-15 overflow-hidden">
        <img
          src={imgGroup6}
          alt=""
          className="w-[380px] max-w-none -rotate-12 translate-x-12 translate-y-6"
        />
      </div>

      <div className="relative z-10 w-full max-w-[420px] mx-auto text-center">
        {}
        <div className="inline-block relative">
          <div className="bg-white border-[1.6px] border-[#222] rounded-[10px] px-6 py-2 shadow-2xs">
            <span className="font-['Noto_Sans_JP:Bold','Inter:Bold',sans-serif] font-bold text-[14.5px] sm:text-[15.5px] text-[#222] tracking-wide">
              みんなの暮らし方不動産について
            </span>
          </div>
          {}
          <div className="flex justify-center -mt-[1px]">
            <img src={imgGroup10} alt="" className="w-[14px] h-[10px] block" />
          </div>
        </div>

        {}
        <div className="w-full max-w-[325px] aspect-square mx-auto mt-6 rounded-[24px] overflow-hidden relative shadow-sm border border-black/10 bg-[#faf9f7] rotate-[2deg] sm:rotate-0 transition-transform">
          {}
          <img
            src={imgImgAboutImage01Jpg}
            alt="About Minkura / HYUN"
            className="size-full object-cover object-center"
          />

          {}
          <div className="absolute inset-0 bg-black/15 pointer-events-none" />

          {}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 pointer-events-none select-none drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
            <div className="relative w-[150px] flex flex-col items-center justify-center">
              {}
              <img
                src={imgGroup3}
                alt="みん"
                className="w-[105px] object-contain brightness-105"
              />
              {}
              <div className="flex items-center gap-4 text-white text-[10px] tracking-[0.25em] font-semibold my-0.5">
                <span>min</span>
                <span>kura</span>
              </div>
              {}
              <img
                src={imgGroup4}
                alt="くら"
                className="w-[105px] object-contain brightness-105"
              />
            </div>
          </div>
        </div>

        {}
        <div className="mt-8 max-w-[345px] mx-auto text-left px-1">
          <p className="font-['Noto_Sans_JP:Regular','Inter:Regular',sans-serif] font-medium text-[14px] sm:text-[14.5px] leading-[1.8] text-[#222]">
            みんなの暮らし方不動産は、ユニークな物件の紹介をメインに、ローカルの暮らし方、地域に住む方を紹介するWebメディアです。
          </p>
          <p className="font-['Inter:Regular',sans-serif] text-[13px] text-[#555] leading-[1.65] mt-2.5 pt-2.5 border-t border-black/10">
            HYUN là không gian kết nối những điểm hẹn ẩm thực chuẩn gu, nơi khám
            phá các quán ăn ngon, hương vị đặc sắc và trải nghiệm đáng nhớ.
          </p>
        </div>
      </div>
    </section>
  )
}
