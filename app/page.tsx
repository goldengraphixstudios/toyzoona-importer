import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import WhyToyzoona from "@/components/WhyToyzoona";
import HowToBuy from "@/components/HowToBuy";
import TVSpotlight from "@/components/TVSpotlight";
import MediaWall from "@/components/MediaWall";
import ToyfairProof from "@/components/ToyfairProof";
import ProductWorlds from "@/components/ProductWorlds";
import Reviews from "@/components/Reviews";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <TrustStrip />
      <WhyToyzoona />
      <HowToBuy />
      <TVSpotlight />
      <MediaWall />
      <ToyfairProof />
      <ProductWorlds />
      <Reviews />
      <FinalCTA />
      <Footer />
    </main>
  );
}
