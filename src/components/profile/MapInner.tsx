"use client"

import { useEffect, useRef, useState } from "react"
import L from "leaflet"
import type { LocationCoordinate, ScheduleItem } from "@/types/profile"

export interface MapInnerProps {
  homeCoordinate: LocationCoordinate
  userName: string
  items: ScheduleItem[]
  selectedScheduleId: string | null
  onSelectSchedule: (id: string) => void
}

export default function MapInner({
  homeCoordinate,
  userName,
  items,
  selectedScheduleId,
  onSelectSchedule,
}: MapInnerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<L.Map | null>(null)
  const markersMapRef = useRef<Map<string, L.Marker>>(new Map())
  const homeMarkerRef = useRef<L.Marker | null>(null)
  const onSelectScheduleRef = useRef(onSelectSchedule)
  onSelectScheduleRef.current = onSelectSchedule

  // 1. Khởi tạo bản đồ an toàn và theo dõi kích thước
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Xóa _leaflet_id cũ nếu có do React Fast Refresh / Strict Mode
    if ((container as unknown as { _leaflet_id?: number })._leaflet_id) {
      delete (container as unknown as { _leaflet_id?: number })._leaflet_id
    }

    const mapInstance = L.map(container, {
      center: [homeCoordinate.lat, homeCoordinate.lng],
      zoom: 14,
      zoomControl: true,
      scrollWheelZoom: true,
    })

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(mapInstance)

    setMap(mapInstance)

    // Nhiều chu kỳ invalidateSize để đảm bảo hiển thị đúng ngay cả khi chuyển trang hoặc flex/grid thay đổi
    const t1 = setTimeout(() => mapInstance.invalidateSize(), 50)
    const t2 = setTimeout(() => mapInstance.invalidateSize(), 200)
    const t3 = setTimeout(() => mapInstance.invalidateSize(), 500)

    // Tự động invalidateSize khi container thay đổi kích thước
    let resizeObserver: ResizeObserver | null = null
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => {
        mapInstance.invalidateSize()
      })
      resizeObserver.observe(container)
    }

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      if (resizeObserver) {
        resizeObserver.disconnect()
      }
      mapInstance.remove()
      setMap(null)
      markersMapRef.current.clear()
      homeMarkerRef.current = null
    }
  }, [homeCoordinate.lat, homeCoordinate.lng])

  // 2. Render Marker Vị trí của bạn (Home Marker)
  useEffect(() => {
    if (!map) return

    if (homeMarkerRef.current) {
      homeMarkerRef.current.remove()
    }

    const homeHtml = `
      <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 34px; height: 34px; background: transparent;">
        <span style="position: absolute; width: 34px; height: 34px; background-color: #10B981; opacity: 0.35; animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></span>
        <div style="position: relative; width: 28px; height: 28px; background-color: #10B981; border: 2px solid #000000; box-shadow: 2px 2px 0px #000000; display: flex; align-items: center; justify-content: center; color: #ffffff;">
          <svg style="width: 14px; height: 14px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
        </div>
      </div>
    `

    const homeIcon = L.divIcon({
      html: homeHtml,
      className: "!bg-transparent !border-0",
      iconSize: [34, 34],
      iconAnchor: [17, 17],
      popupAnchor: [0, -17],
    })

    const marker = L.marker([homeCoordinate.lat, homeCoordinate.lng], {
      icon: homeIcon,
    }).addTo(map)

    const homePopupContent = `
      <div style="font-family: inherit; padding: 4px 6px; text-align: center; background: #ffffff; color: #000000;">
        <div style="font-size: 13px; font-weight: 800; color: #000000;">${userName}</div>
        <div style="font-size: 11px; color: #059669; font-weight: 700; margin-top: 3px; display: flex; align-items: center; justify-content: center; gap: 4px;">
          <span>📍</span><span>Vị trí của bạn (Khởi hành)</span>
        </div>
      </div>
    `
    marker.bindPopup(homePopupContent)
    homeMarkerRef.current = marker
  }, [map, homeCoordinate.lat, homeCoordinate.lng, userName])

  // 3. Render Markers cho từng địa điểm ẩm thực
  useEffect(() => {
    if (!map) return

    markersMapRef.current.forEach((marker) => marker.remove())
    markersMapRef.current.clear()

    items.forEach((item, index) => {
      const isSelected = item.id === selectedScheduleId

      const pinHtml = `
        <div class="custom-pin-wrapper" style="position: relative; display: flex; flex-direction: column; align-items: center; cursor: pointer; transition: transform 0.2s ease; background: transparent; ${
          isSelected ? "transform: scale(1.2); z-index: 1000;" : ""
        }">
          <div style="position: relative; width: 32px; height: 32px; background-color: ${isSelected ? '#000000' : '#ffffff'}; border: 2px solid #000000; box-shadow: 2px 2px 0px #000000; display: flex; align-items: center; justify-content: center; color: ${isSelected ? '#ffffff' : '#000000'}; font-weight: 800; font-size: 12px;">
            ${index + 1}
          </div>
          <div style="width: 8px; height: 8px; transform: rotate(45deg); background-color: ${isSelected ? '#000000' : '#ffffff'}; margin-top: -5px; border-right: 2px solid #000000; border-bottom: 2px solid #000000;"></div>
        </div>
      `

      const foodIcon = L.divIcon({
        html: pinHtml,
        className: "!bg-transparent !border-0",
        iconSize: [32, 40],
        iconAnchor: [16, 38],
        popupAnchor: [0, -38],
      })

      const marker = L.marker([item.coordinates.lat, item.coordinates.lng], {
        icon: foodIcon,
      }).addTo(map)

      const popupHtml = `
        <div style="width: 230px; font-family: inherit; overflow: hidden; background: #ffffff; color: #000000;">
          <div style="position: relative; width: 100%; height: 110px; border: 1.5px solid #000000; overflow: hidden; margin-bottom: 8px; background-color: #f5f5f5;">
            <img src="${item.imageUrl}" alt="${item.placeName}" style="width: 100%; height: 100%; object-fit: cover; display: block;" />
            <span style="position: absolute; top: 4px; right: 4px; background-color: #000000; color: #ffffff; font-size: 10px; font-weight: 800; padding: 2px 6px; text-transform: uppercase;">${item.category}</span>
          </div>
          <h4 style="margin: 0 0 4px; font-size: 13.5px; font-weight: 800; color: #000000; line-height: 1.3;">${item.placeName}</h4>
          <p style="margin: 0 0 6px; font-size: 11px; color: #404040; line-height: 1.35; font-weight: 500;">📍 ${item.address}</p>
          <div style="display: flex; align-items: center; justify-content: space-between; font-size: 11px; color: #171717; border-top: 1.5px solid #000000; padding-top: 6px; font-weight: 700;">
            <span>⏰ <b>${item.time}</b> • ${item.date}</span>
            <span style="background: #000000; color: #ffffff; padding: 1px 5px; font-size: 10px;">${item.guestsCount} khách</span>
          </div>
        </div>
      `
      marker.bindPopup(popupHtml)

      marker.on("click", () => {
        onSelectScheduleRef.current(item.id)
      })

      markersMapRef.current.set(item.id, marker)
    })
  }, [map, items, selectedScheduleId])

  // 4. Fly to & mở popup khi selectedScheduleId thay đổi
  useEffect(() => {
    if (!map || !selectedScheduleId) return

    const targetItem = items.find((item) => item.id === selectedScheduleId)
    if (!targetItem) return

    map.flyTo([targetItem.coordinates.lat, targetItem.coordinates.lng], 16, {
      animate: true,
      duration: 1.2,
    })

    const marker = markersMapRef.current.get(selectedScheduleId)
    if (marker) {
      const popupTimer = setTimeout(() => {
        marker.openPopup()
      }, 350)
      return () => clearTimeout(popupTimer)
    }
  }, [map, selectedScheduleId, items])

  return (
    <div className="relative w-full h-full min-h-[360px] sm:min-h-[420px] lg:min-h-[440px]" style={{ width: "100%", height: "100%" }}>
      <style>{`
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        .custom-pin-wrapper:hover {
          transform: scale(1.15);
        }
        .leaflet-popup-content-wrapper {
          background: #ffffff !important;
          color: #000000 !important;
          border: 2px solid #000000 !important;
          border-radius: 0px !important;
          box-shadow: 4px 4px 0px #000000 !important;
          padding: 0 !important;
          overflow: hidden !important;
        }
        .leaflet-popup-content {
          margin: 10px !important;
          line-height: 1.4 !important;
        }
        .leaflet-popup-tip {
          background: #ffffff !important;
          border: 2px solid #000000 !important;
          border-radius: 0px !important;
        }
        .leaflet-container {
          font-family: inherit !important;
          background-color: #f5f5f5 !important;
          width: 100% !important;
          height: 100% !important;
        }
        .leaflet-container a.leaflet-popup-close-button {
          color: #000000 !important;
          padding: 6px !important;
          font-size: 16px !important;
          font-weight: bold !important;
        }
        .leaflet-container a.leaflet-popup-close-button:hover {
          color: #ef4444 !important;
        }
        .leaflet-control-zoom {
          border: 2px solid #000000 !important;
          border-radius: 0px !important;
          overflow: hidden !important;
          box-shadow: 2px 2px 0px #000000 !important;
        }
        .leaflet-control-zoom a {
          background-color: #ffffff !important;
          color: #000000 !important;
          border-bottom: 2px solid #000000 !important;
          border-radius: 0px !important;
          font-weight: bold !important;
        }
        .leaflet-control-zoom a:hover {
          background-color: #000000 !important;
          color: #ffffff !important;
        }
        .leaflet-control-attribution {
          background: rgba(255, 255, 255, 0.9) !important;
          color: #000000 !important;
          font-size: 10px !important;
          border-top: 1.5px solid #000000 !important;
          border-left: 1.5px solid #000000 !important;
          border-radius: 0px !important;
        }
        .leaflet-control-attribution a {
          color: #000000 !important;
          font-weight: bold !important;
        }
      `}</style>
      <div
        ref={containerRef}
        className="w-full h-full min-h-[360px] sm:min-h-[420px] lg:min-h-[440px]"
        style={{ width: "100%", height: "100%", minHeight: "360px" }}
      />
    </div>
  )
}
