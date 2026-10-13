import DesignStage from "@/components/DesignStage"

import HeroSection from "@/components/sections/HeroSection"

import ArchivesSection from "@/components/sections/ArchivesSection"

import AboutSection from "@/components/sections/AboutSection"

import NavigationMenu from "@/components/NavigationMenu"
import ChatBox from "@/components/ChatBox"

export default function HomePage() {
  return (
    <>
      <NavigationMenu />
      <ChatBox />
      <DesignStage>
        <HeroSection />
        <ArchivesSection />
        <AboutSection />
      </DesignStage>
    </>
  )
}
