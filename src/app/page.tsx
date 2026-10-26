import MainHeader from "@/components/navigation/MainHeader"
import HeroSection from "@/components/sections/HeroSection"
import DesignStage from "@/components/DesignStage"
import ArchivesSection from "@/components/sections/ArchivesSection"
import AboutSection from "@/components/sections/AboutSection"

import MobileArchivesSection from "@/components/mobile/MobileArchivesSection"
import MobileAboutSection from "@/components/mobile/MobileAboutSection"

import NavigationMenu from "@/components/NavigationMenu"
import ChatBox from "@/components/ChatBox"

export default function HomePage() {
  return (
    <>
      <MainHeader activeTab="home" />
      <NavigationMenu />
      <ChatBox />

      {/* Hero Section: Fills 100% of the screen width across all viewports */}
      <HeroSection />

      {/* Desktop View: Preserved Figma Canvas with DesignStage for lg and wider screens (>= 1024px) */}
      <div className="hidden lg:block">
        <DesignStage>
          <ArchivesSection />
          <AboutSection />
        </DesignStage>
      </div>

      {/* Mobile & Tablet View: Natural Document Scrolling for screens < 1024px */}
      <main className="block lg:hidden w-full min-h-screen bg-white text-[#222] overflow-x-hidden">
        <MobileArchivesSection />
        <MobileAboutSection />
      </main>
    </>
  )
}
