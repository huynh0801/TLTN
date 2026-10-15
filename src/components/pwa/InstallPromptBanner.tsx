"use client"

// Check if already in standalone mode

// Check if previously dismissed within 7 days

// Detect iOS

// Android / Desktop Chrome / Edge prompt

// For iOS Safari: show guidance prompt after 3s on first visit
// Ignore localStorage errors in private mode
/* App Icon Badge */

import { useState, useEffect } from "react"

interface UserChoice {
  outcome: "accepted" | "dismissed"
  platform: string
}

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<UserChoice>
}

const DISMISS_KEY = "hyun_pwa_install_dismissed"
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000

export default function InstallPromptBanner() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null)
  const [isIOS, setIsIOS] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    const isStandaloneMode =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone ===
        true

    if (isStandaloneMode) {
      setIsStandalone(true)
      return
    }
    const lastDismissed = localStorage.getItem(DISMISS_KEY)
    if (lastDismissed) {
      const dismissedTime = parseInt(lastDismissed, 10)
      if (!isNaN(dismissedTime) && Date.now() - dismissedTime < SEVEN_DAYS_MS) {
        return
      }
    }
    const userAgent = window.navigator.userAgent.toLowerCase()
    const isIOSDevice = /iphone|ipad|ipod/.test(userAgent)
    setIsIOS(isIOSDevice)
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      setIsVisible(true)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstall)
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
    } catch {}
  }

  if (isStandalone || !isVisible) return null

  return (
    <aside
      aria-label="Cài đặt ứng dụng HYUN"
      className="fixed left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 animate-fade-in border-2 border-black bg-white p-4 text-black shadow-[4px_4px_0px_#000000]"
    >
      <div className="flex items-start gap-3">
        {}
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
                <span className="font-bold underline">Chia sẻ [⎋]</span> rồi
                chọn{" "}
                <span className="font-bold underline">
                  &ldquo;Thêm vào MH chính [⊞]&rdquo;
                </span>
                .
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
