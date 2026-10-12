"use client" /* Left preview teaser */ /* Slide 0: IMG_1592 */ /* Slide 1: IMG_5097 */ /* Slide 2: IMG_3206 */ /* Slide 3: LINE_ALBUM */ /* Main central container */ /* Left Arrow Button */ /* Central main photo frame with smooth crossfade */ /* Slide 1: IMG_5097 */ /* Slide 3: LINE_ALBUM */ /* Slide 0: IMG_1592 */ /* Slide 2: IMG_3206 */ /* Right Arrow Button */ /* Pickup Indicator */ /* Pagination Dots */ /* Slide Card 0: TP. Hà Nội - Phở Bát Đàn */ /* Slide Card 1: TP. Hồ Chí Minh - Cơm Tấm Ba Ghiền */ /* Slide Card 2: TP. Đà Lạt - Lẩu Gà Lá É Tao Ngộ */ /* Slide Card 3: TP. Đà Nẵng - Bánh Xèo & Nem Lụi Bà Dưỡng */ /* Right preview teaser */ /* Slide 3: LINE_ALBUM */ /* Slide 2: IMG_3206 */ /* Slide 1: IMG_5097 */ /* Slide 0: IMG_1592 */

import { useState, useEffect } from "react"
import {
  imgGroup,
  imgGroup1,
  imgGroup2,
  imgImg1592Jpg,
  imgImg1592Jpg1,
  imgImg3206ScaledJpg,
  imgImg5097F09F8C9FScaledJpeg,
  imgImgTopTilte02Svg,
  imgLineAlbum22071822800X5331Jpg,
  imgLinkImg5097F09F8C9FScaledJpeg,
  imgPickup,
} from "@/constants/assets"

function TabCornerCurve() {
  return (
    <svg
      preserveAspectRatio="none"
      overflow="visible"
      className="block size-full"
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Group">
        <path
          id="Vector"
          d="M0 10V2H2V6.315C2.20896 6.62872 2.44665 6.92232 2.71 7.192C3.00573 7.49482 3.33253 7.76564 3.685 8H8V10H0Z"
          className="fill-white group-hover:fill-[#07374d] transition-colors duration-300"
        />
        <path
          id="Vector_2"
          d="M8 9C5.416 9 3.6 8.359 2.455 7.04C1.463 5.9 1 4.3 1 2V0H3V2C2.86688 3.31798 3.20912 4.64014 3.965 5.728C4.709 6.584 6.029 7 8 7H10V9H8Z"
          className="fill-[#2B2B2B] group-hover:fill-[#07374d] transition-colors duration-300"
        />
      </g>
    </svg>
  )
}

export default function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % 4)
    }, 5000)
    return () => clearInterval(timer)
  }, [isPaused])

  const prevSlide = () => setActiveSlide((prev) => (prev - 1 + 4) % 4)
  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % 4)

  const prevIndex = (activeSlide - 1 + 4) % 4
  const nextIndex = (activeSlide + 1) % 4

  return (
    <div
      className="absolute h-[889.4px] left-0 overflow-clip right-0 top-0"
      data-node-id="1:3"
      data-name="Section"
    >
      <div
        className="-translate-x-1/2 absolute flex items-center justify-center left-1/2 top-[92px] z-10 whitespace-nowrap"
        data-name="Hero Slogan"
      >
        <h2 className="font-['Inter:Bold','Inter',system-ui,-apple-system,sans-serif] font-bold text-[32px] text-[#1c1c1c] tracking-[0.14em] leading-none">
          Điểm hẹn chuẩn gu, yêu không cần nghĩ
        </h2>
      </div>
      <div
        className="absolute z-10 h-[289.54px] left-[-7.68px] overflow-clip top-0 w-[201.99px]"
        data-node-id="1:4"
        data-name="img_top_tilte01.svg"
      >
        <div
          className="-translate-x-1/2 -translate-y-1/2 absolute h-[289.536px] left-1/2 overflow-clip top-1/2 w-[201.99px]"
          data-node-id="1:5"
          data-name="img_top_tilte01.svg"
        >
          <div
            className="absolute inset-[0_0.03%_0_0]"
            data-node-id="1:6"
            data-name="Group"
          >
            <img
              alt=""
              className="absolute block inset-0 max-w-none size-full"
              src={imgGroup}
            />
          </div>
        </div>
      </div>
      <div
        className="absolute z-10 bottom-[65.82px] h-[211.78px] overflow-visible right-[-8.77px] w-[196.99px]"
        data-node-id="1:14"
        data-name="img_top_tilte02.svg"
      >
        <div
          className="-translate-x-1/2 -translate-y-1/2 absolute h-[211.771px] left-1/2 overflow-visible top-1/2 w-[196.99px]"
          data-node-id="1:15"
          data-name="img_top_tilte02.svg"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgImgTopTilte02Svg}
          />
        </div>
      </div>
      <div
        className="-translate-x-1/2 -translate-y-1/2 absolute h-[691.4px] left-[calc(50%-0.01px)] top-[calc(50%+84.74px)] w-[1841.35px]"
        data-node-id="1:24"
        data-name="top-fv-pickup"
      >
        <div
          className="absolute bg-[#f7f6f4] inset-[-3px_1509.11px_165.2px_-507.76px] rounded-[30px]"
          data-node-id="1:25"
          data-name="Background"
        />
        {}
        <div
          className="absolute inset-[121.6px_1421.35px_289.8px_0] overflow-clip rounded-[10px]"
          data-node-id="1:26"
          data-name="Container"
        >
          <div
            className="absolute inset-0 overflow-clip"
            data-node-id="1:27"
            data-name="Container"
          >
            {}
            <div
              className={`absolute inset-[-1%] transition-opacity duration-500 ease-in-out ${
                prevIndex === 0 ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
              data-node-id="1:28"
              data-name="Mask Group"
            >
              <div
                className="absolute inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-size-[428.4px_285.6px]"
                data-node-id="1:31"
                style={{ maskImage: `url("${imgImg1592Jpg}")` }}
                data-name="IMG_1592.jpg"
              >
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <img
                    alt=""
                    className="absolute h-[112.5%] left-0 max-w-none top-[-6.25%] w-full"
                    src={imgImg1592Jpg1}
                  />
                </div>
              </div>
            </div>
            {}
            <div
              className={`absolute inset-[-1%] transition-opacity duration-500 ease-in-out ${
                prevIndex === 1 ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
              data-node-id="1:32"
              data-name="Mask Group"
            >
              <div
                className="absolute inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-size-[428.4px_285.6px]"
                data-node-id="1:35"
                style={{ maskImage: `url("${imgImg1592Jpg}")` }}
                data-name="IMG_5097%F0%9F%8C%9F-scaled.jpeg"
              >
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <img
                    alt=""
                    className="absolute h-[100.02%] left-0 max-w-none top-[-0.01%] w-full"
                    src={imgImg5097F09F8C9FScaledJpeg}
                  />
                </div>
              </div>
            </div>
            {}
            <div
              className={`absolute inset-[-1%_-8.14%_-1%_6.14%] transition-opacity duration-500 ease-in-out ${
                prevIndex === 2 ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
              data-node-id="1:36"
              data-name="Mask Group"
            >
              <div
                className="absolute inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-size-[428.4px_285.6px]"
                data-node-id="1:39"
                style={{ maskImage: `url("${imgImg1592Jpg}")` }}
                data-name="IMG_3206-scaled.jpg"
              >
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <img
                    alt=""
                    className="absolute h-[112.5%] left-0 max-w-none top-[-6.25%] w-full"
                    src={imgImg3206ScaledJpg}
                  />
                </div>
              </div>
            </div>
            {}
            <div
              className={`absolute inset-[-1%] transition-opacity duration-500 ease-in-out ${
                prevIndex === 3 ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
              data-node-id="1:40"
              data-name="Mask Group"
            >
              <div
                className="absolute inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-size-[428.4px_285.6px]"
                data-node-id="1:43"
                style={{ maskImage: `url("${imgImg1592Jpg}")` }}
                data-name="LINE_ALBUM_220718_22-800x533-1.jpg"
              >
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <img
                    alt=""
                    className="absolute h-full left-[-0.03%] max-w-none top-0 w-[100.06%]"
                    src={imgLineAlbum22071822800X5331Jpg}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {}
        <div
          className="absolute border border-[#1c1c1c] border-solid bottom-[162.2px] left-[540.68px] rounded-[10px] top-0 w-[760px]"
          data-node-id="1:44"
          data-name="Border"
        >
          <div
            className="absolute bg-white h-[4px] left-[calc(4.16%-0.92px)] right-[calc(4.96%-0.9px)] top-[-1.4px]"
            data-node-id="1:45"
            data-name="Background"
          />
          {}
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Slide trước"
            className="absolute bg-[#222] hover:bg-[#444] transition-colors cursor-pointer left-[-88.84px] overflow-clip rounded-[28px] size-[56px] top-[235.6px] z-20 flex items-center justify-center"
            data-node-id="1:46"
            data-name="Background"
          >
            <div
              className="-translate-y-1/2 absolute h-[21px] left-0 overflow-clip right-0 top-1/2 pointer-events-none"
              data-node-id="1:47"
              data-name="Container"
            >
              <div
                className="absolute left-[17.5px] overflow-clip size-[21px] top-0"
                data-node-id="1:48"
                data-name="Image"
              >
                <div
                  className="absolute h-[21.9px] left-0 overflow-clip top-0 w-[21px]"
                  data-node-id="1:49"
                  data-name="icon-top-slide-button-arrow01.svg"
                >
                  <div
                    className="absolute contents inset-0"
                    data-node-id="1:50"
                    data-name="Clip path group"
                  >
                    <div
                      className="absolute inset-[0_-0.02%_0_0] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-size-[21px_21.9px]"
                      data-node-id="1:53"
                      style={{ maskImage: `url("${imgGroup1}")` }}
                      data-name="Group"
                    >
                      <img
                        alt=""
                        className="absolute block inset-0 max-w-none size-full"
                        src={imgGroup2}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </button>
          {}
          <div
            className="-translate-y-1/2 absolute h-[440px] left-[48.6px] overflow-clip right-[48.6px] top-1/2"
            data-node-id="1:55"
            data-name="Container"
          >
            <div
              className="absolute inset-0 overflow-clip rounded-[10px]"
              data-node-id="1:56"
              data-name="Container"
            >
              <div
                className="absolute inset-0 overflow-clip"
                data-node-id="1:57"
                data-name="Container"
              >
                {}
                <div
                  className={`absolute inset-[-1%] transition-opacity duration-500 ease-in-out ${
                    activeSlide === 1 ? "opacity-100 z-10" : "opacity-0 z-0"
                  }`}
                  data-node-id="1:58"
                  data-name="Mask Group"
                >
                  <div
                    className="absolute inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-size-[674.01px_448.8px]"
                    data-node-id="1:61"
                    style={{
                      maskImage: `url("${imgLinkImg5097F09F8C9FScaledJpeg}")`,
                    }}
                    data-name="Link → IMG_5097%F0%9F%8C%9F-scaled.jpeg"
                  >
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <img
                        alt=""
                        className="absolute h-[100.14%] left-0 max-w-none top-[-0.07%] w-full"
                        src={imgImg5097F09F8C9FScaledJpeg}
                      />
                    </div>
                  </div>
                </div>
                {}
                <div
                  className={`absolute inset-[-1%] transition-opacity duration-500 ease-in-out ${
                    activeSlide === 3 ? "opacity-100 z-10" : "opacity-0 z-0"
                  }`}
                  data-node-id="1:62"
                  data-name="Mask Group"
                >
                  <div
                    className="absolute inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-size-[674.01px_448.8px]"
                    data-node-id="1:65"
                    style={{
                      maskImage: `url("${imgLinkImg5097F09F8C9FScaledJpeg}")`,
                    }}
                    data-name="Link → LINE_ALBUM_220718_22-800x533-1.jpg"
                  >
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <img
                        alt=""
                        className="absolute h-[100.06%] left-0 max-w-none top-[-0.03%] w-full"
                        src={imgLineAlbum22071822800X5331Jpg}
                      />
                    </div>
                  </div>
                </div>
                {}
                <div
                  className={`absolute inset-[-1%_-8.14%_-1%_6.14%] transition-opacity duration-500 ease-in-out ${
                    activeSlide === 0 ? "opacity-100 z-10" : "opacity-0 z-0"
                  }`}
                  data-node-id="1:66"
                  data-name="Mask Group"
                >
                  <div
                    className="absolute inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-size-[674.01px_448.8px]"
                    data-node-id="1:69"
                    style={{
                      maskImage: `url("${imgLinkImg5097F09F8C9FScaledJpeg}")`,
                    }}
                    data-name="Link → IMG_1592.jpg"
                  >
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <img
                        alt=""
                        className="absolute h-[112.64%] left-0 max-w-none top-[-6.32%] w-full"
                        src={imgImg1592Jpg1}
                      />
                    </div>
                  </div>
                </div>
                {}
                <div
                  className={`absolute inset-[-1%] transition-opacity duration-500 ease-in-out ${
                    activeSlide === 2 ? "opacity-100 z-10" : "opacity-0 z-0"
                  }`}
                  data-node-id="1:70"
                  data-name="Mask Group"
                >
                  <div
                    className="absolute inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-size-[674.01px_448.8px]"
                    data-node-id="1:73"
                    style={{
                      maskImage: `url("${imgLinkImg5097F09F8C9FScaledJpeg}")`,
                    }}
                    data-name="Link → IMG_3206-scaled.jpg"
                  >
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <img
                        alt=""
                        className="absolute h-[112.64%] left-0 max-w-none top-[-6.32%] w-full"
                        src={imgImg3206ScaledJpg}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {}
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Slide tiếp theo"
            className="absolute flex items-center justify-center right-[-88.84px] size-[56px] top-[235.6px] z-20 cursor-pointer"
            data-node-id="1:74"
          >
            <div className="flex-none rotate-180">
              <div
                className="bg-[#222] hover:bg-[#444] transition-colors overflow-clip relative rounded-[28px] size-[56px]"
                data-name="Background"
              >
                <div
                  className="-translate-y-1/2 absolute h-[21px] left-0 overflow-clip right-0 top-1/2 pointer-events-none"
                  data-node-id="1:75"
                  data-name="Container"
                >
                  <div
                    className="absolute left-[17.5px] overflow-clip size-[21px] top-0"
                    data-node-id="1:76"
                    data-name="Image"
                  >
                    <div
                      className="absolute h-[21.9px] left-0 overflow-clip top-0 w-[21px]"
                      data-node-id="1:77"
                      data-name="icon-top-slide-button-arrow01.svg"
                    >
                      <div
                        className="absolute contents inset-0"
                        data-node-id="1:78"
                        data-name="Clip path group"
                      >
                        <div
                          className="absolute inset-[0_-0.02%_0_0] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.004px_0px] mask-size-[21px_21.9px]"
                          data-node-id="1:81"
                          style={{ maskImage: `url("${imgGroup1}")` }}
                          data-name="Group"
                        >
                          <img
                            alt=""
                            className="absolute block inset-0 max-w-none size-full"
                            src={imgGroup2}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </button>
          <div
            className="absolute bg-white bottom-[-1.4px] h-[4px] left-[calc(4.16%-0.92px)] right-[calc(4.96%-0.9px)]"
            data-node-id="1:83"
            data-name="Background"
          />
          {}
          <div
            className="absolute flex h-[110.62px] items-center justify-center right-[-20.78px] top-[43.6px] w-[45px]"
            data-node-id="1:84"
          >
            <div className="flex-none rotate-90">
              <div
                className="bg-white h-[45px] relative w-[110.62px]"
                data-name="Background"
              >
                <div
                  className="[word-break:break-word] absolute font-['Work_Sans:SemiBold'] font-semibold h-[19.2px] leading-[0] left-[12px] text-[#222] text-[16px] top-[10.4px] tracking-[1.28px] w-[86.62px]"
                  data-node-id="1:85"
                  data-name="Mask Group"
                >
                  <div
                    className="-translate-y-1/2 absolute flex flex-col h-[19.2px] justify-center left-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-size-[19.2px_86.62px] top-[9.6px] w-[67.523px]"
                    data-node-id="1:88"
                    style={{ maskImage: `url("${imgPickup}")` }}
                  >
                    <p className="leading-[16px]">{`Pickup `}</p>
                  </div>
                  <div
                    className="-translate-y-1/2 absolute flex flex-col h-[19.2px] justify-center left-[67.22px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_-67.22px] mask-size-[19.2px_86.62px] top-[9.6px] w-[19.715px]"
                    data-node-id="1:89"
                    style={{ maskImage: `url("${imgPickup}")` }}
                  >
                    <p className="leading-[16px]">0{activeSlide + 1}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {}
          <button
            type="button"
            onClick={() => setActiveSlide(0)}
            aria-label="Chuyển đến Slide 1"
            className={`absolute border border-[#1c1c1c] border-solid bottom-[-4.4px] h-[8px] left-[calc(86.26%+0.73px)] right-[calc(12.68%-0.75px)] rounded-[4px] cursor-pointer transition-colors duration-300 ${
              activeSlide === 0 ? "bg-[#1c1c1c]" : "bg-white hover:bg-gray-200"
            }`}
            data-node-id="1:90"
            data-name="Background+Border"
          />
          <button
            type="button"
            onClick={() => setActiveSlide(1)}
            aria-label="Chuyển đến Slide 2"
            className={`absolute border border-[#1c1c1c] border-solid bottom-[-4.4px] h-[8px] left-[calc(88.24%+0.76px)] right-[calc(10.71%-0.79px)] rounded-[4px] cursor-pointer transition-colors duration-300 ${
              activeSlide === 1 ? "bg-[#1c1c1c]" : "bg-white hover:bg-gray-200"
            }`}
            data-node-id="1:91"
            data-name="Background+Border"
          />
          <button
            type="button"
            onClick={() => setActiveSlide(2)}
            aria-label="Chuyển đến Slide 3"
            className={`absolute border border-[#1c1c1c] border-solid bottom-[-4.4px] h-[8px] left-[calc(90.21%+0.8px)] right-[calc(8.74%-0.83px)] rounded-[4px] cursor-pointer transition-colors duration-300 ${
              activeSlide === 2 ? "bg-[#1c1c1c]" : "bg-white hover:bg-gray-200"
            }`}
            data-node-id="1:92"
            data-name="Background+Border"
          />
          <button
            type="button"
            onClick={() => setActiveSlide(3)}
            aria-label="Chuyển đến Slide 4"
            className={`absolute border border-[#1c1c1c] border-solid bottom-[-4.4px] h-[8px] left-[calc(92.19%+0.84px)] right-[calc(6.76%-0.86px)] rounded-[4px] cursor-pointer transition-colors duration-300 ${
              activeSlide === 3 ? "bg-[#1c1c1c]" : "bg-white hover:bg-gray-200"
            }`}
            data-node-id="1:93"
            data-name="Background+Border"
          />
        </div>

        {}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className={`group cursor-pointer absolute bg-white hover:bg-[#07374d] border border-[#2b2b2b] hover:border-[#07374d] border-solid bottom-[126.22px] left-[492.42px] rounded-bl-[10px] rounded-br-[10px] rounded-tr-[10px] top-[402.98px] w-[523.49px] transition-all duration-300 ${
            activeSlide === 0
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
          data-node-id="1:94"
          data-name="Link"
        >
          <div
            className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Bold'] font-bold h-[32px] justify-center leading-[0] left-[19.6px] not-italic text-[#222] group-hover:text-[#f2c4c2] text-[20px] top-[31.6px] tracking-[0.6px] w-[396.18px] transition-colors duration-300"
            data-node-id="1:95"
          >
            <p className="leading-[32px]">
              Phở Bát Đàn | Tinh hoa phở bò phố cổ trăm năm
            </p>
          </div>
          <div
            className="absolute bg-white group-hover:bg-[#07374d] border-[#2b2b2b] group-hover:border-[#07374d] border-l-[1.6px] border-r-[1.6px] border-solid border-t-[1.6px] h-[37.6px] left-[-1.4px] rounded-tl-[6px] rounded-tr-[6px] top-[-37.4px] w-[162.49px] transition-colors duration-300"
            data-node-id="1:96"
            data-name="Background+Border"
          >
            <div
              className="absolute bg-white group-hover:bg-[#07374d] h-[4px] left-[-2px] top-[13px] w-[163.29px] transition-colors duration-300"
              data-node-id="1:97"
              data-name="Background"
            />
            <div
              className="absolute bg-white group-hover:bg-[#07374d] bottom-[-2px] h-[4px] left-0 w-[161.29px] transition-colors duration-300"
              data-node-id="1:98"
              data-name="Background"
            />
            <div
              className="absolute bottom-0 overflow-clip right-[-9px] size-[10px]"
              data-node-id="1:99"
              data-name="SVG"
            >
              <TabCornerCurve />
            </div>
            <div
              className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Bold'] font-bold h-[20px] justify-center leading-[0] left-[22px] not-italic text-[#222] group-hover:text-[#f2c4c2] text-[15px] top-[19.8px] tracking-[0.75px] w-[115.49px] transition-colors duration-300"
              data-node-id="1:103"
            >
              <p className="leading-[15px]">TP. Hà Nội</p>
            </div>
          </div>
          <div
            className="absolute bg-white group-hover:bg-[#07374d] bottom-[35.6px] h-[8px] left-[-1.4px] w-[524.29px] transition-colors duration-300"
            data-node-id="1:104"
            data-name="Background"
          />
          <div
            className="absolute flex flex-wrap gap-[8px] left-[19.6px] top-[60.6px] w-[482.29px]"
            data-node-id="1:105"
            data-name="List"
          >
            <div
              className="inline-flex items-center justify-center bg-[#262626] group-hover:bg-[#f2c4c2] h-[32px] px-[12px] rounded-[5px] transition-colors duration-300"
              data-node-id="1:106"
              data-name="Item"
            >
              <span className="font-['Inter:Bold'] font-bold text-[14px] text-white group-hover:text-[#07374d] whitespace-nowrap tracking-[0.48px] transition-colors duration-300">
                Phở bò tái lăn
              </span>
            </div>
            <div
              className="inline-flex items-center justify-center bg-[#262626] group-hover:bg-[#f2c4c2] h-[32px] px-[12px] rounded-[5px] transition-colors duration-300"
              data-node-id="1:108"
              data-name="Item"
            >
              <span className="font-['Inter:Bold'] font-bold text-[14px] text-white group-hover:text-[#07374d] whitespace-nowrap tracking-[0.48px] transition-colors duration-300">
                Nước dùng thanh
              </span>
            </div>
            <div
              className="inline-flex items-center justify-center bg-[#262626] group-hover:bg-[#f2c4c2] h-[32px] px-[12px] rounded-[5px] transition-colors duration-300"
              data-node-id="1:110"
              data-name="Item"
            >
              <span className="font-['Inter:Bold'] font-bold text-[14px] text-white group-hover:text-[#07374d] whitespace-nowrap tracking-[0.48px] transition-colors duration-300">
                Phố cổ Hà Nội
              </span>
            </div>
          </div>
        </div>

        {}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className={`group cursor-pointer absolute bg-white hover:bg-[#07374d] border border-[#2b2b2b] hover:border-[#07374d] border-solid bottom-[126.22px] left-[492.42px] rounded-bl-[10px] rounded-br-[10px] rounded-tr-[10px] top-[402.98px] w-[523.49px] transition-all duration-300 ${
            activeSlide === 1
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
          data-node-id="1:116"
          data-name="Link"
        >
          <div
            className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Bold'] font-bold h-[32px] justify-center leading-[0] left-[19.6px] not-italic text-[#222] group-hover:text-[#f2c4c2] text-[20px] top-[31.6px] tracking-[0.6px] w-[445.55px] transition-colors duration-300"
            data-node-id="1:117"
          >
            <p className="leading-[32px]">
              Cơm Tấm Ba Ghiền | Sườn nướng than hồng chuẩn vị Sài Gòn
            </p>
          </div>
          <div
            className="absolute bg-white group-hover:bg-[#07374d] border-[#2b2b2b] group-hover:border-[#07374d] border-l-[1.6px] border-r-[1.6px] border-solid border-t-[1.6px] h-[37.6px] left-[-1.4px] rounded-tl-[6px] rounded-tr-[6px] top-[-37.4px] w-[146.74px] transition-colors duration-300"
            data-node-id="1:118"
            data-name="Background+Border"
          >
            <div
              className="absolute bg-white group-hover:bg-[#07374d] h-[4px] left-[-2px] top-[13px] w-[147.54px] transition-colors duration-300"
              data-node-id="1:119"
              data-name="Background"
            />
            <div
              className="absolute bg-white group-hover:bg-[#07374d] bottom-[-2px] h-[4px] left-0 w-[145.54px] transition-colors duration-300"
              data-node-id="1:120"
              data-name="Background"
            />
            <div
              className="absolute bottom-0 overflow-clip right-[-9px] size-[10px]"
              data-node-id="1:121"
              data-name="SVG"
            >
              <TabCornerCurve />
            </div>
            <div
              className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Bold'] font-bold h-[20px] justify-center leading-[0] left-[22px] not-italic text-[#222] group-hover:text-[#f2c4c2] text-[15px] top-[19.8px] tracking-[0.75px] w-[99.74px] transition-colors duration-300"
              data-node-id="1:125"
            >
              <p className="leading-[15px]">TP. Hồ Chí Minh</p>
            </div>
          </div>
          <div
            className="absolute bg-white group-hover:bg-[#07374d] bottom-[35.6px] h-[8px] left-[-1.4px] w-[524.29px] transition-colors duration-300"
            data-node-id="1:126"
            data-name="Background"
          />
          <div
            className="absolute flex flex-wrap gap-[8px] left-[19.6px] top-[60.6px] w-[482.29px]"
            data-node-id="1:127"
            data-name="List"
          >
            <div
              className="inline-flex items-center justify-center bg-[#262626] group-hover:bg-[#f2c4c2] h-[32px] px-[12px] rounded-[5px] transition-colors duration-300"
              data-node-id="1:128"
              data-name="Item"
            >
              <span className="font-['Inter:Bold'] font-bold text-[14px] text-white group-hover:text-[#07374d] whitespace-nowrap tracking-[0.48px] transition-colors duration-300">
                Sườn bì chả
              </span>
            </div>
            <div
              className="inline-flex items-center justify-center bg-[#262626] group-hover:bg-[#f2c4c2] h-[32px] px-[12px] rounded-[5px] transition-colors duration-300"
              data-node-id="1:130"
              data-name="Item"
            >
              <span className="font-['Inter:Bold'] font-bold text-[14px] text-white group-hover:text-[#07374d] whitespace-nowrap tracking-[0.48px] transition-colors duration-300">
                Ăn đêm Sài Gòn
              </span>
            </div>
            <div
              className="inline-flex items-center justify-center bg-[#262626] group-hover:bg-[#f2c4c2] h-[32px] px-[12px] rounded-[5px] transition-colors duration-300"
              data-node-id="1:132"
              data-name="Item"
            >
              <span className="font-['Inter:Bold'] font-bold text-[14px] text-white group-hover:text-[#07374d] whitespace-nowrap tracking-[0.48px] transition-colors duration-300">
                Hương vị Nam Bộ
              </span>
            </div>
            <div
              className="inline-flex items-center justify-center bg-[#262626] group-hover:bg-[#f2c4c2] h-[32px] px-[12px] rounded-[5px] transition-colors duration-300"
              data-node-id="1:134"
              data-name="Item"
            >
              <span className="font-['Inter:Bold'] font-bold text-[14px] text-white group-hover:text-[#07374d] whitespace-nowrap tracking-[0.48px] transition-colors duration-300">
                Ngon nức tiếng
              </span>
            </div>
            <div
              className="inline-flex items-center justify-center bg-[#262626] group-hover:bg-[#f2c4c2] h-[32px] px-[12px] rounded-[5px] transition-colors duration-300"
              data-node-id="1:136"
              data-name="Item"
            >
              <span className="font-['Inter:Bold'] font-bold text-[14px] text-white group-hover:text-[#07374d] whitespace-nowrap tracking-[0.48px] transition-colors duration-300">
                Quán quen phố thị
              </span>
            </div>
          </div>
        </div>

        {}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className={`group cursor-pointer absolute bg-white hover:bg-[#07374d] border border-[#2b2b2b] hover:border-[#07374d] border-solid bottom-[166.22px] left-[492.42px] rounded-bl-[10px] rounded-br-[10px] rounded-tr-[10px] top-[402.98px] w-[487.39px] transition-all duration-300 ${
            activeSlide === 2
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
          data-node-id="1:138"
          data-name="Link"
        >
          <div
            className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Bold'] font-bold h-[32px] justify-center leading-[0] left-[19.6px] not-italic text-[#222] group-hover:text-[#f2c4c2] text-[20px] top-[31.6px] tracking-[0.6px] w-[446.39px] transition-colors duration-300"
            data-node-id="1:139"
          >
            <p className="leading-[32px]">
              Lẩu Gà Lá É Tao Ngộ | Ấm lòng đêm se lạnh cao nguyên
            </p>
          </div>
          <div
            className="absolute bg-white group-hover:bg-[#07374d] border-[#2b2b2b] group-hover:border-[#07374d] border-l-[1.6px] border-r-[1.6px] border-solid border-t-[1.6px] h-[37.6px] left-[-1.4px] rounded-tl-[6px] rounded-tr-[6px] top-[-37.4px] w-[162.49px] transition-colors duration-300"
            data-node-id="1:140"
            data-name="Background+Border"
          >
            <div
              className="absolute bg-white group-hover:bg-[#07374d] h-[4px] left-[-2px] top-[13px] w-[163.29px] transition-colors duration-300"
              data-node-id="1:141"
              data-name="Background"
            />
            <div
              className="absolute bg-white group-hover:bg-[#07374d] bottom-[-2px] h-[4px] left-0 w-[161.29px] transition-colors duration-300"
              data-node-id="1:142"
              data-name="Background"
            />
            <div
              className="absolute bottom-0 overflow-clip right-[-9px] size-[10px]"
              data-node-id="1:143"
              data-name="SVG"
            >
              <TabCornerCurve />
            </div>
            <div
              className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Bold'] font-bold h-[20px] justify-center leading-[0] left-[22px] not-italic text-[#222] group-hover:text-[#f2c4c2] text-[15px] top-[19.8px] tracking-[0.75px] w-[115.49px] transition-colors duration-300"
              data-node-id="1:147"
            >
              <p className="leading-[15px]">TP. Đà Lạt</p>
            </div>
          </div>
          <div
            className="absolute bg-white group-hover:bg-[#07374d] bottom-[35.6px] h-[8px] left-[-1.4px] w-[488.19px] transition-colors duration-300"
            data-node-id="1:148"
            data-name="Background"
          />
          <div
            className="absolute flex flex-wrap gap-[8px] left-[19.6px] top-[60.6px] w-[446.19px]"
            data-node-id="1:149"
            data-name="List"
          >
            <div
              className="inline-flex items-center justify-center bg-[#262626] group-hover:bg-[#f2c4c2] h-[32px] px-[12px] rounded-[5px] transition-colors duration-300"
              data-node-id="1:150"
              data-name="Item"
            >
              <span className="font-['Inter:Bold'] font-bold text-[14px] text-white group-hover:text-[#07374d] whitespace-nowrap tracking-[0.48px] transition-colors duration-300">
                Lẩu gà lá é
              </span>
            </div>
            <div
              className="inline-flex items-center justify-center bg-[#262626] group-hover:bg-[#f2c4c2] h-[32px] px-[12px] rounded-[5px] transition-colors duration-300"
              data-node-id="1:152"
              data-name="Item"
            >
              <span className="font-['Inter:Bold'] font-bold text-[14px] text-white group-hover:text-[#07374d] whitespace-nowrap tracking-[0.48px] transition-colors duration-300">
                Đêm lạnh Đà Lạt
              </span>
            </div>
            <div
              className="inline-flex items-center justify-center bg-[#262626] group-hover:bg-[#f2c4c2] h-[32px] px-[12px] rounded-[5px] transition-colors duration-300"
              data-node-id="1:154"
              data-name="Item"
            >
              <span className="font-['Inter:Bold'] font-bold text-[14px] text-white group-hover:text-[#07374d] whitespace-nowrap tracking-[0.48px] transition-colors duration-300">
                Tụ tập bạn bè
              </span>
            </div>
          </div>
        </div>

        {}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className={`group cursor-pointer absolute bg-white hover:bg-[#07374d] border border-[#2b2b2b] hover:border-[#07374d] border-solid bottom-[110px] left-[492.42px] rounded-bl-[10px] rounded-br-[10px] rounded-tr-[10px] top-[419.2px] w-[523.49px] transition-all duration-300 ${
            activeSlide === 3
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
          data-node-id="1:156"
          data-name="Link"
        >
          <div
            className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Bold'] font-bold h-[32px] justify-center leading-[0] left-[19.6px] not-italic text-[#222] group-hover:text-[#f2c4c2] text-[17.5px] top-[31.6px] tracking-[0.6px] w-[425.01px] transition-colors duration-300"
            data-node-id="1:157"
          >
            <p className="leading-[32px]">
              Bánh Xèo & Nem Lụi Bà Dưỡng | Nước chấm gia truyền đậm đà
            </p>
          </div>
          <div
            className="absolute bg-white group-hover:bg-[#07374d] border-[#2b2b2b] group-hover:border-[#07374d] border-l-[1.6px] border-r-[1.6px] border-solid border-t-[1.6px] h-[37.6px] left-[-1.4px] rounded-tl-[6px] rounded-tr-[6px] top-[-37.4px] w-[141.7px] transition-colors duration-300"
            data-node-id="1:158"
            data-name="Background+Border"
          >
            <div
              className="absolute bg-white group-hover:bg-[#07374d] h-[4px] left-[-2px] top-[13px] w-[142.5px] transition-colors duration-300"
              data-node-id="1:159"
              data-name="Background"
            />
            <div
              className="absolute bg-white group-hover:bg-[#07374d] bottom-[-2px] h-[4px] left-0 w-[140.5px] transition-colors duration-300"
              data-node-id="1:160"
              data-name="Background"
            />
            <div
              className="absolute bottom-0 overflow-clip right-[-9px] size-[10px]"
              data-node-id="1:161"
              data-name="SVG"
            >
              <TabCornerCurve />
            </div>
            <div
              className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Bold'] font-bold h-[20px] justify-center leading-[0] left-[22px] not-italic text-[#222] group-hover:text-[#f2c4c2] text-[15px] top-[19.8px] tracking-[0.75px] w-[94.7px] transition-colors duration-300"
              data-node-id="1:165"
            >
              <p className="leading-[15px]">TP. Đà Nẵng</p>
            </div>
          </div>
          <div
            className="absolute bg-white group-hover:bg-[#07374d] bottom-[35.6px] h-[8px] left-[-1.4px] w-[524.29px] transition-colors duration-300"
            data-node-id="1:166"
            data-name="Background"
          />
          <div
            className="absolute flex flex-wrap gap-[8px] left-[19.6px] top-[60.6px] w-[482.29px]"
            data-node-id="1:167"
            data-name="List"
          >
            <div
              className="inline-flex items-center justify-center bg-[#262626] group-hover:bg-[#f2c4c2] h-[32px] px-[12px] rounded-[5px] transition-colors duration-300"
              data-node-id="1:168"
              data-name="Item"
            >
              <span className="font-['Inter:Bold'] font-bold text-[14px] text-white group-hover:text-[#07374d] whitespace-nowrap tracking-[0.48px] transition-colors duration-300">
                Bánh xèo giòn rụm
              </span>
            </div>
            <div
              className="inline-flex items-center justify-center bg-[#262626] group-hover:bg-[#f2c4c2] h-[32px] px-[12px] rounded-[5px] transition-colors duration-300"
              data-node-id="1:170"
              data-name="Item"
            >
              <span className="font-['Inter:Bold'] font-bold text-[14px] text-white group-hover:text-[#07374d] whitespace-nowrap tracking-[0.48px] transition-colors duration-300">
                Nem lụi nướng
              </span>
            </div>
            <div
              className="inline-flex items-center justify-center bg-[#262626] group-hover:bg-[#f2c4c2] h-[32px] px-[12px] rounded-[5px] transition-colors duration-300"
              data-node-id="1:172"
              data-name="Item"
            >
              <span className="font-['Inter:Bold'] font-bold text-[14px] text-white group-hover:text-[#07374d] whitespace-nowrap tracking-[0.48px] transition-colors duration-300">
                Đặc sản phố biển
              </span>
            </div>
            <div
              className="inline-flex items-center justify-center bg-[#262626] group-hover:bg-[#f2c4c2] h-[32px] px-[12px] rounded-[5px] transition-colors duration-300"
              data-node-id="1:174"
              data-name="Item"
            >
              <span className="font-['Inter:Bold'] font-bold text-[14px] text-white group-hover:text-[#07374d] whitespace-nowrap tracking-[0.48px] transition-colors duration-300">
                Gắn kết bạn bè
              </span>
            </div>
            <div
              className="inline-flex items-center justify-center bg-[#262626] group-hover:bg-[#f2c4c2] h-[32px] px-[12px] rounded-[5px] transition-colors duration-300"
              data-node-id="1:176"
              data-name="Item"
            >
              <span className="font-['Inter:Bold'] font-bold text-[14px] text-white group-hover:text-[#07374d] whitespace-nowrap tracking-[0.48px] transition-colors duration-300">
                Ăn vặt & lai rai
              </span>
            </div>
            <div
              className="inline-flex items-center justify-center bg-[#262626] group-hover:bg-[#f2c4c2] h-[32px] px-[12px] rounded-[5px] transition-colors duration-300"
              data-node-id="1:178"
              data-name="Item"
            >
              <span className="font-['Inter:Bold'] font-bold text-[14px] text-white group-hover:text-[#07374d] whitespace-nowrap tracking-[0.48px] transition-colors duration-300">
                Đậm đà miền Trung
              </span>
            </div>
          </div>
        </div>

        <div
          className="absolute bg-[#f7f6f4] inset-[-3px_-507.77px_165.2px_1509.12px] rounded-[30px]"
          data-node-id="1:180"
          data-name="Background"
        />
        {}
        <div
          className="absolute inset-[121.6px_-0.01px_289.8px_1421.36px] overflow-clip rounded-[10px]"
          data-node-id="1:181"
          data-name="Container"
        >
          <div
            className="absolute inset-0 overflow-clip"
            data-node-id="1:182"
            data-name="Container"
          >
            {}
            <div
              className={`absolute inset-[-1%] transition-opacity duration-500 ease-in-out ${
                nextIndex === 3 ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
              data-node-id="1:183"
              data-name="Mask Group"
            >
              <div
                className="absolute inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-size-[428.4px_285.6px]"
                data-node-id="1:186"
                style={{ maskImage: `url("${imgImg1592Jpg}")` }}
                data-name="LINE_ALBUM_220718_22-800x533-1.jpg"
              >
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <img
                    alt=""
                    className="absolute h-full left-[-0.03%] max-w-none top-0 w-[100.06%]"
                    src={imgLineAlbum22071822800X5331Jpg}
                  />
                </div>
              </div>
            </div>
            {}
            <div
              className={`absolute inset-[-1%] transition-opacity duration-500 ease-in-out ${
                nextIndex === 2 ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
              data-node-id="1:187"
              data-name="Mask Group"
            >
              <div
                className="absolute inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-size-[428.4px_285.6px]"
                data-node-id="1:190"
                style={{ maskImage: `url("${imgImg1592Jpg}")` }}
                data-name="IMG_3206-scaled.jpg"
              >
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <img
                    alt=""
                    className="absolute h-[112.5%] left-0 max-w-none top-[-6.25%] w-full"
                    src={imgImg3206ScaledJpg}
                  />
                </div>
              </div>
            </div>
            {}
            <div
              className={`absolute inset-[-1%_-8.14%_-1%_6.14%] transition-opacity duration-500 ease-in-out ${
                nextIndex === 1 ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
              data-node-id="1:191"
              data-name="Mask Group"
            >
              <div
                className="absolute inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-size-[428.4px_285.6px]"
                data-node-id="1:194"
                style={{ maskImage: `url("${imgImg1592Jpg}")` }}
                data-name="IMG_5097%F0%9F%8C%9F-scaled.jpeg"
              >
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <img
                    alt=""
                    className="absolute h-[100.02%] left-0 max-w-none top-[-0.01%] w-full"
                    src={imgImg5097F09F8C9FScaledJpeg}
                  />
                </div>
              </div>
            </div>
            {}
            <div
              className={`absolute inset-[-1%] transition-opacity duration-500 ease-in-out ${
                nextIndex === 0 ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
              data-node-id="1:195"
              data-name="Mask Group"
            >
              <div
                className="absolute inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-size-[428.4px_285.6px]"
                data-node-id="1:198"
                style={{ maskImage: `url("${imgImg1592Jpg}")` }}
                data-name="IMG_1592.jpg"
              >
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <img
                    alt=""
                    className="absolute h-[112.5%] left-0 max-w-none top-[-6.25%] w-full"
                    src={imgImg1592Jpg1}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
