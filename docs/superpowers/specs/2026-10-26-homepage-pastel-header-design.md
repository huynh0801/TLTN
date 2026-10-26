# Design Spec: Homepage Pastel/Watercolor Header

**Date:** 2026-10-26  
**Status:** Approved  
**Author:** AI Pair Programmer & User  

---

## 1. Overview & Objective

Redesign the homepage starting with the main top Navigation Header matching the provided warm Japanese pastel/watercolor aesthetic ("Ăn ngon, gặp nhau, thêm yêu"). The header replaces the previous floating navigation with a full-width, sticky, warm cream navigation bar containing the brand logo from `img/logo.png`, center navigation pill links, search input, and profile avatar.

---

## 2. Requirements & Visual Structure

1. **Asset Migration:**
   - Copy `img/` to `public/img/` so Next.js static asset serving serves `/img/logo.png` cleanly and efficiently.
2. **Container & Background:**
   - Height: `h-20` (80px), sticky top with subtle backdrop blur.
   - Background: Warm cream `#FAF6F0` with subtle border `#F0EAE1`.
   - Max width: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`.
3. **Left Brand Logo:**
   - Displays `/img/logo.png` (ramen bowl with cherry blossom flower, "hyun", and slogan "Ăn ngon, gặp nhau, thêm yêu").
   - Clickable link to `/`.
4. **Center Navigation:**
   - Text color: Dark navy `#1E3A5F` with rounded typography.
   - Items:
     - "Trang chủ" (active state with soft coral/pink pill `bg-[#FDD5D5] text-[#D34B5E]`).
     - "Khám phá" (links to `/places`).
     - "Địa điểm" (links to `/places` or `/schedule`).
     - "Bài viết" (links to blog/articles).
     - "Về chúng tôi" (links to about section).
5. **Right Action Controls:**
   - **Search Pill:** Rounded pill input with magnifying glass icon `#1E3A5F`, placeholder *"Tìm nhà hàng, món ăn, khu vực..."*.
   - **Profile Avatar:** Circular button `bg-[#FCD5D5]` with navy user icon, linking to `/profile`.
6. **Mobile Responsiveness:**
   - Clean mobile layout with collapsible menu drawer or hamburger toggle.
7. **Placement on Homepage:**
   - Mount at the top of `src/app/page.tsx`.

---

## 3. Verification Plan

1. Asset presence: Verify `/img/logo.png` is accessible.
2. TypeScript & Build: Run `npm run build` to ensure 0 errors.
3. Dev Server: Start `npm run dev` and test responsiveness on desktop and mobile viewports.
