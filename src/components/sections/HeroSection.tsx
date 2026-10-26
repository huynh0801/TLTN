import Image from "next/image"

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#fdefdf]">
      {/* Desktop & Tablet Banner: Horizontal 21:9 panoramic */}
      <div className="hidden md:block relative w-full aspect-[3168/1344] overflow-hidden">
        <Image
          src="/img/herosection.png"
          alt="Tìm quán ngon ở Sài Gòn - Khám phá hàng ngàn món ăn, quán xá hấp dẫn quanh bạn"
          width={3168}
          height={1344}
          priority
          sizes="100vw"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Mobile Banner: Vertical Portrait 9:16 watercolor */}
      <div className="block md:hidden relative w-full aspect-[1536/2752] overflow-hidden">
        <Image
          src="/img/herosection-mobile.png"
          alt="Tìm quán ngon ở Sài Gòn - Khám phá hàng ngàn món ăn, quán xá hấp dẫn quanh bạn"
          width={1536}
          height={2752}
          priority
          sizes="100vw"
          className="w-full h-full object-cover object-center"
        />
      </div>
    </section>
  )
}
