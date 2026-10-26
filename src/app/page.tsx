import MainHeader from "@/components/navigation/MainHeader"
import MainFooter from "@/components/navigation/MainFooter"
import HeroSection from "@/components/sections/HeroSection"
import CategorySection from "@/components/sections/CategorySection"
import FeaturedPlacesSection from "@/components/sections/FeaturedPlacesSection"

import NavigationMenu from "@/components/NavigationMenu"
import ChatBox from "@/components/ChatBox"

export default function HomePage() {
  return (
    <div className="w-full min-h-screen bg-[#fdefdf] text-[#222] flex flex-col justify-between">
      <div className="w-full">
        <MainHeader activeTab="home" />
        <NavigationMenu />
        <ChatBox />

        {/* Hero Section: Fills 100% of the screen width across all viewports */}
        <HeroSection />

        {/* Food Categories: Watercolor icons and quick filters */}
        <CategorySection />

        {/* Featured Places: Top recommended dining spots & couple guide */}
        <FeaturedPlacesSection />
      </div>

      {/* Main Footer: Sushi logo, 3 feature badges & Torii/Fuji illustration */}
      <MainFooter />
    </div>
  )
}
