import { LanguageProvider } from "./context/LanguageContext.jsx";
import VideoScroll from "./components/VideoScroll.jsx";
import Navbar from "./components/Navbar.jsx";
import HeroSection from "./components/HeroSection.jsx";
import AboutSection from "./components/AboutSection.jsx";
import ProductsSection from "./components/ProductsSection.jsx";
import IngredientsSection from "./components/IngredientsSection.jsx";

export default function App() {
  return (
    <LanguageProvider>
      <VideoScroll />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ProductsSection />
        <IngredientsSection />
      </main>
    </LanguageProvider>
  );
}
