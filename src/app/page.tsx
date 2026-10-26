import MainHeader from "@/components/navigation/MainHeader"
import DesignStage from "@/components/DesignStage"
import HeroSection from "@/components/sections/HeroSection"
import ArchivesSection from "@/components/sections/ArchivesSection"
import AboutSection from "@/components/sections/AboutSection"

import MobileHeroSection from "@/components/mobile/MobileHeroSection"
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

      {/* Desktop View: Preserved Figma Canvas with DesignStage for lg and wider screens (>= 1024px) */}
      <div className="hidden lg:block">
        <DesignStage>
          <HeroSection />
          <ArchivesSection />
          <AboutSection />
        </DesignStage>
      </div>

      {/* Mobile & Tablet View: Natural Document Scrolling for screens < 1024px */}
      <main className="block lg:hidden w-full min-h-screen bg-white text-[#222] overflow-x-hidden">
        <MobileHeroSection />
        <MobileArchivesSection />
        <MobileAboutSection />
      </main>
    </>
  )
}
