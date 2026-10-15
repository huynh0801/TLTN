# PWA Multi-Device Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn HYUN into an installable, high-performance Progressive Web App (PWA) with native-like multi-device support, offline caching, and a brand-cohesive install prompt.

**Architecture:** Implement native Next.js 15 Web App Manifest (`src/app/manifest.ts`), a zero-dependency custom Service Worker (`public/sw.js`), and lightweight React 19 client components (`PwaRegister` and `InstallPromptBanner`), respecting mobile safe areas without touching existing mobile sections.

**Tech Stack:** Next.js 15.5+ (App Router), React 19, TypeScript, Tailwind CSS v4, W3C Web Manifest, Service Worker API, PowerShell (.NET System.Drawing for icons).

## Global Constraints

- Preserve all existing mobile sections (`MobileHeroSection`, `MobileArchivesSection`, `MobileAboutSection`) and desktop canvas (`DesignStage`).
- Zero external runtime library dependencies (no `@serwist/next` or `next-pwa` build plugins).
- String literals with apostrophes must use double quotes per `AGENTS.md`.
- Export components as default exports per `AGENTS.md`.
- Production build `npm.cmd run build` must pass with 0 errors.

---

### Task 1: Generate Standard PWA Branded Icons

**Files:**
- Create: `scripts/generate-icons.ps1`
- Produces: 
  - `public/icons/icon-192.png`
  - `public/icons/icon-512.png`
  - `public/icons/icon-maskable.png`
  - `public/icons/apple-touch-icon.png`

**Interfaces:**
- Produces: PNG files in `public/icons/` referenced by manifest and metadata.

- [ ] **Step 1: Create icon generation script**

Create `scripts/generate-icons.ps1` utilizing .NET `System.Drawing` to render crisp, editorial black-and-white icons featuring the bold "HYUN" branding and accent element:

```powershell
Add-Type -AssemblyName System.Drawing

$iconsDir = Join-Path $PSScriptRoot "..\public\icons"
if (-not (Test-Path $iconsDir)) {
    New-Item -ItemType Directory -Path $iconsDir -Force | Out-Null
}

function Generate-HyunIcon {
    param (
        [int]$Size,
        [string]$FileName,
        [bool]$IsMaskable = $false
    )

    $bmp = New-Object System.Drawing.Bitmap $Size, $Size
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

    # Background
    $bgBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 18, 18, 18))
    $g.FillRectangle($bgBrush, 0, 0, $Size, $Size)

    # Inner border / badge
    $margin = if ($IsMaskable) { [int]($Size * 0.15) } else { [int]($Size * 0.06) }
    $rectSize = $Size - ($margin * 2)

    # Accent Red Dot
    $dotSize = [int]($Size * 0.08)
    $dotX = $Size - $margin - $dotSize - [int]($Size * 0.04)
    $dotY = $margin + [int]($Size * 0.04)
    $redBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 239, 68, 68))
    $g.FillEllipse($redBrush, $dotX, $dotY, $dotSize, $dotSize)

    # White typography "HYUN"
    $fontFamily = [System.Drawing.FontFamily]::GenericSansSerif
    $fontSize = if ($IsMaskable) { $Size * 0.22 } else { $Size * 0.26 }
    $font = New-Object System.Drawing.Font ($fontFamily, $fontSize, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
    $textBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::White)

    $stringFormat = New-Object System.Drawing.StringFormat
    $stringFormat.Alignment = [System.Drawing.StringAlignment]::Center
    $stringFormat.LineAlignment = [System.Drawing.StringAlignment]::Center

    $textRect = New-Object System.Drawing.RectangleF (0, ($Size * 0.04), $Size, $Size)
    $g.DrawString("HYUN", $font, $textBrush, $textRect, $stringFormat)

    # Subtitle "FOOD"
    $subFontSize = $fontSize * 0.32
    $subFont = New-Object System.Drawing.Font ($fontFamily, $subFontSize, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
    $subBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(200, 160, 160, 160))
    $subRect = New-Object System.Drawing.RectangleF (0, ($Size * 0.32), $Size, $Size)
    $g.DrawString("VIETNAM", $subFont, $subBrush, $subRect, $stringFormat)

    $outPath = Join-Path $iconsDir $FileName
    $bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)

    $g.Dispose()
    $bmp.Dispose()
    Write-Host "Generated: $outPath ($Size x $Size)"
}

Generate-HyunIcon -Size 192 -FileName "icon-192.png"
Generate-HyunIcon -Size 512 -FileName "icon-512.png"
Generate-HyunIcon -Size 512 -FileName "icon-maskable.png" -IsMaskable $true
Generate-HyunIcon -Size 180 -FileName "apple-touch-icon.png"
```

- [ ] **Step 2: Execute script to create PNG icons**

Run: `powershell -ExecutionPolicy Bypass -File scripts/generate-icons.ps1`
Expected: Output showing generated files for 192, 512, maskable, and apple-touch-icon.

- [ ] **Step 3: Verify icon files exist and have non-zero size**

Run: `powershell -Command "Get-ChildItem public/icons | Select-Object Name, Length"`
Expected: 4 PNG files with sizes > 1000 bytes.

- [ ] **Step 4: Commit icons**

```bash
git add scripts/generate-icons.ps1 public/icons/
git commit -m "chore(pwa): generate standard high-resolution PWA and Apple touch icons"
```

---

### Task 2: Configure Web App Manifest & Root Layout Metadata

**Files:**
- Create: `src/app/manifest.ts`
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Produces: `/manifest.webmanifest` route automatically handled by Next.js.
- Consumes: Icons created in Task 1.

- [ ] **Step 1: Create `src/app/manifest.ts`**

```ts
import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "HYUN - Điểm Hẹn Ẩm Thực Chuẩn Gu",
    short_name: "HYUN",
    description:
      "Khám phá những quán ăn ngon, điểm hẹn chuẩn gu và ẩm thực đặc sắc tại Hà Nội, Sài Gòn, Đà Lạt, Đà Nẵng.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    orientation: "portrait-primary",
    scope: "/",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icons/icon-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  }
}
```

- [ ] **Step 2: Update `src/app/layout.tsx` with enhanced viewport and appleWebApp metadata**

Update `viewport` and `metadata`:
```tsx
import type { Metadata, Viewport } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "HYUN - Điểm Hẹn Ẩm Thực Chuẩn Gu | Món Ngon 3 Miền",
  description:
    "Khám phá những quán ăn ngon, điểm hẹn chuẩn gu và ẩm thực đặc sắc tại Hà Nội, Sài Gòn, Đà Lạt, Đà Nẵng cùng HYUN.",
  applicationName: "HYUN",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "HYUN",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/icons/apple-touch-icon.png",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#000000",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body className="antialiased min-h-screen selection:bg-black selection:text-white">
        {children}
      </body>
    </html>
  )
}
```

- [ ] **Step 3: Verify manifest route response**

Run: `powershell -Command "Invoke-WebRequest -Uri 'http://localhost:3000/manifest.webmanifest' -UseBasicParsing | Select-Object StatusCode, Content"`
Expected: StatusCode 200, Content contains `"short_name":"HYUN"` and `"display":"standalone"`.

- [ ] **Step 4: Commit manifest configuration**

```bash
git add src/app/manifest.ts src/app/layout.tsx
git commit -m "feat(pwa): add Next.js 15 Web App Manifest and iOS safe-area metadata"
```

---

### Task 3: Implement Zero-Dependency Custom Service Worker

**Files:**
- Create: `public/sw.js`

**Interfaces:**
- Produces: Standard Service Worker script handling precache and runtime caching strategies.

- [ ] **Step 1: Write `public/sw.js`**

```javascript
const CACHE_NAME = "hyun-pwa-v1"

const PRECACHE_ASSETS = [
  "/",
  "/favicon.svg",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/icons/apple-touch-icon.png",
]

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_ASSETS))
      .then(() => self.skipWaiting())
  )
})

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames
            .filter((name) => name !== CACHE_NAME)
            .map((name) => caches.delete(name))
        )
      )
      .then(() => self.clients.claim())
  )
})

self.addEventListener("fetch", (event) => {
  const request = event.request
  const url = new URL(request.url)

  // Skip cross-origin or non-GET requests (except Leaflet tiles)
  if (request.method !== "GET") return

  // Strategy 1: Map tiles (OpenStreetMap / Carto) -> Cache-First
  if (url.hostname.includes("tile.openstreetmap.org") || url.pathname.endsWith(".png") && url.pathname.includes("/tile/")) {
    event.respondWith(
      caches.open("hyun-map-tiles").then((cache) =>
        cache.match(request).then((cachedResponse) => {
          if (cachedResponse) return cachedResponse
          return fetch(request).then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              cache.put(request, networkResponse.clone())
            }
            return networkResponse
          }).catch(() => cachedResponse)
        })
      )
    )
    return
  }

  // Strategy 2: Navigation (HTML pages) -> Network-First with Cache Fallback
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone()
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone)
            })
          }
          return networkResponse
        })
        .catch(async () => {
          const cachedResponse = await caches.match(request)
          if (cachedResponse) return cachedResponse
          const rootCached = await caches.match("/")
          if (rootCached) return rootCached
          return new Response(
            "<!DOCTYPE html><html lang='vi'><head><meta charset='utf-8'><title>Offline | HYUN</title></head><body style='font-family:sans-serif;padding:2rem;text-align:center;'><h1>Bạn đang ở chế độ ngoại tuyến</h1><p>Vui lòng kết nối mạng để tải dữ liệu mới nhất từ HYUN.</p></body></html>",
            { headers: { "Content-Type": "text/html; charset=utf-8" } }
          )
        })
    )
    return
  }

  // Strategy 3: Static Assets (JS, CSS, fonts, local images) -> Stale-While-Revalidate
  if (
    url.origin === self.location.origin &&
    (url.pathname.startsWith("/_next/") ||
      url.pathname.startsWith("/assets/") ||
      url.pathname.startsWith("/fonts/") ||
      url.pathname.startsWith("/icons/"))
  ) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        const fetchPromise = fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const responseClone = networkResponse.clone()
              caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone))
            }
            return networkResponse
          })
          .catch(() => cachedResponse)

        return cachedResponse || fetchPromise
      })
    )
    return
  }
})
```

- [ ] **Step 2: Validate syntax of `public/sw.js`**

Run: `node -c public/sw.js`
Expected: Exits with code 0 (valid JavaScript syntax).

- [ ] **Step 3: Commit Service Worker**

```bash
git add public/sw.js
git commit -m "feat(pwa): add lightweight custom Service Worker with runtime caching"
```

---

### Task 4: Service Worker Client Registration Component

**Files:**
- Create: `src/components/pwa/PwaRegister.tsx`
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Produces: `<PwaRegister />` client component for transparent background registration.

- [ ] **Step 1: Create `src/components/pwa/PwaRegister.tsx`**

```tsx
"use client"

import { useEffect } from "react"

export default function PwaRegister() {
  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
      return
    }

    const registerSW = async () => {
      try {
        const registration = await navigator.serviceWorker.register("/sw.js", {
          scope: "/",
        })

        registration.addEventListener("updatefound", () => {
          const installingWorker = registration.installing
          if (installingWorker) {
            installingWorker.addEventListener("statechange", () => {
              if (
                installingWorker.state === "installed" &&
                navigator.serviceWorker.controller
              ) {
                console.log("[HYUN PWA] Nội dung mới đã được cập nhật.")
              }
            })
          }
        })
      } catch (err) {
        console.warn("[HYUN PWA] Service Worker đăng ký thất bại:", err)
      }
    }

    if (document.readyState === "complete") {
      registerSW()
    } else {
      window.addEventListener("load", registerSW, { once: true })
    }
  }, [])

  return null
}
```

- [ ] **Step 2: Insert `<PwaRegister />` into `src/app/layout.tsx`**

Import and render `<PwaRegister />` inside `<body>`.

- [ ] **Step 3: Verify SW is fetched on client**

Run: `powershell -Command "Invoke-WebRequest -Uri 'http://localhost:3000/sw.js' -UseBasicParsing | Select-Object StatusCode, ContentType"`
Expected: StatusCode 200, ContentType contains `javascript`.

- [ ] **Step 4: Commit registration component**

```bash
git add src/components/pwa/PwaRegister.tsx src/app/layout.tsx
git commit -m "feat(pwa): add PwaRegister component for window load deferred activation"
```

---

### Task 5: Smart Install Prompt Banner

**Files:**
- Create: `src/components/pwa/InstallPromptBanner.tsx`
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Produces: `<InstallPromptBanner />` non-intrusive banner styled with Brutalist black/white motif.
- Handles: `beforeinstallprompt`, iOS Safari detection, and 7-day dismissal memory via `localStorage`.

- [ ] **Step 1: Create `src/components/pwa/InstallPromptBanner.tsx`**

```tsx
"use client"

import { useState, useEffect } from "react"

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>
}

const DISMISS_KEY = "hyun_pwa_install_dismissed"
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000

export default function InstallPromptBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [isIOS, setIsIOS] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return

    // Check if already in standalone mode
    const isStandaloneMode =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true

    if (isStandaloneMode) {
      setIsStandalone(true)
      return
    }

    // Check if previously dismissed within 7 days
    const lastDismissed = localStorage.getItem(DISMISS_KEY)
    if (lastDismissed) {
      const dismissedTime = parseInt(lastDismissed, 10)
      if (!isNaN(dismissedTime) && Date.now() - dismissedTime < SEVEN_DAYS_MS) {
        return
      }
    }

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase()
    const isIOSDevice = /iphone|ipad|ipod/.test(userAgent)
    setIsIOS(isIOSDevice)

    // Android / Desktop Chrome / Edge prompt
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      setIsVisible(true)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstall)

    // For iOS Safari: show guidance prompt after 3s on first visit
    if (isIOSDevice) {
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 3000)
      return () => {
        clearTimeout(timer)
        window.removeEventListener("beforeinstallprompt", handleBeforeInstall)
      }
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return
    await deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === "accepted") {
      setIsVisible(false)
    }
    setDeferredPrompt(null)
  }

  const handleDismiss = () => {
    setIsVisible(false)
    try {
      localStorage.setItem(DISMISS_KEY, Date.now().toString())
    } catch {
      // Ignore localStorage errors in private mode
    }
  }

  if (isStandalone || !isVisible) return null

  return (
    <aside
      aria-label="Cài đặt ứng dụng HYUN"
      className="fixed left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 animate-fade-in border-2 border-black bg-white p-4 text-black shadow-[4px_4px_0px_#000000]"
    >
      <div className="flex items-start gap-3">
        {/* App Icon Badge */}
        <div className="flex size-11 shrink-0 items-center justify-center border-2 border-black bg-black text-white font-black text-xs tracking-wider">
          HYUN
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-black text-sm uppercase tracking-tight text-black">
              Cài Đặt Ứng Dụng HYUN
            </h3>
            <button
              type="button"
              onClick={handleDismiss}
              aria-label="Đóng thông báo"
              className="size-6 inline-flex items-center justify-center text-xs font-bold text-neutral-500 hover:text-black hover:bg-neutral-100 border border-transparent hover:border-black transition-colors"
            >
              ✕
            </button>
          </div>

          <p className="mt-1 text-xs text-neutral-700 leading-relaxed">
            {isIOS ? (
              <span>
                Thêm HYUN vào Màn hình chính để dùng như ứng dụng: chạm nút{" "}
                <span className="font-bold underline">Chia sẻ [⎋]</span> rồi chọn{" "}
                <span className="font-bold underline">"Thêm vào MH chính [⊞]"</span>.
              </span>
            ) : (
              "Trải nghiệm mượt mà, mở tức thì và xem lịch trình món ngon ngoại tuyến ngay trên thiết bị."
            )}
          </p>

          {!isIOS && deferredPrompt && (
            <div className="mt-3 flex items-center gap-2">
              <button
                type="button"
                onClick={handleInstallClick}
                className="inline-flex items-center gap-1.5 border-2 border-black bg-black px-3.5 py-1.5 text-xs font-bold text-white shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 transition-all hover:bg-neutral-800"
              >
                <span>Cài đặt ngay</span>
                <span>↓</span>
              </button>
              <button
                type="button"
                onClick={handleDismiss}
                className="px-3 py-1.5 text-xs font-bold text-neutral-600 hover:text-black"
              >
                Để sau
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}
```

- [ ] **Step 2: Mount `<InstallPromptBanner />` in `src/app/layout.tsx`**

Import and place `<InstallPromptBanner />` right alongside `<PwaRegister />` inside `<body>`.

- [ ] **Step 3: Run comprehensive production build verification**

Run: `npm.cmd run build`
Expected: Next.js build succeeds with code 0 and all static pages render without errors.

- [ ] **Step 4: Commit install prompt banner**

```bash
git add src/components/pwa/InstallPromptBanner.tsx src/app/layout.tsx
git commit -m "feat(pwa): add editorial style smart install prompt banner with iOS guidance"
```
