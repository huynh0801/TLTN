# PWA Multi-Device Design Specification

- **Project:** HYUN (minkura-nextjs)
- **Date:** 2026-10-15
- **Status:** Approved
- **Author:** Antigravity & User

---

## 1. Overview & Objectives

Transform the HYUN foodie web application into a high-performance, installable **Progressive Web App (PWA)** that functions seamlessly across all form factors (Mobile, Tablet, Desktop) without altering or degrading the existing dedicated mobile UI and desktop canvas experience.

### Key Objectives
1. **Zero-Dependency Native Architecture:** Leverage native Next.js 15 App Router capabilities (`src/app/manifest.ts`) and a clean, lightweight custom Service Worker (`public/sw.js`), avoiding brittle third-party build wrappers that risk breaking React 19 / Next.js 15 builds on Vercel.
2. **Installability & Standalone Window:** Enable "Add to Home Screen" across Chromium browsers, Android, Windows, macOS, and iOS Safari with proper display standalone mode, branded splash screen, and app icons.
3. **Adaptive Mobile Polish & Safe Areas:** Support modern mobile screens (iPhone Dynamic Island, notch, and Home indicator bar) using `viewport-fit=cover` and CSS `env(safe-area-inset-*)`. Ensure floating triggers (`NavigationMenu` and `ChatBox`) remain unobstructed.
4. **Resilient Offline Caching:** Precache static app shell and critical branding assets; serve cached HTML for previously visited routes (`/`, `/schedule`, `/profile`, `/schedule/[id]`) and cached map tiles when network is unavailable.
5. **Smart Install Prompt:** Provide an unobtrusive, brand-cohesive install prompt banner matching the black-and-white editorial aesthetic, with platform-specific guidance for Android/Desktop (1-click install) and iOS Safari (share sheet guide).

---

## 2. Architecture & File Structure

```
src/
├── app/
│   ├── layout.tsx                # Update: Viewport, themeColor, appleWebApp metadata, PwaRegister & InstallPrompt
│   └── manifest.ts               # New: Next.js 15 standard dynamic W3C Web Manifest
├── components/
│   └── pwa/
│       ├── PwaRegister.tsx        # New: Client component to register Service Worker on window load
│       └── InstallPromptBanner.tsx # New: Branded smart install prompt with iOS/Android detection & dismissal memory
public/
├── sw.js                         # New: Lightweight Service Worker with precaching & runtime caching
└── icons/
    ├── icon-192.png              # Standard Android/Chrome icon
    ├── icon-512.png              # Splash screen & high-res icon
    ├── icon-maskable.png         # Adaptive shape maskable icon for Android 13+
    └── apple-touch-icon.png      # iOS home screen icon
```

---

## 3. Detailed Specifications

### 3.1 Web App Manifest (`src/app/manifest.ts`)
Using Next.js 15 typed `MetadataRoute.Manifest`:
- `name`: "HYUN - Điểm Hẹn Ẩm Thực Chuẩn Gu"
- `short_name`: "HYUN"
- `description`: "Khám phá những quán ăn ngon, điểm hẹn chuẩn gu và ẩm thực đặc sắc 3 miền."
- `start_url`: "/"
- `display`: "standalone"
- `background_color`: "#ffffff"
- `theme_color`: "#000000"
- `orientation`: "portrait-primary"
- `scope`: "/"
- `icons`:
  - `src: "/icons/icon-192.png"`, `sizes: "192x192"`, `type: "image/png"`
  - `src: "/icons/icon-512.png"`, `sizes: "512x512"`, `type: "image/png"`
  - `src: "/icons/icon-maskable.png"`, `sizes: "512x512"`, `type: "image/png"`, `purpose: "maskable"`

### 3.2 Metadata & Viewport (`src/app/layout.tsx`)
- **Viewport:**
  ```ts
  export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    viewportFit: "cover",
    themeColor: "#000000",
  }
  ```
- **Metadata additions:**
  - `appleWebApp`: `{ capable: true, statusBarStyle: "black-translucent", title: "HYUN" }`
  - `icons`: `{ icon: "/favicon.svg", apple: "/icons/apple-touch-icon.png" }`

### 3.3 Service Worker (`public/sw.js`)
- **Cache Name:** `hyun-pwa-v1`
- **Precache Assets:**
  - `/`
  - `/favicon.svg`
  - `/icons/icon-192.png`
  - `/icons/icon-512.png`
  - Static fonts in `/fonts/`
- **Runtime Caching Strategies:**
  1. **HTML Navigations (`request.mode === 'navigate'`):** Network-First with Cache Fallback. Attempts network fetch to retrieve latest content; if offline, returns cached page if available, or fallback notice.
  2. **Static Assets (CSS, JS, Fonts, Images):** Stale-While-Revalidate with a 7-day expiration. Serves immediately from cache while refreshing in background.
  3. **Map Tiles (OpenStreetMap / Carto):** Cache-First with max 200 tiles capacity to allow viewing schedules and visited places offline.
- **Lifecycle:**
  - `install`: `self.skipWaiting()`
  - `activate`: Cleans up outdated caches and `clients.claim()`

### 3.4 Service Worker Registration (`src/components/pwa/PwaRegister.tsx`)
- A minimal `"use client"` component.
- Only executes in browser environment and if `'serviceWorker' in navigator`.
- Attaches to `window.addEventListener('load')` to protect Core Web Vitals (LCP, FID).
- Listens for updates and triggers silent background activation.

### 3.5 Smart Install Prompt Banner (`src/components/pwa/InstallPromptBanner.tsx`)
- **Visual Design:**
  - Black and white high-contrast editorial theme (`bg-white border-2 border-black shadow-[4px_4px_0px_#000000]`).
  - Positioned fixed at bottom-left / bottom-center (`left-4 sm:left-6 bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-40`), purposefully separated from `ChatBox` (`bottom-6 right-6`).
- **Platform Detection & Interaction:**
  - **Android / Desktop Chrome / Edge:** Captures `beforeinstallprompt` event. Displays "Cài đặt ứng dụng HYUN" button; clicking triggers native `prompt()`.
  - **iOS Safari:** Detects iOS (`navigator.userAgent`) and standalone status (`window.navigator.standalone`). If not installed, shows helpful step-by-step guidance pill: *"Chạm nút Chia sẻ ⎋ rồi chọn 'Thêm vào MH chính' ⊞"*.
  - **Dismissal & Frequency Cap:** Dismiss button [✕] saves `hyun_pwa_install_dismissed` timestamp to `localStorage` and suppresses the prompt for 7 days.
  - Automatically hides once installed (`appinstalled` event).

### 3.6 App Icons Generator (`public/icons/`)
Generate crisp PNG icons from HYUN branding (bold black background with high-contrast white "HYUN" typography and accent red stamp/dot), supporting:
- `icon-192.png` (192x192 px)
- `icon-512.png` (512x512 px)
- `icon-maskable.png` (512x512 px with 20% safe-zone margin)
- `apple-touch-icon.png` (180x180 px)

---

## 4. Testing & Verification Plan

1. **Manifest Validation:**
   - Verify `http://localhost:3000/manifest.webmanifest` returns valid JSON with correct mime-type (`application/manifest+json`).
2. **Service Worker Verification:**
   - Verify Service Worker registers successfully in Chrome DevTools Application > Service Workers.
   - Verify cache storage contains precached assets.
3. **Offline Mode Simulation:**
   - Set DevTools Network tab to "Offline".
   - Refresh `/schedule` and `/profile`. Confirm pages render from cache without browser error page.
4. **Install Prompt Functional Testing:**
   - Test `beforeinstallprompt` firing and prompt display.
   - Test dismiss button and `localStorage` persistence.
5. **Build & Type Check:**
   - Run `npm run build` to confirm 0 TypeScript / compilation errors and static page generation passes cleanly.
