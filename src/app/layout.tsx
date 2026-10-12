import type { Metadata, Viewport } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "HYUN - Điểm Hẹn Ẩm Thực Chuẩn Gu | Món Ngon 3 Miền",
  description:
    "Khám phá những quán ăn ngon, điểm hẹn chuẩn gu và ẩm thực đặc sắc tại Hà Nội, Sài Gòn, Đà Lạt, Đà Nẵng cùng HYUN.",
  icons: {
    icon: "/favicon.svg",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  )
}
