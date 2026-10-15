# Kế hoạch Triển khai Trang Profile & Lịch trình Ẩm thực (Profile & Food Tour Schedule)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Xây dựng hoàn chỉnh trang Hồ sơ cá nhân (`/profile`) với thông tin cá nhân, bản đồ tương tác OpenStreetMap/Leaflet, và danh sách lịch trình ẩm thực đồng bộ 2 chiều theo phong cách HYUN.

**Architecture:** Bảng điều khiển tương tác (Interactive Split Dashboard) chia 2 cột trên Desktop (cột trái thông tin & bộ lọc; cột phải bản đồ & timeline lịch trình) và xếp chồng linh hoạt trên Mobile. Sử dụng Leaflet client-only dynamic import kết hợp Tailwind CSS v4.

**Tech Stack:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4, Leaflet.

## Global Constraints

- Mọi file và module tuân thủ quy tắc `AGENTS.md`: export components dạng default export, không dùng lệnh `cd`, sử dụng `npm.cmd` trên Windows.
- Next.js dynamic import `{ ssr: false }` bắt buộc cho mọi component sử dụng Leaflet để tránh lỗi `window is not defined`.
- Giữ nguyên phong cách thương hiệu HYUN: nền tối `#1c1c1c` / `#161616`, thẻ card `#222222`, viền border `white/10`, màu nhấn vàng cam (`#F2A93B` / `#E67E22`) và typography sans-serif sắc nét.

---

### Task 1: TypeScript Types & Dữ liệu Mẫu (Mock Data)

**Files:**
- Create: `src/types/profile.ts`
- Create: `src/data/profileData.ts`

**Interfaces:**
- Produces: `UserProfile`, `ScheduleItem`, `ScheduleStatus`, `LocationCoordinate` từ `src/types/profile.ts`
- Produces: `mockUserProfile`, `mockScheduleItems` từ `src/data/profileData.ts`

- [ ] **Step 1: Tạo file định nghĩa kiểu `src/types/profile.ts`**

```typescript
export interface LocationCoordinate {
  lat: number
  lng: number
}

export interface UserStats {
  visitedPlaces: number
  reviewsCount: number
  upcomingTrips: number
  rewardPoints: number
}

export interface UserProfile {
  id: string
  name: string
  handle: string
  title: string
  avatarUrl: string
  bio: string
  email: string
  phone: string
  locationName: string
  homeCoordinate: LocationCoordinate
  stats: UserStats
  favoriteTags: string[]
}

export type ScheduleStatus = "upcoming" | "completed" | "in_progress"

export interface ScheduleItem {
  id: string
  placeName: string
  category: string
  address: string
  date: string
  time: string
  status: ScheduleStatus
  coordinates: LocationCoordinate
  guestsCount: number
  signatureDish: string
  notes?: string
  imageUrl: string
}
```

- [ ] **Step 2: Tạo dữ liệu mẫu `src/data/profileData.ts`**

```typescript
import type { UserProfile, ScheduleItem } from "@/types/profile"

export const mockUserProfile: UserProfile = {
  id: "user_01",
  name: "Nguyễn Nhật Minh",
  handle: "@nhatminh_foodie",
  title: "Chuyên gia Khám phá Ẩm thực",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
  bio: "Đam mê khám phá ngõ ngách ẩm thực truyền thống và các điểm hẹn chuẩn gu tại Hà Nội & Sài Gòn. Ưu tiên hương vị nguyên bản và không gian ấm cúng.",
  email: "nhatminh.foodie@gmail.com",
  phone: "+84 988 123 456",
  locationName: "Quận Hoàn Kiếm, Hà Nội",
  homeCoordinate: {
    lat: 21.028511,
    lng: 105.854444,
  },
  stats: {
    visitedPlaces: 28,
    reviewsCount: 14,
    upcomingTrips: 6,
    rewardPoints: 1420,
  },
  favoriteTags: [
    "Phở bò truyền thống",
    "Cà phê trứng Phố Cổ",
    "Bún chả que tre",
    "Lẩu riêu cua đồng",
    "Chả cá Lã Vọng",
    "Ốc luộc lá chanh",
  ],
}

export const mockScheduleItems: ScheduleItem[] = [
  {
    id: "sch_01",
    placeName: "Phở Bát Đàn Gia Truyền",
    category: "Ăn sáng & Phở",
    address: "49 Bát Đàn, Cửa Đông, Hoàn Kiếm, Hà Nội",
    date: "16/10/2026",
    time: "07:30",
    status: "upcoming",
    coordinates: {
      lat: 21.033575,
      lng: 105.847522,
    },
    guestsCount: 2,
    signatureDish: "Phở tái nạm giòn nước béo",
    notes: "Đến sớm xếp hàng nhận tô phở nóng hổi chuẩn vị phố cổ.",
    imageUrl: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=500&auto=format&fit=crop&q=80",
  },
  {
    id: "sch_02",
    placeName: "Cà Phê Giảng",
    category: "Cà phê & Đồ uống",
    address: "39 Nguyễn Hữu Huân, Lý Thái Tổ, Hoàn Kiếm, Hà Nội",
    date: "16/10/2026",
    time: "09:15",
    status: "upcoming",
    coordinates: {
      lat: 21.032128,
      lng: 105.854462,
    },
    guestsCount: 2,
    signatureDish: "Cà phê trứng nóng truyền thống",
    notes: "Ngồi tầng 2 ngắm ngõ nhỏ và thưởng thức lớp kem trứng béo mịn.",
    imageUrl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&auto=format&fit=crop&q=80",
  },
  {
    id: "sch_03",
    placeName: "Bún Chả Hương Liên (Obama)",
    category: "Bữa trưa",
    address: "24 Lê Văn Hưu, Phan Chu Trinh, Hai Bà Trưng, Hà Nội",
    date: "16/10/2026",
    time: "12:00",
    status: "upcoming",
    coordinates: {
      lat: 21.017772,
      lng: 105.853245,
    },
    guestsCount: 4,
    signatureDish: "Combo bún chả đặc biệt & nem hải sản",
    notes: "Bàn 4 người đã đặt trước lúc 12:00 trưa.",
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?w=500&auto=format&fit=crop&q=80",
  },
  {
    id: "sch_04",
    placeName: "Chả Cá Lã Vọng",
    category: "Bữa tối",
    address: "14 Chả Cá, Hàng Bồ, Hoàn Kiếm, Hà Nội",
    date: "17/10/2026",
    time: "19:00",
    status: "upcoming",
    coordinates: {
      lat: 21.035789,
      lng: 105.849312,
    },
    guestsCount: 3,
    signatureDish: "Chả cá lăng xào thì là mắm tôm",
    notes: "Ăn kèm bún rối, lạc rang và thì là tươi trên chảo gang xèo xèo.",
    imageUrl: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&auto=format&fit=crop&q=80",
  },
  {
    id: "sch_05",
    placeName: "Lẩu Ếch Dũng Béo Phó Đức Chính",
    category: "Lẩu & Nướng",
    address: "30 Phó Đức Chính, Trúc Bạch, Ba Đình, Hà Nội",
    date: "14/10/2026",
    time: "19:30",
    status: "completed",
    coordinates: {
      lat: 21.042861,
      lng: 105.841527,
    },
    guestsCount: 4,
    signatureDish: "Lẩu ếch măng cay đặc sản",
    notes: "Nước lẩu đậm đà măng giòn chua ngọt, ếch xào lăn đậm vị.",
    imageUrl: "https://images.unsplash.com/photo-1547592180-85f173990554?w=500&auto=format&fit=crop&q=80",
  },
  {
    id: "sch_06",
    placeName: "Ốc Đinh Liệt Hà Trang",
    category: "Ăn vặt & Ăn đêm",
    address: "1 Đinh Liệt, Hàng Đào, Hoàn Kiếm, Hà Nội",
    date: "13/10/2026",
    time: "21:00",
    status: "completed",
    coordinates: {
      lat: 21.032641,
      lng: 105.852431,
    },
    guestsCount: 2,
    signatureDish: "Ốc mít luộc lá chanh nước mắm gừng cay",
    notes: "Nước chấm ốc gia truyền thơm nức gừng ớt tỏi sả.",
    imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&auto=format&fit=crop&q=80",
  },
]
```

- [ ] **Step 3: Kiểm tra định dạng TypeScript**

Run: `node_modules\.bin\tsc --noEmit`
Expected: 0 errors.

- [ ] **Step 4: Commit task 1**

```bash
git add src/types/profile.ts src/data/profileData.ts
git commit -m "feat(profile): add typescript models and rich mock data for profile & schedule"
```

---

### Task 2: Profile Header Component & Cập nhật Navigation Menu

**Files:**
- Create: `src/components/profile/ProfileHeader.tsx`
- Modify: `src/components/NavigationMenu.tsx:18-20`

**Interfaces:**
- Produces: `default export function ProfileHeader()`
- Consumes: Cập nhật `MENU_ITEMS` trong `NavigationMenu.tsx` với `href: "/profile"`

- [ ] **Step 1: Tạo `src/components/profile/ProfileHeader.tsx`**

```tsx
import Link from "next/link"

export default function ProfileHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#161616]/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Back Button & Logo */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="group flex items-center gap-2.5 rounded-full border border-white/10 bg-[#222222] px-4 py-2 text-sm font-medium text-white/80 transition-all hover:border-[#F2A93B]/50 hover:bg-[#2c2c2c] hover:text-white"
          >
            <svg
              className="size-4 transition-transform group-hover:-translate-x-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span>Trang chủ HYUN</span>
          </Link>

          <span className="h-5 w-px bg-white/15" />

          <div className="flex items-center gap-2 text-xs font-medium tracking-wide uppercase text-white/50">
            <span>Hồ sơ cá nhân</span>
            <span>/</span>
            <span className="text-[#F2A93B]">Lịch trình trải nghiệm</span>
          </div>
        </div>

        {/* Right Badge */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 rounded-full border border-[#F2A93B]/20 bg-[#F2A93B]/10 px-3.5 py-1.5 text-xs font-semibold text-[#F2A93B]">
            <span className="size-2 rounded-full bg-[#F2A93B] animate-pulse" />
            <span>Thành viên Tinh Hoa</span>
          </div>
        </div>
      </div>
    </header>
  )
}
```

- [ ] **Step 2: Cập nhật `src/components/NavigationMenu.tsx` đổi `href: "#profile"` thành `href: "/profile"`**

Thay thế `href: "#profile"` bằng `href: "/profile"`.

- [ ] **Step 3: Commit task 2**

```bash
git add src/components/profile/ProfileHeader.tsx src/components/NavigationMenu.tsx
git commit -m "feat(profile): create ProfileHeader and link NavigationMenu to /profile"
```

---

### Task 3: Personal Information Card Component

**Files:**
- Create: `src/components/profile/PersonalInfoCard.tsx`

**Interfaces:**
- Consumes: `UserProfile` từ `@/types/profile`
- Produces: `default export function PersonalInfoCard({ profile, filterStatus, onFilterChange }: Props)`

- [ ] **Step 1: Tạo `src/components/profile/PersonalInfoCard.tsx`**

Component hiển thị:
- Avatar bo tròn viền vàng cam với icon verify.
- Tên người dùng "Nguyễn Nhật Minh", handle "@nhatminh_foodie", danh hiệu "Chuyên gia Khám phá Ẩm thực".
- Thông tin liên lạc (Email, điện thoại, địa chỉ có icon ghim).
- Thống kê 4 số liệu: Quán đã ghé (28), Đánh giá (14), Lịch trình (6), Điểm thưởng (1,420).
- Gu ẩm thực (Favorite tags) hiển thị dạng pills nhỏ gọn.
- Bộ lọc trạng thái lịch trình: "Tất cả", "Sắp tới", "Đã hoàn thành".

- [ ] **Step 2: Commit task 3**

```bash
git add src/components/profile/PersonalInfoCard.tsx
git commit -m "feat(profile): implement PersonalInfoCard with profile details and filter tabs"
```

---

### Task 4: Bản đồ Tương tác Leaflet (Client-only Dynamic Import)

**Files:**
- Create: `src/components/profile/MapInner.tsx`
- Create: `src/components/profile/InteractiveMap.tsx`

**Interfaces:**
- Consumes: `LocationCoordinate`, `ScheduleItem` từ `@/types/profile`
- Consumes: `selectedScheduleId`, `onSelectSchedule`
- Produces: `default export function InteractiveMap(...)`

- [ ] **Step 1: Tạo `src/components/profile/MapInner.tsx` với Leaflet core**

Thực hiện:
- Khởi tạo `L.map` trên phần tử container với tọa độ trung tâm Hoàn Kiếm, Hà Nội (`[21.0285, 105.8544]`).
- Thêm TileLayer OpenStreetMap với attribution đầy đủ.
- Tạo custom DivIcon cho vị trí người dùng (Home Marker với viền phát sáng xanh ngọc).
- Tạo custom DivIcon cho các điểm lịch trình ẩm thực (Màu vàng cam `#F2A93B` với số thứ tự và icon ẩm thực).
- Thêm Popup khi click marker: hiển thị hình ảnh quán, tên quán, địa chỉ và giờ hẹn.
- Lắng nghe sự thay đổi của `selectedScheduleId`: khi có item được chọn, gọi `map.flyTo([lat, lng], 16, { duration: 1.2 })` và mở popup marker tương ứng.

- [ ] **Step 2: Tạo `src/components/profile/InteractiveMap.tsx` với `dynamic(..., { ssr: false })`**

Bọc `MapInner` bằng Next.js dynamic import để loại bỏ nguy cơ lỗi SSR và kèm fallback skeleton loader.

- [ ] **Step 3: Commit task 4**

```bash
git add src/components/profile/MapInner.tsx src/components/profile/InteractiveMap.tsx
git commit -m "feat(profile): implement interactive Leaflet map with custom food pins and flyTo animation"
```

---

### Task 5: Schedule Timeline & Card Components

**Files:**
- Create: `src/components/profile/ScheduleItemCard.tsx`
- Create: `src/components/profile/ScheduleTimeline.tsx`

**Interfaces:**
- Consumes: `ScheduleItem` từ `@/types/profile`
- Consumes: `selectedScheduleId`, `onSelectSchedule(id: string)`
- Produces: `default export function ScheduleTimeline(...)`

- [ ] **Step 1: Tạo `src/components/profile/ScheduleItemCard.tsx`**

Bao gồm:
- Thẻ card viền bo tròn bo góc, nền `#222222`.
- Khi `isSelected === true`: viền sáng vàng cam `#F2A93B` và đổ bóng nổi bật.
- Cột bên trái: Ảnh thumbnail món ăn / quán bo góc.
- Cột bên phải:
  - Thẻ badge thể loại ("Ăn sáng & Phở", "Cà phê & Đồ uống", v.v.) và trạng thái (Xanh lá "Sắp tới" / Xám "Đã ghé").
  - Tên quán in đậm, địa chỉ chi tiết.
  - Ngày giờ hẹn kèm icon lịch và đồng hồ.
  - Món ăn đặc trưng (Signature dish) kèm icon thìa nĩa.
  - Nút bấm "Xem trên bản đồ" có icon GPS định vị.

- [ ] **Step 2: Tạo `src/components/profile/ScheduleTimeline.tsx`**

Duyệt mảng `items`, vẽ đường nối timeline thanh lịch bên trái, render các `ScheduleItemCard`. Hiển thị thông báo khi bộ lọc không có kết quả.

- [ ] **Step 3: Commit task 5**

```bash
git add src/components/profile/ScheduleItemCard.tsx src/components/profile/ScheduleTimeline.tsx
git commit -m "feat(profile): implement ScheduleTimeline and ScheduleItemCard components"
```

---

### Task 6: Tích hợp Trang `/profile/page.tsx` & Đồng bộ Trạng thái 2 Chiều

**Files:**
- Create: `src/app/profile/page.tsx`

**Interfaces:**
- Quản lý state:
  - `selectedScheduleId: string | null`
  - `filterStatus: 'all' | 'upcoming' | 'completed'`
- Tương tác:
  - Khi user chọn một thẻ lịch trình $\rightarrow$ cập nhật `selectedScheduleId` $\rightarrow$ Map tự động `flyTo` và mở popup.
  - Khi user click vào marker trên Map $\rightarrow$ cập nhật `selectedScheduleId` $\rightarrow$ Thẻ lịch trình tự động cuộn vào tầm mắt (`scrollIntoView`).

- [ ] **Step 1: Tạo `src/app/profile/page.tsx`**

- [ ] **Step 2: Commit task 6**

```bash
git add src/app/profile/page.tsx
git commit -m "feat(profile): integrate complete profile page with bi-directional sync"
```

---

### Task 7: Kiểm thử Tổng thể & Build Verification

**Files:**
- Modify: Kiểm tra và hoàn thiện các chi tiết styling

- [ ] **Step 1: Kiểm tra biên dịch TypeScript**

Run: `node_modules\.bin\tsc --noEmit`
Expected: 0 errors.

- [ ] **Step 2: Kiểm tra bản dựng Production (Next.js build)**

Run: `npm.cmd run build`
Expected: Build thành công (Compiled successfully, `/profile` generated).

- [ ] **Step 3: Kiểm tra trực tiếp trên trình duyệt qua Dev Server**

Truy cập: `http://localhost:3000/profile`
Kiểm tra:
- Header quay về trang chủ.
- Thông tin cá nhân đầy đủ thẻ thống kê và tags.
- Bản đồ Leaflet tải trơn tru, hiển thị các marker tại Hà Nội.
- Bấm vào một lịch hẹn: bản đồ zoom tới marker và mở popup.
- Bấm vào marker: card trong danh sách được highlight.
- Bộ lọc hoạt động chính xác.

- [ ] **Step 4: Commit hoàn tất tính năng**

```bash
git add .
git commit -m "feat: complete interactive user profile page with schedule and location map"
```
