import Hero from "@/components/sections/Hero";
import PartnerLogos from "@/components/sections/PartnerLogos";
import Skiper30 from "@/components/sections/Skiper30";
import Products from "@/components/sections/Products";
import Gallery from "@/components/sections/Gallery";
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
      <Products />
      <Gallery />
      <WhyLund />
      <Footer />
    </>
  );
}

