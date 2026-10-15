# Thiết kế Tính năng Trang Profile Người dùng & Lịch trình Ẩm thực (HYUN)

- **Ngày tạo:** 15-10-2026
- **Trạng thái:** Đã duyệt bởi người dùng
- **Mục tiêu:** Xây dựng trang Hồ sơ cá nhân (`/profile`) tích hợp bản đồ tương tác hiển thị vị trí cá nhân và lịch trình trải nghiệm ẩm thực, đồng bộ với phong cách nhận diện thương hiệu HYUN.

---

## 1. Mục tiêu & Bối cảnh

HYUN là nền tảng khám phá ẩm thực chuẩn gu tại các thành phố lớn (Hà Nội, Sài Gòn, Đà Lạt, Đà Nẵng). Người dùng cần một không gian cá nhân hóa để:
1. Xem và quản lý thông tin hồ sơ foodie cá nhân (avatar, danh hiệu, vị trí sinh sống, sở thích và thống kê trải nghiệm).
2. Theo dõi lịch trình ẩm thực (food tour, lịch hẹn ăn uống, địa điểm sắp ghé) với mốc thời gian rõ ràng.
3. Quan sát vị trí trực quan trên bản đồ tương tác, đồng bộ hai chiều giữa thẻ lịch trình và điểm ghim (marker) trên bản đồ.

---

## 2. Kiến trúc & Điều hướng

### 2.1 Đường dẫn (Routes)
- Tuyến đường mới: `/profile` (`src/app/profile/page.tsx`).
- Tích hợp thanh điều hướng: Cập nhật mục "Profile" trong `src/components/NavigationMenu.tsx` liên kết tới `/profile`.
- Nút điều hướng quay lại trang chủ (`/`) được đặt nổi bật ở header trang profile.

### 2.2 Bố cục Giao diện (Interactive Split Dashboard)
Trang Profile được thiết kế theo phong cách giao diện tối cao cấp (Dark Luxury UI) đặc trưng của HYUN (`#1c1c1c`, `#242424`, điểm nhấn vàng cam ấm và trắng sang trọng):
- **Desktop (màn hình $\ge$ 1024px):**
  - Cột trái (~380px): Thẻ thông tin cá nhân (`PersonalInfoCard`), các chỉ số thống kê và bộ lọc nhanh trạng thái lịch trình.
  - Cột phải (phần còn lại): Khối bản đồ tương tác (`InteractiveMap`) ở nửa trên và Danh sách lịch trình ẩm thực (`ScheduleTimeline`) ở nửa dưới.
- **Mobile & Tablet (màn hình < 1024px):**
  - Xếp chồng tự nhiên theo thứ tự: Header $\rightarrow$ Thông tin cá nhân $\rightarrow$ Bản đồ vị trí $\rightarrow$ Lịch trình ẩm thực.

---

## 3. Cấu trúc Module Component

Tất cả các thành phần được phân tách độc lập trong thư mục `src/components/profile/`:

```
src/
├── app/
│   └── profile/
│       └── page.tsx                # Trang Profile chính (Client Wrapper)
├── components/
│   ├── NavigationMenu.tsx          # Menu chung (cập nhật href /profile)
│   └── profile/
│       ├── ProfileHeader.tsx       # Header quay lại trang chủ + Breadcrumb
│       ├── PersonalInfoCard.tsx    # Card thông tin cá nhân & sở thích
│       ├── InteractiveMap.tsx      # Bản đồ Leaflet OpenStreetMap (Dynamic SSR: false)
│       ├── ScheduleTimeline.tsx    # Danh sách lịch trình theo mốc thời gian
│       └── ScheduleItemCard.tsx    # Thẻ từng lịch hẹn ăn uống
├── types/
│   └── profile.ts                  # Kiểu dữ liệu TypeScript
└── data/
    └── profileData.ts              # Dữ liệu mẫu chuẩn hóa cho profile & lịch trình
```

---

## 4. Mô hình Dữ liệu (`src/types/profile.ts`)

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
  coverUrl?: string
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

---

## 5. Tương tác Hai Chiều (Bi-directional Synchronization)

Quản lý trạng thái chung tại `src/app/profile/page.tsx`:
- State `selectedScheduleId: string | null`:
  - Khi người dùng click vào thẻ trong `ScheduleTimeline` hoặc bấm nút "Xem vị trí": `selectedScheduleId` được kích hoạt.
  - Component `InteractiveMap` tự động kích hoạt `flyTo` đến tọa độ tương ứng với mức zoom cận cảnh (zoom level 16) và tự động mở Popup chi tiết quán.
  - Khi click vào marker trên bản đồ, thẻ tương ứng trong `ScheduleTimeline` được highlight sáng viền vàng cam và tự động cuộn vào tầm nhìn (`scrollIntoView({ behavior: 'smooth', block: 'nearest' })`).
- State `filterStatus: 'all' | 'upcoming' | 'completed'`: Lọc lịch trình theo trạng thái hiển thị.

---

## 6. Xử lý Kỹ thuật & Tối ưu

1. **Leaflet & Next.js App Router (SSR):**
   - Bản đồ sử dụng thư viện `leaflet` và các thẻ tile OpenStreetMap miễn phí, không yêu cầu API key.
   - Sử dụng `next/dynamic` với tùy chọn `{ ssr: false }` để đảm bảo không gặp lỗi `window is not defined` trong server-side rendering.
   - Thêm trạng thái Skeleton Loading mượt mà khi bản đồ đang tải tiles.
2. **Responsive:**
   - Hệ thống grid linh hoạt của Tailwind CSS v4, đảm bảo hiển thị đẹp mắt từ smartphone 375px đến màn hình 4K.
3. **Thẩm mỹ:**
   - Sử dụng typography và bảng màu đồng bộ với trang chủ HYUN (`#1c1c1c`, `#2b2b2b`, typography sans-serif cao cấp).

---

## 7. Kế hoạch Kiểm thử & Xác minh

1. **Build & Lint Verification:**
   - Chạy kiểm tra TypeScript và `npm.cmd run build` đảm bảo không phát sinh lỗi type hay compile.
2. **Kiểm tra Tương tác:**
   - Kiểm tra chuyển trang từ Home sang `/profile` và nút quay về Home.
   - Thử nghiệm bấm chọn từng thẻ lịch trình xem bản đồ có phóng to và hiển thị popup chính xác không.
   - Thử nghiệm bấm vào các điểm ghim trên bản đồ xem danh sách lịch trình có highlight tương ứng không.
   - Thử nghiệm bộ lọc trạng thái (Tất cả, Sắp tới, Đã ghé).
