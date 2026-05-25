import Hero from "@/components/sections/Hero";
import PartnerLogos from "@/components/sections/PartnerLogos";
import Skiper30 from "@/components/sections/Skiper30";
import Gallery from "@/components/sections/Gallery";
import Skiper58 from "@/components/sections/Skiper58";
import FunTime from "@/components/sections/FunTime";
import Footer from "@/components/layout/Footer";
import WhyLund from "@/components/sections/WhyLund";
import SplashLoader from "@/components/ui/SplashLoader";

export default function Home() {
  return (
    <>
      <SplashLoader />
      <Hero />
      <PartnerLogos />
      <Skiper30 />
      <Skiper58 />
      <WhyLund />
      <Gallery />
      <FunTime />
      <Footer />
    </>
  );
}

