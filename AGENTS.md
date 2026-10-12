# minkura-nextjs

Next.js 15 (App Router) + React 19 + Tailwind CSS v4 project.

## Development Server

- Development: `npm run dev`
- Production build: `npm run build`
- Production start: `npm run start`
- Format code: `npm run format`

## Project Structure

- `src/app/layout.tsx` - Root layout with metadata, viewport config, and global styles
- `src/app/page.tsx` - Trang chủ Server Component
- `src/app/globals.css` - Global CSS entrypoint: Tailwind CSS v4 + Figma @font-face webfonts
- `src/components/DesignStage.tsx` - Client stage component tính toán scale responsive theo kích thước màn hình
- `src/components/sections/` - Các khối giao diện module hóa:
  - `HeroSection.tsx` - Section 1: Hero slider & banner (cao 889.4px)
  - `ArchivesSection.tsx` - Section 2: Minkura Archives cards & categories (cao 2952.14px)
  - `AboutSection.tsx` - Section 3: About Minkura & balloon (cao 914.8px)
- `src/constants/assets.ts` - Quản lý tập trung hằng số đường dẫn hình ảnh & SVG
- `public/assets/` - Chứa toàn bộ 33 file hình ảnh và vector tĩnh
- `package.json` - Next.js scripts và dependencies
- `next.config.ts` - Cấu hình Next.js
- `postcss.config.mjs` - Cấu hình PostCSS với `@tailwindcss/postcss`

## Dependencies

- Runtime: Next.js 15, React 19, React DOM 19
- Styling: Tailwind CSS v4 với `@tailwindcss/postcss`
- Build tooling: TypeScript 5.7+
- Formatting: oxfmt

## Code Quality

- Use double quotes for strings containing apostrophes (`"We're here to help"`), or escape them in single-quoted strings.
- Ensure JSX tags are closed and braces are balanced.
- Export components as default exports.
