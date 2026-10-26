import MainHeader from "@/components/navigation/MainHeader"
import MainFooter from "@/components/navigation/MainFooter"
import HeroSection from "@/components/sections/HeroSection"
import CategorySection from "@/components/sections/CategorySection"
import DesignStage from "@/components/DesignStage"
import ArchivesSection from "@/components/sections/ArchivesSection"
import AboutSection from "@/components/sections/AboutSection"

import MobileArchivesSection from "@/components/mobile/MobileArchivesSection"
import MobileAboutSection from "@/components/mobile/MobileAboutSection"

import NavigationMenu from "@/components/NavigationMenu"
import ChatBox from "@/components/ChatBox"

export default function HomePage() {
  return (
    <div className="w-full min-h-screen bg-[#fdefdf] text-[#222] flex flex-col justify-between">
      <div>
        <MainHeader activeTab="home" />
        <NavigationMenu />
        <ChatBox />

        {/* Hero Section: Fills 100% of the screen width across all viewports */}
        <HeroSection />

        {/* Food Categories: Watercolor icons and quick filters */}
        <CategorySection />

        {/* Desktop View: Preserved Figma Canvas with DesignStage for lg and wider screens (>= 1024px) */}
        <div className="hidden lg:block">
          <DesignStage>
            <ArchivesSection />
            <AboutSection />
          </DesignStage>
        </div>

        {/* Mobile & Tablet View: Natural Document Scrolling for screens < 1024px */}
        <main className="block lg:hidden w-full bg-[#fdefdf] text-[#222] overflow-x-hidden">
          <MobileArchivesSection />
          <MobileAboutSection />
        </main>
      </div>

      {/* Main Footer: Sushi logo, 3 feature badges & Torii/Fuji illustration */}
      <MainFooter />
    </div>
  )
}
