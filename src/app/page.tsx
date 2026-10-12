import DesignStage from "@/components/DesignStage"
import HeroSection from "@/components/sections/HeroSection"
import ArchivesSection from "@/components/sections/ArchivesSection"
import AboutSection from "@/components/sections/AboutSection"

export default function HomePage() {
  return (
    <DesignStage>
      <HeroSection />
      <ArchivesSection />
      <AboutSection />
    </DesignStage>
  )
}
