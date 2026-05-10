import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import ProductWorlds from "@/components/ProductWorlds";
import HowToBuy from "@/components/HowToBuy";
import TVSpotlight from "@/components/TVSpotlight";
import MediaWall from "@/components/MediaWall";
import ToyfairProof from "@/components/ToyfairProof";
import Reviews from "@/components/Reviews";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import ToyEnergyMarquee from "@/components/ToyEnergyMarquee";

export default function Home() {
  return (
    <main className="toy-page-shell min-h-screen bg-tz-bg overflow-x-hidden">
      <Navbar />
      <Hero />
      <ToyEnergyMarquee />
      <TrustStrip />
      <ProductWorlds />
      <HowToBuy />
      <TVSpotlight />
      <MediaWall />
      <ToyfairProof />
      <Reviews />
      <FAQ />
      <FinalCTA />
      <Footer />
      <FloatingCTA />
    </main>
  );
}
