import { useLanguage } from "../context/LanguageContext.jsx";
import ScrollWords from "./ScrollWords.jsx";

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section
      id="hero"
      data-section-index="0"
      className="flex min-h-screen items-center justify-center px-6 text-center"
      style={{ fontFamily: t.font }}
    >
      <ScrollWords
        text={t.hero.title}
        className="block max-w-4xl text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl md:text-7xl"
        style={{ textShadow: "0 2px 30px rgba(10,22,40,0.5)" }}
      />
    </section>
  );
}
