import Link from "next/link"
import Image from "next/image"
import type { UnifiedPlace } from "@/types/placeExplorer"

export interface PlaceCardProps {
  place: UnifiedPlace
  className?: string
}

export default function PlaceCard({ place, className = "" }: PlaceCardProps) {
  return (
    <Link
      href={`/places/${place.id}`}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-200/80 bg-white p-3.5 transition-all duration-300 hover:-translate-y-1 hover:border-black hover:shadow-xl sm:p-4 ${className}`}
    >
      {/* Image Showcase */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-zinc-100">
        <Image
          src={place.image}
          alt={place.name}
          fill
          unoptimized
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Top-left City Badge */}
        <span className="absolute top-3 left-3 z-10 rounded-full bg-black/85 px-3 py-1 text-[11px] font-bold tracking-wider text-white uppercase backdrop-blur-sm">
          {place.city}
        </span>

        {/* Top-right Archive Code */}
        <span className="absolute top-3 right-3 z-10 rounded-md bg-white/90 px-2.5 py-1 font-mono text-[11px] font-semibold tracking-wider text-black uppercase backdrop-blur-sm">
          {place.archiveCode}
        </span>
      </div>

      {/* Content Body */}
      <div className="mt-3.5 flex flex-1 flex-col justify-between">
        <div>
          {/* Index & Category Row */}
          <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400">
            <span className="font-mono text-zinc-900">#{place.indexNo}</span>
            <span aria-hidden="true">•</span>
            <span className="uppercase tracking-wider text-zinc-500">
              {place.tags?.[0] || "Ẩm thực"}
            </span>
          </div>

          {/* Place Title */}
          <h3 className="mt-1 text-base font-bold text-black sm:text-lg group-hover:underline line-clamp-1">
            {place.name}
          </h3>

          {/* Signature Dish */}
          {place.signatureDish && (
            <p className="mt-1 text-xs sm:text-sm text-zinc-600 italic line-clamp-1">
              “{place.signatureDish}”
            </p>
          )}

          {/* Address */}
          <div className="mt-2.5 flex items-center gap-1.5 text-xs text-zinc-500">
            <svg
              className="size-3.5 shrink-0 text-zinc-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span className="line-clamp-1">{place.address}</span>
          </div>
        </div>

        <div className="mt-4">
          {/* Tags */}
          {place.tags && place.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {place.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-zinc-100 px-2 py-0.5 text-[11px] text-zinc-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Bottom Action Hint */}
          <div className="mt-3.5 flex items-center justify-between border-t border-zinc-100 pt-3 text-xs font-semibold text-zinc-800">
            <span>Khám phá chi tiết</span>
            <span
              className="transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            >
              →
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
