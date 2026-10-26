# Homepage Pastel Header Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create and integrate the new warm pastel/watercolor Homepage Header with brand logo, navigation pills, search input, and profile avatar.

**Architecture:** Client-side Header component (`src/components/common/Header.tsx` or `src/components/navigation/MainHeader.tsx`) mounted in `src/app/page.tsx` and exportable across the site. Assets from `img/` copied to `public/img/`.

**Tech Stack:** Next.js 15, React 19, Tailwind CSS v4, TypeScript.

---

### Task 1: Asset Migration & MainHeader Component

**Files:**
- Copy directory: `img/` -> `public/img/`
- Create: `src/components/navigation/MainHeader.tsx`

- [ ] **Step 1: Copy image assets to `public/img`**
  - Run PowerShell command to copy `E:\Work\hyun\img` to `E:\Work\hyun\public\img`.
  - Verify `/img/logo.png` is in `public/img/`.

- [ ] **Step 2: Create `src/components/navigation/MainHeader.tsx`**
  - Implement `"use client"`.
  - Brand Logo using `next/image` or `<img>` with `/img/logo.png`.
  - Navigation items: "Trang chủ" (active), "Khám phá" (`/places`), "Địa điểm" (`/places`), "Bài viết" (`#articles`), "Về chúng tôi" (`#about`).
  - Search input with magnifying glass and quick-submit to `/places?q=...`.
  - User profile avatar button linking to `/profile`.
  - Responsive hamburger toggle and dropdown menu for mobile devices.
  - Export as default export per `AGENTS.md`.

- [ ] **Step 3: Integrate into `src/app/page.tsx`**
  - Add `<MainHeader />` to the top of the homepage in `src/app/page.tsx`.

- [ ] **Step 4: Verify with Build & Dev Server**
  - Run `node node_modules/typescript/bin/tsc --noEmit`.
  - Run `npm.cmd run build`.
  - Start dev server and verify.

- [ ] **Step 5: Commit changes**
  - Git commit with message `feat(header): add warm pastel watercolor MainHeader with logo and search`.
