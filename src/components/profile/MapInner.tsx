"use client"

// 1. Initialize Leaflet Map Instance

// Invalidate map size after rendering to prevent gray unrendered tiles

// 2. Render Home Location Marker

// 3. Render Food Pins for Schedule Items

// Clean up existing schedule markers

// 4. Smooth flyTo & Popup Opening on Selection Change

import { useEffect, useRef } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
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
  const mapRef = useRef<L.Map | null>(null)
  const markersMapRef = useRef<Map<string, L.Marker>>(new Map())
  const homeMarkerRef = useRef<L.Marker | null>(null)
  const onSelectScheduleRef = useRef(onSelectSchedule)
  onSelectScheduleRef.current = onSelectSchedule
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    const map = L.map(containerRef.current, {
      center: [homeCoordinate.lat, homeCoordinate.lng],
      zoom: 14,
      zoomControl: true,
      scrollWheelZoom: true,
    })
    mapRef.current = map

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map)
    const resizeTimer = setTimeout(() => {
      map.invalidateSize()
    }, 250)

    return () => {
      clearTimeout(resizeTimer)
      map.remove()
      mapRef.current = null
      markersMapRef.current.clear()
      homeMarkerRef.current = null
    }
  }, [homeCoordinate.lat, homeCoordinate.lng])
  useEffect(() => {
    const map = mapRef.current
    if (!map) return

    if (homeMarkerRef.current) {
      homeMarkerRef.current.remove()
    }

    const homeHtml = `
      <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 36px; height: 36px;">
        <span style="position: absolute; width: 36px; height: 36px; border-radius: 9999px; background-color: #34D399; opacity: 0.5; animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></span>
        <div style="position: relative; width: 28px; height: 28px; border-radius: 9999px; background-color: #10B981; border: 2.5px solid #ffffff; box-shadow: 0 4px 14px rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; color: #ffffff;">
          <svg style="width: 14px; height: 14px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
        </div>
      </div>
    `

    const homeIcon = L.divIcon({
      html: homeHtml,
      className: "home-custom-marker",
      iconSize: [36, 36],
      iconAnchor: [18, 18],
      popupAnchor: [0, -18],
    })

    const marker = L.marker([homeCoordinate.lat, homeCoordinate.lng], {
      icon: homeIcon,
    }).addTo(map)

    const homePopupContent = `
      <div style="font-family: inherit; padding: 4px 6px; text-align: center;">
        <div style="font-size: 13px; font-weight: 700; color: #FFFFFF;">${userName}</div>
        <div style="font-size: 11px; color: #34D399; font-weight: 600; margin-top: 3px; display: flex; align-items: center; justify-content: center; gap: 4px;">
          <span>📍</span><span>Vị trí của bạn (Khởi hành)</span>
        </div>
      </div>
    `
    marker.bindPopup(homePopupContent)
    homeMarkerRef.current = marker
  }, [homeCoordinate.lat, homeCoordinate.lng, userName])
  useEffect(() => {
    const map = mapRef.current
    if (!map) return
    markersMapRef.current.forEach((marker) => marker.remove())
    markersMapRef.current.clear()

    items.forEach((item) => {
      const isSelected =
        item.id ===
        selectedScheduleId

      const pinHtml = `
        <div class="custom-pin-wrapper" style="position: relative; display: flex; flex-direction: column; align-items: center; cursor: pointer; transition: transform 0.2s ease; ${
          isSelected ? "transform: scale(1.25); z-index: 1000;" : ""
        }">
          ${
            isSelected
              ? '<span style="position: absolute; top: -4px; width: 38px; height: 38px; border-radius: 9999px; background-color: #F2A93B; opacity: 0.6; animation: ping 1.2s cubic-bezier(0, 0, 0.2, 1) infinite;"></span>'
              : ""
          }
          <div style="position: relative; width: 32px; height: 32px; border-radius: 9999px; background-color: #F2A93B; border: 2.5px solid ${
            isSelected ? "#FFFFFF" : "#161616"
          }; box-shadow: 0 4px 12px rgba(242, 169, 59, 0.5); display: flex; align-items: center; justify-content: center; color: #161616;">
            <svg style="width: 15px; height: 15px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/>
              <path d="M7 2v20"/>
              <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>
            </svg>
          </div>
          <div style="width: 8px; height: 8px; transform: rotate(45deg); background-color: #F2A93B; margin-top: -4px; box-shadow: 0 2px 4px rgba(0,0,0,0.3); border-right: 1px solid #161616; border-bottom: 1px solid #161616;"></div>
        </div>
      `

      const foodIcon = L.divIcon({
        html: pinHtml,
        className: "food-custom-marker",
        iconSize: [32, 40],
        iconAnchor: [16, 38],
        popupAnchor: [0, -38],
      })

      const marker = L.marker([item.coordinates.lat, item.coordinates.lng], {
        icon: foodIcon,
      }).addTo(map)

      const popupHtml = `
        <div style="width: 230px; font-family: inherit; overflow: hidden;">
          <div style="position: relative; width: 100%; height: 110px; border-radius: 8px; overflow: hidden; margin-bottom: 8px; background-color: #262626;">
            <img src="${item.imageUrl}" alt="${item.placeName}" style="width: 100%; height: 100%; object-fit: cover; display: block;" />
            <span style="position: absolute; top: 6px; right: 6px; background-color: rgba(0, 0, 0, 0.75); backdrop-filter: blur(4px); color: #F2A93B; font-size: 10px; font-weight: 700; padding: 2px 8px; border-radius: 9999px; border: 1px solid rgba(242, 169, 59, 0.3);">${item.category}</span>
          </div>
          <h4 style="margin: 0 0 4px; font-size: 13.5px; font-weight: 700; color: #FFFFFF; line-height: 1.3;">${item.placeName}</h4>
          <p style="margin: 0 0 6px; font-size: 11px; color: rgba(255, 255, 255, 0.7); line-height: 1.35;">📍 ${item.address}</p>
          <div style="display: flex; align-items: center; justify-content: space-between; font-size: 11px; color: rgba(255, 255, 255, 0.85); border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 6px;">
            <span>⏰ <b style="color: #F2A93B;">${item.time}</b> • ${item.date}</span>
            <span style="color: #34D399; font-weight: 600;">${item.guestsCount} khách</span>
          </div>
        </div>
      `
      marker.bindPopup(popupHtml)

      marker.on("click", () => {
        onSelectScheduleRef.current(item.id)
      })

      markersMapRef.current.set(item.id, marker)
    })
  }, [items, selectedScheduleId])
  useEffect(() => {
    const map = mapRef.current
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
  }, [selectedScheduleId, items])

  return (
    <div className="relative w-full h-full">
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
          background: #1e1e1e !important;
          color: #ffffff !important;
          border: 1px solid rgba(255, 255, 255, 0.15) !important;
          border-radius: 12px !important;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.6), 0 8px 10px -6px rgba(0, 0, 0, 0.6) !important;
          padding: 0 !important;
          overflow: hidden !important;
        }
        .leaflet-popup-content {
          margin: 10px !important;
          line-height: 1.4 !important;
        }
        .leaflet-popup-tip {
          background: #1e1e1e !important;
          border: 1px solid rgba(255, 255, 255, 0.15) !important;
        }
        .leaflet-container {
          font-family: inherit !important;
          background-color: #161616 !important;
        }
        .leaflet-container a.leaflet-popup-close-button {
          color: rgba(255, 255, 255, 0.6) !important;
          padding: 6px !important;
          font-size: 16px !important;
        }
        .leaflet-container a.leaflet-popup-close-button:hover {
          color: #ffffff !important;
        }
        .leaflet-control-zoom {
          border: 1px solid rgba(255, 255, 255, 0.15) !important;
          border-radius: 8px !important;
          overflow: hidden !important;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.4) !important;
        }
        .leaflet-control-zoom a {
          background-color: #222222 !important;
          color: #ffffff !important;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
        }
        .leaflet-control-zoom a:hover {
          background-color: #2c2c2c !important;
          color: #F2A93B !important;
        }
        .leaflet-control-attribution {
          background: rgba(22, 22, 22, 0.85) !important;
          color: rgba(255, 255, 255, 0.6) !important;
          backdrop-filter: blur(4px) !important;
          font-size: 10px !important;
          border-top-left-radius: 6px !important;
        }
        .leaflet-control-attribution a {
          color: #F2A93B !important;
        }
      `}</style>
      <div ref={containerRef} className="w-full h-full" />
    </div>
  )
}
