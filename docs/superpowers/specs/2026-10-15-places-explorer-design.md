# Design Spec: Places Explorer Page (`/places`)

**Date:** 2026-10-15  
**Status:** Approved  
**Author:** AI Pair Programmer & User  

---

## 1. Overview & Objective

Provide a dedicated, high-speed, editorial-style exploration page (`/places`) that aggregates all culinary destinations across Vietnam available in the HYUN system. Users can browse, search instantaneously with diacritics-insensitive matching, filter by province/city via interactive pill tabs, and navigate directly into individual place detail pages (`/places/[id]`).

---

## 2. Requirements & User Stories

1. **All-Inclusive Aggregation:** Display all 22+ culinary destinations from `ARCHIVE_PLACE_DETAILS`, `ARCHIVE_ITEMS`, and `mockScheduleItems` with zero duplicates.
2. **Instant Search:** A prominent search bar supporting real-time keyword search across place name, signature dishes, full address, and culinary tags.
3. **Diacritics-Insensitive Matching:** Vietnamese input works identically with or without diacritics (e.g. `bun cha` matches `Bún Chả Hương Liên`).
4. **City Pill Tabs:** Horizontal scrollable category pills representing top culinary regions (*Tất cả*, *TP. Hà Nội*, *TP. Hồ Chí Minh*, *TP. Đà Nẵng*, *TP. Đà Lạt*, *TP. Nha Trang*, *TP. Cần Thơ*, *TP. Phú Quốc*, *TP. Hải Phòng*, *Tỉnh Quảng Ninh*, *Tỉnh Ninh Bình*, *TP. Hội An*).
5. **Editorial Black-and-White Aesthetic:** Sharp brutalist cards conforming strictly to HYUN's visual language (`#111111`, `#fafafa`, `border-black`, uppercase archive typography).
6. **Card Click-Through:** Each place card navigates cleanly to `/places/[id]`.
7. **Empty State:** Thoughtful feedback when zero results match the search query, with a single-click reset button.
8. **Navigation Integration:** Update `NavigationMenu.tsx` so the "Tìm kiếm" / "Khám phá" action links directly to `/places`.

---

## 3. Architecture & Data Flow

### 3.1 Unified Place Data Model (`src/types/placeExplorer.ts`)

```typescript
export interface UnifiedPlace {
  id: string
  name: string
  city: string
  indexNo: string
  archiveCode: string
  signatureDish: string
  address: string
  image: string
  tags: string[]
  hours?: string
  phone?: string
}
```

### 3.2 Data Source Aggregator (`src/data/unifiedPlacesData.ts`)

- Loads `ARCHIVE_PLACE_DETAILS`, `ARCHIVE_ITEMS`, and `mockScheduleItems`.
- Consolidates them into a deduplicated list `UNIFIED_PLACES: UnifiedPlace[]` indexed by `id`.
- Pre-extracts unique city list `AVAILABLE_CITIES: string[]` sorted by place count and geographic coverage.

### 3.3 Component Hierarchy

```
src/app/places/page.tsx (Server Component with metadata)
  ├── NavigationMenu.tsx (Global floating trigger)
  ├── ChatBox.tsx (Global floating AI chat)
  ├── PlacesHeader.tsx (Client header: Back to Home, Badge, Profile link)
  └── PlacesExplorer.tsx (Client interactive stage)
        ├── SearchBar (Input with clear button & count badge)
        ├── CityFilterTabs (Horizontal scrollable pill list)
        ├── PlacesGrid (Responsive grid: 1 col mobile, 2 col tablet, 3 col desktop)
        │     └── PlaceCard (Image, archive code, name, signature dish, address, link)
        └── EmptyState (Zero-results feedback with reset button)
```

---

## 4. Search & Filter Algorithm

```typescript
function normalizeVietnamese(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .trim()
}
```

Filtered results are computed using `useMemo`:
- `cityFilter === "Tất cả"` OR `place.city === selectedCity`
- `query === ""` OR normalized query appears in normalized `place.name`, `place.signatureDish`, `place.address`, or any element of `place.tags`.

---

## 5. Non-Functional & Mobile PWA Requirements

- **Safe Area Insets:** Fully respects `env(safe-area-inset-top)` and `env(safe-area-inset-bottom)`.
- **Zero Latency:** Client-side in-memory filtering handles 20-100 items within <1ms.
- **Next.js 15 App Router Compatibility:** Valid `export default` page, TypeScript strict mode passing with zero errors.
- **PWA Service Worker:** Static assets and place images are cached runtime via existing SW rules.

---

## 6. Verification Plan

1. `npm.cmd run build`: Verify TypeScript compilation, lint checks, and static page generation for `/places`.
2. Browser Verification:
   - Navigate to `http://localhost:3000/places`.
   - Test text search with `bun`, `pho`, `banh mi`, and without diacritics (`huynh hoa`).
   - Click different city tabs (`TP. Hà Nội`, `TP. Hồ Chí Minh`, `TP. Đà Nẵng`) and verify counts update immediately.
   - Click a place card and confirm navigation to `/places/[id]`.
   - Click "← Trang chủ" in header and confirm navigation back to `/`.
