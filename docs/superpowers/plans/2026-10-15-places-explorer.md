# Places Explorer (`/places`) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a high-performance, editorial-style culinary discovery page (`/places`) aggregating 22+ places across Vietnam with instant diacritics-insensitive search, province/city pill filtering, and direct links to `/places/[id]`.

**Architecture:** A unified TypeScript data model consolidates all places from `ARCHIVE_PLACE_DETAILS`, `ARCHIVE_ITEMS`, and `mockScheduleItems` with zero duplication. A client-side interactive stage (`PlacesExplorer.tsx`) manages real-time filtering, fast text search, city tabs, responsive grid rendering, and empty-state handling.

**Tech Stack:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4.

## Global Constraints

- Zero external runtime library dependencies.
- Next.js 15 App Router conventions (`export default` page, async params when applicable).
- Export components as default exports per `AGENTS.md`.
- Use double quotes for strings containing apostrophes per `AGENTS.md`.
- Consistent editorial B&W aesthetic (`#111111`, `#fafafa`, `border-black`, mono accents).
- Mobile responsive and PWA safe-area padding (`env(safe-area-inset-bottom)`).
- `npm run build` must succeed cleanly with 0 TypeScript/lint errors.

---

### Task 1: Unified Data Model, Aggregator & Search Utility

**Files:**
- Create: `src/types/placeExplorer.ts`
- Create: `src/utils/vietnameseSearch.ts`
- Create: `src/data/unifiedPlacesData.ts`

**Interfaces:**
- Produces:
  - `UnifiedPlace`: `{ id: string; name: string; city: string; indexNo: string; archiveCode: string; signatureDish: string; address: string; image: string; tags: string[]; hours?: string; phone?: string; }`
  - `UNIFIED_PLACES: UnifiedPlace[]`
  - `AVAILABLE_CITIES: string[]`
  - `normalizeVietnamese(str: string): string`
  - `matchPlaceSearch(place: UnifiedPlace, query: string): boolean`

- [ ] **Step 1: Create `src/types/placeExplorer.ts`**
  - Define `UnifiedPlace` interface.
  - Define `CityTabOption` interface (`{ id: string; label: string; count: number }`).

- [ ] **Step 2: Create `src/utils/vietnameseSearch.ts`**
  - Implement `normalizeVietnamese` removing accents, normalizing `đ/Đ` to `d/D`, converting to lowercase, and trimming.
  - Implement `matchPlaceSearch(place: UnifiedPlace, query: string): boolean` matching query against name, signatureDish, address, city, and tags.

- [ ] **Step 3: Create `src/data/unifiedPlacesData.ts`**
  - Import `ARCHIVE_PLACE_DETAILS` from `@/data/archivePlacesData`.
  - Import `ARCHIVE_ITEMS` from `@/constants/archivesData`.
  - Import `mockScheduleItems` from `@/data/profileData`.
  - Aggregate all places using `Map<string, UnifiedPlace>` to deduplicate by `id`.
  - Generate sorted `AVAILABLE_CITIES` list with "Tất cả" as first option followed by unique cities with their count of places.
  - Export `UNIFIED_PLACES` and `AVAILABLE_CITIES`.

- [ ] **Step 4: Verify with Node execution**
  - Run node one-liner checking `UNIFIED_PLACES.length >= 20` and `AVAILABLE_CITIES.length > 5`.

- [ ] **Step 5: Commit**
  - `git add src/types/placeExplorer.ts src/utils/vietnameseSearch.ts src/data/unifiedPlacesData.ts`
  - `git commit -m "feat(places): add unified place data model, aggregator and vietnamese search utility"`

---

### Task 2: Place Card & Places Header Components

**Files:**
- Create: `src/components/places/PlacesHeader.tsx`
- Create: `src/components/places/PlaceCard.tsx`

**Interfaces:**
- Consumes:
  - `UnifiedPlace` from `@/types/placeExplorer`
- Produces:
  - `default export function PlacesHeader()`
  - `default export function PlaceCard({ place }: { place: UnifiedPlace })`

- [ ] **Step 1: Create `src/components/places/PlacesHeader.tsx`**
  - Top editorial navigation bar.
  - Left button: `← Trang chủ` linking to `/`.
  - Center badge: `HYUN / KHÁM PHÁ ĐỊA ĐIỂM`.
  - Right button: `Lịch hẹn & Profile →` linking to `/profile`.
  - Sticky glassmorphism header (`backdrop-blur-md bg-white/90 border-b border-black/10`).

- [ ] **Step 2: Create `src/components/places/PlaceCard.tsx`**
  - Editorial card design:
    - Aspect ratio 16:10 image with smooth hover scale (`group-hover:scale-105 transition-transform duration-500`).
    - Top-left badge: City label with black background (`bg-black text-white text-[11px] font-bold px-2.5 py-1 uppercase tracking-wider`).
    - Index & Archive metadata: `ARCHIVE 01X` · `01` in monospace font.
    - Title: Place name with clean truncation and signature dish in secondary gray italic.
    - Address with location pin icon.
    - Tags list (first 2-3 tags).
    - Link wrapper pointing to `/places/${place.id}`.

- [ ] **Step 3: Verify TypeScript Compilation**
  - Run `node_modules/.bin/tsc --noEmit` to ensure no type errors.

- [ ] **Step 4: Commit**
  - `git add src/components/places/PlacesHeader.tsx src/components/places/PlaceCard.tsx`
  - `git commit -m "feat(places): create PlacesHeader and PlaceCard components"`

---

### Task 3: Interactive Places Explorer with Instant Search & City Tabs

**Files:**
- Create: `src/components/places/PlacesExplorer.tsx`

**Interfaces:**
- Consumes:
  - `UNIFIED_PLACES`, `AVAILABLE_CITIES` from `@/data/unifiedPlacesData`
  - `PlaceCard` from `@/components/places/PlaceCard`
  - `matchPlaceSearch` from `@/utils/vietnameseSearch`
- Produces:
  - `default export function PlacesExplorer()`

- [ ] **Step 1: Create `src/components/places/PlacesExplorer.tsx`**
  - "use client" component.
  - State:
    - `searchQuery: string` (input value).
    - `selectedCity: string` (default: "Tất cả").
  - Title & Stats Banner:
    - Subtitle: *"CẨM NANG ẨM THỰC 3 MIỀN / RENDEZVOUS ARCHIVES"*.
    - Title: *"Khám Phá Điểm Hẹn Ẩm Thực"*.
    - Dynamic count badge: *"Hiển thị X trên tổng số Y địa điểm"*.
  - Search Input:
    - Magnifying glass icon.
    - Placeholder: *"Tìm kiếm theo tên quán, món ăn (phở, bún chả, cà phê...), hoặc địa chỉ..."*.
    - Clear `✕` button when `searchQuery !== ""`.
  - City Tabs Bar:
    - Horizontal scroll container (`overflow-x-auto no-scrollbar`).
    - Active pill: `bg-black text-white border-black shadow-sm`.
    - Inactive pill: `bg-white text-zinc-700 border-zinc-200 hover:border-black`.
    - Counter pill next to each city name.
  - Filtering logic with `useMemo`:
    - First filter by `selectedCity` if not "Tất cả".
    - Then filter by `matchPlaceSearch(place, searchQuery)`.
  - Places Grid:
    - `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`.
  - Empty State:
    - Subtle illustration / icon.
    - Text: *"Không tìm thấy điểm hẹn nào phù hợp với từ khóa"* / *"Thử tìm bằng tên món ăn khác hoặc chọn Tỉnh/Thành phố khác"*.
    - Reset button: *"Xóa bộ lọc & Xem tất cả"* resetting `searchQuery` and setting `selectedCity` to "Tất cả".

- [ ] **Step 2: Verify TypeScript Compilation**
  - Run `node_modules/.bin/tsc --noEmit`.

- [ ] **Step 3: Commit**
  - `git add src/components/places/PlacesExplorer.tsx`
  - `git commit -m "feat(places): create PlacesExplorer client component with real-time search and city tabs"`

---

### Task 4: Route Integration, Layout & Global Navigation Menu Link

**Files:**
- Create: `src/app/places/page.tsx`
- Modify: `src/components/NavigationMenu.tsx`

**Interfaces:**
- Integrates `PlacesHeader`, `PlacesExplorer`, `NavigationMenu`, and `ChatBox` into `/places`.
- Updates `NavigationMenu.tsx` "Tìm kiếm" / "Khám phá" href to `/places`.

- [ ] **Step 1: Create `src/app/places/page.tsx`**
  - Export metadata with title *"Khám Phá Địa Điểm Ẩm Thực | HYUN"* and description.
  - Render `<NavigationMenu />`, `<ChatBox />`, `<PlacesHeader />`, and `<PlacesExplorer />`.
  - Wrap in `<div className="min-h-screen bg-[#fafafa] text-[#111111] pb-24">`.

- [ ] **Step 2: Update `src/components/NavigationMenu.tsx`**
  - Change search menu item `href: "#search"` to `href: "/places"`.
  - Label: `"Khám phá địa điểm"`.

- [ ] **Step 3: Build Verification**
  - Run `npm.cmd run build` to verify Next.js 15 App Router compilation, static page generation, and zero lint/type errors.

- [ ] **Step 4: Commit & Push**
  - `git add src/app/places/page.tsx src/components/NavigationMenu.tsx`
  - `git commit -m "feat(places): add /places route and update NavigationMenu link"`
  - `git push origin feature/profile-page`
